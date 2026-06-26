import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'The Corporate Halwai | Desi Flavours. Corporate Standards. | Corporate Catering Gurugram & Delhi NCR',
  description: 'Premium corporate catering in Gurugram & Delhi NCR. Authentic desi flavours with hygiene, professionalism and corporate standards. Serving Since 2015. The first corporate caterer to prepare food in olive oil. Office meals, events & cafeteria services.',
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
    </>
  );
}
