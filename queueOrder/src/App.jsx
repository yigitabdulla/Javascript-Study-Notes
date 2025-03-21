import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [queues, setQueues] = useState([[1, 5, 7], [1, 1, 1], [10, 2, 3], [27]])
  const [num, setNum] = useState(0)


  const addItemsInQueue = (num) => {
    let totalValues = queues.map(queue => queue.reduce((a, b) => a + b,0));
    let minValue = Math.min(...totalValues);
    let minIndex = totalValues.indexOf(minValue);
  
    // Create a new array with the updated queue
    let updatedQueues = queues.map((queue, index) => 
      index === minIndex ? [...queue, num] : queue
    );
  
    setQueues(updatedQueues);
  };

  useEffect(() => {
    
    const interval = setInterval(() => {
      setQueues(prevQueues =>
        prevQueues.map(queue => 
          queue.length > 0 && queue[queue.length - 1] === 0
            ? queue.slice(0, -1)
            : queue.map((num, idx) => (idx === queue.length - 1 ? num - 1 : num))
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  },[])
  

  return (
    <>
      <div className="container">
        <div>
        <input value={num} onChange={(e) => setNum(e.target.value)} placeholder='Your total item number' type="number" />
        <button onClick={() => addItemsInQueue(num)}>Add</button>
        </div>
        
        <div className='queues'>
          {queues && queues.map((queue, idx) => {
            return <div className='queue' key={idx}>
              {queue.length > 0 ? queue.map((singlePerson, idx) => {
                return <div key={idx}>{singlePerson}</div>
              }) : <div>Empty</div>}
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
