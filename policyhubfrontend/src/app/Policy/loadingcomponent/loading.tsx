import React from 'react';
import classNames from 'classnames';
import styles from './loading.module.css';

export type LoadingProps = {
  /**
   * The size of the loading indicator.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * An optional message to display below the loading indicator.
   */
  message?: string;
};

const Loading = ({ size = 'medium', message }: LoadingProps) => {
  const sizeClassName = classNames({
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
  });

  return (
    <div className={styles.container}>
      <div className={classNames(styles.spinner, sizeClassName)} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading;