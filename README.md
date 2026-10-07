# T10X Batarya & Şarj Takip v0.9.1 — NMC Decision Support

Kişisel T10X (88,5 kWh NMC) kullanımı için local-first + Firebase senkronizasyonlu, iPhone/PWA uyumlu batarya ve şarj takip uygulaması.

## v0.9.1 ana değişiklikleri

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

Yeni service-worker cache adı `t10x-battery-v0.9.1-planner` olduğundan eski v0.8.x önbellekleri aktivasyon sırasında temizlenir.

## Bilimsel sınır

Uygulamadaki CSI, CalSI, BSI ve Batarya Sağlık Skoru üretici BMS algoritması değildir. Bunlar literatürde tanımlanan mekanizmaları saha verisine açıklanabilir biçimde uygulayan karar-destek göstergeleridir. Gerçek hücre sıcaklığı, pack current, hücre gerilim dağılımları ve üretici SOH/DCIR verileri erişilebilir hale gelirse model geliştirilebilir.


## v0.9.1 - Terimler ve Kısaltmalar

- Ayrı **Terimler & Kısaltmalar** menüsü eklendi.
- 40+ teknik terim Türkçe karşılığı, İngilizce adı/kısaltması ve uygulamadaki pratik anlamıyla açıklanır.
- Arama kutusu ile terimler filtrelenebilir.
- Kullanıcı arayüzünde bazı İngilizce teknik ifadeler Türkçe öncelikli hale getirildi (ör. Enerji Geçişi / Throughput, Batarya Stres İndeksi / BSI).
