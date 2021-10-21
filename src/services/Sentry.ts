import { use } from "@cubos/inject";
import { captureException, init, withScope } from "@sentry/node";

export class Sentry {
  private readonly enabled;

  constructor() {
    if (process.env.SENTRY_DSN) {
      init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENVIRONMENT,
      });

      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }

  captureException = (error: Error) => {
    if (!this.enabled) {
      console.error(error);
      return;
    }

    withScope(scope => {
      const { name, deviceInfo, args } = use.request;

      scope.setExtra("request", use.request);
      scope.setTag("transaction_id", use.request.id.substring(0, 32));
      scope.setTag("call", name);
      scope.setContext(name, {
        args,
        call: name,
        deviceInfo,
      });

      captureException(error);
    });
  };
}
