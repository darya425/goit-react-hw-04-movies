import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.copyrigth}>
        <span className={styles.copyrightText}>
          &#169; 2021 | All Rights Reserved | Developed with
        </span>
        &#10084;
        <span className={styles.copyrightText}>by Darya Kuliashova</span>
      </p>
    </div>
  );
}
