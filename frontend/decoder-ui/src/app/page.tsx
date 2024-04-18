import { CustomBody } from "@/components/custom-body";
import { CustomHeader } from "@/components/header";

export default function Home() {
  const BACKEND_URL = process.env.BACKEND_URL
  const API_STREAM_PATH = '/decipher_stream'

  return (
    <main className="flex max-w-screen h-fit flex-col items-center justify-between bg-[#f2f4f7]">
      <CustomHeader/>
      <CustomBody backendUrl={BACKEND_URL} apiStreamPath={API_STREAM_PATH}/>
    </main>
  );
}
