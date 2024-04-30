var _SETTINGS = {
  API: {
      Enabled: !1,
      Log: {
          Events: {
              InitializeGame: !0,
              EndGame: !0,
              Level: {
                  Begin: !0,
                  End: !0,
                  Win: !0,
                  Lose: !0,
                  Draw: !0
              }
          }
      }
  },
  Ad: {
      Mobile: {
          Preroll: {
              Enabled: !1,
              Duration: 5,
              Width: 300,
              Height: 250,
              Rotation: {
                  Enabled: !1,
                  Weight: {
                      MobileAdInGamePreroll: 40,
                      MobileAdInGamePreroll2: 40,
                      MobileAdInGamePreroll3: 20
                  }
              }
          },
          Header: {
              Enabled: !1,
              Duration: 5,
              Width: 320,
              Height: 50,
              Rotation: {
                  Enabled: !1,
                  Weight: {
                      MobileAdInGameHeader: 40,
                      MobileAdInGameHeader2: 40,
                      MobileAdInGameHeader3: 20
                  }
              }
          },
          Footer: {
              Enabled: !1,
              Duration: 5,
              Width: 320,
              Height: 50,
              Rotation: {
                  Enabled: !1,
                  Weight: {
                      MobileAdInGameFooter: 40,
                      MobileAdInGameFooter2: 40,
                      MobileAdInGameFooter3: 20
                  }
              }
          },
          End: {
              Enabled: !1,
              Duration: 1,
              Width: 300,
              Height: 250,
              Rotation: {
                  Enabled: !1,
                  Weight: {
                      MobileAdInGameEnd: 40,
                      MobileAdInGameEnd2: 40,
                      MobileAdInGameEnd3: 20
                  }
              }
          }
      }
  },
  Language: {
      Default: "en"
  },
  DeveloperBranding: {
      Splash: {
          Enabled: !1
      },
      Logo: {
          Enabled: !1,
          Link: "http://google.com",
          LinkEnabled: !1,
          NewWindow: !0,
          Width: 166,
          Height: 61
      }
  },
  Branding: {
      Splash: {
          Enabled: !1
      },
      Logo: {
          Enabled: !0,
          Link: "http://google.com",
          LinkEnabled: !1,
          NewWindow: !0,
          Width: 166,
          Height: 61
      }
  },
  MoreGames: {
      Enabled: !1,
      Link: "http://www.marketjs.com/game/links/mobile",
      NewWindow: !0
  }
};