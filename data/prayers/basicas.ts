import type { Prayer } from '~/types/prayer'
import { p, vr } from '../helpers'

export const basicas: Prayer[] = [
  {
    slug: 'senal-de-la-cruz',
    title: 'Señal de la Cruz',
    summary: 'Por la señal de la santa cruz…',
    category: 'basicas',
    blocks: [
      p('Por la señal de la santa cruz,\nde nuestros enemigos\nlíbranos, Señor, Dios nuestro.\nEn el nombre del Padre,\ny del Hijo,\ny del Espíritu Santo.\nAmén.'),
    ],
  },
  {
    slug: 'padre-nuestro',
    title: 'Padre Nuestro',
    summary: 'La oración que nos enseñó el Señor.',
    category: 'basicas',
    note: 'Mt 6, 9-13',
    blocks: [
      p('Padre nuestro, que estás en el cielo,\nsantificado sea tu Nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad\nen la tierra como en el cielo.'),
      p('Danos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros perdonamos\na los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén.'),
    ],
    latin: [
      p('Pater noster, qui es in caelis,\nsanctificetur nomen tuum.\nAdveniat regnum tuum.\nFiat voluntas tua,\nsicut in caelo et in terra.'),
      p('Panem nostrum quotidianum da nobis hodie,\net dimitte nobis debita nostra,\nsicut et nos dimittimus debitoribus nostris.\nEt ne nos inducas in tentationem,\nsed libera nos a malo.\nAmen.'),
    ],
  },
  {
    slug: 'avemaria',
    title: 'Avemaría',
    summary: 'Dios te salve, María, llena eres de gracia…',
    category: 'basicas',
    blocks: [
      p('Dios te salve, María,\nllena eres de gracia;\nel Señor es contigo.\nBendita tú eres entre todas las mujeres,\ny bendito es el fruto de tu vientre, Jesús.'),
      p('Santa María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén.'),
    ],
    latin: [
      p('Ave Maria, gratia plena,\nDominus tecum.\nBenedicta tu in mulieribus,\net benedictus fructus ventris tui, Iesus.'),
      p('Sancta Maria, Mater Dei,\nora pro nobis peccatoribus,\nnunc et in hora mortis nostrae.\nAmen.'),
    ],
  },
  {
    slug: 'gloria',
    title: 'Gloria',
    summary: 'Gloria al Padre, y al Hijo, y al Espíritu Santo…',
    category: 'basicas',
    blocks: [
      p('Gloria al Padre,\ny al Hijo,\ny al Espíritu Santo.\nComo era en el principio,\nahora y siempre,\npor los siglos de los siglos.\nAmén.'),
    ],
    latin: [
      p('Gloria Patri,\net Filio,\net Spiritui Sancto.\nSicut erat in principio,\net nunc et semper,\net in saecula saeculorum.\nAmen.'),
    ],
  },
  {
    slug: 'credo',
    title: 'Credo de los Apóstoles',
    summary: 'Creo en Dios, Padre todopoderoso…',
    category: 'basicas',
    tags: ['fe', 'símbolo'],
    blocks: [
      p('Creo en Dios, Padre todopoderoso,\nCreador del cielo y de la tierra.'),
      p('Creo en Jesucristo, su único Hijo, nuestro Señor,\nque fue concebido por obra y gracia del Espíritu Santo,\nnació de Santa María Virgen,\npadeció bajo el poder de Poncio Pilato,\nfue crucificado, muerto y sepultado,\ndescendió a los infiernos,\nal tercer día resucitó de entre los muertos,\nsubió a los cielos\ny está sentado a la derecha de Dios, Padre todopoderoso.\nDesde allí ha de venir a juzgar a vivos y muertos.'),
      p('Creo en el Espíritu Santo,\nla santa Iglesia católica,\nla comunión de los santos,\nel perdón de los pecados,\nla resurrección de la carne\ny la vida eterna.\nAmén.'),
    ],
  },
  {
    slug: 'credo-niceno',
    title: 'Credo Niceno-Constantinopolitano',
    summary: 'Creo en un solo Dios, Padre todopoderoso…',
    category: 'basicas',
    tags: ['fe', 'símbolo', 'misa'],
    note: 'El Credo que se profesa en la Misa del domingo.',
    blocks: [
      p('Creo en un solo Dios,\nPadre todopoderoso,\nCreador del cielo y de la tierra,\nde todo lo visible y lo invisible.'),
      p('Creo en un solo Señor, Jesucristo,\nHijo único de Dios,\nnacido del Padre antes de todos los siglos:\nDios de Dios, Luz de Luz,\nDios verdadero de Dios verdadero,\nengendrado, no creado,\nde la misma naturaleza del Padre,\npor quien todo fue hecho;\nque por nosotros, los hombres,\ny por nuestra salvación bajó del cielo,\ny por obra del Espíritu Santo\nse encarnó de María, la Virgen,\ny se hizo hombre;\ny por nuestra causa fue crucificado\nen tiempos de Poncio Pilato;\npadeció y fue sepultado,\ny resucitó al tercer día, según las Escrituras,\ny subió al cielo,\ny está sentado a la derecha del Padre;\ny de nuevo vendrá con gloria\npara juzgar a vivos y muertos,\ny su reino no tendrá fin.'),
      p('Creo en el Espíritu Santo,\nSeñor y dador de vida,\nque procede del Padre y del Hijo,\nque con el Padre y el Hijo\nrecibe una misma adoración y gloria,\ny que habló por los profetas.'),
      p('Creo en la Iglesia,\nque es una, santa, católica y apostólica.\nConfieso que hay un solo bautismo\npara el perdón de los pecados.\nEspero la resurrección de los muertos\ny la vida del mundo futuro.\nAmén.'),
    ],
  },
  {
    slug: 'salve',
    title: 'Salve',
    summary: 'Dios te salve, Reina y Madre de misericordia…',
    category: 'basicas',
    tags: ['virgen', 'maría', 'rosario'],
    blocks: [
      p('Dios te salve, Reina y Madre de misericordia,\nvida, dulzura y esperanza nuestra;\nDios te salve.\nA ti llamamos los desterrados hijos de Eva;\na ti suspiramos, gimiendo y llorando,\nen este valle de lágrimas.'),
      p('Ea, pues, Señora, abogada nuestra,\nvuelve a nosotros esos tus ojos misericordiosos;\ny después de este destierro\nmuéstranos a Jesús,\nfruto bendito de tu vientre.\n¡Oh clementísima, oh piadosa,\noh dulce Virgen María!'),
      vr('Ruega por nosotros, santa Madre de Dios.', 'Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén.'),
    ],
    latin: [
      p('Salve, Regina, Mater misericordiae,\nvita, dulcedo, et spes nostra, salve.\nAd te clamamus, exsules filii Hevae.\nAd te suspiramus, gementes et flentes\nin hac lacrimarum valle.'),
      p('Eia, ergo, advocata nostra,\nillos tuos misericordes oculos ad nos converte.\nEt Iesum, benedictum fructum ventris tui,\nnobis post hoc exsilium ostende.\nO clemens, O pia, O dulcis Virgo Maria.'),
    ],
  },
  {
    slug: 'yo-confieso',
    title: 'Yo confieso',
    summary: 'Yo confieso ante Dios todopoderoso…',
    category: 'basicas',
    tags: ['perdón', 'confesión', 'misa'],
    blocks: [
      p('Yo confieso ante Dios todopoderoso\ny ante vosotros, hermanos,\nque he pecado mucho\nde pensamiento, palabra, obra y omisión.\nPor mi culpa, por mi culpa, por mi gran culpa.'),
      p('Por eso ruego a santa María, siempre Virgen,\na los ángeles, a los santos\ny a vosotros, hermanos,\nque intercedáis por mí ante Dios, nuestro Señor.\nAmén.'),
    ],
  },
  {
    slug: 'acto-de-contricion',
    title: 'Acto de contrición',
    summary: 'Señor mío Jesucristo, Dios y Hombre verdadero…',
    category: 'basicas',
    tags: ['perdón', 'confesión'],
    blocks: [
      p('Señor mío Jesucristo,\nDios y Hombre verdadero,\nCreador, Padre y Redentor mío;\npor ser Vos quien sois, bondad infinita,\ny porque os amo sobre todas las cosas,\nme pesa de todo corazón haberos ofendido;\ntambién me pesa porque podéis castigarme\ncon las penas del infierno.'),
      p('Ayudado de vuestra divina gracia,\npropongo firmemente nunca más pecar,\nconfesarme y cumplir la penitencia\nque me fuere impuesta.\nAmén.'),
    ],
  },
  {
    slug: 'angel-de-la-guarda',
    title: 'Ángel de la guarda',
    summary: 'Ángel de mi guarda, dulce compañía…',
    category: 'basicas',
    tags: ['niños', 'noche'],
    blocks: [
      p('Ángel de mi guarda,\ndulce compañía,\nno me desampares\nni de noche ni de día.\nNo me dejes solo,\nque me perdería.\nAmén.'),
    ],
  },
  {
    slug: 'jaculatoria-fatima',
    title: 'Jaculatoria de Fátima',
    summary: 'Oh Jesús mío, perdona nuestros pecados…',
    category: 'basicas',
    tags: ['rosario', 'fátima'],
    note: 'Se reza tras el Gloria de cada misterio del Rosario.',
    blocks: [
      p('Oh Jesús mío,\nperdona nuestros pecados,\nlíbranos del fuego del infierno,\nlleva al cielo a todas las almas\ny socorre especialmente\na las más necesitadas de tu misericordia.'),
    ],
  },
  {
    slug: 'descanso-eterno',
    title: 'Por los difuntos',
    summary: 'Dales, Señor, el descanso eterno…',
    category: 'basicas',
    tags: ['difuntos', 'muerte'],
    blocks: [
      vr('Dales, Señor, el descanso eterno.', 'Y brille para ellos la luz perpetua.'),
      vr('Descansen en paz.', 'Amén.'),
      p('Que su alma y las almas de todos los fieles difuntos,\npor la misericordia de Dios,\ndescansen en paz.\nAmén.'),
    ],
    latin: [
      vr('Requiem aeternam dona eis, Domine.', 'Et lux perpetua luceat eis.'),
      vr('Requiescant in pace.', 'Amen.'),
    ],
  },
]
