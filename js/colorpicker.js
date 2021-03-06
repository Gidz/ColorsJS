/*
Author: Gidz Paul
Date : Dec 19 2014

A simple color picker which makes use of HSLA colors.

h -> hue value
s -> saturation value.
l -> lightness value
a -> alpha value. It's kept as constant here

Why did I use HSLA colors ?

The relation between the colors of the same hue can be represented efficiently by using HSL notation.
*/

var container = document.getElementById("container");
var display = document.getElementById("colorName");
var details = document.getElementById("details");
var pallet = document.getElementById("colorPallet");
var colorDisplay = document.getElementById("colorName");


//==================================================
//An object to hold the current value of the color.
//This object will be updated constantly as the 
//mouse moves.
//==================================================
var currentColor={
	hue:0,
	saturation:52,
	lightness:50,
	a:1,
	colorInHSL: function(){
		return "hsla("+this.hue+","+this.saturation+"%,"+this.lightness+"%,"+this.a+")";
		},
		
	colorInRGB: function () {
			var f = hsl2rgb(this.hue,this.saturation,this.lightness);
			return "rgb("+f.r+","+f.g+","+f.b+")";
	},
	
	colorInHEX: function () {
		var d = hsl2rgb(this.hue,this.saturation,this.lightness);
		return rgbToHex(d.r,d.g,d.b);
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
container.style.backgroundColor=currentColor.colorInHSL();

//update the display text
display.innerHTML="Left Click to Save<br>"+"#"+currentColor.colorInHEX();
}

//setting the frequency to run the updateColor function
setInterval("updateColor()", 10);




//==================================================
//Function to pick color
//(onclick function)
//==================================================
container.onclick = function(){
var a = document.createElement('li');
pallet.appendChild(a);
a.className ='color';
a.style.backgroundColor=currentColor.colorInHSL();
a.innerHTML=currentColor.colorInRGB()+"<hr>"+"#"+currentColor.colorInHEX();
if (currentColor.lightness<=50) {
	a.style.color="white";
}
else {
	a.style.color="black";
	
}
}

//This function creates li element and shades it with choosen color
var addColor = function () {  
var a = document.createElement('li');
pallet.appendChild(a);
a.className ='color';
a.style.backgroundColor=currentColor.colorInHSL();
a.innerHTML=currentColor.colorInRGB()+"<hr>"+"#"+currentColor.colorInHEX();
if (currentColor.lightness<=50) {
	a.style.color="white";
}
else {
	a.style.color="black";
}
}

container.onclick = function pickUp(){
addColor();
}



//Not wanting to lose a small range of colors in the top portion
colorDisplay.onclick = function(){
addColor();
}





//==================================================
//Function to remove color from the pallet
//(onclick function)
//==================================================
$(function () {
    $('#colorPallet').on('dblclick', 'li', function () {
                $(this).remove();
    });
});

//==================================================
//Function to convert HSL to RGB
//This script is taken from
//http://hsl2rgb.nichabi.com/javascript-function.php
//==================================================

function hsl2rgb (h, s, l) {

    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r: r, g: g, b: b }

}
//==================================================
//Function to convert RGB to HEX
//This script is taken from
//http://www.javascripter.net/faq/rgbtohex.htm
//==================================================
function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

//==================================================
//the PopUp
//==================================================
var popUp = document.getElementById("screenCover");
var help = document.getElementById("help");
var closeBtn=document.getElementById("popUpClose");
var h=document.getElementById("popUpHeading");
var c=document.getElementById("popUpContent");


help.onclick = function () {
	popUp.style.display='block';
	display.style.display='none';
	document.getElementById("cph").style.display="none";
	
	
}
closeBtn.onclick = function () {
	popUp.style.display='none';
	display.style.display='block';
	document.getElementById("cph").style.display='block';
}

//Keyboard Events
document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        currentColor.saturation+=1;
    }
    else if (e.keyCode == '40') {
        // down arrow
        currentColor.saturation-=1;
    }
    else if (e.keyCode == '37') {
       // left arrow
       
    }
    else if (e.keyCode == '39') {
       // right arrow
       
    }
    else if (e.keyCode == '13') {
			addColor();
    	//
    }

}

