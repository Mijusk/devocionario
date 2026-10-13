import type { Prayer } from '~/types/prayer'
import { p, rubric, ref, pnAmGloria } from '../helpers'

const ofrecimiento = 'Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús,'

const comentarioPromesas =
  'Estas promesas acompañan tradicionalmente a la devoción en estampas y folletos. La Iglesia nunca las ha aprobado oficialmente, así que conviene leerlas con prudencia. La oración en sí es buena y una hermosa meditación de la Pasión.'

const promesas12Anos = {
  comment: comentarioPromesas,
  items: [
    'El alma que las rece no sufrirá el purgatorio.',
    'Será aceptada entre los mártires, como si hubiera derramado su sangre por la fe.',
    'Podrá elegir a otras tres almas, a las que Jesús mantendrá en gracia suficiente para santificarse.',
    'Ninguno de sus familiares de las cuatro generaciones siguientes se perderá.',
    'Sabrá de su muerte un mes antes de que ocurra.',
  ],
  footnote: 'Según la misma tradición, si la persona muere antes de completar los doce años, el Señor lo acepta como cumplido; y si se omite algún día por causa justificada, puede recuperarse después.',
}

const promesas15Oraciones = {
  comment: comentarioPromesas,
  items: [
    'Libraré del purgatorio a quince almas de su linaje.',
    'Quince almas de su linaje serán confirmadas y conservadas en gracia.',
    'Quince pecadores de su linaje se convertirán.',
    'La persona que las rece alcanzará el primer grado de perfección.',
    'Quince días antes de su muerte le daré mi precioso Cuerpo, para que se libre del hambre eterna, y mi preciosa Sangre, para que no tenga sed eternamente.',
    'Quince días antes de su muerte sentirá una profunda contrición de todos sus pecados y tendrá perfecto conocimiento de ellos.',
    'Pondré ante ella la señal de mi Cruz victoriosa, para su socorro y defensa contra sus enemigos.',
    'Antes de su muerte vendré con mi queridísima Madre.',
    'Recibiré benignamente su alma y la conduciré a los gozos eternos.',
    'Allí le daré a beber de la fuente de mi Divinidad.',
    'A quien haya vivido en pecado mortal durante treinta años y rece devotamente estas oraciones, o tenga intención de rezarlas, le perdonaré todos sus pecados.',
    'Le libraré de las malas tentaciones.',
    'Le conservaré y guardaré sus cinco sentidos.',
    'Le libraré de la muerte repentina.',
    'Libraré su alma de las penas eternas.',
    'Obtendrá todo lo que pida a Dios y a la Santísima Virgen.',
    'Si ha vivido haciendo su propia voluntad y hubiera de morir al día siguiente, se le alargará la vida.',
    'Quien las enseñe a otros tendrá un gozo y un mérito que perdurarán eternamente.',
    'Donde se recen estas oraciones, Dios está presente con su gracia.',
  ],
}

export const pasion: Prayer[] = [
  {
    slug: 'santa-brigida-12-anos',
    title: 'Santa Brígida (12 años)',
    summary: 'Siete oraciones diarias sobre las llagas de Cristo.',
    category: 'pasion',
    tags: ['santa brígida', 'llagas', 'sangre de cristo', 'devoción'],
    promises: promesas12Anos,
    tracking: { label: 'Días rezados', goalDays: 365 * 12 },
    steps: [
      {
        title: 'Oración inicial',
        blocks: [
          ref('credo'),
          p('Oh Jesús, ahora deseo rezar la oración del Señor siete veces\njunto con el amor con que Tú santificaste esta oración en tu Corazón.\nTómala de mis labios hasta tu Sagrado Corazón.\nMejórala y complétala para que le brinde tanto honor y felicidad a la Trinidad\nen la tierra como Tú lo garantizaste con esta oración.\nQue esta se derrame sobre tu santa humanidad\npara la glorificación de tus dolorosas heridas\ny la preciosísima Sangre que Tú derramaste de ellas.\nAsí sea.'),
        ],
      },
      {
        title: 'La circuncisión',
        subtitle: 'Primera oración',
        blocks: [
          ...pnAmGloria(),
          p(`${ofrecimiento}\nte ofrezco las primeras heridas, los primeros dolores\ny el primer derramamiento de sangre\ncomo expiación de los pecados de mi infancia y de toda la humanidad,\ncomo protección contra el primer pecado mortal,\nespecialmente entre mis parientes.\nAsí sea.`),
        ],
      },
      {
        title: 'La agonía en el Huerto de los Olivos',
        subtitle: 'Segunda oración',
        blocks: [
          ...pnAmGloria(),
          p(`${ofrecimiento}\nte ofrezco el intenso sufrimiento del Corazón de Jesús\nen el Huerto de los Olivos\ny cada gota de su sudor de sangre\ncomo expiación de mis pecados del corazón y los de toda la humanidad,\ncomo protección contra tales pecados\ny para que se extienda el amor divino y fraterno.\nAsí sea.`),
        ],
      },
      {
        title: 'La flagelación',
        subtitle: 'Tercera oración',
        blocks: [
          ...pnAmGloria(),
          p(`${ofrecimiento}\nte ofrezco las muchas miles de heridas, los terribles dolores\ny la preciosísima sangre de la flagelación\ncomo expiación de mis pecados de la carne y los de toda la humanidad,\ncomo protección contra tales pecados\ny la preservación de la inocencia,\nespecialmente entre mis parientes.\nAsí sea.`),
        ],
      },
      {
        title: 'La coronación de espinas',
        subtitle: 'Cuarta oración',
        blocks: [
          ...pnAmGloria(),
          p(`${ofrecimiento}\nte ofrezco las heridas, los dolores\ny la preciosísima sangre de la sagrada cabeza de Jesús\ntras la coronación de espinas,\ncomo expiación de mis pecados del espíritu y los de toda la humanidad,\ncomo protección contra tales pecados\ny para que se extienda el reino de Cristo aquí en la tierra.\nAsí sea.`),
        ],
      },
      {
        title: 'Cargando la cruz',
        subtitle: 'Quinta oración',
        blocks: [
          ...pnAmGloria(),
          p(`${ofrecimiento}\nte ofrezco los sufrimientos en el camino de la cruz,\nespecialmente la santa herida de su hombro y su preciosísima sangre,\ncomo expiación de mi rechazo de la cruz y el de toda la humanidad,\nde todas mis protestas contra tus planes divinos\ny de todos los demás pecados de palabra,\ncomo protección contra tales pecados\ny para un verdadero amor a la cruz.\nAsí sea.`),
        ],
      },
      {
        title: 'La crucifixión',
        subtitle: 'Sexta oración',
        blocks: [
          ...pnAmGloria(),
          p(`${ofrecimiento}\nte ofrezco a tu Hijo en la cruz, cuando lo clavaron y lo levantaron,\nlas heridas de sus manos y de sus pies\ny los tres hilos de preciosísima sangre que derramó allí por nosotros,\nlas extremas torturas del cuerpo y del alma,\nsu muerte preciosa\ny su renovación incruenta en todas las santas Misas de la tierra,`),
          p('como expiación de todas las faltas contra los votos y las reglas de las órdenes religiosas,\ncomo reparación de mis pecados y los de todo el mundo,\npor los enfermos y moribundos,\npor todos los santos sacerdotes y laicos,\npor las intenciones del Santo Padre,\npor la restauración de las familias cristianas,\npara el fortalecimiento de la fe,\npor nuestro país y por la unión de todas las naciones en Cristo y su Iglesia,\nasí como por la diáspora.\nAsí sea.'),
        ],
      },
      {
        title: 'La llaga del costado',
        subtitle: 'Séptima oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, acepta como dignas,\npor las necesidades de la santa Iglesia\ny como expiación de los pecados de toda la humanidad,\nla preciosísima sangre y el agua\nque manaron de la herida del Sagrado Corazón de Jesús.\nSé misericordioso con nosotros.'),
          p('¡Sangre de Cristo, último contenido precioso de su Sagrado Corazón,\nlávame de todas mis culpas y de las de los demás!\n¡Agua del costado de Cristo,\nlávame totalmente de las penas del pecado\ny extingue las llamas del purgatorio\npara mí y para todas las almas del purgatorio!\nAsí sea.'),
        ],
      },
    ],
  },
  {
    slug: 'quince-oraciones-santa-brigida',
    title: 'Las 15 oraciones de Santa Brígida',
    summary: 'Un año meditando la Pasión, oración a oración.',
    category: 'pasion',
    tags: ['santa brígida', 'pasión', 'devoción', 'un año'],
    promises: promesas15Oraciones,
    tracking: { label: 'Días rezados', goalDays: 365 },
    steps: [
      {
        title: 'Para empezar',
        subtitle: 'Invoquemos al dulce Huésped de nuestras almas',
        blocks: [
          ref('senal-de-la-cruz'),
          ref('ven-espiritu-santo'),
          rubric('Un Credo al Sagrado Corazón de Jesús, haciendo un acto de fe.'),
          ref('credo'),
        ],
      },
      {
        title: 'Primera oración',
        subtitle: 'La Última Cena y el Huerto',
        blocks: [
          p('¡Oh Jesús mío! ¡Oh eterna dulzura para los que te amamos!\n¡Oh gozo supremo que supera todo gozo y deseo!\n¡Oh salvación y esperanza nuestra!\nInfinitas pruebas nos has dado de que tu mayor deseo\nes estar siempre con nosotros;\ny fue este sublime deseo, ¡oh bendito amor!,\nel que te llevó a asumir la naturaleza humana.'),
          p('¡Oh Verbo encarnado!\nRecuerda aquella santa Pasión que abrazaste por nosotros\npara cumplir el divino plan de reconciliación de Dios con su criatura.\nRecuerda, Señor, tu última cena,\ncuando, rodeado de tus discípulos\ny después de haberles lavado los pies,\nles diste tu precioso Cuerpo y Sangre.\nRecuerda también cuando tuviste que consolarlos\nal anunciarles tu ya próxima Pasión.'),
          p('Fue en el Huerto de los Olivos, ¡oh Señor!,\ndonde viviste los peores momentos de tu sagrada Pasión,\nporque fuiste invadido por la más infinita de las tristezas\ny por la más dolorosa de las amarguras,\nque te llevaron a exclamar, lleno de horror y de angustia:\n«¡Mi alma está triste hasta la muerte!».'),
          p('Tres horas duró tu agonía en aquel jardín,\ny el miedo, la angustia y el dolor que padeciste allí\nfueron tan grandes que te hicieron sudar sangre copiosamente.\nAnte tus divinos ojos desfilaron los pecados de todos los tiempos,\ndesde Adán y Eva hasta la consumación de los siglos.'),
          p('Pero, ¡oh amor que todo lo vence!,\na pesar de tu temor humano, así contestaste a tu Padre:\n«¡No se haga mi voluntad, sino la tuya!».\nY enseguida tu Padre envió un ángel para confortarte.\nTres veces oraste, y al final llegó tu discípulo traidor, Judas.\n¡Cuánto te dolió aquello!'),
          p('Fuiste arrestado por el pueblo que Tú mismo habías escogido y exaltado.\nTres jueces te juzgaron, falsos testigos te acusaron,\ncondenando a muerte a su Autor y Redentor,\n¡a aquel que venía a regalarnos la vida eterna!\nTe despojaron de tus vestiduras, te cubrieron los ojos,\nte abofetearon, te escupieron y te golpearon,\ny te retaban a que adivinaras quién te pegaba.'),
          p('Te incrustaron una corona de espinas en la cabeza\ny, para burlarse de tu realeza,\npusieron en tus sagradas manos una vulgar caña por cetro.\nRecuerda también, ¡oh sublime enamorado de nuestras almas!,\ncuando te ataron a la columna y te flagelaron,\nsin que quedara lugar alguno de tu cuerpo sin herida.'),
          p('Oh Jesús mío, en memoria de aquellos crueles tormentos\nque padeciste por nosotros antes de la crucifixión,\nconcédenos antes de morir un verdadero arrepentimiento de nuestros pecados,\nque podamos satisfacer por ellos,\nque hagamos una santa confesión,\nte recibamos en la santísima Eucaristía,\ny así, alimentada nuestra alma, podamos volar hacia Ti.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Segunda oración',
        subtitle: 'Camino del Calvario',
        blocks: [
          p('¡Oh salud y alimento de mi alma,\nlibertad verdadera de ángeles y santos!\n¡Paraíso de delicias!\nRecuerda el horror y la tristeza que sufriste\ncamino del lugar donde te aguardaban una cruz, cuatro clavos y los verdugos,\ncuando aquella turba se apretujaba a tu paso,\nte golpeaba e insultaba impunemente.'),
          p('Pero más te dolía su ingratitud que los golpes,\npues era precisamente por ellos y por todo el género humano\nque llevabas aquella cruz sobre tus hombros destrozados.'),
          p('Por todos aquellos tormentos y ultrajes,\ny por las blasfemias proferidas contra Ti,\nte rogamos, ¡oh dueño de nuestra alma!,\nque nos libres de nuestros enemigos, visibles e invisibles,\ny que, bajo tu protección, alcancemos tal perfección y santidad\nque merezcamos entrar contigo en tu Reino.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Tercera oración',
        subtitle: 'Clavado en la cruz',
        blocks: [
          p('¡Oh dueño de nuestra existencia!\nTú, que siendo el Creador del universo,\ndel cielo y de la tierra, de ángeles y hombres,\na quien nada puede abarcar ni limitar,\ny que todo lo envuelves y sostienes con tu amoroso poder,\nte dejaste matar por tu obra maestra, el hombre,\npara justificarlo ante Ti mismo.'),
          p('Recuerda cada dolor sufrido, cada tormento soportado por nuestro amor,\ncuando con enormes clavos taladraron tus sagradas manos y pies,\ny estiraron tu cuerpo sobre la cruz\npara que alcanzara los agujeros abiertos en el madero.\n¡Oh Varón de dolores!\nRecuerda cuando tus músculos y tendones eran estirados sin misericordia,\ny tus huesos dislocados.'),
          p('¡Oh Cordero divino!,\nen memoria de todo lo ocurrido en el Gólgota,\nte rogamos que nos concedas la gracia\nde amarte y honrarte cada día más y más.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Cuarta oración',
        subtitle: '«Padre, perdónalos»',
        blocks: [
          p('¡Oh divino mártir de amor!\n¡Oh médico celestial, que te dejaste suspender en la cruz\npara que por tus heridas fueran curadas las nuestras!\nRecuerda cada una de aquellas heridas\ny la tremenda debilidad de tus miembros,\nde modo que jamás ha habido dolor semejante al tuyo.'),
          p('Desde la cabeza a los pies eras todo llaga, todo dolor;\ny aun así llegaste, para sorpresa de tus verdugos,\na suplicar a tu Padre el perdón para ellos, diciendo:\n«¡Padre, perdónalos, porque no saben lo que hacen!».'),
          p('¡Oh Cristo bendito!\nEn memoria de esta gran misericordia,\nque superó a tu justicia divina,\nconcédenos una contrición perfecta\ny la remisión total de nuestros pecados,\ndesde el primero hasta el último,\ny que jamás volvamos a ofenderte.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Quinta oración',
        subtitle: 'El buen ladrón',
        blocks: [
          p('¡Oh Jesús, oh esplendor de la eternidad!\nRecuerda cuando contemplaste, en la luz de tu divinidad,\nlas almas de los predestinados\nque serían rescatados por los méritos de tu sagrada Pasión,\ny viste también a quienes se perderían por sus pecados.\nTe compadeciste, oh buen Jesús,\nde aquellos pecadores que no se lavarían con tu sangre\nni se alimentarían con tu Carne eucarística.'),
          p('Por tu infinita compasión y piedad,\ny acordándote de tu promesa al buen ladrón arrepentido,\nal decirle que aquel mismo día estaría contigo en el Paraíso,\n¡oh salud y alimento de nuestra alma!,\nmuéstranos esta misma misericordia en la hora de nuestra muerte.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Sexta oración',
        subtitle: '«He aquí a tu Madre»',
        blocks: [
          p('¡Oh Rey muy amado y deseado por mi corazón!\nAcuérdate del dolor que sufriste\ncuando, desnudo y como un criminal cualquiera,\nfuiste clavado y elevado en la cruz.\nCómo te dolió ver que tus familiares y amigos te abandonaban.\nPero allí estaban tu amadísima Madre y tu discípulo Juan,\nque permanecieron contigo hasta tu último suspiro.'),
          p('Y, para colmo de tu inmenso amor por nosotros,\nnos hiciste aquel precioso regalo:\n¡nos diste a María como Madre!\nSolo tuviste que decir a María: «Mujer, ahí tienes a tu hijo»,\ny a Juan: «Ahí tienes a tu Madre».'),
          p('Te suplicamos, ¡oh Rey de la gloria!,\npor la espada de dolor que entonces atravesó el alma\nde tu santísima e inmaculada Madre,\nque te compadezcas de nosotros en todas nuestras aflicciones,\ncorporales y espirituales,\ny que nos asistas en cada prueba,\nespecialmente en la hora de nuestra muerte.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Séptima oración',
        subtitle: '«Tengo sed»',
        blocks: [
          p('¡Oh Rey de reyes! ¡Fuente de compasión que jamás se agota!\nRecuerda cuando sentiste aquella tremenda sed de almas\nque te llevó a exclamar desde la cruz: «¡Tengo sed!».\nNo solo tenías sed física,\nsino sed insaciable de la salvación del género humano.'),
          p('Por este gesto de amor,\nte rogamos, oh prisionero de nuestro amor,\nque inflames nuestros corazones con el deseo\nde tender siempre a la perfección en todos nuestros actos,\ny que extingas en nosotros la concupiscencia de la carne\ny el deseo de los placeres mundanos.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Octava oración',
        subtitle: 'La hiel y el vinagre',
        blocks: [
          p('¡Oh constante dulzura nuestra!\n¡Oh deleite diario de nuestro espíritu!\nPor el sabor tan amargo de la hiel y el vinagre\nque te dieron a probar en lugar de agua para aplacar tu sed,\nte suplicamos que aplaques nuestra sed de tu Sangre vivificadora\ny nuestra hambre de tu Carne redentora,\nahora y siempre,\ny que no nos falten en la hora de nuestra muerte.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Novena oración',
        subtitle: '«¿Por qué me has abandonado?»',
        blocks: [
          p('¡Oh Jesús, virtud real y gozo del alma!\nAcuérdate del dolor que sentiste,\nsumergido en un océano de amargura, al acercarse la muerte,\ncuando, insultado y ultrajado por tus verdugos,\nclamaste en alta voz:\n«Dios mío, Dios mío, ¿por qué me has abandonado?».'),
          p('Por aquella angustia que padeciste\nen los momentos finales de tu Pasión,\nte rogamos, oh Salvador nuestro,\nque no nos abandones en los terrores y dolores de nuestra muerte.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Décima oración',
        subtitle: 'Un abismo de penas',
        blocks: [
          p('¡Oh Jesús, principio y fin de todo lo creado,\nvirtud, luz y verdad!\nAcuérdate de que por nuestra causa fuiste sumergido en un abismo de penas,\nsufriendo dolor en todo tu santísimo cuerpo.'),
          p('En consideración a tantas llagas como te hicimos los hombres,\nenséñanos a guardar, por puro amor a Ti, todos tus mandamientos,\ncamino amplio y agradable para los que te aman.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Undécima oración',
        subtitle: 'Escóndenos en tus llagas',
        blocks: [
          p('¡Oh Jesús mío, abismo insondable de misericordia!\nTe rogamos, en memoria de tus heridas,\nque penetraron hasta la médula de tus huesos\ny hasta lo más profundo de tu ser,\nque nos apartes para siempre del pecado\ny que no te ofendamos más.'),
          p('Reconocemos que somos pobres pecadores\ny que te hemos ofendido tantas veces.\nNo obstante, acudimos a tu misericordia infinita\npara que nos escondas en tus preciosas llagas\ny tu amante Corazón lave una vez más nuestras culpas\ncon tu Sangre liberadora.\n¡Gracias, Señor!\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Duodécima oración',
        subtitle: 'Todo lo has cumplido',
        blocks: [
          p('¡Oh Jesús, eterna verdad,\nsímbolo de la perfecta caridad y de la unidad!\nTe suplicamos que te acuerdes de aquella multitud de heridas\nque te hicimos los pecadores a quienes querías salvar.\n¡Qué inmenso dolor padeciste en tu carne virginal por amor a nosotros!\n¡Oh dulzura infinita!, ¿qué pudiste hacer que no hayas hecho por nosotros?\nNada falta. Todo lo has cumplido.'),
          p('Ayúdanos, oh Señor, a tener siempre presente\nun fiel recuerdo de tu Pasión,\npara que el fruto de tus sufrimientos se renueve continuamente en nuestra alma\ny tu amor crezca cada día más en nuestro corazón,\nhasta que llegue el feliz día en que te veamos en el cielo\ny seamos uno contigo,\ntesoro y suma de todo gozo y bondad.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Decimotercera oración',
        subtitle: '«Todo está cumplido»',
        blocks: [
          p('¡Oh dulce consuelo de nuestra alma, maravilloso libertador,\nRey inmortal e invencible!\nRecuerda cuando, inclinando tu adorable cabeza,\ndesfigurada por los golpes, la sangre y el polvo del camino,\nexclamaste: «Todo está cumplido»,\ny se agotaron todas tus fuerzas.'),
          p('Por este gran sacrificio\ny por las angustias y tormentos que padeciste antes de morir,\nte rogamos, oh buen Jesús,\nque tengas misericordia de nosotros en la hora de nuestra muerte,\ncuando nuestra mente esté turbada\ny nuestra alma sumergida en inquietudes.\nQue no temamos nada,\nque te tengamos a Ti a nuestro lado y dentro de nuestro ser.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Decimocuarta oración',
        subtitle: '«En tus manos encomiendo mi espíritu»',
        blocks: [
          p('¡Oh doliente Jesús,\nincomprensible Segunda Persona de la Trinidad,\nesplendor e imagen de su esencia!\nRecuerda cuando con gran voz\nentregaste tu alma al Padre diciendo:\n«¡Padre, en tus manos encomiendo mi espíritu!».\nTu cuerpo estaba despedazado y tu corazón destrozado,\npero tus entrañas de misericordia quedaron abiertas para redimirnos.\nAsí expiraste, oh amor infinito.'),
          p('Por tu dolorosa muerte te suplicamos, oh Rey de los santos,\nque nos fortalezcas para resistir al mundo con sus errores,\na Satanás con sus perfidias\ny a la carne con sus vicios,\npara que, muertos a los enemigos de nuestra alma,\nvivamos solamente para Ti.\nY a la hora de nuestra muerte, oh dulce Redentor,\nrecibe nuestras pobres almas desterradas que regresan a Ti.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Decimoquinta oración',
        subtitle: 'La vid verdadera',
        blocks: [
          p('¡Oh vencedor de la muerte! ¡Vid verdadera y fecunda!\nRecuerda aquel torrente de sangre que brotó de tu bendito cuerpo,\ncomo la uva exprimida en el lagar.\nDesde el lugar de la flagelación,\npor las calles de Jerusalén y toda la vía dolorosa,\nhasta el monte santo,\ntu Sangre derramada escribía la historia del Corazón que más nos ama.'),
          p('Toda la naturaleza temblaba y los cielos se estremecían:\n¡todo un Dios moría!\nAquel primer Viernes Santo, oh Jesús,\nabrías el cielo a la humanidad pecadora.\nInclinaste la cabeza y entregaste tu espíritu.\nEntonces el soldado traspasó tu costado con la lanza,\ny de tu Corazón, que tanto nos ama,\nbrotaron sangre y agua hasta la última gota.'),
          p('Por esta amarga Pasión y por la efusión de tu divina Sangre,\nte suplicamos, oh dulcísimo Jesús,\nque recibas nuestra alma en la agonía de nuestra muerte.\nTu infinito sacrificio pagó el rescate,\ny al resucitar y subir glorioso al cielo\ndejaste abiertas las puertas a cuantos quieran seguirte.'),
          p('Oh Señor, traspasa nuestros corazones,\npara que nuestras lágrimas de amor, adoración y penitencia\nsean nuestro alimento día y noche.\nHaz que nos convirtamos totalmente a Ti,\nque nuestros corazones sean tu morada perpetua,\nque nuestra conversación te sea siempre agradable,\ny que al final de nuestra vida merezcamos que imprimas en nuestra alma\nel sello de tu divinidad,\npara alabarte con tus santos por toda la eternidad.\nAmén.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Oración final',
        blocks: [
          p('¡Oh dulce Jesús!\nHerid mi corazón,\na fin de que mis lágrimas de amor y penitencia\nme sirvan de pan día y noche.\nConvertidme enteramente a Vos, oh mi Señor.\nHaced que mi corazón sea vuestra habitación perpetua\ny que mi conversación os sea agradable.\nQue el fin de mi vida os sea de tal suerte loable\nque, después de mi muerte, pueda merecer vuestro paraíso\ny alabaros para siempre en el cielo con todos vuestros santos.\nAmén.'),
          rubric('Tres veces:'),
          p('Sea por siempre bendito y alabado Jesús,\nque con su Sangre nos redimió.'),
          p('Sea por siempre bendito y alabado Jesús,\nque con su Sangre nos redimió.'),
          p('Sea por siempre bendito y alabado Jesús,\nque con su Sangre nos redimió.'),
        ],
      },
    ],
  },
  {
    slug: 'coronilla-divina-misericordia',
    title: 'Coronilla de la Divina Misericordia',
    summary: 'Con un rosario, a las tres de la tarde.',
    category: 'pasion',
    tags: ['misericordia', 'santa faustina', 'tres de la tarde'],
    author: 'Santa Faustina Kowalska',
    note: 'Se reza con las cuentas del Rosario, de forma especial a las tres de la tarde, la hora de la muerte de Jesús.',
    steps: [
      {
        title: 'Inicio',
        blocks: [
          ref('senal-de-la-cruz'),
          p('Expiraste, Jesús, pero la fuente de vida brotó para las almas\ny se abrió el mar de misericordia para el mundo entero.\nOh Sangre y Agua que brotaste del Corazón de Jesús\ncomo fuente de misericordia para nosotros,\nen Ti confío.'),
          ref('padre-nuestro'),
          ref('avemaria'),
          ref('credo'),
        ],
      },
      ...[1, 2, 3, 4, 5].map((n) => ({
        title: `Decena ${n}`,
        subtitle: 'En la cuenta grande',
        blocks: [
          p('Padre Eterno, te ofrezco el Cuerpo y la Sangre,\nel Alma y la Divinidad de tu amadísimo Hijo,\nnuestro Señor Jesucristo,\ncomo propiciación de nuestros pecados\ny los del mundo entero.'),
          rubric('En cada cuenta pequeña:'),
        ],
        count: 10,
        countText: 'Por su dolorosa Pasión,\nten misericordia de nosotros\ny del mundo entero.',
      })),
      {
        title: 'Para terminar',
        subtitle: 'Tres veces',
        blocks: [],
        count: 3,
        countText: 'Santo Dios, Santo Fuerte, Santo Inmortal,\nten piedad de nosotros\ny del mundo entero.',
      },
      {
        title: 'Jesús, en Ti confío',
        blocks: [
          p('Oh Sangre y Agua que brotaste del Corazón de Jesús\ncomo fuente de misericordia para nosotros,\nen Ti confío.'),
          p('Jesús, en Ti confío.'),
        ],
      },
    ],
  },
  {
    slug: 'alma-de-cristo',
    title: 'Alma de Cristo',
    summary: 'Alma de Cristo, santifícame…',
    category: 'pasion',
    tags: ['comunión', 'eucaristía', 'acción de gracias'],
    note: 'Muy querida por san Ignacio de Loyola, que la puso al comienzo de sus Ejercicios. Ideal tras la comunión.',
    blocks: [
      p('Alma de Cristo, santifícame.\nCuerpo de Cristo, sálvame.\nSangre de Cristo, embriágame.\nAgua del costado de Cristo, lávame.\nPasión de Cristo, confórtame.\n¡Oh buen Jesús, óyeme!\nDentro de tus llagas, escóndeme.\nNo permitas que me aparte de Ti.\nDel maligno enemigo, defiéndeme.\nEn la hora de mi muerte, llámame,\ny mándame ir a Ti,\npara que con tus santos te alabe\npor los siglos de los siglos.\nAmén.'),
    ],
    latin: [
      p('Anima Christi, sanctifica me.\nCorpus Christi, salva me.\nSanguis Christi, inebria me.\nAqua lateris Christi, lava me.\nPassio Christi, conforta me.\nO bone Iesu, exaudi me.\nIntra tua vulnera absconde me.\nNe permittas me separari a te.\nAb hoste maligno defende me.\nIn hora mortis meae voca me,\net iube me venire ad te,\nut cum Sanctis tuis laudem te\nin saecula saeculorum.\nAmen.'),
    ],
  },
]
