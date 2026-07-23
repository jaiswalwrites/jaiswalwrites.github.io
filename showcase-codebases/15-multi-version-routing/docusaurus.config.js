module.exports = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          lastVersion: 'current',
          versions: {
            current: {
              label: '2.0.0 (Latest)',
              path: '2.0.0',
            },
            '1.5.0': {
              label: '1.5.0 (Legacy)',
              path: '1.5.0',
            },
          },
        },
      },
    ],
  ],
};
