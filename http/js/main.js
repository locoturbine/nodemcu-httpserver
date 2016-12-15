function init()
{
	if (window.DeviceOrientationEvent) {

		var lastBeta = 0;
		var lastGamma = 0 ;
		
		window.addEventListener("deviceorientation", function(event) 
		{
			document.getElementById("y").style.webkitTransform = "scaleY("+(Math.round(event.beta))+")";  
			document.getElementById("x").style.webkitTransform = "scaleX("+(Math.round(event.gamma))+")";
			document.getElementById("angle").style.webkitTransform = "rotateZ("+(Math.round(event.alpha))+"deg)";
		//	document.getElementById("gamma").innerHTML = Math.round(event.gamma);
		//	document.getElementById("beta").innerHTML = Math.round(event.beta);

			var betaDiff = Math.abs(Math.round(event.beta) - lastBeta )
			if (betaDiff > 10 ) {
				lastBeta = Math.round(event.beta)
				document.getElementById("beta").innerHTML = Math.round(event.beta) + " : " + betaDiff;
			}
			var gammaDiff = Math.abs(Math.round(event.gamma) - lastGamma )
			if (gammaDiff > 10 ) {
				lastGamma = Math.round(event.gamma)
				document.getElementById("gamma").innerHTML = Math.round(event.gamma) + " : " + gammaDiff;

			}

		}, true);
		
		
		
	} else {
  	alert("Sorry, your browser doesn't support Device Orientation");
	} 
}