import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { useSlate } from 'slate-react';

import CustomEditor from 'lib/slate/helpers/customEditor';

import Button from 'components/atoms/Button';

export default function ChecklistButton() {
    const editor = useSlate();

    return (
        <Button
            icon={faListCheck}
            title="checklist button"
            onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleChecklist(editor);
            }}
            className={`${CustomEditor.isChecklistActive(editor) ? 'bg-green-300' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
        />
    );
}
