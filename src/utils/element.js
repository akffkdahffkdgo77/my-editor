/* eslint-disable react/prop-types */

import CheckListItem from 'components/CheckListItem';
import Image from 'components/Image';
import Link from 'components/Link';

// Slate DOC -> https://docs.slatejs.org/walkthroughs/03-defining-custom-elements
// Define a React component renderer.
const Element = (props) => {
    const { attributes, children, element } = props;

    const style = { textAlign: element.align };
    switch (element.type) {
        case 'heading-one':
            return (
                <h1 className="headingOne" style={style} {...attributes}>
                    {children}
                </h1>
            );
        case 'heading-two':
            return (
                <h2 className="headingTwo" style={style} {...attributes}>
                    {children}
                </h2>
            );
        case 'heading-three':
            return (
                <h3 className="headingThree" style={style} {...attributes}>
                    {children}
                </h3>
            );
        case 'heading-four':
            return (
                <h3 className="headingFour" style={style} {...attributes}>
                    {children}
                </h3>
            );
        case 'block-quote':
            return (
                <blockquote className="quote" style={style} {...attributes}>
                    {children}
                </blockquote>
            );
        case 'numbered-list':
            return (
                <ol className="orderedList" style={style} {...attributes}>
                    {children}
                </ol>
            );
        case 'bulleted-list':
            return (
                <ul className="bulletedList" style={style} {...attributes}>
                    {children}
                </ul>
            );
        case 'list-item':
            return (
                <li className="listItem" style={style} {...attributes}>
                    {children}
                </li>
            );
        case 'check-list':
            return (
                <ul className="checkList" style={style} {...attributes}>
                    {children}
                </ul>
            );
        case 'check-list-item':
            return <CheckListItem {...props} />;
        case 'image':
            return <Image {...props} />;
        case 'link':
            return <Link {...props} />;
        default:
            return (
                <p className="paragraph" style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

export default Element;
