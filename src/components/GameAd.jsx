import { useEffect } from "react";

function GameAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error: ", e);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5598129470490010"
        data-ad-slot="3901218615"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    
  );
}

export default GameAd;
