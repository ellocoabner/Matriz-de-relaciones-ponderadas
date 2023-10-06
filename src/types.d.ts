import { type v4 } from 'uuid'
import { type AREA } from './helpers/consts'

export interface Espacio {
  area: AREA
  id: v4
  name: string
}

export interface Context {
  Modal: {
    handleToggleModal: () => void
    showModal: boolean
  }

  Espacios: {
    handleEspacios: (espacio: Espacio) => void
    espacios: Espacio[]
  }
}
