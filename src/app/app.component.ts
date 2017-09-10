import { Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPage } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { GooglePlus } from '@ionic-native/google-plus';
import { UserPage } from '../pages/user/user';
import { PreferencePage } from '../pages/preference/preference';
import { NativeStorage} from "@ionic-native/native-storage";
import { FavouritesPage}  from '../pages/favourites/favourites';
import { VersionPage}  from '../pages/version/version';
import { Events } from 'ionic-angular';

//rootscope variables and functions
declare var base_url;
declare var geolocation;
declare var dummy_user;
declare var dummy_lat;
declare var dummy_long;
declare var FB_APP_ID;
declare var dummy_userId;
declare var browser_mode;

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public lng: any;
  lat: any;
  userLocation : any;
  user: any;
  rootPage: any ;
  userReady: boolean = false;
  pages: Array<{title: string, component: any, icon: any}>;
  shared_data : any;
  constructor(public events: Events,public platform: Platform,public nativeStorage: NativeStorage,public googlePlus: GooglePlus, public statusBar: StatusBar, public splashScreen: SplashScreen)
  {

    platform.ready().then(() => {
      let env = this;
       //event for userdetails and location
       events.subscribe('user_info', shared_details => {
        console.log(shared_details);
        this.shared_data = shared_details;
      })

       //event for user created
       events.subscribe('user:created',(time) => {
         env.nativeStorage.getItem('user')
          .then( function (data) {
          env.user = { name: data.name, gender: data.gender, picture: data.picture };
          }, function (error) {
             env.user = dummy_user;
          });
      env.userReady = true;
    });

    

    this.pages = [
      { title: 'Home', component: HomePage, icon:'home' },
      { title: 'Cart', component: CartPage, icon: 'cart' },
      { title: 'Preference', component: PreferencePage, icon: 'list-box'},
      { title: 'Search', component: SearchPage, icon: 'search'},
      { title: 'Profile', component: UserPage, icon: 'contact' },
      { title: 'Favourites', component: FavouritesPage, icon: 'heart' },
      { title: 'Whats new', component: VersionPage, icon: 'list-box' }
    ];


      this.nativeStorage.getItem('user')
        .then( function (data) {
        env.user = { name: data.name, gender: data.gender, picture: data.picture };
            env.userReady = true;
            env.nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300,direction: 'forward'});
            setTimeout(() => {
             env.splashScreen.hide();
          }, 1000);
        }, function (error) {
            env.nav.setRoot(LoginPage, {}, {animate: true, animation:'transition',duration:300,  direction: 'forward'});
            setTimeout(() => {
             env.splashScreen.hide();
          }, 1000);
        });
      this.statusBar.styleDefault();
    });
  }


  openPage(page) {
    this.nav.setRoot(page.component,{data:this.shared_data},{animate:true,animation:'transition',duration:300,direction:'forward'});
  }


  logout() {
    let env = this;
    this.nativeStorage.remove('user');
    this.nativeStorage.remove('USERID');
    env.nav.setRoot(LoginPage, {}, {animate: true, animation:'transition',duration:300,direction: 'forward'});
  }
}
