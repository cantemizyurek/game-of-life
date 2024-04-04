import { useState } from 'react'

export default function useGameOfLife(width: number, height: number) {
  const [fields, setFields] = useState<('dead' | 'live')[][]>(
    createEmptyFields.bind(null, width, height)
  )

  function tick() {
    fields.forEach((row, x) => {
      row.forEach((_, y) => {
        updateField(x, y)
      })
    })
  }

  function updateField(x: number, y: number) {
    const neighbors = getNeighbors(x, y)
    const liveCount = getCountOf(neighbors, 'live')

    if (liveCount < 2 && getCell(x, y) === 'live') setField(x, y, 'dead')
    else if (liveCount > 3 && getCell(x, y) === 'live') setField(x, y, 'dead')
    else if (liveCount === 3 && getCell(x, y) === 'dead') setField(x, y, 'live')
  }

  function setField(x: number, y: number, to: 'live' | 'dead') {
    setFields((prevFields) => {
      const newFields = prevFields.map((row) => [...row])
      newFields[y][x] = to
      return newFields
    })
  }

  function getNeighbors(x: number, y: number) {
    const neighbors = []
    for (let i = -1; i <= 1; i++) {
      for (let k = -1; k <= 1; k++) {
        if (i === 0 && k === 0) continue
        neighbors.push(getCell(x + i, y + k))
      }
    }
    return neighbors
  }

  function getCell(x: number, y: number) {
    if (x < 0) x = fields[0].length + x
    if (x >= fields[0].length) x = x - fields[0].length
    if (y < 0) y = fields.length + y
    if (y >= fields.length) y = y - fields.length

    return fields[y][x]
  }

  return { fields, tick, setField, getCell }
}

function getCountOf<T>(arr: T[], value: T): number {
  return arr.filter((v) => v === value).length
}

function createEmptyFields(width: number, height: number) {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill('dead'))
}
