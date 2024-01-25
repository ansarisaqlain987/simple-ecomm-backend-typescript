import { App } from '../app';
import { Logger } from '../utils/logger.util';

App.listen(3000, () => {
  Logger.info('Server started at port 3000');
});
