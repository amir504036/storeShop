/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.setConfig({ debug:false });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "icon/android-launchericon-144-144.png",
    "revision": "fc1dc55a44e7c82b4dabce06afddf2a8"
  },
  {
    "url": "icon/android-launchericon-192-192.png",
    "revision": "c21e0efd5cbb632c5930a6a9256c3c21"
  },
  {
    "url": "icon/android-launchericon-48-48.png",
    "revision": "9b159afe0b2d3540ac886885e8d6a37e"
  },
  {
    "url": "icon/android-launchericon-512-512.png",
    "revision": "9e94f8340734e4030850579726e74dd1"
  },
  {
    "url": "icon/android-launchericon-72-72.png",
    "revision": "b96ed525637e35573d4c8e3ea186802e"
  },
  {
    "url": "icon/android-launchericon-96-96.png",
    "revision": "0f36ab7545531463285a8ac270138022"
  },
  {
    "url": "index.html",
    "revision": "688f0faa8d669f834b8668b17b0398dd"
  },
  {
    "url": "js/serviceworker.js",
    "revision": "eac901f1ff29418510a2ec9ef5a75124"
  },
  {
    "url": "manifest.json",
    "revision": "dc95c9c623f112f0165aac6931f3230e"
  },
  {
    "url": "style.min.css",
    "revision": "ae94329f86ab84d8eb637dd8a7755565"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
