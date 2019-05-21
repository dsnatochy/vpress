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
      { text: 'Guides', link: '/guides/posapp/' }, 
      { text: 'More Info', link: '/info/' },
      { text: 'API Reference', link: "https://poynt.com/docs/api/"}
    ],
    sidebar: {
      '/guides/':[
        {
          title: 'Guides',
          children:[
            ['/guides/posapp/', 'Building a POS app'],
            ['/guides/giftcard/', 'Building a gift card app'],
            ['/guides/loyalty/', 'Building a loyalty app'],
            ['/guides/cloudapp/', 'Building a cloud app']
          ]
        }
      ],
      '/info/':[
        '/info/'
      ],
      '/' : [
        '',
        {
          title: 'Setup Poynt Terminal',
          children:[
            ['/setupTerminal/', 'Activate Developer Mode'],
            ['/setupTerminal/setup-emulator', 'Setup Poynt OS Emulator'],
            ['/setupTerminal/activate-terminal', 'Activate Terminal']
          ]
        },
        {         
          title: 'On Terminal Apps',
          children:[
            ['/terminalApps/', 'On Terminal Apps'],
          ] 
        },
        {
          title: 'Cloud Apps',
          children:[
            ['/cloudApps/webhooks', 'Webhooks'],
          ]
        },
        {
          title: 'App Marketplace',
          children:[
            ['/appStore/app-ecosystem', 'Poynt Apps Eco System'],
            ['/appStore/app-development-guidelines', 'App Development Guidelines'],
            ['/appStore/app-review', 'App Review'],
            ['/appStore/app-compliance-requirements', 'App Compliance Requirements'],
            ['/appStore/gdpr-guidelines', 'GDPR Guidelines'],
            ['/appStore/how-to-submit-apk', 'Submit your first APK'],
            ['/appStore/integrating-with-billing', 'Integrating with Billing Service'],
            ['/appStore/app-billing-best-practices', 'App billing best practices'],
            ['/appStore/billing-app-development', 'Billing App Development']
          ]
        },   
        {
          title: 'Semi-Integration',
          children:[
            ['/semiIntegration/', 'Overview'],
            ['/semiIntegration/payment-bridge', 'Poynt Apps Eco System'],
            ['/semiIntegration/plug-n-pay', 'Plug and Pay(PnP)'],
            ['/semiIntegration/pos-bridge', 'POS Bridge']
          ]
        },
      ]
    },
    lastUpdated: 'Last Update' 
  },
  markdown: {
    lineNumbers: true
  }
};
