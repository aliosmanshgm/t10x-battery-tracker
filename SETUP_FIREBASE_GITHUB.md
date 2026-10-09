# Firebase + GitHub Pages Kurulum Kontrol Listesi — v0.9.4

## 1. Tamamlananlar
- Firebase projesi: `t10x-battery-tracker`
- Web app config uygulamaya işlendi.
- Realtime Database URL tanımlandı.
- Local-first / Firebase sync kodu hazır.
- UID-bazlı Realtime Database Rules dosyası hazır.
- GitHub Pages için `.nojekyll`, manifest ve service worker hazır.

## 2. Firebase Authentication
Firebase Console > Authentication > Sign-in method bölümünde **Email/Password** yöntemini etkinleştirin.

## 3. Realtime Database Rules
Firebase Console > Realtime Database > Rules bölümünde `database.rules.json` dosyasındaki içeriği yayınlayın.

Kural mantığı:
- giriş yapmamış kullanıcı okuyamaz/yazamaz;
- giriş yapan kullanıcı yalnızca kendi `users/<uid>/` alanına erişir.

## 4. Authorized domains
Firebase Console > Authentication > Settings > Authorized domains:
- local test için: `localhost`
- GitHub Pages yayını sonrası: `<github-kullaniciadi>.github.io`

## 5. Local test
Klasörde bir HTTP sunucusu çalıştırın:

```bash
python -m http.server 8080
```

Sonra tarayıcıdan `http://localhost:8080` açın.
`file://` ile açmak Firebase modülleri/service worker için uygun değildir.

## 6. GitHub repo
Yeni bir repo oluşturup klasör içeriğini repo köküne yükleyin.
Önerilen ad: `t10x-battery-tracker`

## 7. GitHub Pages
Repo > Settings > Pages:
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/(root)`

Yayın URL'si genellikle:
`https://<kullaniciadi>.github.io/t10x-battery-tracker/`

## 8. İlk iPhone testi
Safari'de GitHub Pages URL'sini açın.
Firebase Console’da tanımlı tek kullanıcı hesabınızla giriş yapın.
Senkronizasyon doğrulandıktan sonra Safari Paylaş > Ana Ekrana Ekle ile PWA gibi kullanabilirsiniz.

## 9. Veri güvenliği
Firebase web config istemci tarafında görünür. Gerçek erişim kontrolü Authentication + Realtime Database Security Rules ile sağlanır.

## Tek kullanıcı modu (v0.9.4)

Bu sürümde uygulama giriş yapılmadan açılmaz ve web arayüzünde **Hesap Oluştur** seçeneği yoktur.

1. Firebase Console > Authentication > Users bölümüne gidin.
2. **Add user / Kullanıcı ekle** ile yalnızca kendi e-posta adresiniz ve bir şifre oluşturun.
3. Oluşan kullanıcının **User UID** değerini kopyalayın.
4. Realtime Database > Rules bölümünde `database.rules.single-user.template.json` dosyasını kullanın.
5. Dosyadaki `OWNER_UID_HERE` ifadesini kendi User UID değerinizle değiştirip Publish edin.

Bu kural, veritabanını yalnızca o UID'ye kilitler. Başka bir Firebase hesabı oluşturulsa dahi T10X veritabanını okuyamaz veya yazamaz.

GitHub'a v0.9.4 dosyalarını yükledikten sonra önceki service worker önbelleği nedeniyle eski ekranı görürseniz sayfayı yenileyin. Ana ekrana eklenmiş iPhone sürümünde uygulamayı tamamen kapatıp yeniden açmak da yeni service worker'ın devreye girmesini hızlandırır.


## v0.9.4 ek notlar
- `weather.js` GitHub Pages üzerinde otomatik hava sorgusu için gereklidir; repo kökünde tutulmalıdır.
- Konum izni yalnızca HTTPS/GitHub Pages (ve localhost geliştirme ortamı) üzerinde çalışır.
- Uygulama konum koordinatlarını Firebase veri modeline yazmaz.
- MGM resmi sayfası referans bağlantısıdır; tarayıcıdan otomatik sıcaklık için Open-Meteo kullanılır.
- Eski v0.8 verileri uygulama tarafından şema 10'a migrate edilir. JSON yedeğini yine de koruyun.


**v0.9.4:** GitHub Pages kök klasörüne `soc-model.js` ve yeni `consumption-model.js` dosyalarını koyun. Firebase kuralları değişmez. v12 veri modeli local/bulut v11 verilerini okuyabilir.


## v0.9.4 sürüm geçişi

1. Önce Dashboard > JSON Yedekle ile yedek alın.
2. ZIP içindeki **tüm** dosyaları (özellikle `consumption-model.js`, `app.js`, `index.html`, `app.css`, `sw.js`) mevcut GitHub Pages deposunun kök dizinine yerleştirin.
3. Mobil Safari sayfasını yenileyin; eski görünüm sürerse ana ekran uygulamasını kapatıp yeniden açın.
4. Dashboard > Güncel Araç Durumu formundan kilometre, SOC ve dilerseniz “Son şarjdan beri” tüketimini kaydedin.
5. Toplam sahiplik tüketimi manuel değildir. Yalnızca tüketimi bilinen sürüş km'leri ve uygun SOC tahmini bulunan tamamlanmış sürüşler kapsanır; önceki 1.181 km için otomatik enerji uydurulmaz.
6. Firebase Authentication veya Database Rules üzerinde değişiklik gerekmez.


## v0.9.4 — Dashboard tüketim değişikliği

- GitHub Pages kök klasörüne yeni `consumption-model.js` dosyasını da yükleyin. `index.html`, `app.js`, `app.css`, `sw.js` ve `README.md` dosyalarını güncelleyin.
- Firebase Security Rules veya kimlik doğrulama ayarları **değişmedi**. Yeni ayarlar aynı `users/<uid>/appData.settings` altında saklanır; şema v13'e yükselir ve eski kayıtlar korunur.
- Önce JSON yedeği alın. iPhone Safari'de önbelleğe takılırsa sayfayı tamamen yeniden yükleyin veya kurulu ana ekran kısayolunu kapatıp açın.
- Dashboard'daki “Şarjlarım eksiksiz” kutusunu yalnızca sahiplik başlangıcından bugüne tüm şarjların kWh değerlerini girdiyseniz işaretleyin. Hesap yaklaşık enerji dengesi tahminidir; üretici BMS verisinin yerine geçmez.
