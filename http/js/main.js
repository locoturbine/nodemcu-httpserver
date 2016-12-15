function init()
{
	if (window.DeviceOrientationEvent) {
		
		window.addEventListener("deviceorientation", function(event) 
		{
			document.getElementById("y").style.webkitTransform = "scaleY("+(Math.round(event.beta))+")";  
			document.getElementById("x").style.webkitTransform = "scaleX("+(Math.round(event.gamma))+")";
			document.getElementById("angle").style.webkitTransform = "rotateZ("+(Math.round(event.alpha))+"deg)";
			document.getElementById("gamma").innerHTML = Math.round(event.gamma);
			document.getElementById("beta").innerHTML = Math.round(event.beta);
		}, true);
		
		
		
	} else {
  	alert("Sorry, your browser doesn't support Device Orientation");
	} 
}