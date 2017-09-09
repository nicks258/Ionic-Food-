import { Component, NgZone, ViewChild} from '@angular/core';
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
import { FavouritesPage}  from '../pages/favourites/favourites';
import { VersionPage}  from '../pages/version/version';
import { Events } from 'ionic-angular';
//import {BackgroundGeolocation, BackgroundGeolocationConfig,BackgroundGeolocationResponse} from '@ionic-native/background-geolocation';


@Component({
  templateUrl: 'app.html',
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
  shared_data : any;
  //private geolocation: Geolocation,public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation
  constructor(public events: Events,public platform: Platform,public nativeStorage: NativeStorage,public googlePlus: GooglePlus, public statusBar: StatusBar, public splashScreen: SplashScreen)
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

     events.subscribe('user:created',(time) => {
       env.nativeStorage.getItem('user')
        .then( function (data) {
        env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        }, function (error) {
           env.user = {
        name: "Raj kar",
        gender: "male",
        picture: "assets/img/user.png"
      };
        });

    env.userReady = true;
    console.log(env.userReady);
  });

    events.subscribe('user_info', shared_details => {
      console.log(shared_details);
      this.shared_data = shared_details;
    })




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
        env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
            env.userReady = true;
            console.log("userReady->" + env.userReady);
            env.nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300,direction: 'forward'});//->
            env.splashScreen.hide();
        }, function (error) {

          console.log("userReady->" + env.userReady);
          //we don't have the user data so we will ask him to
          //
          // log in
            // env.user = {
            //   name: "Suvojit Kar",
            //   gender: "male",
            //   picture: "assets/img/user.png"
            // };
            // env.userReady = true;
            env.nav.setRoot(LoginPage, {}, {animate: true, animation:'transition',duration:300,  direction: 'forward'});//->
            env.splashScreen.hide();
        });

      this.statusBar.styleDefault();
    });
  }


  openPage(page) {

    this.nav.setRoot(page.component,{data:this.shared_data},{animate:true,animation:'transition',duration:300,direction:'forward'});
  }
  logout() {
    let env = this;
    let nav = this.nav;
    this.nativeStorage.remove('user');
    env.nav.setRoot(LoginPage, {}, {animate: true, animation:'transition',duration:300,direction: 'forward'});
  }
}
