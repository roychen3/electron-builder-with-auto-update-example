import { Menu, app } from 'electron';

import { checkForUpdates } from './auto-update';

import type { MenuItemConstructorOptions } from 'electron';

export function createAppMenu(): void {
  const isMac = process.platform === 'darwin';

  const checkForUpdatesItem: MenuItemConstructorOptions = {
    label: 'Check for Updates...',
    click: async () => {
      await checkForUpdates();
    },
  };
  // Detail ref: https://www.electronjs.org/docs/latest/api/menu#examples
  const template: MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              checkForUpdatesItem,
              { type: 'separator' as const },
              { role: 'services' as const },
              { type: 'separator' as const },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' as const },
              { role: 'quit' as const },
            ] as MenuItemConstructorOptions[],
          },
        ]
      : []),
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    ...((!isMac
      ? [{ label: 'About', submenu: [{ role: 'about' }, checkForUpdatesItem] }]
      : []) as MenuItemConstructorOptions[]),
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://electronjs.org');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
