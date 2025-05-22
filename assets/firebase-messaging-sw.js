importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyDooAntcXairjQkO0CSq8GVjcYD2Ea3FGQ",
  authDomain: "kolonizer-dcebc.firebaseapp.com",
  projectId: "kolonizer-dcebc",
  storageBucket: "kolonizer-dcebc.appspot.com",
  messagingSenderId: "534019451252",
  appId: "1:534019451252:web:ae0eeb542f6a2132706421",
  measurementId: "G-TP8TWHKRKK"
 });

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  console.log(self);
  // localStorage.setItem('redirect_url', payload.data.url)
  if(self.cookieStore){
    cookieStore.set("redirect_url", payload.data.url)
  }

  if(self.caches){
    console.log('caches is supported');
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          payload.data.url
        ])
      )
  }
  if(self.indexedDB){
    console.log('IndexedDB is supported');
    var request = self.indexedDB.open('kolonizer', 1);
    var db;
    request.onsuccess = function(event) {
        console.log('[onsuccess]', request.result);
        db = event.target.result; // === request.result
    };
    request.onerror = function(event) {
        console.log('[onerror]', request.error);
    };
    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      jsonObjSuper = {"Watchlist": payload.data.url}
      var key = jsonObjSuper["Watchlist"]

      var store = db.createObjectStore('products', {keyPath: "id"});
      
  };

}
if(self.window){
  console.log("self.window");
  console.log(self.window);
}
// self.window.localStorage.setItem('redirect_url' , JSON.stringify(payload.data.url) ) ;

  // window.location.href = payload.data.url
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/firebase-logo.png'
  // };
  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});
