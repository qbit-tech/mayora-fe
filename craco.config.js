const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      // options: {
      //   lessLoaderOptions: {
      //     lessOptions: {
      //       modifyVars: { 
      //         '@height-base': '40px',
      //         '@height-lg': '50px',
      //         '@height-sm': '32px',
      //         '@font-size-lg': '20px',
      //         '@primary-color': '#9E2A2B',
      //         '@border-radius-base': '3px',
      //         // '@info-color': '#D81F64',
      //         '@text-selection-bg': 'rgba(0,0,0,0.3)',
      //         '@menu-item-active-bg': '#BEA464',
      //         '@menu-highlight-color': '#1E1E1E',
      //         '@card-padding-base': '40px',
      //         '@box-shadow-base': '0px 15px 25px -5px rgba(0, 0, 0, 0.08), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      //         '@margin-sm': '15px',
      //         '@layout-body-background': '#FFFFFF',
      //         '@layout-header-background': '#FFFFFF',
      //         '@table-header-bg': '#FFFFFF',
      //         '@border-color-split': '#D0D9DF',
      //         '@accent-color': '#BEA464',
      //         '@btn-default-bg': '#FFFFFF',
      //         '@btn-default-color': '#000000',
      //         '@btn-font-weight': '600',
      //         '@modal-header-border-width': '0',
      //         '@modal-footer-border-width': '0',
      //         '@modal-body-padding': '0 @padding-lg 0 @padding-lg',
      //         '@segmented-bg': '#A9B6C1',
      //         '@segmented-hover-bg': '#A9B6C1AA',
      //         '@segmented-selected-bg': '#DF2A2A',
      //         '@segmented-label-color': '#FFFFFF',
      //         '@segmented-label-hover-color': '#FFFFFF',

      //         '@checkbox-border-radius':'4px',
      //         '@checkbox-color':'@accent-color',

      //         '@radio-button-bg':'transparent',
      //         '@link-color':'#3587E8',

      //         '@item-hover-bg':'#EEE',
      //         '@primary-1':'#CCC'
      //       },
      //       javascriptEnabled: true,
      //     },
      //   },
      // },
    },
  ],
};