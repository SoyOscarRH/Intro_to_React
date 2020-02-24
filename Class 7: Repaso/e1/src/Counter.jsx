import React, { useState } from "react"

const Counter = ({init}) => {
  const [count1, setChange1] = useState(init)
  const [count2, setChange2] = useState(init)

  React.useEffect(() => {
    console.log("holi");

    return () => console.log("destructor")
  }, [count1]);

  return (
    <div>
      <p>Count1 is {count1}</p>
      <p>Count2 is {count2}</p>
      <button onClick={() => setChange1(c => c + 1)}>
        Aumenta
      </button>

      <button onClick={() => setChange2(c => c - 1)}>
        Decrece
      </button>
    </div>
  )
}

export default Counter;


