const CalculateCDBController = require('./calculate-cdb-controller')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const { ServerError, UnauthorizedError } = require('../errors')


const makeSut = () => {
  const calculateSpy =  makeCalculate()
  const sut = new CalculateCDBController({
      calculate: calculateSpy
    })
    return {
      sut,
      calculateSpy
    }
}

const makeCalculate = () => {
  class CalculateSpy {
    async CDB (investmentDate,cdbRate,currentDate) {
      this.investmentDate = investmentDate;
      this.cdbRate = cdbRate;
      this.currentDate = currentDate;
      return this.cdbPriceList
    }
  }
  const calculateSpy = new CalculateSpy()
  calculateSpy.cdbPriceList = []
  return calculateSpy
}

describe('Calculate CDB Controller', () => {

    test('Should return 400 if no investmentDate is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          cdbRate: 'any_cdbRate',
          currentDate: 'any_currentDate'
        }
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.body.error).toBe(new MissingParamError('investmentDate').message)
    })

    test('Should return 400 if no cdbRate is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          investmentDate: 'any_investmentDate',
          currentDate: 'any_currentDate'
        }
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.body.error).toBe(new MissingParamError('cdbRate').message)
    })

    test('Should return 400 if no currentDate is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          cdbRate: 'any_cdbRate',
          investmentDate: 'any_investmentDate'
        }
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(400)
      expect(httpResponse.body.error).toBe(new MissingParamError('currentDate').message)
    })
    
    test('Should call Calculate with correct params', async () => {
      const { sut, calculateSpy } = makeSut()
      const httpRequest = {
        body: {
          investmentDate: "2016-11-14",
          cdbRate:  103.5,
          currentDate: "2016-12-26"
        }
      }
      await sut.route(httpRequest)
      expect(calculateSpy.investmentDate).toBe(httpRequest.body.investmentDate)
      expect(calculateSpy.cdbRate).toBe(httpRequest.body.cdbRate)
      expect(calculateSpy.currentDate).toBe(httpRequest.body.currentDate)
    })

    test('Should return 200 when valid credentials are provided', async () => {
      const { sut, calculateSpy } = makeSut()
      const httpRequest = {
        body: {
          investmentDate: "2016-11-14",
          cdbRate:  103.5,
          currentDate: "2016-12-26"
        }
      }
      const httpResponse = await sut.route(httpRequest)
      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.body).toBe(calculateSpy.cdbPriceList)
    })
});