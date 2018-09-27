
var keys = document.querySelectorAll("#decimal, #number0, #number1, #number2, #number3, #number4, #number5, #number6, #number7, #number8, #number9, #operatorPlus, #operatorMinus, #operatorMultiply, #operatorDivide");
var expString = document.getElementById('expressionString');
var expResult = document.getElementById('expressionResult');
var lastNumString = "";
var numberType;
// design notes: reason to have just one dynamic addeventlistener is reduce repeat checking for numbers and operator keys.
keys.forEach(function (elem) {
    elem.addEventListener("click", function (event) {
        debugger;
        // 1. Check each entered key and set key type.
        switch (event.target.value) {
            case "0":
                keyType = "zero";
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                keyType = "number1-9";
                break;
            case ".":
                keyType = "decimal";
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                keyType = "operator";
                break;
            default:
                break;
        }
        // 2. Check key type first.
        // 3. Check last number string for each key type.
        switch (keyType) {
            case "number1-9":
                if (lastNumString == "0") {
                    expString.innerHTML = replaceLastCharString((expString.innerHTML), event.target.value);
                } else {
                    expString.innerHTML += event.target.value; // append
                }
                lastNumString = lastNumberString(expString.innerHTML);
                break;
            case "zero":
                if (lastNumString == "0") {
                    console.log("Do nothing. Should not show 00.");
                } else {
                    expString.innerHTML += event.target.value; // append
                }
                lastNumString = lastNumberString(expString.innerHTML);
                break;
            case "decimal":
                if (lastNumString == "") {
                    expString.innerHTML += "0."; // append
                } else {
                    //if not extra decimal then append. else do nothing.
                    if (lastNumString.includes(".") && event.target.value == ".") {
                        console.log('Do nothing. Reason: Prevent more than one decimal.');
                    } else {
                        expString.innerHTML += event.target.value; // append
                    }
                }
                lastNumString = lastNumberString(expString.innerHTML);
                break;
            case "operator":
                if (lastNumString == "") {
                    expString.innerHTML += "0" + event.target.value; // append leading zero.
                }
                else {
                    if (isLastCharAnOperator(expString.innerHTML)) {
                        expString.innerHTML = replaceLastCharString((expString.innerHTML), event.target.value);
                    } else {
                        expString.innerHTML += event.target.value; // append
                    }
                }
                lastNumString = "";
                break;
            default:
                console.log("Uncaught exception.");
                break;
        }
        evaluationExpression(expString.innerHTML, true);
    });
});
function lastNumberString(str) {
    let separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
    console.log(separators.join('|'));
    let result = str.split(new RegExp(separators.join('|'), 'g'));
    console.log(result[result.length - 1]);
    return result[result.length - 1];
}
function replaceLastCharString(str, char) {
    // optional technique: StringUtils.chop(str);
    // remarks substring method is not null-safe.
    let xStr = str.substring(0, str.length - 1);
    return xStr + char;
}
function isLastCharAnOperator(str) {
    var isLastCharOperator = false;
    var lastChar = str.substring(str.length - 1);
    var operators = ["+", "-", "*", "/",];
    for (x = 0; x < operators.length - 1; x++) {
        if (lastChar == operators[x]) {
            isLastCharOperator = true;
            break;
        }
    }
    return isLastCharOperator;
}
function removeLastChar() {
    debugger;
    expString.innerHTML = expString.innerHTML.substring(0, expString.innerHTML.length - 1);
    //expResult.innerHTML = (expString.innerHTML == "") ? "0" : evaluationExpression(temp, true);
    if (expString.innerHTML == "") {
        reset();
    } else {
        evaluationExpression(expString.innerHTML, true)
    }
}
function reset() {
    expResult.innerHTML = 0;
    expString.innerHTML = "";
    lastNumString = "";
}
function evaluationExpression(operator, isTemp) {
    debugger;
    if (!isTemp) {
        if (isLastCharAnOperator(expString.innerHTML)) {
            expString.innerHTML = expString.innerHTML.slice(0, -1);
            debugger;
        }
    }
    if (eval(expString.innerHTML) == null) { // if user key in equal "=" as first key.
        expResult.innerHTML = "0";
    } else {
        expResult.innerHTML = eval(expString.innerHTML);
    }
    if (!isTemp) {
        expString.innerHTML = "";
        lastNumString = "";
        document.getElementById('expressionResult').style.color = "white";
        document.getElementById('expressionResult').style.fontSize = "50px";
    } else {
        document.getElementById('expressionResult').style.color = "gray";
        document.getElementById('expressionResult').style.fontSize = "30px";
    }
}
