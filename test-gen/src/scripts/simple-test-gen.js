/// <reference path="jQuery1.11.1.js" />
/// <reference path="handlebars-v1.3.0.js" />
/// <reference path="random-generation.js" />
function easyTaskOneTwo() {
    var templateNode = document.getElementById('template');
    var templateString = templateNode.innerHTML;

    var template = Handlebars.compile(templateString);

    var valueVariable = new variableValuePair('int i', generateEasyNumber(4));
    console.log(valueVariable);

    var taskOneHtml = template(valueVariable);
    document.body.innerHTML = taskOneHtml;
    console.log(taskOneHtml);
}

function variableValuePair(variable, value) {
    this.variable = variable;
    this.value = value;
}

easyTaskOneTwo();