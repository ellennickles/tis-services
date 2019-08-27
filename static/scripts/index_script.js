function display_memo2() {
    document.getElementById("memo1").style.display = "none";
    document.getElementById("memo2").style.display = "block";
};

function display_memo3() {
    document.getElementById("memo2").style.display = "none";
    document.getElementById("memo3").style.display = "block";
};

function display_TIS_startScreen() {
    document.getElementById("memo3").style.display = "none";
    document.getElementById("TIS_startScreen").style.display = "block";
};

function display_caseInfo() {
    document.getElementById("TIS_startScreen").style.display = "none";
    document.getElementById("caseInfo").style.display = "block";
};

function displayStatus() {
    document.getElementById("caseInfo").style.display = "none";
    document.getElementById("startingTIS").innerHTML =
        "Starting TIS Session: Communication Diagnostic for Eve Polastri..."
};