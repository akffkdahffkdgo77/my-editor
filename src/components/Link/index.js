/* eslint-disable react/prop-types */

import { useSelected } from 'slate-react';

export default function Link({ attributes, style, children }) {
    const selected = useSelected();

    return (
        <a className={`link ${selected ? 'border-2 border-gray-300 p-[2px]' : ''}`} style={style} {...attributes} target="_blank" rel="noopener noreferrer">
            <span contentEditable={false} className="text-[0px]">
                ${String.fromCodePoint(160) /* Non-breaking space */}
            </span>
            {children}
            <span contentEditable={false} className="text-[0px]">
                ${String.fromCodePoint(160) /* Non-breaking space */}
            </span>
        </a>
    );
}
