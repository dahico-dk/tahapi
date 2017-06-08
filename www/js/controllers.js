angular.module('starter.controllers', [])


//$scope.init fonksiyonu loading animasyonu ve api key refreshleri için
  //genel navigasyon controllerı
  .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {

    //Side menu toggle fonksiyonları(button ile)
    $scope.showRightMenu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };
    $scope.showMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })
  .controller("LoginController", function($scope, $cordovaOauth, $localStorage,$state,MemberService,$http,$ionicSideMenuDelegate,$ionicPlatform,MTO,AlertService,ProfileService,$cordovaToast,$cordovaActionSheet,$ionicLoading,MTO) {
    $ionicPlatform.ready(function(){
      $scope.scheduleSingleNotification = function () {

      };
    });
    $ionicLoading.hide();
    //Menunun swipe hareketi ile çalışması için kullanılan default ionişc kodları (Üst versiyonlarda iptal olmuş)
    $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(true);
    });
    $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.login = function() {

      if($localStorage.faccessToken==null){
        //Faceboook authentication için cordovaOauth pluginini kullanıyoruz. Pluginin yapısındaki bir ufak bugdan dolayı ilk turda error dönebiliyor o yüzden promise içinde ilk hatada tekrar denenip sonra hata veriliyor. facebook tokenını localstorageda saklayarak telefon uzerınde saklıyoruz.
        $cordovaOauth.facebook("[FACEBOOK_API_KEY]", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {
          $localStorage.faccessToken = result.access_token;
          $scope.init();
        }, function(error) {
          $cordovaOauth.facebook("[FACEBOOK_API_KEY]", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.faccessToken = result.access_token;
            $scope.init();
          }, function(error) {
            //Hata fonksiyonu
            $ionicLoading.hide();
            $scope.alert=AlertService;
            $scope.alert.title="Hata";
            $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
            $scope.alert.alert();
            console.log(error);
          });
        });
      }
      else{
        $scope.init();
      }

    };
    $scope.member=MemberService;
    $scope.MTO=MTO;
    $scope.alert=AlertService;
    $scope.init = function() {
      $ionicLoading.show({
        template:'Giriş Yapılıyor...'
      });
      //token boş ise tekrar yenileniyor.
      if($localStorage.hasOwnProperty("faccessToken") === true) {
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.faccessToken, fields: "id,name,gender,location,website,picture,relationship_status,email", format: "json" }})
          .error(function(){
            $cordovaOauth.facebook("[FACEBOOK_API_KEY]", ["email", "user_website", "user_location"]).then(function(result) {
              $localStorage.faccessToken = result.access_token;
              $scope.init();
            }, function         (error) {
              $ionicLoading.hide();
              $scope.alert.title="Hata";
              $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
              $scope.alert.alert()
            });
          })
          .then(function(result) {
            $scope.profileData = result.data;
            var profilepic="http://graph.facebook.com/" + $scope.profileData.id + "/picture?type=square";
            $scope.MTO.facebooktoken=$scope.profileData.id;
            $scope.MTO.email=$scope.profileData.email;
            $scope.MTO.profilepic=profilepic;
            $scope.MTO.googletoken='';
            $scope.MTO.profilename=$scope.profileData.name;
            $scope.member.load($scope.profileData.id,'',$scope.profileData.name,'',$scope.profileData.email,profilepic).then(function(val){
              if(val.Ban==false){
                $ionicLoading.hide();
                $state.go('tabfavp.spor');
              }
              else{
                $ionicLoading.hide();
                $scope.alert.title="Hata";
                $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
                $scope.alert.alert()
              }
            }, function(error) {
              $ionicLoading.hide();
              $state.go('start');
            });
          }, function(error) {
            $scope.alert=AlertService;
            $scope.alert.title="Hata";
            $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
            $scope.alert.alert();
            $state.go('start');
          });
      } else {

        $state.go('start');
      }
    };

    //Google+ login
    $scope.login2 = function() {
      //pluginler cakısıyor. Loading animation şimdilik fail
      //$ionicLoading.show({
      //  template:'Logging in...'
      //
      //});



      if($localStorage.gaccessToken==null){
        $cordovaOauth.google("[GOOGLE_API_KEY]", ["email"]).then(function(result) {
          $localStorage.gaccessToken = result.access_token;
          //console.log(result.access_token);
          $scope.init2();
          //$state.go("app.feed")
        }, function(error) {
          console.log("function1")
          $cordovaOauth.google("[GOOGLE_API_KEY]", ["email"]).then(function(result) {
            $localStorage.gaccessToken = result.access_token;
            console.log(result.access_token);
            $scope.init2();
          }, function(error) {
            $ionicLoading.hide();
            $scope.alert=AlertService;
            $scope.alert.title="Hata";
            $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
            $scope.alert.alert();
            console.log(error);
          });
        });
      }
      else {
        $scope.init2();
        //$state.go('app.feed');
      }

    };

    //Ayrı login fonk.. için google auth yenileyen 2.init fonksiyonu
    $scope.init2=function(){
      $ionicLoading.show({
        template:'Logging in...'

      });
      if($localStorage.hasOwnProperty("gaccessToken") === true) {
        console.log($localStorage.gaccessToken);
        $http.get("https://www.googleapis.com/plus/v1/people/me", { params: { access_token: $localStorage.gaccessToken, fields: "name,emails,image,id", format: "json" }})
          .error(function(err){
            $cordovaOauth.google("468156975850-gtgp6mkhmb0c59ac862c0alatfh24nvl.apps.googleusercontent.com", ["email"]).then(function(result) {
              $localStorage.gaccessToken = result.access_token;
              console.log(result.access_token);
              $scope.init2();
              //$state.go("app.favvids")
            }, function(error) {
              $ionicLoading.hide();
              $scope.alert=AlertService;
              $scope.alert.title="Hata";
              $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
              $scope.alert.alert();
              console.log(error);
            });
          })
          .then(function(result) {
            $ionicLoading.hide();
            $scope.profileData = result.data;
            console.log($scope.profileData);
            var entry=null;
            for ( var i=0; i<$scope.profileData.emails.length; i++ ) {
              if ($scope.profileData.emails[i].type == "account") {
                entry = $scope.profileData.emails[i].value;
                //Birden fazla email varsa account tipinden olan emaili kullanıyoruz.
              }
            }
            //Token ve ekstra bilgiler
            $scope.MTO.googletoken=$scope.profileData.id;
            $scope.MTO.profilename=$scope.profileData.name.givenName+''+$scope.profileData.name.familyName;
            $scope.MTO.facebooktoken='';
            $scope.MTO.email=entry;
            $scope.MTO.profilepic=$scope.profileData.image.url;
            //Üye servisine load işlemi
            $scope.member.load('',$scope.profileData.id,$scope.profileData.name.givenName,$scope.profileData.name.familyName,entry,$scope.profileData.image.url).then(function(val){
              if(val.Ban==false){
                $ionicLoading.hide();
                $state.go('tabfavp.spor');
              }
              else{
                $ionicLoading.hide();
                $scope.alert.title="Hata";
                $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
                $scope.alert.alert()
              }
            }, function(error) {
              $ionicLoading.hide();
              //console.log(error);
              $state.go('start');
            })
          }, function(error) {
            $ionicLoading.hide();
            $scope.alert=AlertService;
            $scope.alert.title="Hata";
            $scope.alert.message="Bu hesap engellenmiş. Lütfen teknik destek ile irtibata geçin.";
            $scope.alert.alert();
            $state.go('start');
          });
      } else {
        $ionicLoading.hide();
        $state.go('start');
      }
    };
    $scope.prof=ProfileService;
    $scope.datacheck=function(){
      $scope.prof.load().then(function(val){
        console.log(val)
      })
    }
  })

  .controller("AppCtrl",function($scope){

  })

  //Test controlleri
  //Farklı codecler arasında sorun olup olmadığını anlamak için videoguların default videosu ile deneme yapıldı.
  //Videogular sıkıntılı bir plugin. Tekrar ihtiyaç olabilir !!!

  .controller("testctrl",function($scope,$sce){
    this.config = {
      sources: [
        {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
        {
          src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),
          type: "video/webm"
        },
        {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
      ],
      tracks: [
        {
          src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
          kind: "subtitles",
          srclang: "en",
          label: "English",
          default: ""
        }
      ],
      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
  }

  })
  .controller("Profile",function($scope,ProfileService,$state,$ionicSideMenuDelegate,MTO){
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.profile=ProfileService;
    $scope.mto=MTO;
    $scope.profile.facebooktoken=$scope.mto.facebooktoken;
    $scope.profile.googletoken=$scope.mto.googletoken;
    $scope.profile.email=$scope.mto.email;
    $scope.profile.load().then(function(){
      //console.log("Loaded")
    },function error(err){
      console.log(err);
      $state.go("start")
    })

  })

  .controller("About",function($scope,$http) {
    var para={};

    //$http ile serverdan about metinleri json olarak çekilip nesneye atılıyor.
$scope.about='';
    $http.get('[api_server_adresi]', {params: para})
      .success(function(data){
        console.log(data);
        $scope.about=data;
      })
      .error(function(data){
        console.log(error);
      })

  })
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      //Klavye saklanması
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
