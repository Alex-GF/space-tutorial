import Header from "../components/Header";
import LeftAd from "../components/LeftAd";
import ArticleSection from "../components/ArticleSection";
import RightAd from "../components/RightAd";
import {
  Default,
  Feature,
  On,
  usePricingToken,
} from "space-react-client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomAd from "../components/BottomAd";

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const tokenService = usePricingToken();

  useEffect(() => {
    fetch(`/api/health`).then(async (res) => {
      tokenService.updatePricingToken(res.headers.get("PricingToken") || "");
      setLoading(false);
    });
  }, [tokenService]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Ad */}
          <AnimatePresence>
            <Feature id="news-sideAds">
              <On>
                <LeftAd />
              </On>
            </Feature>
          </AnimatePresence>

          {/* Main Content */}
          <Feature id="news-news">
            <On>
              <ArticleSection containerClassName="lg:col-span-8" />
            </On>
            <Default>
              <ArticleSection containerClassName="lg:col-span-12" />
            </Default>
          </Feature>

          {/* Right Sidebar Ad */}
          <AnimatePresence>
            <Feature id="news-sideAds">
              <On>
                <RightAd />
              </On>
            </Feature>
          </AnimatePresence>
        </div>

        {/* Bottom Banner Ad */}
        <AnimatePresence>
          <Feature id="news-sideAds">
            <On>
              <BottomAd />
            </On>
          </Feature>
        </AnimatePresence>
      </main>
    </div>
  );
}
