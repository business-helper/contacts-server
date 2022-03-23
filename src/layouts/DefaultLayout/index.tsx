import React from 'react';

import { Header } from 'components/Header';
import styles from './index.module.scss';

export const DefaultLayout: React.FC = ({ children }) => {

  return (
    <div className={styles.container}>
      <Header />
      <div className="max-w-5xl mx-auto px-12 py-8">
        {children}
      </div>
    </div>
  )
}