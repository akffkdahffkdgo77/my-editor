import CustomEditor from 'utils/editor';

const withImages = (editor) => {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
        return element.type === 'image' ? true : isVoid(element);
    };

    editor.insertData = (data) => {
        const { files } = data;

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.onload = function onLoad() {
                        CustomEditor.toggleImage(editor, reader.result);
                    };

                    reader.readAsDataURL(file);
                }
            }
        } else {
            insertData(data);
        }
    };

    return editor;
};

export default withImages;
