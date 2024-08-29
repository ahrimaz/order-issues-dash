import "@/styles/globals.css";
import Nav from "@/components/navbar";
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";
import { Analytics } from '@vercel/analytics/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
   const router = useRouter();

  return (
    <SessionProvider session={session}>
      <div>
      {router.pathname !== '/orderStatus' && <Nav />}
      <Component {...pageProps} />
      {router.pathname === '/orderStatus' && <Analytics />}
      </div>
    </SessionProvider>
  )
}