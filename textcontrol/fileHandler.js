function loadDocument(document, filename) {

    var st = TXTextControl.StreamType.InternalUnicodeFormat;

    if (filename.endsWith(".docx") === true) {
        st = TXTextControl.StreamType.WordprocessingML; }
    else if (filename.endsWith(".doc") === true) {
        st = TXTextControl.StreamType.MSWord; }
    else if (filename.endsWith(".rtf") === true) {
        st = TXTextControl.StreamType.RichTextFormat; }
    else if (filename.endsWith(".html") === true) {
        st = TXTextControl.StreamType.HTMLFormat; }
    else if (filename.endsWith(".txt") === true) {
        st = TXTextControl.StreamType.PlainText; }

    TXTextControl.loadDocument(st, document);

}

