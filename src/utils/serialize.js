import escapeHTML from 'escape-html';
import { Text } from 'slate';

const serialize = (node) => {
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
        case 'heading-one':
            return `<h1>${children}</h1>`;
        case 'heading-two':
            return `<h2>${children}</h2>`;
        case 'heading-three':
            return `<h3>${children}</h3>`;
        case 'heading-four':
            return `<h4>${children}</h4>`;
        case 'block-quote':
            return `<blockquote>${children}</blockquote>`;
        case 'numbered-list':
            return `<ul className="orderedList>${children}</ol>`;
        case 'bulleted-list':
            return `<ul>${children}</ul>`;
        case 'list-item':
            return `<li>${children}</ul>`;
        case 'check-list':
            return `<checklist>${children}</checklist>`;
        case 'check-list-item':
            return `<checklistitem>${children}</checklistitem>`;
        case 'image':
            return `<img src="${escapeHTML(node.url)}" alt="custom img" />`;
        case 'link':
            return `<a href="${escapeHTML(node.url)}">${children}</a>`;
        case 'paragraph':
            return `<p>${children}</p>`;
        default:
            return children;
    }
};

export default serialize;
