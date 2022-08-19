import styles from "./nav.module.scss";
import classNames from "classnames";
import React from "react";

export default function () {
  const [menuOpenState, setmenuOpenState] = React.useState(false);
  const [subMenuActiveState, setSubMenuActiveState] = React.useState("");

  const handleNavToggle = () => {
    setmenuOpenState(!menuOpenState);
  };

  const handleSubMenuClick = (item: string) => () => {
    if (subMenuActiveState === item) {
      setSubMenuActiveState("");
      return;
    }
    setSubMenuActiveState(item);
  };
  return (
    <nav className={styles.nav}>
      <ul className={classNames(styles.menu, { [styles.active]: menuOpenState })}>
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
          <a tabIndex={0} onClick={handleSubMenuClick("Services")}>
            Services
          </a>
          <ul className={classNames(styles.submenu, { [styles.submenuActive]: subMenuActiveState === "Services" })}>
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
          <a tabIndex={0} onClick={handleSubMenuClick("Plans")}>
            Plans
          </a>
          <ul className={classNames(styles.submenu, { [styles.submenuActive]: subMenuActiveState === "Plans" })}>
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
          <a href="#">Join the club</a>
        </li>
        <li className={styles.toggle}>
          <a href="#" onClick={handleNavToggle}>
            <i className={classNames("fas", { "fa-bars": !menuOpenState }, { "fa-times": menuOpenState })}></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
