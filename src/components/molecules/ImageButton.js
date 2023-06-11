import { useRef, useState } from 'react';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useSlateStatic } from 'slate-react';

import CustomEditor from 'lib/slate/helpers/customEditor';

import Button from 'components/atoms/Button';

export default function ImageButton() {
    const editor = useSlateStatic();
    const inputRef = useRef();
    const [isActive, setIsActive] = useState(false);

    // Image URL
    const handleChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = function onLoad() {
                setIsActive(false);
                CustomEditor.toggleImage(editor, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Button
                icon={faImage}
                title="image button"
                onMouseDown={(event) => {
                    event.preventDefault();
                    inputRef.current.click();
                    setIsActive(true);
                }}
                className={`${isActive ? 'bg-black text-white' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
            />
            <input
                ref={inputRef}
                id="image"
                hidden
                accept="image/*"
                type="file"
                onChange={handleChange}
                onClick={(e) => {
                    e.target.value = null;
                }}
            />
        </>
    );
}
