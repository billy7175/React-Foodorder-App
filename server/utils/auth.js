import bcrypt from 'bcrypt'

// new Promise 사용
// bcrypt.getSalt() 사용

export const hashPassowrd = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (error, salt) => {
            if (error) {
                reject(error)
            }

            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    reject(err)
                }
                resolve(hashedPassword)
            })
        })
    })
}

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed); // boolean
};


