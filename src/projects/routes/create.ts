import { Response, Request, NextFunction } from 'express';
import * as validators from 'express-validator';

interface CreateProjectDto {
  name: string;
  code: string;
}

interface Project {
  id: string;

  name: string;
  code: string;

  tenantId: string;
}

function generateRandomProjectId(): string {
  return 'NEW_PROJECT_ID_RANDOMLY_GENERATED';
}

function createProject(dto: CreateProjectDto, tenantId: string): Project {
  return {
    id: generateRandomProjectId(),

    name: dto.name,
    code: dto.code,

    tenantId,
  };
}

module.exports.createProject_2020_09_19 = (req, res, next) => {
  res.json({
    ok: true,
    version: '2020-05-01',
  });
};

module.exports.createProject_2020_05_01 = [
  (
    req: Request<CreateProjectDto & { tenantId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    // get account ID and contract ID from project.

    console.log(req.body);

    const body = req.body || {};

    const dto = {
      name: body.name,
      code: body.code,
    };

    const tenantId = body.tenantId;

    if (!validateTenantId(tenantId)) {
      res.status(403).json({
        error: {
          tenantId: 'tenantId is required in request body',
        },
      });

      return;
    }

    const project = createProject(dto, tenantId);

    res.json(project);
  },
];

function validateTenantId(tenantId: string): boolean {
  return !!tenantId;
}
