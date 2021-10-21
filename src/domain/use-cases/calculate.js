const { MissingParamError } = require('../../utils/errors')
/**
 * Represents a Calculate.
 * @constructor
 * @param {function} calculateCdiRate - Função para Calcular taxa do CDI.
 * @param {function} calculateAccumulatedCdiRate - Função para Calcular taxa CDI acumulada.
 * @param {function} loadMarketDataCdi - Função para carregar série histórica do CDI.
 */
module.exports = class Calculate { 
    constructor({calculateCdiRate, calculateAccumulatedCdiRate ,loadMarketDataCdi} = {}){
            this.calculateCdiRate = calculateCdiRate;
            this.calculateAccumulatedCdiRate = calculateAccumulatedCdiRate;
            this.loadMarketDataCdi = loadMarketDataCdi;
    }
    /**
     * Calcular CDB.
     * @param {Date} investmentDate - Data inicial do investimento.
     * @param {number} cdbRate - Taxa do CDB.
     * @param {Date} currentDate - Data atual.
     * @returns {Array} cdbPriceList.
     */
    async CDB(investmentDate,cdbRate,currentDate){
        
        if (!investmentDate) throw new MissingParamError('investmentDate');
        
        if (!this._checarData(new Date(investmentDate))) throw new MissingParamError('investmentDate não é uma data valida.');
        
        if (!cdbRate) throw new MissingParamError('cdbRate');

        if (!currentDate) throw new MissingParamError('currentDate');

        if (!this._checarData(new Date(currentDate))) throw new MissingParamError('currentDate não é uma data valida.');
        
        if(cdbRate < 0)  throw new MissingParamError('cdbRate não é um número válido.');
        
        if(typeof cdbRate != 'number')  throw new MissingParamError('cdbRate não é um número.');
        
        if(this._valideDates(investmentDate,currentDate)) throw new MissingParamError('investmentDate não pode ser maior que currentDate.');

        // Busca os dados do CDI com base nas datas fornecidas, data inicial do investimento e a data atual.
        let marketDataList = this.loadMarketDataCdi(new Date(investmentDate), new Date(currentDate));

         // Cria uma lista com o resultado dos cálculos.
         let cdbPriceList = []
         marketDataList.forEach((marketDataListLine) => {
             // marketDataList (Representação de uma linha)
             // Posição 0 (Nome = CDI)
             // Posição 1 (Data do CDI)
             // Posição 2 (Taxa do CDI)
 
             // Realiza o tratamento do campo date, já que ele vem em um formato não padronizado.
             let date = marketDataListLine[1].split('/')
 
             // Registra o valor da taxa CDI para cálculo do CDI acumulado.
             let cdiRate = parseFloat(this.calculateCdiRate(marketDataListLine[2]).toFixed(8))
 
             // Registra o valor da taxa CDI acumulada.
             let accumulatedCdiRate = parseFloat(this.calculateAccumulatedCdiRate(parseFloat(cdiRate), parseFloat(cdbRate), cdbPriceList.length > 0 ? parseFloat(cdbPriceList[cdbPriceList.length - 1].accumulatedCdiRate) : 0))
             
             // Calcula o preço unitário do CDB com base no CDI acumulado.
             let unitPrice = 1000 * accumulatedCdiRate.toFixed(8)
 
             // Cria uma lista com preços unitários, data em relação a cada preço e taxa CDI acumulada.
             // O campo date precisa ser padronizado para a saída, portanto é realizado uma nova "conversão".
             // O padrão de saída é YYYY-MM-DD.
             cdbPriceList.push({
                 accumulatedCdiRate: accumulatedCdiRate,
                 date: `${date[2]}-${date[1]}-${date[0]}`,
                 unitPrice: unitPrice
             })
         })
 
         // É removido a propriedade taxa cdi acumulada.
         cdbPriceList.forEach((cdbPriceData) => {
             delete cdbPriceData.accumulatedCdiRate
         })

         return cdbPriceList

    }
   
    _valideDates(investmentDate,currentDate){
        return new Date(investmentDate).getTime() > new Date(currentDate).getTime();
    }
     /**
     * Checar Data
     * @param {string} data - Data para validar.
     * @returns {Boolean} .
     */
    _checarData(data) {
        return data instanceof Date && !isNaN(data);
    }
}
