import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from "@angular/http";

declare var base_url;
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  getCart(){
    let env = this;
    this.http.get(base_url+'api/v1/customers/preferences/' )
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("user is already registered")

        },
        err => {
          console.error(err);

        }
      );
  }

}
