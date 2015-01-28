var clockBlock = "|||||||||||||||||||||||||||||||||||||||";
var friendBlock = "|||||||||||||||||||||";
var gametitle = "Jokimaan sankari";
var kello, friends, rng;
var running = false;
var runfriends = false;
var muted = false;
var player = {
	pname:"Player",
	exp:0,
	level:1,
	money:0,
	friends:0,
	saveversion:VERSION};

var VERSION = 0.02;
var EXPCURVE = 10 + (player.level * 2) - player.friends;

function saveChar(){
	localStorage.setItem('player', JSON.stringify(player));
	console.log("Saved");
	appendLog("Character saved..");
	initInfo();
}

function loadChar(){
	var localData = JSON.parse(localStorage.getItem('player'));
	player = localData;
	console.log("Loaded, save version: " + player.saveversion);
	document.getElementById("log").value = "Character loaded.";
	initInfo();
	if (player.saveversion != VERSION){
		console.log("Save version very old");
		appendLog(" Character file corrupted..");
		initInfo();
	}
}

function startTimer(){
	if (running == false){
		appendLog("You head out to the wilderness..");
		kello = setInterval(function(){grindExp()},1000);
		running = true;
		document.getElementById("button").innerHTML = "Stop";
	}
	else{
		clearInterval(kello);
		running = false;
		appendLog("You stop wandering around for the moment..");
		document.getElementById("button").innerHTML = "Grind";
	}
}

function findFriends(){
	if (runfriends == false){
		appendLog("Flinging your coin purse like Bill Gates, you start looking for a friend..");
		friends = setInterval(function(){grindFriends()}, 500);
		runfriends = true;
		document.getElementById("friendbutton").innerHTML = "Stop";
	}
	else{
		clearInterval(friends);
		runfriends = false;
		document.getElementById("friendbutton").innerHTML = "Search for Friends";
		appendLog("You quit your hopeless search for a friend..");
	}
}

function grindExp() {
	initInfo();
	clockBlock = clockBlock.substr(0, clockBlock.length - 1);
    document.getElementById("timeri").innerHTML = clockBlock;
    rng = randomInt(1,10);
    if (rng >= 9){
    	grantExp(2);
    	document.getElementById("exp").innerHTML = player.exp;
    }
    if (rng == 3){
    	player.money+=randomInt(1,3);
    	playSfx("coinsfx");
    }
    if (clockBlock.length<1){
    	fillClockBlock();
    	document.getElementById("timeri").innerHTML = clockBlock;
    	grantExp(7);
    }
}

function grindFriends() {
	initInfo();
	friendBlock = friendBlock.substr(0, friendBlock.length - 1);
	document.getElementById("friendtimer").innerHTML = friendBlock;
	rng = randomInt(1,10);
	if (rng == 8 && player.money > 10){
		player.friends += 1;
		player.money -= 10;
		appendLog("You bought a friend for 10 gold pieces..");
	}
	if (friendBlock.length<1){
    	fillFriendBlock();
    	document.getElementById("friendtimer").innerHTML = friendBlock;
    	appendLog("You quit your hopeless search for a friend..");
    	grantExp(1);
    	clearInterval(friends);
    	runfriends = false;
		document.getElementById("friendbutton").innerHTML = "Search for Friends";
	}
}

function grantExp(am){
	player.exp += am;
	if (player.exp >= EXPCURVE){
		player.level += 1;
		document.getElementById("level").innerHTML = player.level;
		appendLog("You leveled up to " + player.level + "!");
		player.exp -= EXPCURVE;
		playSfx("levelupsfx");
	}
}

function writeLog(text){
	document.getElementById(" log").value = text;
}

function checkLogForWord(word){
	if (document.getElementById("log").value.lastIndexOf(word) == -1){ 
		return false;
		console.log(document.getElementById("log").value.lastIndexOf(word));
	}
	else{ 
		return true;
		console.log(document.getElementById("log").value.lastIndexOf(word));
	}
}

function playSfx(sfx){
	if (muted == false) document.getElementById(sfx).play();
}

function mute(){
	if (muted == false){
	muted = true;
	document.getElementById("mutebutton").innerHTML = "Unmute";
	appendLog("Sounds muted..")
	}
	else if (muted == true){
	muted = false;
	document.getElementById("mutebutton").innerHTML = "Mute";
	appendLog("Sounds resumed..");
	}
}

function appendLog(text){
	if (document.getElementById("log").value.length > 200) document.getElementById("log").value = "";
	document.getElementById("log").value += " || " + text;
}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function fillClockBlock(){
	clockBlock = "|||||||||||||||||||||";
}

function fillFriendBlock(){
	friendBlock = "|||||||||||||||||||||";
}

function initInfo(){
	document.getElementById("gametitle").innerHTML = gametitle;
	document.getElementById("friendtimer").innerHTML = friendBlock;
	document.getElementById("timeri").innerHTML = clockBlock;
	document.getElementById("exp").innerHTML = player.exp;
	document.getElementById("level").innerHTML = player.level;
	document.getElementById("money").innerHTML = player.money;
	document.getElementById("friends").innerHTML = player.friends;
	document.getElementById("versio").innerHTML = VERSION;
}
