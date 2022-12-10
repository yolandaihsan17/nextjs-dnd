import { ArrowLeft } from "iconsax-react"

interface ToolbarProps {
  title: string,
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div className="w-full py-4 bg-white shadow-lg flex flex-row items-center justify-center">
      <div className="px-4 w-full max-w-7xl flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <ArrowLeft />
          <div className="text-lg">{props.title}</div>
        </div>
      </div>
    </div>
  )
}