import { NextFunction, Request, Response } from 'express';
import { JWTTokenPayloadModel } from '../models/jwtTokenPayload.model';
import jwt from 'jsonwebtoken';
import userService from '../services/user'
import { ContextModel } from '../models/context.model';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('isAuthenticated.js')

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string | null = getToken(req);
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Access!'
            })
        }

        const payload: JWTTokenPayloadModel = jwt.verify(token, process.env.SECRET_KEY as string) as JWTTokenPayloadModel;
        const result = await userService.findById(payload.id);        
        if(!result){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Access!'
            })
        }
        
        req.context  = getContext(result);
        return next();
        
    }catch(error){
        logger.error(JSON.stringify(error))
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }
}

const getToken = (req: Request): string | null => {
    const token = req.headers.authorization?.split(" ") 
    if (token && token[0] === "Bearer") {
      return token[1];
    } 
    return null;
}

const getContext = (user: any): ContextModel => {
    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            imageURL: user?.imageURL,
            toWork: user.toWork,
            toHire: user.toHire,
            public: user.public,
            paidDate: user?.paidDate || null,
            subsType: user.subsType
        }
    } as const
}