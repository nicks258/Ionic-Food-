import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  favourities : any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public nativeStorage: NativeStorage,public http: Http) {
  let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Favourites...',
      spinner: 'circles'
    });
    loadingPopup.present();
    setTimeout(() => {
      this.getFavourites();
      loadingPopup.dismiss();
    }, 1000);
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
            console.log(JSON.stringify(this.favourities));
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
          }, 1000);
        },
        err => console.error(err)
      );
});

  }

}
