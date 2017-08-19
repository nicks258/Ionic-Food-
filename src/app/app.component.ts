import {Component, NgZone, ViewChild} from '@angular/core';
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
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { FavouritesPage}  from '../pages/favourites/favourites'
//import {BackgroundGeolocation, BackgroundGeolocationConfig,BackgroundGeolocationResponse} from '@ionic-native/background-geolocation';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public lng: any;
  public lat: any;
  public userLocation : any;
  @ViewChild(Nav) nav: Nav;
  user: any;
  rootPage: any ;
  userReady: boolean = false;
  pages: Array<{title: string, component: any, icon: any}>;
  public watch: any;
  //private geolocation: Geolocation,public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation
  constructor(public platform: Platform,public nativeStorage: NativeStorage,public googlePlus: GooglePlus, public statusBar: StatusBar, public splashScreen: SplashScreen)
  {
    platform.ready().then(() => {
      let env = this;
      // const config: BackgroundGeolocationConfig = {
      //   desiredAccuracy: 10,
      //   stationaryRadius: 20,
      //   distanceFilter: 30,
      //   debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      //   stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      // };

      // this.backgroundGeolocation.configure(config)
      //   .subscribe((location: BackgroundGeolocationResponse) => {

      //     console.log(location);
      //     this.backgroundGeolocation.finish(); 

      //   });

      // this.watch = this.geolocation.watchPosition(config).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      //   console.log(position);

      //   // Run update inside of Angular's zone
      //   this.zone.run(() => {
      //     env.lat = position.coords.latitude;
      //     env.lng = position.coords.longitude;
      //     env.nativeStorage.setItem('location',
      //       {
      //         lat: env.lat,
      //         lng: env.lng

      //       }

      //     )
      //   });
      //   console.log("oo"+ env.lat);
      // });


// start recording location
      // this.backgroundGeolocation.start();
      // console.log("fuck" + this.backgroundGeolocation.getLocations());

      // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'home' },
      { title: 'Cart', component: CartPage, icon: 'cart' },
      { title: 'Preference', component: PreferencePage, icon: 'list-box'},
      { title: 'Search', component: SearchPage, icon: 'search'},
      { title: 'Profile', component: UserPage, icon: 'contact' },
      { title: 'Favourites', component: FavouritesPage, icon: 'contact' }
    ];

      console.log("opps "+env.lat + env.lng);
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
