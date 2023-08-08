import { useLocation } from 'react-router-dom';
import Input from "./Input";

const Navbar = () => {
	const location = useLocation();

	const currentDate = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	const getday = currentDate.toLocaleDateString("en-US", options);

	return (
		<div className="p-6 flex justify-between items-center text-white">
			<div>
				<h1 className="text-3xl font-bold">  
					{/* name of page */}
					{location.pathname.split("/")[1].toUpperCase() || "HOME"}
				</h1>
				<span>{getday}</span>
			</div>
			<div>
				<Input />
			</div>
		</div>
	);
};

export default Navbar;
