import { NextFunction, Request, Response } from "express";
import workInfoService from "../services/workInfo";
import projectService from "../services/project";
import awardService from "../services/award";
import { serviceLogger } from "../config/logger";

const logger = serviceLogger('isAuthorized.js')

export const isUsersWorkInfo = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let id: string;
        if(req && req.body && req.body.workInfo && req.body.workInfo.id){
            id = req.body.workInfo.id;
        }else{
            id = req.params.id
        }

        const workInfo = await workInfoService.findById(id)
        if(!workInfo){
            return res.status(404).json({
                success: false,
                message: "Entity does not exist!"
            })
        }
        
        if((workInfo.user as string).toString() !== (req.context.user._id as string).toString()){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access!"
            })
        }
        
        return next();
    }catch(error){
        logger.error(JSON.stringify(error))
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

export const isUsersProject = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let id: string;
        if(req && req.body && req.body.project && req.body.project.id){
            id = req.body.project.id;
        }else{
            id = req.params.id
        }

        const project = await projectService.findById(id)
        if(!project){
            return res.status(404).json({
                success: false,
                message: "Entity does not exist!"
            })
        }
        
        if((project.user as string).toString() !== (req.context.user._id as string).toString()){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access!"
            })
        }
        
        return next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

export const isUsersAward = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let id: string;
        if(req && req.body && req.body.award && req.body.award.id){
            id = req.body.award.id;
        }else{
            id = req.params.id
        }

        const award = await awardService.findById(id)
        if(!award){
            return res.status(404).json({
                success: false,
                message: "Entity does not exist!"
            })
        }
        
        if((award.user as string).toString() !== (req.context.user._id as string).toString()){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access!"
            })
        }
        
        return next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}