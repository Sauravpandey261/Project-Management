import React from 'react'
import { Heart, Trash2Icon } from 'lucide-react'
import axios from 'axios'
import { TASK_API_END_POINT } from '../../assets/Apis'
import toast from 'react-hot-toast'

const Cards = ({ Tasks }) => {

    // delete Task
    const deleteTask = async (TaskId) => {
        try {
            const res = await axios.get(`${TASK_API_END_POINT}/${TaskId}/delete`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    // update to important 
    const updateImportant = async (status,TaskId) => {
        try {
            const res = await axios.post(`${TASK_API_END_POINT}/${TaskId}/updateimportant`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    
    // update to complete or incomplete
    const updateComplete = async (status,TaskId) => {
        try {
            const res = await axios.post(`${TASK_API_END_POINT}/${TaskId}/updatecomplete`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return Tasks && (
        <div className='h-[75vh] overflow-y-auto'>
            <div className={`${Tasks.length > 0 && 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'} p-4`}>
                {Tasks.length > 0 ? Tasks.map((item, idx) => (
                    <div key={idx} className='bg-gray-800 z-0 max-h-1/3 flex flex-col justify-between rounded-xl shadow-xl p-2'>
                        <div className='my-2'>
                            <h1 className='text-lg font-bold'>{item.title}</h1>
                            <p className='text-sm my-2 text-gray-500'>{item.description}</p>
                        </div>
                        <div className='flex items-center justify-between m-2'>
                            <button onClick={()=>updateComplete((!item.complete ? true : false),item._id)} className={`btn btn-sm rounded-full font-bold ${!item.complete ? 'btn-warning' : 'btn-success'}`}>{!item.complete ? "Incomplete" : "Complete"}</button>
                            <div className='flex items-center gap-2'>
                                <Heart onClick={() => updateImportant((!item.important ? true : false),item._id)} className={`hover:text-red-700 hover:scale-105 transition-all hover:fill-red-700 ${item.important ? 'fill-red-700 text-red-700' : ''} cursor-pointer`} />
                                <Trash2Icon onClick={() => deleteTask(item._id)} className=' hover:text-red-400  cursor-pointer' />
                            </div>
                        </div>
                    </div>
                )) :
                    <h1 className='text-red-400 text-xl font-mono text-center'>No Task listed</h1>
                }
            </div>
        </div>
    )
}

export default Cards 