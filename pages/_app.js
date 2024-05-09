import "@/styles/globals.css";
import Nav from "@/components/navbar";
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
   const router = useRouter();

  return (
    <SessionProvider session={session}>
      <div className="mt-20">
      {router.pathname !== '/orderStatus' && <Nav />}
      <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}