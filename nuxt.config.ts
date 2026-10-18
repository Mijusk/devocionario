const themeBootstrap = `(function(){try{var s=JSON.parse(localStorage.getItem('dv:settings')||'{}');var t=s.theme||'auto';var d=document.documentElement;if(t!=='auto')d.dataset.theme=t;if(s.fontScale!=null)d.style.setProperty('--reading-scale',[0.9,1,1.12,1.26][s.fontScale]||1)}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],

  css: [
    '@fontsource/alegreya/400.css',
    '@fontsource/alegreya/400-italic.css',
    '@fontsource/alegreya/700.css',
    '@fontsource/alegreya-sans/400.css',
    '@fontsource/alegreya-sans/500.css',
    '@fontsource/alegreya-sans/700.css',
    '~/assets/css/main.css',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Devocionario',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Oraciones católicas, el Rosario guiado y devociones para rezar desde el móvil, también sin conexión.' },
        { name: 'theme-color', content: '#1F3A73' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
      ],
      script: [{ innerHTML: themeBootstrap, tagPosition: 'head' }],
    },
  },

  // Todo el sitio se genera en estático: el rastreo de enlaces recorre
  // Explorar → categorías → cada oración.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/explorar', '/rosario', '/guardadas', '/mis-oraciones/editar', '/mis-oraciones/ver'],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Devocionario',
      short_name: 'Devocionario',
      description: 'Oraciones católicas, Rosario guiado y devociones.',
      lang: 'es',
      start_url: '/',
      display: 'standalone',
      theme_color: '#1F3A73',
      background_color: '#F1F2F5',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,json,png,svg,ico,woff,woff2}'],
    },
    client: { installPrompt: false },
    devOptions: { enabled: false },
  },
})
