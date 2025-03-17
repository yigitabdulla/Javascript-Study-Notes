import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weeklyPlan: localStorage.getItem("plans") ? JSON.parse(localStorage.getItem("plans")) : [
        { id:0, day: "Monday", date: "2025-03-18", tasks: [
            { taskId: 0, time: "09:00", task: "Team meeting", completed: true },
            { taskId: 1, time: "11:00", task: "Code review", completed: false },
            { taskId: 2, time: "02:00", task: "Develop new feature", completed: false }
          ]
        },
        { id:1, day: "Tuesday", date: "2025-03-19", tasks: [
            { taskId: 0, time: "10:00", task: "Fix bugs", completed: true },
            { taskId: 1, time: "01:00", task: "Write unit tests", completed: true },
            { taskId: 2, time: "03:30", task: "Update documentation", completed: false }
          ]
        }
      ]
}

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        addTask(state,action) {
            const {id,day,date,tasks} = action.payload
            const indexTask = (state.weeklyPlan).findIndex(task => task.date === date)

            if(indexTask >= 0) {
                state.weeklyPlan[indexTask].tasks = [...state.weeklyPlan[indexTask].tasks, ...tasks];
            } else {
                state.weeklyPlan.push({ id, day, date, tasks });
            }

            localStorage.setItem("plans", JSON.stringify(state.weeklyPlan))
            
        },

        updateTask(state, action) {
            const { taskAction, taskId, id } = action.payload;
            console.log(taskAction, taskId, id);
        
            if (taskAction === 'complete') {
                const task = state.weeklyPlan[id]?.tasks[taskId];
                
                if (task) {
                    task.completed = true;
                }
            }
        
            if (taskAction === 'notcomplete') {
                const task = state.weeklyPlan[id]?.tasks[taskId];
                
                if (task) {
                    task.completed = false;
                }
            }
        
            if (taskAction === 'remove') {
                const tasks = state.weeklyPlan[id]?.tasks;
        
                if (tasks) {
                    // Remove the task from the tasks array
                    state.weeklyPlan[id].tasks = tasks.filter((task, index) => task.taskId !== taskId);
                    
                    // If the tasks array is empty, remove the entire weekly plan entry
                    if (state.weeklyPlan[id].tasks.length === 0) {
                        state.weeklyPlan.splice(id, 1);
                    }
                }
            }

            localStorage.setItem("plans",JSON.stringify(state.weeklyPlan))
        }
        
        
    }
})


export const { addTask , updateTask } = planSlice.actions
export default planSlice.reducer