import { Bar } from 'react-chartjs-2';


const BarChart = ({ data, title , onClick, chartRef}) => {

    return (
        <Bar
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

export default BarChart