import axiosInstance from "./api";

export default class AuthenticationService {
  static signup(values) {
    console.log(values);
    const endPoint = "/userEmail";
    return axiosInstance.post(endPoint, values);
  }

  static otp() {
    const endPoint = "/userOtp";
    console.log("triggered");
    return axiosInstance.get(endPoint);
  }
  static google(values) {
    console.log(values);
    const endPoint = "/userGoogle";
    return axiosInstance.post(endPoint, values);
  }

  static emailVerify(values){
    const endPoint = "/userVerifyEmail";
    return axiosInstance.post(endPoint, values);
    
  }
  static generateOtp(values){
    const endPoint = "/generateOtp";
    return axiosInstance.post(endPoint, values);
    
  }
  static otpVerify(values) {
      const endPoint = "/otpVerify";
      console.log("triggered")
      return axiosInstance.post(endPoint,values);
  }

  static PasswordVerify(values){
    const endPoint="/passwordVerify";
    console.log("triggered")
    return axiosInstance.post(endPoint,values);
  }

  
}
