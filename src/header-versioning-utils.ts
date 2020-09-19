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
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery>[] {
    const getVersion = (req) => req.header(this.headerKey);

    const getHandler = (req) => versionMap[getVersion(req)];

    return [
      (req, res, next) => {
        const version = getVersion(req);

        if (!!version) {
          next();
        } else {
          // @ts-ignore
          res.status(403).json({
            error: `${this.headerKey} header is required.`,
          });
        }
      },
      (req, res, next) => {
        const version = getVersion(req);

        if (version in versionMap) {
          next();
        } else {
          // @ts-ignore
          res.status(403).json({
            error: `Unsupported Version: ${version}`,
          });
        }
      },
      (req, res, next) => {
        getHandler(req)(req, res, next);
      },
    ];
  }
}
