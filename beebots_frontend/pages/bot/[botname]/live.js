import Head from "next/head";
import Box from "../../../components/box";
import { useRouter } from "next/router";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function LivebotView() {
  const router = useRouter();
  const test = router.query;
  const timeFormat = d3.timeFormat("%Y-%m-%d %H:%M:%S");

  const [data, setData] = useState([
    { date: "2022-03-22 06:39:23", profit: 0.2 },
    { date: "2022-03-22 07:40:23", profit: 0.4 },
    { date: "2022-03-22 08:41:23", profit: -0.2 },
    { date: "2022-03-22 09:42:23", profit: 0.11 },
    { date: "2022-03-22 10:43:23", profit: -0.3 },
    { date: "2022-03-22 11:44:23", profit: 0 },
  ]);

  // lakjsdfö alsdj föalsdjf öalsdjf aölsdj f
//   const margin = { top: 60, right: 30, bottom: 60, left: 60 };
//   let width = window.innerWidth - margin.left - margin.right-50, //1024
//     height = window.innerHeight - margin.top - margin.bottom - 250;

//   if (window.innerWidth > 1024) {
//     width = 1024 - margin.left - margin.right-50;
//   }

  //   //x domain fehlt

  //   const x = d3
  //       .scaleTime()
  //       .range([0, width]);
  //     svg
  //       .append("g")
  //       .attr("transform", `translate(0, ${height})`)
  //       .call(d3.axisBottom(x).ticks(d3.timeHour).tickFormat(timeFormat))
  //       .selectAll("text")
  //       .attr("transform", "translate(-10,0)rotate(-45)")
  //       .style("text-anchor", "end");

  //     // Add Y axis
  //     const y = d3
  //       .scaleLinear()
  //       .domain([
  //         0,
  //         d3.max(gdata, function (d) {
  //           return +d.value;
  //         }),
  //       ])
  //       .range([height, 0]);
  //     svg.append("g").call(d3.axisLeft(y));

  //   var svg = d3
  //     .select("#my_dataviz")
  //     .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //   // asdjlf öalsjdf öalsjd föaljsdf ölaskjd öalksjdf

  useEffect(() => {
    const getdatainterval = setInterval(() => getData(), 8000);
    const handleResize = () => drawInvestedChart(data);
    window.addEventListener("resize", handleResize);

    drawInvestedChart(data);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(getdatainterval);
    };
  }, []);

  useEffect(() => {
    drawInvestedChart(data);
  }, [data]);

  function getData() {
    console.log("refresh data");
    let newData = [];
    for (let i = 0; i < 23; i++) {
      newData.push({
        date: "2022-03-22 " + (i + 1) + ":39:23",
        profit: Math.random(),
      });
    }
    setData(newData);
  }

  function initInvestedChart() {}

  function drawInvestedChart(botdetails) {
    const margin = { top: 60, right: 30, bottom: 60, left: 60 };
    let width = window.innerWidth - margin.left - margin.right-50, //1024
      height = window.innerHeight - margin.top - margin.bottom - 250;

    if (window.innerWidth > 1024) {
      width = 1024 - margin.left - margin.right-50;
    }

    d3.select("#myInvestmentChart").selectAll("*").remove();

    const svg = d3
      .select("#myInvestmentChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let gdata = [];
    let mymoney = 1;

    if (!botdetails) {
      return;
    }
    let test = [...botdetails];

    for (let i of test) {
      gdata.push({
        date: d3.timeParse("%Y-%m-%d %H:%M:%S")(i.date),
        value: mymoney * (1 + i.profit),
      });
      mymoney = mymoney * (1 + i.profit);
    }

    gdata.push({
      date: d3.isoParse(
        new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 1).toISOString()
      ),
      value: 1,
    });

    gdata.sort((a, b) => a.date - b.date);

    if (gdata.length < 1) {
      d3.select("#myInvestmentChart").selectAll("*").remove();
      d3.select("#myInvestmentChart").append("p").text("Not enough Data");
      return;
    }

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(gdata, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeHour).tickFormat(timeFormat))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(gdata, function (d) {
          return +d.value;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    var u = svg.selectAll(".lineTest").data([gdata], function (d) {
      return d.date;
    });

    // Updata/draw the line
    u.enter()
      .append("path")
      .attr("class", "lineTest")
      .merge(u)
      .transition()
      .duration(1000)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.value);
          })
      )
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5);

    var bisect = d3.bisector(function (d) {
      return d.date;
    }).left;

    var selectedData = null;

    // Create the circle that travels along the curve of chart
    var focus = svg
      .append("g")
      .append("circle")
      .style("fill", "none")
      .attr("stroke", "black")
      .attr("r", 8.5)
      .style("opacity", 0);

    var focusText = d3
      .select("#myInvestmentChart")
      .append("div")
      .style("opacity", "0")
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
    //
    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
      .append("rect")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("width", width)
      .attr("height", height)
      .data(gdata)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    function mouseover() {
      focus.style("opacity", 1);
      focusText.style("opacity", 1);
    }

    function mousemove(e) {
      // recover coordinate we need
      var x0 = x.invert(d3.pointer(e)[0]);
      var i = bisect(gdata, x0, 1);
      selectedData = gdata[i];
      focus
        .attr("cx", x(selectedData?.date))
        .attr("cy", y(selectedData?.value));
      focusText
        .html(
          "<p>Profit: " +
            (selectedData?.value * 100).toFixed(2) +
            "%</p><p>Date: " +
            timeFormat(selectedData?.date) +
            "</p>"
        )
        .style("opacity", "1");
    }
    function mouseout() {
      focus.style("opacity", 0);
      focusText.style("opacity", 0);
    }
  }

  return (
    <>
      <Head>
        <title>livebot</title>
        <meta name="description" content="Live view of a bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="myInvestmentChart"></div>
    </>
  );
}
