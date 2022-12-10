
import { More, Video, Clock, ImportCurve, Location } from "iconsax-react";
import DragIcon from "./drag-icon";
import { getDate } from "../utils/util";
import Dot from "./dot";
import { getDuration } from "../utils/util";

export interface LessonProps {
  title?: string
  isRequired?: boolean
  time?: string
  isDownloadable?: boolean
  duration?: number //in seconds
  id?: string
  isOnsite?: boolean
}

export interface SessionProps {
  title: string
  lessons: LessonProps[]
  id: string
}

interface Lesson extends LessonProps {
  onEdit: Function
}

export default function Lesson(props: Lesson) {
  return (
    <div className="flex flex-row items-center justify-between pl-4 py-2 hover:bg-gray-50 hover:shadow-sm select-none" >
      {/* Left side */}
      < div className="flex flex-row items-center justify-start gap-4" >
        <DragIcon />
        {props.isOnsite ? <Location /> : <Video />}
        <div className="font-semibold">{props.title}</div>
        <div className="text-gray-300">|</div>
        {
          props.isRequired &&
          <div className="text-purple-600 font-bold">Required</div>
        }
      </div >

      {/* Right Side */}
      < div className="flex flex-row items-center justify-end gap-4" >
        {/* Date */}
        < div className="flex flex-row items-center justify-start gap-2" >
          <Clock />
          <div>{getDate(props.time)}
          </div>
        </div >

        <Dot />

        {/* Time */}
        <div className="flex flex-row items-center justify-start gap-2">
          <Clock />
          <div>{getDuration(props.duration).hour + ":" + getDuration(props.duration).minute} Min</div>
        </div>

        <Dot />

        {/* Downloadable */}
        <button className={`flex flex-row items-center justify-start gap-2 ${!props.isDownloadable ? 'text-gray-300' : ''}`}>
          <ImportCurve />
          <div className={` ${!props.isDownloadable ? 'line-through' : ''}`}>Downloadable</div>
        </button>

        <button className="bg-gray-50 p-2 px-1 rounded-md">
          <More className="rotate-90" onClick={() => props.onEdit(props.id)} />
        </button>
      </div >
    </div >
  )
}

