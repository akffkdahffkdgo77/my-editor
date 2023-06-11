import { useSlate } from 'slate-react';

import CustomEditor from 'lib/slate/helpers/customEditor';

import Button from 'components/atoms/Button';

export default function BlockButton({ format, icon }) {
    const editor = useSlate();

    return (
        <Button
            icon={icon}
            title={`${format} button`}
            onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, format);
            }}
            className={`${CustomEditor.isBlockActive(editor, format) ? 'bg-blue-300' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
        />
    );
}
