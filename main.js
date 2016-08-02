process.title = 'SleepyBot';

if (process.argv[2] != undefined) {
var cmdarg = process.argv[2];
}
if (process.argv[3] != undefined) {
var cmdline = process.argv[3];
}
 
if (cmdarg == "-h" || cmdarg == "--help" || cmdarg == "-help" || cmdarg == "?" || cmdarg == "-?") {
    console.log("\nUsage:  nodejs filename.js [-r channel]\n");
    process.exit(1);
} else if (cmdarg == "-r") {
    if (cmdline != undefined) {
    var room = cmdline;
} else {
    console.log("\nUsage:  nodejs filename.js [-r channel]\n");
    process.exit(1);
    }
} else if (cmdarg != undefined) {
    console.log("\nUsage:  nodejs filename.js [-r channel]\n");
    process.exit(1);
} else {
    var room = "programming";
}
 
 
 
var userName = "SleepyBot";
var tripCode = "00x0033xxx9"; //Change secretpass to a unique password
 
var HackChat = require("hack-chat");
var d, bl, g = 0;
var hour, mins, secs = 0;
var marking = 0;
var fs = require("fs");
var ts = require("fs");
var sys = require("sys");
var path = require("path");
var control = true;
var toOutput = "";

//SleepyKev added
var afknickarr=[];
var afktriparr=[];
 
var chat = new HackChat.Session(room, (userName + "#" + tripCode));
var blessed = require('blessed');
 
/**
* Screen Layout
*/
 
var screen = blessed.screen({
dockBorders: 'true'
});
 
 
var chatIn = blessed.textarea({
 
bottom: '0',
left: 'center',
width: '100%',
height: '20%',
label: userName,
border: {
type: 'line'
},
style: {
fg: 'green',
bg: 'black',
border: {
fg: '#ffffff'
}
}
 
});
 
var consoleBox = blessed.textarea({
 
bottom: '0',
left: 'center',
hidden: 'true',
width: '100%',
height: '20%',
label: "Console",
border: {
type: 'bg',
ch: '#'
},
style: {
fg: 'green',
bg: 'black',
border: {
fg: '#ffffff'
}
}
 
});
 
 
var chatBox = blessed.log({
top: '0',
left: '0',
width: '80%',
height: '82%',
content: 'Bot for hack.chat, made by {bold}BlackHat{/bold}! Uses the {bold}blessed{/bold} library.\n\nPress {bold}ENTER{/bold} to type, press {bold}ESC{/bold} to quit typing\nPress {bold}ESC{/bold} again to send the message. Press {bold}Q{/bold} to quit.\nTo show and hide the side pane, use {bold}SPACE{/bold}. Scroll with arrow keys.\n\n\n',
tags: true,
label: 'hack.chat/?' + room,
alwaysScroll: 'true',
scrollable: 'true',
scrollbar: {
bg: 'green',
fg: 'green'
},
border: {
type: 'line'
},
style: {
fg: 'white',
bg: 'black',
border: {
fg: '#ffffff'
}
}
});
 
var onlineBox = blessed.list({
top: '0',
right: '0',
width: '20%',
height: '82%',
content: '',
tags: true,
label: 'Online Users',
/*
alwaysScroll: 'true',
scrollable: 'true',
scrollbar: {
bg: 'green',
fg: 'green'
},
*/
border: {
type: 'line'
},
selected: {
bg: 'red'
},
item: {
bg: 'red'
},
style: {
fg: 'white',
bg: 'black',
border: {
fg: '#ffffff'
}
}
});
 
screen.append(onlineBox);
screen.append(chatBox);
screen.append(consoleBox);
screen.append(chatIn);
chatIn.focus();
 
function rand(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function start() {
 
setInterval(function() {
screen.render();
}, 200);
 
}
 
/**
* Main
*/
 
function irlTime() {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();
 
if (hour < 10) {
hour = "0" + hour;
}
if (mins < 10) {
mins = "0" + mins;
}
if (secs < 10) {
secs = "0" + secs;
}
return ("[" + hour + ":" + mins + ":" + secs + "] ");
}
 
var ChatListen = function() {};
 
function main() {
screen.on('keypress', function(ch, key) {
if (key.name === 'q' || key.name === 'C-c' || key.name === 'S-c') {
return process.exit(0);
}
if (key.name === 'space') {
onlineBox.toggle();
if (onlineBox.hidden) {
    chatBox.width = '100%';
    return 0;
} else {
    chatBox.width = '80%';
    return 1;
}
 
}
if (key.name === 'c') {
consoleBox.toggle();
chatIn.toggle();
return 0;
}
if (key.name === 'up') {
return chatBox.scroll(-1);
}
if (key.name === 'down') {
return chatBox.scroll(1);
}
if (key.name === 'enter') {
if (chatIn.hidden === false) {
    return chatIn.readInput();
} else {
    return consoleBox.readInput();
}
}
if (key.name === 'escape') {
if (chatIn.hidden === false) {
    if (chatIn.value !== "") {
        chat.sendMessage(chatIn.value);
        return chatIn.clearValue();
    }
} else {
    if (consoleBox.value !== "") {
        var cmd = consoleBox.value;
        if (cmd === 'leave') {
            chat.leave();
            chatBox.pushLine(irlTime() + userName + " {bold}(you){/bold} left.");
            onlineBox.clearItems();
 
        }
        if (cmd.substring(0, 4) === 'join' && cmd.substring(5, cmd.length) != undefined && cmd.substring(5, cmd.length) != "") {
            room = cmd.substring(5, cmd.length);
            chat = new HackChat.Session(room, (userName + "#" + tripCode));
            chatBox.pushLine(irlTime() + userName + " {bold}(you){/bold} joined channel ?" + room + ".");
            ChatListen();
        }
        if (cmd === 'control') {
            if (control) {
                control = false;
                chatBox.pushLine(irlTime() + "Bot control {bold}off{/bold}.");
            } else {
                control = true;
                chatBox.pushLine(irlTime() + "Bot control {bold}on{/bold}.");
            }
        }
        return consoleBox.clearValue();
    }
}
 
 
}
 
});
 
 
return start();
 
}
 
main();
 
var lastMessage = new Date().getTime();
var lastQuote = new Date().getTime();
 
 
 
function include(arr, obj, markIt) {
    for (i = 0; i < arr.length; i++) {
        if (markIt) {
            marking = i;
        }
        if (arr[i] == obj) {
            return true;
        }
    }
}
 
 
 
function saveSend(message, latexify) {
lastMessage = new Date().getTime();
if (latexify != 0) {
message = message.replace(/~/g, "\\ ");
message = message.replace(/\^/g, "\\ ");
message = message.replace(/\\/g, "\\ ");
message = message.replace(/ /g, "\\ ");
message = message.replace(/_/g, "\\ ");
message = message.replace(/\?/g, "? ");
message = message.replace(/{/g, "");
message = message.replace(/}/g, "");
if (latexify === 1) {
    message = message.replace(/\\\\/g, "\\");
    message = message.replace(/\$/g, "\\$");
    message = message.replace(/\>/g, "\\>");
    message = message.replace(/\</g, "\\<");
    message = message.replace(/#/g, "\\#");
    message = message.replace(/%/g, "\\%");
    message = message.replace(/&/g, "\\&");
} else {
    message = message.replace(/\|/g, "\\ ");
    message = message.replace(/\$/g, "\\ ");
    message = message.replace(/\>/g, "\\ ");
    message = message.replace(/\</g, "\\ ");
    message = message.replace(/#/g, "\\ ");
    message = message.replace(/%/g, "\\ ");
    message = message.replace(/&/g, "\\ ");
    message = message.replace(/\\/g, "\\ ");
}
}
 
if (latexify === 1) {
 
message = "$" + message + " $";
 
d = 0;
for (i = 0; i < message.length; i++) {
    d++;
    if (d > 80 && message.substring(i, i + 1) === " ") {
        message = message.substring(0, i) + " $ \n $ ~ " + message.substring(i + 1, message.length)
        d = 0;
    }
}
} else if (latexify === 2) {
message = "$\\text\{" + message + "\}$";
} else if (latexify === 3) {
message = "$\\tiny\{\\text\{" + message + "\}\}$";
} else if (latexify === 4) {
message = "$\\small\{\\text\{" + message + "\}\}$";
} else if (latexify === 5) {
message = "$\\large\{\\text\{" + message + "\}\}$";
} else if (latexify === 6) {
message = "$\\huge\{\\text\{" + message + "\}\}$";
}
chat.sendMessage(message);
}
 
function saveInvite(nickname) {
chat.invite(nickname);
}
 
function centerText(line, width) {
var output = "";
for (var i = 0; i < (width - line.length) / 2 - 1; i++) {
output = output + ' ';
}
output = output + line;
for (var i = 0; i < ((width - line.length) / 2 + 1); i++) {
output = output + ' ';
}
if (line.length % 2 == 1) {
output = output.substring(0, output.length - 1);
}
return output;
}
 
//** CHAT LISTENERS  **//
 
ChatListen = function() {
 
chat.on("ratelimit", function(time) {
chatBox.pushLine("####################\n!!! RATE LIMITED !!!\n####################");
});
 
chat.on("invited", function(nick, channel, time) {
chatBox.pushLine("### Sent invitation to channel: ?" + channel + " for " + nick + " ###");
});
 
chat.on("invitation", function(nick, channel, time) {
chatBox.pushLine("### Got invited to channel: ?" + channel + " by " + nick + " ###");
});
 
chat.on("warn", function(text) {
chatBox.pushLine("*WARN*: " + text);
});
 
chat.on("error", function(err) {
chatBox.pushLine("ERROR: " + err);
});
 
chat.on("banned", function(time) {
chatBox.pushLine("!!! {bold}BANNED{/bold}: You're are banned. !!!");
});
 
chat.on("info", function(text) {
chatBox.pushLine("*INFO*: " + text);
});
 
chat.on("nicknameInvalid", function(time) {
chatBox.pushLine("\n" + "\n\n!!! This nickname has invalid characters! (" + userName + ")");
process.exit()
});
 
chat.on("nicknameTaken", function(time) {
chatBox.pushLine("\n" + "\n\n!!! Someone has this bot's nickname and is in the channel! (" + userName + ") !!!\n\n");
process.exit()
});
 
chat.on("onlineSet", function(nicks) {
chatBox.pushLine("\n" + irlTime() + userName + " {bold}(you){/bold} joined.");
onlineBox.add("");
for (var p = 0; p < nicks.length; p++) {
    if (nicks[p] === "BlackHat" || nicks[p] === "WhiteHat" || nicks[p] === userName) {
        onlineBox.add("{bold}" + nicks[p] + "{/bold}");
    } else {
        onlineBox.add(nicks[p]);
    }
}
});
 
chat.on("onlineAdd", function(nick) {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();
 
if (hour < 10)
    hour = "0" + hour;
if (mins < 10)
    mins = "0" + mins;
if (secs < 10)
    secs = "0" + secs;
 
chatBox.pushLine(irlTime() + nick + " joined.");
//Highlight certain usernames
if (nick === "BlackHat" || nick === "WhiteHat" || nick === userName || trip === "PASwd4") {
    onlineBox.add("{bold}" + nick + "{/bold}");
} else {
    onlineBox.add(nick);
}
});
 
chat.on("onlineRemove", function(nick) {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();
 
if (hour < 10)
    hour = "0" + hour;
if (mins < 10)
    mins = "0" + mins;
if (secs < 10)
    secs = "0" + secs;
 
chatBox.pushLine(irlTime() + nick + " left.");
 
 
for (var ite = 0; ite < onlineBox.items.length; ite++) {
 
    var checkingNick = escape(onlineBox.items[ite].getLines());
    if (checkingNick == nick || checkingNick == "%1B%5B1m" + nick + "%1B%5B22m") {
        onlineBox.removeItem(ite);
    }
 
}
 
 
});
 
 
/*//////   STARTS HERE   //////*/
 
chat.on("chat", function(nick, text, time, isAdmin, trip) {
 
 
if (trip === "undefined") {
 
    trip = "NONE";
 
    chatBox.pushLine(irlTime() + "       # " + nick + ": " + text);
 
} else {
 
    chatBox.pushLine(irlTime() + trip + " # " + nick + ": " + text);
 
}

/*
**
	//Global Initialization
**
*/ 



toOutput = "";
// Checks if the last message was sent in less than 4 seconds and if the message
// Wasn't by the bot itself, as well as if controls are turned off
if (lastMessage - new Date().getTime() < -4000 && nick != userName && control) {



//SleepyKev, commands go in here.
 
    //SleepyKev, Example command.

	//initialization
var trigger=':';
var prefix=text.indexOf(trigger,0);
var space=text.indexOf(' ',trigger.length);
var ucommand=text.substring(prefix + trigger.length).trim();
var checkcommand=text.substring(trigger.length,ucommand).trim();
var param=text.substring(space).trim();
var mention='@SleepyKev';
var rtloverride=':shoot taka taka wep wep wep ‮';

secureAlphaNumeric = function(str){
  return str.replace(/[^a-z0-9\+\/ _=]/gi,'');
}

secureNumeric = function(str){
  return str.replace(/[^0-9\.]/gi,'');
}


//param is extra text
//ucommand is command
if(space == -1){
	var ucommand=text.substring(prefix+trigger.length).trim();
	var param=null;
}else{
	var ucommand=text.substring(prefix+trigger.length,space).trim();
	var param=text.substring(space).trim();
}
//afk welcome back
if(afknickarr.length>-1 && afktriparr.length>-1) {
	var indextrip = afktriparr.indexOf(trip);		//sender trip
	var indexnick = afknickarr.indexOf(nick);		//sender nick
	
	if(indextrip > -1 && indextrip > -1) {
		//removing afk
		afktriparr.splice(indextrip,1);
		afknickarr.splice(indextrip,1);
		return saveSend('@' + nick + '! Welcome back!', 0);
	}
}


if(checkcommand==trigger){

	if(ucommand=='hi'){
		return saveSend('Hello!', 0);
	}
	if(ucommand=='help' || ucommand=='h' || ucommand == 'hlp'){
		return saveSend('Commands are | '+trigger+'hi | '+trigger+'about | '+trigger+'test [extra] | '+trigger+'afk | '+trigger+'shoot [extra]', 0);
	}
	if(ucommand=='about'){
		return saveSend('**SleepyBot** v0.0.01\nSpecial Thanks to: @BlackHat <333\n@DeepComa for shoot ASCII', 0);
	}
	if(ucommand=='afk'){
		if(afknickarr.length>-1 && afktriparr.length>-1) {
			
			var indextrip = afktriparr.indexOf(trip);		//sender trip
			var indexnick = afknickarr.indexOf(nick);		//sender nick

			if(indextrip > -1 && indextrip > -1) {
				//already afk
				//for(i=0;i<afknickarr.length;i++){
				//	return saveSend(afknickarr[i]+ "#" +afktriparr[i], 0);
				//}
			} else {
				afknickarr.push(nick);
				afktriparr.push(trip);
			
				//afk list
				//for(i=0;i<afknickarr.length;i++){
				//console.log(afknickarr[i] + " " + afktriparr[i]);
				//}
				
				//removing afk
				//if(index>-1){
				//afktriparr.splice(index,1);
				//afknickarr.splice(index,1);
				//}
				return saveSend('@' + nick + ' is now AFK. *under construction', 0);
			}
		}
		
		
	}
	if(ucommand=='test'){
		if(param==null || param==""){
			return saveSend('Hi ' + nick + ' ' + trip + ' your command is "' + ucommand + '" with no extra.', 0);
		} else {
			return saveSend('Hi ' + nick + ' ' + trip + ' your command is "' + ucommand + '" and you entered extra "' + param + '"', 0);
		}
	}
	
	if(ucommand=='shoot'){
		var shoot = 'ascii/shoot2.txt';
// Read the file and print its contents.
var fs = require('fs')
  , filename = shoot;
fs.readFile(filename, 'utf8', function(err, data) {
  if(param==null || param==""){
	    return saveSend(data + " pew pew",0 );
	  } else {
  return saveSend(data + " " + param + " pew pew",0 );
	  }
});
		
	}


   
}
//SleepyKev, commands above here ^
 
} else if (control === false) {
    if (text.substring(0, 1) === "`") {
        saveSend("* I'm not taking any commands right now *", 0);
    }
} else if (nick === userName) {
    //This is the bot's own message, disregarding
} else {
    chatBox.pushLine("{bold}### Messages are being sent too fast, ignoring ###{/bold}");
}
 
});
 
chat.on("joining", function() {
 
//Message to be sent on joining a room, one after a 3000 delay after the other, this stuff was left by Rhondonize
setTimeout(function() {
    //saveSend("I'M ON",0);
    setTimeout(function() {
        //saveSend("AND READY FOR ACTION.",0);
    }, 3000)
}, 3000)
 
setInterval(function() {
    chat.ping(); //KEEP ALIVE
}, 0.4 * 60 * 1000);
});
}
//Runs the function to listen for content from the websocket through hackchat's session
ChatListen();
//});
