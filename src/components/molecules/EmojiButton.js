import { useEffect, useRef, useState } from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import { useSlate } from 'slate-react';

import CustomEditor from 'lib/slate/helpers/customEditor';

import Button from 'components/atoms/Button';

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
            <Button
                icon={faIcons}
                title="emoji button"
                onClick={() => setShowEmoji((prev) => !prev)}
                className={`${showEmoji ? 'bg-yellow-300' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
            />
            {showEmoji && (
                <div ref={wrapperRef} className="absolute left-[-176px] z-[1030]">
                    <Picker data={data} onEmojiSelect={(e) => CustomEditor.toggleEmoji(editor, e.native)} />
                </div>
            )}
        </div>
    );
}
