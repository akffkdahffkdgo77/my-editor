import { useCallback, useState } from 'react';

import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import withChecklist from 'plugin/checklist';

import Element from 'utils/element';
import Leaf from 'utils/leaf';
import { deserialize } from 'utils/serialize';

function initialValue() {
    // HTML -> Blocks
    const html = '<p><strong>abcd</strong></p><p><u>efg</u></p><p><em>hi</em></p><p>test</p> <p><strong>abcd</strong> <u>ef</u><u><em>g</em></u><em>iffff</em></p>';
    const document = new DOMParser().parseFromString(html, 'text/html');
    // console.log('document', deserialize(document.body));

    return deserialize(document.body);
}

export default function Viewer() {
    const [viewer] = useState(() => withChecklist(withReact(createEditor())));

    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    return (
        <div className="w-full flex-1">
            <Slate editor={viewer} value={initialValue()}>
                <div className="h-full min-h-[602px] border border-slate-300 p-5">
                    <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
                </div>
            </Slate>
        </div>
    );
}
