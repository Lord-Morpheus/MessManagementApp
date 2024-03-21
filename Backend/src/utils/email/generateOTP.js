import otpGenerator from 'otp-generator';

const OTP_CONFIG = {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
}

export const generateOTP = () => {
    const OTP = otpGenerator.generate(6, OTP_CONFIG);
    const OTP_EXPIRY = new Date();
    return { OTP, OTP_EXPIRY };
};
