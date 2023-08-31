/* eslint-disable react/prop-types */
const Button = ({
    btnText = "test",
    // btnLink = 'test',
    outline = false,
    handler = null,
    btnType = "button",
    color = "",
}) => {
    return (
        <button
            type={btnType}
            className={`p-4 inline-flex items-center justify-center rounded-lg w-full text-white text-sm hover:shadow-3xl transition-all ${color} ${
                outline ? "border-2 border-color" : "bg-primary-color"
            } `}
            onClick={handler}>
            {btnText}
        </button>
    );
};

export default Button;
