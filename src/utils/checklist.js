import { Editor, Element as SlateElement, Range, Point, Transforms } from 'slate';

/* eslint-disable import/prefer-default-export */
export const withChecklists = (editor) => {
    const { deleteBackward } = editor;

    editor.deleteBackward = (...args) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [match] = Editor.nodes(editor, {
                match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'check-list-item'
            });

            if (match) {
                const [, path] = match;
                const start = Editor.start(editor, path);

                if (Point.equals(selection.anchor, start)) {
                    const newProperties = {
                        type: 'paragraph'
                    };
                    Transforms.setNodes(editor, newProperties, {
                        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'check-list-item'
                    });
                    return;
                }
            }
        }

        deleteBackward(...args);
    };

    return editor;
};