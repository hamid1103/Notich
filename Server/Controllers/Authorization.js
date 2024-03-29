import jwt from "jsonwebtoken"
import User from "../Models/User.js";

const register = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    const { username, email, password } = req.body;
    console.log(`${username}, ${email}, ${password}`)
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};

// Login with an existing user
const login = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};
export {register, login}