/*
Author: Gidz Paul
Date : Dec 19 2014

A simple color picker

h -> hue value
s -> saturation value.
l -> luminousity value
a -> alpha value. It's kept as constant here 

*/
var h=0;
var s=52;
var l=41;
var a=1;
var container = document.getElementById("container");
var display = document.getElementById("colorName");
var details = document.getElementById("details");
var color="hsla("+h+","+s+"%,"+l+"%,"+a+")";
container.style.backgroundColor=color;


var cursorX;
var cursorY;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
setInterval("checkCursor()", 10);

function checkCursor(){
updateColor();
}

function updateColor() {
var w =container.clientWidth;
var h =container.clientHeight;
l=(cursorY/h)*100;
h=(cursorX/w)*360;
l=Math.floor(l);
h=Math.floor(h);
var color="hsla("+h+","+s+"%,"+l+"%,"+a+")";
container.style.backgroundColor=color;
display.innerHTML=color;
}
