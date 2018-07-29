
/***********************************************
* Floating Top Bar script- ? Dynamic Drive (www.dynamicdrive.com)
* Sliding routine by Roy Whittle (http://www.javascript-fx.com/)
* This notice must stay intact for legal use.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

var persistclose=0 //set to 0 or 1. 1 means once the bar is manually closed, it will remain closed for browser session
var startX =10 //set x offset of bar in pixels
var startY = 100 //set y offset of bar in pixels
var verticalpos="fromtop" //enter "fromtop" or "frombottom"
var online= new Array();

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function get_cookie(Name) {
var search = Name + "="
var returnvalue = "";
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search)
if (offset != -1) {
offset += search.length
end = document.cookie.indexOf(";", offset);
if (end == -1) end = document.cookie.length;
returnvalue=unescape(document.cookie.substring(offset, end))
}
}
return returnvalue;
}

  var   _x0   =   0   
  var   _y0   =   0   
  var   _x1   =   0   
  var   _y1   =   0;   
    
  //var   _offx   =   6   
  //var   _offy   =   6;   
    
  var   moveable   =   false;   
    
  function   startDrag(obj)   
  {   
      if(event.button   ==   1)   
      {   
          var   win=obj.parentNode;   
          //get   focus;   
          obj.setCapture();   
            
          //get   the   position   of   mouse   
          _x0   =   event.clientX;   
          _y0   =   event.clientY;   
          //get   the   position   of   layer   
          _x1   =   parseInt(win.style.left);   
          _y1   =   parseInt(win.style.top);   
            
          moveable   =   true;   
      }   
  }   
    
  function   doDrag(obj)   
  {   
      if(moveable)   
      {   
          var   win   =   obj.parentNode;   
          win.style.left   =   _x1   +   event.clientX   -   _x0;   
          win.style.top   =   _y1   +   event.clientY   -   _y0;   
      }   
  }   
    
  function   stopDrag(obj)   
  {   
      if(moveable)   
      {     
          var   win   =   obj.parentNode;   
          obj.releaseCapture();   
          moveable   =   false;   
      }   
  } 
function minWin(obj)   
  {   
      //get   the   layer   whose   id   is   xMsg   
      var   win   =   obj.parentNode.parentNode;   
      //get   it's   parent   element(layer   too!)   
      var   tit   =   obj.parentNode;   
      //get   another   layer   which   is   near   its   parent   element   
      var   msg   =   tit.nextSibling;   
      //define   the   layer's   original   state   
      var   flag   =   msg.style.display   ==   "none";   
      if(flag)   
      {   
          win.style.height   =   parseInt(msg.style.height)   +   parseInt(tit.style.height)   +   1   *   2;   
          msg.style.display   =   "block";   
          win.style.top   =   Top;   
          win.style.left   =   Left;   
          obj.innerHTML   =   "0";   
      }   
      else   
      {   
          win.style.height   =   parseInt(tit.style.height)   +   1   *   2;   
          Top   =   win.style.top;   
          Left   =   win.style.left;   
          win.style.top   =   document.documentElement.scrollTop   +   document.documentElement.scrollHeight   -   25   
          win.style.left   =   0;   
          msg.style.display   =   "none";   
          obj.innerHTML   =   "2";   
      }   
  }

function closebar(){
if (persistclose)
document.cookie="remainclosed=1"
document.getElementById("topbar").style.visibility="hidden"
}

function staticbar(){
	barheight=document.getElementById("topbar").offsetHeight
	var ns = (navigator.appName.indexOf("Netscape") != -1) || window.opera;
	var d = document;
	function ml(id){
		var el=d.getElementById(id);
		if (!persistclose || persistclose && get_cookie("remainclosed")=="")
		el.style.visibility="visible"
		if(d.layers)el.style=el;
		el.sP=function(x,y){this.style.left=x+"px";this.style.top=y+"px";};
		el.x = startX;
		if (verticalpos=="fromtop")
		el.y = startY;
		else{
		el.y = ns ? pageYOffset + innerHeight : iecompattest().scrollTop + iecompattest().clientHeight;
		el.y -= startY;
		}
		return el;
	}
	window.stayTopLeft=function(){
		if (verticalpos=="fromtop"){
		var pY = ns ? pageYOffset : iecompattest().scrollTop;
		ftlObj.y += (pY + startY - ftlObj.y)/8;
		}
		else{
		var pY = ns ? pageYOffset + innerHeight - barheight: iecompattest().scrollTop + iecompattest().clientHeight - barheight;
		ftlObj.y += (pY - startY - ftlObj.y)/8;
		}
		ftlObj.sP(ftlObj.x, ftlObj.y);
		setTimeout("stayTopLeft()", 10);
	}
	ftlObj = ml("topbar");
	stayTopLeft();
}

if (window.addEventListener)
window.addEventListener("load", staticbar, false)
else if (window.attachEvent)
window.attachEvent("onload", staticbar)
else if (document.getElementById)
window.onload=staticbar