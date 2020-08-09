const DESKTOP_MIN_WIDTH = 1025;

export const getDeviceType = (): string => {
  const width = window.innerWidth;

  let deviceType = 'DESKTOP';

  if (width < DESKTOP_MIN_WIDTH) {
    deviceType = 'MOBILE';
  }

  return deviceType;
};
