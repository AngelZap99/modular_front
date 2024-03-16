import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import moment from "moment";
import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { YearSelector } from "./YearSelector";
import axios from "axios";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { IBonuses } from "../../bonuses/interfaces";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export const BonusChart = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2022); // Establecer el tipo de selectedYear
  const [bonuses, setBonuses] = useState<IBonuses[]>([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  const getData = () => {
    axios
      .get(`${apiUrl}/bonus/get-by-year?year=${selectedYear}`, {
        validateStatus: (status: number) => status < 500,
      })
      .then(({ data, status }) => {
        if (status !== 200) throw { ...data, status };
        setBonuses(data);
      })
      .catch((error) => toast.error(`${error.message} ${error.status}`));
  };

  const data = {
    labels: bonuses.map((bonuse) => moment().month(bonuse.bonus.month - 1).format("MMMM")), // Convertir el número de mes a nombre de mes
    datasets: [
      {
        label: "Bono por mes",
        data: bonuses.map((bonuse) => bonuse.bonus.total_bonus),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointBorderColor: "aqua",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
	scales: {
	  x: {
		beginAtZero: false,
		title: {
		  display: true,
		  text: 'Meses',
		},
	  },
	  y: {
		beginAtZero: false,
		title: {
		  display: true,
		  text: 'Bonos',
		},
	  },
	},
	responsive: true,
	plugins: {
	  legend: {
		display: true,
		position: 'top', // Cambiar la posición de la leyenda a "top"
	  },
	  title: {
		display: true,
		text: 'Ventas mensuales por año',
	  },
	},
  };
  

  return (
    <div className="flex flex-col w-1/2 space-y-md">
      <div className="flex justify-center space-x-sm items-center">
        <p>Bonos del año</p>
        <YearSelector setYear={setSelectedYear} year={selectedYear} />
      </div>
      <Line data={data} options={options} />
    </div>
  );
};
