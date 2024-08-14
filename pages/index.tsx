import Timeline from '@/components/Timeline';
import Head from 'next/head'
import Image from "next/image";


export default function Home() {
  return (
    <>
    <Head>
      <title>SNS</title>
      <meta name="description" content="sns by next.js" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      <Timeline />
    </div>

    </>
  );
}
