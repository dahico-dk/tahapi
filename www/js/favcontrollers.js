angular.module('starter.favcontroller', [])

//puan verme ve yorum yapma controllerları. Ne yazıkki tabların hepsi tek controllerla calısmadı o yuzden tablar ıcın ayrı controllerlar ile kod kalabalığı yapıldı

  .controller("FavPicController",function($scope,$ionicLoading,FavPicsService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$ionicModal ,PicPoint,MTO,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'
    });
    //Servis atamaları
    $scope.kat='';
    $scope.commentpull=PullCommentService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.comment=CommentService;
    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.hidecontrol=[];
    $scope.test="2";
    //Sidemenu toggle
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };

    //yıldız verme modalı
    $ionicModal.fromTemplateUrl('templates/modals/starmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.choice='';
    //yorum modalı
    $ionicModal.fromTemplateUrl('templates/modals/commentmodal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      cache:'false'
    }).then(function(modal2) {
      $scope.commodal = modal2;
    });

    //secılen resmın acılması. yorumları ıle bırlıkte modalda
    $scope.opencomModal = function(fotoid) {
      $scope.commentpull.facebooktoken=MTO.facebooktoken;
      $scope.commentpull.googletoken=MTO.googletoken;
      $scope.commentpull.email=MTO.email;
      $scope.commentpull.posttype=1;
      $scope.commentpull.fotoid=fotoid;
      $scope.commentpull.videoid=null;
      $ionicLoading.show({
        template:'Yorumlar yükleniyor'

      });

      //swipe down yapınca yorumların yuklenmesı PullComment servisini kullanıyor
      $scope.commentpull.loadcomment().then(function(){
        console.log('loading oldu mu?')
        console.log($scope.commentpull)
        $ionicLoading.hide();
        $scope.commodal.show();
      },function error(err){
        $ionicLoading.hide();
        console.log(err)
      })
    };

    //comment modelının kapatılması
    $scope.closecomModal = function() {
      $ionicLoading.hide();
      $scope.commodal.hide();
    };
    $scope.sendComment=function(fotoid){

      if(fotoid!=null&&fotoid!=""){
        var tester='#commentsf-'+fotoid;
        var element=$(tester);
        var testerval=$(tester).val();
        console.log(tester);
        console.log(element)
        console.log(testerval);
        console.log($.trim(testerval).length);
        if($.trim(testerval).length>0){
          console.log("if1")
          if($scope.comment.commenting==false){
            console.log("if2")
            $scope.comment.facebooktoken=MTO.facebooktoken;
            $scope.comment.googletoken=MTO.googletoken;
            $scope.comment.email=MTO.email;
            $scope.comment.posttype=1;
            $scope.comment.fotoid=fotoid;
            $scope.comment.videoid=null;
            $scope.comment.comment=testerval;
            $scope.comment.uploadcomment().then(function(val){
              if(val=="12"){
                var commenttotal='#commenttotalsf-'+fotoid;
                var total=$(commenttotal).text();
                var totalp=parseInt(total);
                var totalp=totalp+1;
                $(commenttotal).text(totalp);
                $(tester).val("");
              }
              console.log("sended");
            },function error(err){
              $scope.comment.commenting=false;
              console.log(err)
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert()
            })
          }
        }
      }

    };
    //secilen fotonun modalını acma

    $scope.openModal = function(fotoid) {
      console.log(fotoid);
      $scope.fotoid=fotoid;
      $scope.modal.show();
    };

    //modal saklama
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.MT0=MTO;

    //Resin ekleme plugini galeri ya da kameradan resim alınabiliyor. Action sheet kullanılıyor
    $scope.showact2=function(){
     console.log('here');
      var options = {
        title: 'Resim Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Resim Çek'],
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
                    .show("Fotoğrafınız sunucuya yollandı. Onaylandığı zaman diğer resimlerle birlikte görüntülenecektir.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      $ionicLoading.hide();
                      $scope.alert.title="Hata";
                      $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                  template:'Sunucuya yollanıyor...'

                });
                $scope.upload.upload().then(function(returner){
                  console.log(returner);
                  $cordovaActionSheet.hide();
                  $ionicLoading.hide();
                  $cordovaToast
                    .show("Fotoğrafınız sunucuya yollandı. Onaylandığı zaman diğer resimlerle birlikte görüntülenecektir", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      console.log("error")
                    });
                },function error(err){
                  $ionicLoading.hide();
                  console.log(err);
                  $scope.alert.title="Hata";
                  $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.feed = FavPicsService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;
    $scope.feed.favs().then(function(){

      $ionicLoading.hide();

    });
    $scope.puanver=function(fotoid,puan){
      $scope.puanservis=PicPoint;
      $scope.mto=MTO;
      $scope.puanservis.googletoken=$scope.mto.googletoken;
      $scope.puanservis.facebooktoken=$scope.mto.facebooktoken;
      $scope.puanservis.fotoid=fotoid;
      $scope.puanservis.videoid=null;
      $scope.puanservis.puan=puan;
      $scope.puanservis.email='test@test.com';
      $scope.puanservis.updatepoint().then(function(val){
        console.log(val);
        $scope.modal.hide();
        $scope.hider=fotoid;
        var hide="#likersf-"+fotoid;
        var ort='#ortsf-'+fotoid;
        var pers='#perssf-'+fotoid;
        var totp='#totpsf-'+fotoid;
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
        // console.log(ortalama);
        // console.log(person);
        // console.log(total);
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });
      //console.log(fotoid);
      //console.log(puan)
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
  .controller("FavPicController2",function($scope,$ionicLoading,FavPicsService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$ionicModal ,PicPoint,MTO,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.kat='';
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
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
    $scope.showact2=function(){
        var options = {
        title: 'Fotoğraf Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Resim Çek'],
        addCancelButtonWithLabel:'Vazgeç',
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
                    .show("Resminiz sunucuya yollandı. Onaylandığı zaman diğer resimlerle birlikte gösterilecek.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      $ionicLoading.hide();
                      $scope.alert.title="Hata";
                      $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                    .show("Resminiz sunucuya yollandı. Onaylandığı zaman diğer resimlerle birlikte gösterilecek.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      console.log("error")
                    });
                },function error(err){
                  $ionicLoading.hide();
                  console.log(err);
                  $scope.alert.title="Hata";
                  $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.test="2";
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $ionicModal.fromTemplateUrl('templates/modals/starmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.choice='';
    $ionicModal.fromTemplateUrl('templates/modals/commentmodal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      cache:'false'
    }).then(function(modal2) {
      $scope.commodal = modal2;
    });
    $scope.opencomModal = function(fotoid) {
      $scope.commentpull.facebooktoken=MTO.facebooktoken;
      $scope.commentpull.googletoken=MTO.googletoken;
      $scope.commentpull.email=MTO.email;
      $scope.commentpull.posttype=1;
      $scope.commentpull.fotoid=fotoid;
      $scope.commentpull.videoid=null;
      $ionicLoading.show({
        template:'Yorumlar yükleniyor...'

      });
      $scope.commentpull.loadcomment().then(function(){
        console.log('loadingmi?')
        console.log($scope.commentpull)
        $ionicLoading.hide();
        $scope.commodal.show();
      },function error(err){
        $ionicLoading.hide();
        console.log(err)
      })



    };
    $scope.closecomModal = function() {
      $ionicLoading.hide();
      $scope.commodal.hide();
    };
    $scope.sendComment=function(fotoid){

      if(fotoid!=null&&fotoid!=""){
        var tester='#commentmf-'+fotoid;
        var element=$(tester);
        var testerval=$(tester).val();
        console.log(tester);
        console.log(element)
        console.log(testerval);
        console.log($.trim(testerval).length);
        if($.trim(testerval).length>0){
          console.log("if1")
          if($scope.comment.commenting==false){
            console.log("if2")
            $scope.comment.facebooktoken=MTO.facebooktoken;
            $scope.comment.googletoken=MTO.googletoken;
            $scope.comment.email=MTO.email;
            $scope.comment.posttype=1;
            $scope.comment.fotoid=fotoid;
            $scope.comment.videoid=null;
            $scope.comment.comment=testerval;
            $scope.comment.uploadcomment().then(function(val){
              if(val=="12"){
                var commenttotal='#commenttotalmf-'+fotoid;
                var total=$(commenttotal).text();
                var totalp=parseInt(total);
                var totalp=totalp+1;
                $(commenttotal).text(totalp);
                $(tester).val("");
              }
              console.log("sended");
            },function error(err){
              $scope.comment.commenting=false;
              console.log(err)
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert()
            })
          }
        }



      }

    };
    $scope.openModal = function(fotoid) {
      console.log(fotoid);
      $scope.fotoid=fotoid;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.feed = FavPicsService2;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;
    $scope.feed.favs().then(function(){

      $ionicLoading.hide();

    });
    $scope.puanver=function(fotoid,puan){
      $scope.puanservis=PicPoint;
      $scope.mto=MTO;
      $scope.puanservis.googletoken=$scope.mto.googletoken;
      $scope.puanservis.facebooktoken=$scope.mto.facebooktoken;
      $scope.puanservis.fotoid=fotoid;
      $scope.puanservis.videoid=null;
      $scope.puanservis.puan=puan;
      $scope.puanservis.email='test@test.com';
      $scope.puanservis.updatepoint().then(function(val){
        console.log(val);
        $scope.modal.hide();
        $scope.hider=fotoid;
        var hide="#likermf-"+fotoid;
        var ort='#ortmf-'+fotoid;
        var pers='#persmf-'+fotoid;
        var totp='#totpmf-'+fotoid;
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
        console.log(ortalama);
        console.log(person);
        console.log(total);
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });
      console.log(fotoid);
      console.log(puan)
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
  .controller("FavPicController3",function($scope,$ionicLoading,FavPicsService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$ionicModal ,PicPoint,MTO,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.kat='';
    if ($ionicTabsDelegate.selectedIndex() == 0){
      $scope.kat=1;
    }
    if ($ionicTabsDelegate.selectedIndex() == 1){
      $scope.kat=2;
    }
    if ($ionicTabsDelegate.selectedIndex() == 2){
      $scope.kat=3;
    }
    //
    //$scope.menu=true;
    $scope.MT0=MTO;

    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.showact2=function(){
       var options = {
        title: 'Fotoğraf Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Resim Çek'],
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
                    .show("Resminiz sunucuya yollandı. Onaylandığı zaman diğer resimlerle birlikte gösterilecek.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      $ionicLoading.hide();
                      $scope.alert.title="Hata";
                      $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                    .show("Resminiz sunucuya yollandı. Onaylandığı zaman diğer resimlerle birlikte gösterilecek.", 'long', 'center')
                    .then(function(success) {
                      console.log("toast")
                    }, function (error) {
                      console.log("error")
                    });
                },function error(err){
                  $ionicLoading.hide();
                  console.log(err);
                  $scope.alert.title="Hata";
                  $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.test="2";
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $ionicModal.fromTemplateUrl('templates/modals/starmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.choice='';
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
    $ionicModal.fromTemplateUrl('templates/modals/commentmodal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      cache:'false'
    }).then(function(modal2) {
      $scope.commodal = modal2;
    });
    $scope.opencomModal = function(fotoid) {
      $scope.commentpull.facebooktoken=MTO.facebooktoken;
      $scope.commentpull.googletoken=MTO.googletoken;
      $scope.commentpull.email=MTO.email;
      $scope.commentpull.posttype=1;
      $scope.commentpull.fotoid=fotoid;
      $scope.commentpull.videoid=null;
      $ionicLoading.show({
        template:'Yorumlar yükleniyor...'

      });
      $scope.commentpull.loadcomment().then(function(){
        console.log('loadingmi?')
        console.log($scope.commentpull)
        $ionicLoading.hide();
        $scope.commodal.show();
      },function error(err){
        $ionicLoading.hide();
        console.log(err)
      })



    };
    $scope.closecomModal = function() {
      $ionicLoading.hide();
      $scope.commodal.hide();
    };
    $scope.sendComment=function(fotoid){

      if(fotoid!=null&&fotoid!=""){
        var tester='#commentgf-'+fotoid;
        var element=$(tester);
        var testerval=$(tester).val();
        console.log(tester);
        console.log(element)
        console.log(testerval);
        console.log($.trim(testerval).length);
        if($.trim(testerval).length>0){
          console.log("if1")
          if($scope.comment.commenting==false){
            console.log("if2")
            $scope.comment.facebooktoken=MTO.facebooktoken;
            $scope.comment.googletoken=MTO.googletoken;
            $scope.comment.email=MTO.email;
            $scope.comment.posttype=1;
            $scope.comment.fotoid=fotoid;
            $scope.comment.videoid=null;
            $scope.comment.comment=testerval;
            $scope.comment.uploadcomment().then(function(val){
              if(val=="12"){
                var commenttotal='#commenttotalgf-'+fotoid;

                var total=$(commenttotal).text();
                var totalp=parseInt(total);
                var totalp=totalp+1;
                $(commenttotal).text(totalp);
                $(tester).val("");
              }
              console.log("sended");
            },function error(err){
              $scope.comment.commenting=false;
              console.log(err)
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert()
            })
          }
        }



      }

    };
    $scope.openModal = function(fotoid) {
      console.log(fotoid);
      $scope.fotoid=fotoid;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.feed = FavPicsService3;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;
    $scope.feed.favs().then(function(){

      $ionicLoading.hide();

    });


    $scope.puanver=function(fotoid,puan){
      $scope.puanservis=PicPoint;
      $scope.mto=MTO;
      $scope.puanservis.googletoken=$scope.mto.googletoken;
      $scope.puanservis.facebooktoken=$scope.mto.facebooktoken;
      $scope.puanservis.fotoid=fotoid;
      $scope.puanservis.videoid=null;
      $scope.puanservis.puan=puan;
      $scope.puanservis.email='test@test.com';
      $scope.puanservis.updatepoint().then(function(val){
        console.log(val);
        $scope.modal.hide();
        $scope.hider=fotoid;

        var hide="#likergf-"+fotoid;
        var ort='#ortgf-'+fotoid;
        var pers='#persgf-'+fotoid;
        var totp='#totpgf-'+fotoid;
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
        console.log(ortalama);
        console.log(person);
        console.log(total);
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });
      var hide="liker-"+fotoid;

      console.log(fotoid);
      console.log(puan)
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
  .controller("FavVidController",function($sce,$scope,$ionicLoading,FavVidsService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$ionicModal ,PicPoint,MTO,GalleryVideoService,VInfoService,CompressService,CaptureService,UploadVidService,AlertService,$cordovaActionSheet,$cordovaToast,$ionicPlatform,$ionicPopup,$cordovaLocalNotification,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.kat='';
    $scope.alert=AlertService;
    $scope.upload=UploadVidService;
    $scope.galleryvideo=GalleryVideoService;
    $scope.vinfo=VInfoService;
    $scope.vinfo2=VInfoService;
    $scope.compress=CompressService;
    $scope.takevideo=CaptureService;
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
    console.log($scope.kat);
    //$scope.menu=true;
    $scope.test="2";
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $ionicModal.fromTemplateUrl('templates/modals/starvidmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.choice='';

    $ionicModal.fromTemplateUrl('templates/modals/commentmodal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      cache:'false'
    }).then(function(modal2) {
      $scope.commodal = modal2;
    });
    $scope.opencomModal = function(videoid) {
      $scope.commentpull.facebooktoken=MTO.facebooktoken;
      $scope.commentpull.googletoken=MTO.googletoken;
      $scope.commentpull.email=MTO.email;
      $scope.commentpull.posttype=2;
      $scope.commentpull.videoid=videoid;
      $scope.commentpull.fotoid=null;
      $ionicLoading.show({
        template:'Yorumlar yükleniyor...'

      });
      $scope.commentpull.loadcomment().then(function(){
        console.log('loadingmi?')
        console.log($scope.commentpull)
        $ionicLoading.hide();
        $scope.commodal.show();
      },function error(err){
        $ionicLoading.hide();
        console.log(err)
      })



    };
    $scope.closecomModal = function() {
      $ionicLoading.hide();
      $scope.commodal.hide();
    };
    $scope.sendComment=function(videoid){

      if(videoid!=null&&videoid!=""){
        var tester='#commentsvf-'+videoid;
        var element=$(tester);
        var testerval=$(tester).val();

        if($.trim(testerval).length>0){
          console.log("if1")
          if($scope.comment.commenting==false){
            console.log("if2")
            $scope.comment.facebooktoken=MTO.facebooktoken;
            $scope.comment.googletoken=MTO.googletoken;
            $scope.comment.email=MTO.email;
            $scope.comment.posttype=2;
            $scope.comment.fotoid=null;
            $scope.comment.videoid=videoid;
            $scope.comment.comment=testerval;
            $scope.comment.uploadcomment().then(function(val){
              if(val=="12"){
                var commenttotal='#commenttotalsvf-'+videoid;
                var total=$(commenttotal).text();
                var totalp=parseInt(total);
                var totalp=totalp+1;
                $(commenttotal).text(totalp);
                $(tester).val("");
              }
              console.log("sended");
            },function error(err){
              $scope.comment.commenting=false;
              console.log(err)
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert()
            })
          }
        }



      }

    };
    $scope.openModal = function(videoid) {
      console.log(videoid);
      $scope.videoid=videoid;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed = FavVidsService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;
    $scope.feed.favs().then(function(){
      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
      });

      $ionicLoading.hide();

    });
    console.log($scope.feed.results);
    this.config = {
      sources: $scope.videolist,
      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };

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
        var hide="#likersvf-"+videoid;
        var ort='#ortsvf-'+videoid;
        var pers='#perssvf-'+videoid;
        var totp='#totpsvf-'+videoid;
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

    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };

    $scope.showactvid=function(){
      var options = {
        title: 'Fotoğraf Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Resim Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };

      // ========== Scheduling
      $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
           title: 'Sıkıştırma tamamlandı',
            text: 'Dosyanız sıkıştırıldı ve sunucuya yollandı.',
          }).then(function (result) {
            // ...
          });
        };
      });
      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          console.log(index);
          if(index==1){
            //Galeri.Önce galeriye git video seç sonra yükle.
            $scope.galleryvideo.galleryvideo().then(function(val){
              console.log(val);
              var filecheck=val.substring(0,7);
              if(filecheck!="file://"){val="file://"+val}
              console.log(val);

              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                //once buyukluk incele sonra ona gore convert
                console.log(scc);
                $scope.vinfo.getinfo(scc).then(function(val){
                  if(val.duration>32){
                    $scope.alert.title="Video çok uzun";
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){
                      var confirmPopup = $ionicPopup.confirm({

  title: 'Sıkıştırma Uyarısı',
                        template: "Kaydettiğiniz video sunucularımız için çok büyük. Yüklemeden önce sıkıştırmamız gerekir. Maalesef biraz zaman alacaktır. Sıkıştırma işlemi arka planda devam edecektir. İşlem tamamlanmadan lütfen uygulamayı kapatmayın.",
                        cancelText: 'Vazgeç',
                        cancelType: 'button-assertive', // String (default: 'button-default').
                        okText: 'Tamam',

                      });

                      confirmPopup.then(function(res) {
                        if(res) {
                          cordova.plugins.backgroundMode.enable();
                          if($scope.compress.isTranscoding==false){
                            $scope.compress.transcode(scc).then(function(val){
                              cordova.plugins.backgroundMode.disable();
                              console.log(val);
                              var filecheck=val.substring(0,7);
                              if(filecheck!="file://"){val="file://"+val}
                              $scope.upload.filelink=val;
                              $scope.upload.kategoriid=1;
                              $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                              $scope.upload.googletoken=$scope.MTO.googletoken;
                              $scope.upload.email=$scope.MTO.email;
                              $scope.upload.filetype=2;
                              $scope.upload.upload().then(function(){
                                $scope.scheduleSingleNotification();
                                $cordovaToast
                                  .show("Dosyanız sıkıştırıldı ve sunucuya yollandı..", 'long', 'center')
                                  .then(function(success) {
                                    console.log("toast")
                                  }, function (error) {
                                    $ionicLoading.hide();
                                    $scope.alert.title="Hata";
                                    $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("Devam eden bir sıkıştırma işlemi var. Lütfen öncelikle onun bitmesini bekleyiniz.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert()
                              });
                          }
                        } else {
                          //Close
                        }
                      });
                    }
                    else{
                      console.log('upload başladı');
                      $scope.upload.filelink=scc;
                      $scope.upload.kategoriid=1;
                      $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                      $scope.upload.googletoken=$scope.MTO.googletoken;
                      $scope.upload.email=$scope.MTO.email;
                      $scope.upload.filetype=2;
                      cordova.plugins.backgroundMode.enable();
                      $cordovaToast
                        .show('Yükleme Başladı', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });

                      $scope.upload.upload().then(function(){

                        cordova.plugins.backgroundMode.disable();
                        //$scope.scheduleSingleNotification();
                        $cordovaToast
                          .show("Dosyanız sunucuya yollandı...", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {
                            $ionicLoading.hide();
                            $scope.alert.title="Hata";
                            $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){
                        $ionicLoading.hide();
                        $scope.alert.title="Hata";
                        $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                        $scope.alert.alert();
                        console.log(err)
                      })
                    }
                  }
                })

              }
              function errorurl(err){
                console.log(err);
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }
            })




          }
          if(index==2){
            //video çek

            $scope.takevideo.capture().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val[0].fullPath, successurl, errorurl);
              function successurl(scc){
                //once buyukluk incele sonra ona gore convert

                console.log(scc);
                $scope.vinfo2.getinfo(scc).then(function(val){
                  console.log(val)
                  if(val.duration>32){
                    $scope.alert.title="Video çok uzun";
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz.";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){//Size Check
                      var confirmPopup = $ionicPopup.confirm({

  title: 'Sıkıştırma Uyarısı',
                        template: "Kaydettiğiniz video sunucularımız için çok büyük. Yüklemeden önce sıkıştırmamız gerekir. Maalesef biraz zaman alacaktır. Sıkıştırma işlemi arka planda devam edecektir. İşlem tamamlanmadan lütfen uygulamayı kapatmayın.",
                        cancelText: 'Vazgeç',
                        cancelType: 'button-assertive', // String (default: 'button-default').
                        okText: 'Tamam',

                      });
                      confirmPopup.then(function(res) {
                        if(res) {
                          cordova.plugins.backgroundMode.enable();
                          if($scope.compress.isTranscoding==false){
                            $scope.compress.transcode(scc).then(function(val){
                              cordova.plugins.backgroundMode.disable();
                              console.log(val);
                              var filecheck=val.substring(0,7);
                              if(filecheck!="file://"){val="file://"+val}
                              $scope.upload.filelink=val;
                              $scope.upload.kategoriid=1;
                              $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                              $scope.upload.googletoken=$scope.MTO.googletoken;
                              $scope.upload.email=$scope.MTO.email;
                              $scope.upload.filetype=2;
                              $scope.upload.upload().then(function(){
                                $scope.scheduleSingleNotification();
                                $cordovaToast
                                  .show("Dosyanız sıkıştırıldı ve sunucuya yollandı..", 'long', 'center')
                                  .then(function(success) {
                                    console.log("toast")
                                  }, function (error) {

                                    $scope.alert.title="Hata";
                                    $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }//Compress control
                          else{
                            $cordovaToast
                              .show("Devam eden bir sıkıştırma işlemi var. Lütfen önce onun bitmesini bekleyiniz.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {
                                $ionicLoading.hide();
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert()
                              });
                          }
                        } else {
                          //Close
                        }
                      });
                    }
                    else{
                      $cordovaToast
                        .show('Yükleme başladı', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                      cordova.plugins.backgroundMode.enable();
                      $scope.upload.filelink=scc;
                      $scope.upload.kategoriid=1;
                      $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                      $scope.upload.googletoken=$scope.MTO.googletoken;
                      $scope.upload.email=$scope.MTO.email;
                      $scope.upload.filetype=2;
                      $scope.upload.upload().then(function(){

                        cordova.plugins.backgroundMode.disable();
                        $cordovaToast
                          .show("Dosyanız sunucuya yollandı...", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {

                            $scope.alert.title="Hata";
                            $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){

                        $scope.alert.title="Hata";
                        $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                        $scope.alert.alert();
                        console.log(err)
                      })
                    }
                  }
                },function error(err){
                  console.log(err)
                })

              }
              function errorurl(err){
                console.log(err);
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            },function error(err){
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert();
              console.log(err)
            })

          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }

  })
  .controller("FavVidController2",function($sce,$scope,$ionicLoading,FavVidsService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$ionicModal ,PicPoint,MTO,GalleryVideoService,VInfoService,CompressService,CaptureService,UploadVidService,AlertService,$cordovaActionSheet,$cordovaToast,$ionicPlatform,$ionicPopup,$cordovaLocalNotification,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.kat='';
    $scope.alert=AlertService;
    $scope.upload=UploadVidService;
    $scope.galleryvideo=GalleryVideoService;
    $scope.vinfo=VInfoService;
    $scope.vinfo2=VInfoService;
    $scope.compress=CompressService;
    $scope.takevideo=CaptureService;
    console.log($scope.kat);
    //$scope.menu=true;
    $scope.test="2";
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $ionicModal.fromTemplateUrl('templates/modals/starvidmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.choice='';
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
    $ionicModal.fromTemplateUrl('templates/modals/commentmodal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      cache:'false'
    }).then(function(modal2) {
      $scope.commodal = modal2;
    });
    $scope.opencomModal = function(videoid) {
      $scope.commentpull.facebooktoken=MTO.facebooktoken;
      $scope.commentpull.googletoken=MTO.googletoken;
      $scope.commentpull.email=MTO.email;
      $scope.commentpull.posttype=2;
      $scope.commentpull.videoid=videoid;
      $scope.commentpull.fotoid=null;
      $ionicLoading.show({
        template:'Yorumlar yükleniyor...'

      });
      $scope.commentpull.loadcomment().then(function(){
        console.log('loadingmi?')
        console.log($scope.commentpull)
        $ionicLoading.hide();
        $scope.commodal.show();
      },function error(err){
        $ionicLoading.hide();
        console.log(err)
      })



    };
    $scope.closecomModal = function() {
      $ionicLoading.hide();
      $scope.commodal.hide();
    };
    $scope.sendComment=function(videoid){

      if(videoid!=null&&videoid!=""){
        var tester='#commentmvf-'+videoid;
        var element=$(tester);
        var testerval=$(tester).val();
        console.log(tester);
        console.log(element)
        console.log(testerval);
        console.log($.trim(testerval).length);
        if($.trim(testerval).length>0){
          console.log("if1")
          if($scope.comment.commenting==false){
            console.log("if2")
            $scope.comment.facebooktoken=MTO.facebooktoken;
            $scope.comment.googletoken=MTO.googletoken;
            $scope.comment.email=MTO.email;
            $scope.comment.posttype=2;
            $scope.comment.fotoid=null;
            $scope.comment.videoid=videoid;
            $scope.comment.comment=testerval;
            $scope.comment.uploadcomment().then(function(val){
              if(val=="12"){
                var commenttotal='#commenttotalmvf-'+videoid;

                var total=$(commenttotal).text();
                var totalp=parseInt(total);
                var totalp=totalp+1;
                $(commenttotal).text(totalp);
                $(tester).val("");
              }
              console.log("sended");
            },function error(err){
              $scope.comment.commenting=false;
              console.log(err)
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert()
            })
          }
        }



      }

    };
    $scope.openModal = function(videoid) {
      console.log(videoid);
      $scope.videoid=videoid;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed = FavVidsService2;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;
    $scope.feed.favs().then(function(){
      console.log($scope.feed);
      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
      });

      $ionicLoading.hide();

    });
    console.log($scope.feed.results);
    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };
    $scope.showactvid=function(){
      var options = {
        title: 'Fotoğraf Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Resim Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      // ========== Scheduling
      $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Sıkıştırma tamamlandı',
            text: 'Dosyanız sıkıştırıldı ve sunucuya yollandı.',
          }).then(function (result) {
            // ...
          });
        };
      });
      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          console.log(index);
          if(index==1){
            //Galeri.Önce galeriye git video seç sonra yükle.
            $scope.galleryvideo.galleryvideo().then(function(val){
              console.log(val);
              var filecheck=val.substring(0,7);
              if(filecheck!="file://"){val="file://"+val}
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                //once buyukluk incele sonra ona gore convert
                var filecheck=val.substring(0,7);
                if(filecheck!="file://"){val="file://"+val}
                console.log(scc);
                $scope.vinfo.getinfo(scc).then(function(val){
                  if(val.duration>32){
                    $scope.alert.title="Video çok uzun";
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Sıkıştırma Uyarısı',
                        template: "Seçtiğiniz video sunucularımız için çok büyük.Yüklemeden önce sıkıştırılması gerekiyor. Fakat bu biraz vakit alabilir. Arka planda sıkıştırma devam ederken lütfen uygulamayı kapatmayınız.",
                        cancelType: 'button-assertive',
                        cancelText: 'Cancel',
                        okText: 'OK',

                      });

                      confirmPopup.then(function(res) {
                        if(res) {
                          cordova.plugins.backgroundMode.enable();
                          if($scope.compress.isTranscoding==false){
                            $scope.compress.transcode(scc).then(function(val){
                              cordova.plugins.backgroundMode.disable();
                              console.log(val);
                              var filecheck=val.substring(0,7);
                              if(filecheck!="file://"){val="file://"+val}
                              $scope.upload.filelink=val;
                              $scope.upload.kategoriid=2;
                              $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                              $scope.upload.googletoken=$scope.MTO.googletoken;
                              $scope.upload.email=$scope.MTO.email;
                              $scope.upload.filetype=2;
                              $scope.upload.upload().then(function(){
                                $scope.scheduleSingleNotification();
                                $cordovaToast
                                  .show("Dosyanız sıkıştırıldı ve sunucuya yollandı..", 'long', 'center')
                                  .then(function(success) {
                                    console.log("toast")
                                  }, function (error) {
                                    $ionicLoading.hide();
                                    $scope.alert.title="Hata";
                                    $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){

                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("Devam eden bir sıkıştırma işlemi var. Lütfen önce onun bitmesini bekleyiniz.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert()
                              });
                          }
                        } else {
                          //Close
                        }
                      });
                    }
                    else{
                      cordova.plugins.backgroundMode.enable();
                      $cordovaToast
                        .show('Yükleme Başladı', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                      $scope.upload.filelink=scc;
                      $scope.upload.kategoriid=2;
                      $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                      $scope.upload.googletoken=$scope.MTO.googletoken;
                      $scope.upload.email=$scope.MTO.email;
                      $scope.upload.filetype=2;
                      $scope.upload.upload().then(function(){
                        cordova.plugins.backgroundMode.disable();
                        $ionicLoading.hide();
                        $scope.scheduleSingleNotification();
                        $cordovaToast
                          .show("Dosyanız sunucuya yollandı...", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {

                            $scope.alert.title="Hata";
                            $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){
                        $scope.alert.title="Hata";
                        $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                        $scope.alert.alert();
                        console.log(err)
                      })
                    }
                  }
                })

              }
              function errorurl(err){
                console.log(err);
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }
            })




          }
          if(index==2){
            //video çek

            $scope.takevideo.capture().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val[0].fullPath, successurl, errorurl);
              function successurl(scc){
                //once buyukluk incele sonra ona gore convert

                console.log(scc);
                $scope.vinfo2.getinfo(scc).then(function(val){
                  if(val.duration>32){
                    $scope.alert.title="Video çok uzun";
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz.";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>30000000){
                      var confirmPopup = $ionicPopup.confirm({

  title: 'Sıkıştırma Uyarısı',
                        template: "Kaydettiğiniz video sunucularımız için çok büyük. Yüklemeden önce sıkıştırmamız gerekir. Maalesef biraz zaman alacaktır. Sıkıştırma işlemi arka planda devam edecektir. İşlem tamamlanmadan lütfen uygulamayı kapatmayın.",
                        cancelText: 'Vazgeç',
                        cancelType: 'button-assertive', // String (default: 'button-default').
                        okText: 'Tamam',

                      });

                      confirmPopup.then(function(res) {
                        if(res) {
                          cordova.plugins.backgroundMode.enable();
                          if($scope.compress.isTranscoding==false){
                            $scope.compress.transcode(scc).then(function(val){
                              cordova.plugins.backgroundMode.disable();
                              console.log(val);
                              var filecheck=val.substring(0,7);
                              if(filecheck!="file://"){val="file://"+val}
                              $scope.upload.filelink=val;
                              $scope.upload.kategoriid=2;
                              $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                              $scope.upload.googletoken=$scope.MTO.googletoken;
                              $scope.upload.email=$scope.MTO.email;
                              $scope.upload.filetype=2;
                              $scope.upload.upload().then(function(){
                                $scope.scheduleSingleNotification();
                                $cordovaToast
                                  .show("Dosyanız sıkıştırıldı ve sunucuya yollandı..", 'long', 'center')
                                  .then(function(success) {
                                    console.log("toast")
                                  }, function (error) {
                                    $ionicLoading.hide();
                                    $scope.alert.title="Hata";
                                    $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("Devam eden bir sıkıştırma işlemi var. Lütfen önce onun bitmesini bekleyiniz.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert()
                              });
                          }
                        } else {
                          //Close
                        }
                      });
                    }
                    else{
                      $scope.upload.filelink=scc;
                      $scope.upload.kategoriid=2;
                      $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                      $scope.upload.googletoken=$scope.MTO.googletoken;
                      $scope.upload.email=$scope.MTO.email;
                      $scope.upload.filetype=2;
                      cordova.plugins.backgroundMode.enable();
                      $cordovaToast
                        .show('Yükleme Başladı', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                      $scope.upload.upload().then(function(){

                        cordova.plugins.backgroundMode.disable();
                        $cordovaToast
                          .show("Dosyanız sunucuya yollandı...", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {
                            $ionicLoading.hide();
                            $scope.alert.title="Hata";
                            $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){

                        $scope.alert.title="Hata";
                        $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                        $scope.alert.alert();
                        console.log(err)
                      })
                    }
                  }
                })

              }
              function errorurl(err){
                console.log(err);
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            },function error(err){
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert();
              console.log(err)
            })

          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
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
        var hide="#likermvf-"+videoid;
        var ort='#ortmvf-'+videoid;
        var pers='#persmvf-'+videoid;
        var totp='#totpmvf-'+videoid;
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
        console.log(ortalama);
        console.log(person);
        console.log(total);
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });

      console.log(videoid);
      console.log(puan)
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
  .controller("FavVidController3",function($sce,$scope,$ionicLoading,FavVidsService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$ionicModal ,PicPoint,MTO,GalleryVideoService,VInfoService,CompressService,CaptureService,UploadVidService,AlertService,$cordovaActionSheet,$cordovaToast,$ionicPlatform,$ionicPopup,$cordovaLocalNotification,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.kat='';
    $scope.alert=AlertService;
    $scope.upload=UploadVidService;
    $scope.galleryvideo=GalleryVideoService;
    $scope.vinfo=VInfoService;
    $scope.vinfo2=VInfoService;
    $scope.compress=CompressService;
    $scope.takevideo=CaptureService;
    console.log($scope.kat);
    //$scope.menu=true;
    $scope.test="2";
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $ionicModal.fromTemplateUrl('templates/modals/starvidmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.choice='';
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
    $ionicModal.fromTemplateUrl('templates/modals/commentmodal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      cache:'false'
    }).then(function(modal2) {
      $scope.commodal = modal2;
    });
    $scope.opencomModal = function(videoid) {
      $scope.commentpull.facebooktoken=MTO.facebooktoken;
      $scope.commentpull.googletoken=MTO.googletoken;
      $scope.commentpull.email=MTO.email;
      $scope.commentpull.posttype=2;
      $scope.commentpull.videoid=videoid;
      $scope.commentpull.fotoid=null;
      $ionicLoading.show({
        template:'Yorumlar yükleniyor...'

      });
      $scope.commentpull.loadcomment().then(function(){
        console.log('loadingmi?')
        console.log($scope.commentpull)
        $ionicLoading.hide();
        $scope.commodal.show();
      },function error(err){
        $ionicLoading.hide();
        console.log(err)
      })



    };
    $scope.closecomModal = function() {
      $ionicLoading.hide();
      $scope.commodal.hide();
    };
    $scope.sendComment=function(videoid){

      if(videoid!=null&&videoid!=""){
        var tester='#commentgvf-'+videoid;
        var element=$(tester);
        var testerval=$(tester).val();
        console.log(tester);
        console.log(element)
        console.log(testerval);
        console.log($.trim(testerval).length);
        if($.trim(testerval).length>0){
          console.log("if1")
          if($scope.comment.commenting==false){
            console.log("if2")
            $scope.comment.facebooktoken=MTO.facebooktoken;
            $scope.comment.googletoken=MTO.googletoken;
            $scope.comment.email=MTO.email;
            $scope.comment.posttype=2;
            $scope.comment.fotoid=null;
            $scope.comment.videoid=videoid;
            $scope.comment.comment=testerval;
            $scope.comment.uploadcomment().then(function(val){
              if(val=="12"){
                var commenttotal='#commenttotalgvf-'+videoid;

                var total=$(commenttotal).text();
                var totalp=parseInt(total);
                var totalp=totalp+1;
                $(commenttotal).text(totalp);
                $(tester).val("");
              }
              console.log("ss");
            },function error(err){
              $scope.comment.commenting=false;
              console.log(err)
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert()
            })
          }
        }



      }

    };
    $scope.openModal = function(videoid) {
      console.log(videoid);
      $scope.videoid=videoid;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed = FavVidsService3;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;
    $scope.feed.favs().then(function(){
      angular.forEach($scope.feed.results, function (data) {
        // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
        $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
      });

      $ionicLoading.hide();

    });
    console.log($scope.feed.results);
    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };
    $scope.showactvid=function(){
      var options = {
        title: 'Fotoğraf Ekle',
        buttonLabels: ['Fotoğraf Galerisi', 'Resim Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      // ========== Scheduling
      $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Sıkıştırma tamamlandı',
            text: 'Dosyanız sıkıştırıldı ve sunucuya yollandı.'
          }).then(function (result) {
            // ...
          });
        };
      });
      $cordovaActionSheet.show(options)
        .then(function(btnIndex) {
          var index = btnIndex;
          console.log(index);
          if(index==1){
            //Galeri.Önce galeriye git video seç sonra yükle.
            $scope.galleryvideo.galleryvideo().then(function(val){
              console.log(val);
              var filecheck=val.substring(0,7);
              if(filecheck!="file://"){val="file://"+val}
              window.FilePath.resolveNativePath(val, successurl, errorurl);
              function successurl(scc){
                //once buyukluk incele sonra ona gore convert
                var filecheck=val.substring(0,7);
                if(filecheck!="file://"){val="file://"+val}
                console.log(scc);
                $scope.vinfo.getinfo(scc).then(function(val){
                  if(val.duration>32){
                    $scope.alert.title="Video çok uzun";
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz.";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Sıkıştırma Uyarısı',
                        template: "Kaydettiğiniz video sunucularımız için çok büyük. Yüklemeden önce sıkıştırmamız gerekir. Maalesef biraz zaman alacaktır. Sıkıştırma işlemi arka planda devam edecektir. İşlem tamamlanmadan lütfen uygulamayı kapatmayın.",
                        cancelText: 'Vazgeç',
                        cancelType: 'button-assertive', // String (default: 'button-default').
                        okText: 'Tamam',

                      });

                      confirmPopup.then(function(res) {
                        if(res) {
                          cordova.plugins.backgroundMode.enable();
                          if($scope.compress.isTranscoding==false){
                            $scope.compress.transcode(scc).then(function(val){
                              cordova.plugins.backgroundMode.disable();
                              console.log(val);
                              var filecheck=val.substring(0,7);
                              if(filecheck!="file://"){val="file://"+val}
                              $scope.upload.filelink=val;
                              $scope.upload.kategoriid=3;
                              $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                              $scope.upload.googletoken=$scope.MTO.googletoken;
                              $scope.upload.email=$scope.MTO.email;
                              $scope.upload.filetype=2;
                              $scope.upload.upload().then(function(){
                                $scope.scheduleSingleNotification();
                                $cordovaToast
                                  .show("Dosyanız sıkıştırıldı ve sunucuya yollandı..", 'long', 'center')
                                  .then(function(success) {
                                    console.log("toast")
                                  }, function (error) {
                                    $ionicLoading.hide();
                                    $scope.alert.title="Hata";
                                    $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("Devam eden bir sıkıştırma işlemi var. Lütfen önce onun bitmesini bekleyiniz.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {
                                $ionicLoading.hide();
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert()
                              });
                          }
                        } else {
                          //Close
                        }
                      });
                    }
                    else{
                      cordova.plugins.backgroundMode.enable();
                      $cordovaToast
                        .show('Yükleme Başladı', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                      $scope.upload.filelink=scc;
                      $scope.upload.kategoriid=3;
                      $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                      $scope.upload.googletoken=$scope.MTO.googletoken;
                      $scope.upload.email=$scope.MTO.email;
                      $scope.upload.filetype=2;
                      $scope.upload.upload().then(function(){
                        $ionicLoading.hide();
                        cordova.plugins.backgroundMode.disable();
                        $scope.scheduleSingleNotification();
                        $cordovaToast
                          .show("Dosyanız sunucuya yollandı...", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {
                            $ionicLoading.hide();
                            $scope.alert.title="Hata";
                            $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){
                        $ionicLoading.hide();

                        $scope.alert.title="Hata";
                        $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                        $scope.alert.alert();
                        console.log(err)
                      })
                    }
                  }
                })

              }
              function errorurl(err){
                $ionicLoading.hide();
                console.log(err);
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }
            })




          }
          if(index==2){
            //video çek

            $scope.takevideo.capture().then(function(val){
              console.log(val);
              window.FilePath.resolveNativePath(val[0].fullPath, successurl, errorurl);
              function successurl(scc){
                //once buyukluk incele sonra ona gore convert

                console.log(scc);
                $scope.vinfo2.getinfo(scc).then(function(val){
                  if(val.duration>32){
                    $scope.alert.title="Video çok uzun";
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz.";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Sıkıştırma Uyarısı',
                        template: "Kaydettiğiniz video sunucularımız için çok büyük. Yüklemeden önce sıkıştırmamız gerekir. Maalesef biraz zaman alacaktır. Sıkıştırma işlemi arka planda devam edecektir. İşlem tamamlanmadan lütfen uygulamayı kapatmayın.",
                        cancelText: 'Vazgeç',
                        cancelType: 'button-assertive', // String (default: 'button-default').
                        okText: 'Tamam',

                      });

                      confirmPopup.then(function(res) {
                        if(res) {
                          cordova.plugins.backgroundMode.enable();
                          if($scope.compress.isTranscoding==false){
                            $scope.compress.transcode(scc).then(function(val){
                              cordova.plugins.backgroundMode.disable();
                              console.log(val);
                              var filecheck=val.substring(0,7);
                              if(filecheck!="file://"){val="file://"+val}
                              $scope.upload.filelink=val;
                              $scope.upload.kategoriid=3;
                              $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                              $scope.upload.googletoken=$scope.MTO.googletoken;
                              $scope.upload.email=$scope.MTO.email;
                              $scope.upload.filetype=2;
                              $scope.upload.upload().then(function(){
                                $scope.scheduleSingleNotification();
                                $cordovaToast
                                  .show("Dosyanız sıkıştırıldı ve sunucuya yollandı..", 'long', 'center')
                                  .then(function(success) {
                                    console.log("toast")
                                  }, function (error) {
                                    $ionicLoading.hide();
                                    $scope.alert.title="Hata";
                                    $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("Devam eden bir sıkıştırma işlemi var. Lütfen önce onun bitmesini bekleyiniz.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert()
                              });
                          }
                        } else {
                          //Close
                        }
                      });
                    }
                    else{
                      cordova.plugins.backgroundMode.enable();
                      $cordovaToast
                        .show('Yükleme Başladı', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                      $scope.upload.filelink=scc;
                      $scope.upload.kategoriid=3;
                      $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                      $scope.upload.googletoken=$scope.MTO.googletoken;
                      $scope.upload.email=$scope.MTO.email;
                      $scope.upload.filetype=2;
                      $scope.upload.upload().then(function(){
                        cordova.plugins.backgroundMode.disable();

                        $scope.scheduleSingleNotification();
                        $cordovaToast
                          .show("Dosyanız sunucuya yollandı...", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {

                            $scope.alert.title="Hata";
                            $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){

                        $scope.alert.title="Hata";
                        $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                        $scope.alert.alert();
                        console.log(err)
                      })
                    }
                  }
                })

              }
              function errorurl(err){
                console.log(err);
                $scope.alert.title="Hata";
                $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            },function error(err){
              $scope.alert.title="Hata";
              $scope.alert.message="Bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert();
              console.log(err)
            })

          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
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
        var hide="#likergvf-"+videoid;
        var ort='#ortgvf-'+videoid;
        var pers='#persgvf-'+videoid;
        var totp='#totpgvf-'+videoid;
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
        console.log(ortalama);
        console.log(person);
        console.log(total);
        $(hide).hide();
        $(ort).text(ortalama);
        $(pers).text(person);
        $(totp).text(total);
      });

      console.log(videoid);
      console.log(puan)
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

  });
