import { v4 } from 'uuid'
import { type AREA } from '../helpers/consts'
import { type Espacio } from '../types'

export default function createEspacio (area: AREA | string, name: string): Espacio {
  if ((area === undefined && area === null) || (name === undefined && area === null)) throw new Error('Should pass parameter values')

  return {
    id: v4(),
    area,
    name
  }
}
