import { useState } from 'react';

import serialize from 'lib/slate/utils/serialize';

import Editor from 'pages/Home/components/Editor';
import Viewer from 'pages/Home/components/Viewer';

export default function Home() {
    const [html, setHTML] = useState('<p></p>');

    const onChange = (event) => setHTML(event.map((ele) => serialize(ele)));

    return (
        <div className="flex flex-col gap-y-5 justify-center items-center w-full min-h-screen p-10">
            <header className="h-[80px]">
                <h1 className="font-bold text-4xl">My Editor</h1>
            </header>
            <main className="w-full mx-auto min-h-[500px] h-full gap-2.5 flex justify-between  items-center ">
                <Editor onChange={onChange} />
                <Viewer html={html} />
            </main>
        </div>
    );
}
