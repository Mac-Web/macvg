import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Cloaker() {
  const location = useLocation();
  const [cloaker, setCloaker] = useState(localStorage.getItem("macvg-cloaker") ? localStorage.getItem("macvg-cloaker") : "");
  const [favicon, setFavicon] = useState(localStorage.getItem("macvg-favicon") ? localStorage.getItem("macvg-favicon") : "");

  useEffect(() => {
    setCloaker(localStorage.getItem("macvg-cloaker") ? localStorage.getItem("macvg-cloaker") : "");
    setFavicon(localStorage.getItem("macvg-favicon") ? localStorage.getItem("macvg-favicon") : "");
    //TODO: finish favicon cloaker and search notclickable bug
    if (cloaker) {
      setTimeout(() => {
        document.title = cloaker;
      }, 100);
    }
    if (favicon) {
      const faviconLink = document.querySelector('link[rel="shortcut icon"]');
      faviconLink.href = favicon;
    }
  }, [location]);

  return null;
}

export default Cloaker;
