import { useEffect, useState } from 'react'
import clsx from 'clsx'
import useGameOfLife from './hooks/useGameOfLife'

export default function App() {
  const { fields, tick, setField, getCell } = useGameOfLife(25, 25)
  const [start, setStart] = useState(false)
  const [tickSpeed, setTickSpeed] = useState(1000)

  useEffect(() => {
    if (start) {
      const interval = setInterval(tick, tickSpeed)
      return () => clearInterval(interval)
    }
  }, [start, fields, tickSpeed])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div>
        {fields.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={x}
                onClick={() =>
                  setField(x, y, getCell(x, y) === 'live' ? 'dead' : 'live')
                }
                className={clsx('w-8 h-8 hover:cursor-pointer', {
                  'bg-gray-200 hover:bg-gray-300': cell === 'dead',
                  'bg-green-500 hover:bg-green-400': cell === 'live',
                })}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex space-x-5 items-center">
        <button onClick={() => setStart((prev) => !prev)}>
          {start ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => {
            fields.forEach((row, y) => {
              row.forEach((_, x) => {
                setField(x, y, 'dead')
              })
            })
          }}
        >
          Clear
        </button>
        <input
          type="number"
          value={tickSpeed}
          className="w-20 text-center"
          onChange={(e) => setTickSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
