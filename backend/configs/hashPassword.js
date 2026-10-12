import bcrypt from 'bcryptjs'

const saltround = 10

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltround)
    return bcrypt.hashSync(password,salt)
}

export const comparepassword = (plain,hashed) => {
    return bcrypt.compareSync(plain,hashed)
} 