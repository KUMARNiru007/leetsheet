    import bcrypt from "bcryptjs"
    import {db} from "../libs/db.js"
    import dayjs from 'dayjs';
    import jwt from "jsonwebtoken";
    import { UserRole } from "../generated/prisma/index.js";
    import crypto from "crypto"
import { mailVerificationMailGenContent,sendEmail } from "../utils/verificationMail.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { uploadRandomAvatar } from '../utils/avatar.js'




    export const register = async (req , res ) => {

        const {email,password,name} = req.body;
        
        try{
            const existingUser =await db.user.findUnique({
                where:{
                    email,
                }
            })
            if(existingUser){
                return res.status(400).json({
                    message: "User already exist"
                })
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const token = crypto.randomBytes(32).toString('hex');

            const newUser = await db.user.create({
                data:{
                    email,
                    password:hashedPassword,
                    name,
                    role:UserRole.USER,
                    verificationToken: token,
                    
                }
            })

            await sendEmail({
                email:email,
                subject:'Email verification',
                mailGenContent: mailVerificationMailGenContent(
            name,
            `${process.env.BASE_URI}/api/v1/auth/verifyMail/${token}`,
        ),
        });

            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);
            
            const avatar = await uploadRandomAvatar(newUser.id);        await db.user.update({
        where: {
            id: newUser.id,
        },
        data: {
            accessToken,
            refreshToken,
            image: avatar,
        },
        });

    
        const AccessCookieOptions = {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 15, // 15 minutes
        domain: 'localhost',
        };

        const RefreshCookieOptions = {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        domain: 'localhost',
        };

        res.cookie('accessToken', accessToken, AccessCookieOptions);
        res.cookie('refreshToken', refreshToken, RefreshCookieOptions);



            res.status(201).json({
                success:true,
                message:"User created successfully",
                user:{
                    id:newUser.id,
                    email:newUser.email,
                    name:newUser.name,
                    role:newUser.role,
                    image:newUser.image,
                    accessToken: accessToken,
                }
            })




        }catch(error){
        
            console.error("Error creating a User",error)
            res.status(500).json({
                message:"Error creating a user",
                success:false,
            })

        }
    }

    export const verifyUser = async (req,res) => {
        const token = req.params.token;
        console.log(token);
        if(!token) {
            return res.status(400).json({
                message:"Verification failed",
                success:false,
            })
        }
        try{
            const user = await db.user.findFirst({
                where:{
                    verificationToken:token,
                },
            });
            if(!user) {
            return res.status(400).json({
                message:"User not found",
                success:false,
            })
            };

            console.log(user.id);
            await db.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    isVerified:true,
                    verificationToken:null,
                },
            });

            console.log(user);
            res.status(200).json({
                message:"User verified successfully",
                success:true
            })
        }catch(error){
            console.log(error);
            return res.status(400).json({
                message:"Internal server ERROR in User Verification ",
                success:false,
            })
        }
    }

    export const login = async (req , res ) => {
        const {email,password} = req.body;
        try{
            const user =await db.user.findUnique({
                where:{
                    email
                }
            })
            if(!user){
                return res.status(401).json({
                    message:"User not Found",
                    success:false,
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(401).json({
                    message: "Invalid credentials",
                    success: false
                })
            }


            const today = dayjs().startOf('day');

        const lastlogin = user.lastloginDate
        ? dayjs(user.lastloginDate).startOf('day')
        : null;
        const todayStr = dayjs().format('YYYY-MM-DD');
        const loginMap = user.loginMap || {};

        let streakCount = 1;
        let longestStreak = user.longestCount || 0;

        const oneYearAgo = dayjs().subtract(365, 'day').format('YYYY-MM-DD');
        const newLoginMap = Object.fromEntries(
        Object.entries(loginMap).filter(([date]) => date >= oneYearAgo),
        );

        // User today's login
        newLoginMap[todayStr] = true;

        if (lastlogin) {
        const diff = today.diff(lastlogin, 'day');
        if (diff === 1) {
            streakCount = user.streakCount + 1;
            longestStreak = Math.max(longestStreak, streakCount);
        } else if (diff === 0) {
            streakCount = user.streakCount;
            longestStreak = user.longestCount;
        }
        }


            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

                const updatedUser = await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            accessToken,
            refreshToken,
            lastloginDate: new Date(),
            streakCount,
            longestCount: longestStreak,
            loginMap: newLoginMap,
        },
        });

        const AccessCookieOptions = {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 15, // 15 minutes
        domain: 'localhost',
        };

        const RefreshCookieOptions = {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        domain: 'localhost',
        };

        res.cookie('accessToken', accessToken, AccessCookieOptions);
        res.cookie('refreshToken', refreshToken, RefreshCookieOptions);

        console.log(user);


           return res.status(200).json({
                success:true,
                message:"User loggedIn successfully",
                user:{
                    id:user.id,
                    email:user.email,
                    name:user.name,
                    role:user.role,
                    image:user.image,
                    image: updatedUser.image,
                    accessToken,
                    streakCount: updatedUser.streakCount,
                    longestCount: updatedUser.longestCount,
                }
            })



        }catch(error) {
            console.error("Error creating a User",error)
          return  res.status(500).json({
                message:"Error login user"
            })
        }
    }

    export const googleLogin = async (req,res) =>{
        const user = req.user
        try{
              console.log('=== GOOGLE LOGIN DEBUG ===');
             console.log('User from req.user:', user);
              console.log('Session ID:', req.sessionID);
             console.log('Session before:', req.session);

             if(!user){
                res.status(401).json({
                    message: "User not found",
                    success: false,
                })
             };
             const accessToken = generateAccessToken(user);
             const refreshToken = generateRefreshToken(user);
await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
      },
    });

    req.session.userId = user.id;
    req.session.isLoggedIn = true;

    const isProduction = process.env.NODE_ENV === 'production';

    const AccessCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      maxAge: 1000 * 60 * 15, // 15 minutes
      domain: 'localhost',
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      domain: 'localhost',
    };

    res.cookie('accessToken', accessToken, AccessCookieOptions);
    res.cookie('refreshToken', refreshToken, RefreshCookieOptions);

    console.log('Session after:', req.session);
    console.log(
      'Cookies set, redirecting to:',
      `${process.env.FONTEND_URL}/problems`,
    );

    res.redirect(`${process.env.FONTEND_URL}/problems`);

        }catch(error){
            return res.status(400).json({
                message:'Internal error occured whihle login',
                success: false,
            })
        }
    }

    export const refreshToken = async (req,res) =>{
        try{
            console.log(req.cookies);
            const refreshToken = req.cookies?.refreshToken;

        console.log("Refresh Token found", refreshToken ?'Yes':'No');
            if(!refreshToken) {
                return res.status(400).json({
                    message:"Refreah Token not found",
                    success:false,
                })
            };

            const user = await db.user.findFirst({
                where:{
                    refreshToken,
                },
            });
            if(!user){
                return res.status(403).json({
                    message:"Invalid refresh Token",
                    success:false,
                });
            }
            const decodedData = jwt.verify(
                refreshToken,
                process.env.JWT_REFERSH_TOKEN_SECRET,
            );
            console.log(decodedData);

            if(!decodedData){
                return res.status(403).json({
                message: 'Refersh Token Expired',
                success:false,
                });
            };

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });

    const AccessCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 15, // 15 minutes
      domain: 'localhost',
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      domain: 'localhost',
    };

    res.cookie('accessToken', newAccessToken, AccessCookieOptions);
    res.cookie('refreshToken', newRefreshToken, RefreshCookieOptions);
            res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                }
            });

        }catch(error){
            console.log("Error refreshing token ", error);
            res.status(500).json({
                message:"Error refreshing token",
                success:false,
            })
        }
    }

    export const logout = async (req , res ) => {
        try{
            const user = req.user;
            if (user) {
                // Clear tokens in database
                await db.user.update({
                    where: { id: user.id },
                    data: {
                        accessToken: null,
                        refreshToken: null
                    }
                });
            }

            // Clear cookies
            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                domain: 'localhost',
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                domain: 'localhost',
            });
            
            res.status(200).json({
                success: true,
                message: "User Logged out successfully",
            })



        }catch(error){
            console.error("Error logging out User",error)
            res.status(500).json({
                message:"Error logging out user"
            })

        }
    }

    export const check = async (req , res ) => {
        try{
            res.status(200).json({
                succes:true,
                message:"User authenticated successfully",
                user:req.user
            })

        }catch(error){
            console.error("Error checking user",error)
            res.status(500).json({
                message:"Error checking the user"
            })

        }
    }
