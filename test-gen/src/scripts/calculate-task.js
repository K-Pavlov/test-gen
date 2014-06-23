/// <reference path="simple-test-gen.js" />
function calculate(taskNumber, variables, expressions) {
    var result;
    if (taskNumber >= 3 && taskNumber <= 5) {
        var c = handleExpression(variables, variables[2].value);
        var d = handleExpression(variables, variables[3].value);
        var toEval = variables[4].value.replace('int', 'var');
        toEval = toEval.replace('c', c);
        toEval = toEval.replace('d', d);
        result = eval(toEval);
    } else if (taskNumber === 11 || taskNumber === 12) {
        var toEval = expressions.expression.replace(/a/g, variables[0].value);
        var toTest = eval(toEval);
        if (toTest) {
            return 1;
        } else {
            return 2;
        }
    }
    else {
        result = handleExpression(variables, expressions.value);
    }
    //console.log(expressions.value);
    return result;
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
        return a >>> b;
    }
}

function checkVariableName(currentVar, allVars) {
    for (var i in allVars) {
        if (currentVar === allVars[i].variable) {
            return parseInt(allVars[i].value);
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
                var smallerStack = [];

                while (!(variable === ')')) {
                    variable = stack.shift();
                    smallerStack.push(variable);
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