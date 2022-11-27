/* eslint-disable react/prop-types */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react';

export default function Image({ attributes, children, element }) {
    const editor = useSlateStatic();
    const path = ReactEditor.findPath(editor, element);

    const selected = useSelected();
    const focused = useFocused();

    return (
        <div {...attributes}>
            {children}
            <div contentEditable={false} className="relative">
                <img src={element.url} alt="custom img" className={`block max-w-full max-h-80 ${selected && focused ? 'shadow-md' : ''}`} />
                <button
                    type="button"
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                    className={`${selected && focused ? 'flex' : 'hidden'} p-[5px] rounded-sm absolute top-2 left-2 bg-slate-50`}
                >
                    <FontAwesomeIcon className="w-2.5 h-2.5" icon={faTrash} />
                </button>
            </div>
        </div>
    );
}
