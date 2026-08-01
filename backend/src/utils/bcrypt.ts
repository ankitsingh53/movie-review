import bcrypt from 'bcrypt'

export const hashPassword = async (plainPassword:string)=>{
    return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (plainPassword:string, hashPassword:string)=>{
    return await bcrypt.compare(plainPassword, hashPassword);
};