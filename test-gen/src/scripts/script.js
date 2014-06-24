/// <reference path="../libs/FileSaver.js" />
/// <reference path="../libs/jspdf.min.js" />
/// <reference path="../libs/jszip.min.js" />

function genPdf(text) {
    var doc = new jsPDF();
    var zip = new JSZip();
    var currentHeight;
    doc.setFontSize(12);
    for (var i = 0; i < 12; i++) {
        if (i % 2 === 0) {
            currentHeight = i * 25;
            doc.rect(50, currentHeight, 50, 50);
            doc.text(51, currentHeight, text);
        } else {
            doc.rect(100, currentHeight, 50, 50);
        }
    }
}