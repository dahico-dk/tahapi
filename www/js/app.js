// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','starter.favcontroller','starter.profilecontroller','starter.uploadcontroller','starter.profileservice','starter.feedcontroller','ngCordova','ngStorage','starter.services','starter.filters','ngCordovaOauth',"ngSanitize",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.poster",
  "com.2fdevs.videogular.plugins.buffering"])

.run(function($ionicPlatform,$cordovaLocalNotification,$rootScope,MTO,$state,$localStorage) {
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    console.log(FileTransfer);
  }

  //İlk açılışta data propları boşaltılıyor.
    $rootScope.metocan=MTO;
    $rootScope.cikisyap = function() {
      $rootScope.metocan.email=null;
      $rootScope.metocan.profilename=null;
      $rootScope.metocan.profilepic=null;
      $rootScope.metocan.userid=null;
    $rootScope.metocan.googletoken=null;
    $rootScope.metocan.facebooktoken=null;
    $localStorage.faccessToken=null;
    $localStorage.gaccessToken=null;
    console.log($rootScope.metocan);
    $state.go("start")
  };
  $ionicPlatform.ready(function() {
    // Accesory bar'ı varsayılan olarak saklar
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar gerekli
      StatusBar.styleDefault();
    }



      });
})

  .config(function ($httpProvider) {
    //varsayılan headerları boş js objesi olarak atanıyor. Yoksa video upload esnasında sıkıntı çıkarıyor.
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

  })


  //Linkler. Tabların linkleri dahil bütün linkler ve template ve controller ayarları
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('start', {
        url: "/start",
        views: {
          'menuContent' :{
            templateUrl: "templates/social/start-fullscreen.html",
            controller: 'LoginController'
          }
        }
      })

      .state('feed', {
        url: "/feed",
        views: {
          'menuContent' :{
            templateUrl: "templates/social/feed.html"
          }
        }
      })



      .state('profil', {
        url: "/profil",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "templates/social/profile.html",
            controller:"Profile"
          },

        }
      })

      .state('tabv',{
        url:"/tabv",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/tabsv/tabsv.html",
          }
        }

      })
      .state('tabv.spor', {
        url: "/spor",
        views: {
          'sporv-tab': {
            templateUrl: "templates/tabsv/sporv.html",

          },

        }
      })
      .state('tabv.muzik', {
        url: "/muzik",
        views: {
          'muzikv-tab': {
            templateUrl: "templates/tabsv/muzikv.html",

          }
        }
      })
      .state('tabv.gorsel', {
        url: "/gorsel",
        views: {
          'gorselv-tab': {
            templateUrl: "templates/tabsv/gorselv.html",

          }
        }
      })
      .state('tabpv',{
        url:"/tabpv",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/vdlm/tabs.html",
          }
        }

      })
      .state('tabpv.spor', {
        url: "/spor",
        cache: false,
        views: {
          'sporvidp-tab': {
            templateUrl: "templates/vdlm/spor.html",

          },

        }
      })
      .state('tabpv.muzik', {
        url: "/muzik",
        cache: false,
        views: {
          'muzikvidp-tab': {
            templateUrl: "templates/vdlm/muzik.html",

          }
        }
      })
      .state('tabpv.gorsel', {
        url: "/gorsel",
        cache: false,
        views: {
          'gorselvidp-tab': {
            templateUrl: "templates/vdlm/gorsel.html",

          }
        }
      })
      .state('tab',{
        url:"/tab",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/tabsp/tabs.html",
          }
        }

      })
      .state('tab.spor', {
        url: "/spor",
        views: {
          'spor-tab': {
            templateUrl: "templates/tabsp/spor.html",
            controller:"FeedController"
          },

        }
      })
      .state('tab.muzik', {
        url: "/muzik",
        views: {
          'muzik-tab': {
            templateUrl: "templates/tabsp/muzik.html",
            controller:"FeedController2"
          }
        }
      })
      .state('tab.gorsel', {
        url: "/gorsel",
        views: {
          'gorsel-tab': {
            templateUrl: "templates/tabsp/gorsel.html",
            controller:"FeedController3"
          }
        }
      })
      .state('tabpp',{
        url:"/tabpp",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/rsml/tabs.html",
          }
        }

      })
      .state('tabpp.spor', {
        url: "/spor",
        cache: false,
        views: {
          'sporppic-tab': {
            templateUrl: "templates/rsml/spor.html",
            controller:"FeedPController"
          },

        }
      })
      .state('tabpp.muzik', {
        url: "/muzik",
        cache: false,
        views: {
          'muzikppic-tab': {
            templateUrl: "templates/rsml/muzik.html",
            controller:"FeedPController2"
          }
        }
      })
      .state('tabpp.gorsel', {
        url: "/gorsel",
        cache: false,
        views: {
          'gorselppic-tab': {
            templateUrl: "templates/rsml/gorsel.html",
            controller:"FeedPController3"
          }
        }
      })
      .state('tabdp',{
        url:"/tabdp",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/mydkn/tabs.html",
          }
        }

      })
      .state('tabdp.spor', {
        url: "/spor",
        cache: false,
        views: {
          'spordkn-tab': {
            templateUrl: "templates/mydkn/spor.html",
            controller:"FeedDController"
          },

        }
      })
      .state('tabdp.muzik', {
        url: "/muzik",
        cache: false,
        views: {
          'muzikdkn-tab': {
            templateUrl: "templates/mydkn/muzik.html",
            controller:"FeedDController2"
          }
        }
      })
      .state('tabdp.gorsel', {
        url: "/gorsel",
        cache: false,
        views: {
          'gorseldkn-tab': {
            templateUrl: "templates/mydkn/gorsel.html",
            controller:"FeedDController3"
          }
        }
      })

      .state('dukkan',{
        url:"/dukkan",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/dkn/tabs.html",
          }
        }

      })
      .state('dukkan.spor', {
        url: "/spor",
        views: {
          'spordukkan': {
            templateUrl: "templates/dkn/spor.html",
            controller:"FeedDknController"
          },

        }
      })
      .state('dukkan.muzik', {
        url: "/muzik",
        views: {
          'muzikdukkan': {
            templateUrl: "templates/dkn/muzik.html",
            controller:"FeedDknController2"
          }
        }
      })
      .state('dukkan.gorsel', {
        url: "/gorsel",
        views: {
          'gorseldukkan': {
            templateUrl: "templates/dkn/gorsel.html",
            controller:"FeedDknController3"
          }
        }
      })
      .state('tabfavp',{
        url:"/tabfavp",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/tabfavpics/tabs.html",
          }
        }

      })
      .state('tabfavp.spor', {
        url: "/spor",
        views: {
          'sporfavpic-tab': {
            templateUrl: "templates/tabfavpics/spor.html",
            controller:"FavPicController"
          }
        }
      })
      .state('tabfavp.muzik', {
        url: "/muzik",
        views: {
          'muzikfavpic-tab': {
            templateUrl: "templates/tabfavpics/muzik.html",
            controller:"FavPicController2"
          }

        }
      })
      .state('tabfavp.gorsel', {
        url: "/gorsel",
        views: {
          'gorselfavpic-tab': {
            templateUrl: "templates/tabfavpics/gorsel.html",
            controller:"FavPicController3"
          }
        }
      })

      .state('tabfavv',{
        url:"/tabfavv",
        abstract:true,
        views: {
          'menuContent': {
            templateUrl: "templates/tabfavvids/tabs.html",
          }
        }

      })
      .state('tabfavv.spor', {
        url: "/spor",
        views: {
          'sporfavvid-tab': {
            templateUrl: "templates/tabfavvids/spor.html",

          }
        }
      })
      .state('tabfavv.muzik', {
        url: "/muzik",
        views: {
          'muzikfavvid-tab': {
            templateUrl: "templates/tabfavvids/muzik.html",

          }

        }
      })
      .state('tabfavv.gorsel', {
        url: "/gorsel",
        views: {
          'gorselfavvid-tab': {
            templateUrl: "templates/tabfavvids/gorsel.html",

          }
        }
      })

    .state('viewpost2', {
      url: "/viewpost2",
      templateUrl: "templates/social/feed12.html",

    })

    .state('about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "templates/social/about.html",
          controller:'About'
        },

      }
    });


    // Hiçbir url tutmazsa start sayfasına yani authenticate sayfasına döner
    $urlRouterProvider.otherwise('/start');
  });


