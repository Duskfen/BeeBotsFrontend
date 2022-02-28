import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardItem from "../../components/dashboardItem";
import Spinner from "../../components/spinner";
import styles from "./[botname].module.scss";
import * as d3 from "d3";

export default function Bots({ details, botname, botsId, details7d }) {
  const router = useRouter();

  const [botdetails, setBotdetails] = useState(details);

  useEffect(() => {
    if (details7d) {
      drawNormalProfitChart(details7d);
    }

    drawTradesChart();

    return () => {
      console.log("Component onUnmount");
    };
  }, []);

  if (router.isFallback) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner size="250px" />
      </div>
    );
  }

  function drawTradesChart() {
    // set the dimensions and margins of the graph
    const width = 450,
      height = 450,
      margin = 50;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    d3.select("#myTradesChart").selectAll("*").remove();

    const svg = d3
      .select("#myTradesChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

      console.log(botdetails)

    let data = botdetails.map((d) => {
      return {
        success:  d.countCorrect+1,
        fail:  d.countWrong+1,
        even:  d.countBreakEven+1,
      };
    }); //success: 3, fail: 1, even:1

    data = data.reduce((a, b) => {
      return {
        success: a.success + b.success,
        fail: a.fail + b.fail,
        even: a.even + b.even,
      };
    });


    console.log(data);

    const color = d3
      .scaleOrdinal()
      .domain(["success", "fail", "even"])
      .range(["#27ae60", "#e74c3c", "#f1c40f"]);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d) => d[1]);
    const data_ready = pie(Object.entries(data));

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => {
         if(d.data[0] ==="success"){
            return "#27ae60";
         }
         else if (d.data[0] ==="fail"){
            return "#e74c3c";
         }
         else if (d.data[0] ==="even"){
            return "#f1c40f";
         }
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .join("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d) {
        const posA = arc.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .join("text")
      .text((d) => d.data[0])
      .attr("transform", function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }

  function drawNormalProfitChart(data) {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    d3.select("#myNormalProfitChart").selectAll("*").remove();

    const svg = d3
      .select("#myNormalProfitChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.date))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.map((d) => d.totalProfit)))
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // ----------------
    // Create a tooltip
    // ----------------
    var tooltip = d3
      .select("#myNormalProfitChart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (event, d) {
      tooltip
        .html("<p>Value: " + d.totalProfit * 100 + "%</p>")
        .style("opacity", 1);
    };
    var mousemove = function (d) {
      tooltip
        .style("left", d3.pointer(this)[0] + 90 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", d3.pointer(this)[1] + "px");
    };
    var mouseleave = function (d) {
      tooltip.style("opacity", 0);
    };

    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.date))
      .attr("y", (d) => y(d.totalProfit * 100))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.totalProfit))
      .attr("fill", (d) => {
        if (d.totalProfit > 0) {
          return "#27ae60";
        }
        if (d.totalProfit < 0) {
          return "#e74c3c";
        } else return "#f1c40f";
      })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }

  return (
    //  <>
    //    <p>botname: {botname}</p>
    //    <p>tempdata: {JSON.stringify(botdetails)}</p>
    //  </>
    <>
      <h1>Dashboard: {botname}</h1>
      <div className={styles.itemWrapper}>
        <DashboardItem
          title={"General"}
          onTimeSpanChange={(e) => console.log("timespan", e)}
          use2Times={false}
        >
          <div className={styles.GeneralBoxRow}>
            <p>Profit:</p>
            <p>{botdetails[0]?.totalProfit * 10}%</p>
          </div>

          <div className={styles.GeneralBoxRow}>
            <p>Trades:</p>
            <p>
              {botdetails[0]?.countWrong +
                botdetails[0]?.countCorrect +
                botdetails[0]?.countBreakEven}
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

        <DashboardItem
          title={"General"}
          onTimeSpanChange={(e) => console.log("timespan", e)}
          onTimeSpan2Change={(e) => console.log("timespan", e)}
          use2Times={true}
        >
          <div id="myNormalProfitChart"></div>
        </DashboardItem>

        <DashboardItem
          title={"Trades"}
          onTimeSpanChange={(e) => console.log("timespan", e)}
        >
          <div id="myTradesChart"></div>
        </DashboardItem>
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
//import * as mongoDB from "mongodb";
export async function getStaticProps({ params }) {
  const res = await fetch(
    "https://beebotsbackend.azurewebsites.net/api/details",
    {
      method: "POST",
      body: JSON.stringify({ Name: params.botname, Duration: 1 }),
    }
  );
  let data = await res.json();

  const res7d = await fetch(
    "https://beebotsbackend.azurewebsites.net/api/details",
    {
      method: "POST",
      body: JSON.stringify({ Name: params.botname, Duration: 7 }),
    }
  );
  let data7d = await res7d.json();

  /*
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

  data = await Promise.all(await data.map(async (bot) => {
      let btcarray = await btcHistory.find({
        // timeStamp: {
        // $gte: new Date(bot.date).getTime() + 3600000*23,
        // $lt: new Date(bot.date).getTime() + 3600000*24,
        // },
      }).sort({timestamp:-1}).toArray();
      if(btcarray.length > 1){
         bot.btcProfit = (btcarray[btcarray.length-1].price/btcarray[0].price)-1; //0 -> most recent
         console.log(bot.btcProfit);
         console.log(btcarray[btcarray.length-1])
         console.log(btcarray[0]);
      }
      else bot.btcProfit = -404;
      return bot;
  }));
  console.log("test", data)*/

  return {
    props: {
      details: data,
      botname: params.botname,
      details7d: data7d,
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
