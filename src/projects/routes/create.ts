import { Request, Response } from 'express';

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

module.exports.createProject_2020_09_19 = (
  req: Request<CreateProjectDto>,
  res: Response
) => {
  const body = req.body;

  const dto = {
    name: body.name,
    code: body.code,
  };

  const tenantId = req.header('tenantId');

  const project = createProject(dto, tenantId);

  res.json(project);
};

module.exports.createProject_2020_05_01 = (
  req: Request<CreateProjectDto & { tenantId: string }>,
  res: Response
) => {
  const body = req.body;

  const dto = {
    name: body.name,
    code: body.code,
  };

  const tenantId = body.tenantId;

  const project = createProject(dto, tenantId);

  res.json(project);
};
