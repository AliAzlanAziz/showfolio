import { NextFunction, Request, Response } from 'express';

const validTokens: any = {
    "]=q;d-4o3r-04o]-SGHA*(QYH(T#*fw#:#$POj;soc.3wf-04DAJ": 1
}

export const isAuthTokenValid = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string | null = getToken(req);
        if(!token || !validTokens[token]){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Access!'
            })
        }
        
        return next();
        
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }
}

const getToken = (req: Request): string | null => {
    const token = req.headers.authorization?.split(" ") 
    if (token && token[0] === "Token") {
      return token[1];
    } 
    return null;
}
