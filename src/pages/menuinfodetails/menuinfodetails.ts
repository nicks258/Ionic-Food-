import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-menuinfodetails',
  templateUrl: 'menuinfodetails.html',
})
export class MenuinfodetailsPage {
  public value:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.value = navParams.get("data_search");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuinfodetailsPage');
  }

}
