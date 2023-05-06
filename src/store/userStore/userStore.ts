import Axios from 'src/api/axios';
import { loginEnd, logoutEnd } from 'src/api/api';
import { create } from 'zustand';
import { UserStoreType, loginParams } from './userStoreType';
import docCookies from 'src/utils/cookies';



const initalState: UserStoreType = {
    isLogin: false,
    name: ''
}

const useUserStore = create<UserStoreType>((set) => ({
    ...initalState,
}))

// * 登录
export const login = async (values: loginParams) => {
    let user = { ...initalState }
    const res: any = await Axios.post(loginEnd, values);
    if (res) {
        user = { isLogin: true, name: res.name }
        docCookies.setItem("sessionId", res.sessionId);
    }
    useUserStore.setState(user)
}
// * 退出登录
export const logout = async () => {
    let user = { ...initalState };

    await Axios.post(logoutEnd);
    docCookies.removeItem("sessionId");

    useUserStore.setState(user);
}

export default useUserStore;