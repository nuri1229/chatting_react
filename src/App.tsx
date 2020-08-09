import React, { useState, useContext } from 'react';
import { HocAdaptiveRender } from 'global/hoc/HocAdaptiveRender';
import { DeviceContextProvider, DeviceContext } from 'global/context';

const Desktop: React.FC = () => <h1>Desktop</h1>;
const Mobile: React.FC = () => <h1>Mobile</h1>;
const Layout = HocAdaptiveRender({
  desktop: Desktop,
  mobile: Mobile
});

export const App: React.FC = () => {
  const deviceContext = useContext(DeviceContext);
  const [device, setDevice] = useState<string>(deviceContext.device);

  return (
    <DeviceContextProvider device={device} setDevice={setDevice}>
      <Layout />
    </DeviceContextProvider>
  );
};
