import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login · Cluster App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <section className="mx-auto w-full max-w-[450px]">
          <h1 className="text-slate-12 mt-8 mb-1.5 text-xl font-bold tracking-[-0.16px] text-gray-300">
            Sign in to Cluster App
          </h1>
          <form className="mt-8">
            <label
              htmlFor="helper-text"
              className="mb-2 block text-sm font-medium text-gray-300 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="block w-full rounded-lg border border-gray-300 bg-gray-300 p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-500  focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-500"
              placeholder="name@flowbite.com"
            />
            <button
              type="button"
              className="relative mt-4 inline-flex w-full items-center justify-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <div
                className="absolute right-0 top-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
                }}
              />
              Continue
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div
                className="absolute left-0 bottom-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
                }}
              />
            </button>
            <p
              id="helper-text-explanation"
              className="mt-8 text-xs text-gray-500 dark:text-gray-400"
            >
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </section>
      </main>
    </>
  );
};

export default Home;
