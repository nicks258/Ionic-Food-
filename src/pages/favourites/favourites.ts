import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeStorage: NativeStorage,public http: Http) {
  this.getFavourites();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }
  getFavourites()
  {
    this.nativeStorage.getItem('USERID')
      .then( (data)=>{

    this.http.get('http://54.172.94.76:9000/api/v1/customers/'+data.customerId +'/favourites')
      .map(res => res.json())
      .subscribe(
        data => {
          setTimeout(() => {

            this.favourities = data.data;
            console.log(JSON.stringify(this.favourities));
            // this.nextlength = data.data.length;
            // loadingPopup.dismiss();
          }, 1000);
        },
        err => console.error(err)
      );
  }, function(error){
  console.log("Use real mobile app for getting exact data");
  //dummy variables for browser use
});

  }

}
