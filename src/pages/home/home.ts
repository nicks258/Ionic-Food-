import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailviewPage } from '../detailview/detailview';
import { CartPage } from '../cart/cart';
import { PreferencePage} from '../preference/preference'
import { LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/timeout';



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
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  //variables
  public dashboardlist : any;
  nextlength : any;
  user: any;
  userId: any;
  id: any;
  userReady: boolean = false;
  data_stringify : any;
  data_limit : number = 6;
  data_start : number = 1;
  url : any;
  mylatitude : any;
  mylongitude : any;
  env1 : any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public nativeStorage: NativeStorage,private geolocation: Geolocation, public loadingCtrl: LoadingController,public http: Http) {

    //rootscope variables console
    console.log(base_url);
    console.log(do_get());
    console.log(do_post());


    //get user details from localstorage
    this.userReady = true;
    let loadingPopup = this.loadingCtrl.create({
      content: 'Checking preferences...',
      spinner: 'circles'
    });
    loadingPopup.present();

    let env = this;
    this.env1 = env;
    this.nativeStorage.getItem('user')
      .then( (data)=>{
        // env.user = get_userdetails();          //user details
        env.user = { name: data.name, gender: data.gender, picture: data.picture, email: data.email };
        console.log(env.user);
        env.getPreferences();
      }, function(error){
        console.log("Use real mobile app for getting exact data");
        env.user = dummy_user;                 //dummy data for browser use
        console.log(env.user);
        env.getPreferences();
      });
       setTimeout(() => {
      loadingPopup.dismiss();
    },1100)
  }


  //get user preferences
  getPreferences(){
    let env = this;
    this.http.get(base_url+'api/v1/customers/preferences/' + this.user.email)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("ok - user is already registered")
          if (geolocation != true){                        //hardcode
              env.mylatitude = dummy_lat;
              env.mylongitude = dummy_long;
              env.Fetchdashboard(env.data_start, env.data_limit);
          }
         else{                                             //detect location
                this.geolocation.getCurrentPosition().then((resp) => {
                 console.log("ok");
                 env.mylatitude = resp.coords.latitude;
                 env.mylongitude = resp.coords.longitude;
                 console.log("lat"+env.mylatitude);
                 console.log("long"+env.mylongitude);
                 env.Fetchdashboard(env.data_start, env.data_limit);
                }).catch((error) => {
                  console.log('Error getting location', error);
                  env.mylatitude = dummy_lat;
                  env.mylongitude = dummy_long;
                  env.Fetchdashboard(env.data_start, env.data_limit);
                });
           }
        },
        err => {
          console.error(err)
          console.log("ok - user is not yet registered")
          this.registerUser();
        }
      );
  }


  //register user after 1st time installation
  registerUser(){
    let env = this;
    console.log("registering  user");
    let link = 'http://54.172.94.76:9000/api/v1/customers';
    let usrdetails = {"firstName":this.env1.user.name,"email":this.env1.user.email};
    console.log(usrdetails);
    this.http.post(link, usrdetails)
      .subscribe(data => {
        console.log("User registration successfull.");


         if (geolocation != true){               //hardcode
              env.mylatitude = dummy_lat;
              env.mylongitude = dummy_long;
              env.Fetchdashboard(env.data_start, env.data_limit);
         }
         else{                                  // detect location
             env.geolocation.getCurrentPosition().then((resp) => {
             console.log("ok");
             env.mylatitude = resp.coords.latitude;
             env.mylongitude = resp.coords.longitude;
             console.log("lat"+env.mylatitude);
             console.log("long"+env.mylongitude);
             env.Fetchdashboard(env.data_start, env.data_limit);
            }).catch((error) => {
              console.log('Error getting location', error);
              env.mylatitude = dummy_lat;
              env.mylongitude = dummy_long;
              env.Fetchdashboard(env.data_start, env.data_limit);
            });
         }
        this.navCtrl.setRoot(PreferencePage, {}, {animate:true,animation:'transition',duration:300,direction:'forward'});
      }, error => {
        console.log("Oooops! Error in registration");
      });
  }

    //fetch dashboard elements - 6 at a time
  Fetchdashboard(start, end){
    let enc = this;
    console.log(this.user.email);
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Restaurants...',
      spinner: 'circles'
    });
    loadingPopup.present();
    console.log("Fetching dashboard");

    this.nativeStorage.getItem('USERID')
      .then( (data)=>{
        enc.http.get('http://54.172.94.76:9000/api/v1/customers/'+data.customerId+'/dashboard?email='+enc.user.email+'&lat='+enc.mylatitude+'&lng='+enc.mylongitude+'&pn='+start+'&ps='+end)
       .map(res => res.json())
      .subscribe(
        data => {
          console.log('url :' + 'http://54.172.94.76:9000/api/v1/customers/'+data.customerId+'/dashboard?email='+this.user.email+'&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
          enc.dashboardlist = data.data;
          if(start == 1 && enc.dashboardlist.length == 0)
               enc.presentalert(enc.mylatitude, enc.mylongitude);
          enc.nextlength = data.data.length;
          loadingPopup.dismiss();
         }, 1000);
        },
        err => console.error(err)
      );
      }, function(error){
        console.log("Use real mobile app for getting exact data");
        //dummy data
        enc.id = 15;
        enc.http.get('http://54.172.94.76:9000/api/v1/customers/'+enc.id+'/dashboard?email='+enc.user.email+'&lat='+enc.mylatitude+'&lng='+enc.mylongitude+'&pn='+start+'&ps='+end)
       .map(res => res.json())
      .subscribe(
        data => {
          console.log('url :' + 'http://54.172.94.76:9000/api/v1/customers/'+enc.id+'/dashboard?email='+enc.user.email+'&lat='+enc.mylatitude+'&lng='+enc.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
          enc.dashboardlist = data.data;
          if(start == 1 && enc.dashboardlist.length == 0)
               enc.presentalert(enc.mylatitude, enc.mylongitude);
          enc.nextlength = data.data.length;
          loadingPopup.dismiss();
         }, 1000);
        },
        err => console.error(err)
      );
      });

  }

 presentalert(lat, long) {
   let alert = this.alertCtrl.create({
      title: 'Restaurants',
      subTitle: "No Restaurants Found at : lat="+lat+"long"+long,
      buttons: ['OK']
    });
    alert.present();
}

  //get direction
  direct(x,y){
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    console.log(x+","+y);
    window.location.href = this.url;
  }

  //move from homepage to searchpage
  goto_searchpage(limit){
    this.navCtrl.setRoot(SearchPage , {}, {animate:true,animation:'transition',duration:300,direction:'forward'});
  }

  //move from homepage to cartpage
  goto_cartpage(){
     this.navCtrl.setRoot(CartPage, {}, {animate:true,animation:'transition',duration:300,direction:'forward'});
  }

  //move from homepage to detailpage
  goto_detailview(data){
    this.data_stringify = JSON.stringify(data);
    this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify, latitude : this.mylatitude , longitude : this.mylongitude}, {animate:true,animation:'transition',duration:300,direction:'forward'});
  }

  //pagination
  loadmore(){
    this.data_limit += 6;
    this.data_start +=0;
    this.Fetchdashboard(this.data_start, this.data_limit);
  }





}
