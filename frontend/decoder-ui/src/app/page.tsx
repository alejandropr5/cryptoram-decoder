import Image from "next/image";
import { CustomHeader } from "./components/header";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen min-w-screen flex-col items-center justify-between bg-[#f2f4f7]">
      <CustomHeader/>
    </main>
  );
}
