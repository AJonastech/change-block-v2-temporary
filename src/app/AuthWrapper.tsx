"use client"
import React from 'react'
import withAuth from './WithAuth'

function AuthWrapper({children}:{children:React.ReactNode}) {
    const AuthChildren = withAuth(()=><>{children}</>)
  return (
    <AuthChildren/>
  )
}

export default AuthWrapper