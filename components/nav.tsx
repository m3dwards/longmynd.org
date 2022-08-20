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

export default function Nav({ data }: { data: { sites: []; safety: [] } }) {
  const wrapperRef = React.useRef(null);
  const handleClickOutside = () => {
    setSubMenuActiveState("");
  };
  useOutsideAlerter(wrapperRef, handleClickOutside);

  const [menuOpenState, setmenuOpenState] = React.useState(false);
  const [subMenuActiveState, setSubMenuActiveState] = React.useState("");

  const sites = [];
  for (const site of data.sites as Array<{ name: string; id: string }>) {
    sites.push({ title: site.name, image: Arrow, link: "/sites/" + site.id });
  }

  const safetyPages = [];
  for (const safetyPage of data.safety as Array<{ title: string; id: string }>) {
    safetyPages.push({ title: safetyPage.title, link: "/safety/" + safetyPage.id });
  }

  const menuData: menuItem[] = [
    { title: "News", link: "/news" },
    { title: "Safety", subItems: [...safetyPages] },
    { title: "Learn", subItems: [{ title: "Schools & Tandems" }, { title: "Coaching" }, { title: "Resources" }] },
    { title: "Social" },
    {
      title: "About Us",
      subItems: [{ title: "Commitee" }, { title: "Meetings" }, { title: "Competitions" }, { title: "Gallery" }],
    },
    {
      title: "Sites",
      subItems: [{ title: "Sites Guide" }, ...sites],
    },

    { title: "Join the club", isButton: true },
    { title: "Contact Us", isButton: true, secondary: true },
  ];

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

        {menuData.map((item, i) => {
          return (
            <li
              key={i}
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
                  {item.subItems.map((subitem, j) => {
                    return (
                      <li key={j} className={styles.subitem}>
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
