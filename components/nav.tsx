import styles from "./nav.module.scss";
import classNames from "classnames";
import React from "react";
import Image from "next/image";
import Arrow from "img/arrow.svg";

interface menuItem {
  title: string;
  link?: string;
  isButton?: boolean;
  secondary?: boolean;
  subItems?: menuItem[];
  image?: string;
}

const menuData: menuItem[] = [
  { title: "News & Safety" },
  { title: "Learn", subItems: [{ title: "Schools & Tandems" }, { title: "Coaching" }, { title: "Resources" }] },
  { title: "Social" },
  {
    title: "About Us",
    subItems: [{ title: "Commitee" }, { title: "Meetings" }, { title: "Competitions" }, { title: "Gallery" }],
  },
  {
    title: "Sites",
    subItems: [
      { title: "Sites Guide" },
      { title: "Black Knoll", image: Arrow },
      { title: "Caer Caradoc", image: Arrow },
      { title: "Camlo", image: Arrow },
      { title: "Clatter", image: Arrow },
      { title: "Clunbury", image: Arrow },
      { title: "Corndon", image: Arrow },
      { title: "Lan Fawr", image: Arrow },
      { title: "The Lawley", image: Arrow },
      { title: "Llandinam", image: Arrow },
      { title: "Long Mynd", image: Arrow },
      { title: "Sarn", image: Arrow },
      { title: "Shepherds Tump", image: Arrow },
      { title: "The Wrekin NW", image: Arrow },
      { title: "The Wrekin SE", image: Arrow },
    ],
  },

  { title: "Join the club", isButton: true },
  { title: "Contact Us", isButton: true, secondary: true },
];

function useOutsideAlerter(ref, onClick: Function) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function () {
  const wrapperRef = React.useRef(null);
  const handleClickOutside = () => {
    setSubMenuActiveState("");
  };
  useOutsideAlerter(wrapperRef, handleClickOutside);

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
      <ul ref={wrapperRef} className={classNames(styles.menu, { [styles.active]: menuOpenState })}>
        <li className={styles.logo}>
          <a href="#">LMSC</a>
        </li>

        {menuData.map((item) => {
          return (
            <li
              className={classNames(
                styles.item,
                { [styles.hasSubmenu]: !!item.subItems },
                {
                  [styles.submenuActive]: subMenuActiveState === item.title,
                },
                { [styles.button]: item.isButton },
                { [styles.secondary]: item.secondary }
              )}
            >
              <a href={item.link} onClick={handleSubMenuClick(item.title)} className={classNames()}>
                {item.title}
              </a>
              {item.subItems && (
                <ul className={classNames(styles.submenu)}>
                  {item.subItems.map((subitem) => {
                    return (
                      <li className={styles.subitem}>
                        <a href={subitem.link}>{subitem.title}</a>
                        {subitem.image && <Image src={subitem.image} height={20} width={20} layout="fixed" />}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}

        <li className={styles.toggle}>
          <a href="#" onClick={handleNavToggle}>
            <i className={classNames("fas", { "fa-bars": !menuOpenState }, { "fa-times": menuOpenState })}></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
