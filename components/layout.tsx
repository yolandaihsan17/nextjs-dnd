import Toolbar from "./toolbar";

export default function Layout(props: any) {
  return (
    <div className=" w-full overflow-hidden min-h-screen">
      <Toolbar title="Asset"></Toolbar>
      <div className="w-full max-w-7xl mx-auto">
        {props.children}
      </div>
    </div>
  )
}