import { Editor, Transforms, Element as SlateElement, Range } from 'slate';

import { LIST_TYPES, TEXT_ALIGN_TYPES } from 'utils';

// Helper Functions
// Define our own custom set of helpers.
const CustomEditor = {
    // Mark Button Active? - Leaf Element
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },
    // Block Button Active? - Block Element
    isBlockActive(editor, format, blockType = 'type') {
        const { selection } = editor;
        if (!selection) return false;

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format
            })
        );

        return !!match;
    },
    // Checklist Button Active?
    isChecklistActive(editor) {
        const { selection } = editor;
        if (!selection) return false;

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'check-list-item'
            })
        );

        return !!match;
    },
    // Link Button Active?
    isLinkActive(editor) {
        const { selection } = editor;
        if (!selection) return false;

        const [link] = Editor.nodes(editor, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
        });

        return !!link;
    },

    // Add Link
    toggleLink(editor, url) {
        const isActive = CustomEditor.isLinkActive(editor);
        if (isActive) {
            Transforms.unwrapNodes(editor, {
                match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
            });
        }

        const { selection } = editor;
        const isCollapsed = selection && Range.isCollapsed(selection);
        const link = {
            type: 'link',
            url,
            children: isCollapsed ? { text: url } : []
        };

        if (isCollapsed) {
            // Transforms.insertNodes
            //  -> Atomically inserts nodes at the specified location in the document.
            //  -> If no location is specified, inserts at the current selection.
            //  -> If there is no selection, inserts at the end of the document.
            Transforms.insertNodes(editor, link);
        } else {
            // Transforms.wrapNodes
            //  -> Wrap nodes at the specified location in the element container.
            //  -> If no location is specified, wrap the selection.
            //  -> split: true
            //      ->  it's okay to split a node in order to wrap the location
            //      ->  if ipsum was selected in a Text node with lorem ipsum dolar,
            //      ->  split: true would wrap the word ipsum only, resulting in splitting the Text node.
            Transforms.wrapNodes(editor, link, { split: true });
            // -> 선택된 텍스트를 a tag로 wrap
            // -> 만약 선택된 텍스트가 없다면 마지막 커서 위치에 a tag 추가

            //  Transforms.collapse
            //  -> Collapse the selection to a single point.
            Transforms.collapse(editor, { edge: 'end' });
        }
    },
    // Deactivate Link Button
    unToggleLink(editor) {
        //  Transforms.unwrapNodes
        //  -> Unwrap nodes at the specified location.
        //  -> If necessary, the parent node is split.
        //  -> If no location is specified, use the selection.
        Transforms.unwrapNodes(editor, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
            split: true
        });
    },
    // Add Image
    toggleImage(editor, url) {
        // 이미지 아래로 p를 추가해서 계속해서 text를 입력할 수 있도록
        const newProperties = [
            { type: 'image', url, children: [] },
            { type: 'paragraph', children: [{ text: '' }] }
        ];
        Transforms.insertNodes(editor, newProperties);
    },
    // Add Emoji
    toggleEmoji(editor, emoji) {
        // Transform.insertText
        //  -> Insert a string of text at the specified location in the document.
        //  -> If no location is specified, insert at the current selection.
        Transforms.insertText(editor, emoji);
    },
    // Add Checklist
    toggleChecklist(editor) {
        // check-list 버튼이 클릭된 상태?
        const isActive = CustomEditor.isChecklistActive(editor);

        // apply a single operation to zero or more Nodes
        // flatten the syntax tree by applying unwrapNodes
        Transforms.unwrapNodes(editor, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'check-list',
            split: true
        });

        let newProperties;
        if (!isActive) {
            // check list item element를 만듬
            // 그 다음에 그걸 check list element로 감싸기
            newProperties = { type: 'check-list-item' };
            //  Transforms.setNodes
            //  -> Set properties of nodes at the specified location.
            Transforms.setNodes(editor, newProperties);
            const block = { type: 'check-list', children: [] };
            Transforms.wrapNodes(editor, block);
        } else {
            // 활성화 상태
            // list-item -> p
            // unwrapNodes를 실행하지 않는다면 ul이 유지되지 않고 모두 p로 변경되어 버림...
            newProperties = { type: 'paragraph' };
            Transforms.setNodes(editor, newProperties);
        }
    },
    // Add Custom Elements
    toggleBlock(editor, format) {
        const isActive = CustomEditor.isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
        const isList = LIST_TYPES.includes(format);

        Transforms.unwrapNodes(editor, {
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type) && !TEXT_ALIGN_TYPES.includes(format),
            split: true
        });

        let newProperties;
        if (TEXT_ALIGN_TYPES.includes(format)) {
            newProperties = {
                align: isActive ? undefined : format
            };
        } else {
            newProperties = {
                type: isActive ? 'paragraph' : isList ? 'list-item' : format
            };
        }
        Transforms.setNodes(editor, newProperties);

        if (!isActive && isList) {
            const block = { type: format, children: [] };
            Transforms.wrapNodes(editor, block);
        }
    },
    // Add Custom Formatting
    toggleMark(editor, format) {
        const isActive = CustomEditor.isMarkActive(editor, format);

        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    }
};

export default CustomEditor;
