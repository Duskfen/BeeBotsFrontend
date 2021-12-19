import Link from "next/link";
import Beelogo from "../../components/beelogo";
import Box from "../../components/box";
import Page404 from "../404";
import styles from "./index.module.scss";

export default function BotsIndex({ bots }) {
  if (!bots) {
    return <Page404 />;
  }

  return (
    <>
      <div>
        <div className={styles.botWrapper}>
          {bots.map((bot, i) => {
            return (
              <div key={`bot_${i}`}>
                <Box>
                  <Link href={`/bot/${bot.name}`}>
                    <a>
                      <div className={styles.bot}>
                        <p>{bot.name}</p>
                        <Beelogo sad={bot.profit < 0} i={i}></Beelogo>
                        <p>{Math.round(bot.profit * 10000, 2) / 100}%</p>
                      </div>
                    </a>
                  </Link>
                </Box>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://beebotsbackend.azurewebsites.net/api/overview"
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  };

  return {
    props: { bots: data },
    revalidate: 3, // In seconds // will be passed to the page component as props
  };
}
