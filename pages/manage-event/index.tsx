import { Eye, More, Edit2, Video, Clock, ImportCurve, AddSquare, Add } from "iconsax-react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { getDate, getDuration } from "../../utils/util";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from 'nanoid'
import EditDialog from "../../components/edit-dialog";


const reorderTasks = (tasks: any, startIndex: any, endIndex: any) => {
  const newTaskList = Array.from(tasks);
  const [removed] = newTaskList.splice(startIndex, 1);
  newTaskList.splice(endIndex, 0, removed);
  return newTaskList;
};


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

  // const [placeholderProps, setPlaceholderProps] = useState({});
  // const queryAttr = "data-rbd-drag-handle-draggable-id";

  // // // Function to update list on drop
  // // const handleDrop = (droppedItem: any) => {
  // //   // Ignore drop outside droppable container
  // //   if (!droppedItem.destination) return;
  // //   let updatedList = [...session];
  // //   // Remove dragged item
  // //   const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
  // //   // Add dropped item
  // //   updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
  // //   // Update State
  // //   setSession(updatedList);
  // // };



  // const getDraggedDom = (draggableId: any) => {
  //   const domQuery = `[${queryAttr}='${draggableId}']`;
  //   const draggedDOM = document.querySelector(domQuery);

  //   return draggedDOM;
  // };

  // const onDragEnd = (result: any) => {
  //   const { source, destination } = result;

  //   // if the user drops outside of a droppable destination
  //   if (!destination) return;

  //   // If the user drags and drops back in the same position
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   // If the user drops in a different postion
  //   const tasks = session;
  //   const newTasks = reorderTasks(tasks, source.index, destination.index);

  //   const newState = {
  //     ...session,
  //     tasks: newTasks,
  //   };
  //   setSession(newState);
  // };

  // const onDragUpdate = (result: any) => {
  //   const { source, destination, draggableId } = result;

  //   if (!destination) return;

  //   const draggedDOM = getDraggedDom(draggableId);

  //   if (!draggedDOM?.parentNode) return;

  //   const { clientHeight, clientWidth } = draggedDOM;
  //   const destinationIndex = destination.index;
  //   const sourceIndex = source.index;

  //   const childrenArray = draggedDOM.parentNode.children
  //     ? [...draggedDOM.parentNode.children]
  //     : [];

  //   const movedItem = childrenArray[sourceIndex];
  //   childrenArray.splice(sourceIndex, 1);

  //   const updatedArray = [
  //     ...childrenArray.splice(0, destinationIndex),
  //     movedItem,
  //     ...childrenArray.splice(destinationIndex + 1),
  //   ];

  //   const clientY =
  //     parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
  //     updatedArray.splice(0, destinationIndex).reduce((total, current) => {
  //       const style = current.currentStyle || window.getComputedStyle(current);
  //       const marginBottom = parseFloat(style.marginBottom);
  //       return total + current.clientHeight + marginBottom;
  //     }, 0);

  //   setPlaceholderProps({
  //     clientHeight,
  //     clientWidth,
  //     clientY,
  //   });
  // };

  // const onDragStart = (result) => {
  //   const { source, draggableId } = result;
  //   const draggedDOM = getDraggedDom(draggableId);

  //   if (!draggedDOM) return;

  //   const { clientHeight, clientWidth } = draggedDOM;
  //   const sourceIndex = source.index;

  //   if (!draggedDOM.parentNode) return;

  //   /**
  //    * 1. Take all the items in the list as an array
  //    * 2. Slice from the start to the where we are dropping the dragged item (i.e destinationIndex)
  //    * 3. Reduce and fetch the styles of each item
  //    * 4. Add up the margins, widths, paddings
  //    * 5. Accumulate and assign that to clientY
  //    */
  //   const clientY =
  //     parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
  //     [...Array.from(draggedDOM.parentNode.children)]
  //       .slice(0, sourceIndex)
  //       .reduce((total, current) => {
  //         const style =
  //           current.currentStyle || window.getComputedStyle(current);
  //         const marginBottom = parseFloat(style.marginBottom);

  //         return total + current.clientHeight + marginBottom;
  //       }, 0);

  //   setPlaceholderProps({
  //     clientHeight,
  //     clientWidth,
  //     clientY,
  //   });
  // };

  const lessonChanged = (data: LessonProps) => {
    // get available session and save it to temporary variable
    const tempSession = session

    //get selected session index 
    const selectedSessionIndex = tempSession.findIndex(item => item.id === selectedSession.id)

    // get changed lesson index
    const changedLessonIndex = tempSession[selectedSessionIndex].lessons.findIndex(item => item.id === data.id)

    // then changed the modified lesson in temporary session
    tempSession[selectedSessionIndex].lessons[changedLessonIndex] = data

    console.log(tempSession, changedLessonIndex, selectedSessionIndex)

    // update session state
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


  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <Layout>
      <div className="flex flex-col items-stretch justify-start gap-2 p-4">
        <div className="flex flex-row items-center justify-between mt-8">
          <div className="flex flex-row items-center justify-start gap-8">
            <h1 className="text-4xl font-semibold">Belajar dan praktek cinematic videography</h1>
            <p className="text-gray-500 text-sm">Last edited 18 October 2021 | 13:23</p>
          </div>
          <button className="flex flex-row items-center justify-center gap-2 rounded-md outline outline-1 outline-purple-600 text-purple-600 p-4 px-8">
            <Eye />
            <div>Preview</div>
          </button>
        </div>

        <div className="flex flex-row items-center justify-start rounded-md outline outline-1 outline-gray-300 p-8 py-4 mt-8">
          <div>Event Schedule: 24 Oktober 2021, 16.30</div>
        </div>

        {/* <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {session.map((item, index) => (
                  <Draggable key={'item'} draggableId={item} index={index}>
                    {(provided) => (
                      <div className="item-container flex flex-col items-stretch justify-start rounded-md outline outline-1 outline-gray-300 p-8 py-4 mt-8 gap-2" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <div className="flex flex-row items-center justify-start text-2xl font-bold gap-2">
                          <DragIcon />
                          <div>{item.title}</div>
                          <Edit2 size={20} className='text-gray-400 ml-4' />
                        </div>

                        <div className="flex flex-col items-stretch justify-start pl-8 mt-4">
                          {
                            item.lessons.map((item, index) => (
                              <Lesson {...item} key={index} />
                            ))
                          }
                        </div>

                        <div className="flex flex-row items-center justify-start gap-4 mt-4">
                          <AddSquare variant="Bold" className="text-purple-600 cursor-pointer" size={32} />
                          <div className="font-semibold">Add Lesson Material</div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}

        {editMode.isActive &&
          <EditDialog {...selectedLesson} onChange={(data: LessonProps) => { lessonChanged(data) }} type={'lesson'}></EditDialog>
        }


        {session.length > 0 && session.map((session, index) => (
          <div className="item-container flex flex-col items-stretch justify-start rounded-md outline outline-1 outline-gray-300 p-8 py-4 mt-8 gap-2" key={index}>
            <div className="flex flex-row items-center justify-start text-2xl font-bold gap-2">
              <DragIcon />
              <div>{session.title}</div>
              <Edit2 size={20} className='text-gray-400 ml-4 cursor-pointer' onClick={() => switchToEditMode(session.id, 'session')} />
            </div>

            <div className="flex flex-col items-stretch justify-start pl-8 mt-4">
              {
                session.lessons.map((item, index) => (
                  <Lesson {...item} key={index} onEdit={(id: string) => switchToEditMode(session.id, 'lesson', id)} />
                ))
              }
            </div>

            <div className="flex flex-row items-center justify-start gap-4 mt-4">
              <AddSquare variant="Bold" className="text-purple-600 cursor-pointer" size={32} />
              <div className="font-semibold">Add Lesson Material</div>
            </div>
          </div>
        ))}

        <button className="flex flex-row items-center justify-center gap-2 rounded-md bg-purple-600 text-white w-fit ml-auto mt-4 p-4 px-8" onClick={addSession}>
          <Add />
          <div>Add Session</div>
        </button>
      </div>
    </Layout >
  )
}

export interface LessonProps {
  title?: string
  isRequired?: boolean
  time?: string
  isDownloadable?: boolean
  duration?: number //in seconds
  id?: string
}

export interface SessionProps {
  title: string
  lessons: LessonProps[]
  id: string
}

interface Lesson extends LessonProps {
  onEdit: Function
}

function Lesson(props: Lesson) {
  return (
    <div className="flex flex-row items-center justify-between pl-4 py-2 hover:bg-gray-50 hover:shadow-sm select-none" >
      {/* Left side */}
      < div className="flex flex-row items-center justify-start gap-4" >
        <DragIcon />
        <Video />
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
          <div>{getDuration(props.duration)} Min</div>
        </div>

        <Dot />

        {/* Downloadable */}
        {props.isDownloadable &&
          <button className="flex flex-row items-center justify-start gap-2">
            <ImportCurve />
            <div>Downloadable</div>
          </button>
        }

        <button className="bg-gray-100 p-2 px-1 rounded-md">
          <More className="rotate-90" onClick={() => props.onEdit(props.id)} />
        </button>
      </div >
    </div >
  )
}

function Dot() {
  return (
    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
  )
}

function DragIcon() {
  return (
    <div className="flex flex-row cursor-grab text-gray-400">
      <More className="rotate-90 -mx-1 " />
      <More className="rotate-90 -mx-3" />
    </div>
  )
}

function getDefaultSessionProps() {
  const newSession: SessionProps = {
    title: '',
    lessons: [],
    id: nanoid()
  }
  return newSession
}