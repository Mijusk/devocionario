import type { Prayer, Step } from '~/types/prayer'
import { p, rubric, ref, quote } from './helpers'
import { ordinals, type MysterySet } from './rosary'

const AVE =
  'Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\nSanta María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.'

/** Construye el Rosario completo, paso a paso, para un grupo de misterios. */
export function buildRosary(set: MysterySet): Prayer {
  const mysterySteps: Step[] = set.mysteries.map((m, i) => ({
    title: `${ordinals[i]} misterio`,
    subtitle: m.title,
    blocks: [
      quote(`Fruto: ${m.fruit.toLowerCase()}.`, m.cite),
      ref('padre-nuestro'),
    ],
    count: 10,
    countText: AVE,
    after: [ref('gloria'), ref('jaculatoria-fatima')],
  }))

  return {
    slug: `rosario-${set.slug}`,
    title: `Santo Rosario`,
    summary: set.title,
    category: 'marianas',
    tags: ['rosario'],
    steps: [
      {
        title: 'Inicio',
        subtitle: set.title,
        blocks: [
          ref('senal-de-la-cruz'),
          ref('acto-de-contricion'),
          ref('credo'),
          rubric('Por las intenciones del Papa, y para pedir fe, esperanza y caridad:'),
          ref('padre-nuestro'),
        ],
        count: 3,
        countText: AVE,
        after: [ref('gloria')],
      },
      ...mysterySteps,
      {
        title: 'Para terminar',
        blocks: [
          ref('salve'),
          ref('letanias-lauretanas'),
          p('Por las intenciones del Santo Padre:'),
          ref('padre-nuestro'),
          ref('avemaria'),
          ref('gloria'),
          ref('senal-de-la-cruz'),
        ],
      },
    ],
  }
}
