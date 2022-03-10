import bcryptjs from 'bcryptjs';

export const encryptPassword = async(password: string): Promise<string> =>{
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
}
