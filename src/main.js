import { error, value as config } from './config';
import app from './server/app';
import { logger } from './server/logger';

// validate required env vars
if (error) {
  logger.error(error);
  process.exit(1);
}

(async function start() {
  const server = app.listen(config.PORT, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Listening on port ${config.PORT}`);
  });

  const shutdown = () => server.close((err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
      return;
    }
    process.exit(0);
  });

  process.on('SIGINT', () => {
    logger.info('Got SIGINT. Graceful shutdown');
    shutdown();
  });

  process.on('SIGTERM', () => {
    logger.info('Got SIGTERM. Graceful shutdown');
    shutdown();
  });
}());
