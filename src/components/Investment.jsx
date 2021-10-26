import ValueIndex from './ValueIndex'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ChartResultPercent from '../components/ChartResultPercent'
import ChartResultValue from '../components/ChartResultValue'
import TopRankingDecoration from './TopRankingDecoration';

export default function Investment({
  id,
  description = 'Descrição do Card',
  monthlyReports = [],
  annualResult = {},
  ranking = 0
}) {
  const { value: annualValue, percent: annualPercent } = annualResult

  const annualResultValueTextColor =
    annualValue > 0 ? 'text-green-500' : 'text-red-600'

  const annualResultPercentBgColor =
    annualPercent > 0 ? 'bg-green-500' : 'bg-red-600'

  // charts' labels and data
  const chartMonthLabels = monthlyReports.map(item => item.month)
  const chartPercentResultData = monthlyReports.map(item => item.result.percent)
  const chartPercentResultMediumData = Array(chartPercentResultData.length).fill((parseFloat(annualPercent / chartPercentResultData.length).toPrecision(2)))
  const chartValueResultData = monthlyReports.map(item => item.result.value)

  return (

    <div className="border-2 border-gray-200 rounded shadow-lg mb-8 p-6 bg-white">
      <div className="flex justify-center font-semibold text-lg">
       <span className='m4'><TopRankingDecoration ranking={ranking} /> {description}</span> 
      </div>
      <div className="flex justify-center p-2 font-semibold text-sm space-x-1 mb-4">

        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 bg-gray-100 space-x-1`}>
          <span>Rend. Total:</span>
          <span className={`${annualResultValueTextColor}`}>
            <ValueIndex value={annualValue} />
          </span>
        </span>
        
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 ${annualResultPercentBgColor}`}>
          <ValueIndex
            value={annualPercent}
            styleType={'percent'}
            currency={false}
          />
        </span>
      </div>

      <Tabs>

        <TabList>
          <div className='text-sm'>
          <Tab>Rendimento (%)</Tab>
          <Tab>Rendimento (R$)</Tab>
          </div>
        </TabList>

        <TabPanel>
         <div className='flex items-center'>
          <ChartResultPercent 
              labels={chartMonthLabels} 
              data1={chartPercentResultData} 
              data1Label={'Rendimento Mensal'}
              data2={chartPercentResultMediumData} 
              data2Label={'Média'}  
            />
         </div>
        </TabPanel>

        <TabPanel>
         <div className='flex items-center'>
          <ChartResultValue 
            labels={chartMonthLabels} 
            data={chartValueResultData} 
            dataLabel={'Rendimento Mensal'}
          />
         </div>
        </TabPanel>

     </Tabs>

      <div className="pt-4 text-sm">
        <ul className="">
          {monthlyReports.map((item) => {
            
            const { value: monthValue, month, year } = item

            const { 
              percent: monthResultPercent 
            } = item.result

            let monthResultTextColor = ''

            if (monthResultPercent < 0){
              monthResultTextColor = 'text-red-500'
            }

            if (monthResultPercent > 0) {
              monthResultTextColor = 'text-green-500'
            } 

            return (
              <li key={`${description}-${month}`} className="pt-2">
                <div className="flex flex-row items-center justify-between border-b-2 border-gray-50 ">
                  
                  <div className="flex flex-row items-center space-x-3">
                    <span className='inline-block text-center rounded-lg w-20 py-2 mb-2 text-xs font-semibold text-gray-200 bg-gradient-to-t from-black via-gray-700 to-gray-600'>
                      {month}/{year}
                    </span>
                    <span className={`flex-grow mb-2 ${monthResultTextColor}`}>
                      <ValueIndex value={monthValue} />
                    </span>
                  </div>
                  
                  <div className={`flex flex-row items-center space-x-3${monthResultTextColor}`}>
                  <span className={`text-sm font-semibold mb-2 ${monthResultTextColor}`}>
                    <ValueIndex
                      value={monthResultPercent}
                      styleType={'percent'}
                      currency={false}
                    />
                    </span>
                  </div>

                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
   
  )
}
