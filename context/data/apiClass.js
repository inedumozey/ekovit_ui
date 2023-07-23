import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


class apiClass {
    constructor() { }
    refreshToken = async () => {
        if (Cookies.get('refreshtoken')) {
            try {
                const { data } = await axios.get(`${BASE_URL}/auth/generate-accesstoken`, {
                    headers: {
                        authorization: `Bearer ${Cookies.get('refreshtoken')}`
                    }
                })

                this.setCookies(data.accesstoken, data.refreshtoken, data.admintoken)
            }
            catch (err) {
                return err
            }
        }
    }

    fetchProfile = async (
        setFetchingProfile,
        setFetchingProfileSuccess,
        setProfile,
        initial) => {
        initial ? setFetchingProfile(true) : ''
        try {

            const { data } = await axios.get(`${BASE_URL}/auth/fetch-profile`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                }
            });
            setProfile(data.data);
            initial ? setFetchingProfile(false) : ''
            setFetchingProfileSuccess(true)
        }
        catch (err) {
            initial ? setFetchingProfile(false) : ''

            if (err.response) {
                setFetchingProfileSuccess(false)
            }
            else {
                setFetchingProfileSuccess(false)
            }
        }
    }

    fetchUsers = async (
        setFetchingUsers,
        setFetchingUsersSuccess,
        setUsers,
        initial) => {

        initial ? setFetchingUsers(true) : ''
        try {
            const callApi = async () => {
                const { data } = await axios.get(`${BASE_URL}/auth/fetch-users`, {
                    headers: {
                        'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                        'authorization-admin': `Bearer ${Cookies.get('xxxxx')}`,
                    }
                });
                setUsers(data.data)
                initial ? setFetchingUsers(false) : ''
                setFetchingUsersSuccess(true)
            }

            if (!this.hasAccess()) {
                this.refreshToken()
                setTimeout(callApi, 1000)
            }
            else {
                callApi()
            }

        }
        catch (err) {
            initial ? setFetchingUsers(false) : ''

            if (err.response) {
                setFetchingUsersSuccess(false)
            }
            else {
                setFetchingUsersSuccess(false)
            }
        }
    }

    fetchUser = async (
        setFetchingUser,
        setFetchingUserSuccess,
        setUser,
        id,
        initial) => {
        initial ? setFetchingUser(true) : ''

        try {
            const { data } = await axios.get(`${BASE_URL}/auth/fetch-user/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx')}`,
                }
            });
            setUser(data.data);
            initial ? setFetchingUser(false) : ''
            setFetchingUserSuccess(true)
        }
        catch (err) {

            initial ? setFetchingUser(false) : ''

            if (err.response) {
                setFetchingUserSuccess(false)
            }
            else {
                setFetchingUserSuccess(false)
            }
        }
    }

    addUsername = async (
        setEditProfileLoading,
        setFetchingProfile,
        setFetchingProfileSuccess,
        setProfile,
        data_) => {
        setEditProfileLoading(true)
        try {
            if (!this.hasAccess()) {
                // refresh accesstoken
                await this.refreshToken()

                setTimeout(async () => {
                    const { data } = await axios.put(`${BASE_URL}/auth/update-username`, data_, {
                        headers: {
                            'authorization-access': `Bearer ${Cookies.get('accesstoken')}`
                        }
                    })
                    this.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, false)
                    toast(data.msg, { type: 'success' })
                })

            } else {
                const { data } = await axios.put(`${BASE_URL}/auth/update-username`, data_, {
                    headers: {
                        'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    }
                });
                toast(data.msg, { type: 'success' })
                this.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, false)
            }

            setEditProfileLoading(false);
        }
        catch (err) {

            if (err.response) {
                setEditProfileLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setEditProfileLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    resetPassword = async (
        setCurrentPassword,
        setNewPassword,
        setCPassword,
        setSending,
        data_) => {
        setSending(true)
        try {
            if (!this.hasAccess()) {
                // refresh accesstoken
                await this.refreshToken()

                setTimeout(async () => {
                    const { data } = await axios.put(`${BASE_URL}/auth/reset-password`, data_, {
                        headers: {
                            'authorization-access': `Bearer ${Cookies.get('accesstoken')}`
                        }
                    })
                    toast(data.msg, { type: 'success' })
                })

            } else {
                const { data } = await axios.put(`${BASE_URL}/auth/reset-password`, data_, {
                    headers: {
                        'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    }
                });
                toast(data.msg, { type: 'success' })
            }

            setSending(false);
            setCurrentPassword("")
            setNewPassword("")
            setCPassword("")
        }
        catch (err) {
            setSending(false)

            if (err.response) {
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                toast(err.message, { type: 'error' })
            }
        }
    }

    fetchConfig = async (
        setFetchingConfig,
        setFetchingConfigSuccess,
        setConfigData,
        initial
    ) => {
        initial ? setFetchingConfig(true) : ''

        try {
            const { data } = await axios.get(`${BASE_URL}/config`);

            initial ? setFetchingConfig(false) : ''
            setFetchingConfigSuccess(true);

            setConfigData(data.data)
        }
        catch (err) {

            if (err.response) {
                initial ? setFetchingConfig(false) : '';
                setFetchingConfigSuccess(true)
            }
            else {
                initial ? setFetchingConfig(false) : '';
                setFetchingConfigSuccess(true)
            }
        }
    }

}



export default apiClass;