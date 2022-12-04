import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSlate } from 'slate-react';

import CustomEditor from 'utils';

export default function MarkButton({ format, icon }) {
    const editor = useSlate();

    return (
        <button
            type="button"
            className={`${CustomEditor.isMarkActive(editor, format) ? 'bg-pink-300' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
            onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleMark(editor, format);
            }}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
