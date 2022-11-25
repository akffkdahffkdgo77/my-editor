import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor, Path, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

const createCheckListNode = (text) => ({
    type: 'check-list-item',
    children: [{ text }]
});

const createParagraphNode = (children = [{ text: '' }]) => ({
    type: 'paragraph',
    children
});

export default function ChecklistButton() {
    const editor = useSlate();

    return (
        <button
            type="button"
            onMouseDown={(event) => {
                event.preventDefault();

                const { selection } = editor;
                const checklist = createCheckListNode('');

                ReactEditor.focus(editor);

                if (selection) {
                    const [parentNode, parentPath] = Editor.parent(editor, selection.focus?.path);
                    if (editor.isVoid(parentNode)) {
                        // Insert the new link after the void node
                        Transforms.insertNodes(editor, createParagraphNode([checklist]), {
                            at: Path.next(parentPath),
                            select: true
                        });
                    } else if (Range.isCollapsed(selection)) {
                        // Insert the new link in our last known location
                        Transforms.insertNodes(editor, checklist, { select: true });
                    } else {
                        // Wrap the currently selected range of text into a Link
                        Transforms.wrapNodes(editor, checklist, { split: true });
                        // Remove the highlight and move the cursor to the end of the highlight
                        Transforms.collapse(editor, { edge: 'end' });
                    }
                } else {
                    // Insert the new link node at the bottom of the Editor when selection
                    // is falsey
                    Transforms.insertNodes(editor, createParagraphNode([checklist]));
                }
            }}
        >
            <FontAwesomeIcon icon={faCheckSquare} />
        </button>
    );
}
