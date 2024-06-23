import { Response } from 'express';
import { Types } from 'mongoose';
import { isBefore } from 'date-fns';
import { ContextModel } from '../models/context.model';
import Project from '../schema/project';
import { ProjectModel } from '../models/project.model';

const CreateProject = async (project: ProjectModel, context: ContextModel, res: Response) => {
  try {
    if(isBefore(project.to, project.from)){
      return res.status(400).json({
        success: false,
        message: '"to" date cannot be before "fom" date',
      });
    }

    const newProject = new Project({
      _id: new Types.ObjectId(),
      user: context.user._id,
      title: project.title,
      description: project.description,
      workDone: project.workDone,
      from: project.from,
      to: project.to,
    })

    await newProject.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully created project!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating project!',
    });
  }
};

const UpdateProject = async (projectBody: ProjectModel, res: Response) => {
  try {
    if(isBefore(projectBody.to, projectBody.from)){
      return res.status(400).json({
        success: false,
        message: '"to" date cannot be before "from" date',
      });
    }

    let updatedProject: any = {
      title: projectBody.title,
      description: projectBody.description,
      workDone: projectBody.workDone,
      from: projectBody.from,
      to: projectBody.to,
    }
    
    await Project.findByIdAndUpdate(projectBody.id, updatedProject)

    return res.status(200).json({
      success: true,
      message: 'Successfully updated project!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating project!',
    });
  }
};

const GetProjects = async (type: any, context: ContextModel, res: Response) => {
  try {
    const projects = await Project.find({user: context.user._id}).sort({ from: 'asc' });

    return res.status(200).json({
      success: true,
      data: projects,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const DeleteProject = async (id: string, res: Response) => {
  try {
    const workInfoPresent = await Project.findByIdAndDelete(id)

    return res.status(200).json({
      success: true,
      message: 'Successfully removed project!',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error removing project!',
    });
  }
};

export default {
  CreateProject,
  UpdateProject,
  GetProjects,
  DeleteProject
}