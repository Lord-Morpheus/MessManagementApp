import otpGenerator from 'otp-generator';

const OTP_CONFIG = {
    upperCaseAlphabets: true,
    specialChars: false,
}

export const generateOTP = () => {
    const OTP = otpGenerator.generate(8, OTP_CONFIG);
    return OTP;
};
