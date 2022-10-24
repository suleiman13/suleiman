import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utilities/generate_token';
import User from '../models/user';


export const user_signup = asyncHandler(async(req, res) =)