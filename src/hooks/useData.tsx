import { useState } from 'react'

export default function useData (): any {
  const [data, setData] = useState([])

  return data.length === 0 && setData
}
