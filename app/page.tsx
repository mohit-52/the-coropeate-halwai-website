import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Premium PG & Co-living Spaces in Gurgaon, Bangalore | Comfort N Stays',
  description: 'Premium corporate catering for modern workplaces across Gurugram, Delhi NCR and Bangalore. Verified food safety, customized menus, and professional hospitality.',
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
    </>
  );
}
