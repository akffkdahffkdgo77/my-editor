import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { jsx } from 'slate-hyperscript';

export const serialize = (node) => {
    if (Text.isText(node)) {
        // Custom Formatting
        let string = escapeHTML(node.text);
        if (node.code) {
            string = `<pre><code>${string}</code></pre>`;
        }
        if (node.bold) {
            string = `<strong>${string}</strong>`;
        }
        if (node.italic) {
            string = `<em>${string}</em>`;
        }
        if (node.underline) {
            string = `<u>${string}</u>`;
        }
        if (node.strikeThrough) {
            string = `<del>${string}</del>`;
        }
        return string;
    }

    const children = node.children?.map((n) => serialize(n)).join('');

    // Custom Elements
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
