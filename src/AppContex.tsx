import { createContext, useContext, useState } from 'react'
import { type Context, type Espacio } from './types'

const AppContext = createContext<Context>({
  Modal: {
    handleToggleModal: () => {},
    showModal: true
  },
  Espacios: {
    handleEspacios: () => {},
    espacios: []
  }
})

export function AppProvider ({ children }: { children: any }): JSX.Element {
  const [showModal, setShowModal] = useState(true)
  const [espacios, setEspacios] = useState<Espacio[]>([])

  const handleToggleModal = (): void => {
    setShowModal(!showModal)
  }

  const handleEspacios = (espacio: Espacio): void => {
    setEspacios(prevData => [...prevData, espacio])
  }

  return (
    <AppContext.Provider value={{
      Modal: { handleToggleModal, showModal },
      Espacios: { handleEspacios, espacios }
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default function useAppContext (): any {
  const context = useContext(AppContext)
  if (context === null || context === undefined) throw new Error('El componente debe estar envuelto en el provider')

  return context
}
