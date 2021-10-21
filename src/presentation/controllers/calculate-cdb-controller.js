const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class CalculateCDBController {
  constructor ({ calculate  } = {}) {
      this.calculate = calculate
  }

  async route (httpRequest) {
    try {
      const { investmentDate, cdbRate, currentDate } = httpRequest.body
      if (!investmentDate) {
        return HttpResponse.badRequest(new MissingParamError('investmentDate'))
      }
      if (!cdbRate) {
        return HttpResponse.badRequest(new MissingParamError('cdbRate'))
      }
      if (!currentDate) {
        return HttpResponse.badRequest(new MissingParamError('currentDate'))
      }
     
      const cdbPriceList = await this.calculate.CDB(investmentDate,cdbRate,currentDate);

      return HttpResponse.ok( cdbPriceList.reverse())
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
