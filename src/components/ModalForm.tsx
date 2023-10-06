import './ModalForm.css'
import { type AREA, areaArray } from '../helpers/consts'
import { useState, useRef } from 'react'
import PlusSvg from './icons/PlusSvg'
import createEspacio from '../models/espacio'
import useAppContext from '../AppContex'

export default function ModalForm (): JSX.Element {
  const keysRef = useRef(1)
  const { Modal } = useAppContext()
  const [items, setItems] = useState<JSX.Element[]>([<AddItem key={keysRef.current} />])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    Modal.handleToggleModal()
  }

  const handleAddItemButton = (): void => {
    keysRef.current += 1
    setItems(prevItems => {
      return [...prevItems, <AddItem key={keysRef.current}/>]
    })
  }

  const handleRemoveItemButton = (key: string): void => {
    setItems(prevItems => {
      const restOfItems = prevItems.filter(item => item.key !== key)
      return restOfItems
    })
  }

  return (
    <article id='modal'>
        <form onSubmit={handleSubmit} >
            <h3>Añade los espacios</h3>
            <div className='select-container'>
            {
              items.map(item => (
                <div className='select-item' key={item.key}>
                  {item}
                  <button onClick={() => { handleRemoveItemButton(item.key!) }}>❌</button>
                </div>
              ))
            }
            </div>
            <button className='add-item' type='button' onClick={handleAddItemButton}><PlusSvg/></button>
            <input type='submit' value='Ver tabla'/>
        </form>
    </article>
  )
}

function AddItem (): JSX.Element {
  const { Espacios } = useAppContext()
  const [disable, setDisble] = useState(false)
  const [data, setData] = useState({
    option: '',
    espacio: ''
  })

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value
    setData(prevData => {
      return ({
        ...prevData,
        option: value
      })
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setData(prevData => {
      return ({
        ...prevData,
        espacio: value
      })
    })
  }

  const handleClick = (): void => {
    if (data.option === '' || data.espacio === '') return
    setDisble(!disable)
    Espacios.handleEspacios(createEspacio(data.option as AREA, data.espacio))
  }

  return (
    <>
     <select name="area-select" id="area-select" onChange={handleSelect} disabled={disable}>
        <option>SELECT AREA</option>
        {areaArray.map(area => <option key={area} value={area}>{area}</option>)}
      </select>
      <input type='text' name='espacio' placeholder='SALA' value={data.espacio} onChange={handleChange} disabled={disable}/>
      {!disable && <button type='button' onClick={handleClick}>✅</button>}
    </>
  )
}
