/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSlate } from 'slate-react';

import { CustomEditor } from 'utils/editor';

export default function MarkButton({ format, icon }) {
    const editor = useSlate();

    return (
        <button
            type="button"
            className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase"
            onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleMark(editor, format);
            }}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
