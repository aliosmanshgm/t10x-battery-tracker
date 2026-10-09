import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import {
  getDatabase,
  ref,
  get,
  set,
  onValue
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js';

const $ = id => document.getElementById(id);
const ui = {
  pill: $('cloudStatusPill'),
  badge: $('cloudStatusBadge'),
  message: $('cloudSetupMessage'),
  form: $('cloudAuthForm'),
  email: $('cloudEmail'),
  password: $('cloudPassword'),
  gate: $('authGate'),
  shell: $('appShell'),
  gateMessage: $('authGateMessage'),
  signout: $('cloudSignOutBtn'),
  info: $('cloudUserInfo'),
  upload: $('cloudUploadBtn'),
  download: $('cloudDownloadBtn')
};

let auth = null;
let rtdb = null;
let currentUser = null;
let currentRef = null;
let unsubscribeRemote = null;
let cloudReady = false;
let writeTimer = null;
let lastError = '';

function configured() {
  return Boolean(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.databaseURL && firebaseConfig.projectId && firebaseConfig.appId);
}

function stamp(data) {
  const t = Date.parse(data?.meta?.updatedAt || '');
  return Number.isFinite(t) ? t : 0;
}

function localData() {
  return window.T10XApp?.getData?.() || null;
}

function meaningful(data) {
  if (!data) return false;
  return Boolean(
    data?.charges?.length ||
    data?.trips?.length ||
    data?.consumptionSnapshots?.length ||
    data?.sohTests?.length ||
    data?.socSnapshots?.length ||
    data?.driveSessions?.length ||
    Boolean(data?.activeDrive) ||
    data?.meta?.updatedAt
  );
}

function sameRevision(a, b) {
  return (a?.meta?.updatedAt || '') === (b?.meta?.updatedAt || '');
}

function setStatus(mode, label, detail = '') {
  if (ui.pill) {
    ui.pill.textContent = `Bulut: ${label}`;
    ui.pill.className = `cloud-pill ${mode}`;
  }
  if (ui.badge) {
    ui.badge.textContent = label;
    ui.badge.className = `badge ${mode === 'online' ? 'good' : mode === 'error' ? 'bad' : mode === 'connecting' ? 'info' : 'neutral'}`;
  }
  if (ui.info && detail) ui.info.textContent = detail;
}

function setSignedInUi(user) {
  const signed = Boolean(user);
  if (ui.upload) ui.upload.disabled = !signed || !cloudReady;
  if (ui.download) ui.download.disabled = !signed || !cloudReady;
  if (ui.signout) ui.signout.hidden = !signed;
  if (ui.info) ui.info.textContent = signed
    ? `${user.email || 'Hesap'} · oturum açık.`
    : 'Oturum kapalı.';
}

function setGate(locked, text = '', kind = 'info') {
  if (ui.gate) ui.gate.hidden = !locked;
  if (ui.shell) ui.shell.hidden = locked;
  document.body.classList.toggle('auth-locked', locked);
  if (ui.gateMessage && text) {
    ui.gateMessage.textContent = text;
    ui.gateMessage.className = `auth-message${kind === 'error' ? ' error' : kind === 'success' ? ' success' : ''}`;
  }
}

function message(text, kind = 'info') {
  if (!ui.message) return;
  ui.message.textContent = text;
  ui.message.className = kind === 'error' ? 'info-box danger-box' : 'info-box';
}

function friendlyError(err) {
  const code = err?.code || '';
  const map = {
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
    'auth/email-already-in-use': 'Bu e-posta ile daha önce hesap oluşturulmuş.',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
    'auth/invalid-email': 'Geçerli bir e-posta adresi girin.',
    'auth/unauthorized-domain': 'Bu web alanı Firebase Authentication > Settings > Authorized domains listesine eklenmeli.',
    'auth/network-request-failed': 'Ağ bağlantısı kurulamadı.',
    'PERMISSION_DENIED': 'Firebase Database Rules bu işlemi reddetti. Kuralları kontrol edin.'
  };
  return map[code] || map[err?.message] || err?.message || 'Bilinmeyen Firebase hatası.';
}

async function writeCloud(data = localData(), {force = false} = {}) {
  if (!currentUser || !currentRef || !data) return;
  if (!force && !cloudReady) return;
  setStatus('connecting', 'Senkronize', 'Buluta kaydediliyor…');
  try {
    await set(currentRef, data);
    setStatus('online', 'Senkron', `${currentUser.email || 'Hesap'} · son değişiklik buluta kaydedildi.`);
    lastError = '';
  } catch (err) {
    lastError = friendlyError(err);
    setStatus('error', 'Hata', lastError);
    message(lastError, 'error');
  }
}

function applyCloud(data) {
  if (!data || !window.T10XApp?.replaceData) return;
  window.T10XApp.replaceData(data, {emit:false});
}

async function initialReconcile(user) {
  const snapshot = await get(currentRef);
  const cloud = snapshot.exists() ? snapshot.val() : null;
  const local = localData();

  if (!cloud) {
    await set(currentRef, local);
    message('Bulutta veri yoktu; bu cihazdaki mevcut kayıtlar ilk bulut kopyası olarak yüklendi.');
    return;
  }

  if (!meaningful(local)) {
    applyCloud(cloud);
    message('Bu cihazda kayıt yoktu; buluttaki veriler indirildi.');
    return;
  }

  if (sameRevision(local, cloud)) {
    message('Bu cihaz ile bulut aynı veri sürümünde.');
    return;
  }

  const lt = stamp(local), ct = stamp(cloud);
  if (ct > lt) {
    applyCloud(cloud);
    message('Buluttaki daha yeni kayıtlar bu cihaza alındı.');
    return;
  }

  if (lt > ct) {
    const useLocal = confirm('Bu cihazdaki T10X kayıtları buluttaki kayıtlardan daha yeni görünüyor.\n\nOK = Bu cihazdaki veriyi buluta yükle\nİptal = Buluttaki veriyi bu cihazda kullan');
    if (useLocal) {
      await set(currentRef, local);
      message('Bu cihazdaki daha yeni kayıtlar buluta yüklendi.');
    } else {
      applyCloud(cloud);
      message('Buluttaki kayıtlar bu cihaza alındı.');
    }
    return;
  }

  const useLocal = confirm('Bu cihazda ve bulutta farklı T10X kayıtları var; hangisinin daha yeni olduğu belirlenemedi.\n\nOK = Bu cihazdaki veriyi buluta yükle\nİptal = Buluttaki veriyi bu cihazda kullan');
  if (useLocal) await set(currentRef, local); else applyCloud(cloud);
}

async function connectUser(user) {
  currentUser = user;
  cloudReady = false;
  setSignedInUi(user);
  setGate(true, `${user.email || 'Hesap'} · bulut verisi hazırlanıyor…`);
  setStatus('connecting', 'Bağlanıyor', `${user.email || 'Hesap'} · bulut verisi kontrol ediliyor…`);
  currentRef = ref(rtdb, `users/${user.uid}/appData`);

  try {
    await initialReconcile(user);
    cloudReady = true;
    setSignedInUi(user);
    setStatus('online', 'Senkron', `${user.email || 'Hesap'} · Firebase senkronizasyonu açık.`);
    setGate(false);

    if (unsubscribeRemote) unsubscribeRemote();
    unsubscribeRemote = onValue(currentRef, snap => {
      if (!snap.exists()) return;
      const remote = snap.val();
      const local = localData();
      if (sameRevision(remote, local)) return;
      if (stamp(remote) >= stamp(local)) {
        applyCloud(remote);
        setStatus('online', 'Senkron', `${user.email || 'Hesap'} · başka cihazdaki değişiklik alındı.`);
      }
    }, err => {
      lastError = friendlyError(err);
      setStatus('error', 'Hata', lastError);
      message(lastError, 'error');
    });
  } catch (err) {
    cloudReady = false;
    lastError = friendlyError(err);
    setSignedInUi(user);
    setStatus('error', 'Hata', lastError);
    setGate(true, `Giriş başarılı ancak bulut verisine erişilemedi: ${lastError}`, 'error');
    message(lastError, 'error');
  }
}

function disconnectUser() {
  cloudReady = false;
  currentUser = null;
  currentRef = null;
  if (unsubscribeRemote) unsubscribeRemote();
  unsubscribeRemote = null;
  setSignedInUi(null);
  setStatus('local', 'Kilitli', 'Giriş yapılmadı.');
  setGate(true, 'Bu uygulama yalnızca yetkili kullanıcı için açıktır. Firebase hesabınızla giriş yapın.');
}

window.addEventListener('t10x:data-changed', event => {
  if (!currentUser || !cloudReady) return;
  clearTimeout(writeTimer);
  const snapshot = event.detail?.db || localData();
  writeTimer = setTimeout(() => writeCloud(snapshot), 450);
});

if (!configured()) {
  setStatus('error', 'Yapılandırma');
  setSignedInUi(null);
  setGate(true, 'Firebase yapılandırması bulunamadı. firebase-config.js dosyasını kontrol edin.', 'error');
  message('Firebase yapılandırması bulunamadı. firebase-config.js dosyasını kontrol edin.', 'error');
  if (ui.form) ui.form.querySelectorAll('input,button').forEach(el => el.disabled = true);
  if (ui.upload) ui.upload.disabled = true;
  if (ui.download) ui.download.disabled = true;
} else {
  try {
    setGate(true, 'Oturum kontrol ediliyor…');
    message('Firebase yapılandırması hazır. Uygulama yalnızca giriş yapıldıktan sonra açılır.');
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    rtdb = getDatabase(app);
    await setPersistence(auth, browserLocalPersistence);

    onAuthStateChanged(auth, user => {
      if (user) connectUser(user); else disconnectUser();
    });

    ui.form?.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        setStatus('connecting', 'Giriş', 'Firebase hesabına giriş yapılıyor…');
        setGate(true, 'Giriş yapılıyor…');
        await signInWithEmailAndPassword(auth, ui.email.value.trim(), ui.password.value);
        ui.password.value = '';
      } catch (err) {
        const text = friendlyError(err);
        setStatus('error', 'Hata', text);
        setGate(true, text, 'error');
        message(text, 'error');
      }
    });

    ui.signout?.addEventListener('click', async () => {
      setGate(true, 'Oturum kapatılıyor…');
      await signOut(auth);
    });

    ui.upload?.addEventListener('click', async () => {
      if (!currentUser) return;
      if (!confirm('Bu cihazdaki mevcut T10X verisi buluttaki kopyanın üzerine yazılacak. Devam edilsin mi?')) return;
      await writeCloud(localData(), {force:true});
      message('Bu cihazdaki veri buluta gönderildi.');
    });

    ui.download?.addEventListener('click', async () => {
      if (!currentUser || !currentRef) return;
      if (!confirm('Buluttaki T10X verisi bu cihazdaki local kopyanın yerine alınacak. Devam edilsin mi?')) return;
      try {
        const snap = await get(currentRef);
        if (!snap.exists()) return message('Bulutta henüz veri yok.', 'error');
        applyCloud(snap.val());
        message('Buluttaki veri bu cihaza alındı.');
        setStatus('online', 'Senkron', `${currentUser.email || 'Hesap'} · bulut verisi indirildi.`);
      } catch (err) {
        message(friendlyError(err), 'error');
      }
    });
  } catch (err) {
    const text = friendlyError(err);
    setStatus('error', 'Hata', text);
    setGate(true, `Firebase başlatılamadı: ${text}`, 'error');
    message(`Firebase başlatılamadı: ${text}`, 'error');
  }
}
