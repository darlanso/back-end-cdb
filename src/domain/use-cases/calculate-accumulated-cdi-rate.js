const BigNumber = require('bignumber.js');

/**
 * Calcular taxa CDI acumulada.
 * 
 * @param  {number} cdiRate - Taxa CDI.
 * @param {number} cdbRate - Taxa CDB.
 * @param {number} lastAccumulatedCdiRate - A última taxa CDI acumulada.
 * @returns {number} accumulatedCdiRate.
 * 
 */
const calculateAccumulatedCdiRate = (cdiRate, cdbRate, lastAccumulatedCdiRate) => {
   
    // Configuração BigNumber.
    BigNumber.config({ DECIMAL_PLACES: 16, ROUNDING_MODE: 5 })

    //  Cálculo da taxa CDI acumulada utilizando a última taxa CDI acumulada.
    let accumulatedCdiRate = new BigNumber(1 + cdiRate * (cdbRate / 100))

    // Caso o valor acumulado seja maior que 0, multiplica.
    // O valor acumulado só começa a ser calculado, no caso quando o primeiro acumulado é calculado.
    if(lastAccumulatedCdiRate > 0){
        accumulatedCdiRate = new BigNumber(lastAccumulatedCdiRate * accumulatedCdiRate)
    }

    return accumulatedCdiRate
}

module.exports = calculateAccumulatedCdiRate