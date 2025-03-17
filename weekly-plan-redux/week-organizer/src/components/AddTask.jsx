import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { Box, height } from '@mui/system';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/planSlice'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: 600,
    overflowY: 'auto',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddTask() {
    const [taskNumber, setTaskNumber] = useState(0)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [id, setId] = useState(3)
    const [day, setDay] = useState("Monday")
    const [date, setDate] = useState("01-01-2001")
    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    const handleTaskChange = (index, field, value) => {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks[index] = { 
            ...updatedTasks[index], 
            [field]: value, 
            taskId: index,
            completed: false
          };
          return updatedTasks;
        });
      };

    const handleTaskNumberChange = (e) => {
        const num = Number(e.target.value);
        setTaskNumber(num);

        setTasks((prevTasks) => {
            if (num > prevTasks.length) {
                return [...prevTasks, ...Array(num - prevTasks.length).fill({ time: "", task: "" })];
            } else {
                return prevTasks.slice(0, num);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(id, day, date, tasks)
        dispatch(addTask({id:id, day: day, date:date, tasks:tasks}))
    }

    return (
        <div>
            <button onClick={handleOpen}>Add Task</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <form className='task-form' onSubmit={handleSubmit}>
                        <h3>Add Task</h3>
                        <input className='task-form-input' onChange={(e) => setDate(e.target.value)} type='date' placeholder='Task date' />
                        <select className='task-form-select' onChange={(e) => setDay(e.target.value)}>
                            <option value="sunday">Sunday</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                        </select>
                        <input className='task-form-input' value={taskNumber} onChange={handleTaskNumberChange} min={0} type='number' placeholder='Number of tasks' />
                        {taskNumber > 0 && (
                            <div className="task-inputs">
                                <h3>Tasks</h3>
                                {Array.from({ length: taskNumber }, (_, index) => (
                                    <div className="task-input" key={index}>
                                        <input
                                            className="time-input"
                                            type="time"
                                            placeholder="Task hour"
                                            value={tasks[index]?.time || ""}
                                            onChange={(e) => handleTaskChange(index, "time", e.target.value)}
                                        />
                                        <input
                                            className="text-input"
                                            type="text"
                                            placeholder="Task Name"
                                            value={tasks[index]?.task || ""}
                                            onChange={(e) => handleTaskChange(index, "task", e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <button type='submit'>Add Task</button>
                    </form>
                </Box>

            </Modal>

        </div>
    )
}
