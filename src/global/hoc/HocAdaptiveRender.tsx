import React, { FC, useContext } from 'react';
import { DeviceContext } from 'global/context';

export interface HocAdaptiveRenderProps<T> {
  desktop: FC<T>;
  mobile: FC<T>;
}

export function HocAdaptiveRender<T>(component: HocAdaptiveRenderProps<T>) {
  const ComponentGenerate: FC<T> = (props) => {
    const context = useContext(DeviceContext);
    const { device: deviceType } = context;

    let Comp: FC<T>;
    Comp = component.desktop;

    if (deviceType === 'DESKTOP' && component.desktop) {
      Comp = component.desktop;
    } else if (deviceType === 'MOBILE' && component.mobile) {
      Comp = component.mobile;
    } else {
      return null;
    }

    return <Comp {...props} />;
  };

  return ComponentGenerate;
}
