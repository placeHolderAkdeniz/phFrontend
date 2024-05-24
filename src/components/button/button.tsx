import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  onClick: () => void; // onClick prop'unun türünü belirtiyoruz
  children: React.ReactNode; // children prop'unun türünü belirtiyoruz
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}

export default CustomButton;
