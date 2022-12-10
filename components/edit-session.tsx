import { SessionProps } from "../pages/manage-event";
import { useState } from "react";

interface EditSessionProps extends SessionProps {
  onChange: Function
}

export default function EditSession(props: EditSessionProps) {

  const [data, setData] = useState({ ...props })

  const dataChanged = (key: string, value: any) => {
    const temp: any = data
    temp[key] = value
    setData(temp)
  }

  const saveSession = () => {
    const { id, title, lessons } = data
    const changedData = {
      id: id,
      title: title,
      lessons: lessons,
    }
    props.onChange(changedData)
  }

  return (
    <div className=" fixed top-0 left-0 w-full min-h-screen flex flex-row items-center justify-center bg-black/80 backdrop-blur-sm z-20" >
      <div className="flex flex-col items-stretch justify-start bg-white rounded-sm  rounded-lg p-4 w-full max-w-md divide-y">
        <div className="flex flex-col items-stretch justify-between gap-2 p-2 py-4">
          <label htmlFor="title-input" className="font-bold">Title</label>
          <input type={'text'} defaultValue={data.title} id='title-input' onChange={(e) => dataChanged('title', e.target.value)}></input>
        </div>
        <div className="flex flex-row items-center justify-around p-2 py-4 pt-8 gap-2">
          <button className="bg-purple-600 text-white rounded-md py-2 px-8 w-full" onClick={saveSession}>Close</button>
        </div>
      </div>
    </div>
  )
}