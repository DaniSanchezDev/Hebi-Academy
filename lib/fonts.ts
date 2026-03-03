import localFont from 'next/font/local';

export const spaceGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/SpaceGrotesk/SpaceGrotesk-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SpaceGrotesk/SpaceGrotesk-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SpaceGrotesk/SpaceGrotesk-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SpaceGrotesk/SpaceGrotesk-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SpaceGrotesk/SpaceGrotesk-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
});
