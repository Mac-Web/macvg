import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function BannerAd({ banner = false, vertical = false }) {
  const adRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      try {
        while (adRef.current.firstChild) {
          adRef.current.removeChild(adRef.current.firstChild);
        }
      } catch (e) {
        console.error("Error clearing old ads:", e);
      }
    }
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "inline-block";
    ins.style.width = "800px";
    ins.style.height = "150px";
    ins.setAttribute("data-ad-client", "ca-pub-5598129470490010");
    ins.setAttribute("data-ad-slot", "2450831726");

    if (adRef.current && adRef.current.children.length === 0) {
      adRef.current.appendChild(ins);
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error: ", e);
    }
  }, [location]);

  return (
    <div className={`ad-container ${banner ? "ad-banner" : vertical ? "ad-vertical" : ""}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "800px", height: "150px" }}
        data-ad-client="ca-pub-5598129470490010"
        data-ad-slot="2450831726"
      ></ins>
    </div>
  );
}

export default BannerAd;
