/* eslint-disable react/prop-types */

import { Transforms } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';

export default function CheckListItem({ attributes, children, element }) {
    const editor = useSlateStatic();
    const readOnly = useReadOnly();
    const { checked } = element;

    return (
        <li className="flex items-center" {...attributes}>
            <div className="mr-2.5 flex items-center" contentEditable={false}>
                <input
                    className="w-[18px] h-[18px]"
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
            </div>
            <span contentEditable={!readOnly} suppressContentEditableWarning className={`${checked ? 'line-through opacity-70' : ''} text-[16px] flex-1 focus:outline-none`}>
                {children}
            </span>
        </li>
    );
}
