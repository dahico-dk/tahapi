//Genel olarajk $http servisleri burada yer alıyor. Apiden dönen datalar burdaki metodlarla ayarlanıyor.


var app = angular.module('starter.profileservice', []);

app.factory("FeedPService", function ($q, $http,$ionicPopup) {
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



  self.Refresh=function(){
    self.page=1;
    self.refr=true;
    self.results=[];
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.isLoading = true;
    self.results=[];
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
app.factory("FeedPService2", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'refr':false,
    'hasMore': true,
    'kategori':2,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };



  self.Refresh=function(){
    self.page=1;
    self.refr=true;
    self.results=[];
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.results=[];
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
app.factory("FeedPService3", function ($q, $http,$ionicPopup) {
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

  self.Refresh=function(){
    self.page=1;
    self.results=[];
    self.refr=true;
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.results=[];
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
app.factory("SatisService",function($q,$http,$cordovaToast){
  var self={
    'fotoid':'',
    'videoid':'',
    'googletoken':null,
    'facebooktoken':null,
    'email':null,
    'telefon':null,
    'fiyat':null,
  };
  self.satis=function(tpoint){
    var para={
      'facebooktoken':self.facebooktoken,
      'googletoken':self.googletoken,
      'fotoid':self.fotoid,
      'telefon':self.telefon,
      'email':self.email,
      'fiyat':self.fiyat,

    };

    var deferred=$q.defer();
    $.ajax({
      type: "POST",
      url: "[WEB-API-SUNUCUSU]",
      data: para,
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
        $cordovaToast
          .show("Registered", 'short', 'center')
          .then(function(success) {
            console.log("toast")
          }, function (error) {

          });

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

app.factory("FeedPVideoService", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
    'kategori':1,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };

  self.LoadMore=function(){
    self.page=self.page+1;
    return self.load()
  };

  self.Refresh=function(){
    self.results=[];
    self.page=1;
    return self.load()
  };
  self.load=function (){
    self.isLoading = true;
self.results=[];
    var deferred = $q.defer();
    var para = {
      page:self.page,
      kat:self.kategori,
      facebooktoken:self.facebooktoken,
      googletoken:self.googletoken,
      email:self.email
    };
console.log(para);
    $http.get('[WEB-API-SUNUCUSU]', {params: para})
      .success(function (data) {
        self.isLoading = false;
        console.log('dönen data')
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
app.factory("FeedPVideoService2", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
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
    self.results=[];
    self.page=1;
    return self.load()
  };
  self.load=function (){
    self.results=[];
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
app.factory("FeedPVideoService3", function ($q, $http,$ionicPopup,$sce) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'hasMore': true,
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
    self.results=[];
    return self.load()
  };
  self.load=function (){
    self.results=[];
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
app.factory("FeedDService", function ($q, $http,$ionicPopup) {
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



  self.Refresh=function(){
    self.page=1;
    self.refr=true;
    self.hasMore=true;
    self.results=[];
    return self.load()
  };
  self.load=function (){
    self.results=[];
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
app.factory("FeedDService2", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'refr':false,
    'hasMore': true,
    'kategori':2,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
  };



  self.Refresh=function(){
    self.page=1;
    self.results=[];
    self.refr=true;
    self.hasMore=true;
    return self.load()
  };
  self.load=function (){
    console.log('post');
    self.results=[];
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
app.factory("FeedDService3", function ($q, $http,$ionicPopup) {
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



  self.Refresh=function(){
    self.page=1;
    self.refr=true;
    self.hasMore=true;
    self.results=[];
    return self.load()
  };
  self.load=function (){
    self.results=[];
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

app.factory("CancelService",function($q,$http,$cordovaToast){
  var self={
    'dukkanid':'',
    'videoid':'',
    'googletoken':null,
    'facebooktoken':null,
    'email':null,
    'telefon':null,
    'fiyat':null,
  };
  self.iptal=function(tpoint){
    var para={
      'facebooktoken':self.facebooktoken,
      'googletoken':self.googletoken,
      'dukkanid':self.dukkanid,
      'telefon':self.telefon,
      'email':self.email,
      'fiyat':self.fiyat,

    };

    var deferred=$q.defer();
    $.ajax({
      type: "POST",
      url: "[WEB-API-SUNUCUSU]",
      data: para,
      dataType: "JSON",
      crossDomain: true,
      success: function (data) {
        $cordovaToast
          .show("Cancelled", 'short', 'center')
          .then(function(success) {
            console.log("toast")
          }, function (error) {
            $ionicLoading.hide();

          });
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

app.factory("FeedDknService", function ($q, $http,$ionicPopup) {
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
app.factory("FeedDknService2", function ($q, $http,$ionicPopup) {
  var self = {
    'results': [],
    'page': 1,
    'isLoading': false,
    'refr':false,
    'hasMore': true,
    'kategori':2,
    'facebooktoken':'',
    'googletoken':'',
    'email':'',
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
app.factory("FeedDknService3", function ($q, $http,$ionicPopup) {
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
