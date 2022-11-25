import { faAlignLeft, faAlignCenter, faAlignJustify, faAlignRight, faListUl, faListNumeric, faQuoteLeft, faBold, faItalic, faUnderline, faCode, faHeading } from '@fortawesome/free-solid-svg-icons';

import BlockButton from 'components/BlockButton';
import EmojiButton from 'components/EmojiButton';
import MarkButton from 'components/MarkButton';

export default function Toolbar() {
    return (
        <div className="w-full h-50 p-2.5 border border-slate-300 flex justify-start items-center gap-5">
            <MarkButton format="bold" icon={faBold} />
            <MarkButton format="italic" icon={faItalic} />
            <MarkButton format="underline" icon={faUnderline} />
            <MarkButton format="code" icon={faCode} />
            <BlockButton format="heading-one" icon={faHeading} />
            <BlockButton format="heading-two" icon={faHeading} />
            <BlockButton format="block-quote" icon={faQuoteLeft} />
            <BlockButton format="numbered-list" icon={faListNumeric} />
            <BlockButton format="bulleted-list" icon={faListUl} />
            <BlockButton format="left" icon={faAlignLeft} />
            <BlockButton format="center" icon={faAlignCenter} />
            <BlockButton format="right" icon={faAlignRight} />
            <BlockButton format="justify" icon={faAlignJustify} />
            <EmojiButton />
        </div>
    );
}
