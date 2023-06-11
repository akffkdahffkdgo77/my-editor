import { useState } from 'react';

import { faLink } from '@fortawesome/free-solid-svg-icons';
import { useSlate } from 'slate-react';

import CustomEditor from 'lib/slate/helpers/customEditor';

import Button from 'components/atoms/Button';

export default function LinkButton() {
    const editor = useSlate();
    const [url, setUrl] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        CustomEditor.toggleLink(editor, url);
    };

    return (
        <div className="relative flex gap-2.5">
            <Button
                icon={faLink}
                title="link button"
                onMouseDown={(event) => {
                    event.preventDefault();
                    setShow((prev) => !prev);
                }}
                className={`${show ? 'bg-red-300' : ''} block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase`}
            />
            {show && (
                <form className="absolute z-[9999] bg-white top-[35px] left-0 w-[320px] py-2.5 flex justify-between items-center border border-black rounded-md" onSubmit={handleSubmit}>
                    <input className="px-2.5 focus:outline-none" placeholder="Enter Url..." type="url" name="url" required onChange={(e) => setUrl(e.target.value)} />
                    <input className="border bg-black text-white text-[10px] uppercase font-bold border-black rounded-sm mr-2.5 p-[5px]" type="submit" value="submit" />
                </form>
            )}
        </div>
    );
}
