import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PreferencePage } from '../preference/preference';
import { LoadingController } from 'ionic-angular';
import { DetailviewPage } from '../detailview/detailview';
import { MenuinfodetailsPage } from '../menuinfodetails/menuinfodetails';
import { Navbar } from 'ionic-angular';

import { Http } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-detailmodal',
  templateUrl: 'detailmodal.html',
})
export class DetailmodalPage {
   objectKeys = Object.keys;
  @ViewChild(Navbar) navBar: Navbar;
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
  fats:any;
  vitamins:any;
  servings:any;
  params : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public loadingCtrl: LoadingController,public http: Http) {
     this.value = navParams.get("value");
     this.details = navParams.get("details");
     this.info = navParams.get("current_detail");
     this.len = this.info.length;
     this.params = navParams.get("data");
     console.log(this.params);
     this.mylatitude = this.params.userlatitude;
     this.mylongitude = this.params.userlongitude
     this.data.push({
          value: this.value
        })

     //background color
     if (this.value == 1)
     {
         if(this.info.nutrition_info.fats.length > 0)
          this.fats = 1;
         else
          this.fats = 0;
        if(this.info.nutrition_info.vitamins.length > 0)
          this.vitamins = 1;
         else
          this.vitamins = 0;
        if(this.info.nutrition_info.servings.length > 0)
          this.servings = 1;
         else
          this.servings = 0;
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
    document.getElementById("ioncontent").style.backgroundColor = this.bgcol ;
    this.setBackButtonAction()
  }
  
  setBackButtonAction(){
       this.navBar.backButtonClick = () => {
          this.navCtrl.pop({animate:true,animation:'transition',duration:300,direction:'back'});
       }
    }


  //go to preference screen
  goto_preference(){
     this.navCtrl.push(PreferencePage,{},{animate:true,animation:'transition',duration:300,direction:'forward'});
  }
  
  //location
  direct(x,y){
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    window.location.href = this.url;
  }

  goto_detailview(data){
    this.data_stringify = JSON.stringify(data);
    this.navCtrl.push(MenuinfodetailsPage,{data_search : data},{animate:true,animation:'transition',duration:300,direction:'forward'});
  }
}
