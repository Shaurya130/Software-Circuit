import HeroSectionHeader from "@/app/components/HeroSectionHeader";
import LatestQuestin from "@/app/components/LatestQuestin";
import TopContributor from "@/app/components/TopContributor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-zinc-900">
      <main className="flex flex-col items-center justify-center flex-1 w-full px-6 py-16 md:py-24">
        <section className="w-full max-w-6xl mx-auto mb-16">
          <HeroSectionHeader />
        </section>
        <section className="w-full max-w-5xl mx-auto py-16 px-8 md:px-12 bg-black/60 backdrop-blur-sm rounded-3xl shadow-2xl mb-12 border border-zinc-700/50">
          <h2 className="text-3xl font-bold mb-10 text-neutral-100 text-center tracking-tight">Latest Questions</h2>
          <LatestQuestin />
        </section>
        <section className="w-full max-w-5xl mx-auto py-16 px-8 md:px-12 bg-black/60 backdrop-blur-sm rounded-3xl shadow-2xl mb-8 border border-zinc-700/50">
          <h2 className="text-3xl font-bold mb-10 text-neutral-100 text-center tracking-tight">Top Contributors</h2>
          <TopContributor />
        </section>
        {/* <div className="my-12 flex gap-6 justify-center">
          <Link href="/login" className="px-8 py-4 rounded-xl bg-gradient-to-br from-black to-neutral-700 text-white font-bold shadow-lg hover:scale-105 transition-all dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900">
            Login
          </Link>
          <Link href="/register" className="px-8 py-4 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 text-white font-bold shadow-lg hover:scale-105 transition-all">
            Register
          </Link>
        </div> */}
      </main>
    </div>
  );
}