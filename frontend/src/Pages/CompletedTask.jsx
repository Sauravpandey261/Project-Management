import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import { useAuthcontext } from '../Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TASK_API_END_POINT } from '../assets/Apis'

const CompletedTask = () => {
  const [allCompletedTask, setAllCompletedTask] = useState([])
  const { authUser } = useAuthcontext();
  useEffect(() => {
    const FetchallCompletedTask = async () => {
      try {
        const res = await axios.get(`${TASK_API_END_POINT}/getcomplete`, { withCredentials: true })
        if (res.data.success) {
          setAllCompletedTask(res.data.tasks)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    FetchallCompletedTask();
  }, [authUser, allCompletedTask])
  return (
    <div>
      <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900'>
        <h1 className='text-3xl p-2 font-serif border-b-2 font-bold'>Completed Tasks</h1>
      </div>
      <Cards Tasks={allCompletedTask} />
    </div>
  )
}

export default CompletedTask