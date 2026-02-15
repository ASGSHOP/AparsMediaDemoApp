import rateLimit from 'express-rate-limit';

const windowMs = 5 * 60 * 1000; // 5 minutes
const maxRequestsPerIPAddress = 1000;

const createRoomApiLimiter = rateLimit({
  windowMs: windowMs,
  max: maxRequestsPerIPAddress,
  message:
    'Too many requests. Please try again after ' +
    windowMs / 60000 +
    ' minutes',
});

export default createRoomApiLimiter;
