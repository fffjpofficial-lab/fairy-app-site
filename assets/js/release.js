// The release facts the pages show, in one place. Change this file (and nothing
// else) when a version ships or a download becomes available.
//
//  - android.downloadUrl: where the APK is handed out. null = not decided yet,
//    the pages say 準備中. Never point it at this repository: the APK is not
//    published here (the Pages repository is public).
//  - ios.appStoreUrl: the App Store page, only once Apple has published the
//    app. null = 準備中. Copy the real link from App Store Connect; do not
//    guess one.
//  - pages: future sections. Set one to true only after its folder
//    (guide/, faq/, updates/) exists with an index.html.
window.FAIRY_RELEASE = {
  android: {
    versionName: '1.0.0',
    versionCode: 1,
    minAndroid: '7.0',
    fileName: 'fairy-performer-android-1.0.0-1-prod.apk',
    fileSize: '約 56 MB',
    apkSha256: '295cd1115b033e2d840cb688d4db354c96c5350be0c5a7acd4d4472c622e14eb',
    certSha256: '17:1E:C9:1F:F8:28:D6:62:4A:D5:1F:E7:11:FB:3B:37:4F:4A:D3:32:33:D5:F5:8A:E5:53:73:48:0D:A0:DB:36',
    downloadUrl: 'https://pub-53153ea32fca4383811f43275f914355.r2.dev/fairy-performer-android-1.0.0-1-prod.apk',
  },
  ios: {
    minIOS: '15.0',
    appStoreUrl: null,
  },
  pages: {
    guide: true,
    faq: false,
    updates: false,
  },
};
