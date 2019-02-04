import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="google-site-verification" content="mIiPS0dROKOY9FaCmSha8F7sto_5EhZhlOl6ZFOTmXI" />
    </Helmet>
    {children}
  </div>
);

export default Layout;
