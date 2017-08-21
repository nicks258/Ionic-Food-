import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { DetailviewPage } from '../pages/detailview/detailview';
import { DetailmodalPage } from '../pages/detailmodal/detailmodal';
import { PreferencePage } from '../pages/preference/preference';
import { CartPage } from '../pages/cart/cart';
import { FavouritesPage}  from '../pages/favourites/favourites'
// import { LocationTracker } from '../providers/location-tracker';
import { UserPage } from '../pages/user/user';
import { MenuinfodetailsPage } from '../pages/menuinfodetails/menuinfodetails';
import { VersionPage}  from '../pages/version/version';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GooglePlus} from "@ionic-native/google-plus";
//  import { LocationTracker } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    SearchPage,
    DetailviewPage,
    DetailmodalPage,
    PreferencePage,
    CartPage,
    UserPage,
    FavouritesPage,
    MenuinfodetailsPage,
    VersionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    SearchPage,
    DetailviewPage,
    DetailmodalPage,
    PreferencePage,
    CartPage,
    UserPage,
    FavouritesPage,
    MenuinfodetailsPage,
    VersionPage
  ],
  providers: [
    GooglePlus,
    //LocationTracker,
    BackgroundGeolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Facebook,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    //LocationTracker
  ]
})
export class AppModule {}
