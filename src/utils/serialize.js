import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { jsx } from 'slate-hyperscript';

export const serialize = (node) => {
    if (Text.isText(node)) {
        let string = escapeHTML(node.text);
        if (node.bold) {
            string = `<strong>${string}</strong>`;
        }
        return string;
    }

    const children = node.children?.map((n) => serialize(n)).join('');

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`;
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'link':
            return `<a href="${escapeHTML(node.url)}">${children}</a>`;
        default:
            return children;
    }
};

export const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent);
    }
    if (el.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const nodeAttributes = { ...markAttributes };

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'strong':
            nodeAttributes.bold = true;
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

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children);
        case 'P':
            return jsx('element', { type: 'paragraph' }, children);
        case 'A':
            return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
        default:
            return children;
    }
};
