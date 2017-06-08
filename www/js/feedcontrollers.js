angular.module('starter.feedcontroller', [])
//Fav controlleri gibi farklı tablar icin farklı controllerlar yaratıldı.
  .controller("FeedController",function($scope,$ionicLoading,FeedService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,MTO,$ionicModal,PicPoint,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast,$state,CommentService,PullCommentService){


    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.MT0=MTO;

      $scope.alert=AlertService;
      $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;


    $scope.showact2=function(){
      console.log($scope.MTO);
      var options = {
        title: 'Fotoğraf Ekle',
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
                console.log($scope.upload);
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
                      $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı yeniden başlatın.";
                      $scope.alert.alert()
                    });
                })
              }
              function errorurl(err){
                $ionicLoading.hide();
                $scope.alert.title="Hata";
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı yeniden başlatın.";
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
                    .show("esminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
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
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.menu=true;
    $scope.choice='';

    $ionicModal.fromTemplateUrl('templates/modals/starmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

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
        var tester='#comments-'+fotoid;
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
                var commenttotal='#commenttotals-'+fotoid;

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
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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


    $scope.feed = FeedService;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=1;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start")
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
        //var hide="liker-"+fotoid;
        //document.getElementById(hide).style.display = 'none';
        var hide="#likers-"+fotoid;
        var ort='#orts-'+fotoid;
        var pers='#perss-'+fotoid;
        var totp='#totps-'+fotoid;
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

  .controller("FeedController2",function($scope,$ionicLoading,FeedService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,MTO,$ionicModal,PicPoint,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast,$state,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.MT0=MTO;

    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
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
    $scope.openMenu = function () {
      console.log("test");
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.menu=true;

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
        var tester='#commentm-'+fotoid;
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
                var commenttotal='#commenttotalm-'+fotoid;

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
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.feed = FeedService2;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=2;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start")
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
        //var hide="liker-"+fotoid;
        //document.getElementById(hide).style.display = 'none';
        var hide="#likerm-"+fotoid;
        var ort='#ortm-'+fotoid;
        var pers='#persm-'+fotoid;
        var totp='#totpm-'+fotoid;
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
  .controller("FeedController3",function($scope,$ionicLoading,FeedService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,MTO,$ionicModal,PicPoint,TakePicture,UploadService,GalleryPhotoService,AlertService,$cordovaActionSheet,$cordovaToast,$state,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });

    $scope.MT0=MTO;

    $scope.alert=AlertService;
    $scope.upload=UploadService;
    $scope.galleryphoto=GalleryPhotoService;
    $scope.takepicture=TakePicture;
    $scope.comment=CommentService;
    $scope.commentpull=PullCommentService;
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
                    .show("esminiz yollandı. Onaylandığı zaman diğer resimlerle birlikte yayınlanacaktır.", 'long', 'center')
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
        var tester='#commentg-'+fotoid;
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
                var commenttotal='#commenttotalg-'+fotoid;

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
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.menu=true;
    $scope.toggleLeftSideMenu = function() {
      console.log('click');
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.puanver=function(fotoid,puan){
      console.log('here');
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
        //var hide="liker-"+fotoid;
        //document.getElementById(hide).style.display = 'none';
        var hide="#likerg-"+fotoid;
        var ort='#ortg-'+fotoid;
        var pers='#persg-'+fotoid;
        var totp='#totpg-'+fotoid;
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

      console.log(fotoid);
      console.log(puan)
    };
    $scope.feed = FeedService3;
    $scope.MTO=MTO;
    $scope.feed.email=$scope.MTO.email;
    $scope.feed.facebooktoken=$scope.MTO.facebooktoken;
    $scope.feed.googletoken=$scope.MTO.googletoken;
    $scope.feed.kategori=3;
    $scope.feed.load().then(function(){

      $ionicLoading.hide();

    },function error(err){
      $state.go("start")
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

  .controller("FeedVideoController",function($scope,$ionicLoading,FeedVideoService,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO,$ionicModal,PicPoint,GalleryVideoService,VInfoService,CompressService,CaptureService,UploadVidService,AlertService,$cordovaActionSheet,$cordovaToast,$ionicPlatform,$ionicPopup,$cordovaLocalNotification,$state,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
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

    $scope.MT0=MTO;

    $scope.alert=AlertService;
    $scope.upload=UploadVidService;
    $scope.galleryvideo=GalleryVideoService;
    $scope.vinfo=VInfoService;
    $scope.vinfo2=VInfoService;
    $scope.compress=CompressService;
    $scope.takevideo=CaptureService;
    $scope.showactvid=function(){
      var options = {
        title: 'Video Ekle',
        buttonLabels: ['Video Galerisi', 'Video Çek'],
        addCancelButtonWithLabel: 'Vazgeç',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };

        // ========== Scheduling
      $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Compress Complete',
            text: 'Dosyanız sıkıştırıldı ve sunucuya yollandı.',
            icon: "",
            data: {
              customProperty: 'custom value'
            }
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
                       template: "Seçtiğiniz video sunucularımız için çok büyük.Yüklemeden önce sıkıştırılması gerekiyor. Fakat bu biraz vakit alabilir. Arka planda sıkıştırma devam ederken lütfen uygulamayı kapatmayınız.",
                       cancelText: 'Cancel',
                       cancelType: 'button-assertive', // String (default: 'button-default').
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
                                   $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                   $scope.alert.alert()
                                 });
                             },function error(err){
                               $scope.alert.title="Hata";
                               $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                               $scope.alert.alert();
                               console.log(err)
                             })


                           },function error(err){

                             $scope.alert.title="Hata";
                             $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                             $scope.alert.alert();
                             console.log(err)
                           })
                         }
                         else{
                           $cordovaToast
                             .show("There is a compression process ongoing.Please wait for it to finish.", 'long', 'center')
                             .then(function(success) {
                               console.log("toast")
                             }, function (error) {

                               $scope.alert.title="Hata";
                               $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                               $scope.alert.alert()
                             });
                         }
                       } else {
                         //Close
                       }
                     });
                   }
                   else{
                     console.log('start upload');
                     $scope.upload.filelink=scc;
                     $scope.upload.kategoriid=1;
                     $scope.upload.facebooktoken=$scope.MTO.facebooktoken;
                     $scope.upload.googletoken=$scope.MTO.googletoken;
                     $scope.upload.email=$scope.MTO.email;
                     $scope.upload.filetype=2;
                     cordova.plugins.backgroundMode.enable();
                     $cordovaToast
                       .show('Upload Started', 'long', 'center')
                       .then(function(success) {
                         // success
                       }, function (error) {
                         // error
                       });

                     $scope.upload.upload().then(function(){

                       cordova.plugins.backgroundMode.disable();
                       //$scope.scheduleSingleNotification();
                       $cordovaToast
                         .show("Your file has sent to server..", 'long', 'center')
                         .then(function(success) {
                           console.log("toast")
                         }, function (error) {
                           $ionicLoading.hide();
                           $scope.alert.title="Hata";
                           $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                           $scope.alert.alert()
                         });
                     },function error(err){
                       $ionicLoading.hide();
                       $scope.alert.title="Hata";
                       $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){//Size Check
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Sıkıştırma Uyarısı',
                        template: "The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunately it'll take some time.Compressing process will continue in the background. Please do not close the application before process completes",
                        cancelText: 'Cancel',
                        cancelType: 'button-assertive',
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
                                    $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }//Compress control
                          else{
                            $cordovaToast
                              .show("There is a compression process ongoing.Please wait for it to finish.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {
                                $ionicLoading.hide();
                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                        .show('Upload Started', 'long', 'center')
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
                          .show("Your file has sent to server..", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {

                            $scope.alert.title="Hata";
                            $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){

                        $scope.alert.title="Hata";
                        $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            },function error(err){
              $scope.alert.title="Hata";
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert();
              console.log(err)
            })

          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
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
        var tester='#commentsv-'+videoid;
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
                var commenttotal='#commenttotalsv-'+videoid;

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
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.posterlist=[];
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.videolist=[];
    $scope.feed=FeedVideoService;
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
        var hide="#likersv-"+videoid;
        var ort='#ortsv-'+videoid;
        var pers='#perssv-'+videoid;
        var totp='#totpsv-'+videoid;
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
      if($scope.feed.results.length>0){
  angular.forEach($scope.feed.results[0].fvl, function (data) {
    // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'

    $scope.videolist.push([{src:$sce.trustAsResourceUrl(data), type: "video/mp4"}]);

  });
  angular.forEach($scope.feed.results[0].fpl, function (data) {
    // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'

    $scope.posterlist.push([{poster:data}])
  });
}

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

    $scope.doRefresh = function () {

      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      },function error(err){
        console.log(err);
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          //$scope.videolist=[];
          //angular.forEach($scope.feed.results, function (data) {
          //  // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
          //  $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
          //});
          //console.log($scope.feed.results)
          //console.log($scope.videolist)
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }

  })
  .controller("FeedVideoController2",function($scope,$ionicLoading,FeedVideoService2,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO,$ionicModal,PicPoint,GalleryVideoService,VInfoService,CompressService,CaptureService,UploadVidService,AlertService,$cordovaActionSheet,$cordovaToast,$ionicPlatform,$ionicPopup,$cordovaLocalNotification,$state,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
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
    $scope.galleryvideo=GalleryVideoService;
    $scope.vinfo=VInfoService;
    $scope.vinfo2=VInfoService;
    $scope.compress=CompressService;
    $scope.takevideo=CaptureService;
    $scope.alert=AlertService;
    $scope.upload=UploadVidService;
    $scope.showactvid=function(){
      var options = {
        title: 'Video Ekle',
        buttonLabels: ['Video Galerisi', 'Video Çek'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      // ========== Scheduling
      $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Sıkıştırma Tamamlandı',
            text: 'Dosyanız sıkıştırıldı ve sunucuya yollandı.',
            icon: "",
            data: {
              customProperty: 'custom value'
            }
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
                                    $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){

                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("There is a compression process ongoing.Please wait for it to finish.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                        .show('Upload Started', 'long', 'center')
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
                          .show("Your file has sent to server..", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {

                            $scope.alert.title="Hata";
                            $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){
                        $scope.alert.title="Hata";
                        $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>30000000){
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Sıkıştırma Uyarısı',
                        template: "The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunately it'll take some time.Compressing process will continue in the background. Please do not close the application before process completes",
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
                                    $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("There is a compression process ongoing.Please wait for it to finish.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                        .show('Upload Started', 'long', 'center')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                      $scope.upload.upload().then(function(){

                        cordova.plugins.backgroundMode.disable();
                        $cordovaToast
                          .show("Your file has sent to server..", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {
                            $ionicLoading.hide();
                            $scope.alert.title="Hata";
                            $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){

                        $scope.alert.title="Hata";
                        $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            },function error(err){
              $scope.alert.title="Hata";
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert();
              console.log(err)
            })

          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
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
        var tester='#commentmv-'+videoid;
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
                var commenttotal='#commenttotalmv-'+videoid;

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
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.feed=FeedVideoService2;
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
        var hide="#likermv-"+videoid;
        var ort='#ortmv-'+videoid;
        var pers='#persmv-'+videoid;
        var totp='#totpmv-'+videoid;
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
    $scope.feed.load().then(function(data){
        console.log(data);
      $ionicLoading.hide();
      console.log($scope.feed);
      console.log($scope.videolist);
      console.log($scope.feed.results)
      if($scope.feed.results.length>0){
        angular.forEach($scope.feed.results[0].fvl, function (data) {
          // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
          $scope.videolist.push([{src:$sce.trustAsResourceUrl(data), type: "video/mp4"}]);
        });
      }


    },function error(err){
      $state.go("start");
    });


    this.config = {
      sources: $scope.videolist,

      theme: "lib/videogular-themes-default/videogular.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };

    $scope.doRefresh = function () {
      console.log('refreshing')
      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      },function error(err){
        console.log(err);
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          //$scope.videolist=[];
          //angular.forEach($scope.feed.results, function (data) {
          //  // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
          //  $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
          //});
          //console.log($scope.feed.results)
          //console.log($scope.videolist)
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }


    }

  })
  .controller("FeedVideoController3",function($scope,$ionicLoading,FeedVideoService3,$ionicTabsDelegate,$ionicSideMenuDelegate,$ionicActionSheet,$stateParams,$sce,MTO,$ionicModal,PicPoint,$state,GalleryVideoService,VInfoService,CompressService,CaptureService,UploadVidService,AlertService,$cordovaActionSheet,$cordovaToast,$ionicPlatform,$ionicPopup,$cordovaLocalNotification,CommentService,PullCommentService){
    $ionicLoading.show({
      template:'Yükleniyor...'

    });
    $scope.galleryvideo=GalleryVideoService;
    $scope.vinfo=VInfoService;
    $scope.vinfo2=VInfoService;
    $scope.compress=CompressService;
    $scope.takevideo=CaptureService;
    $scope.alert=AlertService;
    $scope.upload=UploadVidService;
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
        var tester='#commentgv-'+videoid;
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
                var commenttotal='#commenttotalgv-'+videoid;

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
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
    $scope.feed=FeedVideoService3;
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
      $scope.puanservis.email=$scope.mto.email;
      $scope.puanservis.updatepoint().then(function(val){
        console.log('here');
        console.log(val);
        $scope.modal.hide();
        $scope.hider=videoid;
        var hide="#likergv-"+videoid;
        var ort='#ortgv-'+videoid;
        var pers='#persgv-'+videoid;
        var totp='#totpgv-'+videoid;
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
if($scope.feed.results.length>0){
  angular.forEach($scope.feed.results[0].fvl, function (data) {
    // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
    $scope.videolist.push([{src:$sce.trustAsResourceUrl(data), type: "video/mp4"}]);
  });
  console.log($scope.videolist);
  console.log($scope.feed.results)
}


    },function error(err){
      console.log(err);
      $state.go("start")
    });
    $scope.showactvid=function(){
      var options = {
        title: 'Video Ekle',
        buttonLabels: ['Video Galerisi', 'Video Çek'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,

      };


      // ========== Scheduling
      $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Sıkıştırma Tamamlandı',
            text: 'Dosyanız sıkıştırıldı ve sunucuya yollandı.',
            icon: "",
            data: {
              customProperty: 'custom value'
            }
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
                        cancelType: 'button-assertive', // String (default: 'button-default').
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
                                    $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("There is a compression process ongoing.Please wait for it to finish.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {
                                $ionicLoading.hide();
                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                        .show('Upload Started', 'long', 'center')
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
                          .show("Your file has sent to server..", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {
                            $ionicLoading.hide();
                            $scope.alert.title="Hata";
                            $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){
                        $ionicLoading.hide();

                        $scope.alert.title="Hata";
                        $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                    $scope.alert.message="Lütfen en fazla 30 saniye uzunluğunda bir video seçiniz";
                    $scope.alert.alert();
                    //The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunatelly it'll take some time.Compressing process will continue at background. Please do not shut down the application before process completes
                  }
                  else{
                    if(val.size>32000000){
                      var confirmPopup = $ionicPopup.confirm({
                        title: 'Sıkıştırma Uyarısı',
                        template: "The video you have chosen is too big for our servers. We must compress it before uploading. Unfortunately it'll take some time.Compressing process will continue in the background. Please do not close the application before process completes",

                        cancelType: 'button-assertive',
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
                                    $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                    $scope.alert.alert()
                                  });
                              },function error(err){
                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                                $scope.alert.alert();
                                console.log(err)
                              })


                            },function error(err){

                              $scope.alert.title="Hata";
                              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                              $scope.alert.alert();
                              console.log(err)
                            })
                          }
                          else{
                            $cordovaToast
                              .show("There is a compression process ongoing.Please wait for it to finish.", 'long', 'center')
                              .then(function(success) {
                                console.log("toast")
                              }, function (error) {

                                $scope.alert.title="Hata";
                                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                        .show('Upload Started', 'long', 'center')
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
                          .show("Your file has sent to server..", 'long', 'center')
                          .then(function(success) {
                            console.log("toast")
                          }, function (error) {

                            $scope.alert.title="Hata";
                            $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                            $scope.alert.alert()
                          });
                      },function error(err){

                        $scope.alert.title="Hata";
                        $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
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
                $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
                $scope.alert.alert()
              }


            },function error(err){
              $scope.alert.title="Hata";
              $scope.alert.message="Beklenmeyen bir hata oluştu. Lütfen uygulamayı baştan başlatın.";
              $scope.alert.alert();
              console.log(err)
            })

          }
          else{
            $cordovaActionSheet.hide();

          }
        });
    };
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
      console.log('refreshing')
      $scope.feed.Refresh().then(function(){
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.feed)
      })

    };


    $scope.loadMore=function(){
      if(!$scope.feed.isLoading&&$scope.feed.hasMore){
        $scope.feed.LoadMore($stateParams.id).then(function(){
          //$scope.videolist=[];
          //angular.forEach($scope.feed.results, function (data) {
          //  // var zzz='[{src: '+$sce.trustAsResourceUrl(data.Link)+', type: "video/mp4"}]'
          //  $scope.videolist.push([{src:$sce.trustAsResourceUrl(data.Link), type: "video/mp4"}]);
          //});
          //console.log($scope.feed.results)
          //console.log($scope.videolist)
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
        cancelText: 'Cancel',
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


  });
