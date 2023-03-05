// Slate DOC -> https://docs.slatejs.org/walkthroughs/04-applying-custom-formatting
// Define a React component to render leaves.
export default function Leaf({ attributes, children, leaf }) {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = (
            <pre>
                <code>{children}</code>
            </pre>
        );
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if (leaf.strikeThrough) {
        children = <del>{children}</del>;
    }

    return <span {...attributes}>{children}</span>;
}
