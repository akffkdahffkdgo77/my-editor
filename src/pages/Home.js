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
        children: [{ text: 'A line of text in a paragraph.' }]
    }
];

// Define a React component renderer for our code blocks.
const CodeElement = ({ attributes, children }) => {
    return (
        <pre {...attributes}>
            <code>{children}</code>
        </pre>
    );
};

const DefaultElement = ({ attributes, children }) => {
    return <p {...attributes}>{children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = ({ leaf, attributes, children }) => {
    return (
        <span {...attributes} style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>
            {children}
        </span>
    );
};

export default function App() {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withReact(createEditor()));
    // Render the Slate context.

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <Slate editor={editor} value={initialValue}>
            <div>
                <button
                    type="button"
                    onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                    }}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                    }}
                >
                    Code Block
                </button>
            </div>
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
        </Slate>
    );
}
