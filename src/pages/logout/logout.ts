import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../login/login";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus,public nativeStorage: NativeStorage) {
    // let nav = this.navCtrl;
    let env = this;
    env.nativeStorage.remove('user');
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
    // this.googlePlus.logout()
    //   .then(function (response) {
    //
    //     // nav.push(LoginPage);
    //   },function (error) {
    //     console.log(error);
    //   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  // doGoogleLogout(){
  //   let env = this;
  //   this.googlePlus.logout()
  //     .then(function (response) {
  //       env.nativeStorage.remove('user');
  //       env.nav.push(LoginPage);
  //     },function (error) {
  //       console.log(error);
  //     })
  // }

}
