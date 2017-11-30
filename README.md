# tahapi


Tahapi 2 hafta gibi kısıtlı bir sürede solo yazılmış bir IONIC(1.x)-android projesidir. Dosya büyüklüğünü küçültmek için android platformu kaldırılmıştır. Denemeden önce android platformu eklenmelidir. 



```
$ ionic cordova add android
```

IONIC CLI'da ki son güncellemelerden ve yeni versiyona geçişten dolayı özellikle crosswalk hataları görmek mümkündür. Aslen kod referansı olarak eklenmiştir.

Api'den alınan json datalar video ve resim listesi olarak listelenmekte. Resim ve videolara yorum yapılabilmekte ve puan verilebilmektedir. Ayrıca son kullanıcı resim ya da video çekerek ya da galeriden seçerek sunucuya yollayabilmektedir. Çok büyük videolar Cordova-Video-Plugin ile arka planda sıkıştırılır.

Uygulamaya google ya da facebook ile girilmektedir.

Öncelikle Google ya da facebook hesabı üzerinden web api için gerekli ayarlar yapılıp gerekli yerlere api_keyler girilmelidir.
```
//Facebook
$cordovaOauth.facebook("[FACEBOOK_API_KEY]", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {...

//Google
 $cordovaOauth.google("[GOOGLE_API_KEY]", ["email"]).then(function(result) {...
```

Uygulama verilerini bir api sunucusundan çeker. Api kodları ayrı bir proje olarak paylaşılacaktır. Her şartta api'den veirler $http.get ile çekilir. Dolayısıyla gerekli web adresinin WEB-API-SUNUCUSU yazan yerlere eklenmesi gerekmektedir.

```
$http.get('[WEB-API-SUNUCUSU]', {params: para})...
```

Proje aslen referans niteliğindedir. Çok kısıtlı sürede ve başlangıçta kütüphane ve dil bilinmeden, süreç boyunca öğrenilerek yazılmıştır. 

IOS üzerinde hiç denenmemiştir.
