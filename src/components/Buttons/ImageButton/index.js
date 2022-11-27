/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSlateStatic } from 'slate-react';

import CustomEditor from 'utils/editor';

export default function ImageButton() {
    const editor = useSlateStatic();
    const inputRef = useRef();

    // Image URL
    const handleChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = function onLoad() {
                CustomEditor.toggleImage(editor, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <button
                type="button"
                className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase"
                onMouseDown={(event) => {
                    event.preventDefault();
                    inputRef.current.click();
                }}
            >
                <FontAwesomeIcon icon={faImage} />
            </button>
            <input ref={inputRef} id="image" hidden accept="image/*" type="file" onChange={handleChange} onClick={(e) => (e.target.value = null)} />
        </>
    );
}
