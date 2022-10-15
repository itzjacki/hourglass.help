import type { NextPage } from 'next';
import Head from 'next/head';
import Game from '../components/Game';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col h-[100vh]'>
      <Head>
        <title>
          Hourglass.help - the grooviest Zhonya&apos;s Hourglass timing trainer
        </title>
        <meta
          name='description'
          content="The grooviest Zhonya's Hourglass timing trainer"
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-slate-600 flex-grow flex flex-col'>
        <h1 className='text-4xl text-center text-gray-300 my-4'>
          Hourglass.help
        </h1>
        <div className='grid place-items-center flex-grow text-gray-300'>
          <Game />
        </div>
      </main>

      <footer className='grid place-items-center w-full bg-slate-700'>
        <p className='p-8'>Powered by 🖤</p>
      </footer>
    </div>
  );
};

export default Home;
