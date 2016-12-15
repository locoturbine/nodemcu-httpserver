/**
 * Created by fcia on 12/15/16.
 */
var xmlHttp = null;
const START = 128;  // 0
const BAUD = 129;  // 1
const CONTROL = 130;  // 0
const SAFE = 131;  // 0bb
const FULL = 132;  // 0
const POWER = 133;  // 0
const SPOT = 134;  // 0
const CLEAN = 135;  // 0
const MAX = 136;  // 0
const DRIVE = 137;  // 4
const MOTORS = 138;  // 1
const LEDS = 139;  // 3
const SONG = 140;  // 2N+2
const PLAY = 141;  // 1
const SENSORS = 142;  // 1
const DOCK = 143;  // 0
const PWMMOTORS = 144; // 3
const DRIVEWHEELS = 145; 	// 4
const DRIVEPWM = 146;  // 4
const STREAM = 148;  // N+1
const QUERYLIST = 149; // N+1
const STOPSTARTSTREAM = 150;  // 1
const SCHEDULINGLEDS = 162; 	// 2
const DIGITLEDSRAW = 163; 	// 4
const DIGITLEDSASCII = 164;	// 4
const BUTTONSCMD = 165; // 1
const SCHEDULE = 167;  // n
const SETDAYTIME = 168; // 3

const DEFAULT_SPEED = 200;
const wheelbase = 258;
var millimetersPerDegree = (wheelbase * Math.PI / 360.0);
var speed = DEFAULT_SPEED;

function sendCommand(command) {
    var url = "roomba_controller.lua?command=" + command;
    console.log("URL: " + url);
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = processRequest;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function drive(velocity, radius) {
    console.log("drive( " + velocity + " , " + radius + ")");
    var cmd32bit = [DRIVE, (velocity >>> 8), (velocity & 0xff),
        (radius >>> 8), (radius & 0xff)];
    var cmd = new Uint8Array(cmd32bit);
    console.log("cmd 8-bit: " + cmd);
    sendCommand(cmd);
}


function goStraightAt(velocity) {
    console.log("goStraightAt( " + velocity + ")");
    if (velocity > 500) velocity = 500;
    if (velocity < -500) velocity = -500;
    drive(velocity, 0x8000);
}
function goForward() {
    console.log("goForward()");
    goStraightAt(speed);

}
function goBackwards() {
    console.log("goBackwards()");
    goStraightAt(-speed);

}

/**
 *
 */
function turnLeft() {
    turn(129);
}
function turnRight() {
    turn(-129);
}
function turn( radius ) {
    drive( speed, radius );
}

/**
 * Spin right or spin left a particular number of degrees
 * @param angle angle in degrees,
 *              positive to spin left, negative to spin right
 */
function spin( angle ) {
    if( angle > 0 )       spinLeft( angle );
    else if( angle < 0 )  spinRight( -angle );
}
/**
 * Spin left a specified angle at a specified speed
 * @param angle angle in degrees, positive
 */
function spinLeft(  angle ) {
    if( angle<0 ) return;
    console.log("millimetersPerDegree: " + millimetersPerDegree);
    console.log("angle  " + angle );
    console.log(" speed : " +   speed );
    var pausetime = Math.abs( millimetersPerDegree * angle / speed );

    spinLeftAt( Math.abs(speed) );
    console.log("sleeping for: " + pausetime*1000);
    pause(pausetime*1000).then(() => {
        stop();
});

}
/**
 * Spin right the current speed for a specified angle
 * @param angle angle in degrees, positive
 */
function spinRight(  angle ) {
    if( angle < 0 ) return;
    var pausetime = Math.abs( millimetersPerDegree * angle / speed );
    spinRightAt( Math.abs(speed) );
    pause(pausetime*1000).then(() => {
        stop();
});
}

/**
 * Spin in place anti-clockwise, at the current speed
 */
function spinLeft() {
    spinLeftAt( speed );
}

/**
 * Spin in place clockwise, at the current speed
 */
function spinRight() {
    spinRightAt( speed );
}

/**
 * Spin right or spin left at a particular speed
 * @param speed to spin at,
 *              positive to spin left, negative to spin right
 */
function spinAt( speed ) {
    if( speed > 0 )       spinLeftAt( speed );
    else if( speed < 0 )  spinRightAt( -speed );
}
/**
 * Spin in place anti-clockwise, at the current speed.
 * @param aspeed speed to spin at
 */
function spinLeftAt( aspeed) {
    drive( aspeed, 1 );
}
/**
 * Spin in place clockwise, at the current speed.
 * @param aspeed speed to spin at, positive
 */
function spinRightAt( aspeed) {
    drive( aspeed, -1 );
}

function pause (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function stop() {
    console.log("Stop!");
    drive( 0, 0 );
}




function sendDrive(direction) {
    if (direction == 'FORWARD')
        goForward();
    else if (direction == 'BACKWARD')
        goBackwards();
    else if (direction == 'LEFT')
        turnLeft();
    else if (direction == 'RIGHT')
        turnRight();
    else if (direction == 'SPIN LEFT')
        spinLeft();
    else if (direction == 'SPIN RIGHT')
        spinRight();

}

function processRequest() {
    if (xmlHttp.readyState == 0) {
        document.getElementById("label").innerHTML = 'Initalizing...';
        document.getElementById("label").className = "initalizing";
    }
    else if (xmlHttp.readyState == 1) {
        document.getElementById("label").innerHTML = 'Server connection established.';
        document.getElementById("label").className = "connection";
    }
    else if (xmlHttp.readyState == 2) {
        document.getElementById("label").innerHTML = 'Request received.';
        document.getElementById("label").className = "received";
    }
    else if (xmlHttp.readyState == 3) {
        document.getElementById("label").innerHTML = 'Processing request.';
        document.getElementById("label").className = "processing";
    }
    else if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            document.getElementById("label").innerHTML = xmlHttp.responseText;
            document.getElementById("label").className = "ok";
            sleep(300);
            document.getElementById("label").className = "start";
        }
        else if (xmlHttp.status == 400) {
            document.getElementById("label").innerHTML = 'Bad request.';
            document.getElementById("label").className = "bad";
        }
    }
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}