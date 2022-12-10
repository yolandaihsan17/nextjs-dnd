import { LessonProps, SessionProps } from "../pages/manage-event";
import { useState } from "react";
import { getDuration } from "../utils/util";

interface EditDialogProps extends LessonProps {
  // type: 'lesson' | 'session'
  onChange: Function
}

export default function EditDialog(props: EditDialogProps) {

  const [data, setData] = useState({ ...props })

  const dataChanged = (key: string, value: any) => {
    const temp: any = data
    temp[key] = value
    setData(temp)
  }

  const saveLesson = () => {
    const { duration, id, isDownloadable, isRequired, time, title, isOnsite } = data
    const changedData = {
      duration: duration,
      id: id,
      isDownloadable: isDownloadable,
      isRequired: isRequired,
      time: time,
      title: title,
      isOnsite: isOnsite,
    }
    props.onChange(changedData)
  }

  const durationChanged = () => {
    const hourValue = +(document.getElementById('hour') as HTMLFormElement).value
    const minuteValue = +(document.getElementById('minute') as HTMLFormElement).value

    if (minuteValue > 60) (document.getElementById('minute') as HTMLFormElement).value = 60

    const finalValue = (hourValue * 3600) + (minuteValue * 60)
    dataChanged('duration', finalValue)
  }

  return (
    <div className=" fixed top-0 left-0 w-full min-h-screen flex flex-row items-center justify-center bg-black/80 backdrop-blur-sm z-20" >
      <div className="flex flex-col items-stretch justify-start bg-white rounded-sm  rounded-lg p-4 w-full max-w-md divide-y">
        <div className="flex flex-col items-stretch justify-between gap-2 p-2 py-4">
          <label htmlFor="title-input" className="font-bold">Title</label>
          <input type={'text'} defaultValue={data.title} id='title-input' onChange={(e) => dataChanged('title', e.target.value)}></input>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-2 p-2 py-4">
          <label htmlFor="date-input" className="font-bold">Date</label>
          <input type={'datetime-local'} defaultValue={data.time} id='date-input' onChange={(e) => dataChanged('time', e.target.value)}></input>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-2 p-2 py-4">
          <label htmlFor="duration-input" className="font-bold">Duration</label>
          {/* <input type={'date'} defaultValue={data.title} id='duration-input' onChange={(e) => dataChanged('duration', e.target.value)}></input> */}
          <div className="flex flex-row items-center justify-start gap-2" id="duration-input">
            <input type={'number'} defaultValue={getDuration(data.duration).hour} className='w-12' min={0} onChange={durationChanged} id='hour'></input>
            <div>Hour</div>
            <input type={'number'} defaultValue={getDuration(data.duration).minute} className='w-12' min={0} max={60} onChange={durationChanged} id='minute'></input>
            <div>Min</div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between p-2 py-4">
          <label htmlFor="isOnsite-input" className="font-bold">Onsite ?</label>
          <input type={'checkbox'} defaultChecked={data.isOnsite} id='isOnsite-input' onChange={(e) => dataChanged('isOnsite', e.target.checked)}></input>
        </div>

        <div className="flex flex-row items-center justify-between p-2 py-4">
          <label htmlFor="isRequired-input" className="font-bold">Required ?</label>
          <input type={'checkbox'} defaultChecked={data.isRequired} id='isRequired-input' onChange={(e) => dataChanged('isRequired', e.target.checked)}></input>
        </div>

        <div className="flex flex-row items-center justify-between p-2 py-4">
          <label htmlFor="isDownloadable-input" className="font-bold">Downloadable ?</label>
          <input type={'checkbox'} defaultChecked={data.isDownloadable} id='isDownloadable-input' onChange={(e) => dataChanged('isDownloadable', e.target.checked)}></input>
        </div>

        <div className="flex flex-row items-center justify-around p-2 py-4 pt-8 gap-2">
          <button className="bg-purple-600 text-white rounded-md py-2 px-8 w-full" onClick={saveLesson}>Close</button>
        </div>
      </div>
    </div>
  )
}