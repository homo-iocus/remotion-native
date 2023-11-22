import React, { useContext, useMemo } from 'react';
import { Internals, useVideoConfig } from 'remotion';
import { View, ViewProps, ViewStyle } from 'react-native';
import { calculateCanvasTransformation } from './calculate-scale';

type Props = {
  width: number;
  height: number;
  style: ViewStyle;
};

export const Player: React.FC<Props> = (props) => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerPlayer {...props} />
    </Internals.CanUseRemotionHooks.Provider>
  );
};

function InnerPlayer(props: Props) {
  const { defaultProps, width, height } = useVideoConfig();
  const manager = useContext(Internals.CompositionManager);

  const Comp = useMemo(() => {
    return manager.compositions[0]?.component!;
  }, [manager.compositions]);

  const { scale, xCorrection, yCorrection, centerX, centerY } =
    calculateCanvasTransformation({
      canvasSize: { width: props.width, height: props.height },
      compositionHeight: height,
      compositionWidth: width,
    });

  const style: ViewProps['style'] = useMemo(() => {
    return {
      height,
      width,
      marginLeft: xCorrection,
      marginTop: yCorrection,
      transform: [
        {
          scale,
        },
      ],
      overflow: 'hidden',
      borderRadius: 10,
    };
  }, [height, scale, width, xCorrection, yCorrection]);

  const outer = useMemo(() => {
    return {
      left: centerX,
      top: centerY,
    };
  }, [centerX, centerY]);

  return (
    <View style={{ ...outer, ...props.style }}>
      <View style={style}>
        <Comp {...(defaultProps as {})} />
      </View>
    </View>
  );
}
