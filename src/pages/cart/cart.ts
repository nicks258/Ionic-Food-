import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Http} from "@angular/http";
import {NativeStorage} from "@ionic-native/native-storage";

declare var base_url;
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cart: any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,public nativeStorage: NativeStorage) {
    this.getCart();
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  getCart()
  {
    let enc = this;
    this.nativeStorage.getItem('USERID')
      .then( (data)=>{
       let link : any;
       link=  base_url+ 'api/v1/customers/'+data.customerId +'/cart';
        console.log("Get Cart Link"+link);
        enc.http.get( base_url+ 'api/v1/customers/'+data.customerId +'/cart')
          .map(res => res.json())
          .subscribe(
            data => {
              setTimeout(() => {
                enc.cart = data.data;
                console.log(JSON.stringify(enc.cart));
              }, 1000);
            },
            err => console.error(err)
          );
      }, function(error){
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        console.log(base_url+ 'api/v1/customers/'+15+'/cart')
        enc.http.get(base_url+ 'api/v1/customers/'+15+'/cart')
          .map(res => res.json())
          .subscribe(
            data => {
              setTimeout(() => {
                enc.cart = data.data;
                console.log(JSON.stringify(enc.cart));
              }, 1000);
            },
            err => console.error(err)
          );
      });

  }
  removeCartItem(id)
  {
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
        let link = base_url +'api/v1/customers/'+data.customerId+'/cart/menus/' + id;
        let data1 = {};
        console.log("post data : " + JSON.stringify(data1));
        console.log("post url : " + link);
        enc.http.delete(link)
          .subscribe(data => {
            console.log("Ok" + data1);
            enc.confirm('Cart');
            this.getCart();
          }, error => {
            console.log("Oooops!");
          });
      }, function(error) {
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        let link = 'http://54.172.94.76:9000/api/v1/customers/'+15+'/cart/menus/' + id;
        let data1 = {};
        console.log("post data : " + JSON.stringify(data1));
        console.log("post url : " + link);
        enc.http.post(link, data1)
          .subscribe(data => {
            console.log("Ok" + data1);
            enc.confirm('Cart');
          }, error => {
            console.log("Oooops!");
          });
      });
  }
  confirm(title){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: 'Item is deleted from your ' + title,
      buttons: ['OK']
    });
    alert.present();
  }

}
