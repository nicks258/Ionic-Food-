import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DetailmodalPage } from '../detailmodal/detailmodal';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {NativeStorage} from "@ionic-native/native-storage";
@IonicPage()
@Component({
  selector: 'page-detailview',
  templateUrl: 'detailview.html',
})



export class DetailviewPage {
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
  data: Array<{title: string, details: string, icon: string, bgcolor: string, showDetails: boolean, value: number}> = [];
  constructor(public navCtrl: NavController,public nativeStorage: NativeStorage, public platform: Platform, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public geolocation: Geolocation,public http: Http) {
      this.sdata = navParams.get('data_search');
      console.log(this.sdata);
      this.sdata = JSON.parse(this.sdata);
      this.name = this.sdata.item.name;
      this.rname = this.sdata.restaurant.name;
      this.cost = this.sdata.choices[0].min_price;
      this.lat = this.sdata.lat_long[1];
      this.long = this.sdata.lat_long[0];
      this.itemId = this.sdata.item.id;
      this.mylatitude = navParams.get('latitude');
      this.mylongitude = navParams.get('longitude');

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
          this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : "ok"
            });
      }
      console.log(value);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailviewPage');
  }

//add to favourite
addfav(){
    console.log("Hello Fav");
  this.nativeStorage.getItem('USERID')
    .then( (data)=> {
      let link = 'http://54.172.94.76:9000/api/v1/customers/'+data.customerId+'/favourites/menus/' + this.itemId;
      let data1 = {};
      console.log("post data : " + JSON.stringify(data1));
      console.log("post url : " + link);
      this.http.post(link, data1)
        .subscribe(data => {
          console.log("Ok" + data1);
        }, error => {
          console.log("Oooops!");
        });
    }, function(error) {
      console.log("Use real mobile app for getting exact data");
      //dummy variables for browser use
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
       console.log(id);
       this.http.get('http://54.172.94.76:9000/api/v1/restaurants/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            this.info = data.data;
            this.restaurantInfo = data.data.restaurant;
            this.menu =  data.data.menu;
            this.nextlength = data.data.restaurant.length;
            console.log(this.info);
            this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : this.info
            });

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
    console.log(id);
    this.http.get('http://54.172.94.76:9000/api/v1/restaurant_reviews/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            this.review = data.data;
            console.log(this.review);
            this.navCtrl.push(DetailmodalPage, {
              value: value,
              details : this.sdata,
              current_detail : this.review
            });
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
            console.log(this.restaurantInfo);
            this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : this.sdata.item
            });
            loadingPopup.dismiss();
        },
        err => console.error(err)
      );

   }
}