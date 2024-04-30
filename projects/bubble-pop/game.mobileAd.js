var MobileAdInGamePreroll = {
  ad_duration: _SETTINGS.Ad.Mobile.Preroll.Duration,
  ad_width: _SETTINGS.Ad.Mobile.Preroll.Width,
  ad_height: _SETTINGS.Ad.Mobile.Preroll.Height,
  ready_in: _STRINGS.Ad.Mobile.Preroll.ReadyIn,
  loading: _STRINGS.Ad.Mobile.Preroll.Loading,
  close: _STRINGS.Ad.Mobile.Preroll.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  Initialize: function() {
      if (_SETTINGS.Ad.Mobile.Preroll.Rotation.Enabled) {
          var b = _SETTINGS.Ad.Mobile.Preroll.Rotation.Weight
            , c = b.MobileAdInGamePreroll
            , d = c + b.MobileAdInGamePreroll2
            , b = d + b.MobileAdInGamePreroll3
            , e = Math.floor(100 * Math.random());
          console.log("seed: ", e);
          e <= c ? this.selectedOverlayName = "MobileAdInGamePreroll" : e <= d ? this.selectedOverlayName = "MobileAdInGamePreroll2" : e <= b && (this.selectedOverlayName = "MobileAdInGamePreroll3");
          console.log("Ad rotating preroll enabled")
      } else
          this.selectedOverlayName = "MobileAdInGamePreroll",
          console.log("Ad rotating preroll disabled");
      console.log("selected:", this.selectedOverlayName);
      this.overlay = $("#" + this.selectedOverlayName);
      this.box = $("#" + this.selectedOverlayName + "-Box");
      this.game = $("#game");
      this.boxContents = {
          footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
          header: $("#" + this.selectedOverlayName + "-Box-Header"),
          close: $("#" + this.selectedOverlayName + "-Box-Close"),
          body: $("#" + this.selectedOverlayName + "-Box-Body")
      };
      this.box.width(this.ad_width);
      this.box.height(this.ad_height);
      this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
      this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2);
      this.overlay.show(this.Timer(this.ad_duration))
  },
  Timer: function(b) {
      var c = b
        , d = setInterval(function() {
          MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in + c + "...");
          MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading);
          c--;
          0 > c && (clearInterval(d),
          MobileAdInGamePreroll.boxContents.close.css("left", MobileAdInGamePreroll.boxContents.body.width() - 23),
          MobileAdInGamePreroll.boxContents.close.show(),
          MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close),
          MobileAdInGamePreroll.boxContents.footer.text(""))
      }, 1E3)
  },
  Close: function() {
      this.boxContents.close.hide();
      this.overlay.hide()
  }
};
var MobileAdInGameHeader = {
  ad_duration: _SETTINGS.Ad.Mobile.Header.Duration,
  ad_width: _SETTINGS.Ad.Mobile.Header.Width,
  ad_height: _SETTINGS.Ad.Mobile.Header.Height,
  Initialize: function() {
      if (_SETTINGS.Ad.Mobile.Header.Rotation.Enabled) {
          var b = _SETTINGS.Ad.Mobile.Header.Rotation.Weight
            , c = b.MobileAdInGameHeader
            , d = c + b.MobileAdInGameHeader2
            , b = d + b.MobileAdInGameHeader3
            , e = Math.floor(100 * Math.random());
          console.log("seed: ", e);
          e <= c ? this.selectedOverlayName = "MobileAdInGameHeader" : e <= d ? this.selectedOverlayName = "MobileAdInGameHeader2" : e <= b && (this.selectedOverlayName = "MobileAdInGameHeader3");
          console.log("Ad rotating header enabled")
      } else
          this.selectedOverlayName = "MobileAdInGameHeader",
          console.log("Ad rotating header disabled");
      this.div = $("#" + this.selectedOverlayName);
      this.game = $("#game");
      this.div.width(this.ad_width);
      this.div.height(this.ad_height);
      this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
      this.div.css("top", 0);
      this.div.show(this.Timer(this.ad_duration))
  },
  Timer: function(b) {
      var c = setInterval(function() {
          b--;
          0 > b && (MobileAdInGameHeader.div.hide(),
          clearInterval(c))
      }, 1E3)
  }
};
var MobileAdInGameFooter = {
  ad_duration: _SETTINGS.Ad.Mobile.Footer.Duration,
  ad_width: _SETTINGS.Ad.Mobile.Footer.Width,
  ad_height: _SETTINGS.Ad.Mobile.Footer.Height,
  Initialize: function() {
      if (_SETTINGS.Ad.Mobile.Footer.Rotation.Enabled) {
          var b = _SETTINGS.Ad.Mobile.Footer.Rotation.Weight
            , c = b.MobileAdInGameFooter
            , d = c + b.MobileAdInGameFooter2
            , b = d + b.MobileAdInGameFooter3
            , e = Math.floor(100 * Math.random());
          console.log("seed: ", e);
          e <= c ? this.selectedOverlayName = "MobileAdInGameFooter" : e <= d ? this.selectedOverlayName = "MobileAdInGameFooter2" : e <= b && (this.selectedOverlayName = "MobileAdInGameFooter3");
          console.log("Ad rotating footer enabled")
      } else
          this.selectedOverlayName = "MobileAdInGameFooter",
          console.log("Ad rotating footer disabled");
      this.div = $("#" + this.selectedOverlayName);
      this.game = $("#game");
      this.div.width(this.ad_width);
      this.div.height(this.ad_height);
      this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
      this.div.css("top", this.game.height() - this.div.height() - 5);
      this.div.show(this.Timer(this.ad_duration))
  },
  Timer: function(b) {
      var c = setInterval(function() {
          b--;
          0 > b && (MobileAdInGameFooter.div.hide(),
          clearInterval(c))
      }, 1E3)
  }
};
var MobileAdInGameEnd = {
  ad_duration: _SETTINGS.Ad.Mobile.End.Duration,
  ad_width: _SETTINGS.Ad.Mobile.End.Width,
  ad_height: _SETTINGS.Ad.Mobile.End.Height,
  ready_in: _STRINGS.Ad.Mobile.End.ReadyIn,
  loading: _STRINGS.Ad.Mobile.End.Loading,
  close: _STRINGS.Ad.Mobile.End.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  Initialize: function() {
      if (_SETTINGS.Ad.Mobile.End.Rotation.Enabled) {
          var b = _SETTINGS.Ad.Mobile.End.Rotation.Weight
            , c = b.MobileAdInGameEnd
            , d = c + b.MobileAdInGameEnd2
            , b = d + b.MobileAdInGameEnd3
            , e = Math.floor(100 * Math.random());
          console.log("seed: ", e);
          e <= c ? this.selectedOverlayName = "MobileAdInGameEnd" : e <= d ? this.selectedOverlayName = "MobileAdInGameEnd2" : e <= b && (this.selectedOverlayName = "MobileAdInGameEnd3");
          console.log("Ad rotating end enabled")
      } else
          this.selectedOverlayName = "MobileAdInGameEnd",
          console.log("Ad rotating end disabled");
      console.log("selected:", this.selectedOverlayName);
      this.overlay = $("#" + this.selectedOverlayName);
      this.box = $("#" + this.selectedOverlayName + "-Box");
      this.game = $("#game");
      this.boxContents = {
          footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
          header: $("#" + this.selectedOverlayName + "-Box-Header"),
          close: $("#" + this.selectedOverlayName + "-Box-Close"),
          body: $("#" + this.selectedOverlayName + "-Box-Body")
      };
      this.box.width(this.ad_width);
      this.box.height(this.ad_height);
      this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
      this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2);
      this.overlay.show(this.Timer(this.ad_duration))
  },
  Timer: function(b) {
      var c = b
        , d = setInterval(function() {
          MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in + c + "...");
          MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading);
          c--;
          0 > c && (clearInterval(d),
          MobileAdInGameEnd.boxContents.close.css("left", MobileAdInGameEnd.boxContents.body.width() - 23),
          MobileAdInGameEnd.boxContents.close.show(),
          MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close),
          MobileAdInGameEnd.boxContents.footer.text(""))
      }, 1E3)
  },
  Close: function() {
      this.boxContents.close.hide();
      this.overlay.hide()
  }
};
