import * as Brakes from 'brakes';
import * as http from 'http';

/**
 * Add Hystrix configuration to the app server
 */
// tslint:disable:no-console
export const configHystrix = () => {
  if (process.env.STREAM_HYSTRIX === 'true') {
    const globalStats = Brakes.getGlobalStats();
    const hystrixPort = process.env.HYSTRIX_PORT || 3001;
    http
      .createServer((req, res) => {
        res.setHeader('Content-Type', 'text/event-stream;charset=UTF-8');
        res.setHeader(
          'Cache-Control',
          'no-cache, no-store, max-age=0, must-revalidate'
        );
        res.setHeader('Pragma', 'no-cache');
        globalStats.getHystrixStream().pipe(res);
      })
      .listen(hystrixPort, () => {
        console.log('---------------------');
        console.log(
          `Hystrix Stream now live at localhost:${hystrixPort}/hystrix.stream`
        );
        console.log('---------------------');
      });
  }
};
