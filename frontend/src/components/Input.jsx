import { FiSearch } from "react-icons/fi";

const Input = () => {
	return (
		<div className="relative rounded-md bg-base/dark-line h-12 min-w-[220px]">
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
				<span className="text-light">
					<FiSearch />
				</span>
			</div>
			<input
				type="text"
				name="price"
				id="price"
				className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-10 w-full pr-3 h-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
				placeholder="Search for food, coffe, ..."
			/>
		</div>
	);
};

export default Input;
