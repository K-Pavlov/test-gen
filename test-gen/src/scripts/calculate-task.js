/// <reference path="simple-test-gen.js" />
function calculate(taskNumber, variables, lastVariable) {
    if (taskNumber === 1 || taskNumber === 2) {
        var result = handleExpression(variables, lastVariable.value);
        console.log(result);
    } else if (taskNumber >= 8 || taskNumber <= 10) {

    }
}

function handleExpression(variables, expression) {
    var stack = [];
    var value;
    var i = 0;
    while (i < expression.length + 1) {
        if (checkOperator(expression[i])) {
            stack.push(expression[i]);
        } else if (checkBitWise(expression[i], expression[i + 1])) {
            stack.push(expression[i] + expression[i + 1]);
        } else if (value = checkVariableName(expression[i], variables)) {
            stack.push(value);
        }

        if (!isNaN(parseInt(expression[i]))) {
            var builder = '';
            while (!isNaN(parseInt(expression[i]))) {
                builder += expression[i];
                i++;
            }

            stack.push(parseInt(builder));
        } else {
            i++;
        }
    }
    return calculateStack(stack);
}

function checkOperator(symbol) {
    if (symbol === '&' || symbol === '|' || symbol === '^'
        || symbol === '(' || symbol === ')') {
        return true;
    }

    return false;
}

function checkBitWise(symbol, nextSymbol) {
    if ((symbol === '>' && nextSymbol === '>') || (symbol === '<' & nextSymbol === '<')) {
        return true;
    }

    return false;
}

function doOperation(a, b, operation) {
    if (operation === '|') {
        return a | b;
    } else if (operation === '&') {
        return a & b;
    } else if (operation === '^') {
        return a ^ b;
    } else if (operation === '<<') {
        return a << b;
    } else if (operation === '>>') {
        return a >> b;
    }
}

function checkVariableName(currentVar, allVars) {
    for (var i in allVars) {
        if (currentVar === allVars[i].variable) {
            return parseInt(allVars[i].value.split('<')[0]);
        }
    }

    return false;
}

function calculateStack(stack) {
    var operator;
    var brace;
    var firstValue;
    var secondValue;
    var moment;

    while (stack.length) {
        var variable = stack.shift();
        if (checkOperator(variable)) {
            if (variable === '(') {
                var startBrackIndex = stack.indexOf('(');
                var closingBracketIndex = stack.indexOf(')');
                var smallerStack = [];

                for (var i = startBrackIndex; i < closingBracketIndex - 1; i++) {
                    smallerStack.push(stack.shift());
                }

                if (firstValue) {
                    secondValue = calculateStack(smallerStack);
                    moment = doOperation(firstValue, secondValue, operator);
                    firstValue = undefined;
                    secondValue = undefined;
                } else {
                    firstValue = calculateStack(smallerStack);
                }
            } else {
                operator = variable;
            }

        } else if (checkBitWise(variable[0], variable[1])) {
            operator = variable;
        } else {  // Value case
            if (firstValue) {
                secondValue = variable;
                moment = doOperation(firstValue, secondValue, operator);
                firstValue = undefined;
                secondValue = undefined;
            } else {
                firstValue = variable;
            }
        }
    }

    return moment;
}