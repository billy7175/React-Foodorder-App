import { expressjwt } from 'express-jwt'
import User from "../models/user";


export const requireSignin = expressjwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const isInstructor = async (req, res, next) => {
  try {
    console.log(11111111 , req)
    const user = await User.findById(req.auth._id).exec();
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log('#isInstructor : error', err);
  }
};



const testtest = () => {
    return 1
}

export default testtest