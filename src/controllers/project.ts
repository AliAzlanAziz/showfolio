import { Request, Response, NextFunction } from "express";
import projectService from "../services/project";

const postProject = (req: Request, res: Response) => {
  return projectService.CreateProject(req.body.project, req.context, res)
}

const putProject = (req: Request, res: Response) => {
  return projectService.UpdateProject(req.body.project, res)
}

const getProject = (req: Request, res: Response) => {
  return projectService.GetProject(req.params.id, res)
}

const getProjects = (req: Request, res: Response) => {
  return projectService.GetProjects(req.context, res)
}

const deleteProject = (req: Request, res: Response) => {
  return projectService.DeleteProject(req.params.id, res)
}

export default {
  postProject,
  putProject,
  getProject,
  getProjects,
  deleteProject
}