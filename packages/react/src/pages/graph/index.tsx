import './style.css';
import Chart, {
    PieChartProps,
    SimpleColumnChartProps,
    SimpleLinearChartProps,
} from '~/components/charts';

export default function Graph() {
    const simpleColumnOption: SimpleColumnChartProps = {
        options: {
            title: {
                text: 'Basic Column Chart in React',
            },
            data: [
                {
                    type: 'column',
                    dataPoints: [
                        { label: 'Apple', y: 10 },
                        { label: 'Orange', y: 15 },
                        { label: 'Banana', y: 25 },
                        { label: 'Mango', y: 30 },
                        { label: 'Grape', y: 28 },
                    ],
                },
            ],
        },
    };

    const simpleLinearOption: SimpleLinearChartProps = {
        options: {
            theme: 'light2',
            title: {
                text: 'Nifty 50 Index',
            },
            axisX: {
                valueFormatString: 'DD MM YYYY',
            },
            axisY: {
                valueFormatString: "# '%'",
            },
            data: [
                {
                    type: 'line',
                    dataPoints: [
                        { x: new Date('2021-01-11'), y: 100 },
                        { x: new Date('2022-02-12'), y: 200 },
                        { x: new Date('2023-03-13'), y: 150 },
                        { x: new Date('2024-04-14'), y: 175 },
                        { x: new Date('2025-05-15'), y: 150 },
                        { x: new Date('2026-06-16'), y: 125 },
                    ],
                },
            ],
        },
    };

    const pieOptions: PieChartProps = {
        options: {
            animationEnabled: true,
            exportEnabled: true,
            theme: 'light1',
            title: {
                text: 'Trip Expenses',
            },
            data: [
                {
                    type: 'pie',
                    indexLabel: '{label}: {y}%',
                    startAngle: -90,
                    dataPoints: [
                        { y: 20, label: 'Airfare' },
                        { y: 24, label: 'Food & Drinks' },
                        { y: 20, label: 'Accomodation' },
                        { y: 14, label: 'Transportation' },
                        { y: 12, label: 'Activities' },
                        { y: 10, label: 'Misc' },
                    ],
                },
            ],
        },
    };

    return (
        <div className="container">
            <div className="chart-container">
                <Chart options={simpleColumnOption} />
            </div>

            <div className="chart-container">
                <Chart options={simpleLinearOption} />
            </div>

            <div className="chart-container">
                <Chart options={pieOptions} />
            </div>
        </div>
    );
}
