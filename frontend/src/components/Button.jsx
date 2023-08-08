/* eslint-disable react/prop-types */
const Button = ({
	btnText = "test",
	// btnLink = 'test',
	outline = false,
	handler = null,
}) => {
	return (
		<button
			className={`p-4 inline-flex items-center justify-center rounded-lg w-full text-white text-sm hover:shadow-3xl transition-all ${
				outline ? "border-2 border-color" : "bg-primary-color"
			}`} onClick={handler}>
			{btnText}
		</button>
	);
};

export default Button;
