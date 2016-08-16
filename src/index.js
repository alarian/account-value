import {bankValue, bankItems} from './bank'
import {materialsValue, materialsItems} from './materials'
import {walletValue} from './wallet'
import {charactersValue, charactersItems} from './characters'
import {skinsValue} from './skins'
import {minisValue} from './minis'
import {dyesValue} from './dyes'
import {commerceValue, commerceItems} from './commerce'
import calculateSummary from './helpers/calculateSummary'

export default function accountValue (accountData, values) {
  let account = {}

  // Grab all the account's items (for the calculation of the skin values)
  const items = boundItemIds(accountData)

  // Calculate the different parts of the account value
  account.wallet = walletValue(accountData)
  account.bank = bankValue(accountData, values)
  account.materials = materialsValue(accountData, values)
  account.commerce = commerceValue(accountData, values)
  account.skins = skinsValue(accountData, values, items)
  account.dyes = dyesValue(accountData, values)
  account.minis = minisValue(accountData, values)
  account.characters = charactersValue(accountData, values)

  // Calculate the total summary
  account.summary = calculateSummary(account)
  return account
}

// Get all items bound to the account
export function boundItemIds (accountData) {
  const items = [
    bankItems(accountData),
    charactersItems(accountData)
  ]

  return items
    .reduce((a, b) => a.concat(b), [])
    .filter(x => x.binding) // Ignore unbound items
    .map(x => x.id) // Get the item ids
    .filter((x, i, self) => self.indexOf(x) === i) // Unique items
}

// Get all the item ids that are required for this account calculation
export function allItemIds (accountData) {
  const items = [
    bankItems(accountData),
    materialsItems(accountData),
    charactersItems(accountData),
    commerceItems(accountData)
  ]

  return items
    .reduce((a, b) => a.concat(b), [])
    .map(x => x.id) // Get the item ids
    .filter((x, i, self) => self.indexOf(x) === i) // Unique items
}