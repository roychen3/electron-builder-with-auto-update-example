import { dialog, app } from 'electron';
import { autoUpdater, type AppUpdater } from 'electron-updater';

export function getAutoUpdater(): AppUpdater {
  return autoUpdater;
}

async function promptForUpdate(version: string): Promise<void> {
  const returnValue = await dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: `New version ${version} is available`,
    detail: 'Do you want to download and install this update now?',
    buttons: ['Update Now', 'Later'],
    cancelId: 1,
  });

  if (returnValue.response === 0) {
    console.log('Starting download update...');
    const autoUpdater = getAutoUpdater();
    await autoUpdater.downloadUpdate();
  }
}

async function showUpdatePrompt(version: string): Promise<void> {
  const returnValue = await dialog.showMessageBox({
    type: 'info',
    title: 'Ready to Install Update',
    message: `Version ${version} is ready to install`,
    detail:
      'The update has been downloaded. Would you like to restart the application now to install the update?',
    buttons: ['Install Now', 'Install Later'],
    cancelId: 1,
  });

  if (returnValue.response === 0) {
    console.log('Attempting to quit and install...');
    const autoUpdater = getAutoUpdater();
    autoUpdater.quitAndInstall(false, true);
    setTimeout(() => {
      console.log('Forcing app to quit as update may be stuck');
      app.quit();
    }, 2000);
  }
}

async function showNoUpdateAvailable(version: string): Promise<void> {
  await dialog.showMessageBox({
    type: 'info',
    title: 'No Update Available',
    message: 'You are already on the latest version',
    detail: `Current version: ${version}`,
    buttons: ['OK'],
  });
}

export async function checkForUpdates(): Promise<void> {
  const autoUpdater = getAutoUpdater();
  await autoUpdater.checkForUpdates();
}

export function initialAutoUpdate() {
  const autoUpdater = getAutoUpdater();

  // Allow prerelease version updates
  autoUpdater.allowPrerelease = true;
  // Set autoDownload to false, let user decide whether to download
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

  autoUpdater.on('update-not-available', async (info) => {
    console.log('No update available:', info);
    await showNoUpdateAvailable(info.version);
  });

  autoUpdater.on('update-available', async (info) => {
    console.log('Update available:', info);
    await promptForUpdate(info.version);
  });

  autoUpdater.on('update-downloaded', async (info) => {
    console.log('Update downloaded:', info);
    await showUpdatePrompt(info.version);
  });

  autoUpdater.on('error', (error) => {
    console.error('AutoUpdater Error:', error);
    dialog.showErrorBox(
      'AutoUpdater Error',
      `An error occurred: ${error.message || error}`
    );
  });
}
