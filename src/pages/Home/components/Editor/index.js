import { useCallback, useEffect, useState } from 'react';

import isHotkey from 'is-hotkey';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import Toolbar from 'components/Toolbar';
import { HOTKEYS } from 'utils';

import withChecklist from 'utils/checklist';
import CustomEditor from 'utils/editor';
import Element from 'utils/element';
import Leaf from 'utils/leaf';
import { serialize } from 'utils/serialize';

export default function Editor() {
    const [editor] = useState(() => withChecklist(withHistory(withReact(createEditor()))));
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    // console.log(editor.children);

    useEffect(() => {
        // if (!rendered.current) {
        //     rendered.current = true;
        // Blocks -> HTML
        if (editor.children) {
            editor.children.map((ele) => serialize(ele));
            // console.log('HTML', test.toString().replace(/,/g, ''));
        }
        // }
    }, [editor.children]);

    return (
        <div className="flex-1 w-full">
            <Slate editor={editor} value={[{ type: 'paragraph', children: [{ text: '' }] }]}>
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
        </div>
    );
}
