import "@/styles/globals.css";
import Nav from "@/components/navbar";
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div className="mt-20">
      <Nav />
      <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}