import './style.css';

// @ts-expect-error this library does not have typescript support
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
        title?: { text: string } | undefined;
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

type ChartProps = {
    options: SimpleColumnChartProps | SimpleLinearChartProps | PieChartProps;
    width?: string;
    height?: string;
};

export default function Chart({ options, width, height }: ChartProps) {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    if (width && height) {
        return (
            <CanvasJSChart
                options={options.options}
                containerProps={{
                    width: width,
                    height: height,
                }}
            />
        );
    }
    return <CanvasJSChart options={options.options} />;
}
