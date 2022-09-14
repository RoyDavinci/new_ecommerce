import bcrypt from "bcrypt";

export const generateHash = async (value: string) => {
    const salt = await bcrypt.genSalt(4);
    return bcrypt.hash(value, salt);
};
