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
  user_details: any;
  user_id : any;
  shared_details : any
  nodata : boolean = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public nativeStorage: NativeStorage,private geolocation: Geolocation, public loadingCtrl: LoadingController,public http: Http, public events: Events) {
      
      //user_details
      //this.user_details = this.get_user_details();
      this.get_user_details();
      //this.user_id = this.get_userid();
      this.get_userid();
      this.userReady = true;


      //location
      this.userLocation();

     
  } 
   

   //get user location
   userLocation()
        {    
              let loadingPopup = this.loadingCtrl.create({
              content: "Fetching Location...",
              spinner: 'circles'
              });
              loadingPopup.present(); 

             let env = this;

             if (geolocation == true){
                 this.geolocation.getCurrentPosition().then((resp) => {
                         env.mylatitude = resp.coords.latitude;
                         env.mylongitude = resp.coords.longitude;
                         console.log(resp.coords.latitude + " " + resp.coords.longitude);
                         setTimeout(() => {
                         loadingPopup.dismiss();
                         }, 1000);
                         this.dashboarddetails(env.mylatitude,env.mylongitude);
                        }).catch((error) => {
                          console.log('Error getting location', error);
                          env.mylatitude = dummy_lat;
                          env.mylongitude = dummy_long;
                          setTimeout(() => {
                         loadingPopup.dismiss();
                         }, 1000);
                          this.dashboarddetails(env.mylatitude,env.mylongitude);
                        });
              }
              else{
                 env.mylatitude = dummy_lat;
                 env.mylongitude = dummy_long;
                 setTimeout(() => {
                 loadingPopup.dismiss();
                  }, 1000);
                 this.dashboarddetails(env.mylatitude,env.mylongitude);
              }
        }

    //user details and preference
    dashboarddetails(lat,long){ 
         this.mylatitude = lat;
         this.mylongitude = long;
         console.log(this.mylatitude + " " +  this.mylongitude);
         if (this.user_details.gender == undefined)
             this.user_details.gender = "-";
         this.shared_details = {"username": this.user_details.name ,"useremail" : this.user_details.email, "usergender" : this.user_details.gender, "userpicture" : this.user_details.picture, "userlatitude": this.mylatitude, "userlongitude" : this.mylongitude, "userid" : this.user_id.customerId};
         console.log(JSON.stringify(this.shared_details));
         this.events.publish("user_info" , this.shared_details);
         this.getPreferences();    //from preference fetch dashboard
  }



    //get user details
    get_user_details(){ 
        console.log("Getting user details");
        this.nativeStorage.getItem('user').then(
               userdata => {
                   if (userdata.name == undefined && userdata.gender == undefined && userdata.picture == undefined && userdata.email == undefined)
                        this.userdetails = dummy_user;
                   else 
                        this.userdetails = { name: userdata.name, gender: userdata.gender, picture: userdata.picture, email: userdata.email };
               },
               error => {
                console.log("Dummy data");
                this.userdetails = { name: userdata.name, gender: userdata.gender, picture: userdata.picture, email: userdata.email };
              }
        );
      }


    //get userid
    get_userid(){
       console.log("Getting UserID");
        this.nativeStorage.getItem('USERID').then(
          userID_storage => {
              if (userID_storage.customerId == undefined)
                  this.userID = dummy_userId;
              else 
                  this.userID = userID_storage.customerId;
          },
          error => {
              console.log("Dummy data");
              this.userID = dummy_userId;
          })
    }



   //get user preferences
    getPreferences(){
        let env = this;
        this.http.get(base_url+'api/v1/customers/preferences/' + this.shared_details.useremail)
          .map(res => res.json())
          .subscribe(
            data => {
              console.log("user is already registered")
              env.Fetchdashboard(env.data_start, env.data_limit);
            },
            err => {
              console.error(err);
              console.log("user is not yet registered"); 
              this.registerUser();    // register user to get preference
            }
          );
  }


  //register user after first time app installation. This will be helpful for fetching preferences
  registerUser(){
    console.log("registering  user");
    let link = 'http://54.172.94.76:9000/api/v1/customers';
    let usrdetails = {"firstName":this.shared_details.username,"email":this.shared_details.useremail};
    this.http.post(link, usrdetails)
      .subscribe(data => {
        console.log("User registration successfull.");
        this.navCtrl.setRoot(PreferencePage, {}, {animate:true,animation:'transition',duration:300,direction:'forward'});
      }, error => {
        console.log("Oooops! Error in registration");
      });
  }

  //fetch dashboard elements - 6 at a time
  Fetchdashboard(start, end){
    let loadingPopup = this.loadingCtrl.create({
              content: "Loading Restaurants...",
              spinner: 'circles'
              });
              loadingPopup.present(); 

    console.log("Fetching Dashboard");
    this.http.get('http://54.172.94.76:9000/api/v1/customers/'+this.shared_details.userid+'/dashboard?email='+this.shared_details.useremail+'&lat='+this.shared_details.userlatitude+'&lng='+this.shared_details.userlongitude+'&pn='+start+'&ps='+end)
       .map(res => res.json())
      .subscribe(
        data => {
          console.log('url :' + 'http://54.172.94.76:9000/api/v1/customers/'+this.shared_details.userid+'/dashboard?email='+this.shared_details.useremail+'&lat='+this.shared_details.userlatitude+'&lng='+this.shared_details.userlongitude+'&pn='+start+'&ps='+end);
          this.dashboardlist = data.data;
          if(start == 1 && this.dashboardlist.length == 0){
               //this.presentalert(this.shared_details.userlatitude, this.shared_details.userlongitude);
               this.nodata = true;
             }
          this.nextlength = data.data.length;
          loadingPopup.dismiss();
        },
        err => console.error(err)
      );
}

 retry(){
   this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
 }
 presentalert(lat, long) {
   let alert = this.alertCtrl.create({
      title: 'Restaurant Details',
      subTitle: "Sorry, but we could not find any restaurant at your location : latitude => "+lat+" and longitude => "+long,
      buttons: [{
              text    : 'Retry',
              handler : () => {
                console.log("retry");
                this.navCtrl.setRoot(HomePage, {}, {animate: true, animation:'transition',duration:300, direction: 'forward'});
              }
            }]
    });
    alert.present();
}

  //get direction
  direct(x,y){
    this.url = "http://maps.google.com/maps/?q="+x+"," + y+"&t=h&iwloc=A&hl=en";
    console.log(x+","+y);
    window.location.href = this.url;
  }

  //move from homepage to searchpage
  goto_searchpage(limit){
    this.navCtrl.setRoot(SearchPage , {data: this.shared_details}, {animate:true,animation:'transition',duration:300,direction:'forward'});
  }

  //move from homepage to cartpage
  goto_cartpage(){
     this.navCtrl.setRoot(CartPage, {}, {animate:true,animation:'transition',duration:300,direction:'forward'});
  }

  //move from homepage to detailpage
  goto_detailview(data){
    this.data_stringify = JSON.stringify(data);
    this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify, data:this.shared_details}, {animate:true,animation:'transition',duration:300,direction:'forward'});
  }

  //pagination
  loadmore(){
    this.data_limit += 6;
    this.data_start +=0;
    this.Fetchdashboard(this.data_start, this.data_limit);
  }





}
