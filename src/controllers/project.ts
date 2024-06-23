import { Request, Response, NextFunction } from "express";
import projectService from "../services/project";

const postProject = (req: Request, res: Response, next: NextFunction) => {
  return projectService.CreateProject(req.body.project, req.context, res)
}

const putProject = (req: Request, res: Response, next: NextFunction) => {
  return projectService.UpdateProject(req.body.project, res)
}

const getProjects = (req: Request, res: Response, next: NextFunction) => {
  return projectService.GetProjects(req.query.type, req.context, res)
}

const deleteProject = (req: Request, res: Response, next: NextFunction) => {
  return projectService.DeleteProject(req.params.id, res)
}

export default {
  postProject,
  putProject,
  getProjects,
  deleteProject
}