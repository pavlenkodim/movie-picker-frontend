import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import Header from "@/shared/ui/Header";
import { LogIn } from "lucide-react";
import packageJson from "../../../package.json";

export default async function Home() {
  const session = await getServerSession(options);
  const appVersion = packageJson.version;

  return (
    <div className="w-full min-h-screen">
      <Header
        right={
          !session && (
            <Link
              href="/auth?tab=login"
              className="text-sm font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition"
            >
              <LogIn />
            </Link>
          )
        }
      />

      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20   text-sm font-medium">
              Find Your Next Movie
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight  ">
            Swipe Movies Like
            <span className="block">Tinder</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Tired of endless scrolling? Just swipe through movies and shows to find the perfect one
            for tonight
          </p>

          <Link
            href="/auth?tab=register"
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-lg cursor-pointer"
          >
            Get Started Now
          </Link>

          <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
            Free. 5 swipes without signup
          </p>
        </div>
      </section>

      <section className="py-20 px-6 ">
        <div className="max-w-md mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Tell Us Your Taste</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Pick your favorite genres, mood, and streaming platform
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Swipe Left or Right</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Love it? Swipe right Nope? Swipe left Just like Tinder!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Watch & Enjoy</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Get personalized recommendations that you and your partner will love
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Filmder?</h3>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">Quick Decisions</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find the perfect movie in just 2 minutes
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">For Couples</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find common ground and match on movies you both love
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">Smart Recommendations</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our algorithm learns your preferences
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">Mobile First</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Perfect experience on your phone, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready for Movie Night?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of people who already found their perfect movies
          </p>

          <Link
            href="/auth?tab=register"
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-lg cursor-pointer mb-4"
          >
            Start Swiping Now
          </Link>

          <p className="text-gray-500 dark:text-gray-500 text-xs">
            No spam, just great recommendations
          </p>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-black/10 dark:border-white/10 text-center text-gray-600 dark:text-gray-400 text-sm pb-20">
        <div className="max-w-md mx-auto">
          <p>Making movie night decisions easy.</p>
          <p>© 2026 Filmder v{appVersion}</p>
        </div>
      </footer>
    </div>
  );
}
