import { useCallback, useEffect, useState } from 'react';

import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import Element from 'lib/slate/components/element';
import Leaf from 'lib/slate/components/leaf';
import { withChecklists, withImages, withInlines } from 'lib/slate/plugins';
import deserialize from 'lib/slate/utils/deserialize';

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
