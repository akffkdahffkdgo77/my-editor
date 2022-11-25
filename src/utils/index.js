export const INITIAL_VALUE = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' }
        ]
    },
    {
        type: 'paragraph',
        children: [
            {
                text: "Since it's rich text, you can do things like turn a selection of text "
            },
            { text: 'bold', bold: true },
            {
                text: ', or add a semantically rendered block quote in the middle of the page, like this:'
            }
        ]
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }]
    },
    {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Try it out for yourself!' }]
    },
    {
        type: 'check-list-item',
        checked: true,
        children: [{ text: 'Slide to the left.' }]
    },
    {
        type: 'check-list-item',
        checked: true,
        children: [{ text: 'Slide to the right.' }]
    },
    {
        type: 'check-list-item',
        checked: false,
        children: [{ text: 'Criss-cross.' }]
    },
    {
        type: 'check-list-item',
        checked: true,
        children: [{ text: 'Criss-cross!' }]
    },
    {
        type: 'check-list-item',
        checked: false,
        children: [{ text: 'Cha cha real smooth…' }]
    },
    {
        type: 'check-list-item',
        checked: false,
        children: [{ text: "Let's go to work!" }]
    }
];

export const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
