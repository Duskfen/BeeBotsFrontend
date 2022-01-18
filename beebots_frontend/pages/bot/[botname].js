import { useRouter } from "next/router";
import Spinner from "../../components/spinner";

export default function Bots({ botdetails, botname, botsId }) {
  const router = useRouter();
  // const {botname} = router.query;

  if (router.isFallback) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner size="250px" />
      </div>
    );
  }

  return (
    <>
      <p>botname: {botname}</p>
      <p>tempdata: {JSON.stringify(botdetails)}</p>
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
export async function getStaticProps({ params }) {

  const res = await fetch(
      "https://beebotsbackend.azurewebsites.net/api/statisticsDuration", {body: JSON.stringify({"botId":params.botname, "duration":1}), method: "POST"}
   );
 const data = await res.json();
 console.log(data);

  return {
    props: {
      // posts,
      botdetails: data,
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
