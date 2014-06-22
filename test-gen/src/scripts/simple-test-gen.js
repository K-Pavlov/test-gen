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
        tasks.push(createTaskFirstSix(2, i, 1));
    }
    // var task = createTaskFirstSix(2, 1, 3);
    var taskOneHtml = template({
        tasks: tasks
    });
    document.body.innerHTML += taskOneHtml;
}

//All task in easy to template way
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

//Task paket for generating variables and expressions
function taskPaket(valueVariables, difficulty, iteration) {
    this.valueVariables = valueVariables;
    this.difficulty = difficulty;
    this.iteration = iteration;
}

function createTaskFirstSix(varCount, taskNumber, difficulty) {
    var valueVariables = [];
    var currentTask;
    var expression = '';
    var number = 8;
    var genFunc;
    var genFuncArg = 4;

    if (difficulty === 3) {
        genFunc = getCorrectRand(difficulty - 1);
    } else {
        genFunc = getCorrectRand(difficulty);
    }

    switch (taskNumber) {
        case 1:
            if (difficulty > 1) {
                number = Math.floor((Math.random() * 6) + 1);
            }
        case 2:
            //variable generation
            for (var i = 0; i < varCount; i++) {
                valueVariables.push(generateVariable(i, genFunc, genFuncArg));
            }

            // expression generation
            for (var i = 0; i < varCount - 1; i++) {
                expression += generateExpressionTaskOneTwo(new taskPaket(valueVariables[i], null, null));
            }

            expression += '(' + valueVariables[varCount - 1].variable + ' ' + generateBitShift() + ' ' + number + ')';
            break;
        case 3:
        case 4:
        case 5:
            varCount *= 2;

            for (var i = 0; i < varCount / 2; i++) {
                valueVariables.push(generateVariable(i, genFunc, genFuncArg));
            }

            for (var i = varCount / 2; i < varCount; i++) {
                var index = varCount - i - 1;
                var newArray = [valueVariables[index], valueVariables[index + 1]]
                valueVariables.push(generateVariable(i, generateExpressionThreeToFive, new taskPaket(valueVariables, difficulty, i)));
            }
            break;

    }

    currentTask = new task(valueVariables, expression);
    return currentTask;
}

//Returns letter a-z
function generateVariableName(number) {
    return String.fromCharCode(97 + number);
}

//Returns string
function generateExpressionTaskOneTwo(taskPaket) {
    var simpleOpration = taskPaket.valueVariables.variable + ' ' + generateOperation() + ' ';
    return simpleOpration;
}

//Returns string
function generateExpressionThreeToFive(taskPaket) {
    var randomNumber = Math.floor(Math.random() * 7) + 1;
    var number;
    var simpleOperation = taskPaket.valueVariables[0].variable + ' ' + generateOperation() + ' ';
    if (taskPaket.difficulty === 3) {
        number = randomNumber;
    } else if (taskPaket.difficulty === 2) {
        if (taskPaket.iteration % 2 === 0) {
            number = 8;
        } else {
            number = Math.floor(Math.random() * 7) + 1;
        }
    } else if (taskPaket.difficulty === 1) {
        if (taskPaket.iteration % 2 === 0) {
            number = 8;
        } else {
            number = 4;
        }
    }

    var bitShiftOperation = '(' + taskPaket.valueVariables[1].variable + ' ' + generateBitShift() + ' ' + number + ')';
    return simpleOperation + bitShiftOperation;
}

//Retruns variable value pair class instance
function generateVariable(iteration, delegate, delegateArgs) {
    return new variableValuePair('int', generateVariableName(iteration), ' = ', delegate(delegateArgs) + '<br>');
}

easyTaskOneTwo();

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