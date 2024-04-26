import "@/styles/globals.css";
import Nav from "@/components/navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}