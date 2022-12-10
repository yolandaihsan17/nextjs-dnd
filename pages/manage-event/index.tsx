import { Eye, More, Edit2, Video, Clock, ImportCurve, AddSquare, Add, Location } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import { nanoid } from 'nanoid'
import EditDialog from "../../components/edit-dialog";
import EditSession from "../../components/edit-session";
import DragIcon from "../../components/drag-icon";
import Lesson, { LessonProps, SessionProps } from "../../components/lesson";
import { getDate } from "../../utils/util";

interface EditMode {
  type: 'session' | 'lesson' | null
  isActive: boolean
}

export default function ManagePage() {

  // const dummyLesson: LessonProps[] = [{
  //   title: 'Judul Video 1',
  //   isRequired: true,
  //   time: '2019-08-09T06:00:00Z',
  //   isDownloadable: true,
  //   duration: 3600,
  //   id: nanoid(),
  //   // onChange: () => { }
  // }, {
  //   title: 'Judul Video 2',
  //   isRequired: true,
  //   time: '2032-12-19T06:00:00Z',
  //   isDownloadable: true,
  //   duration: 3660,
  //   id: nanoid(),
  //   // onChange: () => { }
  // }, {
  //   title: 'Judul Video 3',
  //   isRequired: true,
  //   time: '2011-11-03T06:00:00Z',
  //   isDownloadable: true,
  //   duration: 3672,
  //   id: nanoid(),
  //   // onChange: () => { }
  // }]

  // const dummySession: SessionProps[] = [{
  //   title: 'Session 1',
  //   lessons: dummyLesson,
  //   id: nanoid(),
  // }, {
  //   title: 'Session 2',
  //   lessons: dummyLesson,
  //   id: nanoid(),
  // }]

  const [editMode, setEditMode] = useState<EditMode>({ isActive: false, type: 'session' })
  const [session, setSession] = useState<SessionProps[]>([])

  const [selectedSession, setSelectedSession] = useState<SessionProps>(session[0])
  const [selectedLesson, setSelectedLesson] = useState<LessonProps>(session[0]?.lessons[0])

  const [lastEdited, setLastEdited] = useState<string>((new Date().toISOString()).replace(/.\d+Z$/g, ""))

  useEffect(() => {
    setLastEdited((new Date().toISOString()).replace(/.\d+Z$/g, ""))
  }, [session])

  const lessonChanged = (data: LessonProps) => {
    // get available session and save it to temporary variable
    const tempSession = session

    //get selected session index 
    const selectedSessionIndex = tempSession.findIndex(item => item.id === selectedSession.id)

    // get changed lesson index
    const changedLessonIndex = tempSession[selectedSessionIndex].lessons.findIndex(item => item.id === data.id)

    // then changed the modified lesson in temporary session
    tempSession[selectedSessionIndex].lessons[changedLessonIndex] = data

    // update session state
    setSession(tempSession)
    setEditMode(prev => ({ ...prev, isActive: false }))
  }

  const sessionChanged = (data: SessionProps) => {
    // get available session and save it to temporary variable
    const tempSession = session

    //get selected session index 
    const selectedSessionIndex = tempSession.findIndex(item => item.id === selectedSession.id)

    // // get changed lesson index
    // const changedLessonIndex = tempSession[selectedSessionIndex].lessons.findIndex(item => item.id === data.id)

    // // then changed the modified lesson in temporary session
    tempSession[selectedSessionIndex] = data

    // // update session state
    setSession(tempSession)
    setEditMode(prev => ({ ...prev, isActive: false }))
  }

  const switchToEditMode = (sessionId: string, type: 'session' | 'lesson', lessonId?: string) => {
    // find selected session which to be edited
    const sessionTemp: any = session.find(item => item.id === sessionId)

    // set selected session
    setSelectedSession(sessionTemp)

    // find selected lesson which to be edited
    let lessonTemp: any = lessonId ? sessionTemp.lessons.find((item: any) => item.id === lessonId) : null

    // Set Selected lesson if any lesson found
    if (lessonTemp) setSelectedLesson(lessonTemp)

    // Activate edit mode, based on the edit type
    // if we are going to edit session, then type is session, and otherwise for lesson
    // then the dialog(modal) will appear
    setEditMode({ type: type, isActive: true })
  }

  const addSession = () => {
    let tempSession = session
    const newSession = getDefaultSessionProps()
    tempSession.unshift(newSession)
    setSelectedSession(newSession)
    setSession(tempSession)
    setEditMode({ isActive: true, type: 'session' })
  }

  const addLesson = (sessionIndex: number) => {
    // const selectedSessionIndex = session.findIndex(item => item.id === selectedSession.id)
    // Set current active session
    setSelectedSession(session[sessionIndex])

    // create new lesson
    let newLesson = getDefaultLessonProps()

    // set temporary session
    let tempSession = session

    // push new lesson to temp session
    tempSession[sessionIndex].lessons.unshift(newLesson)

    // set session
    setSession(tempSession)

    // set selected lesson that will be edited
    setSelectedLesson(newLesson)

    // display dialog(modal)
    setEditMode({ isActive: true, type: 'lesson' })
  }

  // DnD Functions =========
  const dragItem = useRef<any>(0);
  const dragOverItem = useRef<any>(0);

  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
  };


  const drop = (e: any) => {
    const copyListItems = [...session];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSession(copyListItems);
  };


  const dragItemLesson = useRef<any>(0);
  const dragOverItemLesson = useRef<any>(0);
  const sessionRef = useRef<any>(0)

  const dragStartLesson = (e: any, position: any, sessionIndex: any) => {
    dragItemLesson.current = position;
    sessionRef.current = sessionIndex
  };

  const dragEnterLesson = (e: any, position: any, sessionIndex: any) => {
    dragOverItemLesson.current = position;
    sessionRef.current = sessionIndex
  };

  const dropLesson = (e: any) => {
    const sessionTemp = [...session]

    const lessonItems = [...session[sessionRef.current].lessons]
    const dragLessonContent = lessonItems[dragItemLesson.current]

    lessonItems.splice(dragItemLesson.current, 1);
    lessonItems.splice(dragOverItemLesson.current, 0, dragLessonContent);

    sessionTemp[sessionRef.current].lessons = lessonItems

    // reset
    dragItemLesson.current = null;
    dragOverItemLesson.current = null;
    sessionRef.current = null

    setSession(sessionTemp)
  };
  // END OF DnD FUNCTIONS=======

  return (
    <Layout>
      <div className="flex flex-col items-stretch justify-start gap-2 p-4">

        <div className="flex flex-row items-center justify-between mt-8">
          <div className="flex flex-row items-center justify-start gap-8">
            <h1 className="text-4xl font-semibold">Belajar dan praktek cinematic videography</h1>
            <p className="text-gray-500 text-sm">Last edited {getDate(lastEdited)}</p>
          </div>
          <button className="flex flex-row items-center justify-center gap-2 rounded-md outline outline-1 outline-purple-600 text-purple-600 p-4 px-8">
            <Eye />
            <div>Preview</div>
          </button>
        </div>

        <div className="flex flex-row items-center justify-start rounded-md outline outline-1 outline-gray-300 p-8 py-4 mt-8">
          <div>Event Schedule: 24 Oktober 2021, 16.30</div>
        </div>

        {(editMode.isActive && editMode.type === 'lesson') &&
          <EditDialog {...selectedLesson} onChange={(data: LessonProps) => { lessonChanged(data) }}></EditDialog>
        }

        {(editMode.isActive && editMode.type === 'session') &&
          <EditSession {...selectedSession} onChange={(data: SessionProps) => { sessionChanged(data) }}></EditSession>
        }


        {session.length > 0 && session.map((session, sessionIndex) => (
          <div className="item-container flex flex-col items-stretch justify-start rounded-md outline outline-1 outline-gray-300 p-8 py-4 mt-8 gap-2"
            key={sessionIndex}
          >
            <div className="flex flex-row items-center justify-start text-2xl font-bold gap-2">
              <div draggable
                onDragStart={(e) => dragStart(e, sessionIndex)}
                onDragEnter={(e) => dragEnter(e, sessionIndex)}
                onDragEnd={drop}><DragIcon /></div>
              <div className="ml-2">{session.title}</div>
              <Edit2 size={20} className='text-gray-400 ml-4 cursor-pointer' onClick={() => switchToEditMode(session.id, 'session')} />
            </div>

            <div className="flex flex-col items-stretch justify-start pl-8 mt-4">
              {
                session.lessons.length > 0 ? session.lessons.map((item, lessonIndex) => (
                  <div draggable
                    onDragStart={(e) => dragStartLesson(e, lessonIndex, sessionIndex)}
                    onDragEnter={(e) => dragEnterLesson(e, lessonIndex, sessionIndex)}
                    onDragEnd={dropLesson}>
                    <Lesson {...item} key={lessonIndex} onEdit={(id: string) => switchToEditMode(session.id, 'lesson', id)} />
                  </div>
                )) :
                  <div className="text-center font-bold text-yellow-500">No lesson available</div>
              }
            </div>

            <div className="flex flex-row items-center justify-start gap-4 mt-4">
              <AddSquare variant="Bold" className="text-purple-600 cursor-pointer" size={32} onClick={() => addLesson(sessionIndex)} />
              <div className="font-semibold">Add Lesson Material</div>
            </div>
          </div>
        ))}

        <button className="button-primary" onClick={addSession}>
          <Add />
          <div>Add Session</div>
        </button>
      </div>
    </Layout >
  )
}


function getDefaultSessionProps() {
  const newSession: SessionProps = {
    title: 'New Session',
    lessons: [],
    id: nanoid()
  }
  return newSession
}

function getDefaultLessonProps() {
  const newLesson: LessonProps = {
    title: 'New Lesson',
    isRequired: true,
    time: (new Date().toISOString()).replace(/.\d+Z$/g, ""),
    isDownloadable: false,
    duration: 123, //in seconds
    id: nanoid(),
    isOnsite: false
  }
  return newLesson
}