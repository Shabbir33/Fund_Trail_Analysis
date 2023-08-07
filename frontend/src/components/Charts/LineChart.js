import { Line } from 'react-chartjs-2';


const LineChart = ({ data, title , onClick, chartRef}) => {

    return (
        <Line
            ref={chartRef}
            onClick={onClick}
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: title
                    },
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}

export default LineChart