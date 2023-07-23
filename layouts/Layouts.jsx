import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import Cpanel from './Cpanel';
import { ContextData } from '../context/Context';
import Copyright from '../components/utils/Copyright';
import Logo from '../components/utils/Logo';
import Link from 'next/link';
const isLoggedIn = Cookies.get('refreshtoken')


export default function Layouts({ children }) {
    const router = useRouter()
    const state = useContext(ContextData)
    const { contact } = state

    // useEffect(() => {
    //     redirect(router, isLoggedIn)
    // }, [])

    if (router.asPath == '/') {
        return <DefaultLayout contact={contact}>{children}</DefaultLayout>
    }
    else if (router.asPath.includes('/cpanel')) {
        return <Cpanel>{children}</Cpanel>
    }
    else if (router.asPath.includes('/auth')) {
        return <DefaultLayout contact={contact}>{children}</DefaultLayout>
    }

}



// handle redirect
function redirect(router, isLoggedIn) {
    // check if current page contain cpanel
    if (router.asPath.includes('/cpanel')) {
        if (!isLoggedIn) {
            router.push('/auth')
        }
    }
    else {
        if (isLoggedIn) {
            router.push('/cpanel')
        }
    }
}


function DefaultLayout({ children, contact }) {

    return (
        <div className='wrapper bg-color-blue-1'>
            {/* header */}
            <div className='h-[60px] pt-10'>
                <Logo />
            </div>

            {/* body */}
            <div className='h-[calc(100vh-60px-100px)] flex items-center justify-center'>
                <div className='w-full m-auto'>
                    {children}
                </div>
            </div>



            {/* footer */}
            <div className='h-[100px] text-color-blue-4'>
                <div className='text-center text-[.8rem]'>Contact the developer on</div>
                <div className='flex justify-center gap-2'>
                    <Link href={contact.whatsapp || ""} target='_blank'>
                        <img className='w-9' src="whatsApp_icon.png" alt="" />
                    </Link>
                    <Link className='text-green-500' href={contact.upwork || ""} target='_blank'>
                        <img className='w-8' src="upwork_icon.png" alt="" />
                    </Link>
                </div>
                <Copyright />
            </div>
        </div>
    )
}
