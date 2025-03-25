import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../../styles/dashboard.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { CardSuperior }from "../../components/molecules/CardSuperior";
import { LineChart }from "../../components/organisms/LineChart";
import { Table } from "../../components/organisms/Table";


export function Home() {
	const [welcomeImage, setWelcomeImage] = useState('');
	let pageSize = 0;

    const renderCards = () => {
        const cards = [];
        const cardData = [
            {
              label: "Gasto Total",
              text: "2.589,00 €",
              pie: "+12% respecto al mes anterior",
            },
            {
              label: "Eficiencia Promedio",
              text: "85%",
              pie: "-3% respecto al mes anterior",
            },
            {
              label: "Mantenimiento Preventivo",
              text: "20 Horas",
              pie: "+5 horas respecto al mes anterior",
            },
            {
              label: "Calidad del Producto",
              text: "98%",
              pie: "+1% respecto al mes anterior",
            },
          ];
        for (let i = 0; i < cardData.length; i++) {
            cards.push(
                <CardSuperior
                    key={i}
                    label={cardData[i].label}
                    text={cardData[i].text}
                    pie={cardData[i].pie}
                />
            );
        }
        return cards;
    };

    const salesData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Manzanas',
                data: [12, 19, 15, 17, 14, 18],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Naranjas',
                data: [8, 12, 18, 14, 16, 20],
                borderColor: '#ff9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Peras',
                data: [18, 23, 14, 16, 21, 30],
                borderColor: '#8bc34a',
                backgroundColor: 'rgba(139, 195, 74, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Uvas',
                data: [2, 25, 32, 11, 17, 21],
                borderColor: '#9c27b0',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const ExpendedChart = () => {
        return <LineChart chartData={salesData} width="100%" height="310px" xtext="Mes" ytext="Valor"/>;
    };


	return (
		<div className="content">
            <div className="header">
                <h1 className="text-center">Dashboard</h1>
            </div>

            <div className="container">
                <div className="row dashboard-cards mb-2">
                    {renderCards()}
                </div>

                <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <h5>Gastos por Partida</h5>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    {ExpendedChart()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>Distribución de Cultivos</h5>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    <canvas id="cultivationChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Últimos Pedidos</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Table />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: "55px" }}>
                &nbsp;
            </div>
        </div>
    );
}