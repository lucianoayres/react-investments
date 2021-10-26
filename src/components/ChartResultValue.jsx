import { Bar } from 'react-chartjs-2'

export default function ChartResultValue({ 
  labels = [],
  data = [],
  dataLabel = ''
}) {

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: dataLabel,
        backgroundColor: function(context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value < 0 ? 'rgba(255,0,0,0.2)' :  'rgba(0,128,0,0.2)'
      },
        borderColor: function(context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value < 0 ? 'rgb(255,0,0)' :  'rgb(0,128,0)'
      },
        borderWidth: 1,
        data
      }
    ]
  };
  
  const chartOptions = {
    scales: {
      y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return 'R$ ' + value;                }
          }
       }
    },
    title:{
      display:true,
      text:'Rendimento (R$)',
      fontSize:20
    },
    legend:{
      display:true,
      position:'right'
    },
    borderRadius: 6,
    plugins: {
      tooltip: {
          callbacks: {
              label: function(context) {
                  var label = context.dataset.label || '';
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label = 'Resultado: ' + context.parsed.y.toLocaleString('pt-BR', { decimals: 2, style: 'currency', currency: 'BRL'});
                  }
                  return label;
              }
          }
      }
   }
  };

  return <Bar data={chartData} options={chartOptions} />
 
}
