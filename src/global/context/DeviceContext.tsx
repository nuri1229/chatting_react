import React, { FC, createContext, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import { getDeviceType } from 'global/util';

type DeviceContextType = {
  device: string;
  setDevice: (device: string) => void;
};

const defaultValue: DeviceContextType = {
  device: getDeviceType(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  setDevice: (device: string) => {}
};

export const DeviceContext = createContext(defaultValue);

interface DeviceContextProviderProps {
  device: string;
  setDevice: (device: string) => void;
}

export const DeviceContextProvider: FC<DeviceContextProviderProps> = ({ children, device, setDevice }) => {
  useEffect(() => {
    const handleResize = _debounce(() => {
      setDevice(getDeviceType());
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [device, setDevice]);

  return <DeviceContext.Provider value={{ device, setDevice }}>{children}</DeviceContext.Provider>;
};
