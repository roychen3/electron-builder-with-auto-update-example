# My Electron App

## Quick Start

1. **Install dependencies**
    ```bash
    npm install
    ```
2. **Build TypeScript**
    ```bash
    npm run dev     # Compile TS to JS
    ```
3. **Run Electron**
    ```bash
    npm run start
    ```

---

## Package Application

### Mac Example

#### 1. Copy the Mac code signing script

```bash
cp scripts/package-mac-signed.sh.example scripts/package-mac-signed.sh
```

#### 2. Prepare for packaging

- Edit `scripts/package-mac-signed.sh` and fill in your Apple developer information.
- Place your `certificate.p12` file in the project directory.

> **Need help with these values?**  
> See: [How to obtain information required by package-mac-signed.sh](#how-to-obtain-information-required-by-package-mac-signedsh)

#### 3. Run the packaging script

```bash
bash scripts/package-mac-signed.sh
```

- If code signing is successful, you will see `• notarization successful` or find a `_CodeSignature` folder at `my-electron-app/pkg/mac-arm64/MyElectronApp.app/Contents/_CodeSignature`.

---

## How to obtain information required by `package-mac-signed.sh`

1. **Apple Account**
    - Your Apple ID email is used as `APPLE_ID`.
2. **Apple Developer Subscription**
    - Required (paid).
3. **App-specific Password**
    - Log in at [Apple Account](https://account.apple.com/), create an app-specific password for `APPLE_APP_SPECIFIC_PASSWORD`.
4. **Team ID**
    - Log in at [Apple Developer](https://developer.apple.com/), go to `Account`, and find your `APPLE_TEAM_ID` under "Membership details".
5. **Generate `.p12` Certificate**
    - Use XCode or Keychain Access. Example using Keychain:
        1. Open Keychain Access (`/Applications/Utilities`).
        2. Go to `Certificate Assistant > Request a Certificate from a Certificate Authority`.
        3. Enter your email and a common name. Leave CA Email blank. Save to disk.
        4. On [Apple Developer](https://developer.apple.com/), go to `Certificates`, add a "Developer ID Application", and upload your `CertificateSigningRequest.certSigningRequest`.
        5. Download the `.cer` file and double-click to import into Keychain.
        6. Export as `.p12` (`CSC_LINK`). The password you set is `CSC_KEY_PASSWORD`.

---

## References

- [MacOS Code Signing in Electron (YouTube)](https://www.youtube.com/watch?v=hYBLfjT57hU&ab_channel=Omkar)
- [Sample repo from the video](https://github.com/omkarcloud/macos-code-signing-example?tab=readme-ov-file#mac-signing-and-notarization-demo)
- [Official guide: Create a certificate signing request](https://developer.apple.com/help/account/certificates/create-a-certificate-signing-request)
- [Electron builder - Code Signing](https://www.electron.build/code-signing)
- [Electron forge - Code Signing](https://www.electronforge.io/guides/code-signing/code-signing-macos)

---

## Windows

TODO