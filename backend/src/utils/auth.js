import bcrypt from 'bcrypt';
import { getUserByEmail } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

export const hashPassword = async(password)=>{
    return await bcrypt.hash(password,saltRounds);
}

export const autheticate = async(email,password)=>{
    const foundUser = await getUserByEmail(email);
    if(!foundUser) return null;

    const isMatch = await bcrypt.compare(password,foundUser.password);

    if(isMatch){
        const {user_id,name,email}=foundUser;
        return {user_id,name,email};
    }
    
    return null;
}

export const generateToken = (user)=>{
    const token = jwt.sign({user_id:user.user_id,email:user.email},JWT_SECRET,{ expiresIn: '1d' });
    return token;
}

