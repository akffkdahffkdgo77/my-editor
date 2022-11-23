/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';

import { createEditor, Editor, Transforms, Text } from 'slate'; // Import the Slate editor factory.
import { Slate, Editable, withReact } from 'slate-react'; // Import the Slate components and React plugin.

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

// Define a React component renderer for our code blocks.
// const CodeElement = ({ attributes, children }) => {
//     return (
//         <pre {...attributes}>
//             <code>{children}</code>
//         </pre>
//     );
// };

// const DefaultElement = ({ attributes, children }) => {
//     return <p {...attributes}>{children}</p>;
// };

// Define a React component to render leaves with bold text.
// const Leaf = ({ leaf, attributes, children }) => {
//     return (
//         <span {...attributes} style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>
//             {children}
//         </span>
//     );
// };

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

export default function App() {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withReact(createEditor()));
    // Render the Slate context.

    // const renderElement = useCallback((props) => {
    //     switch (props.element.type) {
    //         case 'code':
    //             return <CodeElement {...props} />;
    //         default:
    //             return <DefaultElement {...props} />;
    //     }
    // }, []);

    // const renderLeaf = useCallback((props) => {
    //     return <Leaf {...props} />;
    // }, []);

    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <main className="w-full max-w-3xl mx-auto min-h-[500px] h-full">
                <Slate editor={editor} value={initialValue}>
                    <div className="w-full h-50 p-2.5 border border-slate-300 flex justify-start items-center gap-5">
                        <button
                            className="w-5 h-5 [line-height:20px] border border-black font-bold uppercase"
                            type="button"
                            onMouseDown={(event) => {
                                event.preventDefault();
                                CustomEditor.toggleBoldMark(editor);
                            }}
                        >
                            B
                        </button>
                        <button
                            className="w-10 h-5 [line-height:20px] border border-black font-bold uppercase"
                            type="button"
                            onMouseDown={(event) => {
                                event.preventDefault();
                                CustomEditor.toggleCodeBlock(editor);
                            }}
                        >
                            {`</>`}
                        </button>
                    </div>
                    <div className="h-full min-h-[500px] border border-slate-300 p-5 border-t-0">
                        <Editable
                            // Pass in the `renderElement` function.
                            renderElement={renderElement}
                            // Pass in the `renderLeaf` function.
                            renderLeaf={renderLeaf}
                            // Define a new handler which prints the key that was pressed.
                            onKeyDown={(event) => {
                                if (!event.ctrlKey) {
                                    return;
                                }

                                // Replace the `onKeyDown` logic with our new commands.
                                switch (event.key) {
                                    case '`': {
                                        event.preventDefault();
                                        CustomEditor.toggleCodeBlock(editor);
                                        break;
                                    }

                                    case 'b': {
                                        event.preventDefault();
                                        CustomEditor.toggleBoldMark(editor);
                                        break;
                                    }

                                    default:
                                        break;
                                }

                                if (event.key === '&') {
                                    // Prevent the ampersand character from being inserted.
                                    event.preventDefault();
                                    // Execute the `insertText` method when the event occurs.
                                    editor.insertText('and');
                                }
                            }}
                        />
                    </div>
                </Slate>
            </main>
        </div>
    );
}
