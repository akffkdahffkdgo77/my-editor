import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSlate } from 'slate-react';

import CustomEditor from 'utils/editor';

export default function ChecklistButton() {
    const editor = useSlate();

    return (
        <button
            type="button"
            className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase"
            onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleChecklist(editor);
            }}
        >
            <FontAwesomeIcon icon={faListCheck} />
        </button>
    );
}
