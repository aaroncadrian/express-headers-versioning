import * as _ from 'lodash';
import { RequestHandler } from 'express';
import * as core from 'express-serve-static-core';

export interface Options {
  headerKey: string;
}

export class HeaderVersioningUtil {
  private readonly headerKey: string;

  constructor(options: Options) {
    this.headerKey = options.headerKey;
  }

  mapVersions<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query
  >(
    versionMap: _.Dictionary<RequestHandler<P, ResBody, ReqBody, ReqQuery>>
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
    return (req, res, next) => {
      const version = req.header(this.headerKey);

      const handler = versionMap[version];

      if (!handler) {
        // @ts-ignore
        res.status(403).json({
          error: `Unsupported Version: ${version}`,
        });

        return;
      }

      handler(req, res, next);
    };
  }
}
