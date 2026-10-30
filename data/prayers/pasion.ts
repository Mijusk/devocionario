import type { Prayer } from '~/types/prayer'
import { p, rubric, ref, pnAmGloria } from '../helpers'

const comentarioPromesas =
  'Estas promesas acompañan tradicionalmente a la devoción en estampas y folletos. La Iglesia nunca las ha aprobado oficialmente, así que conviene leerlas con prudencia. La oración en sí es buena y una hermosa meditación de la Pasión.'

// Texto literal de ACI Prensa («Oraciones de Santa Brígida por 12 años»).
const promesas12Anos = {
  comment: comentarioPromesas,
  items: [
    'El alma que las reza no sufrirá ningún Purgatorio.',
    'El alma que las reza será aceptada entre los mártires como si hubiera derramado su propia sangre por la fe.',
    'El alma que las reza puede (debe) elegir a otros tres a quienes Jesús mantendrá luego en un estado de gracia suficiente para que se santifiquen. (*)',
    'Ninguna de las cuatro generaciones siguientes al alma que las reza se perderá.',
    'El alma que las reza será consciente de su muerte un mes antes de que ocurra.',
  ],
  footnote: '(*) Escribir los tres nombres (personas vivas) en un papel y guardarlo. Los nombres no se pueden cambiar.',
}

// Texto literal de ACI Prensa.
const promesas15Oraciones = {
  comment: `${comentarioPromesas}\n\nEl Crucificado prometió a Santa Brígida los siguientes privilegios, con la condición de que ella fuera fiel a la diaria recitación del Oficio Divino. Y se garantizaban también a todo aquel que diga las oraciones devotamente cada día por el espacio de un año, las siguientes promesas:`,
  items: [
    'Cualquiera que recite estas oraciones, obtendrá el grado máximo de perfección.',
    'Quince días antes de su muerte, tendrá un conocimiento perfecto de todos sus pecados y una contrición profunda de ellos.',
    'Quince días antes de su muerte le daré mi precioso cuerpo a fin de que escape del hambre eterna; le daré a beber de mi preciosa sangre para que no permanezca sediento eternamente.',
    'Libraré del purgatorio a 15 miembros de su familia (algunas pueden ser del pasado, otras del presente y también del futuro)',
    'Quince miembros de su familia serán confirmados y preservados en gracia. (lo mismo)',
    'Quince miembros de su familia se convertirán. (lo mismo)',
    'Cualquiera que haya vivido en estado de pecado mortal por 30 años, pero si recita o tiene la intención de recitar estas oraciones devotamente, Yo, el Señor le perdonaré todos sus pecados.',
    'Si ha vivido haciendo su propia voluntad durante toda su vida y está por morir (sin que la persona tenga el conocimiento que está por morir próximamente), prolongaré su existencia para que se confiese bien (confesión de vida)',
    'Obtendrá todo lo que pida a Dios y a la Santísima Virgen.',
    'En cualquier parte donde esté diciendo las oraciones, o donde se digan, Dios estará presente con su gracia.',
    'Todo aquel que enseñe estas oraciones a los demás, ganará incalculables méritos y su gloria será mayor en el cielo.',
    'Por cada vez que se reciten estas oraciones, se ganarán 100 días de indulgencia.',
    'Será liberado de la muerte eterna. (no se condenará)',
    'Goza de la promesa de que será contado entre los bienaventurados del cielo.',
    'Lo defenderé contra las tentaciones del mal.',
    'Preservaré y guardaré sus cinco sentidos.',
    'Lo preservaré de una muerte repentina.',
    'Yo colocaré mi cruz victoriosa ante él para que venza a sus enemigos. (Satanás y sus huestes)',
    'Antes de su muerte vendré con mi amada Madre, la Santísima Virgen Inmaculada.',
    'Lo recibiré muy complacido y lo conduciré a los gozos eternos. Y habiéndolo llevado allí, le daré de beber de la fuente de mi divinidad ; cosa que no haré con los que no hayan recitado Mis oraciones.',
    'Se le asegura que será colocado junto al Supremo Coro de los Santo Ángeles.',
  ],
}

export const pasion: Prayer[] = [
  {
    slug: 'santa-brigida-12-anos',
    // Texto literal de ACI Prensa.
    title: 'Oraciones de Santa Brígida por 12 años',
    summary: 'Siete oraciones diarias sobre las llagas de Cristo.',
    category: 'pasion',
    tags: ['santa brígida', 'llagas', 'sangre de cristo', 'devoción', '12 años'],
    promises: promesas12Anos,
    tracking: { label: 'Días rezados', goalDays: 365 * 12 },
    steps: [
      {
        title: 'Oración inicial',
        blocks: [
          p('Oh Jesús, ahora deseo rezar la oración del Señor siete veces junto con el amor con que Tú santificaste esta oración en Tu Corazón. Tómala de mis labios hasta Tu Sagrado Corazón. Mejórala y complétala para que le brinde tanto honor y felicidad a la Trinidad en la tierra como Tú lo garantizaste con esta oración. Que esta se derrame sobre Tu santa humanidad para la glorificación de Tus dolorosas heridas y la preciosísima Sangre que Tú derramaste de ellas. Amén'),
        ],
      },
      {
        title: 'La circuncisión',
        subtitle: 'Primera oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús, Te ofrezco las primeras heridas, los primeros dolores y el primer derrame de Sangre como expiación de los pecados de mi infancia y de toda la humanidad, como protección contra el primer pecado mortal, especialmente entre mis parientes.'),
        ],
      },
      {
        title: 'La agonía de Jesús en el Huerto de los Olivos',
        subtitle: 'Segunda oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús, te ofrezco el intenso sufrimiento del Corazón de Jesús en el Huerto de los Olivos y cada gota de sudor de sangre como expiación de mis pecados del corazón y los de toda la humanidad, como protección contra tales pecados y para que se extienda el amor divino y fraterno.'),
        ],
      },
      {
        title: 'La flagelación',
        subtitle: 'Tercera oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús, te ofrezco las muchas miles de heridas, los terribles dolores y la preciosísima sangre de la flagelación como expiación de mis pecados de la carne y los de toda la humanidad, como protección contra tales pecados y la preservación de la inocencia, especialmente entre mis parientes.'),
        ],
      },
      {
        title: 'La coronación de espinas',
        subtitle: 'Cuarta oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús, te ofrezco las heridas, los dolores y la preciosísima sangre de la sagrada cabeza de Jesús luego de la coronación de espinas, como expiación de mis pecados del espíritu y los de toda la humanidad, como protección contra tales pecados y para que se extienda el reino de Cristo aquí en la tierra.'),
        ],
      },
      {
        title: 'Cargando la cruz',
        subtitle: 'Quinta oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús, te ofrezco los sufrimientos en el camino a la cruz, especialmente la santa herida en su hombro y la preciosísima sangre como expiación de mi negación de la cruz y la de toda la humanidad, todas mis protestas contra tus planes divinos y todos los demás pecados de palabra, como protección contra tales pecados y para un verdadero amor a la cruz.'),
        ],
      },
      {
        title: 'La crucifixión de Jesús',
        subtitle: 'Sexta oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, por medio de las manos inmaculadas de María y el Sagrado Corazón de Jesús, te ofrezco a Tu Hijo en la cruz, cuando lo clavaron y lo levantaron, las heridas en sus manos y en sus pies y los tres hilos de la preciosísima sangre que derramó allí por nosotros, las extremas torturas del cuerpo y del alma, su muerte preciosa y su renovación no sangrienta en todas las santas misas de la Tierra, como expiación de todas las heridas contra los votos y normas dentro de las Órdenes, como reparación de mis pecados y los de todo el mundo, por los enfermos y moribundos, por todos los santos sacerdotes y laicos, por las intenciones del Santo Padre por la restauración de las familias cristianas, para el fortalecimiento de la Fe, por nuestro país y por la unión de todas las naciones en Cristo y su Iglesia, así como también por la diáspora.'),
        ],
      },
      {
        title: 'La llaga del costado de Jesús',
        subtitle: 'Séptima oración',
        blocks: [
          ...pnAmGloria(),
          p('Padre Eterno, acepta como dignas, por las necesidades de la Santa Iglesia y como expiación de los pecados de toda la humanidad, la preciosísima sangre y el agua que manó de la herida del Sagrado Corazón de Jesús. Sé misericordioso para con nosotros. ¡Sangre de Cristo, el último contenido precioso de su Sagrado Corazón, lávame de todas mis culpas de pecado y las de los demás! ¡Agua del costado de Cristo; lávame totalmente de las penitencias del pecado y extingue las llamas del Purgatorio para mí y para todas las almas del Purgatorio! Amén.'),
        ],
      },
    ],
  },
  {
    slug: 'quince-oraciones-santa-brigida',
    // Texto literal de ACI Prensa («Las quince oraciones de Santa Brígida por un año»).
    title: 'Las quince oraciones de Santa Brígida por un año',
    summary: 'Un año meditando la Pasión, oración a oración.',
    category: 'pasion',
    tags: ['santa brígida', 'pasión', 'devoción', 'un año', '15 oraciones'],
    note: 'Recomendaciones:\n\n1.- Rezar antes del atardecer, si lo dejas para más tarde, luego puedes estar muy cansado por las tareas del día y es fácil que te olvides de rezar o te quedes dormido.\n\n2.- El rezo de las oraciones insume unos veinticinco minutos, cuanto más compenetrado espiritualmente, menos tiempo lleva.\n\n3.- Se rezan las quince oraciones cada día, no una oración cada día.\n\n4.- En caso de enfermedad grave, puede rezarla otra persona al lado de la cama y el enfermo deberá ir repitiendo mentalmente. Solamente mientras se encuentre gravemente enfermo.\n\n5.- Se reza ante un Crucifijo, en su defecto frente a una estampa de Jesús o con la mente puesta en su Divino Rostro y en sus Santas Llagas.',
    promises: promesas15Oraciones,
    tracking: { label: 'Días rezados', goalDays: 365 },
    steps: [
      {
        title: 'Para empezar',
        blocks: [
          p('Para empezar, invoquemos al Dulce Huésped de nuestras almas.'),
          ref('senal-de-la-cruz'),
          p('Ven Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego eterno de tu amor. Envía Señor tu Espíritu y todo será creado y se renovará la faz de la tierra.'),
          rubric('Oremos:'),
          p('Oh Dios, que instruiste los corazones de tus fieles con la luz de tu Espíritu Santo, concédenos que animados y guiados por este mismo Espíritu, aprendamos a obrar rectamente siempre y gocemos de la dulzura del bien de sus divinos consuelos. Por Cristo nuestro Señor. Así sea.'),
          rubric('Un Credo al Sagrado Corazón de Jesús, haciendo un acto de Fe.'),
          ref('credo'),
        ],
      },
      {
        title: 'Primera oración',
        blocks: [
          p('¡Oh Jesús mío! ¡Oh eterna dulzura para los que te amamos! ¡Oh gozo supremo que supera todo gozo y deseo! ¡Oh salvación y esperanza nuestra! Infinitas pruebas nos has dado de que tu mayor deseo es estar siempre con nosotros; y fue este sublime deseo, ¡Oh bendito amor! El que te llevó a asumir la naturaleza humana. ¡Oh Verbo Encarnado!, recuerda aquella Santa Pasión que abrazaste por nosotros, para cumplir con el divino plan de reconciliación de Dios con su criatura. Recuerda Señor tu última cena, cuando rodeado de tus discípulos, y después de haberles lavado los pies, les diste tu precioso cuerpo y sangre. Recuerda también cuando tuviste que consolarlos al anunciarles tu ya próxima Pasión.'),
          p('Fue en el huerto de los Olivos, ¡Oh Señor!, donde se escenificaron los peores momentos de tu Sagrada Pasión: porque fuiste invadido por la más infinita de las tristezas y por la más dolorosa de las amarguras, y que te llevaron a exclamar todo lleno de horror y de angustia: "¡Mi alma está triste hasta la muerte!"... Tres horas duró tu agonía en aquel jardín; y todo el miedo, angustia y dolor que padeciste allí, ¡fueron tan grandes!, que te causó sudar sangre copiosamente. Aquello escapaba a toda descripción, hasta tal punto que sufriste más allí que en el resto de tu Pasión, porque ante tus divinos ojos desfilaron aquellas terribles visiones de los pecados que se cometieron desde Adán y Eva hasta aquellos mismos instantes, y los pecados que se estaban cometiendo en aquellos momentos por toda la faz de la tierra, y los que se cometerían en el futuro, ¡siglos enteros!, ¡hasta la consumación de los tiempos!'),
          p('Pero, ¡Oh amor que todo lo vence! A pesar de tu temor humano, así contestaste a tu Padre: "¡No se haga mi voluntad, sino la tuya!" E inmediatamente, tu Padre envió aquel precioso Ángel para confortarte... Tres veces oraste, y al final llegó tu discípulo traidor, Judas. ¡Cuánto te dolió aquello!'),
          p('Fuiste arrestado por el pueblo de aquella nación que Tú mismo habías escogido y exaltado. Tres jueces te juzgaron, falsos testigos te acusaron, cometiendo el acto más injusto de la historia de la humanidad, ¡condenando a muerte a su Autor y Redentor! ¡A aquél que venía a regalarnos la vida eterna!'),
          p('Y te despojaron de tus vestiduras y te cubrieron los ojos... e inmediatamente aquellos soldados romanos comenzaron a abofetearte, y llenarte de salivazos, y golpes llovieron contra tu delicado cuerpo. Y te retaban a que les dijeras quién era el que te lo hacía. De repente, aquella corona de espinas te la incrustaron mutilando tu cabeza de mala manera; ¡rompiendo carne, venas y nervios! Para contemplar la mofa a tu condición de Rey, te dieron un cetro: una vulgar caña que colocaron en tus sagradas manos.'),
          p('¡Oh sublime enamorado de nuestras almas!, recuerda también cuando te ataron a la columna. ¡Cómo te flageló aquella gente!... No quedó lugar alguno en tu maravilloso cuerpo que no quedara destrozado bajo los golpes de los látigos. Otro cuerpo humano hubiese muerto con menos golpes... La escena era terrible: ¡huesos y costillas podían verse! ¡Cuánta furia desatada contra el Hombre-Dios!'),
          p('Oh Jesús mío, en memoria de aquellos crueles tormentos que padeciste por nosotros antes de la crucifixión, concédenos antes de morir un verdadero arrepentimiento de nuestros pecados, que podamos satisfacer por ellos, que hagamos una santa confesión, te recibamos en la Santísima Eucaristía, y así, alimentada nuestra alma, podamos volar hacia Ti.'),
          p('Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Segunda oración',
        blocks: [
          p('¡Oh salud y alimento de mi alma, libertad verdadera de ángeles y santos!, ¡Paraíso de delicias! Recuerda el horror y la tristeza que sufriste camino al lugar donde te aguardaba una cruz, cuatro clavos y los verdugos cuando toda aquella turba se apretujaba a tu paso, y te golpeaba e insultaba impunemente, haciéndote víctima de las más espantosas crueldades. Pero más te dolía la ingratitud de ellos, que los golpes que te infligían, pues era precisamente por ellos y por todo el género humano, que llevabas aquella Cruz sobre tus hombros destrozados.'),
          p('Por todos aquellos tormentos y ultrajes, y por las blasfemias proferidas en contra de Ti, te rogamos, ¡Oh dueño de nuestra alma! que nos libres de nuestros enemigos, visibles e invisibles, y que bajo tu protección logremos tal perfección y santidad, que merezcamos entrar contigo en tu Reino. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Tercera oración',
        blocks: [
          p('¡Oh dueño de nuestra existencia! Tú que siendo el Creador del Universo, del Cielo y de la Tierra, de ángeles y hombres, a quien nada puede abarcar ni limitar y que todo lo envuelves y sostienes con tu amoroso poder, sin embargo, te dejaste matar por tu obra maestra, el hombre, para justificarlo ante Ti mismo.'),
          p('Recuerda cada dolor sufrido, cada tormento soportado por nuestro amor, cuando los judíos con enormes clavos taladraron tus sagradas manos y pies. ¡Que espantosa escena se produjo cuando con indescriptible crueldad, tu cuerpo tuvo que ser estirado sobre la Cruz para que tus manos y pies llegaran hasta los agujeros previamente abiertos en el madero! ¡Con cuánta furia agrandaron aquellas heridas! ¡Cómo agregaron dolor al dolor, cuando tuvieron que estirar tus sagrados miembros violentamente en todas direcciones! ¡Oh Varón de dolores!'),
          p('Recuerda cuando tus músculos y tendones eran estirados sin misericordia, y tus venas se rompían, y tu piel virginal se desgarraba horriblemente, y tus huesos eran dislocados.'),
          p('¡Oh Cordero Divino! en memoria de todo lo ocurrido en la colina del Gólgota, te rogamos nos concedas la gracia de amarte y honrarte cada día más y más. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Cuarta oración',
        blocks: [
          p('¡Oh divino mártir de amor! ¡Oh médico celestial que te dejaste suspender en la Cruz para que por tus heridas las nuestras fueron curadas! Recuerda cada una de aquellas heridas y la tremenda debilidad de tus miembros, que fueron distendidos hasta tal punto que jamás ha habido dolor semejante al tuyo. Desde la cabeza a los pies eras todo llaga, todo dolor, todo sufrías; eras una masa rota y sanguinolenta, y aún así llegaste, para sorpresa de tus verdugos, a suplicar a tu Padre, eterno perdón para ellos diciéndole: ¡Padre, perdónalos porque no saben lo que hacen!'),
          p('¡Oh Cristo bendito! En memoria de esta gran misericordia que tuviste, que muy bien pudiste lanzar a todo aquel mundo malvado a los abismos infernales con un solo acto de tu poderosa voluntad, por aquella tan grande misericordia que superó a tu justicia divina, concédenos una contrición perfecta y la remisión total de nuestros pecados, desde el primero hasta el último, y que jamás volvamos a ofenderte. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Quinta oración',
        blocks: [
          p('¡Oh Jesús, Oh esplendor de la eternidad! Recuerda cuando contemplaste en la Luz de tu Divinidad, las almas de los predestinados que serían rescatados por los méritos de tu Sagrada Pasión, también viste aquella tremenda multitud que sería condenada por sus pecados. ¡Cuánto te quejaste por ellos! Te compadeciste, oh buen Jesús, hasta de aquellos réprobos, de aquellos desafortunados pecadores que no se lavarían con tu sangre, ni se alimentarían con tu Carne Eucarística.'),
          p('Por tu infinita compasión y piedad, y acordándote de tu promesa al buen ladrón arrepentido, al decirle que aquel mismo día estaría contigo en el Paraíso, ¡Oh salud y alimento de nuestra alma! muéstranos esta misma misericordia en la hora de nuestra muerte. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Sexta oración',
        blocks: [
          p('¡Oh Rey muy amado y deseado por mi corazón ¡ acordaos del dolor que sufriste, cuando desnudo y como un criminal común y corriente, fuiste clavado y elevado en la Cruz. Cómo te dolió el ver que tus familiares y amigos desertaran. Pero allí estaba tu muy amada Madre y tu discípulo Juan, que permanecieron contigo hasta tu último suspiro. No importando que su naturaleza humana, desmayando estaba, y para colmo de tu inmenso amor por nosotros, nos hiciste aquel precioso regalo: ¡nos diste a María como Madre! ¡Cuánto te debemos Salvador nuestro, por este sublime regalo! Sólo tuviste que decir a María: “¡Mujer, he aquí a tu hijo!” y a Juan: “!He aquí a tu Madre!”'),
          p('¡Te suplicamos, oh Rey de la Gloria! por la espada de dolor que entonces atravesó el alma de tu Santísima e Inmaculada Madre, que te compadezcas de nosotros en todas nuestras aflicciones y tribulaciones tanto corporal como espiritual, y que nos asistas en cada prueba, especialmente en la hora de nuestra muerte. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Séptima oración',
        blocks: [
          p('¡Oh Rey de Reyes! ¡Fuente de compasión que jamás se agota! Recuerda cuando sentiste aquella tremenda sed por las almas y que te llevó a exclamar desde la Cruz: "¡Tengo Sed!" Sí, no solamente tenías sed física, sino sed insaciable por la salvación de la raza humana.'),
          p('Por este gesto de amor por nosotros, te rogamos, oh prisionero de nuestro amor, que inflames nuestros corazones con el deseo de tender siempre hacia la perfección en todos nuestros actos, que extingas en nosotros la concupiscencia de la carne y los deseos de placeres mundanos. Así sea'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Octava oración',
        blocks: [
          p('¡Oh constante dulzura nuestra! ¡Oh deleite diario de nuestro espíritu! Por el sabor tan amargo de aquella hiel y vinagre que te dieron a probar en lugar de agua, para aplacar tu sed física, te suplicamos que aplaques nuestra sed por tu vivificadora sangre, y nuestra hambre por tu Redentora Carne, ahora y siempre, y que no nos falte en la hora de nuestra muerte. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Novena oración',
        blocks: [
          p('¡Oh Jesús, Virtud Real y gozo del alma! Acuérdate del dolor que sentiste, sumergido en un océano de amargura, al acercarse la muerte. Insultado y ultrajado por tus verdugos, clamaste en alta voz que habías sido abandonado por Tu Padre Celestial, diciéndole: “Dios mío, Dios mío, ¿Porqué me has abandonado?” Por aquella angustia que padeciste en aquellos momentos finales de tu Pasión, te rogamos oh nuestro Salvador que no nos abandones en los terrores y dolores de nuestra muerte. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Décima oración',
        blocks: [
          p('¡Oh Jesús, que eres principio y fin de todo lo creado , Virtud, Luz y Verdad! Acuérdate que por causa nuestra fuiste sumergido en un abismo de penas; sufriendo dolor en todo tu Santísimo Cuerpo: En consideración a la enormidad de tanta llaga que te hicimos los hombres; enséñanos a guardar por puro amor a Ti, todos tus Mandamientos; cuyo camino de Tu Ley Divina es amplio y agradable, para aquellos que te aman. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Undécima oración',
        blocks: [
          p('¡Oh Jesús mío!, abismo insondable de misericordia, te rogamos en memoria de tus heridas, las cuales penetraron hasta la médula de tus huesos y hasta lo más profundo de tu ser, ¡que nos apartes para siempre del pecado! ¡que no te ofendamos más! Reconocemos con bochorno que somos unos miserables pecadores y que te hemos ofendido ¡tantas veces! Que tememos que tu divina justicia nos condene.'),
          p('No obstante, acudimos presurosos a tu misericordia infinita, para que nos escondas urgentemente en tus preciosas LLagas, y así, ocultados de tu indignado Rostro, pueda tu amante Corazón una vez más, lavar nuestras culpas con tu Sangre liberadora. De esa forma Redentor nuestro, tu enojo e indignación cesarán de inmediato. ¡Gracias Señor! Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Duodécima oración',
        blocks: [
          p('¡Oh Jesús, eterna verdad, símbolo de la perfecta caridad y de la unidad! Te suplicamos que te acuerdes de aquella multitud de laceraciones, de aquellas horribles heridas que te hicimos la humanidad pecadora que querías salvar. Estabas hecho un guiñapo humano, enrojecido por tu propia sangre. ¡Que inmenso e intenso dolor padeciste en tu Carne Virginal por amor a nosotros! ¡Oh dulzura infinita!, ¿qué pudiste hacer, que ya no hayas hecho por nosotros? Nada falta. Todo lo has cumplido.'),
          p('Ayúdanos, Oh Señor, a tener siempre presente ante los ojos de nuestro espíritu, un fiel recuerdo de tu Pasión, para que el fruto de tus sufrimientos se vea continuamente renovados en nuestra alma, y para que tu amor se agrande en cada momento más y más en nuestro corazón, hasta que llegue aquel feliz día en que te veamos en el cielo, y ser uno contigo, que eres el tesoro y suma total de todo gozo y bondad. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Décima tercera oración',
        blocks: [
          p('¡Oh dulce consuelo de nuestra alma, maravilloso liberador, Rey inmortal e invencible! Recuerda cuando inclinando tu adorable cabeza, toda desfigurada por los golpes, la sangre y el polvo del camino, exclamaste: "Todo está consumado"... Toda tu fuerza mental y física se agotaron completamente.'),
          p('Por este Gran Sacrificio y por las angustias y tormentos que padeciste antes de morir, te rogamos, oh buen Jesús, que tengas misericordia de nosotros en la hora de nuestra muerte, cuando nuestra mente esté tremendamente perturbada; y nuestra alma sumergida en inquietudes y angustias. Que no temamos nada, que te tengamos a Ti a nuestro lado y dentro de nuestro ser. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Décima cuarta oración',
        blocks: [
          p('¡Oh doliente Jesús, oh incomprensible Segunda Persona de la Trinidad, esplendor y figura de su esencia! Recuerda cuando con gran voz entregaste tu alma a Tu Padre Celestial diciéndole: "¡Padre, en tus manos encomiendo mi espíritu!" Tu cuerpo estaba despedazado, y tu corazón destrozado, pero tus entrañas de misericordia quedaron abiertas para redimirlos! Así expiraste, oh amor infinito...'),
          p('Por tu Dolorosa Muerte; te suplicamos, Oh Rey de Santos y Arcángeles, que nos confortes y nos ayudes a resistir al mundo con sus errores, a Satanás con sus pérfidas, y a la carne con sus vicios, para que así, muertos a los enemigos de nuestras almas, vivamos solamente para Ti. Por eso te rogamos, Oh Dulce Redentor y Salvador, que a la hora de nuestra muerte recibas nuestras pobres almas desterradas que regresan a Ti. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Décima quinta oración',
        blocks: [
          p('¡Oh vencedor de la muerte! ¡Vid verdadera y fructífera! Recuerda a aquel torrente de sangre que brotó de cada parte de tu Bendito Cuerpo, igual que la uva exprimida en el lagar.'),
          p('Desde el lugar de la flagelación y a través de las calles de Jerusalén, por toda aquella vía dolorosa, hasta la colina sagrada, tu Sangre derramada escribía las bellas páginas de la historia del Corazón que más nos ama...¡El tuyo! Recuerda como la tierra agradecida, pero a la vez espantada, recibía tu preciosa Sangre. toda la naturaleza; de horror temblaba y los Cielos se estremecían, los Ángeles y hasta los demonios se sorprendían ante ¡aquella increíble escena! ¡Todo un Dios moría! ¿Qué era aquello? ¿Qué sucedía? Aquel primer Viernes Santo, oh Jesús ¡Abrías el cielo para la humanidad pecadora!'),
          p('Por tres largas horas tu Cuerpo colgó de la Cruz. Presentabas un aspecto doliente, triste, todo lleno de dolor, Tu Sangre aún manando, recorriendo aquella que ya se había secado, que ya había coagulado. Y a todo esto se adhirió el polvo y la tierra del camino....'),
          p('Qué tristeza y dolor padecieron María y Juan al contemplar tus cabellos y barbas que ahora daban la impresión que estaban compuestos de alambres, llenos de Sangre y de tierra. Tus oídos y nariz tupidos estaban de sangre. ¡Hasta tus ojos y boca sangraban! En verdad que todos tus sentidos fueron atrozmente atormentados.'),
          p('Así inclinaste la cabeza y entregaste tu Espíritu.... Entonces vino Longinos y perforó Tu costado, con tanta violencia, que la punta de la lanza casi sale por el otro costado. Tu corazón te lo desgarraron, oh Jesús, ese Corazón que ¡tanto nos ama! Y de allí brotó Sangre y Agua, hasta no quedar en Tu Cuerpo Gota alguna. Tu cuerpo era cual bulto colgado, como un haz de mirra, elevado a lo alto de la Cruz, la muy fina y delicada Carne tuya fue destrozada; la Sustancia de tu Cuerpo fue marchitada, y disecada la Médula de tus huesos. Es entonces que el Sol y las estrellas negaron su luz, hubo terremotos y la naturaleza y los elementos dieron amplio testimonio de que Aquel que negaron ¡era el Hijo de Dios!'),
          p('Por esta amarga Pasión, y por la Efusión de Tu divina Sangre, te suplicamos oh dulcísimo Jesús, que recibas nuestra alma, cuando estemos sufriendo en la agonía de nuestra muerte.'),
          p('Oh maravillosa realidad, escándalo para los infieles, ¡gozo indescriptible para los que te amamos! Ese tu infinito sacrificio pagó el rescate, y al resucitar y ascender gloriosamente al Cielo, ¡dejaste bien abiertas las puertas para aquellos que quisieran seguirte! Oh Señor, por tu amarga Pasión y preciosa sangre, te rogamos traspases nuestros corazones, para que nuestras lágrimas de amor, adoración y penitencia, sean nuestro alimento noche y día. Haz que nos convirtamos totalmente a Ti, que nuestros corazones sean tu perpetuo lugar de reposo; que nuestras conversaciones te sean siempre agradable; y que al final de nuestra vida merezcamos que graves, oh Dios de amor, el Sello de Tu Divinidad en nuestra alma, para que tanto el Padre como el Espíritu Santo, te vean bien reproducido en nosotros, y poder así ser contados entre tus Santos para que te alabemos para siempre por toda la eternidad. Así sea.'),
          ...pnAmGloria(),
        ],
      },
      {
        title: 'Oración final',
        blocks: [
          p('¡Oh Dulce Jesús! Herid mi corazón a fin de que mis lágrimas de amor y penitencia me sirvan de pan, día y noche. Convertidme enteramente, Oh mi Señor, a Vos. Haced que mi corazón sea Vuestra Habitación perpetua. Y que mi conversación sea agradable. Que el fin de mi vida Os sea de tal suerte loable, que después de mi muerte pueda merecer Vuestro Paraíso; y alabaros para siempre en el Cielo con todos Vuestros santos. Amén.'),
          p('Sea por siempre, Bendito y Alabado Jesús, que con su Sangre nos redimió'),
          rubric('(tres veces)'),
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
