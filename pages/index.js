import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Landing from '../components/landing/Landing'
const isLoggedIn = Cookies.get('refreshtoken')

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // redirect(router, isLoggedIn)
  }, [])

  return <Landing />
}



// handle redirect
function redirect(router, isLoggedIn) {
  if (isLoggedIn) {
    router.push('/cpanel')
  }
  else {
    router.push('/auth')
  }
}