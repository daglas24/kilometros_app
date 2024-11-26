import type { CapacitorConfig } from '@capacitor/cli';
import { CapacitorSQLite } from '@capacitor-community/sqlite';


const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "Kilometros",
  webDir: "www",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleMaps: {
      androidApiKey: "AIzaSyD2oi1kGOVTlBuWkiU6C_Mw_8vlFa02Jc8",
    },
    CapacitorSQLite: {
      iosDatabaseLocation: "Documents",
      androidDatabaseLocation: "default",
    },
  },
};

export default config;
