// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function LineChart({ chartData, width = '100%', height='310px', xtext="Mes", ytext="Valor" }) {
  try {
    // Validación de datos de entrada
    if (!chartData || !chartData.labels || !chartData.datasets) {
      console.error('Datos de gráfico inválidos', chartData);
      return <div>Error: Datos de gráfico no válidos</div>;
    }

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
                  text: xtext,
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: ytext,
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('Error al renderizar LineChart:', error);
    return <div>Error al cargar el gráfico</div>;
  }
}