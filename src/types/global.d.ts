declare module "flowbite/plugin";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};
