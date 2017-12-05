var count = 0;
var buttonActivate = document.getElementById("buttonActivate");
var runOnce = false;
randomWord();
var totalPlacesOther = 0;
var placesOther = 0;
var placesRight = 0;
var won = false;
var isRight = [true, true, true, true, true, true, true];
var isRightNumber = 0;
var answer = "";
var buttonCount = 5;
var currentWord;

function row() {
    row.prototype.newRow = function () {
        var buttonGroup = [];
        for (i = 0; i < buttonCount; i++) {
            buttonGroup[i] = document.createElement("input");
        }

        for (var i = 0; i < buttonCount; i++) {
            var k = i;
            buttonGroup[k].type = "text";
            buttonGroup[k].maxLength = 1;
            var answerForBitch = currentWord.split("");
            buttonGroup[0].value = answerForBitch[0];
            buttonGroup[0].disabled = true;
            buttonGroup[0].style.backgroundColor = "red";
            buttonGroup[k].setAttribute("id", "button" + k + "_" + count);
            container.appendChild(buttonGroup[k]);
        }
    };
}

var container = document.getElementById("container");

function activation() {

    answer = currentWord.split("");
    checkers();
    if (placesRight === buttonCount) {
        victory();
    }
    isRight = [true, true, true, true, true, true, true, true];
    totalPlacesOther = 0;
    placesOther = 0;
    placesRight = 0;
    buttonDeactivate();
    buttonActivate.innerHTML = "Activate";
    count++;
    current = "buttonRow" + count;


    if (won === false) {
        switch (count) {
            case 0:
                var current = new row();
                current.newRow();
                break;
            case 1:
                current = new row();
                current.newRow();
                break;
            case 2:
                current = new row();
                current.newRow();
                break;
            case 3:
                current = new row();
                current.newRow();
                break;
            case 4:
                current = new row();
                current.newRow();
                break;
            case 5:
                current = new row();
                current.newRow();
                break;
            default:
                buttonActivate.disabled = true;
                break;

        }
    }
    runOnce = true;

}

function buttonDeactivate() {
    if (runOnce === true && won === false) {
        for (var d = 0; d < buttonCount; d++) {
            document.getElementById("button" + d + "_" + count).disabled = true;
        }
    }
}

function randomWord() {
    var randomNummer = Math.floor((Math.random() * 470) + 1);
    currentWord = words[randomNummer];
    answer = currentWord.split("");
    console.log(answer);
}

function checkers() {
    if (runOnce == true) {
        checkerProxy();
        totalPlacesOther = buttonCount - (placesOther + placesRight);
    }
}

function checkerProxy() {

    for (var varCheck1 = 0; varCheck1 < buttonCount; varCheck1++) {
        checkPlace(varCheck1);
    }
    for (var varCheck2 = 0; varCheck2 < buttonCount; varCheck2++) {
        checkColors(varCheck2);
    }
}


function checkPlace(Number) {
    if (answer[Number] === document.getElementById("button" + Number + "_" + count).value) {
        placesRight++;
        isRightNumber = Number;
        isRight[isRightNumber] = false;
        answer[Number] = "";
        document.getElementById("button" + Number + "_" + count).style.backgroundColor = "red";
    }
}

function checkColors(Number) {
    for (var i = 0; i < 800; i++) {
        // if (i !== (Number)) {
        if (answer[i] === document.getElementById("button" + Number + "_" + count).value && isRight[Number] === true) {
            placesOther++;
            answer[i] = "";
            document.getElementById("button" + Number + "_" + count).setAttribute("style", "border-radius: 50%; background-Color: yellow;");
        }
    }

    // }
}

function victory() {
    won = true;
    buttonActivate.disabled = true;
    alert("you won!");
}

container.onkeyup = function (e) {
    var target = e.srcElement || e.target;
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
            if (next === null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
        var previous = target;
        while (previous = previous.previousElementSibling) {
            if (previous === null)
                break;
            if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
            }
        }
    }
}