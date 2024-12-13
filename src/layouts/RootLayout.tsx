import { Outlet } from "react-router";
import Header from "./Header";
import ThemeButton from "./ThemeButton";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex w-[1440px] mx-auto">
        <Outlet />
      </main>
      <ThemeButton />
    </>
  );
}
