import { MdPlace } from 'react-icons/md';
import propTypes from "prop-types";

const ContactInfoItem = ({
    icon = <MdPlace></MdPlace>,
    text = "this is a title",
}) => {
    return (
        <div  className='p-8 bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex items-center gap-8 rounded-lg mb-8'>
            <div className="text-white bg-base/dark-line dark:bg-primary-color p-5 items-center justify-center rounded-full">{icon}</div>
                <h4 className='dark:text-dark'>{text}</h4>
        </div>
    );
};

ContactInfoItem.propTypes = {
    icon: propTypes.element,
    text: propTypes.string,
};

export default ContactInfoItem