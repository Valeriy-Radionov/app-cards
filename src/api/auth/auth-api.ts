import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<UserDataType>>('auth/login', loginData)
    },
    registration(registerData: RegistrationDatatype) {
        return instance.post<RegistrationDatatype, AxiosResponse<RegistrationResponseDataType>>('auth/register', registerData)
    },
    isAuth() {
        return instance.post<UserDataType>('auth/me')
    },
    userUpdate(updateData: UpdateUserType) {
        return instance.put<UpdateUserType,AxiosResponse<UpdateUserResponseType>>('auth/me', updateData)
    },
    logOut () {
        return instance.delete<LogOutForgotResponseType>('auth/me')
    },
    forgotPassword (forgotPasswordData:ForgotPasswordDataType) {
        return axios.post<ForgotPasswordDataType,AxiosResponse<{info?: string, response?:{data: {error: string}}}>>('https://neko-back.herokuapp.com/2.0/auth/forgot',forgotPasswordData, {withCredentials: true})
    },
    setNewPassword (setNewPasswordData:SetNewPasswordDataType) {
        return axios.post<SetNewPasswordDataType, AxiosResponse<{info?: string, response?:{data: {error: string}}}>>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', setNewPasswordData, {withCredentials: true})
    },
    blockUser (blockData:BlockDataType) {
        return instance.post<BlockDataType,AxiosResponse<BlockResponseType>> ('auth/block',blockData)
    }
}

export type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
export type LoginResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: Date
    updated: Date
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
}
export type RegistrationDatatype = {
    email: string,
    password: string
}
export type UserDataType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: any,
    updated: any,
    __v: number,
    token?: string,
    tokenDeathTime?: number,
    avatar?: string
}
export type RegistrationResponseDataType = {
    addedUser: UserDataType
}
export type UpdateUserType = {
    name?: string,
    avatar?: string
}
export type UpdateUserResponseType = {
    updatedUser: UserDataType,
    token: string,
    tokenDeathTime: number
}
export type LogOutForgotResponseType = {
    info?:string,
    email?:string
}
export type ForgotPasswordDataType = {
    email: string,
    from: string,
    message: string
}
export type SetNewPasswordDataType = {
    password: string
    resetPasswordToken: string
}
export type BlockDataType = {
    id: string,
    blockReason: string
}
export type BlockResponseType = {
    user: string,
    blockedCardPacksCount: number
}