# Devocionario

Oraciones católicas para rezar desde el móvil: el Rosario guiado con contador de Avemarías, las devociones largas con seguimiento de días, y las oraciones de siempre, también sin conexión.

Hecho con Nuxt 3, generado en estático e instalable como app (PWA).

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # sitio estático en .output/public
```

`.output/public` se puede subir tal cual a Netlify, Vercel, Cloudflare Pages o GitHub Pages.

## Qué tiene

- **Hoy**: sugiere la oración del momento según la hora (mañana, Ángelus o Regina Coeli en tiempo pascual, Coronilla a las tres, Rosario por la tarde, oración de la noche), los misterios del día y lo que estabas rezando.
- **Palabra de vida**: en Hoy, un botón saca al azar un versículo breve (184, por temas). No se repite hasta que han salido todos, se mantiene durante el día y se puede guardar o compartir.
- **Oraciones**: siete secciones y buscador que ignora tildes («angel» encuentra «Ángelus»).
- **Rosario**: elige los misterios (marcados los de hoy) y reza paso a paso; se toca la tarjeta para contar cada Avemaría.
- **Oraciones guiadas**: Santa Brígida (12 años y 15 oraciones) y la Coronilla de la Divina Misericordia, con pasos, gestos de deslizar y memoria del paso en que te quedaste.
- **Seguimiento**: anota los días rezados de las devociones largas y muestra los días seguidos.
- **Lectura**: cuatro tamaños de letra, tema claro u oscuro, latín en paralelo cuando existe, y la pantalla no se apaga mientras rezas.
- **Guardadas**: tus oraciones a mano. Todo se guarda en el propio navegador, sin cuentas.

## Añadir o corregir oraciones

Las oraciones están en `data/prayers/*.ts`, una sección por archivo. Cada una se escribe con bloques sencillos (`data/helpers.ts`):

```ts
{
  slug: 'acordaos',
  title: 'Acordaos',
  summary: 'Acordaos, oh piadosísima Virgen María…',
  category: 'marianas',
  author: 'San Bernardo',
  blocks: [
    p('Acordaos, oh piadosísima Virgen María,\nque jamás se ha oído decir…'),
    vr('Ruega por nosotros, santa Madre de Dios.', 'Para que seamos dignos…'),
    ref('gloria'),          // nombra otra oración; al tocarla se abre su texto
  ],
  latin: [p('Memorare, o piissima Virgo Maria…')],
}
```

- `p` párrafo (los `\n` son saltos de verso) · `h` subtítulo · `rubric` indicación en rojo · `vr` ℣/℟ · `quote` cita · `litany` letanía · `ref` otra oración. Varios `ref` seguidos se muestran en una sola línea («Padre Nuestro, Avemaría y Gloria»).
- `promises` añade el enlace «Promesas», que abre un panel con un comentario y la lista.
- Para una oración paso a paso, usa `steps` en lugar de `blocks`. Un paso con `count` y `countText` muestra el contador de cuentas.
- `tracking` activa el seguimiento de días.

Los misterios del Rosario están en `data/rosary.ts`.

Las palabras de vida están en `data/palabras.ts`, una por línea: `['Jn 15, 9', 'Como el Padre me ha amado…', 'amor']`.

## Estructura

```
data/          contenido (oraciones, categorías, misterios)
types/         modelo de datos
components/    bloques de oración, contador, oración guiada, ajustes…
composables/   favoritos, ajustes, seguimiento, sugerencia del momento
pages/         Hoy, Oraciones, sección, oración, Rosario, Guardadas
```

## Sobre los textos

Las palabras de vida siguen la Sagrada Biblia, versión oficial de la Conferencia Episcopal Española, cuyos textos tienen derechos. Antes de publicar la web en abierto conviene revisar sus condiciones de uso.


Las oraciones tradicionales (Padre Nuestro, Salve, Ángelus, Acordaos…) siguen las versiones de uso común en España. Las devociones de Santa Brígida, las oraciones de la vida cristiana y las de los santos proceden del devocionario personal del autor, revisadas y corregidas.
