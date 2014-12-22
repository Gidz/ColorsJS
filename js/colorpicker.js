/*
Author: Gidz Paul
Date : Dec 19 2014

A simple color picker which makes use of HSLA colors.

h -> hue value
s -> saturation value.
l -> lightness value
a -> alpha value. It's kept as constant here

*/

var container = document.getElementById("container");
var display = document.getElementById("colorName");
var details = document.getElementById("details");
var pallet = document.getElementById("colorPallet");
var mover = document.getElementById("cph");



var currentColor={
	hue:0,
	saturation:52,
	lightness:0,
	a:1,
	colorAsString: function(){
		return "hsla("+this.hue+","+this.saturation+"%,"+this.lightness+"%,"+this.a+")";
		}	

};

//==================================================
//Function to track cursor position
//==================================================
var cursorPos ={X : 0 ,Y : 0};
document.onmousemove = function(container){
    cursorPos.X = container.pageX;
    cursorPos.Y = container.pageY;
}


//==================================================
//Function to update the color
//==================================================
function updateColor() {
//Object to hold the Current color

//get window width and height
var w =container.clientWidth;
var h =container.clientHeight;


/*
Calculating the lightness value.
lightness is calculated from the Y position of the cursor.
lightness values ranges from 0 to 100.
Logic is to Divide the Vertical screen into 100 parts and get the value.
*/
currentColor.lightness=(cursorPos.Y/h)*100;

/*
Calculating the hue value.
hue is calculated from the X position of the cursor.
hue values ranges from 0 to 360.
Logic is to Divide the Horizantal screen into 360 parts and get the value.
*/
currentColor.hue=(cursorPos.X/w)*360;

//Rounding the values.
currentColor.lightness=Math.floor(currentColor.lightness);
currentColor.hue=Math.floor(currentColor.hue);

//Calculate the color string
//var color="hsla("+currentColor.hue+","+currentColor.saturation+"%,"+currentColor.lightness+"%,"+currentColor.a+")";

//set the color as background
container.style.backgroundColor=currentColor.colorAsString();

//update the display text
display.innerHTML=currentColor.colorAsString();
}

//setting the frequency to run the updateColor function
setInterval("updateColor()", 10);

//==================================================
//Function to pick color
//==================================================
container.onclick = function(){
var a = document.createElement('li');
pallet.appendChild(a);
a.className ='color';
a.style.backgroundColor=currentColor.colorAsString();
a.innerHTML="<input type=\"text\" value="+currentColor.colorAsString()+" disabled></input>";
}
