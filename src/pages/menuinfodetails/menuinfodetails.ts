import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';		

@IonicPage()
@Component({
  selector: 'page-menuinfodetails',
  templateUrl: 'menuinfodetails.html',
})
export class MenuinfodetailsPage {
  objectKeys = Object.keys;
  @ViewChild(Navbar) navBar: Navbar;
  public value:any;
  fats : any;
  vitamins : any;
  servings : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.value = navParams.get("data_search");
      console.log(this.value);
      if(this.value.item.nutritionInfo.fats.length > 0)
          this.fats = 1;
         else
          this.fats = 0;
        if(this.value.item.nutritionInfo.vitamins.length > 0)
          this.vitamins = 1;
         else
          this.vitamins = 0;
        if(this.value.item.nutritionInfo.servings.length > 0)
          this.servings = 1;
         else
          this.servings = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuinfodetailsPage');
    this.setBackButtonAction()
  }

 setBackButtonAction(){
       console.log("back button pressed");
       this.navBar.backButtonClick = () => {
          this.navCtrl.pop({animate:true,animation:'transition',duration:300,direction:'back'});
       }
    }


}
