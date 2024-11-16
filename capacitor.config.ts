import type { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: "com.example.app",
  appName: "Kilometros",
  webDir: "www",
  server: {
    androidScheme: "https"
  },
  plugins: {
    GoogleMaps: {
      androidApiKey: "AIzaSyD2oi1kGOVTlBuWkiU6C_Mw_8vlFa02Jc8",
    }
  }
};

export default config;
