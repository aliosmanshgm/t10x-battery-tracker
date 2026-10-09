# Firebase + GitHub Pages Kurulum Kontrol Listesi — v0.9.3

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

## Tek kullanıcı modu (v0.9.3)

Bu sürümde uygulama giriş yapılmadan açılmaz ve web arayüzünde **Hesap Oluştur** seçeneği yoktur.

1. Firebase Console > Authentication > Users bölümüne gidin.
2. **Add user / Kullanıcı ekle** ile yalnızca kendi e-posta adresiniz ve bir şifre oluşturun.
3. Oluşan kullanıcının **User UID** değerini kopyalayın.
4. Realtime Database > Rules bölümünde `database.rules.single-user.template.json` dosyasını kullanın.
5. Dosyadaki `OWNER_UID_HERE` ifadesini kendi User UID değerinizle değiştirip Publish edin.

Bu kural, veritabanını yalnızca o UID'ye kilitler. Başka bir Firebase hesabı oluşturulsa dahi T10X veritabanını okuyamaz veya yazamaz.

GitHub'a v0.9.3 dosyalarını yükledikten sonra önceki service worker önbelleği nedeniyle eski ekranı görürseniz sayfayı yenileyin. Ana ekrana eklenmiş iPhone sürümünde uygulamayı tamamen kapatıp yeniden açmak da yeni service worker'ın devreye girmesini hızlandırır.


## v0.9.3 ek notlar
- `weather.js` GitHub Pages üzerinde otomatik hava sorgusu için gereklidir; repo kökünde tutulmalıdır.
- Konum izni yalnızca HTTPS/GitHub Pages (ve localhost geliştirme ortamı) üzerinde çalışır.
- Uygulama konum koordinatlarını Firebase veri modeline yazmaz.
- MGM resmi sayfası referans bağlantısıdır; tarayıcıdan otomatik sıcaklık için Open-Meteo kullanılır.
- Eski v0.8 verileri uygulama tarafından şema 10'a migrate edilir. JSON yedeğini yine de koruyun.


**v0.9.3:** GitHub Pages kök klasörüne `soc-model.js` dosyasını da koyun. Firebase kuralları değişmez. İlk açılışta v11 veri modeli local v10 ve bulut v10 ile uyumludur.
