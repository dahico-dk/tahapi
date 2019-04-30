# tahapi

Tahapi is an IONIC android app which has written in 2 weeks with IONIC(1.x) with zero IONIC knowledge. Android platform files has been removed for reducing the file size. One must add android platform to project before testing.

```
//adding android platform cli code
$ ionic cordova add android
```
Crosswalk bugs can be seen because of the latest updates on IONIC CLI and version changes. This project actually added to the github as a code reference. A working version of project resides on google play.

App's main purpose is listing images and videos which acquired from an web api as JSON. Users can comment and rate these pictures and videos. Also users can upload images or videos from  to server from their device galleries or taking them on fly. Big videos are compressed with Cordova-Video-Plugin on the background.

Users can log in the app with google or facebook.

Api keys must inserted at right locations for this purpose.

```
//Facebook
$cordovaOauth.facebook("[FACEBOOK_API_KEY]", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {...

//Google
 $cordovaOauth.google("[GOOGLE_API_KEY]", ["email"]).then(function(result) {...
```
Application gets its data from an web api with $http.get . But in this version of project api links left blank.

```
$http.get('[WEB-API-SERVER]', {params: para})...
```

Project is developed in very limited time with zero knowledge of library. 

Never tested on IOS
