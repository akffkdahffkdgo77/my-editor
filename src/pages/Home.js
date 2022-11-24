/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useRef, useEffect } from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
    faIcons,
    faAlignLeft,
    faAlignCenter,
    faAlignJustify,
    faAlignRight,
    faListUl,
    faListNumeric,
    faQuoteLeft,
    faBold,
    faItalic,
    faUnderline,
    faCode,
    faHeading
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import escapeHtml from 'escape-html';
import isHotkey from 'is-hotkey';
import { createEditor, Editor, Transforms, Text, Element as SlateElement } from 'slate'; // Import the Slate editor factory.
import { jsx } from 'slate-hyperscript';
import { Slate, Editable, withReact, useSlate } from 'slate-react';

// Define our own custom set of helpers.
const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.bold === true,
            universal: true
        });

        return !!match;
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === 'code'
        });

        return !!match;
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(editor, { type: isActive ? null : 'code' }, { match: (n) => Editor.isBlock(editor, n) });
    }
};

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' }
        ]
    },
    {
        type: 'paragraph',
        children: [
            {
                text: "Since it's rich text, you can do things like turn a selection of text "
            },
            { text: 'bold', bold: true },
            {
                text: ', or add a semantically rendered block quote in the middle of the page, like this:'
            }
        ]
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }]
    },
    {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Try it out for yourself!' }]
    }
];

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

// Define a React component renderer for our code blocks.
const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
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
                <h1 style={style} {...attributes}>
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

        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

const Leaf = ({ attributes, children, leaf }) => {
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

const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format
        })
    );

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
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
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const insertEmoji = (editor, emoji) => {
    // const text = { text: emoji };
    // const image = { type: 'image', children: [text] };
    Transforms.insertText(editor, emoji);
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <button
            type="button"
            className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase"
            // active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <button
            className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase"
            type="button"
            // active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

const serialize = (node) => {
    console.log('node', node);
    if (Text.isText(node)) {
        console.log('isText');
        let string = escapeHtml(node.text);
        if (node.bold) {
            console.log('isbold');
            string = `<strong>${string}</strong>`;
        }
        return string;
    }
    console.log('node children');
    console.log(node.children);
    const children = node.children?.map((n) => serialize(n)).join('');

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`;
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        default:
            return children;
    }
};

const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent);
    }
    if (el.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const nodeAttributes = { ...markAttributes };

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'strong':
            nodeAttributes.bold = true;
            break;
        default:
            break;
    }

    const children = Array.from(el.childNodes)
        .map((node) => deserialize(node, nodeAttributes))
        .flat();

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''));
    }

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children);
        case 'P':
            return jsx('element', { type: 'paragraph' }, children);
        case 'A':
            return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
        default:
            return children;
    }
};

export default function App() {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withReact(createEditor()));
    const [showEmoji, setShowEmoji] = useState(false);

    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const wrapperRef = useRef();

    useEffect(() => {
        const handleClickOutsideSelect = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowEmoji(false);
            }
        };

        window.addEventListener('click', handleClickOutsideSelect, true);
        return () => window.removeEventListener('click', handleClickOutsideSelect, true);
    }, []);

    useEffect(() => {
        if (editor.children) {
            const test = editor.children.map((ele) => {
                console.log(serialize(ele));
                return serialize(ele);
            });

            console.log(test.toString().replace(/,/g, ''));
        }
    }, [editor.children]);

    const html =
        '<p>This is editable <strong>rich</strong> text much better than a &lt;textarea&gt;!</p><p>Since it&#39;s rich text you can do things like turn a selection of text <strong>bold</strong> or add a semantically rendered block quote in the middle of the page like this:</p>A wise quote.<p>Try it out for yourself!</p>';
    const document = new DOMParser().parseFromString(html, 'text/html');
    console.log('deserialize', deserialize(document.body));

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <main className="w-full max-w-3xl mx-auto min-h-[500px] h-full">
                <Slate editor={editor} value={initialValue}>
                    <div className="w-full h-50 p-2.5 border border-slate-300 flex justify-start items-center gap-5">
                        <MarkButton format="bold" icon={faBold} />
                        <MarkButton format="italic" icon={faItalic} />
                        <MarkButton format="underline" icon={faUnderline} />
                        <MarkButton format="code" icon={faCode} />
                        <BlockButton format="heading-one" icon={faHeading} />
                        <BlockButton format="heading-two" icon={faHeading} />
                        <BlockButton format="block-quote" icon={faQuoteLeft} />
                        <BlockButton format="numbered-list" icon={faListNumeric} />
                        <BlockButton format="bulleted-list" icon={faListUl} />
                        <BlockButton format="left" icon={faAlignLeft} />
                        <BlockButton format="center" icon={faAlignCenter} />
                        <BlockButton format="right" icon={faAlignRight} />
                        <BlockButton format="justify" icon={faAlignJustify} />
                        <div className="relative">
                            <button className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase" type="button" onClick={() => setShowEmoji((prev) => !prev)}>
                                <FontAwesomeIcon icon={faIcons} />
                            </button>
                            {showEmoji && (
                                <div ref={wrapperRef} className="absolute left-[-176px] z-[1030]">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(e) => {
                                            console.log(e.native);
                                            insertEmoji(editor, e.native);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="h-full min-h-[500px] border border-slate-300 p-5 border-t-0">
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some rich text…"
                            spellCheck
                            autoFocus
                            // Define a new handler which prints the key that was pressed.
                            onKeyDown={(event) => {
                                for (const hotkey in HOTKEYS) {
                                    if (isHotkey(hotkey, event)) {
                                        event.preventDefault();
                                        const mark = HOTKEYS[hotkey];
                                        toggleMark(editor, mark);
                                    }
                                }
                            }}
                        />
                    </div>
                </Slate>
            </main>
        </div>
    );
}
