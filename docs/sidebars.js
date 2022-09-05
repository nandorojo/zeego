/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  mySidebar: [
    'index',
    'start',
    'usage',
    {
      type: 'category',
      items: ['components/dropdown-menu', 'components/context-menu'],
      label: 'Components',
      collapsed: false,
      collapsible: false,
    },
    {
      type: 'category',
      items: ['examples/twitter', 'examples/github', 'examples/vercel'],
      label: 'Examples',
      collapsed: false,
      collapsible: false,
    },
    {
      type: 'category',
      label: 'Adding Styles',
      items: [
        {
          label: 'Overview',
          id: 'style',
          type: 'doc',
        },
        'style/vanilla',
        'style/dripsy',
        'style/tailwind',
        // 'style/tamagui',
        'style/animations',
      ],
      collapsible: false,
      // link: {
      //   type: 'doc',
      //   id: 'style',
      // },
    },
  ],
}

module.exports = sidebars
