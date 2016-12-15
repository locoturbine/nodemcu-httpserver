function init()
{
	if (window.DeviceOrientationEvent) {

		var lastBeta = 0;
		var lastGamma = 0 ;
		
		window.addEventListener("deviceorientation", function(event) 
		{
			document.getElementById("x").style.webkitTransform = "scaleX("+(Math.round(event.beta))+")";  
			document.getElementById("y").style.webkitTransform = "scaleY("+(Math.round(event.gamma))+")";
			document.getElementById("angle").style.webkitTransform = "rotateZ("+(Math.round(event.alpha))+"deg)";
		//	document.getElementById("gamma").innerHTML = Math.round(event.gamma);
		//	document.getElementById("beta").innerHTML = Math.round(event.beta);

			var betaDiff = Math.abs(Math.round(event.beta) - lastBeta )
			if (betaDiff >= 5 ) {
				lastBeta = Math.round(event.beta)
				document.getElementById("beta").innerHTML = Math.round(event.beta) + " : " + betaDiff;
				changeDirection(lastBeta,lastGamma);
			}
			var gammaDiff = Math.abs(Math.round(event.gamma) - lastGamma )
			if (gammaDiff >= 5 ) {
				lastGamma = Math.round(event.gamma)
				document.getElementById("gamma").innerHTML = Math.round(event.gamma) + " : " + gammaDiff;
				changeDirection(lastBeta,lastGamma);
			}

		}, true);
		
		
		
	} else {
  	alert("Sorry, your browser doesn't support Device Orientation");
	}
}

function changeDirection(beta, gamma ) {
	var speed = 0 ;
	var angle = 0 ;
	if (gamma > 0){
		angle = beta;
		speed = Math.round((1 - gamma/90) * 500);
	}
	else if (gamma < 0 ) {
		speed =  Math.round(((-1) * gamma/90 - 1) * 500);
		angle = beta ;
	}
	document.getElementById("drive").innerHTML = "speed: " + speed +  " angle: " + angle;


}
