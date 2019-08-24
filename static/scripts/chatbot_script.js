// 120000 is 2 min
// 60000 is 1 min
// 30000 is 30 sec
// 15000 is 15 sec

var sessionDuration = 15000;
// var session = true;
var session;

// packages the string to print to log div
function paraWithText(t) {
    let tn = document.createTextNode(t);
    let ptag = document.createElement("p");
    ptag.appendChild(tn);
    return ptag;
};

// if the session is true, then prints to log div
function updateLog(str) {
    if (session) {
        let objDiv = document.getElementById("log");
        objDiv.appendChild(paraWithText(str));
        objDiv.scrollTop = objDiv.scrollHeight;
    } else {
        return;
    }
};

// receives user input
// passes user input value to the getResp function
// clears user input field
// and when getResp returns, prints to log div after a slight delay
document.querySelector("#typehere").onchange = async function () {
    let inputField = document.querySelector("#typehere");
    let val = inputField.value;
    inputField.value = "";
    let resp = await getResp(val);
    updateLog("> " + val)
    let respTime = Math.floor(Math.random() * (3000 - 1000)) + 1000;
    setTimeout(() => {
        updateLog(resp)
    }, respTime);
};

// queries the chatbot model for a response to user input 
async function getResp(val) {
    let getResp = await fetch("/response.json?sentence=" +
        encodeURIComponent(val));
    let data = await getResp.json();
    return data["result"];
};

// sets session boolean to true
// retrieves current date and time to print to log
// starts timer
function startSession() {
    session = true;
    let start = getStats();
    let startStr = "*** Session Begin " + start + " ***";
    updateLog(startStr);

    setTimeout(() => {
        endSession()
    }, sessionDuration);
};

// when timer ends,
// removes user input field from view
// retrieves the current date and time to print to log div
// sets the session boolean to false
// prints text at the bottom of document
function endSession() {
    document.getElementById("typehere").style.display = "none";

    let end = getStats();
    let endStr = "*** Session End " + end + " ***";
    updateLog(endStr);

    session = false;

    let expired = "Session Expired"
    document.body.appendChild(paraWithText(expired));
};

// returns the current date and time
function getStats() {
    let timestamp = new Date(Date.now());
    let dateTime = timestamp.toDateString() + " " + timestamp.toLocaleTimeString()
    return dateTime;
};