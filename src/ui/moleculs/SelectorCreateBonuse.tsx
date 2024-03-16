import { useState } from "react";
import moment from "moment";
import "moment/locale/es";

import axios from "axios";
import { apiUrl } from "../../api";
import { ToastContainer, toast } from "react-toastify";

interface ISelectorCreateBonuse {
  title: string;
  image?: string;
}
moment.locale("es");
export const SelectorCreateBonuse = (props: ISelectorCreateBonuse) => {
  const { title } = props;

  const [showSelectors, setShowSelectors] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const handleButtonClick = () => {
    setShowSelectors(true);
  };

  const handleSubmit = () => {
    if (selectedMonth === 0) return toast.error("Seleccione un mes");

    if (
      !confirm(
        "¿Está seguro de calcular el bono? Una vez generado ya no se podrá volver a crear o modificar"
      )
    )
      return;
    axios
      .post(
        `${apiUrl}/bonus/create-bonus/?month=${selectedMonth}&year=${selectedYear}`,
        {
          validateStatus: (status: number) => status < 500,
        }
      )
      .then(({ data, status }) => {
        if (status !== 201) throw { ...data, status };
        toast.success("Calculado con exito");
        setShowSelectors(false);
      })
      .catch((error) => toast.error(error.message + " El bono ya existe"));
        setShowSelectors(false);
  };

  const years = Array.from({ length: 5 }, (_, index) => 2021 + index);

  return (
    <div className="flex flex-row justify-start space-x-xsm">
      {!showSelectors && (
        <button
          onClick={handleButtonClick}
          className="flex focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 justify-end items-center text-buttons rounded-lg px-lg py-xsm"
        >
          {title}
          {/* {image && <img src={image} className="w-md" />} */}
        </button>
      )}
      {showSelectors && (
        <div className="flex flex-2 rounded-lg space-x-sm px-sm">
          <select
            className="flex flex-2 rounded-lg py-xsm px-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            <option value={0}>Seleccione un mes</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="flex flex-2 rounded-lg py-xsm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="flex flex-2 focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 me-2 mb-2 justify-end items-center space-x-sm text-buttons rounded-lg px-lg py-xsm"
            onClick={handleSubmit}
          >
            Calcular
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
