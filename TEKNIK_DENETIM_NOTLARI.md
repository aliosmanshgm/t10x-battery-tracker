# T10X v0.9.5 — SOH ve Sayfalar Arası Bilimsel/Teknik Denetim

**Kapsam:** v0.9.4 kodundan v0.9.5 güncellemesi. İnceleme statik kaynak kodu ve otomatik modül testlerini kapsar. Üretici BMS telemetrisi, gerçek Firebase hesabı ve iPhone Safari ile canlı doğrulama yapılmamıştır.

## Esas metodolojik düzeltme

- **Ölçüm–varsayım ayrımı:** Şarj istasyonu sayacı (kWh) bataryaya geçen net enerji değildir. Şarj kaybı kullanıcı tarafından bilinmediği için SOH testi zorunlu varsayılan `%8` kayıpla hesaplanmıyor.
- SOH üç ayrı giriş türüne ayrıldı: **BMS/servis SOH raporu**, **ölçülmüş net batarya enerjisi**, **istasyon enerjisinden duyarlılık senaryosu**.
- Sadece istasyon sayacı biliniyorsa AC için **örnek %5–15**, DC için **örnek %2–12** kayıp *senaryosu* hesaplanır. Bunlar üretici verisi, popülasyon tahmini, güven aralığı veya ömür ölçümü değildir. Kullanıcının gerçekten ölçtüğü kayıp varsa tek değer olarak girilebilir.
- SOH yüzdesini net enerjiyle türetmek için **aynı sınırları temsil eden yeni batarya kullanılabilir kapasite** referansı gerekir. 88,5 kWh nominal paket kapasitesi varsayılan kullanılabilir kapasite olarak kullanılmaz.
- Eski SOH kayıtları silinmez; `legacy` olarak tanınır. Eski `%8`/`%4` kayıp varsayımından üretilen SOH, yeni *SOH Ölçümü* ve *SOH Eğilimi* göstergelerine katılmaz.

## Diğer sayfaların denetim sonucu

| Sayfa / hesaplama | Bulgular | v0.9.5 uygulaması / sonuç |
|---|---|---|
| **Dashboard** | Eski “Batarya Sağlık Skoru”, SOH ile kullanıcı alışkanlığı indeksini matematiksel olarak birleştiriyordu. | **Kullanım Profili Skoru** adlandırıldı; SOH artık skora girmez. SOH ayrı kart. |
| **Şarj Kayıtları** | kWh eksikse nominal kapasite × SOC farkı istasyon enerjisi gibi sayılıyordu. | `chargeEnergyValue()` yalnızca gerçekten girilmiş kWh kullanır. Eksik oturum dışarıda kalır, kapsam gösterilir. |
| **Tüketim / Sürüş** | Mülkiyetin tamamı ile örnek sürüş kapsamı ayrılıyor; enerji dengesi AC/DC verimine bağlı. | v0.9.4 kapsam kontrolü korunur. Eksik veri kesin ortalama diye gösterilmez. |
| **SOH Testleri** | Kullanıcıdan bilemeyeceği şarj kaybı isteniyor, tek varsayımla kesin SOH üretiliyordu; nominal/usable referans ayrılmıyordu. | Yeni üç kaynaklı model, senaryo, kaynak, eksik referans etiketleri. |
| **C-rate Simülatörü** | Güç / nominal enerji kapasitesi hücre C-rate değil yaklaşık paket proxy'sidir. | Bu uyarı korunur; sonuçlar doğrudan batarya ömür kaybı/teşhis sayılmaz. |
| **Şarj Planlayıcı** | Tüketim, sıcaklık, şarj gücü, AC/DC verimleri ve SOC model varsayımlarına bağlı. | Tahmin/proxy açıklamaları korunur; gerçek zamanlı batarya ısısı ve şarj eğrisi olmadığı için sonuç yaklaşık. |
| **Analizler** | SOH eğilimi eski varsayımsal testlerle kesin yüzdelik gibi dolabiliyordu. Aylık tüketim grafiğinde eksik değer `0` sayılabiliyordu. | SOH eğiliminde yalnız BMS ve net-enerji saha kestirimi bulunur. Eksik aylık tüketim sıfır sayılmaz. |
| **Stres Analizi** | Enerji ve SOC verisinin kapsayıcılığı aynı şeymiş gibi görülebiliyordu; enerji eksikleri tahmini kWh ile dolduruluyordu. | Enerji yalnız ölçülen kWh'den; kapsam **oturum sayısı ve enerji veri varlığı** üzerinden verilir. Kısmi enerji varsa puan *oturum ortalaması* olarak hesaplanır. |
| **Teknik Rapor** | “Charge-side EFC” hücre tam çevrimi ile karıştırılabilirdi. | `Σ istasyon kWh / nominal kWh` olarak belirtildi; **hücre EFC'si değildir**. SOH yöntem metni değiştirildi. |
| **Ayarlar / Firebase** | Verim varsayımı kullanıcıya açıklanmalı; kimlik/meteoroloji istekleri service worker önbelleğine girebiliyordu. | Verim varsayımları ayrı kaldı; service worker artık yalnız **aynı origin'deki statik içerikleri** önbellekliyor. UID erişim kuralları değiştirilmedi. |

## Önemli kalan belirsizlikler — sayısal hata anlamına gelmeyebilir

1. **Gerçek SOH:** BMS tarafından ölçülen/gösterilen değer veya servis raporu dışında kesin SOH verimiz yok. SOC×kWh örnekleri, hücre gerilim-akım ve sıcaklık eğrileri olmadan tanısal değildir.
2. **Gerçek C-rate:** İstasyon ekranındaki güç ve enerji, hücredeki DC akım zaman serisini temsil etmez. Tepe gücün ne kadar sürdüğü bilinmiyor.
3. **Takvim yaşlanması:** Açık/kapalı parkın gerçek paket sıcaklığı ölçülmüyor. Meteorolojik sıcaklık yalnız proxy'dir.
4. **BSI/CSI/CalSI:** Literatürden türetilmiş ama T10X hücresiyle kalibre edilmemiş, kullanıcı karar desteği amaçlı *heuristic* endekslerdir. **SOH veya kalan kullanım ömrü (RUL) öngörüsü değildir.**
5. **100 km maliyet:** Örneklemdeki maliyetli şarjlar ve ayarlı AC/DC verim varsayımlarına göre yaklaşık batarya-kWh başına maliyetten türetilir. Tüm harcama geçmişine veya fatura düzeyinde muhasebeye eşit değildir.
6. **Sahiplik tüketimi:** Tam şarj defteri kullanıcı tarafından onaylansa bile şarj verimi, kullanılabilir enerji, yardımcı tüketim ve kayıt başlangıç/bitiş SOC hataları sonucu etkiler.
7. **SOC-zaman:** Doğrulanmış park aralıkları kabul edilir; boşluklar ve bilinmeyen sürüş süreleri net yaşam maruziyeti sayılmaz. Ölçüm kapsamı artırılmalıdır.

## Doğrulama

- `node --check` (uygulama, SOH modülü, SW) başarılı.
- `node tests/soh-model.test.js`: senaryo, BMS, net enerji, hatalı veri, eski veri ayrımı başarılı.
- `node tests/consumption-model.test.js`: 16 enerji/tüketim testi başarılı.
- `node tests/soc-model.test.js`: 8 park/sürüş/zaman testi başarılı.
- HTML: 124 JavaScript DOM bağı ve 6 yerel JS dosyası mevcut; 212 HTML ID'si benzersiz.
- **Canlı Firebase + iPhone Safari:** doğrulanmadı; headless tarayıcı testi dış bağlantı zaman aşımı nedeniyle tamamlanamadı.

## Kaynak ve kısıtlar

- Song et al. (2023), [SOC/SOH referans test prosedürü](https://doi.org/10.1002/ese3.1581).
- [Measurement of power loss during electric vehicle charging and discharging](https://doi.org/10.1016/j.energy.2017.03.015): Verim değişkenliği.
- Deneysel aralıklar, şarj kayıp duyarlılık senaryolarını **kalibre etmiyor**. Senaryo aralıkları karar vericinin belirsizliği görmesi içindir.
