import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import axios from 'axios'
import Spinner from '../utils/Spinner';
import Alart from '../utils/Alart';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function ForgotPassword() {
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState({ msg: '', status: false });

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setSending(true)
        try {
            const { data } = await axios.post(`${BASE_URL}/auth/admin/forgot-password`, { email });

            setSending(false);

            setToken(data.token)

            setMsg({ msg: data.msg, status: true })
            setEmail("")
        }
        catch (err) {
            if (err.response) {
                setMsg({ msg: err.response.data.msg, status: false })
            }
            else {
                setMsg({ msg: err.message, status: false })
            }
            setSending(false);
        }
    }

    return (
        <form onSubmit={submit} className='relative bg-color-blue-5 m-auto max-w-[500px] min-w-[300px] w-[90%] shadow-md shadow-[rgba(0,0,0,0.5)] md:px-20 px-5 pb-20 rounded-2xl z-10 pt-[calc(100px/2)]'>
            <div className='w-[100px] h-[100px] rounded-full absolute left-[50%] -translate-x-[50%] bg-color-blue-4 -top-[calc(100px/2)] flex justify-center items-center'>
                <PersonOutlineIcon className='text-white text-[4rem]' />
            </div>

            <div className='text-center text-[1.5rem] font-semibold pt-2 pb-10'>
                Forgot Password
            </div>

            {/* Error message */}
            {
                msg.msg ?
                    <div className='mb-5'>
                        <Alart onHide={setMsg} type={msg.status ? 'success' : 'error'}>{msg.msg}</Alart>
                    </div> : ''
            }

            {
                token ?
                    <Link className='text-cyan-500 mb-2 block' href={`/auth/verify-forgot-password?token=${token}`}>Reset Password</Link> : ''
            }

            <div className='group relative h-[35px] rounded-md mb-4'>
                <label className='group-focus-within:bg-green-500 absolute left-0 w-[30px] bg-color-blue-4 h-full flex justify-center items-center rounded-tl-md rounded-bl-md top-0 '>
                    <PersonOutlineIcon className='text-white' />
                </label>
                <input
                    className='bg-transparent border-2 border-color-blue-4 text-color-blue-4 focus:outline-none focus:border-green-500 pl-[35px] pr-[10px] w-full py-2 rounded-md focus-input focus:text-green-500'
                    type="text"
                    placeholder='Email'
                    value={email || ''}
                    onInput={(e) => { setEmail(e.target.value) }}
                />
            </div>

            <div className='group relative h-[35px] rounded-md mb-2'>
                <button className={`bg-color-blue-4 border-2 border-color-blue-4 text-color-white w-full py-2 rounded-md focus-input focus:outline-none focus:border-green-500 text-white font-bold cursor-[${sending ? 'default' : 'pointer'}] flex justify-center opacity-[${sending ? '.6' : '1'}]`} disabled={sending}>
                    {
                        sending ? <Spinner /> : "Send"
                    }
                </button>
            </div>

            <Link href="/auth" className='text-cyan-500'>
                Login?
            </Link>


        </form >
    )
}

