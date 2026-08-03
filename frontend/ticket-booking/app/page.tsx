import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <Image
        src="/welcome.webp"          
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
        sizes="100vw"
      />


      <div className="flex items-center justify-center min-h-screen">
        <Link href="/profiles/user">
          <button
            type="button"
            className="px-3 py-2 rounded-lg font-mono text-black font-bold text-7xl  shadow-md 
             bg-white hover:bg-black cursor-pointer hover:text-white"
          >
            PRESS HERE TO ENTER
          </button>
        </Link>
      </div>
    </div>
  );
}