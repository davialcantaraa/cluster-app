"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ISignInFirstStepSchema,
  ISignInSecondStepSchema,
  signInFirstStepSchema,
  signInSecondStepSchema,
} from "~/lib/validation/auth";

export default function Page() {
  const [supabaseBrowser] = useState(() => createBrowserSupabaseClient());
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const router = useRouter();

  const firstStemForm = useForm<ISignInFirstStepSchema>({
    resolver: zodResolver(signInFirstStepSchema),
  });
  const secondStepForm = useForm<ISignInSecondStepSchema>({
    resolver: zodResolver(signInSecondStepSchema),
  });

  async function signInWithGitHub() {
    // setIsLoading(true);
    // const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
    //   provider: "github",
    //   options: {
    //     redirectTo: "http://localhost:3000/app",
    //   },
    // });
    // if (error) {
    //   toast.error("Error creating user.", { description: error.message });
    //   return setIsLoading(false);
    // }
    // return setIsLoading(false);
  }

  async function handleSubmitFirstStepForm(data: ISignInFirstStepSchema) {
    // secondStepForm.setValue("email", data.email);
    // secondStepForm.setFocus("password");
    // setFormStep(1);
  }

  async function handleSubmitSecondStepFormAndLogin({
    email,
    password,
  }: ISignInSecondStepSchema) {
    // setIsLoading(true);
    // const { data, error } = await supabaseBrowser.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error) {
    //   toast.error("Error logging in.", { description: error.message });
    //   return setIsLoading(false);
    // }
    // router.push("/app");
    // return setIsLoading(false);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="absolute top-0 right-0 p-4">
        <Link href="/signup">
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:brightness-50 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
            onClick={signInWithGitHub}
          >
            <div
              className="absolute right-0 top-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
              style={{
                background:
                  "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
              }}
            />
            Sign up
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
        </Link>
      </header>
      <section className="mx-auto w-full max-w-[450px]">
        <h1 className="text-slate-12 mt-8 mb-1.5 text-xl font-bold tracking-[-0.16px] text-gray-300">
          Sign in to Cluster App
        </h1>
        <button
          type="button"
          className="relative mt-8 inline-flex w-full items-center justify-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:brightness-50 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
          onClick={signInWithGitHub}
          disabled={isLoading}
        >
          <div
            className="absolute right-0 top-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
            }}
          />
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
          Continue with Github
          <div
            className="absolute left-0 bottom-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
            }}
          />
        </button>
        <button
          type="button"
          className="relative mt-8 inline-flex w-full items-center justify-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:brightness-50 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
          disabled={isLoading}
        >
          <div
            className="absolute right-0 top-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
            }}
          />
          <svg
            className="mr-2 -ml-1 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Continue with Google
          <div
            className="absolute left-0 bottom-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
            style={{
              background:
                "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
            }}
          />
        </button>
        <form
          className="mt-8"
          onSubmit={firstStemForm.handleSubmit(handleSubmitFirstStepForm)}
        >
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
            {...firstStemForm.register("email")}
          />
          {firstStemForm.formState.errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {firstStemForm.formState.errors.email.message}
            </p>
          )}
          <button
            type="submit"
            className={`relative mt-4 w-full items-center justify-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:brightness-50 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700 ${
              formStep === 1 ? "hidden" : "inline-flex "
            }`}
            disabled={isLoading}
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
        </form>
        {formStep === 1 && (
          <form
            onSubmit={secondStepForm.handleSubmit(
              handleSubmitSecondStepFormAndLogin
            )}
          >
            <label
              htmlFor="password"
              className="mb-2 mt-4 block text-sm font-medium text-gray-300 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-300 p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-500  focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-500"
              placeholder="•••••••••"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              required
              {...secondStepForm.register("password")}
            />
            {secondStepForm.formState.errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {secondStepForm.formState.errors.password.message}
              </p>
            )}
            <button
              type="submit"
              className="relative mt-8 inline-flex w-full items-center justify-center rounded-lg border-[1px] border-gray-300/10 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:brightness-50 hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-700 dark:hover:bg-gray-700"
              disabled={isLoading}
            >
              <div
                className="absolute right-0 top-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
                }}
              />
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-3 inline h-4 w-4 animate-spin text-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
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
                </>
              )}
              <div
                className="absolute left-0 bottom-0 h-px w-3/4 bg-gradient-to-r from-gray-100 to-gray-50"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0) 0%, rgba(232, 232, 232, 0.2) 33.02%, rgba(143, 143, 143, 0.6719) 64.41%, rgba(236, 72, 153, 0) 98.93%)",
                }}
              />
            </button>
          </form>
        )}
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
      </section>
    </main>
  );
}
