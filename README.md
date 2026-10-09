# T10X Batarya & Şarj Takip v0.9.3 — NMC Decision Support

Kişisel T10X (88,5 kWh NMC) kullanımı için local-first + Firebase senkronizasyonlu, iPhone/PWA uyumlu batarya ve şarj takip uygulaması.

## v0.9.0 ana değişiklikleri

- **AC/DC artık sağlık skoru değildir.** DC/AC oranı istatistik olarak kalır; batarya stresi C-rate, SOC penceresi, şarj derinliği ve termal bağlamla değerlendirilir.
- **Düşük güçlü DC ayrı değerlendirilir.** Örn. 50 kW DC yaklaşık 0,56C, 180 kW yaklaşık 2,03C teorik paket oranıdır.
- **%20–80 koruma bandı** olarak tutulur; %20'yi bekleme veya her şarjı %80'e tamamlama zorunluluğu yoktur. Sığ şarjlar ΔSOC ile ayrı değerlendirilir.
- **SOC × zaman**: zaman damgalı şarj başlangıç/bitişleri ve manuel güncel SOC noktalarından ortalama SOC, >%80 saat ve >%90 saat proxy'si hesaplanır. 72 saatten uzun veri boşlukları integrasyona dahil edilmez.
- **CSI / CalSI / BSI**:
  - CSI: C-rate + ΔSOC + SOC pencere konumu
  - CalSI: SOC×zaman + termal bağlam
  - BSI: açıklanabilir birleşik maruziyet indeksi; SOH/RUL değildir.
- **Dinamik Şarj Planlayıcı**: mevcut SOC, planlanan mesafe, tüketim, rezerv, güvenlik payı, şarj gücü, hareket saati ve hava/park bağlamından gereken minimum hareket SOC'sini ve yaklaşık şarj zamanını hesaplar.
- **Saatlik termal zamanlama**: hava tahmini varsa, %80 altı hedeflerde termal açıdan daha uygun şarj penceresini arar; %80 üstü hedeflerde yüksek-SOC bekleme süresini azaltmak için hareket saatine yakın tamamlamayı önceler.
- **Termal proxy**: ortam sıcaklığı gerçek pack sıcaklığı olarak gösterilmez. Varsa BMS/servis batarya sıcaklığı önceliklidir; aksi halde ortam + park tipi + park süresi + şarj öncesi sürüşten nitel termal bağlam üretilir.
- **Konumdan hava**: iPhone Geolocation yalnızca sorgu anında kullanılır; enlem/boylam Firebase'e kaydedilmez. Browser-safe otomatik veri Open-Meteo'dan alınır. MGM resmi saatlik sayfasına uygulama içinden referans bağlantısı bulunur.
- **Teknik Rapor**: NMC/LFP, lithium plating, OCV-SOC, SEI/CEI, EFC, calendar/cycle aging ve uygulamanın v0.9 karar mantığı ayrı menüde açıklanır.

## Veri modeli

Firebase Realtime Database yolu:

`users/<uid>/appData`

Ana veri kümeleri:
- `settings`
- `providers`
- `charges`
- `trips`
- `consumptionSnapshots`
- `sohTests`
- `socSnapshots`
- `meta`

Şema sürümü: **10**. Eski local veriler otomatik migrate edilir.

## Güvenlik

- Firebase Authentication: Email/Password
- Web arayüzünde üyelik oluşturma yoktur.
- `database.rules.json` tek kullanıcı UID'sine kilitlidir.
- Firebase web config istemci tarafında bulunur; veri erişimi Authentication + Realtime Database Rules ile sınırlandırılır.

## GitHub Pages

Repo köküne bu klasörün içindeki dosyaları yükleyin.

Settings > Pages > Deploy from a branch > `main` / `(root)`

Yeni service-worker cache adı `t10x-battery-v0.9.0-planner` olduğundan eski v0.8.x önbellekleri aktivasyon sırasında temizlenir.

## Bilimsel sınır

Uygulamadaki CSI, CalSI, BSI ve Batarya Sağlık Skoru üretici BMS algoritması değildir. Bunlar literatürde tanımlanan mekanizmaları saha verisine açıklanabilir biçimde uygulayan karar-destek göstergeleridir. Gerçek hücre sıcaklığı, pack current, hücre gerilim dağılımları ve üretici SOH/DCIR verileri erişilebilir hale gelirse model geliştirilebilir.


## v0.9.1 - Terimler ve Kısaltmalar

- Ayrı **Terimler & Kısaltmalar** menüsü eklendi.
- 40+ teknik terim Türkçe karşılığı, İngilizce adı/kısaltması ve uygulamadaki pratik anlamıyla açıklanır.
- Arama kutusu ile terimler filtrelenebilir.
- Kullanıcı arayüzünde bazı İngilizce teknik ifadeler Türkçe öncelikli hale getirildi (ör. Enerji Geçişi / Throughput, Batarya Stres İndeksi / BSI).


## v0.9.2 - C-rate göstergeleri ve kayıt bağlamı

- **En Yüksek Şarj Ortalaması (C-rate):** Sahiplik dönemi oturumlarında enerji/süre ile ölçülebilen ortalama C-rate değerlerinin maksimumu. Tarih, sağlayıcı ve seans ortalama kW'si gösterilir.
- **En Yüksek Anlık Şarj Hızı (C-rate):** Girilmiş opsiyonel maksimum güçten hesaplanan tepe C-rate'lerin maksimumu. Tarih, sağlayıcı ve maksimum kW gösterilir.
- **Enerji Ağırlıklı Ortalama C-rate:** Yalnız hem istasyondan alınan kWh hem şarj süresi mevcut olan oturumlarda Σ(enerji × oturum ortalama C-rate) / Σ(enerji). Eksik kayıtlar değere sıfır olarak katılmaz; kapsanan kWh ve oturum sayısı gösterilir.
- Metrikler Gösterge Paneli, Analizler ve Stres Analizi içinde tutarlıdır. Bu gösterimler geçmiş Firebase verilerini veya batarya stres puanı formüllerini değiştirmez.
- Önceki sahip kayıtları kullanıcıya ait şarj istatistiklerinin dışında kalır.
- Service worker sürümü `t10x-battery-v0.9.2-crate-metrics` olarak güncellendi.


## v0.9.3 - sürüş / park / SOC zaman modeli

- Dashboard'da **Sürüşe Başla / Sürüşü Bitirdim / Yalnızca Durumu Güncelle**.
- İsteğe bağlı sürüş ortalaması: kWh/100 km; eşleşmiş sürüşlerde ayrıca ayrıntılı sürüş kayıtlarına eklenir. Son şarjdan beri tüketim sayaç kaydıyla karıştırılmaz.
- Başlangıç noktası olmadan sürüşü bitirme mümkün; kayıt, belirsiz sürüş dönemi olarak tutulur.
- `driveSessions` ve `activeDrive` verileri Firebase JSON içeriğine dahil edilir; şema v11, eski v10 otomatik okunur.
- SOC-zaman hesabında yalnızca gözlenen park süreleri CalSI'ye girer: **aynı km, SOC farkı en çok 3 yüzde puanı, aralık en çok 72 saat**. Giriş-çıkış zamanlarıyla bilinen sürüş ve şarj ayrılır. Uzun ve belirsiz boşluklar hesap dışında kalır.
- Doğrulanan parkın bitişi henüz gelmediyse, sürekli park varsayılıp süre ileriye doğru hesaplanmaz.
- Stres Analizi sayfasında ayrı park / sürüş / şarj / belirsiz saat ve veri güveni; son sürüşler ve CSV.
- ÖNEMLİ: Bu park ayrımı **mühendislik amaçlı konservatif zaman modeli**; doğrudan BMS telemetrisi veya doğrulanmış SOH tahmini değildir.
- Tek kullanıcı Firebase Rules ve Firebase config aynen korunur; GitHub Pages köküne yeni `soc-model.js` de yüklenmelidir.

### Test

`node tests/soc-model.test.js` (8 sentetik kontrol). Firebase Authentication / Realtime Database canlı bağlantısı ve iPhone Safari etkileşimi bu testlere dahil değildir.
