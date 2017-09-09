import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { App, AlertController  } from 'ionic-angular';
import { Http } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { Events } from 'ionic-angular';


//rootscope variables and functions
declare function do_get();
declare function do_post();
declare function get_userdetails();
declare var base_url;
declare var geolocation;
declare var dummy_user;
declare var dummy_lat;
declare var dummy_long;
declare var FB_APP_ID;







@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})




export class LoginPage {
  rootPage: any ;
  user: any;
  userReady: boolean = false;

  constructor(public app: App,public http: Http,private alertCtrl: AlertController,public navCtrl: NavController,public fb: Facebook,public loadingCtrl: LoadingController, public nativeStorage: NativeStorage, public navParams: NavParams,
              public googlePlus: GooglePlus, public events: Events ) {

    this.fb.browserInit(FB_APP_ID, "v2.8");
  }



  doFbLogin(){
    let loading = this.loadingCtrl.create({
      content: 'Logging In...',
      spinner: 'circles'
    });
    loading.present();
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];
    this.fb.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array<string>();
        //Getting name and gender properties
        env.fb.api("/me?fields=name,email,gender", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            env.nativeStorage.setItem('user',
              {
                name: user.name,
                email: user.email,
                gender: user.gender,
                picture: user.picture

              }
            )
              .then(function(){
                env.userReady = true;
                env.events.publish('user:created',Date.now());
                env.getUserId(user);  //get UserId
                nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
                setTimeout(() => {
                loading.dismiss();
                }, 1000);
              }, function (error) {
                console.log("Use real mobile device to get facebook details");
                env.getUserId(user);  //get UserId
                //nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
                env.alert();
                setTimeout(() => {
                loading.dismiss();
                }, 1000);
              })
          })
      }, function(error){
        setTimeout(() => {
                console.log("Error");
                loading.dismiss();
                env.alert();
                //nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
                console.log(error);
                }, 1000);
      });

  }

   getUserId(user: any) {
    this.http.get('http://54.172.94.76:9000/api/v1/customers/'+user.email)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(JSON.stringify(data.data.id));
          this.nativeStorage.setItem('USERID',
            {
              customerId: data.data.id
            }
          )
          setTimeout(() => {
          }, 1000);
        },
        err => {
           console.error(err)
         });
  }


   alert(){
      let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Error in Login',
      buttons: ['OK']
    });
    alert.present();
   }

  doGoogleLogin(){
    let env = this;
    let email1 : any;
    let name1 : any;
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Logging In...',
      spinner: 'circles'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '866244958570-8ulsqnmcjb78pd8jmekm6vrj1ogd3hj3.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then(function (user) {
        env.nativeStorage.setItem('user', {
          name: user.displayName,
          name1: user.displayName,
          email1: user.email,
          email: user.email,
          picture: user.imageUrl
        })
          .then(function(){
            env.userReady = true;
            env.events.publish('user:created',Date.now());
            nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
            setTimeout(() => {
             loading.dismiss();
          }, 1000);
          }, function (error) {
            loading.dismiss();
             setTimeout(() => {
              env.alert();
              //nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
              console.log(error);
             }, 1000);
          })
      }, function (error) {
         loading.dismiss();
        setTimeout(() => {
            //env.alert();
            env.events.publish('user:created',Date.now());
            nav.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
            console.log(error);
         }, 1000);

      });
  }


}

