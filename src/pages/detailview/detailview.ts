import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DetailmodalPage } from '../detailmodal/detailmodal';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import { Navbar } from 'ionic-angular';


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
  selector: 'page-detailview',
  templateUrl: 'detailview.html',
})

export class DetailviewPage {
  @ViewChild(Navbar) navBar: Navbar;


  menu: any;
  public sdata : any;
        name : any;
        cost : any;
        dirurl : any;
        lat : any;
        long : any;
        rname : any;
        mylatitude : any;
        review : any;
        current_detail : any;
        menuItemsLength : any;
        mylongitude : any;
        itemId : any;
        restaurantInfo : any;
        menuItems       : any;
        menuDetailsToSend : any;
        menuDetailsToSendLength : any;
        nextlength :  any;
        info : any;
        url :any;
        favourite:boolean = false;
        favourities : any;
        data: Array<{title: string, details: string, icon: string, bgcolor: string, showDetails: boolean, value: number}> = [];
        userid : any;
        params : any;

  constructor(public navCtrl: NavController,public nativeStorage: NativeStorage, public alertCtrl: AlertController,public platform: Platform, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public geolocation: Geolocation,public http: Http) {
      this.sdata = navParams.get('data_search');
      this.sdata = JSON.parse(this.sdata);
      this.name = this.sdata.item.name;
      this.rname = this.sdata.restaurant.name;
      this.lat = this.sdata.lat_long[1];
      this.long = this.sdata.lat_long[0];
      this.itemId = this.sdata.item.id;
      this.mylatitude = navParams.get('data').userlatitude;
      this.mylongitude = navParams.get('data').userlongitude;
      this.userid = navParams.get('data').userid;
      this.params = navParams.get('data');

      //customization for 4 tabs/option menu
      this.data.push({
          title: 'Meal details and info',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#FEFA96',
          showDetails: false,
          value: 1
        },{
          title: 'Review',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#D7FC92',
          showDetails: false,
          value: 2
        },{
          title: 'Restaurant and menu',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#A4FE94',
          showDetails: false,
          value: 3
        },{
          title: 'Best Match',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#71FEB9',
          showDetails: false,
          value: 4
        });

      let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Details...',
      spinner: 'circles'
    });
    loadingPopup.present();
      this.getFavourites();
    setTimeout(() => {
    loadingPopup.dismiss();
  }, 1200);

  }


  //favourites
  getFavourites()
  {
    this.http.get('http://54.172.94.76:9000/api/v1/customers/'+ this.userid +'/favourites')
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            this.favourities = data.data;
            for(let i=0;i< this.favourities.length;i++)
            {
               if (this.favourities[i].item.name == this.name)
                   this.favourite = true;
            }
          }, 1000);
        },
        err => console.error(err)
      );
  }


  //detailmodal value
  goto_detailmodal(value){
      if (value == 3)
      {
         this.restaurantandinfo(value, "Restaurant & Menu");
      }
      else if (value == 1){
         this.mealdetail(value, "Meal Details");
      }
      else if (value ==2)
      {
        this.getReview(value, "Reviews");
      }
      else
      {
          this.navCtrl.push(DetailmodalPage, {value: value, details : this.sdata, current_detail : "ok", data : this.params},{animate:true,animation:'transition',duration:300,direction:'forward'});
      }
  }

  ionViewDidLoad() {
     this.setBackButtonAction()
  }

//back button action
setBackButtonAction(){
       this.navBar.backButtonClick = () => {
          this.navCtrl.pop({animate:true,animation:'transition',duration:300,direction:'back'});
       }
    }

//already
alreadyaddfav(){
     let alert = this.alertCtrl.create({
      title: 'Favourites!',
      subTitle: 'Item is already added to your favourite',
      buttons: ['OK']
    });
    alert.present();
}


//add to favourite
addfav(){
  let loadingPopup = this.loadingCtrl.create({
      content: 'Aadding to Favourites...',
      spinner: 'circles'
    });
    loadingPopup.present();

    console.log("Adding to fav");
      let link =  base_url +'api/v1/customers/'+ this.userid +'/favourites/menus/' + this.itemId;
      let data1 = {};
      this.http.post(link, data1)
        .subscribe(data => {
          loadingPopup.dismiss();
          this.confirm();
        }, error => {
          loadingPopup.dismiss();
          console.log("Oooops!");
        });

    }



  //Add to Cart
  addCart(){
    let enc = this;

    let loadingPopup = this.loadingCtrl.create({
      content: 'Adding to your cart...',
      spinner: 'circles'
    });
    loadingPopup.present();
    console.log("Aadding to fav");
    loadingPopup.dismiss();

    enc.nativeStorage.getItem('USERID')
      .then( (data)=> {
        let link = base_url +'api/v1/customers/'+data.customerId+'/cart/menus/' + enc.itemId;
        let data1 = {};
        console.log("post data : " + JSON.stringify(data1));
        console.log("post url : " + link);
        enc.http.post(link, data1)
          .subscribe(data => {
            console.log("Ok" + data1);
            enc.confirm();
          }, error => {
            console.log("Oooops!");
          });
      }, function(error) {
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        let link = 'http://54.172.94.76:9000/api/v1/customers/'+15+'/cart/menus/' + enc.itemId;
        let data1 = {};
        console.log("post data : " + JSON.stringify(data1));
        console.log("post url : " + link);
        enc.http.post(link, data1)
          .subscribe(data => {
            console.log("Ok" + data1);
            enc.confirm();
          }, error => {
            console.log("Oooops!");
          });
      });
  }

//share function
presentActionSheet(message) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Whatsapp',
          icon: !this.platform.is('ios') ? 'logo-whatsapp' : null,
          handler: () => {
            console.log(message);
            window.location.href="whatsapp://send?text=Restaurant : " + message;
            console.log('Whatsapp clicked');
          }
        },
        {
          text: 'Messenger',
          icon: !this.platform.is('ios') ? 'logo-facebook' : null,
          handler: () => {
            window.location.href="fb-messenger://share/?link=Restaurant : " + message;
            console.log('Facebook clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

    // location
    direct(x,y){
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    console.log(x+","+y);
    window.location.href = this.url;
  }

// restaurant info tab
restaurantandinfo(value, category){
   let loadingPopup = this.loadingCtrl.create({
      content: 'Loading '+category+'...',
      spinner: 'circles'
    });
    loadingPopup.present();
       let id = this.sdata.item.restaurant_id;
       this.http.get('http://54.172.94.76:9000/api/v1/restaurants/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            this.info = data.data;
            this.restaurantInfo = data.data.restaurant;
            this.menu =  data.data.menu;
            this.nextlength = data.data.restaurant.length;
            this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : this.info,
            data : this.params
            },{animate:true,animation:'transition',duration:300,direction:'forward'});

            loadingPopup.dismiss();
          }, 1000);
        },
        err => console.error(err)
      );
}

//review function
  getReview(value, category){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading '+category+'...',
      spinner: 'circles'
    });
    loadingPopup.present();
    let id = this.sdata.item.restaurant_id;
    this.http.get('http://54.172.94.76:9000/api/v1/restaurant_reviews/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            this.review = data.data;
            this.navCtrl.push(DetailmodalPage, {
              value: value,
              details : this.sdata,
              current_detail : this.review,
              data : this.params
            },{animate:true,animation:'transition',duration:300,direction:'forward'});
            loadingPopup.dismiss();
          }, 1000);
        },
        err => console.error(err)
      );
  }

//meal detail function
mealdetail(value, category){
   let loadingPopup = this.loadingCtrl.create({
      content: 'Loading '+category+'...',
      spinner: 'circles'
    });
    loadingPopup.present();
       let id = this.sdata.item.restaurant_id;
       this.http.get('http://54.172.94.76:9000/api/v1/restaurants/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
            this.info = this.sdata;
            this.restaurantInfo = data.data.restaurant;
            this.menu =  data.data.menu;
            this.nextlength = data.data.restaurant.length;
            this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : this.sdata.item,
            data : this.params
            },{animate:true,animation:'transition',duration:300,direction:'forward'});
            loadingPopup.dismiss();
        },
        err => console.error(err)
      );

   }


confirm(){
   let alert = this.alertCtrl.create({
      title: 'Favourites!',
      subTitle: 'Item is added to your favourites',
      buttons: ['OK']
    });
    alert.present();
}


}
