import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPage } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { MenuinfodetailsPage } from '../pages/menuinfodetails/menuinfodetails';
import { GooglePlus } from '@ionic-native/google-plus';
import { UserPage } from '../pages/user/user';
import { PreferencePage } from '../pages/preference/preference';
import { NativeStorage} from "@ionic-native/native-storage";
import { FavouritesPage}  from '../pages/favourites/favourites'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: any;
  rootPage: any ;
  userReady: boolean = false;
  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform,public nativeStorage: NativeStorage,public googlePlus: GooglePlus, public statusBar: StatusBar, public splashScreen: SplashScreen)
  {
    platform.ready().then(() => {
      let env = this;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'home' },
      { title: 'Cart', component: CartPage, icon: 'cart' },
      { title: 'Preference', component: PreferencePage, icon: 'list-box'},
      { title: 'Search', component: SearchPage, icon: 'search'},
      { title: 'Profile', component: UserPage, icon: 'contact' },
      { title: 'Favourites', component: FavouritesPage, icon: 'contact' }
    ];


      this.nativeStorage.getItem('user')
        .then( function (data) {
          // user is previously logged and we have his data
          // we will let him access the app
          // this.nav.setRoot(HomePage);
          // this.rootPage = HomePage;
        env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
          env.userReady = true;
          setTimeout(() => {
            env.nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});//->
            this.splashScreen.hide();
          }, 800);
          //->env.nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});




          // setTimeout(() => {
          //   this.splashScreen.hide();
          // }, 800);
        }, function (error) {
          //we don't have the user data so we will ask him to log in
           setTimeout(() => {
            env.nav.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});//->
            this.splashScreen.hide();
          }, 800);
          //->env.nav.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});



          // setTimeout(() => {
          //   this.splashScreen.hide();
          // }, 800);
        });

      this.statusBar.styleDefault();
    });
  }
  // {
  //   this.initializeApp();
  //
  //   // used for an example of ngFor and navigation
  //   this.pages = [
  //     { title: 'Home', component: HomePage }
  //   ];
  //
  // }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let env = this;
      let nav = this.nav;
    this.nativeStorage.remove('user');
    env.nav.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }
}
