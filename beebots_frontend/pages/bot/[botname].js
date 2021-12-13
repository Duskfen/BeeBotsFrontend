import { useRouter } from 'next/router'
import Spinner from '../../components/spinner';


export default function Bots({botname}) {
   const router = useRouter();
  // const {botname} = router.query;

   if (router.isFallback) {
    return <div style={{display:"flex", justifyContent:"center"}}><Spinner size="250px" /></div>
  }

   return (
    <>

      <p>botname: {botname}</p>
    </>
  )
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({params}) {
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

   //TODO FETCH Bot with name "params.botname"

   await delay(5000);

   console.error(params);

  return {
    props: {
     // posts,
     botname: params.botname
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 5, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  //const paths = posts.map((post) => ({
  //  params: { id: post.id },
  //}))
  const paths = [{params: {botname: "bertl"}}, {params: {botname: "josef"}}];

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true }
}

