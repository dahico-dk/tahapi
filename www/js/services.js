var app = angular.module('starter.services', []);

// app.constant("Photo_Url", "http://feeds.feedburner.com/TEDTalks_video");
app.factory("FeedServiceAll", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'kategori':1
  };

  self.LoadMore=function(){
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.page=1;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      //page:self.page, kat:self.kategori,
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FeedService", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'refr':false,
    'hasMore': true,
    'kategori':1,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };

  self.LoadMore=function(){
    self.refr=false;
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.page=1;
    self.refr=true;
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      page:self.page,
      kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if(self.refr==true){
         self.results=[];

        }
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });

          console.log(self.results)
        }
        deferred.resolve(data);
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FeedService2", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'kategori':2,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
    'refr':false,
  };

  self.LoadMore=function(){
    self.refr=false;
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.refr=true;
    self.page=1;
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    if(self.refr==true){
      self.results=[];
    }
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      page:self.page, kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FeedService3", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'refr':false,
    'hasMore': true,
    'kategori':3,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };

  self.LoadMore=function(){
    self.refr=false;
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.page=1;
    self.refr=true;
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      page:self.page,
      kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if(self.refr==true){
          self.results=[];

        }
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });

          console.log(self.results)
        }
        deferred.resolve(data);
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FavVidsService",function($q, $http,$ionicPopup){
  var self={
    'isLoading':false,
    'isFav':false,
    'kategori':'',
    'results':[],
    'facebooktoken':'',
    'googletoken':'',
    'email':'',

  };
  self.Refresh=function(){
    self.page=1;
    return self.favs()
  };
  self.favs=function(){
    self.results=[];
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      kat:self.kategori,
      googletoken:self.googletoken,
      facebooktoken:self.facebooktoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FavVidsService2",function($q, $http,$ionicPopup){
  var self={
    'isLoading':false,
    'isFav':false,
    'kategori':'',
    'results':[],
    'facebooktoken':'',
    'googletoken':'',
    'email':'',

  };
  self.Refresh=function(){
    self.page=1;
    return self.favs()
  };
  self.favs=function(){
    self.results=[];
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      kat:self.kategori,
      googletoken:self.googletoken,
      facebooktoken:self.facebooktoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FavVidsService3",function($q, $http,$ionicPopup){
  var self={
    'isLoading':false,
    'isFav':false,
    'kategori':'',
    'results':[],
    'facebooktoken':'',
    'googletoken':'',
    'email':'',

  };
  self.Refresh=function(){
    self.page=1;
    return self.favs()
  };
  self.favs=function(){
    self.results=[];
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      kat:self.kategori,
      googletoken:self.googletoken,
      facebooktoken:self.facebooktoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FavPicsService",function($q, $http,$ionicPopup){
  var self={
    'isLoading':false,
    'isFav':false,
    'kategori':'',
    'results':[],
    'facebooktoken':'',
    'googletoken':'',
    'email':'',

  };
  self.Refresh=function(){
    self.page=1;
    return self.favs()
  };
  self.favs=function(){
    self.results=[];
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      kat:self.kategori,
      googletoken:self.googletoken,
      facebooktoken:self.facebooktoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FavPicsService2",function($q, $http,$ionicPopup){
  var self={
    'isLoading':false,
    'isFav':false,
    'kategori':'',
    'results':[],
    'facebooktoken':'',
    'googletoken':'',
    'email':'',

  };
  self.Refresh=function(){
    self.page=1;
    return self.favs()
  };
  self.favs=function(){
    self.results=[];
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      kat:self.kategori,
      googletoken:self.googletoken,
      facebooktoken:self.facebooktoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FavPicsService3",function($q, $http,$ionicPopup){
  var self={
    'isLoading':false,
    'isFav':false,
    'kategori':'',
    'results':[],
    'facebooktoken':'',
    'googletoken':'',
    'email':'',

  };
  self.Refresh=function(){
    self.page=1;
    return self.favs()
  };
  self.favs=function(){
    self.results=[];
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      kat:self.kategori,
      googletoken:self.googletoken,
      facebooktoken:self.facebooktoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          console.log(self.results)
        }
        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});

app.factory("FeedVideoServiceAll", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'kategori':1
  };

  self.LoadMore=function(){
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.page=1;
    return self.load()
  };
  self.load=function (){
    self.isLoading = true;

    var deferred = $q.defer();
    var para = {
      page:self.page, kat:self.kategori,
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        //console.log('dönen data')
        //console.log(data)
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          //console.log(self.results)
        }
        deferred.resolve(self.results);
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FeedVideoService", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'totalvideo':[],
    'page': 1,
    'isLoading': false,
    'loadingmore': false,
    'refr':false,
    'hasMore': true,
    'kategori':1,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };

  self.LoadMore=function(){
    self.loadingmore=true;
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    console.log('refreshservice')
    self.page=1;
    self.refr=true;
    self.hasMore=true;
    return self.load();

  };
  self.load=function (){
    self.isLoading = true;
  if(self.refr==true){
    self.results=[];
    self.totalvideo=[];
  }
    var deferred = $q.defer();
    var para = {
      page:self.page, kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        //console.log('dönen data')
        console.log(data)
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });

          //console.log(self.results)
        }
        deferred.resolve(self.results);
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FeedVideoService2", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'refr':false,
    'kategori':2,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };

  self.LoadMore=function(){
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    console.log('refreshservice')
    self.page=1;
    self.hasMore=true;
    self.refr=true;
    return self.load();

  };
  self.load=function (){
    self.isLoading = true;
    if(self.refr==true){
      self.results=[];
    }
    var deferred = $q.defer();
    var para = {
      page:self.page, kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        //console.log('dönen data')
        //console.log(data)
        if (data.length == 0) {
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          //console.log(self.results)
        }
        deferred.resolve(self.results);
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("FeedVideoService3", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'refr':false,
    'kategori':3,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };

  self.LoadMore=function(){
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.page=1;
    self.hasMore=true;
    self.refr=true;
    return self.load()
  };
  self.load=function (){
    self.isLoading = true;
if(self.refr==true){
  self.results=[];
}
    var deferred = $q.defer();
    var para = {
      page:self.page, kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        if (data.length == 0) {
         console.log('here');
          self.hasMore = false;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          //console.log(self.results)
        }
        deferred.resolve(self.results);
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});
app.factory("VideoProvider", ["$q", "$http", "$sce",
  function ($q, $http, $sce) {
    var defer = $q.defer();

    this.loadVideo = function loadVideo(url) {
      $http.get(url).then(
        this.onLoadVideo.bind(this),
        this.onLoadVideoError.bind(this)
      );

      return defer.promise;
    };

    this.onLoadVideo = function onLoadVideo(response) {
      var videos = [];

      for (var i=0, l=response.data.sources.length; i<l; i++) {
        videos.push({src: $sce.trustAsResourceUrl(response.data.sources[i].src), type: response.data.sources[i].type});
      }

      response.data.sources = videos;

      defer.resolve(response.data);
    };

    this.onLoadVideoError = function onLoadVideoError(error) {
      defer.reject(error);
    };
  }
]);
app.factory("MemberService", function ($q, $http,$ionicPopup) {
  var self2 = {
    'memberresults': []
  };
  self.load=function (facebooktoken,googletoken,ad,soyad,eposta,profpic){
    self.isLoading = true;
    var deferred = $q.defer();
    //ionic.Platform.ready(function () {
    //  $cordovaGeolocation
    //    .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
    //    .then(function (position) {
    //      self.lat = position.coords.latitude;
    //      self.lon = position.coords.longitude;
    //      console.log(self.lat);
    //      console.log(self.lon);
    //    })
    //});
    var para = {
      facebooktoken: facebooktoken,
      googletoken:googletoken,
      ad: ad+' '+soyad,
      eposta:eposta,
      fid:profpic

    };
    console.info(para);

    $.ajax({
      type: "POST",
      url: "[WEB-API-SUNUCUSU]",
      data: para,
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
        console.log('dönen data');
        console.log(data);
        console.log(data.success);
        console.log(data.Ban);
        //self.isLoading = false;
        //if (data.length == 0) {
        //  self.hasMore = false;
        //} else {
        //  angular.forEach(data.items, function (items) {
        //    self.memberresults.push(items);
        //  });
        //  //console.log(self.results);
        //}

        deferred.resolve(data);
      },
      error: function (data, status, headers, config,err) {
        self.isLoading = false;

        deferred.reject(data);
      }
    });


    return deferred.promise;
  };


  return self;
});
app.factory("UploadService",function($cordovaFileTransfer,$ionicPlatform,$cordovaFile,$q){
  var self={
    'isLoading':false,
    'transcode':false,
    'filelink':'',
    'kategoriid':'',
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
    'filetype':''

  };
  self.upload=function(){
    var deferred = $q.defer();
    //var headers={'kategoriid':kategoriid,'ftoken':ftoken,'gtoken':gtoken,'filetype':filetype};


    var options = {
      fileKey: "file",

      chunkedMode: false,


    };
    var para = {};
    para.kategoriid = self.kategoriid;
    para.facebooktoken = self.facebooktoken;
    para.googletoken=self.googletoken;
    para.filetype=self.filetype;
    para.email=self.email;
    options.params = para;
    console.log(options);
    $cordovaFileTransfer.upload("[WEB-API-SUNUCUSU]", self.filelink, options).then(function(result) {
      console.log("SUCCESS: " + JSON.stringify(result.response));

      deferred.resolve(result.response)

    }, function(err) {
      console.log("ERROR: " + JSON.stringify(err));
      deferred.reject(err);
    }, function (progress) {});

    return deferred.promise;
  };
  return self;
});

app.factory("UploadVidService",function($cordovaFileTransfer,$ionicPlatform,$cordovaFile,$q){
  var self={
    'isLoading':false,
    'transcode':false,
    'filelink':null,
    'kategoriid':null,
    'facebooktoken':null,
    'googletoken':null,
    'email':null,
    'filetype':null

  };
  self.upload=function(){
    var deferred = $q.defer();
    //var headers={'kategoriid':kategoriid,'ftoken':ftoken,'gtoken':gtoken,'filetype':filetype};


    var options = {
      fileKey: "file",
      fileName: "upfile.mp4",
      chunkedMode: false,
      mimeType: "video/mp4",

    };
    var para = {};
    para.kategoriid = self.kategoriid;
    para.facebooktoken = self.facebooktoken;
    para.googletoken=self.googletoken;
    para.filetype=self.filetype;
    options.params = para;

    $cordovaFileTransfer.upload("[WEB-API-SUNUCUSU]", self.filelink, options).then(function(result) {
      console.log("SUCCESS: " + JSON.stringify(result.response));

      deferred.resolve(result.response)

    }, function(err) {
      console.log("ERROR: " + JSON.stringify(err));
      deferred.reject(err);
    }, function (progress) {});

    return deferred.promise;
  };
  return self;
});

app.factory("VInfoService",function($q,$ionicPopup){
  var self={
    'isLoading':false,
    'infowait':false,

  };
  self.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Eklemeye çalıştığınız video çok uzun!',
      template: 'Lütfen en fazla otuz saniye olan bir video seçiniz.'
    });

    alertPopup.then(function(res) {
      console.log('ShowAlert');
    });
  };
  self.getinfo=function(videourl){
    var deferred = $q.defer();
    window.resolveLocalFileSystemURL(videourl, onResolveSuccess, fail);
    function onResolveSuccess(fileEntry) {

      VideoEditor.getVideoInfo(
        getVideoInfoSuccess,
        getVideoInfoError,
        {
          fileUri:videourl
        }
      );

      function getVideoInfoSuccess(info) {
        console.log('getVideoInfoSuccess, info: ' + JSON.stringify(info, null, 2));
        if(info.duration>32){
          deferred.reject('Çok uzun video');
          //self.showAlert();
        }
        else{
          deferred.resolve(info)
        }


      }
      function getVideoInfoError(info){
        deferred.reject(info);
      }

    }

    function fail(evt) {
      console.log(evt.target.error.code);
      deferred.reject(evt);
    }

    return deferred.promise;
  };
  return self;

});

app.factory("CompressService",function($q,$ionicPopup){
  var self={
    'isLoading':false,
    'isTranscoding':false,
  };
  self.transcode=function(fileurl){
    console.log("tr start:"+new Date());
    console.log(fileurl);
    self.isTranscoding=true;
    var deferred=$q.defer();
    VideoEditor.transcodeVideo(
      convertsuccess, // success cb
      converterror, // error cb
      {
        fileUri: fileurl, // the path to the video on the device
        outputFileName: 'trnsvideo', // the file name for the transcoded video
        outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
        optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.NO,
        saveToLibrary: false, // optional, defaults to true
        deleteInputFile: false, // optional (android only), defaults to false
        maintainAspectRatio: true, // optional, defaults to true
        width: 320, // optional, see note below on width and height
        height: 320, // optional, see notes below on width and height
        videoBitrate: 1000000, // optional, bitrate in bits, defaults to 1 megabit (1000000)
        fps: 24, // optional (android only), defaults to 24
        audioChannels: 2, // optional, number of audio channels, defaults to 2
        audioSampleRate: 44100, // optional, sample rate for the audio, defaults to 44100
        audioBitrate: 128000, // optional, audio bitrate for the video in bits, defaults to 128 kilobits (128000)
        progress: function(info) {console.log(info)} // optional, see docs on progress
      }
    );
    function convertsuccess(info){
      self.isTranscoding=false;
      deferred.resolve(info)
    }
    function converterror(info){
      self.isTranscoding=false;
      console.log(info);
      deferred.reject("22")
    }
    return deferred.promise;
  };

  return self;
});

app.factory("NotificationService",function($q,$cordovaPush,$ionicPlatform){

  var self={
    'notificationset':true
  };
self.note=function(){
  $ionicPlatform.ready(function(){
    $cordovaLocalNotification.schedule({
      id: 1,
      title: 'Yükleme tamamlandı',
      text: 'Videonuz sıkıştırıldı ve yollandı!',
      data: {
        customProperty: 'custom value'
      }
    }).then(function (result) {
      console.log('Notification 1 triggered');
    });
  })

}
});

app.factory("CaptureService",function($q,$cordovaCapture,$cordovaCamera){
  var self={
    'iscapturing':false
  };
  self.capture=function(){
    console.log("capture started");
    var deferred= $q.defer();
    var options = { limit: 1, duration: 30,quality:1 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video datası döndü
      console.log(videoData);
      deferred.resolve(videoData)
    }, function(err) {
      //hata oluştu mesaj ver
      deferred.reject("Error")
    });
    return deferred.promise;

  };
  return self
});
//app.factory("BanService", function ($q, $http,$ionicPopup) {
//  var self = {
//    'banned': false,
//    'facebooktoken':'',
//    'googletoken':'',
//    'email':'',
//  };
//
//  self.bancheck=function (){
//    console.log('post');
//    self.isLoading = true;
//    var deferred = $q.defer();
//    var para = {
//      facebooktoken:self.facebooktoken,
//      googletoken:self.googletoken,
//      email:self.email
//    };
//
//    $http.get('[WEB__API]', {params: para})
//      .success(function (data) {
//        self.isLoading = false;
//        console.log('dönen data')
//        console.log(data)
//
//        deferred.resolve(data);
//      })
//      .error(function (data, status, headers, config) {
//
//        deferred.reject(data);
//      })
//    return deferred.promise;
//  };
//  return self;
//})
app.factory("TakePicture",function($q,$cordovaCamera){
  var self={
    'takingpicture':false
  };

  self.selfi=function(){
    var deferred=$q.defer();
    var options = {

      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
      allowEdit : false,
      quality: 70,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      targetWidth : 334,
      targetHeight : 432,
      popoverOptions: CameraPopoverOptions,
    };

    // 3
    $cordovaCamera.getPicture(options).then(function(imageData) {

      onImageSuccess(imageData);

      function onImageSuccess(fileURI) {

        deferred.resolve(fileURI)
      }

      function fail(error) {
        console.log("fail: " + error.code);
        deferred.reject("Error")
      }


    }, function(err) {
      console.log(err);
    });
    return deferred.promise;
  };
  return self;
});

app.factory("GalleryVideoService",function($q,$cordovaCamera){

  var self={
    'ischs':false
  };
  self.galleryvideo=function(){
    var deferred=$q.defer();

    var options = {

      mediaType: Camera.MediaType.VIDEO,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY

    };

    $cordovaCamera.getPicture(options).then(function(videoUrl) {

      deferred.resolve(videoUrl);
      //$scope.testvideourl='file:'+videoUrl;
      console.log(videoUrl)
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };
  return self;
});

app.factory("GalleryPhotoService",function($q,$cordovaCamera){

  var self={
    'ischs':false
  };
  self.gallerypic=function(){
    var deferred=$q.defer();

    var options = {

      mediaType: Camera.MediaType.PICTURE,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true,


  };

    $cordovaCamera.getPicture(options).then(function(photourl) {

      deferred.resolve(photourl);
      //$scope.testvideourl='file:'+videoUrl;

    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };
  return self;
});

app.factory("PicPoint",function($q,$http,$cordovaToast){

  var self={
    'puan':0,
    'fotoid':'',
    'videoid':'',
    'googletoken':null,
    'facebooktoken':null,
    'email':null

  };

  self.updatepoint=function(tpoint){
    var para={
'puan':self.puan,
     'facebooktoken':self.facebooktoken,
      'googletoken':self.googletoken,
      'fotoid':self.fotoid,
      'videoid':self.videoid,
      'puan':self.puan,
      'email':self.email
};

    var deferred=$q.defer();
    $.ajax({
      type: "POST",
      url: "[WEB-API-SUNUCUSU]",
      data: para,
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
        console.log('dönen data');
        console.log(data);
        $cordovaToast
          .show("Puanınız kaydedildi", 'short', 'center')
          .then(function(success) {
            console.log("toast")
          }, function (error) {

          });
        deferred.resolve(data);
      },
      error: function (data, status, headers, config,err) {



        deferred.reject(data);
      }
    });
    return deferred.promise;
  };
  return self;
});

app.factory("MTO",function(){

  var self={
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
    'profilename':'',
    'profilepic':'',
    'userid':'',
    'videolist':[],
    'picturelist':[],
    'shoplist':[]

  };
  return self;

});

app.factory("AlertService",function($ionicPopup){

 var self={
   'title':'',
   'message':''
 };

  self.alert=function(){
    var alertPopup = $ionicPopup.alert({
      title: self.title,
      template: self.message,
      okText: 'OK'
    });

    alertPopup.then(function(res) {
      console.log('Yollandi');
    });
  };
return self;
});

app.factory("AlertService2",function($ionicPopup){

  var self={
    'title':'',
    'message':''
  };
//test alarmı. Calısıyormu dıye bırakıldı
  self.alert=function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };
  return self;
});

app.factory("ProfileService",function(MTO,$q,$http,$cordovaToast){
  var self={
    'profilename':'',
    'email':'',
    'profilepic':'',
    'resultvid':[],
    'resultpic':[],
    'resultshop':[],
    'facebooktoken':'',
    'googletoken':'',
    'toplamresim':'',
    'toplamvideo':'',
    'toplamdukkan':''

  };
  self.load=function (){
    self.isLoading = true;
     console.log(MTO);
    var deferred = $q.defer();
    var para = {

      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,

    };

    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        self.toplamresim=data.toplamresim;
        self.toplamvideo=data.toplamvideo;
        self.profilename=data.profilename;
        self.toplamdukkan=data.toplamdukkan;
        self.email=data.email;
        self.profilepic=data.profilepic;
        self.resultvid=data.resultvids;
        self.resultpic=data.resultpic;
        self.resultshop=data.resultshop;
        console.log(self);

        deferred.resolve();
      })
      .error(function (data, status, headers, config) {
        self.isLoading = false;
        deferred.reject(data);
      });
    return deferred.promise;
  };
  return self;
});


app.factory("CommentService",function(MTO,$q,$http,$cordovaToast){

  var self={
  'facebooktoken':'',
  'googletoken':'',
  'email':'',
  'comment':'',
  'fotoid':'',
  'videoid':'',
  'commenting':false,
  'email':'',
  'posttype':''

}
var deferred=$q.defer();
  self.uploadcomment=function(){

    var para={

      'facebooktoken':self.facebooktoken,
      'googletoken':self.googletoken,
      'fotoid':self.fotoid,
      'videoid':self.videoid,
      'posttype':self.posttype,
      'comment':self.comment,

      'email':self.email
    };

    var deferred=$q.defer();
    self.commenting=true;
    $.ajax({
      type: "POST",
      url: "[WEB-API-SUNUCUSU]",
      data: para,
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
      if(data=="12"){
        self.commenting=false;
        $cordovaToast
          .show("Yorumunuz başarı ile kaydedildi", 'short', 'center')
          .then(function(success) {
            console.log("toast")
          }, function (error) {
            self.commenting=false;

          });
      }
        else if(data=="32")
      {
        self.commenting=false;
        $cordovaToast
          .show("Dakikada iki yorumdan fazlası flood kontrolü nedeniyle engellenmiştir", 'long', 'center')
          .then(function(success) {
            console.log("toast")
          }, function (error) {
            self.commenting=false;

          });
      }

        deferred.resolve(data);
      },
      error: function (data, status, headers, config,err) {
        self.commenting=false;


        deferred.reject(data);
      }
    });
    return deferred.promise;

  }

return self;

})

app.factory("PullCommentService",function(MTO,$q,$http,$cordovaToast){

  var self={
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
    'comment':'',
    'fotoid':'',
    'videoid':'',
    'results':[],
    'email':'',
    'posttype':'',
    'nocomment':false

  }
  self.loadcomment=function (){
    self.results=[];

    console.log('post');
    self.isLoading = true;
    var deferred = $q.defer();
    var para = {
      fotoid:self.fotoid,
      videoid:self.videoid,
      email:self.email,
      posttype:self.posttype,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };
    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data');
        console.log(data);
        if (data.length == 0) {
          self.nocomment=true;
        } else {
          angular.forEach(data, function (data) {
            self.results.push(data);
          });
          self.nocomment=false;
          console.log(self.results)
        }
        self.commenting=false;
        deferred.resolve(data);
      })
      .error(function (data, status, headers, config) {
        deferred.reject(data);
      });
    return deferred.promise;
  };
return self;

})
