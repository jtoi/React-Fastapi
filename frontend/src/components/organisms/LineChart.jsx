import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function LineChart({ chartData, width = '100%', height='310px', xtext="Mes", ytext="Valor" }) {
	return (
		<div className="chart-container" style={{ width: width, height: height }}>
			<Line
				data={chartData}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: true,
						},
					},
					scales: {
						x: {
							display: true,
							title: {
								display: true,
								text: xtext, // Puedes personalizar el título del eje X
							},
						},
						y: {
							display: true,
							title: {
								display: true,
								text: ytext, // Puedes personalizar el título del eje Y
							},
							beginAtZero: true, // El eje Y comienza en 0
						},
					},
				}}
			/>
		</div>
	);
}
