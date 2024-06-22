# RN-TEMPLATE-NE-PERSONAL
### Build APK
```bash
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ cd android
$ ./gradlew assembleDebug # or ./gradlew assembleRelease
```
Find the APK at `android/app/build/outputs/apk/debug/app-debug.apk` or `android/app/build/outputs/apk/release/app-release.apk` depending on the last command you ran.

### Generate Splash Screen Assets
```bash
$ pnpm react-native generate-bootsplash <relative-path-to-logo> \
   --platforms=android,ios \
   --background=074C4E \
   --logo-width=105
```