import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the FavouritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var base_url;
@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  favourities : any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public alertCtrl: AlertController, public navParams: NavParams,public nativeStorage: NativeStorage,public http: Http) {
  let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Favourites...',
      spinner: 'circles'
    });
    loadingPopup.present();
    this.getFavourites();
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }
  getFavourites()
  {
    let enc = this;
    this.nativeStorage.getItem('USERID')
      .then( (data)=>{

    enc.http.get('http://54.172.94.76:9000/api/v1/customers/'+data.customerId +'/favourites')
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            enc.favourities = data.data;
            console.log(JSON.stringify(enc.favourities));
          }, 1000);
        },
        err => console.error(err)
      );
  }, function(error){
  console.log("Use real mobile app for getting exact data");
  //dummy variables for browser use
   enc.http.get('http://54.172.94.76:9000/api/v1/customers/'+15+'/favourites')
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {
            enc.favourities = data.data;
            console.log(JSON.stringify(enc.favourities));
          }, 1000);
        },
        err => console.error(err)
      );
});

  }
  removeFavouritesItem(id)
  {
    let enc = this;

    let loadingPopup = this.loadingCtrl.create({
      content: 'Removing from your favourites...',
      spinner: 'circles'
    });
    loadingPopup.present();
    console.log("Removing from fav");
    loadingPopup.dismiss();

    enc.nativeStorage.getItem('USERID')
      .then( (data)=> {
        let link = base_url +'api/v1/customers/'+data.customerId+'/favourites/menus/' + id;
        let data1 = {};
        console.log("post data : " + JSON.stringify(data1));
        console.log("post url : " + link);
        enc.http.delete(link)
          .subscribe(data => {
            console.log("Ok" + data1);
            enc.confirm('favourites');
            this.getFavourites();
          }, error => {
            console.log("Oooops!");
          });
      }, function(error) {
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        let link = 'http://54.172.94.76:9000/api/v1/customers/'+15+'/favourites/menus/' + id;
        let data1 = {};
        console.log("post data : " + JSON.stringify(data1));
        console.log("post url : " + link);
        enc.http.post(link, data1)
          .subscribe(data => {
            console.log("Ok" + data1);
            enc.confirm('favourites');
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
