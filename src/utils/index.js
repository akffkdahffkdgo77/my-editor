export const INITIAL_VALUE = [
    {
        type: 'heading-one',
        children: [{ text: 'This is Heading 1.' }]
    },
    {
        type: 'heading-two',
        children: [{ text: 'This is Heading 2.' }]
    },
    {
        type: 'heading-three',
        children: [{ text: 'This is Heading 3.' }]
    },
    {
        type: 'heading-four',
        children: [{ text: 'This is Heading 4.' }]
    },
    {
        type: 'paragraph',
        children: [{ text: 'This is bold.', bold: true }]
    },
    {
        type: 'paragraph',
        children: [{ text: 'This is underline', underline: true }]
    },
    {
        type: 'paragraph',
        children: [{ text: 'This is italic.', italic: true }]
    },
    {
        type: 'paragraph',
        children: [{ text: 'This is strike-through.', strikeThrough: true }]
    },
    {
        type: 'paragraph',
        children: [{ text: 'This is code block.', code: true }]
    },
    {
        type: 'block-quote',
        children: [{ text: 'This is quote.' }]
    },
    {
        type: 'paragraph',
        align: 'left',
        children: [{ text: 'Align Left' }]
    },
    {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Align Center' }]
    },
    {
        type: 'paragraph',
        align: 'right',
        children: [{ text: 'Align Right' }]
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
