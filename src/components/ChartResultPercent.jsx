import { Line } from 'react-chartjs-2'

export default function ChartResultPercent({ 
  labels = [],
  data1 = [],
  data1Label = '',
  data2 = [],
  data2Label = ''
}) {

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: data1Label,
        data: data1,
        fill: false,
        backgroundColor: function(context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value < 0 ? 'red' :  'rgba(0,128,0, 1)'
      },
        borderColor: 'rgba(0,128,0, 0.2)',
      },
      {
        label: data2Label,
        data: data2,
        fill: false,
        backgroundColor: 'rgba(147,112,219, 1)',
        borderColor: 'rgba(147,112,219, 0.2)',
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return value + '%';                }
          }
       }
    },
    borderWidth: 4,
    tension: 0.1,
    pointRadius: 4,
    pointHoverRadius: 12,
    plugins: {
      tooltip: {
          callbacks: {
              label: function(context) {
                  var label = context.dataset.label || '';
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += context.parsed.y + '%';
                  }
                  return label;
              }
          }
      }
    }
  };

  return <Line data={chartData} options={chartOptions} />
 
}
