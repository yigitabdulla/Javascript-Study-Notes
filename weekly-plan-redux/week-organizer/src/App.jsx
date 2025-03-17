import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import PlanTable from "./components/PlanTable"
import AddTask from './components/AddTask'


function App() {

  const plans = useSelector(store => store.plan.weeklyPlan)

  console.log(plans)

  return (
    <>
      <div className='main-container'>
        <h1>Weekly Task Organizer</h1>
        <AddTask/>
        <PlanTable/>
      </div>
    </>
  )
}

export default App
