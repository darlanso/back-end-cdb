
/**
 * Calcular taxa do CDI.
 *
 * @param {number} cdi - O valor da taxa CDI.
 * @returns {number} cdiRate.
 */
const calculateCdiRate = (cdi) => {
    const cdiRate = Math.pow((cdi / 100) + 1, 1 / 252) - 1

    return parseFloat(cdiRate.toFixed(8))
}

module.exports = calculateCdiRate