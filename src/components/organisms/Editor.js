import { useCallback, useState } from 'react';

import isHotkey, { isKeyHotkey } from 'is-hotkey';
import PropTypes from 'prop-types';
import { createEditor, Range, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import Element from 'lib/slate/components/element';
import Leaf from 'lib/slate/components/leaf';
import CustomEditor from 'lib/slate/helpers/customEditor';
import { withChecklists, withImages, withInlines } from 'lib/slate/plugins';

import Toolbar from 'components/organisms/Toolbar';
import { HOTKEYS } from 'constants/data';

export default function Editor({ onChange }) {
    const [editor] = useState(() => withInlines(withImages(withChecklists(withHistory(withReact(createEditor()))))));
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    return (
        <div className="flex-1 w-full">
            <Slate editor={editor} value={[{ type: 'paragraph', children: [{ text: '' }] }]} onChange={onChange}>
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
                            // References : https://github.com/ianstormtaylor/slate/blob/main/site/examples/inlines.tsx
                            // Default left/right behavior is unit:'character'.
                            // This fails to distinguish between two cursor positions, such as
                            // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
                            // Here we modify the behavior to unit:'offset'.
                            // This lets the user step into and out of the inline without stepping over characters.
                            // You may wish to customize this further to only use unit:'offset' in specific cases.
                            const { selection } = editor;
                            if (selection && Range.isCollapsed(selection)) {
                                const { nativeEvent } = event;
                                if (isKeyHotkey('left', nativeEvent)) {
                                    event.preventDefault();
                                    Transforms.move(editor, { unit: 'offset', reverse: true });
                                    return;
                                }
                                if (isKeyHotkey('right', nativeEvent)) {
                                    event.preventDefault();
                                    Transforms.move(editor, { unit: 'offset' });
                                    return;
                                }
                            }

                            Object.keys(HOTKEYS).forEach((hotkey) => {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    CustomEditor.toggleMark(editor, mark);
                                }
                            });
                        }}
                    />
                </div>
            </Slate>
        </div>
    );
}

Editor.propTypes = {
    onChange: PropTypes.func.isRequired
};
