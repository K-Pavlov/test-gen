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
        pdfNoAnswersData = generatePDF(withoutAnswers[i].plainText).output('arraybuffer');
        pdfAnswersData = generatePDF(withAnswers[i].plainText).output('arraybuffer');
        pdfNoAnswersFolder.file(withoutAnswers[i].pdfName, pdfNoAnswersData, { base64: true });
        pdfAnswersFolder.file(withAnswers[i].pdfName, pdfAnswersData, { base64: true });
    }

    var content = zip.generate({ type: "blob" });

    saveAs(content, 'tests.zip');
}

function generatePDF(texts) {
    var doc = new jsPDF();
    var zip = new JSZip();
    var currentPosY;
    var currentPosX = 50;
    var width = 50;
    var height = 50;

    doc.setFontSize(12);
    for (var i = 0; i < texts.length; i++) {
        if (i % 2 === 0) {
            currentPosY = i * 25;
            doc.rect(currentPosX, currentPosY, width, height);
            doc.text(currentPosX + 1, currentPosY + 10, texts[i]);
        } else {
            doc.rect(currentPosX * 2, currentPosY, width, height);
            doc.text(currentPosX * 2 + 1, currentPosY + 10, texts[i]);
        }
    }

    return doc;
}