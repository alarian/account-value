import _sum from 'sum-by'

// Calculate the summary based on a details object or array
export default function calculateSummary (details) {
  const values = Object.values(details).filter(values => values)

  return {
    value: _sum(values, x => x.value || 0),
    valueMinusGemItems: _sum(values, x => {
      return typeof x.valueMinusGemItems !== 'undefined'
        ? x.valueMinusGemItems
        : x.value
    }),
    spentGems: _sum(values, x => x.spentGems || 0),
    liquidBuy: _sum(values, x => x.liquidBuy || 0),
    liquidSell: _sum(values, x => x.liquidSell || 0)
  }
}
