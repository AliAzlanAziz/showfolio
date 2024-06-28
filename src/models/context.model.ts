export class ContextModel  {
    user: {
        _id: string,
        name: string,
        email: string,
        username: string,
        imageURL: string,
        toWork: boolean
        toHire: boolean,
        public: boolean,
        paidDate: Date,
        subsType: number
    }
}