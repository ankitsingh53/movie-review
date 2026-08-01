import { AppDataSource } from "../configDB/dataSource.js";
import { User } from "../entities/users.js";

const userRepo = AppDataSource.getRepository(User);


export const existingUser = async (email:string)=>{
    const getUser = await userRepo.findOne({
        where: {email}
    })

    return getUser;
}; 

export const registerUser = async (name:string, email:string, hashpass:string)=>{
    const user = userRepo.create({
        name,
        email,
        password: hashpass
    });

    const savedUser = await userRepo.save(user);

    return {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
    };
};


export const loginUser = async (email: string) => {
  const user = await userRepo.findOne({
    where: { email },
  });

  return user;
};