import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter()
    useEffect(() => {
        if (Cookies.get('refreshtoken')) {
            router.push('/dashboard')
        }
        else {
            router.push('/auth/signin')
        }
    }, [])
    return <div style={{ textAlign: 'center', padding: '20px' }}>Redirecting...</div>
}