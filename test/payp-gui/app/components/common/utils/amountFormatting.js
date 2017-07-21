import { getCurrencySymbol } from './formats';

let format = false;

function getFixedLengthDecimals(decimals) {
    let result = decimals;
    if (isNaN(parseFloat(result))) { return null; } // NaN should not have decimals..
    if (!result) { return '00'; }
    while (result.length < 2) {
        result += '0';
    }
    return result;
}

/* eslint-disable no-param-reassign */ // TODO: Refactor this crap to have immutable parameters
function toString(amount, hideSign, currency, fixedDecimals) {
    if (!format) {
        throw Error('AmountFormatting.toString: Called without setting format.');
    }
    if (typeof amount !== 'number') {
        throw Error(`AmountFormatting.toString: Bad input( ${amount}(${typeof amount}) )`);
    }

    const isNegative = amount < 0;
    if (isNegative) {
        amount *= -1;
    }
    amount = Math.round(amount * 100) / 100;
    let decimals = Math.round((amount * 100) % 100);
    if (!(decimals % 10)) {
        decimals /= 10;
    } else if (decimals < 10) {
        decimals = `0${decimals}`;
    }
    amount = Math.floor(amount);
    if (fixedDecimals) {
        decimals = getFixedLengthDecimals(decimals.toString());
    }

    const thousands = [];
    amount = `${amount}`;
    while (amount.length) {
        thousands.unshift(amount.slice(-3));
        amount = amount.slice(0, -3);
    }

    let currencyString = thousands.join(format.thousands);
    if (decimals) {
        currencyString += `${format.decimal}${decimals}`;
    }
    if (isNegative) {
        currencyString = `-${currencyString}`;
    }
    if (!hideSign) {
        if (!currency) {
            currency = format.currency;
        }
        if (format.first) {
            currencyString = `${currency}${format.separator}${currencyString}`;
        } else {
            currencyString += `${format.separator}${currency}`;
        }
    }
    return currencyString;
}

function roundHalfUpAwayFromZero(number) {
    let inputNumber = number;
    const strInputNumber = inputNumber.toString();
    
    if (!strInputNumber) {
        console.warn('Incorrect number: ' + number);
    }
    
    const numberSplit = strInputNumber ? strInputNumber.split('.') : null;
    if (numberSplit && numberSplit.length > 2) {
        inputNumber = `${numberSplit[0]}.${numberSplit[1]}`;
    }
    const negativeMultiplier = inputNumber < 0 ? -1 : 1;
    inputNumber *= negativeMultiplier;

    return negativeMultiplier * Number(Number(Math.round(Number(inputNumber) * 100) / 100).toFixed(2));
}

export function fromString(string, truncate) {
    let inputString = string;
    if (!format) {
        throw Error('AmountFormatting.toString: Called without setting format.');
    }
    if (typeof inputString !== 'string') {
        throw Error(`AmountFormatting.fromString: Bad input( ${inputString}(${typeof inputString}) )`);
    }
    // Special case
    if (inputString.match(',') && !inputString.match(/\d/g)) {
        return 0;
    }

    // Remove everything non digit character
    inputString = inputString.replace(new RegExp('[^\\d|\\' + format.decimal + ']', 'g'), ''); // eslint-disable-line prefer-template, max-len
    inputString = inputString.split(format.decimal);

    if (truncate && inputString.length > 1) {
        if (inputString[1].length > 2) {
            inputString[1] = inputString[1].substring(0, 2);
        }
        inputString = inputString.length < 2 ? inputString[0] : `${inputString.shift()}.${(inputString.shift() || '')}`;
    } else {
        inputString = inputString.length < 2 ? inputString[0] : `${inputString.shift()}.${inputString.join('')}`;
    }

    return roundHalfUpAwayFromZero(Number(inputString));
}

function setFormat(newFormat) {
    function isInvalidNonDidigtCharacter(s) {
        return typeof s !== 'string' ||
            s.length > 1 ||
            s.match(/\d/);
    }

    if (isInvalidNonDidigtCharacter(newFormat.decimal) ||
        isInvalidNonDidigtCharacter(newFormat.thousands) ||
        newFormat.decimal === newFormat.thousands ||
        typeof newFormat.first !== 'boolean' ||
        typeof newFormat.separator !== 'string' ||
        typeof newFormat.currency !== 'string') {
        throw Error(`AmountFormatting.setFormat: Invalid format: ${JSON.stringify(newFormat)}`);
    }

    format = newFormat;
}

export function getTail(string) {
    if (!format) {
        throw Error('AmountFormatting.getTail: Called without setting format.');
    }
    if (typeof string !== 'string') {
        throw Error(`AmountFormatting.getTail: Bad input( ${string}(${typeof string}) )`);
    }
    let tail = '';
    if (string.indexOf(format.decimal) >= 0) {
        let decimals = string.substr(string.indexOf(format.decimal) + 1);
        decimals = decimals.match(/\d/g);
        if (decimals) {
            decimals = decimals.join('').substr(0, 2);
            const tailZeroes = decimals.match(/0*$/)[0];
            if (decimals.length === tailZeroes.length) {
                tail = format.decimal + tailZeroes;
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
        throw Error('AmountFormatting.getTail: Called without setting format.');
    }
    if (typeof position !== 'number' ||
        typeof string !== 'string' ||
        position < 0 ||
        string.length < position) {
        throw Error('AmountFormatting.getTail: Bad input.');
    }

    // Handle leading zeroes
    const leadingZeroesRegex = new RegExp('^0+(?!' + format.decimal + ')'); // eslint-disable-line prefer-template
    let leadingZeroes = string.match(leadingZeroesRegex);
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
        let res = 0;
        if (s.match(/\d/g)) {
            if (s.indexOf(format.decimal) >= 0) {
                // If decimals truncate 2
                const decimalSignPosition = s.indexOf(format.decimal);
                let decimals = s.substr(decimalSignPosition + 1);
                decimals = decimals.match(/\d/g);
                if (decimals) {
                    decimals = decimals.join('').substr(0, 2);
                }
                s = `${s.substr(0, decimalSignPosition)}${format.decimal + decimals}`;
            }
            res = s.match(/\d/g).length;
            if (s.indexOf(format.decimal) >= 0) {
                res++;
            }
        }
        return res;
    }

    const result = `${toString(fromString(string), true)}${getTail(string)}`;
    const before = string.substr(0, position);
    const count = countDigitsAndFirstDecimalSign(before);

    let newPosition = count;
    while (countDigitsAndFirstDecimalSign(result.substr(0, newPosition)) < count && newPosition < result.length) {
        newPosition++;
    }
    return newPosition;
}

/**
 * Converts the given amount with the given exchange rate (if given). Returns the normal unconverted string if
 * no exchange rate.
 */
export const getConvertedAmountString = (amount, currency, exchangeRate, exchangeCurrency) => {
    if (currency && exchangeRate && exchangeCurrency && currency !== exchangeCurrency) {
        return toString(exchangeRate * amount, false, getCurrencySymbol(exchangeCurrency), true);
    }
    return toString(amount, false, null, true);
};

export default {
    toString,
    fromString,
    setFormat,
    getTail,
    getCaretPosition,
    roundHalfUpAwayFromZero,
    getConvertedAmountString
};
