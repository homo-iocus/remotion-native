import React, { ReactElement } from 'react';
import { CompositionManagerProvider } from './CompositionManager';
import type { LooseComponentType } from './core';
import { TimelineProvider } from './TimelineProvider';
import { usePlayback } from './use-playback';

type Props<T> = {
  component: LooseComponentType<T>;
  inputProps: T;
  durationInFrames: number;
  fps: number;
  height: number;
  width: number;
  children: React.ReactNode;
};

const WithPlayback: React.FC = ({ children }) => {
  usePlayback({
    loop: false,
    moveToBeginningWhenEnded: false,
    playbackRate: 1,
    inFrame: null,
    outFrame: null,
  });

  return children as ReactElement;
};

export function RemotionContext<T extends JSX.IntrinsicAttributes>({
  children,
  component,
  durationInFrames,
  fps,
  height,
  width,
  inputProps,
}: Props<T>) {
  return (
    <CompositionManagerProvider
      component={component as LooseComponentType<unknown>}
      durationInFrames={durationInFrames}
      fps={fps}
      height={height}
      width={width}
      defaultProps={inputProps}
    >
      <TimelineProvider>
        <WithPlayback>{children}</WithPlayback>
      </TimelineProvider>
    </CompositionManagerProvider>
  );
}
