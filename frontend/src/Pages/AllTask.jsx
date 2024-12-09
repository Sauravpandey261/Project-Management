import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import { PlusCircle } from 'lucide-react'
import InputData from '../Components/Home/InputData';
import { useAuthcontext } from '../Context/AuthContext';
import axios from 'axios';
import { TASK_API_END_POINT } from '../assets/Apis';
import toast from 'react-hot-toast'

const AllTask = () => {
  const [allTask, setAllTask] = useState([])
  const { authUser } = useAuthcontext();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const FetchallTask = async () => {
      try {
        const res = await axios.get(`${TASK_API_END_POINT}/get`, { withCredentials: true })
        if (res.data.success) {
          setAllTask(res.data.tasks)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    FetchallTask();
  }, [authUser,allTask])
  return (
    <div>
      <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900'>
        <h1 className='text-xl md:text-3xl p-2 border-b-2 font-serif font-bold'>All Tasks</h1>
        <button onClick={() => setOpenDialog(true)} className='btn btn-outline text-white transition-all duration-300'><PlusCircle /> Add Task</button>
      </div>
      <Cards Tasks={allTask} />
      <InputData setOpenDialog={setOpenDialog} openDialog={openDialog} />
    </div>
  )
}

export default AllTask