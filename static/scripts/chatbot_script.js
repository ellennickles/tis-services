// there is an overall TIS session time limit
// we also set a time limit for querying the nlp chatbot model
// when the nlp timer finishes, ordered scripted finale responses print
// ...until the overall TIS session timer ends

// 240000 is 4 min
// 210000 is 3.5 min
// 135000 is 2.25 min
// 120000 is 2 min
// 60000 is 1 min
// 30000 is 30 sec
// 10000 is 10 sec

var sessionStatus = true;
// const sessionDuration = 225; // 3 min 45 secs aka pop song length
const sessionDuration = 135; // 2 min 15 sec for 083019 demo
// const sessionDuration = 45; // testing

var nlpStatus = true;
// const nlpDuration = 135000; // duration for querying nlp model
const nlpDuration = 70000; // duration for querying nlp model for 083019 demo
// const nlpDuration = 1000; // testing

var respTime = Math.floor(Math.random() * (3000 - 1000)) + 1000; // original
// var respTime = Math.floor(Math.random() * (2700 - 1000)) + 1000; // 083019 demo

var finaleIndex = 0;
var finale = [
    "Ok, Agent Newbie. You seem like a good person. I think I can trust you. My thoughts may not be entirely clear but my intuition is sharp as always.", 
    "I have been hiding something from you. It might give you some clues about where she is.",
    "After she killed Peel, she told me an extremely elaborate plan about faking my death. She was not supposed to shoot me for real.",
    "I wasn't at my best so I didn’t take in everything she said. But I do remember she mentioned a secret flat in London where we were supposed to go afterwards.", 
    "She didn't give the address but she described the neighborhood as “not stylish.” She also said we could grab a burger closeby at a greasy restaurant in the car park.", 
    "That should give you enough information to start looking for her. My mind is starting to fade, use my information carefully, and do not trust Carolyn.",
    "I feel dizzy", 
    "Chat another time?", 
    "My head is starting to throb",
    "I can't think",
    "Hmm"];

function startSession() {
    displayChatBox();
    startSessionTimer();
    startCountdownTimer();
};

// displays the chat_session content
function displayChatBox(){
    document.getElementById("startButton").style.display = "none";
    document.getElementById("chat_session").style.display = "block";
}

// start session timer
function startSessionTimer() {
    setTimeout(() => {
        nlpStatus = false;
    }, nlpDuration);
};

// timer from: https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function startCountdownTimer() {
    var time = sessionDuration, minutes, seconds;

    var theTimer = setInterval(() => {
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let timerDisplay = document.getElementById("timer");
        timerDisplay.textContent = minutes + ":" + seconds;

        if (time === sessionDuration) {
            displaySessionStart();
        }

        if (--time <= -1) {
            time = 0;
            clearInterval(theTimer);
            endSession();
        }
    }, 1000);
};

// retrieves current date and time to print to log
function displaySessionStart() {
    let start = getStats();
    let startStr = "*** SESSION BEGIN " + start + " *** ";
    let startPos = "center";
    updateLog(startStr, startPos);
};

// receives guest input
// clears guest input field
// prints guest input to log div
// prints reponse to log div
document.querySelector("#typehere").onchange = () => {
    let inputField = document.querySelector("#typehere");
    let val = inputField.value;
    let inputPos = "displayRight"

    inputField.value = "";
    
    updateLog(val, inputPos);

    if (nlpStatus) {
        print_nlpResp(val);
    } else {
        print_finaleResp();
    };
};

// if nlpStatus is true,
// when get_nlpResp returns with a response,
// prints that to log div after a slight delay
async function print_nlpResp(val) {
    let nlpResp = await get_nlpResp(val);
    let nlpPos = "displayLeft";

    setTimeout(() => {
        updateLog(nlpResp, nlpPos);
    }, respTime);
};

// queries the chatbot nlp model for a response to guest's input 
async function get_nlpResp(val) {
    let got_nlpResp = await fetch("/response.json?sentence=" +
        encodeURIComponent(val));
    let data = await got_nlpResp.json();
    return data["result"];
};

// if nlpStatus is false,
// prints scripted repsonses to log div
function print_finaleResp() {
    let finalePos = "displayLeft";

    if (finaleIndex < finale.length && sessionStatus) {
        setTimeout(() => {
            updateLog(finale[finaleIndex], finalePos);
            finaleIndex++;
        }, respTime); 
    }

    if (finaleIndex === finale.length && sessionStatus) {
        setTimeout(() => {
            updateLog(finale[finale.length - 1], finalePos);
        }, respTime);   
    };
};

// prints to log div and at a position if specified
function updateLog(str, pos) {
    if (sessionStatus || nlpStatus) {
 
        let div = document.createElement("div");
        div.className = pos;
        div.appendChild(paraWithText(str));

        let objDiv = document.getElementById("log");
        objDiv.appendChild(div);
        objDiv.scrollTop = objDiv.scrollHeight;
    } else {
        return;
    }
};

// packages the string to print to log div
function paraWithText(t) {
    let tn = document.createTextNode(t);
    let ptag = document.createElement("p");
    ptag.appendChild(tn);
    return ptag;
};

// removes guest input field from view
// retrieves the current date and time to print to log div
// sets the finaleStatus boolean to false
// prints text at the bottom of document
function endSession() {
    document.getElementById("typehere").style.display = "none";

    let end = getStats();
    let endStr = "***  SESSION END " + end + " ***";
    let endPos = "center";
    updateLog(endStr, endPos);

    sessionStatus = false;

    let expired = "SESSION EXPIRED"
    document.getElementById("chat_session").appendChild(paraWithText(expired));
};

// returns the current date and time
function getStats() {
    let timestamp = new Date(Date.now());
    let dateTime = timestamp.toDateString() + " " + timestamp.toLocaleTimeString()
    return dateTime;
};