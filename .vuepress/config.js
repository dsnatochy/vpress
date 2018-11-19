module.exports = {
  title: 'Poynt Developer',
  description: 'Poynt Developer Documentation',
  locales: {
    '/': { lang: 'en-US'}, 
    '/ru/': { lang: 'ru-RU'}
  },
  themeConfig: {
    nav:[
      { text: 'Home', link: '/'},
      { text: 'Guides', link: '/guides/' }, 
      { text: 'Info', link: '/info/' }
    ],
    sidebar: [
      '/',
      {
        title: 'Guides',
        collapsible: false,
        children:[
          ['/guides/posapp/', 'Building a POS App']
        ]
      }, 
       '/info/'
      ], 
    lastUpdated: 'Last Update' 
  },
  markdown: {
    lineNumbers: true
  }
};
