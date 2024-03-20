import { SideBarItem } from "../moleculs/SideBarItem";
import logo from "../../../public/assets/icons/logo.png";
import employe from "../../../public/assets/icons/employe.png"
import check from "../../../public/assets/icons/check.png"
import bonus from "../../../public/assets/icons/bonus.png"

export const SideBar = () => {
  return (
    <div>
      <div className="w-sideBar h-screen">
        <div className="h-full pt-4xl px-sm overflow-y-auto bg-gray-800 text-white ">
          <ul className="flex flex-col space-y-xsm text-xl justify-center items-center divide-y">
            <SideBarItem
              to={"/"}
              title="Dashboard"
              imageComponent={
                <svg
                  className="w-lg h-lg text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                  />
                </svg>
              }
            />
						<SideBarItem
							to={"/users"}
							title="Usuarios"
							imageComponent={
								<svg
									className="w-lg h-lg text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
									/>
								</svg>
							}
						/>
            <SideBarItem
              to={"/employees-check"}
              title="Checador"
              imageComponent={
                <img className={`w-lg h-lg text-white"`} src={check}></img>
              }
            />
						<SideBarItem
							to={"/employees"}
							title="Empleados"
							imageComponent={
                <img className={`w-lg h-lg text-white"`} src={employe}></img>
							}
						/>
            <SideBarItem
              to={"/accounts"}
              title="Cuentas"
              imageComponent={
                <svg
                  className="w-lg h-lg text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="2 0 20 20"
                >
                  <path
                    d="M10 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V8.5M9 9.5V8.5M9 9.5H11.0001M9 9.5C7.88279 9.49998 7.00244 9.62616 7.0001 10.8325C6.99834 11.7328 7.00009 12 9.00009 12C11.0001 12 11.0001 12.2055 11.0001 13.1667C11.0001 13.889 11 14.5 9 14.5M9 15.5V14.5M9 14.5L7.0001 14.5M14 10H17M14 20L16.025 19.595C16.2015 19.5597 16.2898 19.542 16.3721 19.5097C16.4452 19.4811 16.5147 19.4439 16.579 19.399C16.6516 19.3484 16.7152 19.2848 16.8426 19.1574L21 15C21.5523 14.4477 21.5523 13.5523 21 13C20.4477 12.4477 19.5523 12.4477 19 13L14.8426 17.1574C14.7152 17.2848 14.6516 17.3484 14.601 17.421C14.5561 17.4853 14.5189 17.5548 14.4903 17.6279C14.458 17.7102 14.4403 17.7985 14.405 17.975L14 20Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <SideBarItem
							to={"/bonuses"}
              title="Bonos"
              imageComponent={
                <img className={`w-lg h-lg text-white"`} src={bonus}></img>
              }
            />
          </ul>
          <div className="absolute flex bottom-0 mt-sm ml-0 mr-0">
            <img className={`w-4xl h-4xl text-white"`} src={logo}></img>
            <p className="py-xl">S.A. de C.V.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


