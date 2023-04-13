import { Toast } from "~/components/toast";
import { LayoutProps } from "~/types/global";

export default function AuthenticationLayout({ children }: LayoutProps) {
  return (
    <>
      <Toast />
      <div className="min-h-screen">{children}</div>
    </>
  );
}
