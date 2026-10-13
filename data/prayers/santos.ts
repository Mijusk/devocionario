import type { Prayer } from '~/types/prayer'
import { p, quote, litany, pnAmGloria } from '../helpers'

export const santos: Prayer[] = [
  {
    slug: 'san-jose',
    title: 'Oración a San José',
    summary: 'Salve, custodio del Redentor…',
    category: 'santos',
    tags: ['san josé', 'familia', 'papa francisco'],
    author: 'Papa Francisco, Patris corde',
    blocks: [
      p('Salve, custodio del Redentor\ny esposo de la Virgen María.\nA ti Dios confió a su Hijo,\nen ti María depositó su confianza,\ncontigo Cristo se forjó como hombre.'),
      p('Oh, bienaventurado José,\nmuéstrate padre también a nosotros\ny guíanos en el camino de la vida.\nConcédenos gracia, misericordia y valentía,\ny defiéndenos de todo mal.\nAmén.'),
    ],
  },
  {
    slug: 'humildad-san-jose',
    title: 'Humildad con San José',
    summary: 'Enséñanos, San José, cómo se es «no protagonista».',
    category: 'santos',
    tags: ['san josé', 'humildad', 'servicio'],
    blocks: [
      quote('Quien quiera ser grande entre vosotros, que sea vuestro servidor; y quien quiera ser el primero, que sea vuestro esclavo.', 'Mt 20, 26-27'),
      p('Enséñanos, San José,\ncómo se es «no protagonista»;\ncómo se avanza sin pisotear;\ncómo se colabora sin imponerse;\ncómo se ama sin reclamar.'),
      p('Dinos, San José,\ncómo se vive siendo «número dos»;\ncómo se hacen cosas fenomenales\ndesde un segundo puesto.\nAmén.'),
    ],
  },
  {
    slug: 'san-miguel-arcangel',
    title: 'San Miguel Arcángel',
    summary: 'San Miguel Arcángel, defiéndenos en la lucha…',
    category: 'santos',
    tags: ['ángeles', 'protección', 'combate espiritual'],
    author: 'León XIII',
    blocks: [
      p('San Miguel Arcángel,\ndefiéndenos en la lucha;\nsé nuestro amparo\ncontra la perversidad y asechanzas del demonio.'),
      p('Reprímale Dios, pedimos suplicantes,\ny tú, Príncipe de la milicia celestial,\narroja al infierno, con el divino poder,\na Satanás y a los otros espíritus malignos\nque andan dispersos por el mundo\npara la perdición de las almas.\nAmén.'),
    ],
    latin: [
      p('Sancte Michael Archangele,\ndefende nos in proelio;\ncontra nequitiam et insidias diaboli esto praesidium.'),
      p('Imperet illi Deus, supplices deprecamur:\ntuque, Princeps militiae caelestis,\nSatanam aliosque spiritus malignos,\nqui ad perditionem animarum pervagantur in mundo,\ndivina virtute in infernum detrude.\nAmen.'),
    ],
  },
  {
    slug: 'santa-brigida-de-suecia',
    title: 'Oración a Santa Brígida',
    summary: 'Patrona de Europa: abrir el corazón al prójimo.',
    category: 'santos',
    tags: ['santa brígida', 'europa', 'unidad'],
    blocks: [
      p('Con corazón confiado nos dirigimos a ti, santa Brígida,\npara que, por tu intercesión,\nel Señor nos infunda el valor de abrir nuestro corazón y nuestra mente\nal prójimo, a los fieles de otras confesiones y de otros credos.'),
      p('Que Jesús, que te dio a conocer el abismo de sus sufrimientos,\nnos conceda la gracia de superar las barreras\nde la indiferencia, el prejuicio y el odio,\ny, por medio de ti, a quien la Iglesia entera honra como patrona de Europa,\nnos conceda la visión de los últimos días,\ncuando los cristianos podremos caminar juntos hacia la fiesta final,\ny las lágrimas y la discordia serán vencidas por el amor.\nAmén.'),
      litany('ruega por nosotros', [
        'Santa Brígida, intrépida en el servicio de Dios',
        'Santa Brígida, paciente en los sufrimientos y humillaciones',
        'Santa Brígida, admirable en el amor a Jesús y a María',
      ]),
      ...pnAmGloria(),
    ],
  },
  {
    slug: 'carmen-hernandez',
    title: 'Oración a Carmen Hernández',
    summary: 'Por la intercesión de la coiniciadora del Camino Neocatecumenal.',
    category: 'santos',
    tags: ['camino neocatecumenal', 'sierva de dios'],
    note: 'Oración para uso privado, mientras está abierta su causa de beatificación.',
    blocks: [
      p('Oh Dios,\nque eligiendo a la sierva de Dios Carmen Hernández\ncomo coiniciadora del Camino Neocatecumenal\nle concediste un gran amor a Cristo Jesús y a la Iglesia,\na las Sagradas Escrituras y a la oración litúrgica,\ncelo ardiente por el anuncio itinerante del Evangelio\ny la fidelidad a ti en la prueba de la cruz;'),
      p('concédeme, por su intercesión,\nser fiel al bautismo que he recibido\ny, si es tu voluntad, la gracia que te pido.\nPor Jesucristo, nuestro Señor.\nAmén.'),
      ...pnAmGloria(),
    ],
  },
]
