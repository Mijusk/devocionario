import type { Prayer } from '~/types/prayer'
import { p, rubric, ref } from '../helpers'

export const dia: Prayer[] = [
  {
    slug: 'oracion-de-la-manana',
    title: 'Oración de la mañana',
    summary: 'Señor, en el silencio de este día que nace…',
    category: 'dia',
    tags: ['mañana', 'paz'],
    blocks: [
      p('Señor, en el silencio de este día que nace,\nvengo a pedirte paz, sabiduría y fuerza.'),
      p('Hoy quiero mirar al mundo con ojos llenos de amor;\ntener paciencia y comprensión,\nhumildad, suavidad y bondad.\nVer a tus hijos detrás de las apariencias,\ncomo los ves tú mismo,\npara así poder apreciar la bondad de cada uno.'),
      p('Cierra mis oídos a toda murmuración.\nGuarda mi lengua de toda maledicencia.\nQue solo los pensamientos que bendigan\npermanezcan en mí.'),
      p('Quiero obrar con tanta bondad\ny tan buena intención\nque todos los que se acerquen a mí\nsientan tu presencia.\nRevísteme de tu bondad, Señor,\ny haz que en este día yo te refleje.\nAmén.'),
    ],
  },
  {
    slug: 'ofrecimiento-de-obras',
    title: 'Ofrecimiento del día',
    summary: 'Corazón divino de Jesús, yo te ofrezco…',
    category: 'dia',
    tags: ['mañana', 'sagrado corazón'],
    author: 'Apostolado de la Oración',
    blocks: [
      p('Corazón divino de Jesús,\nyo te ofrezco, por medio del Corazón Inmaculado de María,\nMadre de la Iglesia,\nen unión con el Sacrificio Eucarístico,\nlas oraciones y acciones,\ngozos y sufrimientos de este día,\nen reparación de nuestros pecados\ny por la salvación de todos los hombres,\nen la gracia del Espíritu Santo,\npara gloria del divino Padre.\nAmén.'),
    ],
  },
  {
    slug: 'aperi-domine',
    title: 'Antes del Oficio (Aperi, Domine)',
    summary: 'Abre, Señor, mi boca para bendecir tu santo nombre…',
    category: 'dia',
    tags: ['oficio', 'laudes', 'vísperas', 'latín'],
    note: 'Oración tradicional antes de rezar la Liturgia de las Horas.',
    blocks: [
      p('Abre, Señor, mi boca\npara bendecir tu santo nombre;\nlimpia mi corazón\nde todo pensamiento vano, perverso y ajeno;\nilumina mi entendimiento,\ninflama mi afecto,\npara que pueda recitar dignamente este oficio\ncon atención y devoción,\ny merecer ser escuchado\nen la presencia de tu divina majestad.\nPor Cristo nuestro Señor.\nAmén.'),
    ],
    latin: [
      p('Aperi, Domine, os meum\nad benedicendum nomen sanctum tuum:\nmunda quoque cor meum\nab omnibus vanis, perversis et alienis cogitationibus;\nintellectum illumina,\naffectum inflamma,\nut digne, attente ac devote\nhoc Officium recitare valeam,\net exaudiri merear\nante conspectum divinae Maiestatis tuae.\nPer Christum Dominum nostrum.\nAmen.'),
    ],
  },
  {
    slug: 'antes-de-estudiar',
    title: 'Antes de estudiar',
    summary: 'Creador inefable, que en los tesoros de tu sabiduría…',
    category: 'dia',
    tags: ['estudio', 'trabajo', 'exámenes'],
    author: 'Santo Tomás de Aquino',
    blocks: [
      p('Creador inefable,\nque en los tesoros de tu sabiduría\nhas establecido tres jerarquías de ángeles\ny las has colocado sobre el cielo empíreo\ncon orden admirable,\ny has dispuesto admirablemente\ntodas las partes del universo.'),
      p('Tú, pues, que eres considerado\nverdadera fuente de la luz\ny principio eminentísimo de la sabiduría,\ndígnate infundir un rayo de tu claridad\nen las tinieblas de mi inteligencia,\nalejando de mí las dos clases de tinieblas\ncon las que he nacido:\nla del pecado y la de la ignorancia.'),
      p('Tú, que sueltas las lenguas de los niños,\nprepara mi lengua\ne infunde la gracia de tu bendición en mis labios.'),
      p('Concédeme la agudeza para entender,\nla capacidad para asimilar,\nel modo y la facilidad para aprender,\nla sutileza para interpretar\ny la gracia abundante para hablar.'),
      p('Instruye el comienzo,\ndirige el desarrollo,\ncompleta la conclusión.\nTú, que eres verdadero Dios y hombre,\ny que vives y reinas por los siglos de los siglos.\nAmén.'),
    ],
  },
  {
    slug: 'bendicion-de-la-mesa',
    title: 'Bendición de la mesa',
    summary: 'Bendice, Señor, estos alimentos…',
    category: 'dia',
    tags: ['comida', 'familia', 'acción de gracias'],
    blocks: [
      rubric('Antes de comer'),
      p('Bendice, Señor, estos alimentos\nque vamos a tomar,\nbendice a quienes los han preparado\ny da pan a los que no lo tienen.\nPor Cristo nuestro Señor.\nAmén.'),
      rubric('Después de comer'),
      p('Te damos gracias, Señor,\npor todos tus beneficios,\ntú que vives y reinas\npor los siglos de los siglos.\nAmén.'),
    ],
  },
  {
    slug: 'oracion-de-la-noche',
    title: 'Oración de la noche',
    summary: 'Examen, perdón y descanso en las manos de Dios.',
    category: 'dia',
    tags: ['noche', 'examen', 'dormir'],
    blocks: [
      ref('senal-de-la-cruz'),
      rubric('Examen de conciencia. En silencio, repasa el día.'),
      p('¿Dónde he visto hoy la mano de Dios?\n¿Qué tengo que agradecer?\n¿En qué he fallado a Dios, a los demás o a mí mismo?\n¿Qué quiero hacer mejor mañana?'),
      ref('yo-confieso'),
      p('Jesús, José y María,\nos doy el corazón y el alma mía.\nJesús, José y María,\nasistidme en mi última agonía.\nJesús, José y María,\ncon vosotros descanse en paz el alma mía.'),
      ref('angel-de-la-guarda'),
      p('En tus manos, Señor, encomiendo mi espíritu.\nAmén.'),
    ],
  },
]
