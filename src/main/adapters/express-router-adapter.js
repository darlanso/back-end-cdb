module.exports = class ExpressRouterAdapter {
    static adapt (controller) {
      return async (req, res) => {
        const httpRequest = {
          body: req.body
        }
        const httpResponse = await controller.route(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }
  }