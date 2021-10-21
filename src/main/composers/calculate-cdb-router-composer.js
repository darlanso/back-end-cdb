const CalculateCDBController = require('../../presentation/controllers/calculate-cdb-controller')

const Calculate = require('../../domain/use-cases/calculate')

const calculateCdiRate = require('../../domain/use-cases/calculate-cdi-rate')
const calculateAccumulatedCdiRate = require('../../domain/use-cases/calculate-accumulated-cdi-rate')
const loadMarketDataCdi = require('../../domain/use-cases/load-market-data-cdi')

module.exports = class CalculateCDBRouterComposer {
  static compose () {
    
    const calculate = new Calculate({
        calculateCdiRate, 
        calculateAccumulatedCdiRate,
        loadMarketDataCdi
    })
    return new CalculateCDBController({
        calculate
    })
  }
}
