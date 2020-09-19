import { Request, Response } from 'express';
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

module.exports.createProject_2020_09_19 = [
  validators.body('name').isString().notEmpty(),
  validators.body('code').isString().notEmpty(),
  validators.header('tenantId').isUUID(),
  (req: Request<CreateProjectDto>, res: Response) => {
    const errors = validators.validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const body = req.body;

    const dto = {
      name: body.name,
      code: body.code,
    };

    const tenantId = req.header('tenantId');

    const project = createProject(dto, tenantId);

    res.json(project);
  },
];

module.exports.createProject_2020_05_01 = [
  validators.body('name').isString().notEmpty(),
  validators.body('code').isString().notEmpty(),
  validators.body('tenantId').isUUID(),
  (req: Request<CreateProjectDto & { tenantId: string }>, res: Response) => {
    const errors = validators.validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const body = req.body;

    const dto = {
      name: body.name,
      code: body.code,
    };

    const tenantId = body.tenantId;

    const project = createProject(dto, tenantId);

    res.json(project);
  },
];
