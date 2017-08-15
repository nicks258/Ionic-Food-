import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailviewPage } from '../detailview/detailview';
import { CartPage } from '../cart/cart';
import { PreferencePage} from '../preference/preference'
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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
  nav1 :any;
  loc : any;
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker,public nativeStorage: NativeStorage,private geolocation: Geolocation, public loadingCtrl: LoadingController,public http: Http) {
    //get user details
    let env = this;
    this.env1 = env;
    // console.log(myApp.lat + " ");
    this.nativeStorage.getItem('user')
      .then( (data)=>{
        env.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture,
          email: data.email
        };
        console.log(env.user);
        env.getPreferences();
        env.userReady = true;

        // Hardcoaded LAT & LONG
        env.mylatitude = 37.40879;
        env.mylongitude = -121.98857;
        env.Fetchdashboard(env.data_start, env.data_limit);
      }, function(error){
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        env.user = {
          name: "suvojit",
          gender: "male",
          picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycewbr9Y9lN7Qn1Yl5e9CHBbleZpUMjqD23wcfOp5FKbhNMeUSg",
          email: "suvojitraj.kar15@facebook.com"
        };
        console.log(env.user);
        env.getPreferences();
        env.userReady = true;
        // env.mylatitude = 37.40879;
        // env.mylongitude = -121.98857;
        env.Fetchdashboard(env.data_start, env.data_limit);
      });
    // this.nativeStorage.getItem('USERID')
    //   .then(function (data){
    //     this.id = data.customerId;
    //
    //     console.log("okay"+ env.id);
    //     // enc.userId = {
    //     // };
    //
    //   }, function(error){
    //     console.log("Use real mobile app for getting exact data");
    //     //dummy variables for browser use
    //   });
  }

  //get user preferences
  getPreferences(){
    this.http.get('http://54.172.94.76:9000/api/v1/customers/preferences/' + this.user.email)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("ok - user is already registered")
        },
        err => {
          console.error(err)
          console.log("ok - user is not yet registered")
          this.registerUser();
        }
      );
  }

  //get direction
  direct(x,y){
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    console.log(x+","+y);
    window.location.href = this.url;
  }

  //move from homepage to searchpage
  goto_searchpage(limit){
    this.navCtrl.push(SearchPage);
  }

  //move from homepage to cartpage
  goto_cartpage(){
     this.navCtrl.setRoot(CartPage, {}, {animate:true,direction:'forward'});
  }

  //move from homepage to detailpage
  goto_detailview(data){
    this.data_stringify = JSON.stringify(data);
    this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify, latitude : this.mylatitude , longitude : this.mylongitude});
  }

  //pagination
  loadmore(){
    this.data_limit += 6;
    this.data_start +=0;
    this.Fetchdashboard(this.data_start, this.data_limit);
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

    //Code for Geo Location
    this.nativeStorage.getItem('location')
      .then( (data)=>{
        // this.mylatitude = data.lat;
        // this.mylongitude = data.lng;
        console.log("loca->" + this.mylatitude + " " + this.mylongitude);
      }, function(error){
        console.log("Use real");
        //dummy variables for browser use
      });
    this.nativeStorage.getItem('USERID')
      .then( (data)=>{
        this.id = data.customerId;

        // console.log("okay"+ env.id);
        // enc.userId = {
        // };


    let url = 'http://54.172.94.76:9000/api/v1/customers/'+data.customerId+'/dashboard?email='+this.user.email+'&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end;
    console.log("URL -> " + url);
    this.http.get('http://54.172.94.76:9000/api/v1/customers/'+data.customerId+'/dashboard?email='+this.user.email+'&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("Okay Sumit" + 'http://54.172.94.76:9000/api/v1/customers/'+data.customerId+'/dashboard?email='+this.user.email+'&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
          this.dashboardlist = data.data;
          console.log(this.dashboardlist);
          this.nextlength = data.data.length;
          loadingPopup.dismiss();
         }, 1000);
        },
        err => console.error(err)
      );
      }, function(error){
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
      });
  }

  //register user after 1st time installation
  registerUser(){
    console.log("registering  user");
    let link = 'http://54.172.94.76:9000/api/v1/customers';
    console.log("email"+this.env1.user.email + "name" + this.env1.user.name);
    let usrdetails = {"firstName":this.env1.user.name,"email":this.env1.user.email};
    console.log(usrdetails);
    this.http.post(link, usrdetails)
      .subscribe(data => {
        console.log("User registration successfull.");
        this.navCtrl.setRoot(PreferencePage, {}, {animate:true,direction:'forward'});
      }, error => {
        console.log("Oooops! Error in registration");
      });
  }

}
