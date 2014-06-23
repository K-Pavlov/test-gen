﻿/// <reference path="../libs/jQuery1.11.1.js" />
/// <reference path="../libs/handlebars-v1.3.0.js" />
/// <reference path="random-generation.js" />
/// <reference path="calculate-task.js" />
//var tasks = [];

function easyTaskOneTwo(difficulty) {
    var templateNode = document.getElementById('template');
    var templateString = templateNode.innerHTML;
    var template = Handlebars.compile(templateString);
    var tasks = [];
    for (var i = 1; i <= 2; i++) {
        tasks.push(createTaskOneTwo(i, difficulty));
        calculate(i, tasks[i - 1].variables, tasks[i - 1].lastVar);
    }

    for (var i = 3; i <= 5; i++) {
        tasks.push(createTaskThreeFive(i, difficulty));
        calculate(i, tasks[i - 1].variables, tasks[i - 1].lastVar);
    }

    for (var i = 6; i <= 7; i++) {
        tasks.push(createTaskSixSeven(i, difficulty));
        calculate(i, tasks[i - 1].variables, tasks[i - 1].lastVar);
    }

    for (var i = 8; i <= 10; i++) {
        tasks.push(createTaskEightTen(i, difficulty));
        calculate(i, tasks[i - 1].variables, tasks[i - 1].lastVar);
    }

    // var task = createTaskFirstSix(2, 1, 3);
    var taskOneHtml = template({
        tasks: tasks
    });

    calculate(1, tasks[0].variables, tasks[0].lastVar);

    document.getElementById('output').innerHTML = taskOneHtml;
}

//All task in easy to template way
function task(variables, lastVar, addTr) {
    this.variables = variables;
    this.lastVar = lastVar;
    this.addTr = addTr;
}

function variableValuePair(type, variable, operator, value, isExpression) {
    this.type = type;
    this.variable = variable;
    this.operator = operator;
    this.value = value;
    this.isExpression = isExpression;
}

//Task paket for generating variables and expressions
function taskPaket(valueVariables, difficulty, iteration) {
    this.valueVariables = valueVariables;
    this.difficulty = difficulty;
    this.iteration = iteration;
}

//Returns task
function createTaskOneTwo(taskNumber, difficulty) {
    var varCount = 2;
    var valueVariables = [];
    var currentTask;
    var expression = '';
    var shiftNumber = 8;
    var genFunc;
    var genFuncArg = 4;
    var showTr = false;

    showTr = checkTaskNumber(taskNumber);

    if (difficulty === 3) {
        genFunc = getCorrectRand(difficulty - 1);
    } else {
        genFunc = getCorrectRand(difficulty);
    }

    if (taskNumber === 1) {
        if (difficulty > 1) {
            shiftNumber = Math.floor((Math.random() * 6) + 1);
        }
    }

    //variable generation
    for (var i = 0; i < varCount; i++) {
        valueVariables.push(generateVariable(i, genFunc, genFuncArg, undefined, false));
    }

    // expression generation
    for (var i = 0; i < varCount - 1; i++) {
        expression += generateExpressionTaskOneTwo(new taskPaket(valueVariables[i], null, null));
    }

    expression += '(' + valueVariables[varCount - 1].variable + ' ' + generateBitShift() + ' ' + shiftNumber + ')';

    valueVariables.push(new variableValuePair('int', generateVariableName(varCount), ' = ', expression, true));

    expression = '';

    currentTask = new task(valueVariables, valueVariables[valueVariables.length - 1], showTr);
    return currentTask;
}

function createTaskThreeFive(taskNumber, difficulty) {
    var varCount = 4;
    var valueVariables = [];
    var currentTask;
    var expression = '';
    var shiftNumber = 8;
    var genFunc;
    var genFuncArg = 4;
    var showTr = false;

    showTr = checkTaskNumber(taskNumber);

    if (difficulty === 3) {
        genFunc = getCorrectRand(difficulty - 1);
    } else {
        genFunc = getCorrectRand(difficulty);
    }

    for (var i = 0; i < varCount / 2; i++) {
        valueVariables.push(generateVariable(i, genFunc, genFuncArg, undefined, false));
    }

    for (var i = varCount / 2; i < varCount; i++) {
        var index = varCount - i - 1;
        var newArray = [valueVariables[index], valueVariables[index + 1]]
        valueVariables.push(generateVariable(i, generateExpressionThreeToFive, new taskPaket(valueVariables, difficulty, i), undefined, true));
    }

    var newVaraiables = [valueVariables[varCount - 2], valueVariables[varCount - 1]];

    valueVariables.push(generateVariable(varCount, generateExpressionTaskOneTwo, new taskPaket(newVaraiables, null, null), undefined, true));

    currentTask = new task(valueVariables, valueVariables[valueVariables.length - 1], showTr);
    return currentTask;
}

//Returns task
function createTaskSixSeven(taskNumber, difficulty) {
    var varCount = 2;
    var valueVariables = [];
    var currentTask;
    var expression = '';
    var shiftNumber = 8;
    var genFunc;
    var genFuncArg = 4;
    var showTr = false;

    showTr = checkTaskNumber(taskNumber);

    if (difficulty === 1) {
        genFunc = getCorrectRand(difficulty + 1);
    } else {
        genFunc = getCorrectRand(difficulty);
    }

    if (taskNumber === 7) {
        genFuncArg = 8;
    }

    if (taskNumber === 6) {
        valueVariables.push(generateVariable(0, genFunc, genFuncArg, undefined, false));
        valueVariables.push(generateVariable(1, generateBitShiftExpression, new taskPaket(valueVariables), undefined, true));
    } else if (taskNumber === 7) {
        genFuncArg = 8;

        for (var i = 0; i < varCount; i++) {
            valueVariables.push(generateVariable(i, genFunc, genFuncArg, 'long', false));
        }

        valueVariables.push(generateVariable(varCount, generateBitShiftExpression, new taskPaket(valueVariables, difficulty), undefined, true));
    } else if (taskNumber === 8) {

    }

    currentTask = new task(valueVariables, valueVariables[valueVariables.length - 1], showTr);
    return currentTask;
}

function createTaskEightTen(taskNumber, difficulty) {
    var varCount = 3;
    var valueVariables = [];
    var currentTask;
    var expression = '';
    var shiftNumber = 8;
    var genFunc = generateDecimalNumber;
    var genFuncArg;
    var showTr = false;

    showTr = checkTaskNumber(taskNumber);

    if (difficulty === 1) {
        genFuncArg = 1000;
    } else if (difficulty === 2) {
        genFuncArg = 2000;
    } else if (difficulty === 3) {
        genFuncArg = 3000;
    }

    for (var i = 0; i < varCount - 1; i++) {
        valueVariables.push(generateVariable(i, genFunc, genFuncArg, undefined, false));
    }

    valueVariables.push(generateVariable(varCount - 1, generateBitShiftExpression, new taskPaket(valueVariables, 3), undefined, true));

    currentTask = new task(valueVariables, valueVariables[valueVariables.length - 1], showTr);
    return currentTask;
}

//Returns letter a-z
function generateVariableName(shiftNumber) {
    return String.fromCharCode(97 + shiftNumber);
}

function generateBitShiftExpression(taskPaket) {
    var operation = '';
    var bitShiftValue;
    var bitShiftSecondVal;
    if (taskPaket.difficulty === 1 || taskPaket.difficulty === 2) {
        bitShiftValue = 8;
        bitShiftSecondVal = 8;
    } else {
        bitShiftSecondVal = Math.floor(Math.random() * 9) + 1;
        bitShiftValue = Math.floor(Math.random() * 9) + 1;
    }

    if (taskPaket.valueVariables.length === 1) {
        //variable with &, |, ^ operation
        operation += taskPaket.valueVariables[0].variable + ' ' + generateOperation() + ' ';

        //generate bitshift
        operation += '(' + taskPaket.valueVariables[0].variable + ' ' + generateBitShift() + ' ' + bitShiftValue + ')';
    } else {

        operation += '(' + taskPaket.valueVariables[0].variable + ' ' + generateBitShift()
            + ' ' + bitShiftValue + ')' + ' ' + generateOperation() + ' ' + '(' +
            taskPaket.valueVariables[1].variable + ' ' + generateBitShift() + ' ' + bitShiftSecondVal + ')';
    }

    return operation;
}

//Returns string
function generateExpressionTaskOneTwo(taskPaket) {
    if (taskPaket.valueVariables[0]) {
        return taskPaket.valueVariables[0].variable + ' ' + generateOperation() + ' ' + taskPaket.valueVariables[1].variable;
    }

    var simpleOpration = taskPaket.valueVariables.variable + ' ' + generateOperation() + ' ';
    return simpleOpration;
}

//Returns string
function generateExpressionThreeToFive(taskPaket) {
    var randomNumber = Math.floor(Math.random() * 7) + 1;
    var shiftNumber;
    var simpleOperation = taskPaket.valueVariables[0].variable + ' ' + generateOperation() + ' ';

    if (taskPaket.difficulty === 3) {
        shiftNumber = randomNumber;
    } else if (taskPaket.difficulty === 2) {
        if (taskPaket.iteration % 2 === 0) {
            shiftNumber = 8;
        } else {
            shiftNumber = Math.floor(Math.random() * 7) + 1;
        }
    } else if (taskPaket.difficulty === 1) {
        if (taskPaket.iteration % 2 === 0) {
            shiftNumber = 8;
        } else {
            shiftNumber = 4;
        }
    }

    var bitShiftOperation = '(' + taskPaket.valueVariables[1].variable + ' ' + generateBitShift() + ' ' + shiftNumber + ')';
    return simpleOperation + bitShiftOperation;
}

//Retruns variable value pair class instance
function generateVariable(iteration, delegate, delegateArgs, type, isExpression) {
    if (!type) {
        type = 'int';
    }

    return new variableValuePair(type, generateVariableName(iteration), ' = ', delegate(delegateArgs), isExpression);
}

// Returns fuction pointer 
function getCorrectRand(diff) {
    if (diff === 1) {
        return generateEasyNumber;
    } else if (diff === 2) {
        return generateMediumNumber;
    } else if (diff === 3) {
        return generateHardNumber;
    }
}

function checkTaskNumber(taskNumber) {
    if (taskNumber % 2 !== 0) {
        return true;
    }
}
