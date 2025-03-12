// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const url = `zeego.dev`

// /** @type {import('@docusaurus').Config} */
const config = {
  title: 'Zeego',
  tagline: 'Menus for React Native (+ Web).',
  url: `https://${url}`,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-pointer.svg',
  organizationName: 'nandorojo', // Usually your GitHub org/user name.
  projectName: 'zeego', // Usually your repo name.
  scripts: [
    {
      src: 'https://cdn.splitbee.io/sb.js',
      async: true,
    },
  ],

  presets: [
    [
      'classic',
      // '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // disable landing page
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/nandorojo/zeego/tree/master/docs',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],

    [
      'docusaurus-preset-shiki-twoslash',
      {
        themes: ['min-dark', 'min-light'],
      },
    ],
  ],

  // plugins: ['docusaurus-plugin-react-native-web'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      ogImage: `https://${url}/img/og.png`,
      twitterImage: `https://${url}/img/og.png`,
      image: `https://${url}/img/og.png`,
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'by fernando rojo',
        logo: {
          alt: 'Zeego Logo',
          src: 'img/zeego logo light.svg',
          srcDark: 'img/zeego logo.svg',
        },
        items: [
          {
            href: 'https://twitter.com/fernandotherojo',
            label: 'Twitter',
            position: 'right',
          },
          {
            href: 'https://github.com/nandorojo/zeego',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        // style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Welcome',
                to: '/',
              },
              {
                label: 'Get Started',
                to: '/start',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nandorojo/zeego',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/fernandotherojo',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fernando Rojo.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
