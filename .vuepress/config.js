module.exports = {
  title: 'My Documentation',
  description: 'Document information for site',
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
    sidebar: ['/', '/guides/', '/info/'], 
    lastUpdated: 'Last Update' 
  }
};
