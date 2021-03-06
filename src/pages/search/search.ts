import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailviewPage } from '../detailview/detailview';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public searchQuery: string = '';
         data_stringify : any;
         items : any;
         item : any = [];
         default : any;
         flag : number = 1;
         sresults : any = 0;
         shareddata : any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public navParams: NavParams, public http: Http) {
      this.shareddata = navParams.get('data');
      console.log(this.shareddata);
  	  this.initial_search(); //search template
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  resetsearch(){
    this.flag = 1;
  }
  
  //click on search item
  goto_item(searchdatas){
    this.data_stringify = JSON.stringify(searchdatas);
    this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify, data : this.shareddata});
  }


   initial_search(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading frequest searches...',
      spinner: 'circles'
    });
    loadingPopup.present();
    let i;
          this.http.get('http://54.172.94.76:9000/api/v1/cuisines')
          .map(res => res.json())
          .subscribe(
            data => {
                setTimeout(() => {
                this.default = data.data.cuisines;
                for (i = 0;i<6;i++){
                  this.item.push(this.default[i]);
                }
                loadingPopup.dismiss();
                }, 1000);
            },
            err => console.error(err)
        );
   }

   //fetch search result
   fetchsearch(){
          let jlength;
   	      if (this.searchQuery != ''){
          this.flag = 0;
          this.items = [{"item":{"name" : "Searching..."}}]
	        this.http.get('http://54.172.94.76:9000/api/v1/search/'+this.searchQuery+'?lat='+this.shareddata.userlatitude+'&lng='+this.shareddata.userlongitude)
		      .map(res => res.json())
		      .subscribe(
		        data => {
		            this.items = data.data;
                jlength = this.items.length;
                this.sresults = jlength;
                if (jlength == 0)
                  this.items = [{"item":{"name" : "No Data found. Try another keyword"}}]
		        },
		        err => console.error(err)
		    );
       }
       else{
          this.flag = 1;
       }
  }
  

  goto_fetchsearch(search){
          let jlength;
          if (search != ''){
          this.flag = 0;
          this.items = [{"item":{"name" : "Searching..."}}]
          this.http.get('http://54.172.94.76:9000/api/v1/search/'+search+'?lat='+this.shareddata.userlatitude+'&lng='+this.shareddata.userlongitude)
          .map(res => res.json())
          .subscribe(
            data => {
                this.items = data.data;
                jlength = this.items.length;
                this.sresults = jlength;
                if (jlength == 0)
                  this.items = [{"item":{"name" : "No Data found. Try another keyword"}}]
            },
            err => console.error(err)
        );
       }
       else{
          this.flag = 1;
       }
   }
}
