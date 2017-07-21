var format = false;

function getFixedLengthDecimals(decimals) {
    if(isNaN(parseFloat(decimals))) { return null; } //NaN should not have decimals..
    if (!decimals) { return "00"; }
    while(decimals.length < 2) {
        decimals += "0";
    }
    return decimals;
}

function toString(amount, hideSign, currency, fixedDecimals) {
    if (!format) {
        throw Error("AmountFormatting.toString: Called without setting format.");
    }

    let parsedAmount = parseFloat(amount);

    if (typeof parsedAmount !== "number" || isNaN(parsedAmount)) {
        throw Error("AmountFormatting.toString: Bad input( "+amount+"("+typeof amount+")"+" )");
    }

    amount = parsedAmount;

    var isNegative = amount < 0;
    if (isNegative) {
        amount *= -1;
    }
    var decimals = Math.round(amount * 100)%100;
    if (!(decimals%10)) {
        decimals /= 10;
    } else if (decimals < 10) {
        decimals = "0"+decimals;
    }
    amount = Math.floor(amount);
    if (fixedDecimals) {
        decimals = getFixedLengthDecimals(decimals.toString());
    }

    var thousands = [];
    amount = ""+amount;
    while(amount.length) {
        thousands.unshift(amount.slice(-3));
        amount = amount.slice(0, -3);
    }

    var currencyString = thousands.join(format.thousands);
    if (decimals) {
        currencyString += format.decimal+decimals;
    }
    if (isNegative) {
        currencyString = "-" + currencyString;
    }
    if (!hideSign) {
        if (!currency) {
            currency = format.currency;
        }
        if (format.first) {
            currencyString = currency+format.separator+currencyString;
        } else {
            currencyString += format.separator+currency;
        }
    }
    return currencyString;
}


function roundHalfUpAwayFromZero(number) {
    const strNumber = number.toString();
    var negativeMultiplier, split = strNumber ? number.toString().split(".") : null;
    if (split && split.length > 2) {
        number = split[0]+"."+split[1];
    }
    negativeMultiplier = number<0?-1:1;
    number *= negativeMultiplier;

    return negativeMultiplier * Number(Number(Math.round(Number(number) * 100) / 100).toFixed(2));
}

export function fromString(string, truncate) {
    if (!format) {
        throw Error("AmountFormatting.toString: Called without setting format.");
    }
    if (typeof string !== "string") {
        throw Error("AmountFormatting.fromString: Bad input( "+string+"("+typeof string+")"+" )");
    }
    // Special case
    if (string.match(",") && !string.match(/\d/g)) {
        return 0;
    }

    // Remove everything non digit character
    string = string.replace(new RegExp("[^\\d|\\"+format.decimal+"]", "g"), "");
    string = string.split(format.decimal);

    if (truncate && string.length > 1) {
        if (string[1].length > 2) {
            string[1] = string[1].substring(0, 2);
        }
        string = string.length < 2 ? string[0] : string.shift() + "." + (string.shift()||"");
    } else {
        string = string.length < 2 ? string[0] : string.shift() + "." + string.join("");
    }

    return roundHalfUpAwayFromZero(Number(string));
}


function setFormat(newFormat) {
    function isInvalidNonDidigtCharacter(s) {
        return typeof s !== "string" ||
            s.length > 1 ||
            s.match(/\d/);
    }

    if (isInvalidNonDidigtCharacter(newFormat.decimal) ||
        isInvalidNonDidigtCharacter(newFormat.thousands) ||
        newFormat.decimal === newFormat.thousands ||
        typeof newFormat.first !== "boolean" ||
        typeof newFormat.separator !== "string" ||
        typeof newFormat.currency !== "string") {

        throw Error("AmountFormatting.setFormat: Invalid format: " + JSON.stringify(newFormat));
    }

    format = newFormat;
}

export function getTail(string) {
    if (!format) {
        throw Error("AmountFormatting.getTail: Called without setting format.");
    }
    if (typeof string !== "string") {
        throw Error("AmountFormatting.getTail: Bad input( "+string+"("+typeof string+")"+" )");
    }
    var tail = "";
    if (string.indexOf(format.decimal) >= 0) {
        var decimals = string.substr(string.indexOf(format.decimal)+1);
        decimals = decimals.match(/\d/g);
        if (decimals) {
            decimals = decimals.join("").substr(0, 2);
            var tailZeroes = decimals.match(/0*$/)[0];
            if (decimals.length === tailZeroes.length) {
                tail = format.decimal+tailZeroes;
            } else {
                tail = tailZeroes;
            }

        } else {
            tail = format.decimal;
        }
    }
    return tail;
}

export function getCaretPosition(position, string) {
    if (!format) {
        throw Error("AmountFormatting.getTail: Called without setting format.");
    }
    if (typeof position !== "number" ||
        typeof string !== "string" ||
        position < 0 ||
        string.length < position) {
        throw Error("AmountFormatting.getTail: Bad input.");
    }

    // Handle leading zeroes
    var leadingZeroesRegex = new RegExp("^0+(?!"+format.decimal+")");
    var leadingZeroes = string.match(leadingZeroesRegex);
    if (leadingZeroes) {
        leadingZeroes = leadingZeroes[0];
        position -= leadingZeroes.length;
        string = string.substr(leadingZeroes.length);
    }

    // Special case, if a decimal is the first character
    if (string[0] === format.decimal) {
        return 2;
    }

    function countDigitsAndFirstDecimalSign(s) {
        var res = 0;
        if (s.match(/\d/g)) {
            if (s.indexOf(format.decimal) >= 0) {
                // If decimals truncate 2
                var decimalSignPosition = s.indexOf(format.decimal);
                var decimals = s.substr(decimalSignPosition+1);
                decimals = decimals.match(/\d/g);
                if (decimals) {
                    decimals = decimals.join("").substr(0, 2);
                }
                s = s.substr(0, decimalSignPosition)+format.decimal+decimals;
            }
            res = s.match(/\d/g).length;
            if(s.indexOf(format.decimal) >= 0) {
                res++;
            }
        }
        return res;
    }

    var result = toString(fromString(string), true)+getTail(string);
    var before = string.substr(0, position);
    var count = countDigitsAndFirstDecimalSign(before);

    var newPosition = count;
    while(countDigitsAndFirstDecimalSign(result.substr(0, newPosition)) < count && newPosition < result.length) {
        newPosition++;
    }
    return newPosition;
}

export default {
    toString: toString,
    fromString: fromString,
    setFormat: setFormat,
    getTail: getTail,
    getCaretPosition: getCaretPosition,
    roundHalfUpAwayFromZero: roundHalfUpAwayFromZero
};
