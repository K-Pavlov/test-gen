/// <reference path="jszip.min.js" />
function generateHtmlFile(withAnswers, withoutAnswers) {
    var zip = new JSZip();
    var folderNoAnswers = zip.folder("without_answers_html");
    var folderAnswers = zip.folder("with_answers_html");

    for (var i in withAnswers) {
        folderNoAnswers.file(withoutAnswers[i].name, withoutAnswers[i].html);
        folderAnswers.file(withAnswers[i].name, withAnswers[i].html);
    }

    var content = zip.generate({ type: "blob" });

    saveAs(content, 'tests.zip');
}