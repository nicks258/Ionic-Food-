import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController,public fb: Facebook,public nativeStorage: NativeStorage
  ) {}

  ionViewCanEnter(){
    let env = this;
    this.nativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture,
        email: data.email
      };
        env.userReady = true;
    }, function(error){
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        env.user = {
          name: "suvojit",
          gender: "male",
          picture: "assets/img/user.png",
          email: "suvojitraj.kar@facebook.com"
        };
        env.userReady = true;
        console.log(env.user);
    });
  }
}

