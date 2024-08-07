import { Response } from 'express';
import { Types } from 'mongoose';
import { isBefore } from 'date-fns';
import { ContextModel } from '../models/context.model';
import Project from '../schema/project';
import projectRepository from '../repo/project';
import { ProjectModel } from '../models/project.model';
import { CONSTANTS } from '../constants/constants';
import { uploadBase64Image } from '../helper/uploadImage';
import { cloudinary } from '../config/cloudinary';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('service:project.js')

const CreateProject = async (project: ProjectModel, context: ContextModel, res: Response) => {
  try {
    if(isBefore(project.to, project.from)){
      return res.status(400).json({
        success: false,
        message: '"to" date cannot be before "fom" date',
      });
    }

    let imageURL = null;
    const newProjectId = new Types.ObjectId();

    if(project?.uploadingImage){
      imageURL = await uploadBase64Image(project.base64Image, CONSTANTS.PROJECT_IMAGE_FOLDER, newProjectId.toString())
    }

    const newProject = new Project({
      _id: newProjectId,
      user: context.user._id,
      title: project.title,
      desc: project.desc,
      contrib: project.contrib,
      from: project.from,
      to: project.to,
      imageURL: imageURL ? imageURL : ''
    })

    await newProject.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully created project!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
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
      desc: projectBody.desc,
      contrib: projectBody.contrib,
      from: projectBody.from,
      to: projectBody.to
    }

    if(projectBody?.uploadingImage){
      const imageURL = await uploadBase64Image(projectBody.base64Image, CONSTANTS.PROJECT_IMAGE_FOLDER, projectBody.id);

      updatedProject = {...updatedProject, imageURL: imageURL}
    }
    
    await projectRepository.findByIdAndUpdate(projectBody.id, updatedProject)

    return res.status(200).json({
      success: true,
      message: 'Successfully updated project!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Error creating project!',
    });
  }
};

const GetProject = async (id: string, res: Response) => {
  try {
    const project = await projectRepository.findById(id);

    return res.status(200).json({
      success: true,
      data: project,
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const GetProjects = async (context: ContextModel, res: Response) => {
  try {
    const projects = await projectRepository.findByQueryObject({user: context.user._id}).sort({ from: 'asc' });

    return res.status(200).json({
      success: true,
      data: projects,
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
    });
  }
};

const DeleteProject = async (id: string, res: Response) => {
  try {
    await projectRepository.deleteById(id);

    const publicID = `${CONSTANTS.PROJECT_IMAGE_FOLDER}/${id}-${CONSTANTS.PROJECT_IMAGE_FOLDER}`
    
    await cloudinary.uploader.destroy(publicID);

    return res.status(200).json({
      success: true,
      message: 'Successfully removed project!',
    });

  } catch (error) {
    logger.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Error removing project!',
    });
  }
};

const GetUserProjects = async (id: string) => {
  return projectRepository.findByQueryObject({user: id}).sort({ from: 'asc' });
};

const GetUserProjectsCount = async (id: string) => {
  return projectRepository.findByQueryObject({user: id}).countDocuments();
};

const DeleteUserAllProjects = async (id: string) => {
  return projectRepository.deleteMultipleByQueryObject({user: id});
};

const findById = async (id: string) => {
  return projectRepository.findById(id);
};

export default {
  CreateProject,
  UpdateProject,
  GetProject,
  GetProjects,
  DeleteProject,
  GetUserProjects,
  GetUserProjectsCount,
  DeleteUserAllProjects,
  findById
}