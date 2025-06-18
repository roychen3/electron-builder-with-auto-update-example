# Electron Builder with Auto Update Example

This repository demonstrates how to implement auto-update functionality in an Electron app using a local update server.

## Project Structure

- **updater server**: A local update server using Docker and Nginx to simulate a real-world environment for hosting app resources.
- **my-electron-app**: A simple Electron project using `electron-builder` as a code example for implementing auto update functionality.

---

## 1. Preparation

### 1.1 Install Dependencies

```bash
npm install
```

### 1.2 Build the Electron App

```bash
cd my-electron-app
npm run build
```

### 1.3 Code Signing for macOS

To enable updates on macOS, the packaged application must be code signed.

Copy the Mac code signing script and fill in the required information (see [this document](./my-electron-app/README.md) for details):

```bash
cp scripts/package-mac-signed.sh.example scripts/package-mac-signed.sh
```

---

## 2. Packaging and Updating

### 2.1 Package the Initial Version

1. Set the version in `my-electron-app/package.json` to `1.0.0`.
2. Run the packaging script:

    ```bash
    bash scripts/package-mac-signed.sh
    ```

3. Install the generated `v1.0.0` application.

### 2.2 Prepare the Update

1. Update the version in `my-electron-app/package.json` to `2.0.0`.
2. Run the packaging script again:

    ```bash
    bash scripts/package-mac-signed.sh
    ```

3. After packaging, copy the following files from `my-electron-app/pkg` to `electron-update-server/public/release` (ensure the version in the filenames matches your `package.json`):

    ```
    builder-debug.yml 
    builder-effective-config.yaml 
    latest-mac.yml 
    MyElectronApp-2.0.0-mac-arm64.dmg 
    MyElectronApp-2.0.0-mac-arm64.dmg.blockmap 
    MyElectronApp-2.0.0-mac-arm64.zip 
    MyElectronApp-2.0.0-mac-arm64.zip.blockmap
    ```

---

## 3. Start the Local Update Server

```bash
cd electron-update-server
docker compose -f docker-compose.yml up
```

---

## 4. Configure the Publish URL

Make sure your local server URL matches the Electron `build.publish.url` setting. Update your `my-electron-app/package.json` as follows:

```json
...
  "build": {
    ...
    "publish": {
      "provider": "generic",
      "url": "http://localhost:8080/release/"
    },
    ...
  }
...
```

---

## 5. Test the Auto Update

1. Open the installed `v1.0.0` application.
2. In the app menu, click **"Check for Updates..."**.
3. The update process should begin automatically.

---

## 6. Troubleshooting

If the update does not trigger automatically, please check:

- Is the local server running at [http://localhost:8080](http://localhost:8080)?
- Have you copied all required files to `electron-update-server/public/release`?
- Did you increment the version number correctly (e.g., from `1.0.0` to `2.0.0`) in `package.json` and filenames?

---

Feel free to open an issue if you encounter any problems or have suggestions!

---

## References

- [electron-builder Auto Update Documentation](https://www.electron.build/auto-update)