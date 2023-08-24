import UseAxios from "@/lib/use-axios"
import { signInWithCredential } from "@/features/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function GoogleAuth() {
  const router = useRouter()
  const koa = () => {
    signInWithCredential({email: 'email@mail.com', password: 'password'})
  }
  // setTimeout(() => {

  //   console.log(router.query.access_token);
    
  //   fetch('http://localhost:1337/api/auth/google/callback?access_token='+router.query.access_token)
  // }, 2000);

  return (
    <>
    <div onClick={() => koa()}>
      TETE
    </div>
    </>
  )
}