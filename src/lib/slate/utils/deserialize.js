import { jsx } from 'slate-hyperscript';

const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent);
    }
    if (el.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const nodeAttributes = { ...markAttributes };

    // define attributes for text nodes
    // Custom Formatting
    switch (el.nodeName) {
        case 'STRONG':
            nodeAttributes.bold = true;
            break;
        case 'EM':
            nodeAttributes.italic = true;
            break;
        case 'U':
            nodeAttributes.underline = true;
            break;
        case 'DEL':
            nodeAttributes.strikeThrough = true;
            break;
        default:
            break;
    }

    const children = Array.from(el.childNodes)
        .map((node) => deserialize(node, nodeAttributes))
        .flat();

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''));
    }

    // Custom Element
    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'H1':
            return jsx('element', { type: 'heading-one' }, children);
        case 'H2':
            return jsx('element', { type: 'heading-two' }, children);
        case 'H3':
            return jsx('element', { type: 'heading-three' }, children);
        case 'H4':
            return jsx('element', { type: 'heading-four' }, children);
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'block-quote' }, children);
        case 'UL':
            return jsx('element', { type: 'bulleted-list' }, children);
        case 'OL':
            return jsx('element', { type: 'numbered-list' }, children);
        case 'LI':
            return jsx('element', { type: 'list-item' }, children);
        case 'CHECKLIST':
            return jsx('element', { type: 'check-list' }, children);
        case 'CHECKLISTITEM':
            return jsx('element', { type: 'check-list-item' }, children);
        case 'IMG':
            return jsx('element', { type: 'image', url: el.getAttribute('src') }, children);
        case 'A':
            return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
        case 'P':
            return jsx('element', { type: 'paragraph' }, children);
        default:
            return children;
    }
};

export default deserialize;
