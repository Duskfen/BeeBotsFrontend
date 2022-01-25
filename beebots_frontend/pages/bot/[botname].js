import { useRouter } from "next/router";
import { useState } from "react";
import DashboardItem from "../../components/dashboardItem";
import Spinner from "../../components/spinner";
import styles from "./[botname].module.scss";

export default function Bots({ details, botname, botsId }) {
  const router = useRouter();

  const [botdetails, setBotdetails] = useState(details);

  if (router.isFallback) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner size="250px" />
      </div>
    );
  }
  console.log(botdetails);

  return (
    //  <>
    //    <p>botname: {botname}</p>
    //    <p>tempdata: {JSON.stringify(botdetails)}</p>
    //  </>
    <>
      <div>
        <DashboardItem
          title={"General"}
          onTimeSpanChange={(e) => console.log("timespan", e)}
          use2Times={false}
        >
          <div className={styles.GeneralBoxRow}>
            <p>Profit:</p>
            <p>{botdetails[0].totalProfit * 10}%</p>
          </div>

          <div className={styles.GeneralBoxRow}>
            <p>Trades:</p>
            <p>
              {botdetails[0].countWrong +
                botdetails[0].countCorrect +
                botdetails[0].countBreakEven}
            </p>
          </div>

          <div className={styles.GeneralBoxRow}>
            <p>Bitcoinprofit:</p>
            <p>TODO</p>
          </div>

          <div className={styles.GeneralBoxRow}>
            <p>Profit/Bitcoin:</p>
            <p>TODO</p>
          </div>
        </DashboardItem>
      </div>
    </>
  );
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
import * as mongoDB from "mongodb";
export async function getStaticProps({ params }) {
  const res = await fetch(
    "https://beebotsbackend.azurewebsites.net/api/details",
    {
      method: "POST",
      body: JSON.stringify({ Name: params.botname, Duration: 1 }),
    }
  );

  const data = await res.json();

  let db;
  let btcHistory = null;

  let connectionString =
    "mongodb://beebotsmarkethistory:lvgyuk1K0Efc0VvDoPDk5ZvRS0YzykffvY35DoEfAeqM8zv7Klto9YRl5lbAdtKhuBaJpRXl1OoZHssX4UrnyA%3D%3D@beebotsmarkethistory.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@beebotsmarkethistory@";

  const client = new mongoDB.MongoClient(connectionString);

  await client.connect();

  db = client.db("MarketHistory");

  btcHistory = db.collection("BitcoinHistory");

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${btcHistory.collectionName}`
  );

  console.log(data);
  //TODO: -> read date, add 1 day, read as unixtimestamp and get corresponding value from mongo
  
  data.map(async (bot) => {
      console.log(bot);
      bot.btcProfit = await btcHistory.find({
         timeStamp: {
         $gte: new Date(bot.date).getTime() + 3600000*23,
         $lt: new Date(bot.date).getTime() + 3600000*24,
         },
      }).toArray();
      bot.btcProfit = 0;
      console.log(bot);
      return bot;
  });
  console.log("test", data)

  
  // btcHistory.find().toArray().then(res => {
  //     console.log(res.filter((v, i) => i < 5))
  // })

  return {
    props: {
      details: data,
      botname: params.botname,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch(
    "https://beebotsbackend.azurewebsites.net/api/overview"
  );
  const data = await res.json();

  const paths = data.map((bot) => ({
    params: { botname: bot.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true };
}
