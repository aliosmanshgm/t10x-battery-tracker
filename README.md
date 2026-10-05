# T10X Batarya & Şarj Takip v0.8.4

Bu sürüm Firebase Web App yapılandırması işlenmiş, GitHub Pages'e yüklemeye hazır sürümdür.

## Mimari
- Local-first veri saklama
- Firebase Authentication: Email/Password
- Firebase Realtime Database: kullanıcı UID'sine özel `users/<uid>/appData`
- GitHub Pages: statik yayın
- iPhone/PWA uyumlu manifest + service worker

## Firebase config durumu
`firebase-config.js` dosyası `t10x-battery-tracker` Firebase projesi için yapılandırılmıştır.
Analytics zorunlu değildir; uygulamanın çalışma mantığı Authentication + Realtime Database kullanır.

## Firebase Console'da kalan zorunlu adımlar
1. Authentication > Sign-in method > Email/Password: Enabled
2. Realtime Database > Rules: `database.rules.json` içeriğini Publish
3. Authentication > Settings > Authorized domains:
   - local test için `localhost`
   - GitHub Pages yayını sonrası `<kullaniciadi>.github.io`

## İlk senkronizasyon
1. Uygulamayı açın.
2. Ayarlar > Firebase Bulut Senkronizasyonu'na gidin.
3. İlk kez ise Hesap Oluştur; sonra Giriş Yap.
4. Local kayıtlar bulutta yoksa otomatik ilk kopya oluşturulur.
5. JSON yedeği almaya devam etmek önerilir.

## GitHub Pages
Repo köküne bu klasörün içindeki dosyaları yükleyin.
Settings > Pages > Deploy from a branch > `main` / `(root)` seçin.

### v0.8.4 tek kullanıcı giriş modeli
- Ana uygulama Firebase Authentication oturumu olmadan görünmez.
- Uygulama içinde kullanıcı kaydı/üyelik oluşturma yoktur.
- Kullanıcı Firebase Console > Authentication > Users üzerinden yönetilir.
- `database.rules.single-user.template.json` ile veritabanı tek User UID'ye kilitlenebilir.


### v0.8.4 Dashboard 100 km göstergeleri
- Gösterge Paneline `100 km Tüketim (kWh/100 km)` ve `100 km Maliyet (TL/100 km)` kartları eklendi.
- 100 km maliyeti, son sahiplik dönemi toplam tüketimi ile maliyeti bilinen şarjların enerji-ağırlıklı ortalama TL/kWh değerinin çarpımıdır.
- Maliyeti girilmemiş oturumlar ortalama birim fiyatı yapay olarak düşürmez.
