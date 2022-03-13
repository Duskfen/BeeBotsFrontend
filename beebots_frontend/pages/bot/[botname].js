import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardItem from "../../components/dashboardItem";
import Spinner from "../../components/spinner";
import styles from "./[botname].module.scss";
import * as d3 from "d3";

export default function Bots({ details, botname, botsId, details7d }) {
  const router = useRouter();

  const [overviewDetails, setOverviewDetails] = useState(details);
  const [profitDetails, setProfitDetails] = useState(details7d);
  const [circleDetails, setCircleDetails] = useState(details);

  const [profitDetailsClusterSize, setProfitDetailsClusterSize] = useState(1);
  const [countDataRows, setCountDataRows] = useState(7);

  async function fetchData(duration) {
    const res = await fetch(
      "https://beebotsbackend.azurewebsites.net/api/details",
      {
        method: "POST",
        body: JSON.stringify({ Name: botname, Duration: duration }),
      }
    );
    return await res.json();
  }

  useEffect(() => {
    drawNormalProfitChart(profitDetails, profitDetailsClusterSize, countDataRows );
  }, [profitDetails, profitDetailsClusterSize, countDataRows]);

  useEffect(() => {
    drawTradesChart(circleDetails);
  }, [circleDetails]);

  useEffect(() => {
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

  function drawTradesChart(botdetails) {
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

    let data = botdetails.map((d) => {
      return {
        success: d.countCorrect,
        fail: d.countWrong,
        //  even:  d.countBreakEven,
      };
    }); //success: 3, fail: 1, even:1

    if (data.length === 0) {
      return;
    }

    data = data.reduce((a, b) => {
      return {
        success: a.success + b.success,
        fail: a.fail + b.fail,
       // even: a.even + b.even,
      };
    });

    if(data.success == 0 && data.fail == 0) {
      d3.select("#myTradesChart").selectAll("*").remove();;
      d3.select("#myTradesChart").append("p").text("No successfull or failed trades in this timespan");
      return;
    }

    const color = d3
      .scaleOrdinal()
      .domain(["success", "fail"])
      .range(["var(--good)", "var(--bad)"]);
    // .domain(["success", "fail", "even"])
    // .range(["#27ae60", "#e74c3c", "#f1c40f"]);

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
        if (d.data[0] === "success") {
          return "var(--good)";
        } else if (d.data[0] === "fail") {
          return "var(--bad)";
        } else if (d.data[0] === "even") {
          return "var(--warning)";
        }
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")

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

  function drawNormalProfitChart(data, clustersize, datarows) {

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    let newdata = [];
    for (let i = 0; i < data.length; i++) {
      if (i % clustersize === 0) {
        newdata.push({ totalProfit: data[i].totalProfit, date: new Date(data[i].date).toLocaleDateString() });
      } else {
        newdata[newdata.length - 1].totalProfit =
          (1 + newdata[newdata.length - 1].totalProfit) *
          (1 + data[i].totalProfit);
      }
    }

    let lastdate = new Date(data[data.length - 1].date);
    for(let i = newdata.length-1; i < datarows; i++){
      lastdate.setDate(lastdate.getDate() - 1);

      if (i % clustersize === 0) {
         newdata.push({ totalProfit: 0, date: lastdate.toLocaleDateString() });
       }
       else {
         newdata[newdata.length - 1].totalProfit =
           (1 + newdata[newdata.length - 1].totalProfit) *
           (1);
       }
    }
    data = newdata.reverse();

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

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.map((d) => d.totalProfit)))
      .range([height, 0]);

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
        .html("<p>Profit: " + d.totalProfit * 100 + "%</p><p>Date: " + d.date + "</p>")
        .style("opacity", 1);
    };
    var mouseleave = function (d) {
      tooltip.style("opacity", 0);
    };

    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.date))
      .attr("y", (d) => { 
         if(d.totalProfit > 0) return y(d.totalProfit);
         else return y(0);
      })
      .attr("width", x.bandwidth())
      .attr("height", (d) => {
         if(d.totalProfit > 0) return y(0) - y(d.totalProfit);
         else return y(d.totalProfit) - y(0);      
      }) 
      .attr("fill", (d) => {
        if (d.totalProfit > 0) {
          return "#27ae60";
        }
        if (d.totalProfit < 0) {
          return "#e74c3c";
        } else return "#f1c40f";
      })
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave);

      
    svg
    .append("g")
    .attr("transform", `translate(0, ${y(0)})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g").call(d3.axisLeft(y));
  }

  let overViewExtracted = {countCorrect: 0, countWrong: 0, countBreakEven:0, totalProfit: 0}
  for(let i of overviewDetails.reverse()){
    console.log(overViewExtracted.totalProfit)
    overViewExtracted.totalProfit = (1+overViewExtracted.totalProfit)*(1+i.totalProfit)-1
    overViewExtracted.countCorrect += i.countCorrect + overViewExtracted.countCorrect;
    overViewExtracted.countWrong += i.countWrong
    overViewExtracted.countBreakEven += i.countBreakEven;
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
          onTimeSpanChange={async (e) =>
            setOverviewDetails(await fetchData(+e))
          }
          use2Times={false}
        >
          <div className={styles.GeneralBoxRow}>
            <p>Profit:</p>
            <p>{overViewExtracted.totalProfit * 100}%</p>
          </div>

          <div className={styles.GeneralBoxRow}>
            <p>Trades:</p>
            <p>
              {overViewExtracted.countWrong +
                overViewExtracted.countCorrect +
                overViewExtracted.countBreakEven}
            </p>
          </div>
        </DashboardItem>

        <DashboardItem
          title={"Profit"}
          onTimeSpanChange={async (e) => {setProfitDetails(await fetchData(+e)); setCountDataRows(+e) }} //days of data
          use2Times={false}
          availableTimeSpans={[7, 30, 90]}
          // onTimeSpanChange={(e) => setProfitDetailsClusterSize(+e)} //days of data
          // onTimeSpan2Change={async (e) => {setProfitDetails(await fetchData(+e)); setCountDataRows(+e) }} //days of data
          // use2Times={true}
        >
          <div id="myNormalProfitChart"></div>
        </DashboardItem>

        <DashboardItem
          title={"Trades"}
          onTimeSpanChange={async (e) => setCircleDetails(await fetchData(+e))}
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
