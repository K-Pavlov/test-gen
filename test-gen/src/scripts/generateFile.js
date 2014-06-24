/// <reference path="jszip.min.js" />
function generateHtmlFile(withAnswers, withoutAnswers) {
    var zip = new JSZip();
    var folderNoAnswers = zip.folder('without_answers_html');
    var folderAnswers = zip.folder('with_answers_html');
    var pdfNoAnswersFolder = zip.folder('without_answers_pdf');
    var pdfAnswersFolder = zip.folder('with_answers_pdf');
    var pdfNoAnswersData,
        pdfAnswersData;

    for (var i in withAnswers) {
        folderNoAnswers.file(withoutAnswers[i].htmlName, withoutAnswers[i].html);
        folderAnswers.file(withAnswers[i].htmlName, withAnswers[i].html);
        pdfNoAnswersData = generatePDF(withoutAnswers[i].html).output('arraybuffer');
        pdfAnswersData = generatePDF(withAnswers[i].html).output('arraybuffer');
        pdfNoAnswersFolder.file(withoutAnswers[i].pdfName, pdfNoAnswersData, { base64: true });
        pdfAnswersFolder.file(withAnswers[i].pdfName, pdfAnswersData, { base64: true });
    }

    var content = zip.generate({ type: "blob" });

    saveAs(content, 'tests.zip');
}

function generatePDF(html) {
    var doc = new jsPDF();

    // We'll make our own renderer to skip this editor
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    doc.fromHTML(html, 0, 0, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });

    return doc;
}