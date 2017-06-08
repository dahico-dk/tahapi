//json date ve isim filtresi(@)

angular.module('starter.filters', [])

  .filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
      return $sce.trustAsResourceUrl(val);
    };
  }])
.filter("jsDate", function () {
  return function (x) {
    if(x==null){x= "/Date(1475219600000)/"
    }
    return new Date(parseInt(x.substr(6)));
  };
})
.filter("mydate", function() {
  var re = /\\\/Date\(([0-9]*)\)\\\//;
  return function(x) {
    var m = x.match(re);
    if( m ) return new Date(parseInt(m[1]));
    else return null;
  };
})

.filter("getname",function(){
return function(x){
  console.log(x);
  var zxc=x.substring(0, x.lastIndexOf("@"));
  return zxc;
};

})
