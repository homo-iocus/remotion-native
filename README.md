# Remotion in React Native

This is a proof of concept for creating videos in React Native using [Remotion](https://remotion.dev), presented at [App.js Conf 2023](https://appjs.co/).

## Features

- Define a video with Remotion APIs: [`useCurrentFrame()`](https://www.remotion.dev/docs/use-current-frame), [`<Sequence>`](https://www.remotion.dev/docs/sequence), [`spring()`](https://www.remotion.dev/docs/spring)
- Play a preview of the video and update it based on user interaction
- Render the video into a `.mp4` on-device.

## Architecture

- A React context is created that holds the current frame, the duration and dimensions of the video.
- If the video is playing, a `requestAnimationFrame` loop is started that updates the current frame.
- Wherever possible, the existing APIs from the `remotion` package were reused.

## Limitations

To start, some Remotion features were not considered:

- **No audio support**: Videos will have no sound.
- **No support for components and APIs that use DOM APIs**: `<AbsoluteFill>`, `<Video>`, `<IFrame>` etc.
- **Unoptimized performance**: Primitive re-rendering using React on the JS thread.
- **Codecs**: Only MP4s are supported.
- **Async operations**: The renderer does not wait for `delayRender()` calls.
- **No multithreading**: The video is rendered frame-by-frame on the main thread.

## Known bugs

- [Does not save video on Android SDK33 and higher](https://github.com/expo/expo/pull/20907/files#r1188611508)

## License

The source code in this repository is licensed under the MIT license.
Remotion, a dependency of this project, uses the Remotion license. Note that for some entities a company license is needed. [Read the terms here](https://remotion.dev/license).
