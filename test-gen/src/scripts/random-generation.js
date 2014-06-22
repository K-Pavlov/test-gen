function generateHardNumber(digitCount) {
    var number = "0x";
    for (var i = 0; i < digitCount; i++) {
        number += generateRandomDigit();
    }

    return number;
}

function generateRandomDigit() {
    var randomDigit = Math.floor((Math.random() * 16));
    var correctDigit = getCorretDigit(randomDigit);
    return correctDigit;
}

function getCorretDigit(digit) {
    if (digit < 10) {
        return digit;
    }

    switch (digit) {
        case 10:
            return 'A';
        case 11:
            return 'B';
        case 12:
            return 'C';
        case 13:
            return 'D';
        case 14:
            return 'E';
        case 15:
            return 'F';
    }

    return digit;
}

function generateMediumNumber(digitCount) {
    var number = '0x';
    // if it's 0 the number will go like 0F0F
    // if it's 1 like F0F0
    var decision = Math.floor(Math.random() * 2);
    if (decision) {
        for (var i = 0; i < digitCount; i++) {
            if (i % 2 === 0) {
                number += '0';
            } else {
                number += generateRandomDigit();
            }
        }
    } else {
        for (var i = 0; i < digitCount; i++) {
            if (i % 2 !== 0) {
                number += '0';
            } else {
                number += generateRandomDigit();
            }
        }
    }

    return number;
}

function generateEasyNumber() {
    var number = '0x0';
    var randomDigit;
    while (!(randomDigit = generateRandomDigit()));

    number += randomDigit + '0' + randomDigit;

    return number;
}

function generateOperation() {
    var operator = Math.floor(Math.random() * 3);
    switch (operator) {
        case 0:
            return '|';
        case 1:
            return '&';
        case 2:
            return '^';
    }
}

function generateBitShift() {
    var shift = Math.floor(Math.random() * 2);
    if (shift) {
        return '>>';
    } else {
        return '<<';
    }
}

function generateDecimalNumber(maxLen) {
    return Math.floor(Math.random() * maxLen);
}