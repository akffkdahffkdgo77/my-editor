/* eslint-disable react/prop-types */

import { Transforms } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';

export default function CheckList({ attributes, children, element }) {
    const editor = useSlateStatic();
    const readOnly = useReadOnly();
    const { checked } = element;

    return (
        <div {...attributes} className="flex items-center">
            <span className="mr-[5px]" contentEditable={false}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                        const path = ReactEditor.findPath(editor, element);
                        const newProperties = {
                            checked: event.target.checked
                        };
                        Transforms.setNodes(editor, newProperties, { at: path });
                    }}
                />
            </span>
            <span contentEditable={!readOnly} suppressContentEditableWarning className={`${checked ? 'line-through opacity-70' : ''} flex-1 focus:outline-none`}>
                {children}
            </span>
        </div>
    );
}
