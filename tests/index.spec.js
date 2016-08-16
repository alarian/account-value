/* eslint-env node, mocha */
const expect = require('chai').expect
import accountValue, {allItemIds, boundItemIds} from '../src/index'
import {bankValue} from '../src/bank'
import {materialsValue} from '../src/materials'
import {skinsValue} from '../src/skins'
import {walletValue} from '../src/wallet'
import {dyesValue} from '../src/dyes'
import {minisValue} from '../src/minis'
import {commerceValue} from '../src/commerce'
import {charactersValue} from '../src/characters'
import bankData from './data/bank'
import materialsData from './data/materials'
import skinsData from './data/skins'
import walletData from './data/wallet'
import dyesData from './data/dyes'
import minisData from './data/minis'
import commerceData from './data/commerce'
import charactersData from './data/characters'
import values from './data/_values'

const accountData = {
  bank: bankData,
  materials: materialsData,
  skins: skinsData,
  wallet: walletData,
  dyes: dyesData,
  minis: minisData,
  commerce: commerceData,
  characters: charactersData
}

const expectedValues = {
  summary: {
    liquidBuy: 9184,
    liquidSell: 10192,
    value: 15229
  },
  bank: {
    liquidBuy: 10,
    liquidSell: 15,
    value: 274
  },
  materials: {
    liquidBuy: 25,
    liquidSell: 42,
    value: 100
  },
  skins: {
    fullValue: 2040,
    value: 840
  },
  wallet: {
    liquidBuy: 1000,
    liquidSell: 1000,
    value: 1000
  },
  dyes: {
    value: 28
  },
  minis: {
    value: 28
  },
  commerce: {
    liquidBuy: 7171,
    liquidSell: 7551,
    value: 7931,
    details: {
      buys: {
        liquidBuy: 6831,
        liquidSell: 6831,
        value: 6831
      },
      sells: {
        liquidBuy: 340,
        liquidSell: 720,
        value: 1100
      }
    }
  },
  characters: {
    liquidBuy: 978,
    liquidSell: 1584,
    value: 5028,
    details: [
      {
        name: 'Some Character',
        liquidBuy: 147,
        liquidSell: 243,
        value: 1625
      },
      {
        name: 'Some other Character',
        liquidBuy: 831,
        liquidSell: 1341,
        value: 3403
      }
    ]
  }

}

describe('account value', () => {
  it('calculates the account value correctly', () => {
    expect(accountValue(accountData, values)).to.deep.equal(expectedValues)
  })

  it('can calculate the account value with no data', () => {
    expect(accountValue({}, values)).to.deep.equal({
      summary: {
        liquidBuy: 0,
        liquidSell: 0,
        value: 0
      },
      bank: null,
      characters: null,
      commerce: null,
      dyes: null,
      materials: null,
      minis: null,
      skins: null,
      wallet: null
    })
  })

  it('can fetch all item ids', () => {
    expect(allItemIds(accountData)).to.deep.equal([
      123,
      44,
      58,
      74264,
      71425,
      49432,
      12134,
      12238,
      8932,
      9586,
      76453,
      44286,
      28083,
      24647,
      39223,
      63604,
      69774,
      79031,
      77429,
      39619,
      71436,
      49428,
      77230,
      77239,
      78778,
      78757
    ])

    expect(allItemIds({})).to.deep.equal([])
  })

  it('can fetch all bound ids', () => {
    expect(boundItemIds(accountData)).to.deep.equal([
      123,
      58,
      74264,
      71425,
      49432,
      44286,
      24647,
      39223,
      63604,
      79031,
      77429,
      39619,
      71436,
      49428
    ])

    expect(boundItemIds({})).to.deep.equal([])
  })

  it('calculates the bank value correctly', () => {
    expect(bankValue(accountData, values)).to.deep.equal(expectedValues.bank)
  })

  it('calculates the materials value correctly', () => {
    expect(materialsValue(accountData, values)).to.deep.equal(expectedValues.materials)
  })

  it('calculates the skins value correctly', () => {
    const ownedItems = [123]
    expect(skinsValue(accountData, values, ownedItems)).to.deep.equal(expectedValues.skins)
  })

  it('calculates the wallet value correctly', () => {
    expect(walletValue(accountData, values)).to.deep.equal(expectedValues.wallet)
  })

  it('calculates the dyes value correctly', () => {
    expect(dyesValue(accountData, values)).to.deep.equal(expectedValues.dyes)
  })

  it('calculates the minis value correctly', () => {
    expect(minisValue(accountData, values)).to.deep.equal(expectedValues.minis)
  })

  it('calculates the commerce value correctly', () => {
    expect(commerceValue(accountData, values)).to.deep.equal(expectedValues.commerce)
  })

  it('calculates the characters value correctly', () => {
    expect(charactersValue(accountData, values)).to.deep.equal(expectedValues.characters)
  })
})