import { useState, useEffect } from 'react'

import Main from '../components/Main'
import Header from '../components/Header'
import Investment from '../components/Investment'
import Investments from '../components/Investments'
import { results } from '../data/dataSource'

export default function InvestmentsPage() {

  const [investments, setInvestments] = useState([])

  useEffect(() => {
    const orderedInvestments = results.sort((a,b) => b.annualResult.percent - a.annualResult.percent)
    setInvestments(orderedInvestments)
  },[])
  
  return (
    <>
      <Header>📈 React Investments</Header>
      <Main>
        <Investments>
          {investments.map(({ id, title, description, monthlyReports, annualResult},index) => {
            return (
              <Investment 
                key={id}
                title={title} 
                description={description}
                monthlyReports={monthlyReports}
                annualResult={annualResult}
                ranking={index + 1}
               />
             )
           })}
        </Investments>
      </Main>
    </>  )
}
