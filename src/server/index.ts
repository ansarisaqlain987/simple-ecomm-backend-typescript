import { App } from '../app'
import { PORT } from '../config/app.config'
import { Logger } from '../utils/logger.util'

App.listen(PORT, () => {
  Logger.info('Server started at port ' + PORT)
})
