import type { FC } from 'react';

import { useEffect } from 'react';

import { scrollDisable, scrollable } from 'src/libs/scrollController';

import styles from './index.module.css';

export const FullScreenLoader: FC = () => {
  useEffect(() => {
    scrollDisable();

    return () => {
      scrollable();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.dot_spinner}>
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
        <div className={styles.dot_spinner__dot} />
      </div>
    </div>
  );
};
