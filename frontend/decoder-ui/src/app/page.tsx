import { CustomBody } from "./components/custom-body";
import { CustomHeader } from "./components/header";

export default function Home() {
  return (
    <main className="flex max-w-screen h-fit flex-col items-center justify-between bg-[#f2f4f7]">
      <CustomHeader/>
      <CustomBody/>
    </main>
  );
}
