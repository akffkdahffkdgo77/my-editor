import isUrl from 'is-url';

import CustomEditor from 'utils/editor';

// A plugin is simply a function that takes an Editor object and returns it after it has augmented it in some way.
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
