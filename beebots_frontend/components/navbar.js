import styles from "./navbar.module.scss";
import LayoutStyles from "./layout.module.scss";
import Link from "next/link";
import Beelogo from "../components/beelogo";
import Box from "../components/box";
import { useRouter } from "next/router";
import useMediaQuery from "../utils/useMediaQuery";

const menu = [
  { title: "Home", path: "/bot" },
  { title: "Styleguide", path: "/styleguide" },
  { title: "Sonstiges", path: "/credits" }
];

export default function Navbar({ children }) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <>
      {isDesktop ? (
        <>
          <div className={styles.sticky}>
            <Box className={styles.navbox}>
              <nav>
                <div className={LayoutStyles.restrict}>
                  <div className={styles.nav}>
                    <div className={styles.Beelogo}>
                      <Beelogo height="80px" width="80px" />
                    </div>
                    <ul>
                      {menu.map(({ title, path }) => {
                        return (
                          <li key={`nav_${path}`}>
                            <Link href={path}>
                              <a
                                className={`${
                                  router.pathname === path
                                    ? styles.activeLink
                                    : null
                                }`}
                              >
                                {title}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </nav>
            </Box>
          </div>
          {children}
        </>
      ) : (
        <>
          {children}
          {/* TODO: Bottom is not really on the bottom if content is to small */}
          <div className={styles.bottomsticky}>
            <Box className={styles.navbox}>
              <nav>
                <div className={LayoutStyles.restrict}>
                  <div className={styles.nav}>
                    <ul>
                      {menu.map(({ title, path }) => {
                        return (
                          <li key={`nav_${path}`}>
                            <Link href={path}>
                              <a
                                className={`${
                                  router.pathname === path
                                    ? styles.activeLink
                                    : null
                                }`}
                              >
                                {title}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </nav>
            </Box>
          </div>
        </>
      )}
    </>
  );
}
