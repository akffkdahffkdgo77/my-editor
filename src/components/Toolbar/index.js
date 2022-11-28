import {
    faAlignLeft,
    faAlignCenter,
    faAlignJustify,
    faAlignRight,
    faListUl,
    faListNumeric,
    faQuoteLeft,
    faBold,
    faItalic,
    faUnderline,
    faCode,
    faHeading,
    faStrikethrough,
    faVideo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BlockButton, EmojiButton, MarkButton, ChecklistButton } from 'components/Buttons';
import ImageButton from 'components/Buttons/ImageButton';
import LinkButton from 'components/Buttons/LinkButton';

export default function Toolbar() {
    return (
        <div className="w-full min-w-[600px] h-50 p-2.5 border border-slate-300 flex flex-col justify-start items-start gap-5">
            <div className="flex justify-between items-center gap-2.5">
                <MarkButton format="bold" icon={faBold} />
                <MarkButton format="italic" icon={faItalic} />
                <MarkButton format="underline" icon={faUnderline} />
                <MarkButton format="strikeThrough" icon={faStrikethrough} />
                <MarkButton format="code" icon={faCode} />
                <BlockButton format="left" icon={faAlignLeft} />
                <BlockButton format="center" icon={faAlignCenter} />
                <BlockButton format="right" icon={faAlignRight} />
                <BlockButton format="justify" icon={faAlignJustify} />
                <EmojiButton />
            </div>
            <div className="flex justify-between items-center gap-2.5">
                <BlockButton format="heading-one" icon={faHeading} />
                <BlockButton format="heading-two" icon={faHeading} />
                <BlockButton format="heading-three" icon={faHeading} />
                <BlockButton format="heading-four" icon={faHeading} />
                <BlockButton format="block-quote" icon={faQuoteLeft} />
                <BlockButton format="numbered-list" icon={faListNumeric} />
                <BlockButton format="bulleted-list" icon={faListUl} />
                <ChecklistButton />
                <ImageButton />
                <LinkButton />
                <button type="button">
                    <FontAwesomeIcon icon={faVideo} />
                </button>
            </div>
        </div>
    );
}
