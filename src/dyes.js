import _sum from 'sum-by'

export function dyesValue (accountData, values) {
  if (!accountData.dyes) {
    return null
  }

  // Just sum up the value of all unlocked dyes
  const dyes = accountData.dyes
    .filter(dye => values.dyes[dye] && values.dyes[dye].value)

  const nonGemstoreDyes = dyes.filter(dye => values.dyes[dye].gemstore === false)

  return {
    value: _sum(dyes, x => values.dyes[x].value),
    valueMinusGemItems: _sum(nonGemstoreDyes, x => values.dyes[x].value),
    spentGems: _sum(dyes, x => values.dyes[x].gemstore)
  }
}
