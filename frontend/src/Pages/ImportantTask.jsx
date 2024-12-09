import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import { useAuthcontext } from '../Context/AuthContext'
import { TASK_API_END_POINT } from '../assets/Apis'
import axios from 'axios'

const ImportantTask = () => {
    const [allImportantTask, setAllImportantTask] = useState([])
    const { authUser } = useAuthcontext();
    useEffect(() => {
      const FetchallImportantTask = async () => {
        try {
          const res = await axios.get(`${TASK_API_END_POINT}/getimportant`, { withCredentials: true })
          if (res.data.success) {
            setAllImportantTask(res.data.tasks)
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      FetchallImportantTask();
    }, [authUser, allImportantTask])
  return (
    <div>
      <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900'>
        <h1 className='text-3xl p-2 font-serif border-b-2 font-bold'>Important Tasks</h1>
      </div>
      <Cards Tasks={allImportantTask} />
    </div>
  )
}

export default ImportantTask