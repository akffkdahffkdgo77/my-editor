/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useRef, useEffect } from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
    faIcons,
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
    faHeading
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isHotkey from 'is-hotkey';
import { createEditor, Editor, Transforms, Text, Element as SlateElement, Point, Range, Path } from 'slate'; // Import the Slate editor factory.
import { Slate, Editable, withReact, useSlate, ReactEditor } from 'slate-react';

import BlockButton from 'components/BlockButton';
import MarkButton from 'components/MarkButton';
import { HOTKEYS, INITIAL_VALUE } from 'utils';

import { withChecklists } from 'utils/checklist';
import { CustomEditor, Element, Leaf } from 'utils/editor';
import { serialize } from 'utils/serialize';

export default function App() {
    const [editor] = useState(() => withChecklists(withReact(createEditor())));
    const [showEmoji, setShowEmoji] = useState(false);

    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

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

    // useEffect(() => {
    //     if (editor.children) {
    //         const test = editor.children.map((ele) => {
    //             console.log(ele);
    //             return serialize(ele);
    //         });
    //         console.log(test.toString().replace(/,/g, ''));
    //     }
    // }, [editor.children]);

    // useEffect(() => {
    //     const html =
    //         '<p>This is editable <strong>rich</strong> text much better than a &lt;textarea&gt;!</p><p>Since it&#39;s rich text you can do things like turn a selection of text <strong>bold</strong> or add a semantically rendered block quote in the middle of the page like this:</p>A wise quote.<p>Try it out for yourself!</p>';
    //     const document = new DOMParser().parseFromString(html, 'text/html');
    //     console.log('document', document);
    // }, []);

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <main className="w-full max-w-3xl mx-auto min-h-[500px] h-full">
                <Slate editor={editor} value={INITIAL_VALUE}>
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
                    </div>
                    <div className="h-full min-h-[500px] border border-slate-300 p-5 border-t-0">
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some rich text…"
                            spellCheck
                            autoFocus
                            // Define a new handler which prints the key that was pressed.
                            onKeyDown={(event) => {
                                for (const hotkey in HOTKEYS) {
                                    if (isHotkey(hotkey, event)) {
                                        event.preventDefault();
                                        const mark = HOTKEYS[hotkey];
                                        CustomEditor.toggleMark(editor, mark);
                                    }
                                }
                            }}
                        />
                    </div>
                </Slate>
            </main>
        </div>
    );
}
