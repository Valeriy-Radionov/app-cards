import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

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
export type RegisterDatatype = {
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
    created: Date,
    updated: Date,
    __v: number,
    token?: string,
    tokenDeathTime?: number,
    avatar?: string
}
export type RegisterResponseDataType = {
    addedUser: UserDataType
}
export type UpdateUserType = {
    name: string,
    avatar: string
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



export const authAPI = {
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', loginData)
    },
    register(registerData: RegisterDatatype) {
        return instance.post<RegisterDatatype, AxiosResponse<RegisterResponseDataType>>('auth/register', registerData)
    },
    isAuth() {
        return instance.post<UserDataType>('auth/me')
    },
    userUpdate(updateData: UpdateUserType) {
        return instance.put<UpdateUserType,AxiosResponse<UpdateUserResponseType>>('auth/me', updateData)
    },
    logOut () {
        return instance.post<LogOutForgotResponseType>('auth/me')
    },
    forgotPassword (forgotPasswordData:ForgotPasswordDataType) {
        return instance.post<ForgotPasswordDataType,AxiosResponse<LogOutForgotResponseType>>('/auth/forgot',forgotPasswordData)
    },
    setNewPassword (setNewPasswordData:SetNewPasswordDataType) {
        /////////////
    },
    blockUser (blockData:BlockDataType) {
        return instance.post<BlockDataType,AxiosResponse<BlockResponseType>> ('auth/block',blockData)
    }


}