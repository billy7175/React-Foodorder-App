import User from '../models/user'
import { hashPassowrd, comparePassword } from '../utils/auth';
console.log('#hashPassowrd', hashPassowrd)
console.log('#comparePassword', comparePassword)

export const register = async (req, res) => {
    try {
        console.log('####req.body', req.body)
        const {name, email, password} = req.body
        if(!name) return res.status(400).send('Name is required');
    
        if(!password || password.length < 6) {
            return res
                    .status(400)
                    .send('Password is required and should be min six characters')
        }
        let userExist = await User.findOne({email}).exec();
        console.log('#userExist', userExist)
        if(userExist) return res.status(400).send('Email is taken');
    
        const hashedPassword = await hashPassowrd(password)
        
        const user =  new User({
            name,
            email,
            password : hashedPassword
        })
        await user.save()
        console.log('@saved user', user)
        return res.json({ok: true})

     } catch (error) {
        console.log(error);
        return res.status(400).send("Error. Try again.");    
    }
}

export const login = async (req, res) => {
    try {
        console.log(12312312321312)
        console.log(req.body)
        return res.json({ok: true})
    } catch (error){
        console.log(error)
        return res.status(500).send("Error, Try Again");
    }
}