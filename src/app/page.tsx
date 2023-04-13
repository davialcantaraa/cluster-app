export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="stars absolute inset-0 z-0 min-h-screen w-screen bg-no-repeat"></div>
      <header className="relative z-10">
        <nav className="x-2 py-6 dark:bg-gray-900 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-24 text-gray-300 md:gap-48">
            <a href="https://flowbite.com/" className="flex items-center">
              <h3 className="text-xl font-extrabold">Cluster</h3>
            </a>
            <div className="w-auto" id="navbar-default">
              <ul className="flex items-center gap-6 rounded-lg dark:bg-gray-800 md:mt-0 md:space-x-8 md:text-sm md:font-medium md:dark:bg-gray-900">
                <li>
                  <a
                    href="#"
                    className="block rounded text-gray-300 dark:text-gray-300 md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-gray-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center rounded text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-gray-300"
                  >
                    <svg
                      className="mr-2 -ml-1 h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="github"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path
                        fill="currentColor"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section className="relative z-10 mx-4 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-center font-sans text-4xl font-extrabold text-gray-300 dark:text-gray-300 md:text-5xl lg:text-6xl">
          The open source{" "}
          <span className="bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent">
            all-in-one
            <br />
          </span>{" "}
          workspace
        </h1>
        <p className="max-w-xl text-center text-lg font-normal text-gray-400 lg:text-xl">
          <span className="text-gray-300">Cluster</span> is a open source
          Notion-like alternative. Combine documents, calendars, tasks and such
          more.
        </p>
        <button
          type="button"
          className="relative mt-4 inline-flex items-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
        >
          <div
            className="absolute right-0 top-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
            }}
          />
          Getting started
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
            ></path>
          </svg>
          <div
            className="absolute left-0 bottom-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
            }}
          />
        </button>
      </section>
      <footer className="z-10 flex h-[80px] items-center justify-center text-center font-extralight text-gray-300">
        Created by{" "}
        <a
          href=""
          className="ml-2 flex items-center gap-2 font-light text-white"
        >
          <img
            className="h-6 w-6 rounded-full"
            src="https://github.com/davialcantaraa.png"
            // width={24}
            // height={24}
            alt="Rounded avatar"
          />
          Davi Alcântara
        </a>
      </footer>
    </main>
  );
}
