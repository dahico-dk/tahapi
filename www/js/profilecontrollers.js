//Profil sayfası controllerları. Gene tablardan kaynaklı ekstra controllerlar var.

angular.module('starter.profilecontroller', [])



  .controller("FeedPController",function($scope,$ionicLoading,FeedPService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,SatisService,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';
    $ionicModal.fromTemplateUrl('templates/modals/shopmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.MT0=MTO;
    $scope.showact = function() {
      $scope.takepicture=TakePicture;
      $scope.upload=UploadService;
      $scope.galleryphoto=GalleryPhotoService;
      $scope.alert=AlertService;
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-images"></i>Fotoğraf Galerisi'  },
          { text: '<i class="icon ion-ios-camera"></i>Fotoğraf Çek' },

          { text: '<i class="icon ion-android-cancel"></i><span>Vazgeç</span>' },

        ],

        titleText: 'Fotoğraf Ekle',

        buttonClicked: function(index) {
          if(index==0){
            //Galeri.Önce galeriye git resim seç sonra yükle.
            $scope.galleryphoto.gallerypic().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc)
              }
              function errorurl(err){
                console.log(err)
              }

              //console.log('Burayada foto route olmalı:'+val);
              //$scope.upload.filelink=val;
              //$scope.upload.kategoriid=1;
              //$scope.upload.facebooktoken=$scope.MTO.facebooktoken;
              //$scope.upload.googletoken=$scope.MTO.googletoken;
              //$scope.upload.email=$scope.MTO.email;
              //$scope.upload.filetype=1;
              //$ionicLoading.show({
              //  template:'Sunucuya yükleniyor...'
              //
              //});
              //$scope.upload.upload().then(function(){
              //  hideSheet();
              //  $cordovaToast
              //    .show('Resminiz başarı ile yollandı. Onaylandığı zaman sayfalarda görüntülenecektir.', 'long', 'center')
              //    .then(function(success) {
              //      console.log("toast")
              //    }, function (error) {
              //      console.log("error")
              //    });
              //})
            })

          }
          if(index==1){
            //Fotoğraf çek
            $scope.takepicture.selfi().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc)
              }
              function errorurl(err){
                console.log(err)
              }

              //$scope.upload.filelink=val;
              //$scope.upload.kategoriid=1;
              //$scope.upload.facebooktoken=$scope.MTO.facebooktoken;
              //$scope.upload.googletoken=$scope.MTO.googletoken;
              //$scope.upload.email=$scope.MTO.email;
              //$scope.upload.filetype=1;
              //
              //$scope.upload.upload().then(function(){
              //  hideSheet();
              //  $ionicLoading.hide();
              //  $cordovaToast
              //    .show('Resminiz başarı ile yollandı. Onaylandığı zaman sayfalarda görüntülenecektir.', 'long', 'center')
              //    .then(function(success) {
              //      console.log("toast")
              //    }, function (error) {
              //      console.log("error")
              //    });
              //},function error(err){
              //  $ionicLoading.hide();
              //  console.log(err);
              //  $scope.alert.title="Beklenmeyen bir hata oluştu."
              //  $scope.alert.title="Yükleme sırasında beklenmeyen bir hata oluştu."
              //  $scope.alert.alert();
              //})
            })
          }

          if(index==2){
            //Kapatır
            hideSheet();
          }
        }
      });




    };
    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.showact2=function(){
      var options = {
        title: 'Resim Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Fotoğraf Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          console.log(index);
          if(index==1){
            //Galeri.Önce galeriye git resim seç sonra yükle.
            $scope.galleryphoto.gallerypic().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc);
                console.log('Burayada foto route olmalı:'+scc);
                $scope.upload.filelink=scc;
                $scope.upload.kategoriid=1;
                $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                $scope.upload.googletoken=$scope.MTO.googletoken;
                $scope.upload.email=$scope.MTO.email;
                $scope.upload.filetype=1;
                $ionicLoading.show({
                  template:'Sunucuya yükleniyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Resminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      $ionicLoading.hide();
                      $scope.alert.title="Hata";
                      $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $scope.alert.title="Hata";
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            })

          }
          if(index==2){
            //Fotoğraf çek
            $scope.takepicture.selfi().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc);
                $scope.upload.filelink=scc;
                $scope.upload.kategoriid=1;
                $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                $scope.upload.googletoken=$scope.MTO.googletoken;
                $scope.upload.email=$scope.MTO.email;
                $scope.upload.filetype=1;
                $ionicLoading.show({
                  template:'Sunucuya yükleniyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Resminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      console.log("error")
                    });
                },function error(err){
                  $ionicLoading.hide();
                  console.log(err);
                  $scope.alert.title="Hata";
                  $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı yeniden başlatın.";
                  $scope.alert.alert();

                })
              }
              function errorurl(err){
                console.log(err)
              }


            })
          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
    $scope.openModal = function(link,fotoid) {

      console.log(fotoid);
      $scope.fotoid=fotoid;
      $scope.link=link;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.telefon={};
      $scope.fiyat={};
      $scope.modal.hide();
    };

    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedPService;
    $scope.satis=SatisService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;

    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });

    $scope.satistalep=function(fotoid,telefon,fiyat){
      console.log($scope.fiyat);
      $scope.satis.email=$scope.MTO.email;
      $scope.satis.facebooktoken=$scope.MTO.facebooktoken;
      $scope.satis.googletoken=$scope.MTO.googletoken;
      $scope.satis.fiyat=fiyat;
      $scope.satis.telefon=telefon;
      $scope.satis.fotoid=fotoid;
      $scope.satis.satis().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.modal.remove()
          .then(function() {
            $scope.modal = null;
            $ionicModal.fromTemplateUrl('templates/modals/shopmodal.html', {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              $scope.modal = modal;
            });
          });
        var hide="#talep-"+fotoid;
        $(hide).hide();
      },function error(error){
        $state.go("start")
      })
    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })

  .controller("FeedPController2",function($scope,$ionicLoading,FeedPService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,SatisService,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';
    $ionicModal.fromTemplateUrl('templates/modals/shopmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.MT0=MTO;
    $scope.showact = function() {
      $scope.takepicture=TakePicture;
      $scope.upload=UploadService;
      $scope.galleryphoto=GalleryPhotoService;
      $scope.alert=AlertService;
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-images"></i>Fotoğraf Galerisi'  },
          { text: '<i class="icon ion-ios-camera"></i>Fotoğraf Çek' },

          { text: '<i class="icon ion-android-cancel"></i><span>Vazgeç</span>' },

        ],

        titleText: 'Fotoğraf Ekle',

        buttonClicked: function(index) {
          if(index==0){
            //Galeri.Önce galeriye git resim seç sonra yükle.
            $scope.galleryphoto.gallerypic().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc)
              }
              function errorurl(err){
                console.log(err)
              }

              //console.log('Burayada foto route olmalı:'+val);
              //$scope.upload.filelink=val;
              //$scope.upload.kategoriid=1;
              //$scope.upload.facebooktoken=$scope.MTO.facebooktoken;
              //$scope.upload.googletoken=$scope.MTO.googletoken;
              //$scope.upload.email=$scope.MTO.email;
              //$scope.upload.filetype=1;
              //$ionicLoading.show({
              //  template:'Sunucuya yükleniyor...'
              //
              //});
              //$scope.upload.upload().then(function(){
              //  hideSheet();
              //  $cordovaToast
              //    .show('Resminiz başarı ile yollandı. Onaylandığı zaman sayfalarda görüntülenecektir.', 'long', 'center')
              //    .then(function(success) {
              //      console.log("toast")
              //    }, function (error) {
              //      console.log("error")
              //    });
              //})
            })

          }
          if(index==1){
            //Fotoğraf çek
            $scope.takepicture.selfi().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc)
              }
              function errorurl(err){
                console.log(err)
              }

              //$scope.upload.filelink=val;
              //$scope.upload.kategoriid=1;
              //$scope.upload.facebooktoken=$scope.MTO.facebooktoken;
              //$scope.upload.googletoken=$scope.MTO.googletoken;
              //$scope.upload.email=$scope.MTO.email;
              //$scope.upload.filetype=1;
              //
              //$scope.upload.upload().then(function(){
              //  hideSheet();
              //  $ionicLoading.hide();
              //  $cordovaToast
              //    .show('Resminiz başarı ile yollandı. Onaylandığı zaman sayfalarda görüntülenecektir.', 'long', 'center')
              //    .then(function(success) {
              //      console.log("toast")
              //    }, function (error) {
              //      console.log("error")
              //    });
              //},function error(err){
              //  $ionicLoading.hide();
              //  console.log(err);
              //  $scope.alert.title="Beklenmeyen bir hata oluştu."
              //  $scope.alert.title="Yükleme sırasında beklenmeyen bir hata oluştu."
              //  $scope.alert.alert();
              //})
            })
          }

          if(index==2){
            //Kapatır
            hideSheet();
          }
        }
      });




    };
    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.showact2=function(){
      var options = {
        title: 'Resim Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Fotoğraf Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          console.log(index);
          if(index==1){
            //Galeri.Önce galeriye git resim seç sonra yükle.
            $scope.galleryphoto.gallerypic().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc);
                console.log('Burayada foto route olmalı:'+scc);
                $scope.upload.filelink=scc;
                $scope.upload.kategoriid=2;
                $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                $scope.upload.googletoken=$scope.MTO.googletoken;
                $scope.upload.email=$scope.MTO.email;
                $scope.upload.filetype=1;
                $ionicLoading.show({
                  template:'Sunucuya yükleniyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Resminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      $ionicLoading.hide();
                      $scope.alert.title="Hata";
                      $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $scope.alert.title="Hata";
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            })

          }
          if(index==2){
            //Fotoğraf çek
            $scope.takepicture.selfi().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc);
                $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                $scope.upload.googletoken=$scope.MTO.googletoken;
                $scope.upload.filelink=scc;
                $scope.upload.kategoriid=1;

                $scope.upload.email=$scope.MTO.email;
                $scope.upload.filetype=1;
                $ionicLoading.show({
                  template:'Sunucuya yükleniyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Resminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      console.log("error")
                    });
                },function error(err){
                  $ionicLoading.hide();
                  console.log(err);
                  $scope.alert.title="Hata";
                  $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı yeniden başlatın.";
                  $scope.alert.alert();

                })
              }
              function errorurl(err){
                console.log(err)
              }


            })
          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
    $scope.openModal = function(link,fotoid) {

      console.log(fotoid);
      $scope.fotoid=fotoid;
      $scope.link=link;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.telefon={};
      $scope.fiyat={};
      $scope.modal.hide();
    };

    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedPService2;
    $scope.satis=SatisService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;

    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });

    $scope.satistalep=function(fotoid,telefon,fiyat){
      console.log($scope.fiyat);
      $scope.satis.email=$scope.MTO.email;
      $scope.satis.facebooktoken=$scope.MTO.facebooktoken;
      $scope.satis.googletoken=$scope.MTO.googletoken;
      $scope.satis.fiyat=fiyat;
      $scope.satis.telefon=telefon;
      $scope.satis.fotoid=fotoid;
      $scope.satis.satis().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.modal.remove()
          .then(function() {
            $scope.modal = null;
            $ionicModal.fromTemplateUrl('templates/modals/shopmodal.html', {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              $scope.modal = modal;
            });
          });
        var hide="#talep2-"+fotoid;
        $(hide).hide();
      },function error(error){
        $state.go("start")
      })
    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })
  .controller("FeedPController3",function($scope,$ionicLoading,FeedPService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,SatisService,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';
    $ionicModal.fromTemplateUrl('templates/modals/shopmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.MT0=MTO;
    $scope.showact = function() {
      $scope.takepicture=TakePicture;
      $scope.upload=UploadService;
      $scope.galleryphoto=GalleryPhotoService;
      $scope.alert=AlertService;
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-images"></i>Fotoğraf Galerisi'  },
          { text: '<i class="icon ion-ios-camera"></i>Fotoğraf Çek' },

          { text: '<i class="icon ion-android-cancel"></i><span>Vazgeç</span>' },

        ],

        titleText: 'Fotoğraf Ekle',

        buttonClicked: function(index) {
          if(index==0){
            //Galeri.Önce galeriye git resim seç sonra yükle.
            $scope.galleryphoto.gallerypic().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc)
              }
              function errorurl(err){
                console.log(err)
              }

              //console.log('Burayada foto route olmalı:'+val);
              //$scope.upload.filelink=val;
              //$scope.upload.kategoriid=1;
              //$scope.upload.facebooktoken=$scope.MTO.facebooktoken;
              //$scope.upload.googletoken=$scope.MTO.googletoken;
              //$scope.upload.email=$scope.MTO.email;
              //$scope.upload.filetype=1;
              //$ionicLoading.show({
              //  template:'Sunucuya yükleniyor...'
              //
              //});
              //$scope.upload.upload().then(function(){
              //  hideSheet();
              //  $cordovaToast
              //    .show('Resminiz başarı ile yollandı. Onaylandığı zaman sayfalarda görüntülenecektir.', 'long', 'center')
              //    .then(function(success) {
              //      console.log("toast")
              //    }, function (error) {
              //      console.log("error")
              //    });
              //})
            })

          }
          if(index==1){
            //Fotoğraf çek
            $scope.takepicture.selfi().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc)
              }
              function errorurl(err){
                console.log(err)
              }

              //$scope.upload.filelink=val;
              //$scope.upload.kategoriid=1;
              //$scope.upload.facebooktoken=$scope.MTO.facebooktoken;
              //$scope.upload.googletoken=$scope.MTO.googletoken;
              //$scope.upload.email=$scope.MTO.email;
              //$scope.upload.filetype=1;
              //
              //$scope.upload.upload().then(function(){
              //  hideSheet();
              //  $ionicLoading.hide();
              //  $cordovaToast
              //    .show('Resminiz başarı ile yollandı. Onaylandığı zaman sayfalarda görüntülenecektir.', 'long', 'center')
              //    .then(function(success) {
              //      console.log("toast")
              //    }, function (error) {
              //      console.log("error")
              //    });
              //},function error(err){
              //  $ionicLoading.hide();
              //  console.log(err);
              //  $scope.alert.title="Beklenmeyen bir hata oluştu."
              //  $scope.alert.title="Yükleme sırasında beklenmeyen bir hata oluştu."
              //  $scope.alert.alert();
              //})
            })
          }

          if(index==2){
            //Kapatır
            hideSheet();
          }
        }
      });




    };
    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.showact2=function(){
      var options = {
        title: 'Resim Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Fotoğraf Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          console.log(index);
          if(index==1){
            //Galeri.Önce galeriye git resim seç sonra yükle.
            $scope.galleryphoto.gallerypic().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc);
                console.log('Burayada foto route olmalı:'+scc);
                $scope.upload.filelink=scc;
                $scope.upload.kategoriid=3;
                $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                $scope.upload.googletoken=$scope.MTO.googletoken;
                $scope.upload.email=$scope.MTO.email;
                $scope.upload.filetype=1;
                $ionicLoading.show({
                  template:'Sunucuya yükleniyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Resminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      $ionicLoading.hide();
                      $scope.alert.title="Hata";
                      $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $scope.alert.title="Hata";
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            })

          }
          if(index==2){
            //Fotoğraf çek
            $scope.takepicture.selfi().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                console.log(scc);
                $scope.upload.filelink=scc;
                $scope.upload.kategoriid=1;
                $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                $scope.upload.googletoken=$scope.MTO.googletoken;
                $scope.upload.email=$scope.MTO.email;
                $scope.upload.filetype=1;
                $ionicLoading.show({
                  template:'Sunucuya yükleniyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Resminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      console.log("error")
                    });
                },function error(err){
                  $ionicLoading.hide();
                  console.log(err);
                  $scope.alert.title="Hata";
                  $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı yeniden başlatın.";
                  $scope.alert.alert();

                })
              }
              function errorurl(err){
                console.log(err)
              }


            })
          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
    $scope.openModal = function(link,fotoid) {

      console.log(fotoid);
      $scope.fotoid=fotoid;
      $scope.link=link;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.telefon={};
      $scope.fiyat={};
      $scope.modal.hide();
    };

    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedPService3;
    $scope.satis=SatisService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;

    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });

    $scope.satistalep=function(fotoid,telefon,fiyat){
      console.log($scope.fiyat);
      $scope.satis.email=$scope.MTO.email;
      $scope.satis.facebooktoken=$scope.MTO.facebooktoken;
      $scope.satis.googletoken=$scope.MTO.googletoken;
      $scope.satis.fiyat=fiyat;
      $scope.satis.telefon=telefon;
      $scope.satis.fotoid=fotoid;
      $scope.satis.satis().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.modal.remove()
          .then(function() {
            $scope.modal = null;
            $ionicModal.fromTemplateUrl('templates/modals/shopmodal.html', {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              $scope.modal = modal;
            });
          });
        var hide="#talep3-"+fotoid;
        $(hide).hide();
      },function error(error){
        $state.go("start")
      })
    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })

  .controller("FeedPVideoController",function($scope,$ionicLoading,FeedVideoService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO,$ionicModal,PicPoint,$state,AlertService,FeedPVideoService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.MT0=MTO;

    $scope.alert=AlertService;


    $scope.choice='';
    $scope.openModal = function(videoid) {
      console.log(videoid);
      $scope.videoid=videoid;
      $scope.modal.show();
    };
    $scope.posterlist=[];
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed=FeedPVideoService;
    $scope.arraytest2=[];
    console.log($scope.feed.isLoading);
    $scope.puanver=function(videoid,puan){
      console.log(videoid);
      $scope.puanservis=PicPoint;
      $scope.mto=MTO;
      $scope.puanservis.googletoken=$scope.mto.googletoken;
      $scope.puanservis.facebooktoken=$scope.mto.facebooktoken;
      $scope.puanservis.fotoid=null;
      $scope.puanservis.videoid=videoid;
      $scope.puanservis.puan=puan;
      $scope.puanservis.email='test@test.com';
      $scope.puanservis.updatepoint().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.hider=videoid;
        var hide="#liker-"+videoid;
        var ort='#ort-'+videoid;
        var pers='#pers-'+videoid;
        var totp='#totp-'+videoid;
        var ortalama=parseInt($(ort).text()|| 0);
        var person=parseInt($(pers).text()|| 0);
        var total=parseInt($(totp).text()|| 0);
        person=person+1;
        total=total+puan;
        if((total/person) % 1 != 0){
          ortalama=(Math.round((total/person) * 100)/100).toFixed(2);
        }
        else{
          ortalama=total/person;
        }
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });

      console.log(videoid);
      console.log(puan)
    };
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'

        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);

      });

      console.log($scope.videolist);
      console.log($scope.feed.results)

    },function error(err){
      $state.go("start");
    });


    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png",


      }
    };



  })
  .controller("FeedPVideoController2",function($scope,$ionicLoading,FeedVideoService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO,$ionicModal,PicPoint,$state,AlertService,FeedPVideoService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.MT0=MTO;

    $scope.alert=AlertService;


    $scope.choice='';
    $scope.openModal = function(videoid) {
      console.log(videoid);
      $scope.videoid=videoid;
      $scope.modal.show();
    };
    $scope.posterlist=[];
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed=FeedPVideoService;
    $scope.arraytest2=[];
    console.log($scope.feed.isLoading);
    $scope.puanver=function(videoid,puan){
      console.log(videoid);
      $scope.puanservis=PicPoint;
      $scope.mto=MTO;
      $scope.puanservis.googletoken=$scope.mto.googletoken;
      $scope.puanservis.facebooktoken=$scope.mto.facebooktoken;
      $scope.puanservis.fotoid=null;
      $scope.puanservis.videoid=videoid;
      $scope.puanservis.puan=puan;
      $scope.puanservis.email='test@test.com';
      $scope.puanservis.updatepoint().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.hider=videoid;
        var hide="#liker-"+videoid;
        var ort='#ort-'+videoid;
        var pers='#pers-'+videoid;
        var totp='#totp-'+videoid;
        var ortalama=parseInt($(ort).text()|| 0);
        var person=parseInt($(pers).text()|| 0);
        var total=parseInt($(totp).text()|| 0);
        person=person+1;
        total=total+puan;
        if((total/person) % 1 != 0){
          ortalama=(Math.round((total/person) * 100)/100).toFixed(2);
        }
        else{
          ortalama=total/person;
        }
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });

      console.log(videoid);
      console.log(puan)
    };
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'

        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);

      });

      console.log($scope.videolist);
      console.log($scope.feed.results)

    },function error(err){
      $state.go("start");
    });


    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png",


      }
    };



  })
  .controller("FeedPVideoController3",function($scope,$ionicLoading,FeedVideoService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO,$ionicModal,PicPoint,$state,AlertService,FeedPVideoService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.MT0=MTO;

    $scope.alert=AlertService;


    $scope.choice='';
    $scope.openModal = function(videoid) {
      console.log(videoid);
      $scope.videoid=videoid;
      $scope.modal.show();
    };
    $scope.posterlist=[];
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed=FeedPVideoService;
    $scope.arraytest2=[];
    console.log($scope.feed.isLoading);
    $scope.puanver=function(videoid,puan){
      console.log(videoid);
      $scope.puanservis=PicPoint;
      $scope.mto=MTO;
      $scope.puanservis.googletoken=$scope.mto.googletoken;
      $scope.puanservis.facebooktoken=$scope.mto.facebooktoken;
      $scope.puanservis.fotoid=null;
      $scope.puanservis.videoid=videoid;
      $scope.puanservis.puan=puan;
      $scope.puanservis.email='test@test.com';
      $scope.puanservis.updatepoint().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.hider=videoid;
        var hide="#liker-"+videoid;
        var ort='#ort-'+videoid;
        var pers='#pers-'+videoid;
        var totp='#totp-'+videoid;
        var ortalama=parseInt($(ort).text()|| 0);
        var person=parseInt($(pers).text()|| 0);
        var total=parseInt($(totp).text()|| 0);
        person=person+1;
        total=total+puan;
        if((total/person) % 1 != 0){
          ortalama=(Math.round((total/person) * 100)/100).toFixed(2);
        }
        else{
          ortalama=total/person;
        }
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });

      console.log(videoid);
      console.log(puan)
    };
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'

        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);

      });

      console.log($scope.videolist);
      console.log($scope.feed.results)

    },function error(err){
      $state.go("start");
    });


    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png",


      }
    };



  })

  .controller("FeedDController",function($scope,$ionicLoading,FeedDService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,CancelService,AlertService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';


    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedDService;
$scope.alert=AlertService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;
    $scope.iptal=CancelService;
    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });

    $scope.satisiptal=function(dukkanid){
      console.log(dukkanid);
      $scope.iptal.dukkanid=dukkanid;
      $scope.iptal.facebooktoken=$scope.MTO.facebooktoken;
      $scope.iptal.googletoken=$scope.MTO.googletoken;
      $scope.iptal.iptal().then(function(){

        var hide="#iptal-"+dukkanid;
        $(hide).hide();
      },function error(err){
    $scope.alert.title="Beklenmeyen bir hata oluştu";
        $scope.alert.message="İşleminizi gerçekleştiremiyoruz.";
        $scope.alert.alert().then(function(){
console.log('alerted');
    })
      })

    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })

  .controller("FeedDController2",function($scope,$ionicLoading,FeedDService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,CancelService,AlertService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';


    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedDService2;
    $scope.alert=AlertService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;
    $scope.iptal=CancelService;
    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });

    $scope.satisiptal=function(dukkanid){
      console.log(dukkanid);
      $scope.iptal.dukkanid=dukkanid;
      $scope.iptal.facebooktoken=$scope.MTO.facebooktoken;
      $scope.iptal.googletoken=$scope.MTO.googletoken;
      $scope.iptal.iptal().then(function(){

        var hide="#iptal2-"+dukkanid;
        $(hide).hide();
      },function error(err){
        $scope.alert.title="Beklenmeyen bir hata oluştu";
        $scope.alert.message="İşleminizi gerçekleştiremiyoruz.";
        $scope.alert.alert().then(function(){
          console.log('alerted');
        })
      })

    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })
  .controller("FeedDController3",function($scope,$ionicLoading,FeedDService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,CancelService,AlertService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';


    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedDService3;
    $scope.alert=AlertService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;
    $scope.iptal=CancelService;
    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });

    $scope.satisiptal=function(dukkanid){
      console.log(dukkanid);
      $scope.iptal.dukkanid=dukkanid;
      $scope.iptal.facebooktoken=$scope.MTO.facebooktoken;
      $scope.iptal.googletoken=$scope.MTO.googletoken;
      $scope.iptal.iptal().then(function(){

        var hide="#iptal3-"+dukkanid;
        $(hide).hide();
      },function error(err){
        $scope.alert.title="Beklenmeyen bir hata oluştu";
        $scope.alert.message="İşleminizi gerçekleştiremiyoruz.";
        $scope.alert.alert().then(function(){
          console.log('alerted');
        })
      })

    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })


  .controller("FeedVideoControllerAll",function($scope,$ionicLoading,FeedVideoServiceAll,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    //$scope.testtt=function(id){
    //  console.log('bidip');
    //  console.log(id);
    //  var zxcid='#child-'+id;
    //  var playpauseid="#playpause-"+id;
    //
    //  var zxc=$(zxcid);
    //  // console.log(zxc)
    //  //   zx.get(0).play();
    //  // var thisi=$('#wrappin');
    //  var playpause=$(playpauseid);
    //  // var zxc=$('#child');
    //  // console.log(thisi)
    //  // thisi.children(".video").get(0).play();
    //
    //
    //  if(zxc.get(0).paused){
    //    zxc.get(0).play();
    //    // playpause.fadeOut();
    //  }else{
    //    zxc.get(0).pause();
    //    // playpause.fadeIn();
    //  }
    //}

    $scope.videolist=[];
    $scope.feed=FeedVideoServiceAll;
    $scope.arraytest2=[];
    console.log($scope.feed.isLoading);
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=$scope.kat;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
      });
      console.log($scope.videolist);
      console.log($scope.feed.results)

    });

//$scope.test=function(id){
//
// console.log($scope.videolist[id])
//}
    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };
    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })


  .controller("FeedControllerAll",function($scope,$ionicLoading,FeedService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedService;

    $scope.feed.load().then(function(){

      $ionicLoading.hide();

    });



    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })


  .controller("FeedDknController",function($scope,$ionicLoading,FeedDknService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,AlertService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';


    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedDknService;
    $scope.alert=AlertService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;

    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });


    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })
  .controller("FeedDknController2",function($scope,$ionicLoading,FeedDknService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,AlertService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';


    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedDknService2;
    $scope.alert=AlertService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;

    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });


    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  })
  .controller("FeedDknController3",function($scope,$ionicLoading,FeedDknService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$state,MTO,$ionicModal,PicPoint,AlertService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.telefon='';
    $scope.fiyat='';


    $scope.menu=true;
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {  text: 'Varolan videoyu ekle'  },
          { text: 'Video Çek' },
          { text: '<span style="padding-bottom:50px">İptal</span>' },

        ],

        titleText: 'Video Ekle',
        cancelText: 'Vazgeç',
        cancel: function() {
          // iptal kodu
        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // sheet 2 saniye sonra tekrar saklanıyor


    };

    $scope.feed = FeedDknService3;
    $scope.alert=AlertService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;

    $scope.feed.load().then(function(val){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start");
    });


    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }


  });

