import './style.css';

// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

export type SimpleColumnChartProps = {
    options: {
        title: {
            text: string;
        };
        data: {
            type: 'column';
            dataPoints: {
                label: string;
                y: number;
            }[];
        }[];
    };
};

export type SimpleLinearChartProps = {
    options: {
        theme: 'light1' | 'light2' | 'dark1' | 'dark2';
        title: {
            text: string;
        };
        axisX: {
            valueFormatString: 'DD MM YYYY' | 'MMM YYYY' | 'MM';
        };
        axisY: {
            valueFormatString: "# '%'" | '#,##0.00' | 'string';
        };
        data: {
            type: 'line';
            dataPoints: {
                x: Date;
                y: number;
            }[];
        }[];
    };
};

export type PieChartProps = {
    options: {
        animationEnabled: boolean;
        exportEnabled: boolean;
        theme: 'light1' | 'light2' | 'dark1' | 'dark2';
        title: {
            text: string;
        };
        data: {
            type: 'pie';
            indexLabel: '{label}: {y}%';
            startAngle: -90;
            dataPoints: {
                y: number;
                label: string;
            }[];
        }[];
    };
};

type ChartProps =
    | SimpleColumnChartProps
    | SimpleLinearChartProps
    | PieChartProps;

export default function Chart({ options }: ChartProps) {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    return <CanvasJSChart options={options} />;
}
