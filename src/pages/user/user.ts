import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  shareddata : any;

  constructor(public navCtrl: NavController,public fb: Facebook,public nativeStorage: NativeStorage, public navParams: NavParams) {
    this.shareddata = navParams.get('data');
    console.log(this.shareddata);
  }

}

