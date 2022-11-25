/* eslint-disable react/prop-types */
import { Editor, Transforms, Element as SlateElement } from 'slate'; // Import the Slate editor factory.

import CheckList from 'components/CheckList';
import { LIST_TYPES, TEXT_ALIGN_TYPES } from 'utils';

// Define our own custom set of helpers.
export const CustomEditor = {
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },
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
    toggleEmoji(editor, emoji) {
        Transforms.insertText(editor, emoji);
    },
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
    toggleMark(editor, format) {
        const isActive = CustomEditor.isMarkActive(editor, format);

        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    }
};

// Define a React component renderer for our code blocks.
export const Element = (props) => {
    const { attributes, children, element } = props;

    const style = { textAlign: element.align };
    switch (element.type) {
        case 'table':
            return (
                <table>
                    <tbody {...attributes}>{children}</tbody>
                </table>
            );
        case 'table-row':
            return <tr {...attributes}>{children}</tr>;
        case 'table-cell':
            return <td {...attributes}>{children}</td>;
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            );
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            );
        case 'heading-one':
            return (
                <h1 className="headingOne" style={style} {...attributes}>
                    {children}
                </h1>
            );
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            );
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            );
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            );
        case 'check-list-item':
            return <CheckList {...props} />;
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};
