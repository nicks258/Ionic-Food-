import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PreferencePage } from '../preference/preference';
import { LoadingController } from 'ionic-angular';
import { DetailviewPage } from '../detailview/detailview';
import { MenuinfodetailsPage } from '../menuinfodetails/menuinfodetails';

import { Http } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-detailmodal',
  templateUrl: 'detailmodal.html',
})
export class DetailmodalPage {
  restaurantInfo: any;
  data: Array<{value: number}> = [];
  details : any;
  info : any;
  nextlength : any;
  detaildata : any;
  url : any;
  rating : any;
  mealdetails : any;
  menuItems : any;
  bgcol: any;
  public value;
  reviewInfo : any;
  menuDeatils: any;
  menuDeatilsLength: any;
  len : any;
  mealinfoarraydesc : any = [];
  review : any;
  data_stringify : any;
  mylatitude: any;
  mylongitude:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public loadingCtrl: LoadingController,public http: Http) {
     this.value = navParams.get("value");
     this.details = navParams.get("details");
     this.info = navParams.get("current_detail");
     console.log(this.info);
     this.len = this.info.length;
     this.mylatitude = 37.40879;
     this.mylongitude = -121.98857;
     this.data.push({
          value: this.value
        })

     //background color
     if (this.value == 1)
     {
         this.bgcol ="#FEF9D9";
     }
     else if(this.value == 2){
          this.bgcol = "#DEF9D6";
          if (this.info.length == undefined){
            this.review=[{"author_name":"No Reviews Found","text":"" }];
          }
          else{
             this.review = this.info;
          } 
     }
     else if(this.value == 3){
          this.bgcol = "#B9F496";
     }
     else if(this.value == 4){
          this.bgcol = "#ECFCB1";
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailmodalPage');
    document.getElementById("ioncontent").style.backgroundColor = this.bgcol ;
  }
  
  //go to preference screen
  goto_preference(){
     this.navCtrl.push(PreferencePage);
  }
  
  //location
  direct(x,y){
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    window.location.href = this.url;
  }

  goto_detailview(data){
    //this.data_stringify = JSON.stringify(data);
    //console.log(this.data_stringify);
    this.navCtrl.push(MenuinfodetailsPage,{data_search : data});
  }
}
