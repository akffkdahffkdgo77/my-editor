import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({ format, icon, ...props }) {
    return (
        <button {...props} type="button" title={`${format} button`}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
