import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | LivRise Infrastructure — Engineering • Architecture • Infrastructure',
  description:
    'Learn about LivRise Infrastructure, our civil engineering foundation, architectural vision, and turnkey construction methodology led by verified engineering talent.',
  keywords: [
    'LivRise Infrastructure',
    'Civil Engineering',
    'Architecture',
    'Infrastructure',
    'Engineering',
    'Turnkey Construction',
    'Iman Khanra',
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
