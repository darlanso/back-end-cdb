
const Calculate = require('./calculate')
const calculateCdiRate = require('./calculate-cdi-rate')
const calculateAccumulatedCdiRate = require('./calculate-accumulated-cdi-rate')
const loadMarketDataCdi = require('./load-market-data-cdi')
const { MissingParamError } = require('../../utils/errors')

const makeSut =  () => {
    const sut =  new Calculate({
        calculateCdiRate, 
        calculateAccumulatedCdiRate,
        loadMarketDataCdi
    })
    return {
      sut,
      calculateCdiRate,
      calculateAccumulatedCdiRate,
      loadMarketDataCdi
    }
  }
describe('Calculate UseCase', ()  => {
    test('Should throw if no investmentDate is provided', async () => {
        const { sut } =  makeSut()
        const promise =  sut.CDB()
        await expect(promise).rejects.toThrow(new MissingParamError('investmentDate'))
    })

    test('Should throw if  investmentDate is not valid date', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('23',103.5,"2016-04-18")
        await expect(promise).rejects.toThrow(new MissingParamError('investmentDate não é uma data valida.'))
    })

    test('Should throw if no cdbRate is provided', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('2018-04-18')
        await expect(promise).rejects.toThrow(new MissingParamError('cdbRate'))
    })

    test('Should throw if no currentDate is provided', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('2018-04-18',103.5)
        await expect(promise).rejects.toThrow(new MissingParamError('currentDate'))
    })

    test('Should throw if  currentDate is not valid date', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('2018-04-18',103.5,'22')
        await expect(promise).rejects.toThrow(new MissingParamError('currentDate não é uma data valida.'))
    })

    test('Should throw if cdbRate is negative number', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('2018-04-18',-1,"2016-12-26")
        await expect(promise).rejects.toThrow(new MissingParamError('cdbRate não é um número válido.'))
    })
    test('Should throw if cdbRate is not a number', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('2018-04-18','aaa',"2016-12-26")
        await expect(promise).rejects.toThrow(new MissingParamError('cdbRate não é um número.'))
    })
    test('Should throw if investmentDate is greater than currentDate', async () => {
        const { sut } = makeSut()
        const promise = sut.CDB('2018-04-19',103.5,"2016-04-18")
        await expect(promise).rejects.toThrow(new MissingParamError('investmentDate não pode ser maior que currentDate.'))
    })
})