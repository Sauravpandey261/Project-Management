import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthcontext } from '../Context/AuthContext'
import { TASK_API_END_POINT } from '../assets/Apis'

const IncompletedTask = () => {
    const [allInCompletedTask, setAllInCompletedTask] = useState([])
    const { authUser } = useAuthcontext();
    useEffect(() => {
      const FetchallInCompletedTask = async () => {
        try {
          const res = await axios.get(`${TASK_API_END_POINT}/getincomplete`, { withCredentials: true })
          if (res.data.success) {
            setAllInCompletedTask(res.data.tasks)
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      FetchallInCompletedTask();
    }, [authUser, allInCompletedTask])
  return (
    <div>
      <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900'>
        <h1 className='text-3xl p-2 font-serif border-b-2 font-bold'>Incompleted Tasks</h1>
      </div>
      <Cards Tasks={allInCompletedTask} />
    </div>
  )
}

export default IncompletedTask