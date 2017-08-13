import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html',
})
export class PreferencePage {
  option_val = 0;
  current_option : any;
  current_inneropt : any;
  objectKeys= Object.keys;
  items = {  
   "Budget":{  
      "Breakfast":[  
         "$0 to $10",
         "$10 to $15",
         "$15 to $20",
         "$20 & more"
      ],
      "Lunch":[  
         "$0 to $10",
         "$10 to $15",
         "$15 to $20",
         "$20 & more"
      ],
      "Dinner":[  
         "$0 to $10",
         "$10 to $15",
         "$15 to $20",
         "$20 & more"
      ]
   },
   "Distance":[  
      "under 5 miles",
      "under 10 miles",
      "under 20 miles"
   ],
   "Calorie":{  
      "Breakfast":[  
         "under 300",
         "under 600",
         "600 & more "
      ],
      "Lunch":[  
         "under 300",
         "under 600",
         "600 & more "
      ],
      "Dinner":[  
         "under 300",
         "under 600",
         "600 & more "
      ]
   },
   "Total_Calories/Day":1500,
   "Meal_Time":{  
      "Breakfast":[  
         "6AM to 7AM",
         "7AM to 8AM",
         "8AM to 9AM"
      ],
      "Lunch":[  
         "11AM to 12PM",
         "12PM to 13PM",
         "13PM to 14PM",
         "14PM to 15PM"
      ],
      "Dinner":[  
         "17PM to 18PM",
         "18PM to 19PM",
         "19PM to 20PM",
         "20PM to 21PM",
         "21PM to 22PM"
      ]
   },
   "Cuisines":[  
      "American",
      "Cajun",
      "Soul",
      "Thai",
      "Mediterranean",
      "Continental",
      "Chinese",
      "Vietnamese",
      "Carribean",
      "Polish",
      "Mexican",
      "Italian",
      "Indian",
      "German",
      "Brazilian",
      "Turkish",
      "Greek",
      "Korean",
      "Austrian",
      "Japanese",
      "French",
      "Portugese",
      "Spanish",
      "Moroccan",
      "Malaysian",
      "Ethiopian"
   ],
   "Food_Types":[  
      "Kebabs",
      "Pizza",
      "Pasta",
      "Soup",
      "Seafood",
      "BBQ",
      "Burger",
      "Taco",
      "Burritos",
      "Tapas",
      "Ramen",
      "Beer Food",
      "Beef",
      "Cured",
      "Shezwan",
      "Tandoori",
      "Sushi",
      "Salad",
      "Potatoes",
      "Pastrani",
      "Cantonese",
      "Dimsum"
   ],
   "Fast_Foods":[  
      "McDonalds",
      "Subway",
      "Carls Jr",
      "Burger King",
      "Wendy’s",
      "Taco Bell",
      "Dunkin Donuts",
      "Krispy Kreme",
      "Pizza Hut",
      "KFC",
      "Chick-Filet",
      "Sonic",
      "Dominoes",
      "Jack-in the box",
      "Arby’s",
      "Dairy Queen",
      "Popeyes",
      "Little Caesars",
      "Papa Johns"
   ]
};


  applyjson : any;
  option_data : any;
  elem : any;
  selectedItems=new Array();
  checkedItems:boolean[];
  savedpreferences : any;
  user: any;
  email : any;
  env1 : any;
  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public navParams: NavParams, private alertCtrl: AlertController,public http: Http) {
      let opt = "budget";
      this.current_option = opt;
      this.current_inneropt = "items."+opt;
      this.option_val = 1;
      let env = this;
      this.env1 = env;
      this.nativeStorage.getItem('user')
      .then( (data)=>{
        env.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture,
          email: data.email
        };
         console.log(env.user.email);
         env.getcurrentpreference(env.user.email);
      }, function(error){
        console.log("Use real mobile app for getting exact data");
        //dummy variables for browser use
        env.user = {
          name: "suvojit",
          gender: "male",
          picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycewbr9Y9lN7Qn1Yl5e9CHBbleZpUMjqD23wcfOp5FKbhNMeUSg",
          email: "suvojitraj.kar15@facebook.com"
        };
        console.log(env.user.email);
        env.getcurrentpreference(env.user.email);
      });
      //this.email = "suvojitraj.kar13@facebook.com";
      //console.log(this.env.user.email);
      //this.getcurrentpreference(this.env1.user.email);

  }

  

  ionViewDidLoad() {
     console.log('ionViewDidLoad PreferencePage');
     document.getElementById("Budget").style.color = "white";
     document.getElementById("Budget").style.backgroundColor = "#0CC4A2";
  }
  
  itemname(item){
    let pos = item.indexOf("_");
    if (pos!=0){
      return item.replace("_"," ");
    }
    else{
      return item;
    }
  }

  //selected left option
   selected(option){
     this.current_option = option;
     this.current_inneropt = "items."+option;
     if (option == "Budget"){
        this.option_val = 1;
      }
      else if (option == "Distance"){
        this.option_val = 2;
      }
      else if (option == "Calorie"){
        this.option_val = 3;
      }
      else if (option == "Total_Calories/Day"){
        this.option_val = 4;
      }
      else if (option == "Meal_Time"){
        this.option_val = 5;
      }
      else if (option == "Cuisines"){
        this.option_val = 6;
      }
      else if (option == "Food_Types"){
        this.option_val = 7;
      }
      else{
        this.option_val = 8;
      }
     let x = <HTMLScriptElement[]><any>document.getElementsByClassName("sidecat");
     let i;
     for (i = 0; i < x.length; i++) {
         x[i].style.color = "black";
         x[i].style.backgroundColor="#F4F6F5";
      }


      document.getElementById(option).style.color = "white";
      document.getElementById(option).style.backgroundColor = "#0CC4A2";


   }
 
 //get user preference by emailid
 getcurrentpreference(emailid){
  console.log(emailid);
  let loadingPopup = this.loadingCtrl.create({
      content: 'Loading your preferences...',
      spinner: 'circles'
    });
    loadingPopup.present();

       this.http.get('http://54.172.94.76:9000/api/v1/customers/preferences/'+emailid)
       .map(res => res.json())
       .subscribe(
       data => {
          setTimeout(() => {
            console.log(data);

            this.savedpreferences = data.data;
        

            //budget
            if (this.savedpreferences.Budget.Breakfast.length > 0){
                  this.selectedItems.push("items.Budget.Breakfast-"+this.savedpreferences.Budget.Breakfast[0]);
                  this.check_saved("items.Budget.Breakfast-",this.savedpreferences.Budget.Breakfast[0]);
                }
            if (this.savedpreferences.Budget.Lunch.length > 0){
                  this.selectedItems.push("items.Budget.Lunch-"+this.savedpreferences.Budget.Lunch[0]);
                  this.check_saved("items.Budget.Lunch-",this.savedpreferences.Budget.Lunch[0]);
                }
            if (this.savedpreferences.Budget.Dinner.length > 0){
                  this.selectedItems.push("items.Budget.Dinner-"+this.savedpreferences.Budget.Dinner[0]);
                  this.check_saved("items.budget.dinner-",this.savedpreferences.Budget.Dinner[0]);
                }
            //distance
            if (this.savedpreferences.Distance.length>0){
               this.selectedItems.push("items.Distance-"+this.savedpreferences.Distance[0]);
                  this.check_saved("items.Distance-",this.savedpreferences.Distance[0]);
            }
             //calorie
            if (this.savedpreferences.Calorie.Breakfast.length > 0){
                  this.selectedItems.push("items.Calorie.Breakfast-"+this.savedpreferences.Calorie.Breakfast[0]);
                  this.check_saved("items.Calorie.Breakfast-",this.savedpreferences.Calorie.Breakfast[0]);
                }
            if (this.savedpreferences.Calorie.Lunch.length > 0){
                  this.selectedItems.push("items.Calorie.Lunch-"+this.savedpreferences.Calorie.Lunch[0]);
                  this.check_saved("items.Calorie.Lunch-",this.savedpreferences.Calorie.Lunch[0]);
                }
            if (this.savedpreferences.Calorie.Dinner.length > 0){
                  this.selectedItems.push("items.Calorie.Dinner-"+this.savedpreferences.Calorie.Dinner[0]);
                  this.check_saved("items.Calorie.Dinner-",this.savedpreferences.Calorie.Dinner[0]);
                }
            console.log(this.savedpreferences["Total_Calories/Day"]);
            // //calorie_bld
            if(this.savedpreferences["Total_Calories/Day"] != 0 ){
                this.selectedItems.push("items.Total_Calories/Day-"+this.savedpreferences["Total_Calories/Day"]);
                this.check_saved("items.Total_Calories/Dday-",this.savedpreferences.Calorie["Total_Calories/Day"]);
                
            }
            
            // //meal
            if (this.savedpreferences.Meal_Time.Breakfast.length > 0){
                  this.selectedItems.push("items.Meal_Time.Breakfast-"+this.savedpreferences.Meal_Time.Breakfast[0]);
                  this.check_saved("items.Meal_Time.Breakfast-",this.savedpreferences.Meal_Time.Breakfast[0]);
                }
            if (this.savedpreferences.Meal_Time.Lunch.length > 0){
                  this.selectedItems.push("items.Meal_Time.Lunch-"+this.savedpreferences.Meal_Time.Lunch[0]);
                  this.check_saved("items.Meal_Time.Lunch-",this.savedpreferences.Meal_Time.Lunch[0]);
                }
            if (this.savedpreferences.Meal_Time.Dinner.length > 0){
                  this.selectedItems.push("items.Meal_Time.Dinner-"+this.savedpreferences.Meal_Time.Dinner[0]);
                  this.check_saved("items.Meal_Time.Dinner-",this.savedpreferences.Meal_Time.Dinner[0]);
                }
            //  //Cuisine
             if(this.savedpreferences.Cuisines.length>0){
                for (let i=0;i<this.savedpreferences.Cuisines.length;i++){
                   this.selectedItems.push("items.Cuisines-"+this.savedpreferences.Cuisines[i]);
                   this.check_saved("items.Cuisines-",this.savedpreferences.Cuisines[i]);
               
                }
             }

              //foodtype
               if(this.savedpreferences.Food_Types.length>0){
                for (let i=0;i<this.savedpreferences.Food_Types.length;i++){
                   this.selectedItems.push("items.Food_Types-"+this.savedpreferences.Food_Types[i]);
                   this.check_saved("items.Food_Types-",this.savedpreferences.Food_Types[i]);
               
                }
             }
            
            // //fastfood
             if(this.savedpreferences.Fast_Foods.length>0){
                for (let i=0;i<this.savedpreferences.Fast_Foods.length;i++){
                   this.selectedItems.push("items.Fast_Foods-"+this.savedpreferences.Fast_Foods[i]);
                   this.check_saved("items.Fast_Foods-",this.savedpreferences.Fast_Foods[i]);
               
                }
             }

           loadingPopup.dismiss();
         }, 1000);

            //console.log(this.selectedItems);
            console.log(JSON.stringify(this.savedpreferences));
},
err => {
  loadingPopup.dismiss(); 
  this.errorpref();
 }
);
 }
  // no user preference
  errorpref(){
    this.savedpreferences =   {  
   "Budget":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Distance":[],
   "Calorie":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Total_Calories/Day":0,
   "Meal_Time":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Cuisines":[],
   "Food_Types":[],
   "Fast_Foods":[]
};
  }

  //saved preferenced are checked by default
  check_saved(a,b){
     let option = a+b;
         let j, flag;
         for(j=0;j< this.selectedItems.length; j++){

            if (this.selectedItems[j] == option){
                flag = 1;
                break;
              }
            else{
                flag = 0;
              }
       }

       if (flag == 1)
         return true;
       else
         return false;
  }


  //currently checked option
  clickedItem(val,event){
    if(event.checked == true){
      let pos = this.selectedItems.indexOf(val);
      this.selectedItems.push(val);
   
    }
    else{
      if (val.split("-")[0] == "items.Total_Calories/Day")
      {
         let pos = this.selectedItems.indexOf(val);
         this.selectedItems.splice(pos, 1);
         this.selectedItems.push(val.split("-")[0]+"-0");
      }
      else{
          let pos = this.selectedItems.indexOf(val);
          this.selectedItems.splice(pos, 1);
          
    }
   }
 }

 presentAlert(options) {
   let alert = this.alertCtrl.create({
      title: 'items',
      subTitle: options,
      buttons: ['OK']
    });
    alert.present();
}

  //apply user preference
  applypreference(){
    console.log(this.env1.user.email);
     this.applyjson =  {  
   "Budget":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Distance":[],
   "Calorie":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Total_Calories/Day":0,
   "Meal_Time":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Cuisines":[],
   "Food_Types":[],
   "Fast_Foods":[]
};
 
     let j, k, initial_id, choosen_id, flag=0;
     for(j=0;j< this.selectedItems.length; j++){
        let postpref='this.applyjson', check_presence=0;

        if (this.selectedItems[j].split("-")[0] == "items.Total_Calories/Day")
        {

           this.applyjson["Total_Calories/Day"] = this.selectedItems[j].split("-")[1];
        }
        else
        {
          initial_id = this.selectedItems[j].split("-")[0].split(".");
          initial_id[0] = "applyjson";
          choosen_id = this.selectedItems[j].split("-")[1];
          for ( k=1; k<initial_id.length; k++){
            postpref = postpref + "." + initial_id[k] ;
          }
          check_presence = eval(postpref).indexOf(choosen_id);
          if (check_presence == -1)
             eval(postpref).push(choosen_id);
         }
      }
    //this.presentAlert(JSON.stringify(this.applyjson));
    this.presentAlert("Your prefernces are saved successfully");
    let link = 'http://54.172.94.76:9000/api/v1/customers/preferences';
    let data =  {"email": this.env1.user.email ,"preferences":JSON.stringify(this.applyjson)};
    console.log("post data : " + JSON.stringify(data));
    console.log("post url : " + link);
    this.http.post(link, data)
      .subscribe(data => {
        console.log("Ok" + data);
      }, error => {
        console.log("Oooops!");
      });
   }

   radioItem(id){
         let initial_id = id.split("-")[0];
         let i, current_initialid, flag=0;
         for (i=0;i<this.selectedItems.length; i++)
        {
         current_initialid = this.selectedItems[i].split("-")[0];
         if (initial_id == current_initialid){
            this.selectedItems[i] = id;
            flag = 1;
          }
        }
      if (flag == 0)
      {
           this.selectedItems.push(id);
      }
   }

   clearall(){
     this.savedpreferences =    {  
   "Budget":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Distance":[],
   "Calorie":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Total_Calories/Day":0,
   "Meal_Time":{  
      "Breakfast":[],
      "Lunch":[],
      "Dinner":[]
   },
   "Cuisines":[],
   "Food_Types":[],
   "Fast_Foods":[]
};
      this.selectedItems=new Array();
   }
}
