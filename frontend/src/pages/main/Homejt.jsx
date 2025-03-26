import { useState, useEffect } from "react";
import '../../styles/dashboard.css';
// import { CardSuperior }from "../../components/molecules/CardSuperior";
// import { LineChart }from "../../components/organisms/LineChart";
// import { Table } from "../../components/organisms/Table";


export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Home effect started');
        const initializeDashboard = async () => {
          try {
            console.log('Inicializando dashboard');
            // Cualquier inicialización
            console.log('Dashboard inicializado');
            setIsLoading(false);
          } catch (err) {
            console.error("Error inicializando dashboard:", err);
            setError(err);
            setIsLoading(false);
          }
        };
      
        initializeDashboard();
      }, []);
  
    if (isLoading) {
      return <div>Cargando Dashboard...</div>;
    }
  
    if (error) {
      return <div>Error al cargar el Dashboard: {error.message}</div>;
    }
  
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
        // for (let i = 0; i < cardData.length; i++) {
        //     cards.push(
        //         <CardSuperior
        //             key={i}
        //             label={cardData[i].label}
        //             text={cardData[i].text}
        //             pie={cardData[i].pie}
        //         />
        //     );
        // }
        // return cards;
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

    // const ExpendedChart = () => {
    //     try {
    //       return <LineChart chartData={salesData} width="100%" height="310px" xtext="Mes" ytext="Valor"/>;
    //     } catch (err) {
    //       console.error("Error renderizando gráfico:", err);
    //       return <div>Error al cargar el gráfico</div>;
    //     }
    //   };


	return (
		<div className="content">
            <div className="header">
                <h1 className="text-center">Dashboard</h1>
            </div>

            <div style={{ height: "55px" }}>
                &nbsp;
            </div>
        </div>
    );
}