import styles from "./nav.module.scss";
import classNames from "classnames";

export default function () {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.logo}>
          <a href="#">LMSC</a>
        </li>
        <li className={styles.item}>
          <a href="#">Home</a>
        </li>
        <li className={styles.item}>
          <a href="#">About</a>
        </li>
        <li className={classNames(styles.item, styles.hasSubmenu)}>
          <a tabIndex={0}>Services</a>
          <ul className={styles.submenu}>
            <li className={styles.subitem}>
              <a href="#">Design</a>
            </li>
            <li className={styles.subitem}>
              <a href="#">Development</a>
            </li>
            <li className={styles.subitem}>
              <a href="#">SEO</a>
            </li>
            <li className={styles.subitem}>
              <a href="#">Copywriting</a>
            </li>
          </ul>
        </li>

        <li className={classNames(styles.item, styles.hasSubmenu)}>
          <a tabIndex={0}>Plans</a>
          <ul className={styles.submenu}>
            <li className={styles.subitem}>
              <a href="#">Freelancer</a>
            </li>
            <li className={styles.subitem}>
              <a href="#">Startup</a>
            </li>
            <li className={styles.subitem}>
              <a href="#">Enterprise</a>
            </li>
          </ul>
        </li>
        <li className={styles.item}>
          <a href="#">Blog</a>
        </li>
        <li className={styles.item}>
          <a href="#">Contact</a>
        </li>
        <li className={classNames(styles.item, styles.button)}>
          <a href="#">Log In</a>
        </li>
        <li className={styles.toggle}>
          <a href="#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
