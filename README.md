# COVID-RD

COVID-RD allows you to view the data of validated COVID-19 cases in the Dominican Republic and report the symptoms if you are possibly infected with the virus to the Ministry of Public Health (MSP).

In this installment of COVID-RD you will have access to:

- Register your symptoms in a survey prepared by the General Directorate of Epidemiology (DIGEPI) with the intention of ruling out or validating whether it is necessary to go to a health entity for the COVID-19 test
- Validate if you have been in contact with other users who test positive for COVID-19
- Map with the list of hospitals and laboratories closest to your residence
- Access the Aurora chatbot
- Consult the MSP bulletins, relevant information from the Presidency and advice related to the pandemic

## Developer Setup

Here's a list of technologies you need to run the project:

- Node.js 10+
- Java JDK 8+
- Yarn
- React Native
- Android Studio Lastest

### Building

After cloning the repository follow the next steps

### 1. Install Node.js

Verify if Node.js is installed using this command in the terminal `node --version`.
If Node.js isn't installed or version 10+, it can be aquired here [Node.js](https://nodejs.org/en/download/).

> NOTE:
> if you need the use of multiples node.js versions you could use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)

- Afterwards check if it was installed correctlly by using `node --version` command.
- **MAC ONLY:** Install watchman command: `brew install watchman`

### 2. Install Java - JDK

Verify if Node.js is installed using this command in the terminal `java --version`.
If Java isn't installed or version 8+, install it using this command `brew cask install java` or `brew cask install adoptopenjdk/openjdk/adoptopenjdk8`.

> NOTE:
> **For windows 10** the instruction on this [Link](https://devwithus.com/install-java-windows-10/) > **For MacOs**: Be sure of having [Homebrew](https://brew.sh/).

- Afterwards check if it was installed correctlly by using `java --version` command.

### 3. Install Yarn

Verify if Node.js is installed using this command in the terminal `yarn --version`.
If Yarn isn't installed, install it using this command `npm install -g yarn`.

> NOTE: [Yarn Installation Page](https://yarnpkg.com/getting-started/install)

- Afterwards check if it was installed correctlly by using `yarn --version` command.

### 4. Install Android Studio

- [Download and install Android Studio](https://developer.android.com/studio/index.html).\
  Make sure to this items are checked `Android SDK`, `Android SDK Platform`, `Android Virtual Device` & If you are not already using Hyper-V: `Performance (Intel ® HAXM)`

> NOTE: Sometimes those checkboxes do not appear, or they are grayed out, you will have a chance to install these components later on.

### 5. Set Android development environment

#### 1. Install the Android SDK

- Open Android Studio, click on "Configure" button and select "SDK Manager".
- On "SDK Manager", select the "SDK Platforms" tab, then check "Show Package Details" in the bottom right corner. Expand the `Android 10 (Q)` entry and check the following items: \
  `Android SDK Platform 29` \
  `Source for Android 29` \
  `Intel x86 Atom_64 System Image` \
  `Google APIs Intel x86 Atom System Image`
- Aftewards, go to the "SDK Tools" tab and check "Show Package Details" again. Expand the "Android SDK Build-Tools" entry and make sure that `29.0.2` item is checked.
- At last, click "Apply" and wait for it to download and install.

#### 2. Configure the AVD

- Open Android Studio, click on "Configure" button and select "AVD Manager".
- If it already have one, verify that it API is `29` and device `Pixel 2`, otherwise you can change by clicking on the "Edit this AVD" button on the "Action" Column of the AVD.
- If it's empty, click on " + Create Virtual Devices ..." button in the bottom left side, look and select `Pixel 2` item and click the "Next" button. Then select API `29` and click "Next" and "Finish" button.

### 6. Run configuration files

run the following configuration files depending on your operating system, if you are using Linux / Mac run the files with the **.sh** extension, in case you have windows with the **.bat** extension.

> **Note:** Pay attention to any instruction that pops up during runtime.

```
dev_setup
1_start_react
2_start_android_app
```

## Running

**Note:** In some cases, these procedures can lead to the error `Failed to load bundle - Could not connect to development server`. In these cases, kill all other react-native processes and try it again.

#### Android (Windows, Linux, macOS)

```
1- yarn start
2- yarn run run-android -- another console
```

Device storage can be cleared by long-pressing on the app icon in the simulator, clicking "App info", then "Storage", and lastly, "Clear Storage".

#### iOS (macOS only)

```
yarn install:pod ## only needs to be ran once

1- yarn start
2- yarn run run-ios -- another console
```

Device storage can be cleared by clicking "Hardware" on the system toolbar, and then "Erase all content and settings".

### Release Builds

Generating a release build is an optional step in the development process.

- [Android instructions](https://reactnative.dev/docs/signed-apk-android)

### Debugging

[react-native-debugger](https://github.com/jhen0409/react-native-debugger) is recommended. This tool will provide visibility of the JSX hierarchy, breakpoint usage, monitoring of network calls, and other common debugging tasks.

## Testing

Tests are ran automatically through Github actions - PRs are not able to be merged if there are tests that are failing.

### Unit Test

To run the unit tests:

```
yarn test --watch
```

[Snapshot testing](https://jestjs.io/docs/en/snapshot-testing) is used as a quick way to verify that the UI has not changed. To update the snapshots:

```
yarn update-snapshots
```

### e2e Test

**Note:** Right now, there is only e2e test support for iOS.

e2e tests are written using [_detox_](https://github.com/wix/Detox). Screenshots of each test run are saved to `e2e/artifacts` for review.

To run the e2e tests:

```
yarn detox-setup ## only needs to be run once
yarn build:e2e:ios ## needs to be run after any code change
yarn test:e2e:iphone{11, -se, 8}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

> **Note:** All branches must be created from develop.

- Make sure `develop` is updated
- Take the new branch from develop `git checkout -b $branchName`
- Apply changes, add to staging, commit them and run `git push origin $branchName`

_Note:_

- In order to have and keep a good history, the commit message should describe what the changes are and the details of it in the Pull Request `PR` content.
- Please make sure to update tests as appropriate.
