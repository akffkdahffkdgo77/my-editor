/* eslint-disable no-unused-vars */
import { Editor, Transforms, Element as SlateElement } from 'slate'; // Import the Slate editor factory.

import { LIST_TYPES, TEXT_ALIGN_TYPES } from 'utils';

// Define our own custom set of helpers.
const CustomEditor = {
    // Mark Button Active?
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },
    // Block Button Active?
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
            newProperties = { type: 'check-list-item' };
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
