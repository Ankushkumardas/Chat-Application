import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const HeroBadge = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
    <svg
      className="w-3 h-3"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        />
    </svg>
    {children}
  </div>
);

const Home = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-7xl mx-auto px-6 py-30">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <HeroBadge>New — Beta available</HeroBadge>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
              The Chat experience your product needs
            </h1>

            <p className="mt-4 text-gray-700 max-w-xl">
              Secure, realtime messaging with intelligent features — search,
              moderation, and conversation summaries. Built for teams and
              products who need reliable chat.
            </p>

            <div className="mt-6 flex gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-md bg-green-600 text-white font-semibold"
                onClick={() => navigate("/message")}
              >
                Get Started
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-md border border-gray-200 text-gray-800 bg-white"
              >
                Learn More
              </motion.button>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mx-auto max-w-md md:max-w-none md:w-[520px] lg:w-[680px]">
              <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-28 h-6 bg-gray-100 rounded-md" />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 bg-gray-50 p-3 rounded-lg">
                    <div className="h-10 bg-gray-100 rounded mb-3" />
                    <div className="space-y-2">
                      <div className="h-8 bg-gray-100 rounded" />
                      <div className="h-8 bg-gray-100 rounded w-5/6" />
                      <div className="h-8 bg-gray-100 rounded w-4/6" />
                    </div>
                  </div>

                  <div className="col-span-8 bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-3 w-40 bg-gray-100 rounded" />
                      <div className="h-3 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="h-64 bg-white rounded-lg p-4 overflow-hidden border border-gray-100">
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                        <div className="h-3 bg-gray-100 rounded w-1/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 left-6 w-56 p-4 rounded-xl bg-white border border-gray-200 shadow">
                <div className="text-sm text-gray-600">Analytics</div>
                <div className="mt-2 text-2xl font-bold text-gray-900">90%</div>
                <div className="text-xs text-gray-500">Active engagement</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-gray-900">
                Realtime Messaging
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Low latency, reliable delivery with typing indicators and read
                receipts.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-gray-900">AI Summaries</h3>
              <p className="text-sm text-gray-600 mt-2">
                Auto-generated conversation summaries to catch up quickly.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-semibold text-gray-900">
                Moderation & Safety
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Built-in moderation tools and content filters to keep
                communities safe.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;
