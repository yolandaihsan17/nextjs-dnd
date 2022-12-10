import { ArrowLeft } from "iconsax-react"
import { useRouter } from "next/router";

interface ToolbarProps {
  title: string,
}

export default function Toolbar(props: ToolbarProps) {
  const router = useRouter()
  return (
    <div className="w-full py-4 bg-white shadow-sm flex flex-row items-center justify-center">
      <div className="px-4 w-full max-w-7xl flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <ArrowLeft className=" cursor-pointer" onClick={() => router.back()}/>
          <div className="text-lg">{props.title}</div>
        </div>
      </div>
    </div>
  )
}