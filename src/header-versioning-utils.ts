import * as _ from 'lodash';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export interface Options {
  headerKey: string;
}

export class HeaderVersioningUtil {
  private readonly headerKey: string;

  constructor(options: Options) {
    this.headerKey = options.headerKey;
  }

  mapVersions(versionMap: _.Dictionary<RequestHandler>): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const version = req.header(this.headerKey);

      const handler = versionMap[version];

      if (!handler) {
        res.status(403).json({
          error: `Unsupported Version: ${version}`,
        });

        return;
      }

      handler(req, res, next);
    };
  }
}
