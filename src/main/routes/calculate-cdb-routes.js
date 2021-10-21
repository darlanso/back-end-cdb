const { adapt } = require('../adapters/express-router-adapter')
const CalculateCDBRouterComposer = require('../composers/calculate-cdb-router-composer')

module.exports = router => {
  router.post('/calculatecdb', adapt(CalculateCDBRouterComposer.compose()))
}
