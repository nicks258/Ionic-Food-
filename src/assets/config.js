var base_url= "http://54.172.94.76:9000/";
var geolocation = false;
var dummy_lat = 37.40879;
var dummy_long = -121.98857;

var dummy_user={ name: "suvojit", gender: "male", picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycewbr9Y9lN7Qn1Yl5e9CHBbleZpUMjqD23wcfOp5FKbhNMeUSg",email: "suvojitraj.kar20@facebook.com"};

function do_get(){
	return "get function working";
}

function do_post(){
    return "post function working";
}

function get_userdetails(){
	return { name: data.name, gender: data.gender, picture: data.picture, email: data.email };
}