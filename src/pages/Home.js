/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect, useRef } from 'react';

import isHotkey from 'is-hotkey';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from 'components/Toolbar';
import { HOTKEYS, INITIAL_VALUE } from 'utils';

import { withChecklists } from 'utils/checklist';
import { CustomEditor, Element, Leaf } from 'utils/editor';
import { deserialize, serialize } from 'utils/serialize';

export default function App() {
    const [editor] = useState(() => withChecklists(withReact(createEditor())));

    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const rendered = useRef(false);

    useEffect(() => {
        if (!rendered.current) {
            rendered.current = true;

            // Blocks -> HTML
            if (editor.children) {
                const test = editor.children.map((ele) => serialize(ele));
                console.log('HTML', test.toString().replace(/,/g, ''));
            }

            // HTML -> Blocks
            const html =
                '<p>This is editable <strong>rich</strong> text much better than a &lt;textarea&gt;!</p><p>Since it&#39;s rich text you can do things like turn a selection of text <strong>bold</strong> or add a semantically rendered block quote in the middle of the page like this:</p>A wise quote.<p>Try it out for yourself!</p>';
            const document = new DOMParser().parseFromString(html, 'text/html');
            console.log('document', deserialize(document.body));
        }
    }, [editor.children]);

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <main className="w-full max-w-3xl mx-auto min-h-[500px] h-full">
                <Slate editor={editor} value={INITIAL_VALUE}>
                    <Toolbar />
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
                                        CustomEditor.toggleMark(editor, mark);
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
