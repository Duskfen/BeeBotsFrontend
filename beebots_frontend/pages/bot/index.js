import Link from "next/link";
import Beelogo from "../../components/beelogo";
import Box from "../../components/box";
import Page404 from "../404";
import styles from "./index.module.scss";
import increasing from "../../icons/money-increase.svg";
import decreasing from "../../icons/money-decrease.svg";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BotsIndex({ botsdata }) {

  const [bots, setbots] = useState(botsdata)

  useEffect(async () => {
    
    const res = await fetch(
      "https://beebotsbackend.azurewebsites.net/api/overview"
    );
    setbots(await res.json());
  
    return () => {
      console.log("unmounting")
    }
  }, [])
  

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
                        <div className={styles.percentShowWrapper}>
                          {bot.profit >= 0 ? (
                            <div className={styles.percentImage}>
                              <Image
                                src={increasing}
                                width={"20px"}
                                alt={"increasing"}
                              />
                            </div>
                          ) : (
                            <div className={styles.percentImage}>
                              <Image
                                src={decreasing}
                                width={"20px"}
                                alt={"decreasing"}
                              />
                            </div>
                          )}
                          <p>{Math.round(bot.profit * 10000, 2) / 100}%</p>
                        </div>
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
  }

  return {
    props: { botsdata: data },
    revalidate: 3, // In seconds // will be passed to the page component as props
  };
}
