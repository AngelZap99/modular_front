import { useState } from "react";
import NavBar from "../components/NavBar";
import { SideBar } from "../components/SideBar";

interface IProps {
	children: JSX.Element;
}

const Layout = ({ children }: IProps) => {
	const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

	return (
		<div className="overflow-y-hidden w-full bg-[#FBFBFE] text-[#1B202D] flex flex-row relative">
				{isSideBarOpen && <SideBar />}
			<div className="w-full flex flex-col h-screen">
				<NavBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
				<main className="p-lg h-full overflow-y-auto bg-dashboard">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
