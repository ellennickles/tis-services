// how exactly do we want to end this? 
// maybe should end after Eve's last response, so guest is not hanging
// currently Session End display is set to 1.5 secs, perhaps this should be adjusted to the reading time of the final finale statement...

// 120000 is 2 min
// 60000 is 1 min
// 30000 is 30 sec
// 15000 is 15 sec

var nlpDuration = 10000;
var nlpStatus;
var finaleStatus;
var finale = ["zero", "one", "two"]
var index = 0;
var respTime = Math.floor(Math.random() * (3000 - 1000)) + 1000;

// sets session boolean to true
// retrieves current date and time to print to log
// starts timer
function startSession() {
    nlpStatus = true;
    let start = getStats();
    let startStr = "*** Session Begin " + start + " ***";
    updateLog(startStr);

    setTimeout(() => {
        nlpStatus = false;
        finaleStatus = true;
    }, nlpDuration);
};

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
    }; 

    if (finaleStatus) {
        print_finaleResp();
    };
};

// if nlpStatus is true,
// when get_nlpResp returns with a response,
// prints that to log div after a slight delay
async function print_nlpResp(val) {
    let nlpResp = await get_nlpResp(val);
    // let respTime = Math.floor(Math.random() * (3000 - 1000)) + 1000;

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

// if finaleStatus is true,
// prints to log div from an array of scripted responsess
function print_finaleResp() {
    console.log(finale[index]);

    // let respTime = Math.floor(Math.random() * (3000 - 1000)) + 1000;
    setTimeout(() => {
        updateLog(finale[index])
        index++

        if (index === finale.length) {
            setTimeout(() => {
                console.log("session expired")
                endSession();
            }, 1500);   
        };

    }, respTime);

    // keep this here if we want to end after user's input
    // if (index === finale.length) {
    //     console.log("session expired")
    //     endSession();
    // }
}

// prints to log div
function updateLog(str) {
    if (nlpStatus || finaleStatus) {
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

    finaleStatus = false;

    let expired = "Session Expired"
    document.body.appendChild(paraWithText(expired));
}

// returns the current date and time
function getStats() {
    let timestamp = new Date(Date.now());
    let dateTime = timestamp.toDateString() + " " + timestamp.toLocaleTimeString()
    return dateTime;
};