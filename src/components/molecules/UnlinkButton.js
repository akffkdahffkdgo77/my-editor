import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { useSlate } from 'slate-react';

import CustomEditor from 'lib/slate/helpers/customEditor';

import Button from 'components/atoms/Button';

export default function UnlinkButton() {
    const editor = useSlate();

    return (
        <Button
            icon={faLinkSlash}
            onMouseDown={(event) => {
                event.preventDefault();
                const isActive = CustomEditor.isLinkActive(editor);
                if (isActive) {
                    CustomEditor.unToggleLink(editor);
                }
            }}
            className="block w-[40px] h-[30px] [line-height:30px] border border-black font-bold uppercase"
        />
    );
}
