import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-white">Filmder</h1>
          <Link
            href="/auth?tab=login"
            className="text-sm font-semibold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 text-black dark:text-white text-sm font-medium">
              Find Your Next Movie
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black dark:text-white">
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
          <h3 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            How It Works
          </h3>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
                  Tell Us Your Taste
                </h4>
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
                <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
                  Swipe Left or Right
                </h4>
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
                <h4 className="text-xl font-bold mb-2 text-black dark:text-white">Watch & Enjoy</h4>
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
          <h3 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            Why Filmder?
          </h3>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2 text-black dark:text-white">Quick Decisions</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find the perfect movie in just 2 minutes
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2 text-black dark:text-white">For Couples</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find common ground and match on movies you both love
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2 text-black dark:text-white">
                Smart Recommendations
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our algorithm learns your preferences
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2 text-black dark:text-white">Mobile First</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Perfect experience on your phone, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">
            Ready for Movie Night?
          </h3>
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

      <footer className="py-8 px-6 border-t border-black/10 dark:border-white/10 text-center text-gray-600 dark:text-gray-400 text-sm">
        <div className="max-w-md mx-auto">
          <p>© 2026 Filmder. Making movie night decisions easy.</p>
        </div>
      </footer>
    </main>
  );
}
