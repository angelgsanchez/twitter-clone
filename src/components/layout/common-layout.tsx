import { useRequireAuth } from '@lib/hooks/useRequireAuth';
import { Aside } from '@components/aside/aside';
import { AsideTrends } from '@components/aside/aside-trends';
import { Suggestions } from '@components/aside/suggestions';
import { Placeholder } from '@components/common/placeholder';
import type { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside></Aside>
    </>
  );
}

export function UserLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside></Aside>
    </>
  );
}

export function TrendsLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside></Aside>
    </>
  );
}

export function PeopleLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside></Aside>
    </>
  );
}
