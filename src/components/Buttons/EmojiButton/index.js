import { useEffect, useRef, useState } from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSlate } from 'slate-react';

import CustomEditor from 'utils/editor';

export default function EmojiButton() {
    const editor = useSlate();

    const [showEmoji, setShowEmoji] = useState(false);
    const wrapperRef = useRef();

    useEffect(() => {
        const handleClickOutsideSelect = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowEmoji(false);
            }
        };

        window.addEventListener('click', handleClickOutsideSelect, true);
        return () => window.removeEventListener('click', handleClickOutsideSelect, true);
    }, []);

    return (
        <div className="relative">
            <button className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase" type="button" onClick={() => setShowEmoji((prev) => !prev)}>
                <FontAwesomeIcon icon={faIcons} />
            </button>
            {showEmoji && (
                <div ref={wrapperRef} className="absolute left-[-176px] z-[1030]">
                    <Picker data={data} onEmojiSelect={(e) => CustomEditor.toggleEmoji(editor, e.native)} />
                </div>
            )}
        </div>
    );
}
