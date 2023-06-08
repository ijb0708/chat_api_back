import bcrypt from 'bcrypt'

export const hashPassword = async pasword => {

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(pasword, salt)

    return hashPassword
}

export const verifyPassword = async (password, hashedPassword) => {
    
    return await bcrypt.compare(password, hashedPassword)
}