import Head from 'next/head';
import { FC, ReactNode } from 'react';

import ST from './Layout.module.scss';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }): JSX.Element => {
  return (
    <>
      <Head>
        <title>London Bus Times</title>
      </Head>

      <main className={ST.main}>{children}</main>
    </>
  );
};

export default Layout;
