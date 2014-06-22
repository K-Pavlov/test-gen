/// <reference path="../libs/jQuery1.11.1.js" />
/// <reference path="../libs/handlebars-v1.3.0.js" />
/// <reference path="random-generation.js" />
//var tasks = [];

function easyTaskOneTwo() {
    var templateNode = document.getElementById('template');
    var templateString = templateNode.innerHTML;
    var template = Handlebars.compile(templateString);
    var tasks = [];
    var difficulty = 1;
    for (var i = 1; i <= 5; i++) {
        tasks.push(createTaskFirstSix(2, i, 3));
    }
    // var task = createTaskFirstSix(2, 1, 3);
    var taskOneHtml = template({
        tasks: tasks
    });
    document.body.innerHTML += taskOneHtml;
}

function task(variables, expression) {
    this.variables = variables;
    this.expression = expression;
}

function variableValuePair(type, variable, operator, value) {
    this.type = type;
    this.variable = variable;
    this.operator = operator;
    this.value = value;
}

function createTaskFirstSix(varCount, taskNumber, difficulty) {
    var valueVariables = [];
    var currentTask;
    var expression = '';
    var number = 8;
    var genFunc;
    var genFuncArg = 4;

    genFunc = getCorrectRand(difficulty);


    switch (taskNumber) {
        case 1:
            if (difficulty > 1) {
                number = Math.floor((Math.random() * 6) + 1);
            }
        case 2:
            //variable generation
            for (var i = 0; i < varCount; i++) {
                valueVariables.push(generateVariable(taskNumber, varCount, i, genFunc, genFuncArg));
            }

            // expression generation
            for (var i = 0; i < varCount - 1; i++) {
                expression += generateExpressionTaskOneTwo(taskNumber, valueVariables[i]);
            }

            expression += '(' + valueVariables[varCount - 1].variable + ' ' + generateBitShift() + ' ' + number + ')';
            break;
        case 3:
        case 4:
        case 5:
            varCount *= 2;
            for (var i = 0; i < varCount / 2; i++) {
                valueVariables.push(generateVariable(1, varCount, i, genFunc, genFuncArg, null));
            }

            for (var i = varCount / 2; i < varCount; i++) {
                var index = varCount - i - 1;
                var newArray = [valueVariables[index], valueVariables[index + 1]]
                valueVariables.push(generateVariable(1, varCount, i, generateExpressionThreeToFive, taskNumber, valueVariables));
            }
            break;

    }

    currentTask = new task(valueVariables, expression);
    return currentTask;
}

function generateVariableName(number) {
    return String.fromCharCode(97 + number);
}

function generateExpressionTaskOneTwo(taskNumber, valueVariable) {
    var simpleOpration = valueVariable.variable + ' ' + generateOperation() + ' ';
    return simpleOpration;
}

function generateExpressionThreeToFive(taskNumber, valueVariables) {
    var simpleOperation = valueVariables[0].variable + ' ' + generateOperation() + ' ';
    var number = Math.floor(Math.random() * 8);
    var bitShiftOperation = '(' + valueVariables[1].variable + ' ' + generateBitShift() + ' ' + number + ')';
    return simpleOperation + bitShiftOperation;
}

function generateVariable(taskNumber, variableCount, iteration, delegate, delegateArg, delegateArg2) {
        return new variableValuePair('int', generateVariableName(iteration), ' = ', delegate(delegateArg, delegateArg2) + '<br>');
}

easyTaskOneTwo();

function getCorrectRand(diff) {
    if (diff === 1) {
        return generateEasyNumber;
    } else if (diff === 2) {
        return generateMediumNumber;
    } else if (diff === 3) {
        return generateHardNumber;
    }
}