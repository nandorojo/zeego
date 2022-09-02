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
    // 'philosophy',
    // {
    //   type: 'category',
    //   items: [
    //     'usage/link',
    //     'usage/text-link',
    //     'usage/moti-link',
    //     'usage/use-router',
    //     'usage/params',
    //     'usage/use-link',
    //   ],
    //   label: 'API',
    //   collapsed: false,
    // },
    {
      type: 'category',
      items: ['components/dropdown-menu', 'components/context-menu'],
      label: 'Components',
      collapsed: false,
    },
    'style',
    // {
    //   type: 'category',
    //   items: [
    //     'recipes/redirects',
    //     'recipes/tree-shaking',
    //     'recipes/use-is-focused',
    //     'recipes/scroll-view',
    //     'recipes/deep-linking',
    //     'recipes/modals',
    //   ],
    //   label: 'Recipes',
    //   collapsed: false,
    // },
    // 'gradual-adoption',
    // 'methodology',
    // 'resources',
  ],
}

module.exports = sidebars
