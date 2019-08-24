// there is an overall session time limit
// we also set a time limit for querying the chatbot
// went the nlp timer finishes, ordered responses start printing
// when those are finished, Eve just repeats how tired she is
// ...until the overall session timer ends

// 120000 is 2 min
// 60000 is 1 min
// 30000 is 30 sec
// 15000 is 15 sec

var sessionStatus;
let sessionDuration = 6 * 5; // seconds * 5

var nlpStatus;
var nlpDuration = 10000;

var finale = ["zero", "one", "two"]
var index = 0;

var respTime = Math.floor(Math.random() * (3000 - 1000)) + 1000;

// sets sessionStatus and nlpStatus booleans to true
// retrieves current date and time to print to log
// starts timers
function startSession() {
    sessionStatus = true;
    nlpStatus = true;

    let start = getStats();
    let startStr = "*** Session Begin " + start + " ***";
    updateLog(startStr);

    display = document.querySelector('#timer');
    startTimer(sessionDuration, display);

    setTimeout(() => {
        nlpStatus = false;
    }, nlpDuration);
};

// timer from: https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function startTimer(duration, display) {
    var time = duration, minutes, seconds;

    var theTimer = setInterval(() => {
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--time < 0) {
            time = 0;
            clearInterval(theTimer);
            endSession();
        }
    }, 1000);
}

// receives guest input
// clears guest input field
// prints guest input to log div
// prints reponse to log div
document.querySelector("#typehere").onchange = () => {
    let inputField = document.querySelector("#typehere");
    let val = inputField.value;

    inputField.value = "";

    updateLog("> " + val)

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

    setTimeout(() => {
        updateLog(nlpResp)
    }, respTime);
}

// queries the chatbot model for a response to guest input 
async function get_nlpResp(val) {
    let got_nlpResp = await fetch("/response.json?sentence=" +
        encodeURIComponent(val));
    let data = await got_nlpResp.json();
    return data["result"];
};

// prints scripted resonses to log div
function print_finaleResp() {
    if (index < finale.length && sessionStatus) {
        setTimeout(() => {
            updateLog(finale[index])
            index++
        }, respTime); 
    }

    if (index === finale.length && sessionStatus) {
        setTimeout(() => {
            console.log("scripted session expired")
            updateLog("I'm so tired");
        }, respTime);   
    };
}

// prints to log div
function updateLog(str) {
    if (sessionStatus || nlpStatus) {
        let objDiv = document.getElementById("log");
        objDiv.appendChild(paraWithText(str));
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
    let endStr = "*** Session End " + end + " ***";
    updateLog(endStr);

    sessionStatus = false;

    let expired = "Session Expired"
    document.body.appendChild(paraWithText(expired));
}

// returns the current date and time
function getStats() {
    let timestamp = new Date(Date.now());
    let dateTime = timestamp.toDateString() + " " + timestamp.toLocaleTimeString()
    return dateTime;
};