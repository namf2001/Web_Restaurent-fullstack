import { Link, NavLink } from "react-router-dom";
import { links } from "../assets/data";
import Logo from "../assets/images/Logo.svg";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = (props) => {
	// const{links} = props;
	const sidebarVariants = {
		hidden: { opacity: 0, x: 30 },
		visible: { opacity: 1, x: 0 },
	};

	return (
		<div className="w-[100px] fixed sidebar dark:bg-secondary-dark-bg bg-base/dark-bg-2-14 h-full">
			<div className="flex flex-col items-center h-full">
				<div>
					<Link to="/">
						<div className="flex items-center justify-start p-6">
							<img src={Logo} alt="Logo" />
						</div>
					</Link>
				</div>
				<div className="h-full">
					<ul className="w-[100px] flex flex-col justify-center items-center h-full">
						{links.map((link) => {
							const { id, path, icon } = link;
							return (
								<motion.li
									key={id}
									className="text-primary-color relative"
									variants={sidebarVariants}
									initial="hidden"
									animate="visible"
									transition={{
										duration: 0.3,
										delay: id * 0.1,
									}}>
									<NavLink
										to={path}
										activeclassname="active"
										className="p-3 text-xl flex justify-center items-center sidebar">
										<span className="p-4 hover:drop-shadow-3xl hover:scale-110 transition-all">{icon}</span>
									</NavLink>
									<span>
										<p></p>
										<p></p>
									</span>
								</motion.li>
							);
						})}
						<motion.li
							className="text-primary-color relative mt-auto"
							variants={sidebarVariants}
							initial="hidden"
							animate="visible"
							transition={{
								duration: 0.3,
								delay: links.length * 0.1,
							}}>
							<NavLink
								to={"/login"}
								activeclassname="active"
								className="p-3 text-xl flex justify-center items-center sidebar ">
								<span className="p-4">
									<FiLogOut />
								</span>
							</NavLink>
							<span>
								<p></p>
								<p></p>
							</span>
						</motion.li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
