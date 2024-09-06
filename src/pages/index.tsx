import { AuthLayout } from '@components/layout/auth-layout';
import { SEO } from '@components/common/seo';
import { LoginMain } from '@components/login/login-main';
import type { ReactElement, ReactNode } from 'react';

export default function Login(): JSX.Element {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <SEO
        title='Twitter: es lo que está pasando'
        description='Desde noticias de última hora y entretenimiento hasta deportes y política, obtenga la historia completa con todos los comentarios en vivo.'
      />
      <LoginMain />
      
    </div>
  );
}
Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);
