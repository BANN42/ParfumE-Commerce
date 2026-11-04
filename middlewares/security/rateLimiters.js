import { rateLimit } from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: "Too Many Login attempts.please Try Again Later",
  },
});

export const verifyOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: "Too many OTP attempts. Please try again later.",
  },
});

export const resendOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipFailedRequests: true,
  message: {
    message: "Too many OTP requests. Please try again later.",
  },
});

export const resendEmailForgotPass = rateLimit({
  windowMs : 10*60*1000,
  limit : 4,
  standardHeaders : "draft-8",
  legacyHeaders : false,
  skipSuccessfulRequests : true,
  message :{
    message : "Too Many Requests Email, Please Try Again Later"
  }
})