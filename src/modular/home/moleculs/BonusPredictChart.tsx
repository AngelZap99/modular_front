import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";



const meses = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre'
];


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);
export const BonusPredictChart = () => {

	const [months, setMonths] = useState<string[]>([]);
	const [bonus, setBonus] = useState<number[]>([]);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getData = () => {
		for (let i = 0; i < 10; i++) {
			setBonus(value => [...value, Math.floor(Math.random() * (140000 - 100000 + 1)) + 100000]);
			setMonths(meses);
		}
		/*
		axios.get(
			`${apiUrl}/bouneses/${selectedYear}`,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setMonths(data.months);
				setBonus(data.bonus);
			})
			.catch(error => toast.error(error.message + " " + error.status)); */
	}

	const data = {
		labels: months,
		datasets: [
			{
				label: 'Bono por mes',
				data: bonus,
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
				pointBorderColor: 'aqua',
				tension: .1
			}
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
				<p>Predicción de siguientes bonos  </p>
			</div>
			<Line data={data} options={options} />
		</div>
	)
}

