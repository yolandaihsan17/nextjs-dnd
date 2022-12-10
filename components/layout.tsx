import Toolbar from "./toolbar";
import Head from 'next/head'

export default function Layout(props: any) {
  return (
    <div className=" w-full overflow-hidden min-h-screen">
      <Head>
        <title>Mau Belajar Apa | Yolanda Ihsan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar title="Asset"></Toolbar>
      <div className="w-full max-w-7xl mx-auto">
        {props.children}
      </div>
    </div>
  )
}