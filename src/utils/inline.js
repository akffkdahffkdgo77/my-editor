import isUrl from 'is-url';

import CustomEditor from 'utils/editor';

const withInlines = (editor) => {
    const { insertData, insertText, isInline } = editor;

    editor.isInline = (element) => element.type === 'link' || isInline(element);

    editor.insertText = (text) => {
        if (text && isUrl(text)) {
            CustomEditor.toggleLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.insertData = (data) => {
        const text = data.getData('text/plain');

        if (text && isUrl(text)) {
            CustomEditor.toggleLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

export default withInlines;
