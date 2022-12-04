/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';

import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { withChecklists, withImages, withInlines } from 'plugins';

import deserialize from 'utils/deserialize';
import Element from 'utils/element';
import Leaf from 'utils/leaf';

// eslint-disable-next-line no-unused-vars
function initialValue(html) {
    // HTML -> Blocks
    const document = new DOMParser().parseFromString(html, 'text/html');
    return deserialize(document.body);
}

export default function Viewer({ html }) {
    const [editor] = useState(() => withInlines(withImages(withChecklists(withHistory(withReact(createEditor()))))));

    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    useEffect(() => {
        if (html) {
            editor.children = initialValue(typeof html === 'string' ? html : html.join(''));
            editor.onChange();
        }
    }, [html, editor]);

    return (
        <div className="w-full flex-1">
            <Slate editor={editor} value={initialValue(html)}>
                <div className="h-full min-h-[602px] border border-slate-300 p-5">
                    <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
                </div>
            </Slate>
        </div>
    );
}
