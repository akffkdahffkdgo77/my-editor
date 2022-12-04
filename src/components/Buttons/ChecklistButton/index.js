import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSlate } from 'slate-react';

import CustomEditor from 'utils';

export default function ChecklistButton() {
    const editor = useSlate();

    return (
        <button
            type="button"
            title="checklist button"
            onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleChecklist(editor);
            }}
            className={`${CustomEditor.isChecklistActive(editor) ? 'bg-green-300' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
        >
            <FontAwesomeIcon icon={faListCheck} />
        </button>
    );
}
