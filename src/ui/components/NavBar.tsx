import { userStore } from "../../store/userStore";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import profile from "../../../public/assets/icons/profile.png";
import { movementsFilterStore } from "../../store/selectedYearMonthStore";
import { NavLink } from "react-router-dom";
import menu from "../../../public/assets/icons/menu.png";

interface Props {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
}

const NavBar = ({ isSideBarOpen, setIsSideBarOpen }: Props) => {
  const { name } = userStore((state) => state);
  const { email } = userStore((state) => state);
  const logout = userStore((state) => state.logout);
  const resetFilter = movementsFilterStore((state) => state.clear);

  return (
    <div className="w-full h-[14vh] p-md flex flex-row items-center bg-white text-[#1B202D] justify-between  rounded-xsm border-y-2 border-gray-300 shadow-lg">
      <div className="flex items-center text-sm hover:bg-gray-200 rounded">
        {window.innerWidth <= 768 && ( // Muestra el toggle solo cuando el ancho de la ventana es menor o igual a 768px
          <img
            className="w-xl me-4 cursor-pointer"
            onLoad={() => {
              setIsSideBarOpen(false);
            }}
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            src={menu}
            alt=""
          />
        )}
      </div>
      {/* <div className="w-full flex justify-end">
        <h2 className="text-lg justify-end normal-case text-gray-800 mr-sm">
          {" "}
          {name}{" "}
        </h2>
      </div> */}

      {/*Contenedor */}

      <Menu as="div" className="relative ml-md">
        <div>
          <Menu.Button className="flex rounded-full hover:bg-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray  ">
            <img
              className="w-2xl rounded-full ring-1 ring-gray-500 ring-opacity-1"
              src={profile}
              alt=""
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-3xl rounded-md dark:bg-[#212E36] dark:text-white bg-[#FBFBFE] text-[#1B202D] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-lg py-sm ">
              <div className="justify-end text-sm text-gray-900 dark:text-white">
                {" "}
                {name}{" "}
              </div>

              <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                {" "}
                {email}{" "}
              </div>
              <hr className="mt-2 border-t-1 border-gray-800" />
            </div>
            <Menu.Item>
              <NavLink
                className="block px-lg py-sm text-md hover:bg-gray-200  text-white-700 rounded-md"
                to={`/profile`}
              >
                Cuenta
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink
                className="block px-lg py-sm text-md hover:bg-gray-200  text-white-700 rounded-md"
                to={`/login`}
                onClick={() => {
                  logout();
                  resetFilter();
                }}
              >
                Salir
              </NavLink>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavBar;
