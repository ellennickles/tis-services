
function displayCase() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("caseInfo").style.display = "block";
};

function displayStatus() {
    document.getElementById("caseInfo").style.display = "none";
    document.getElementById("status").innerHTML =
        "Starting TIS Session: Communication Diagnostic for Eve Polastri..."
};