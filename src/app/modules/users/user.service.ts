import { IUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDB = async(payload:IUser)=>{

    const newUser = await UserModel.create(payload);

    return newUser;
}


const getAllUserIntoDB = async(id: string, body: any)=>{
    const result = await UserModel.find();

    return result;
}

const getSingelUserIntoDB = async(id:string)=>{

    const result = await UserModel.findById(id);

    return result;
}

const updateUserIntoDB = async(id:string,payload:IUser)=>{

    const result = await UserModel.findByIdAndUpdate(id,payload);

    return result;
}


export const UserServices = {
    createUserIntoDB,
    getAllUserIntoDB,
    getSingelUserIntoDB,
    updateUserIntoDB
}