import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Ad({ type }) {
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
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", "ca-pub-5598129470490010");
    ins.setAttribute("data-ad-slot", type);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");

    adRef.current.appendChild(ins);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error: ", e);
    }
  }, [location]);

  return (
    <div className="ad-container" ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5598129470490010"
        data-ad-slot={type}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default Ad;
