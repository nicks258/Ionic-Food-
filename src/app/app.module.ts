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
import { UserPage } from '../pages/user/user';
import { MenuinfodetailsPage } from '../pages/menuinfodetails/menuinfodetails';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {GooglePlus} from "@ionic-native/google-plus";


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
    MenuinfodetailsPage
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
    MenuinfodetailsPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    Geolocation,
    Facebook,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
