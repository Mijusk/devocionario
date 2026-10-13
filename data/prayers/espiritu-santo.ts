import type { Prayer } from '~/types/prayer'
import { p, h, vr } from '../helpers'

export const espirituSanto: Prayer[] = [
  {
    slug: 'ven-espiritu-santo',
    title: 'Ven, Espíritu Santo',
    summary: 'Ven, Espíritu Santo, llena los corazones de tus fieles…',
    category: 'espiritu-santo',
    tags: ['pentecostés', 'inicio'],
    note: 'Buena oración para empezar cualquier rato de oración, estudio o trabajo.',
    blocks: [
      p('Ven, Espíritu Santo,\nllena los corazones de tus fieles\ny enciende en ellos el fuego de tu amor.'),
      vr('Envía, Señor, tu Espíritu, y todo será creado.', 'Y renovarás la faz de la tierra.'),
      h('Oremos'),
      p('Oh Dios, que instruiste los corazones de tus fieles\ncon la luz del Espíritu Santo,\nconcédenos que, guiados por el mismo Espíritu,\nsintamos con rectitud\ny gocemos siempre de sus divinos consuelos.\nPor Cristo nuestro Señor.\nAmén.'),
    ],
    latin: [
      p('Veni, Sancte Spiritus,\nreple tuorum corda fidelium,\net tui amoris in eis ignem accende.'),
      vr('Emitte Spiritum tuum et creabuntur.', 'Et renovabis faciem terrae.'),
    ],
  },
  {
    slug: 'alma-de-mi-alma',
    title: 'Alma de mi alma',
    summary: 'Oh Espíritu Santo, alma de mi alma, yo te adoro…',
    category: 'espiritu-santo',
    tags: ['docilidad', 'voluntad de Dios'],
    author: 'Cardenal Mercier',
    note: 'El cardenal Mercier aseguraba que rezarla cada día cinco minutos, en silencio, transforma la vida.',
    blocks: [
      p('Oh Espíritu Santo, alma de mi alma,\nyo te adoro.\nIlumíname, guíame,\nfortifícame, consuélame;\ndime qué debo hacer,\ndame tus órdenes.'),
      p('Te prometo someterme\na todo lo que desees de mí\ny aceptar todo lo que permitas que me suceda.\nHazme tan solo conocer tu voluntad.\nAmén.'),
    ],
  },
]
