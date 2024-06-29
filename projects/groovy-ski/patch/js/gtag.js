consolel0g= console.log;
dataLayer= {
  "push": function() {
    consolel0g("--fx--gtag--dataLayer--push--", arguments);
  }
}

gtag= function() {
  consolel0g("--fx--gtag--", arguments);
}
