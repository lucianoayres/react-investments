export default function ValueIndex( {
  value = 0, 
  locale= 'pt-BR', 
  decimals = 2,
  styleType = 'currency',
  currency = 'BRL'
}) {

  const options =  
  { 
    maximumFractionDigits: decimals, 
    minimumFractionDigits: decimals,
    style: styleType
  }

  if (currency){
    options.currency = currency
  }

  let workingValue = value

  if (styleType === 'percent') {
    workingValue = workingValue / 100
  }

  let formattedValue = workingValue.toLocaleString(locale, options)
  
  if(styleType === 'percent' && workingValue > 0){
    formattedValue = '+' + formattedValue
  }

  return formattedValue
   
}
