import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../../styles/dashboard.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { CardSuperior }from "../../components/molecules/CardSuperior";
import { LineChart }from "../../components/organisms/LineChart";
import { TableHeader } from "../../components/molecules/TableHeader";


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
                                    <TableHeader />
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Cliente</th>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#1082</td>
                                                <td>Supermercado Central</td>
                                                <td>Manzanas Rojas</td>
                                                <td>500 kg</td>
                                                <td>02/03/2025</td>
                                                <td><span className="badge bg-success">Entregado</span></td>
                                            </tr>
                                            <tr>
                                                <td>#1081</td>
                                                <td>Fruterías Deliciosas</td>
                                                <td>Naranjas Valencia</td>
                                                <td>350 kg</td>
                                                <td>01/03/2025</td>
                                                <td><span className="badge bg-warning">En ruta</span></td>
                                            </tr>
                                            <tr>
                                                <td>#1080</td>
                                                <td>Restaurante Orgánico</td>
                                                <td>Mix de Frutas</td>
                                                <td>120 kg</td>
                                                <td>01/03/2025</td>
                                                <td><span className="badge bg-primary">Procesando</span></td>
                                            </tr>
                                            <tr>
                                                <td>#1079</td>
                                                <td>Hoteles Vacacionales</td>
                                                <td>Manzanas Verdes</td>
                                                <td>200 kg</td>
                                                <td>28/02/2025</td>
                                                <td><span className="badge bg-success">Entregado</span></td>
                                            </tr>
                                            <tr>
                                                <td>#1078</td>
                                                <td>Supermercado Norte</td>
                                                <td>Naranjas y Manzanas</td>
                                                <td>650 kg</td>
                                                <td>27/02/2025</td>
                                                <td><span className="badge bg-success">Entregado</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                &nbsp;
            </div>
        </div>
    );
}