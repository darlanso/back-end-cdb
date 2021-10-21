const fileSystem = require('fs')

const loadMarketDataCdi = (startInvestmentDate, currentDate) => {
    // Retorna o arquivo com o market data do CDI.
    let marketData = fileSystem.readFileSync('src/infra/data/CDI_Prices.csv').toString()

    // Realiza a quebra de linha do arquivo, já que ele foi convertido em string na linha 5.
    marketData = marketData.split('\n')

    // Remove possíveis espaços em branco de cada string.
    marketData = marketData.map(e => e.trim())

    // Quebra cada string em array e depois remove possíveis espaços em branco.
    marketData = marketData.map(e => e.split(',').map(e => e.trim()))

    // Remove o cabeçalho do csv.
    marketData.shift()
    // Remove o último elemento do documento que é uma linha em branco.
    marketData.pop()
    // Reverte a ordem do array, pois ele possui uma ordem do mais novo para o mais antigo.
    marketData.reverse()

    // Cria uma nova lista.
    const marketDataList = [] 

    // Separa em uma nova lista as datas necessárias para o cálculo.
    marketData.forEach((marketDataLine) => {
        // Converte a coluna data do csv para um padrão aceito (YYYY-MM-DD).
        let date = marketDataLine[1].split('/')
        date = new Date(`${date[2]}-${date[1]}-${date[0]}`)

        // Caso a data esteja dentro do prazo selecionado, ele separa esse dado na nova lista.
        if(date.getTime() >= startInvestmentDate.getTime() &&
           date.getTime() <= currentDate.getTime()){
            marketDataList.push(marketDataLine)
        }
    })

    return marketDataList
}

module.exports = loadMarketDataCdi