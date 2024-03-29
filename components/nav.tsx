import styles from "./nav.module.scss";
import classNames from "classnames";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Icon from "img/icon-white.png";
import WindIndicator from "./WindIndicator";

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

export default function Nav({ data }: { data: { sites: []; safety: []; learn: []; about: [] } }) {
  const wrapperRef = React.useRef(null);
  const handleClickOutside = () => {
    setSubMenuActiveState("");
  };
  useOutsideAlerter(wrapperRef, handleClickOutside);

  const [menuOpenState, setmenuOpenState] = React.useState(false);
  const [subMenuActiveState, setSubMenuActiveState] = React.useState("");

  const sites = [];
  for (const site of data.sites as Array<{
    name: string;
    id: string;
    windDirection: Array<{ from: string; to: string }>;
  }>) {
    sites.push({
      title: site.name,
      image: site.windDirection ? <WindIndicator size={35} directions={site.windDirection} /> : undefined,
      link: "/sites/" + site.id,
    });
  }

  const safetyPages = [];
  for (const safetyPage of data.safety as Array<{ title: string; id: string }>) {
    safetyPages.push({ title: safetyPage.title, link: "/safety/" + safetyPage.id });
  }

  const learnPages = [];
  for (const learnPage of data.learn as Array<{ title: string; id: string }>) {
    learnPages.push({ title: learnPage.title, link: "/learn/" + learnPage.id });
  }

  const aboutPages = [];
  for (const aboutPage of data.about as Array<{ title: string; id: string }>) {
    aboutPages.push({ title: aboutPage.title, link: "/about/" + aboutPage.id });
  }

  const menuData: menuItem[] = [
    { title: "News & Weather", link: "/news" },
    { title: "Safety", subItems: [...safetyPages] },
    { title: "Learn", subItems: [...learnPages] },
    { title: "Social", link: "/social" },
    {
      title: "About Us",
      subItems: [...aboutPages],
    },
    {
      title: "Sites",
      link: "/sites",
    },

    { title: "Join the club", isButton: true, link: "/join" },
    { title: "Contact Us", isButton: true, secondary: true, link: "/contact" },
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
  const { pathname } = useRouter();
  return (
    <nav className={styles.nav}>
      <ul ref={wrapperRef} className={classNames(styles.menu, { [styles.active]: menuOpenState })}>
        <li className={styles.logo}>
          <a href="/">
            <span>LMSC</span>
            <Image src={Icon} priority layout="fixed" height="30px" width="30px" />
          </a>
        </li>

        {menuData.map((item, i) => {
          return (
            <li
              key={i}
              className={classNames(
                styles.item,
                { [styles.menuActive]: pathname === item.link },
                { [styles.hasSubmenu]: !!item.subItems },
                {
                  [styles.submenuActive]: !!item.subItems && subMenuActiveState === item.title,
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
                        <a href={subitem.link}>
                          <span>{subitem.title}</span>
                          {subitem.image && <span>{subitem.image}</span>}
                        </a>
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
