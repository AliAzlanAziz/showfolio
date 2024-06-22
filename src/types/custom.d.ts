import { ContextModel } from "../models/context.model";

declare global {
    declare namespace Express {
        export interface Request {
            context: ContextModel;
        }
    }
}

export {};