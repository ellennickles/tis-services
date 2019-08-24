// 120000 is 2 min
// 30000 is 30 sec
// 15000 is 15 sec

var sessionDuration = 15000;
var session = true;

function paraWithText(t) {
    let tn = document.createTextNode(t);
    let ptag = document.createElement("p");
    ptag.appendChild(tn);
    return ptag;
};

function updateLog(str) {
    if (session) {
        let objDiv = document.getElementById("log");
        objDiv.appendChild(paraWithText(str));
        objDiv.scrollTop = objDiv.scrollHeight;
    } else {
        return;
    }
};

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

async function getResp(val) {
    let getResp = await fetch("/response.json?sentence=" +
        encodeURIComponent(val));
    let data = await getResp.json();
    return data["result"];
};

function startSession() {
    let start = getStats();
    let startStr = "*** Session Begin " + start + " ***";
    updateLog(startStr);

    setTimeout(() => {
        endSession()
    }, sessionDuration);
};

function endSession() {
    document.getElementById("typehere").style.display = "none";

    let end = getStats();
    let endStr = "*** Session End " + end + " ***";
    updateLog(endStr);

    session = false;

    let expired = "Session Expired"
    document.body.appendChild(paraWithText(expired));
};

function getStats() {
    let timestamp = new Date(Date.now());
    let dateTime = timestamp.toDateString() + " " + timestamp.toLocaleTimeString()
    return dateTime;
};