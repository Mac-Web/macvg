/*
 * This file is protected by automatic plagiarism detection services and duplication checkers.
 * Content theft and plagiarism is a crime. Any content theft and plagiarism, without exception, 
 * will be prosecuted to the full extent of applicable laws.
 *
 * Copyright 2011-2021 TreeCardGames https://www.treecardgames.com
 * All rights reserved.
*/
!function() {
    var e = {};
    !function() {
        "use strict";
        e.containers = {},
        e.lang = {};
        var t = e.games = {};
        e.startGame = function(a, i) {
            e.gameSettings.lastGame = a + "-" + i,
            e.game.empty(),
            e.game.setCurrentGame(new (t[a.capitalize()])(i)),
            e.ui.updateWithGame(a, i),
            e.game.play()
        }
        ,
        e.startPlaying = function() {
            var t = e.gameSettings.lastGame;
            if (t || (t = e.data.defaultGame),
            t) {
                var a = t.split("-");
                e.ui.gamesUI[a[0]] && e.ui.gamesUI[a[0]].variation ? this.startGame(a[0], a[1]) : e.ui.showGameSelector()
            } else
                e.ui.showGameSelector()
        }
    }(),
    e.lang.de = {
        "game-bakers_game": "FreeCell (Baker)",
        "game-easthaven": "SolitÃ¤r (Easthaven)",
        "game-eight_off": "Eight Off",
        "game-forty_thieves": "Forty Thieves",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell Zwei Decks",
        "game-golf": "Golf",
        "game-golf_easy": "Golf Easy",
        "game-klondike": "SolitÃ¤r",
        "game-klondike_by_threes": "SolitÃ¤r Drei Ziehen",
        "game-klondike_two_decks": "SolitÃ¤r Zwei Decks",
        "game-pyramid": "Pyramide",
        "game-pyramid_easy": "Leichte Pyramide",
        "game-scorpion": "Skorpion",
        "game-simple_simon": "Einfacher Simon",
        "game-spider_four_suits": "Spider Vier Farben",
        "game-spider_one_suit": "Spider Eine Farbe",
        "game-spider_two_suits": "Spider Zwei Farben",
        blue_felt: "Blauer Filz",
        dark_wood: "Dunkles Holz",
        green_felt: "GrÃ¼ner Filz",
        light_wood: "Helles Holz",
        light_wood_tiles: "Helle Holzfliesen",
        parquet: "Parkett",
        red_felt: "Roter Filz",
        blue_and_yellow_abstract: "Blau und Gelb abstrakt",
        blue_web: "Blaues Netz",
        christmas_aglow: "Weihnachtsbaum",
        christmas_bells_and_bows: "Weihnachtsglocken und Schleifen",
        cozy_cabin: "GemÃ¼tliche BlockhÃ¼tte",
        decorating_the_tree: "Baum schmÃ¼cken",
        glitter_and_greens: "Glitzer und Zweige",
        let_it_snow: "Schneefall",
        modern_christmas_green: "Modernes WeihnachtsgrÃ¼n",
        silent_night: "Stille Nacht",
        winter_wonderland: "Winterwunderland",
        woodland_christmas: "Weihnachten im Wald",
        big_ben: "Klassisch",
        caricatures: "Karikaturen",
        large_print: "GroÃŸformat",
        large_print_london: "Klassisches GroÃŸformat",
        large_print_modern: "Modernes GroÃŸformat",
        modern: "Modern",
        christmas: "Weihnachten",
        merry_christmas: "Frohe Weihnachten",
        butterflies: "Schmetterlinge",
        cat: "Katze",
        classic_blue: "Klassisches Blau",
        classic_brown: "Klassisches Braun",
        classic_green: "Klassisches GrÃ¼n",
        classic_red: "Klassisches Rot",
        cross_blue: "Blaues Gitter",
        cross_brown: "Braunes Gitter",
        cross_green: "GrÃ¼nes Gitter",
        cross_red: "Rotes Gitter",
        dog: "Hund",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Blaues Rhombus",
        rhombus_brown: "Braunes Rhombus",
        rhombus_green: "GrÃ¼nes Rhombus",
        rhombus_red: "Rotes Rhombus",
        rose: "Rose",
        spider_blue: "Blaue Spinne",
        spider_red: "Rote Spinne",
        pyramids: "Pyramiden",
        ancient_egypt: "Altes Ã„gypten",
        sahara: "Sahara",
        holidays_and_christmas_tree: "Weihnachten und Weihnachtsbaum",
        party_present: "Partygeschenk",
        santa_claus_in_chimney: "Weihnachtsmann im Kamin",
        santa_claus_rings_bells: "Weihnachtsmann lÃ¤utet die Glocken",
        santa_with_beautiful_angel: "Weihnachtsmann mit schÃ¶nem Engel",
        snow_man: "Schneemann",
        spring_flower_christmas_tree: "FrÃ¼hlingsblume Weihnachtsbaum",
        "more-games": "Mehr Gratis-Spiele",
        "more-games-freecell-title": "SÃ¼chtig nach FreeCell-SolitÃ¤r?",
        "more-games-freecell-desc": "Spielen Sie FreeCell, FreeCell Two Decks, Baker's Game und Eight Off.",
        "more-games-spider-title": "SÃ¼chtig nach Spider-SolitÃ¤r?",
        "more-games-spider-desc": "Spielen Sie in Ihrem Browser schÃ¶ne und kostenlose Spider-SolitÃ¤rspiele.",
        "more-games-word-search-title": "WÃ¶rtersuche",
        "more-games-word-search-desc": "Kostenloses Online-Spiel mit WÃ¶rtersuche.",
        "app-spider-name": "Spider SolitÃ¤r",
        "app-spider-desc": "Spielen Sie kostenlos eine herrliche Sammlung an Spider SolitÃ¤rvarianten, z. B.: Spider Eine Farbe, Spider Zwei Farben, Spider Vier Farben, Skorpion",
        "app-freecell-name": "FreeCell",
        "app-freecell-desc": "Spielen Sie kostenlos eine herrliche Sammlung an FreeCell-SolitÃ¤rvarianten, z. B.: FreeCell, FreeCell Zwei Decks, Eight Off, FreeCell (Baker)",
        "app-klondike-name": "SolitÃ¤r",
        "app-klondike-desc": "Entspannen Sie sich bei dieser herrlichen Sammlung an SolitÃ¤rspielen, die alle Funktionen und Anpassungsoptionen bietet.",
        "play-now": "Jetzt spielen",
        games: "Spiele",
        new: "Neu",
        undo: "RÃ¼ckgÃ¤ngig",
        hint: "Hinweis",
        scores: "Statistik",
        settings: "Einstell.",
        appearance: "Darstellung",
        options: "Optionen",
        rules: "Regeln",
        about: "Infos",
        more: "MenÃ¼",
        "new-game": "Neues Spiel",
        "new-game-ask": "Was mÃ¶chten Sie mit dem angefangenen Spiel machen?",
        "start-new": "SchlieÃŸen und neues Spiel starten",
        "start-new-won": "Neues Spiel starten",
        restart: "Karten neu geben",
        keep: "Weiterspielen",
        "game-sounds": "TÃ¶ne",
        "apply-swing": "Beim Verschieben der Karte Schwingbewegung vollfÃ¼hren",
        "apply-expand": "Bei Bewegung der Maus Ã¼ber gestapelte Karten auf dem Tisch: Karten auseinanderziehen",
        languages: "Sprache",
        "id-language": "Deutsch",
        "css3-item": "Hardware-beschleunigte Animationen verwenden",
        "enable-effect": "Visuelle Effekte aktivieren (Schatten, KartenvergrÃ¶ÃŸerung, Buttons)",
        "left-handed": "LinkshÃ¤ndig",
        "advanced-options": "Erweiterte Optionen",
        on: "Ein",
        off: "Aus",
        "card-set": "Kartenset",
        "card-back": "KartenrÃ¼cken",
        backgrounds: "HintergrÃ¼nde",
        "autoplay-settings": "Automatische Komplettierung",
        "global-autoplay": "Umfassende",
        "selective-autoplay": "Vereinzelte",
        "no-autoplay": "Keine",
        counters: "ZÃ¤hler anzeigen",
        "show-score": "Punkte",
        "show-time": "Zeit",
        "show-moves": "ZÃ¼ge",
        "game-won": "Spiel gewonnen!",
        congratulations: "GlÃ¼ckwunsch!",
        "cong-text": "GlÃ¼ckwunsch! Sie haben gewonnen.",
        won: "gewonnen",
        lost: "verloren",
        win: "gewonnen",
        wins: "gewonnen",
        loss: "verloren",
        losses: "verloren",
        "longest-winning": "LÃ¤ngste ErfolgsstrÃ¤hne:",
        "longest-losing": "LÃ¤ngste VerluststrÃ¤hne:",
        "current-streak": "Aktuelle StrÃ¤hne:",
        clear: "LÃ¶schen",
        "clear-stats": "Statistiken lÃ¶schen",
        "clear-stats-text": "MÃ¶chten Sie Ihre Spielstatistiken wirklich lÃ¶schen?",
        "no-more-moves": "Keine ZÃ¼ge mehr",
        "no-more-moves-text": "Es sind keine ZÃ¼ge mehr mÃ¶glich.",
        "back-and-undo": "Gehen Sie zurÃ¼ck und machen Sie einige ZÃ¼ge rÃ¼ckgÃ¤ngig.",
        "select-a-solitaire": "SolitÃ¤r-Variante auswÃ¤hlen",
        spider: "Spider",
        "spider-deal-info": "Es muss immer mind. 1 Karte auf jeder Reihe liegen,<br /> bevor Sie neue Karten vom Stapel ziehen kÃ¶nnen.",
        score: "Punkte",
        time: "Zeit",
        moves: "ZÃ¼ge",
        "rate-dialog-body": "Wenn Ihnen diese App gefÃ¤llt, wÃ¼rden wir uns freuen, wenn Sie sich eine Minute Zeit nehmen kÃ¶nnen, um die App zu bewerten. Vielen Dank fÃ¼r Ihre UnterstÃ¼tzung!",
        "rate-it-now": "Jetzt bewerten",
        "rate-later": "SpÃ¤ter erinnern",
        "do-not-rate": "Nein danke",
        "remove-ads": "Werbung entfernen",
        "copyright-year": "Copyright (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Alle Rechte vorbehalten.",
        "about-sup-welcome": "Wir optimieren unsere Apps und freuen uns daher Ã¼ber jedes Feedback.",
        "about-sup-faqs": "FAQ und Supportseite",
        "contact-us": "Kontakt",
        "follow-us": "Folgen Sie uns",
        "click-here": "Hier klicken",
        website: "Website",
        "privacy-policy": "DatenschutzerklÃ¤rung",
        support: "Supportseite",
        "want-more-solitaire": "MÃ¶chten Sie weitere SolitÃ¤rvarianten spielen?",
        "try-solsuite": "Probieren Sie SolSuite Solitaire aus â€“ die umfangreichste SolitÃ¤rsammlung der Welt mit Ã¼ber 620 SolitÃ¤rspielen, 60 Kartensets, 300 KartenrÃ¼cken und 100 HintergrÃ¼nden! Jetzt testen unter",
        loading: "LÃ¤dt",
        ok: "OK",
        close: "SchlieÃŸen",
        cancel: "Abbrechen",
        back: "ZurÃ¼ck",
        "reload-title": "Bitte neu laden!",
        "reload-content": "Das Spiel muss neu geladen werden, damit die Ã„nderungen wirksam werden.",
        "reload-content-app": "Diese Optionen werden beim nÃ¤chsten Ã–ffnen diese App wirksam.",
        "select-game-number": "Spielnummer auswÃ¤hlen",
        "select-game-number-label": "WÃ¤hlen Sie eine Spielnummer zwischen 1 und 9999999 aus",
        play: "Spielen",
        "game-number": "Spielnummer",
        "bad-game-number-label": "Dies ist keine gÃ¼ltige Spielnummer",
        "try-again": "Erneut versuchen"
    },
    e.lang.en = {
        "game-bakers_game": "Baker's Game",
        "game-easthaven": "Easthaven",
        "game-eight_off": "Eight Off",
        "game-forty_thieves": "Forty Thieves",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell Two Decks",
        "game-golf": "Golf",
        "game-golf_easy": "Golf Easy",
        "game-klondike": "Klondike",
        "game-klondike_by_threes": "Klondike by Threes",
        "game-klondike_two_decks": "Klondike Two Decks",
        "game-pyramid": "Pyramid",
        "game-pyramid_easy": "Pyramid Easy",
        "game-scorpion": "Scorpion",
        "game-simple_simon": "Simple Simon",
        "game-spider_four_suits": "Spider Four Suits",
        "game-spider_one_suit": "Spider One Suit",
        "game-spider_two_suits": "Spider Two Suits",
        blue_felt: "Blue Felt",
        dark_wood: "Dark Wood",
        green_felt: "Green Felt",
        light_wood: "Light Wood",
        light_wood_tiles: "Light Wood Tiles",
        parquet: "Parquet",
        red_felt: "Red Felt",
        blue_and_yellow_abstract: "Blue and Yellow Abstract",
        blue_web: "Blue Web",
        christmas_aglow: "Christmas Tree",
        christmas_bells_and_bows: "Christmas Bells and Bows",
        cozy_cabin: "Cozy Cabin",
        decorating_the_tree: "Decorating the Tree",
        glitter_and_greens: "Glitter and Greens",
        let_it_snow: "Let it Snow",
        modern_christmas_green: "Modern Christmas Green",
        silent_night: "Silent Night",
        winter_wonderland: "Winter Wonderland",
        woodland_christmas: "Woodland Christmas",
        big_ben: "Classic",
        caricatures: "Caricatures",
        large_print: "Large Print",
        large_print_london: "Large Print Classic",
        large_print_modern: "Large Print Modern",
        modern: "Modern",
        christmas: "Christmas",
        merry_christmas: "Merry Christmas",
        butterflies: "Butterflies",
        cat: "Cat",
        classic_blue: "Classic Blue",
        classic_brown: "Classic Brown",
        classic_green: "Classic Green",
        classic_red: "Classic Red",
        cross_blue: "Grate Blue",
        cross_brown: "Grate Brown",
        cross_green: "Grate Green",
        cross_red: "Grate Red",
        dog: "Dog",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Rhombus Blue",
        rhombus_brown: "Rhombus Brown",
        rhombus_green: "Rhombus Green",
        rhombus_red: "Rhombus Red",
        rose: "Rose",
        spider_blue: "Spider Blue",
        spider_red: "Spider Red",
        pyramids: "Pyramids",
        ancient_egypt: "Ancient Egypt",
        sahara: "Sahara",
        holidays_and_christmas_tree: "Holidays and Christmas Tree",
        party_present: "Party Present",
        santa_claus_in_chimney: "Santa Claus in Chimney",
        santa_claus_rings_bells: "Santa Claus Rings Bells",
        santa_with_beautiful_angel: "Santa with Beautiful Angel",
        snow_man: "Snow Man",
        spring_flower_christmas_tree: "Spring Flower Christmas Tree",
        "more-games": "More Free Games",
        "more-games-freecell-title": "Addicted to FreeCell?",
        "more-games-freecell-desc": "Play FreeCell, FreeCell Two Decks, Baker's Game and Eight Off.",
        "more-games-spider-title": "Addicted to Spider?",
        "more-games-spider-desc": "Play in your browser a beautiful and free Spider solitaire games collection.",
        "more-games-word-search-title": "Word Search",
        "more-games-word-search-desc": "Free online Word Search puzzle game.",
        "app-spider-name": "Spider Solitaire Collection",
        "app-spider-desc": "Play a 100% free beautiful collection of Spider solitaire game variations: Spider, Spider One Suit, Spider Two Suits and Scorpion.",
        "app-freecell-name": "FreeCell Collection",
        "app-freecell-desc": "Play a 100% free beautiful collection of FreeCell solitaire game variations: FreeCell, FreeCell Two Decks, Baker's Game and Eight Off.",
        "app-klondike-name": "Klondike Solitaire Collection",
        "app-klondike-desc": "Play a 100% free beautiful collection of Klondike solitaire game variations: Klondike (Solitaire), Klondike by Threes, Klondike Two Decks and Easthaven.",
        "play-now": "Play it Now!",
        games: "Games",
        new: "New",
        undo: "Undo",
        hint: "Hint",
        scores: "Stats",
        settings: "Settings",
        appearance: "Appearance",
        options: "Options",
        rules: "Rules",
        about: "About",
        more: "More",
        "new-game": "New Game",
        "new-game-ask": "What would you like to do with your game in progress?",
        "start-new": "Quit and Start a New Game",
        "start-new-won": "Start a New Game",
        restart: "Restart This Game",
        keep: "Keep Playing",
        "game-sounds": "Game Sounds",
        "apply-swing": "Apply swinging card effect during the drag",
        "apply-expand": "Expand cards on mouse over when the tableau columns are compressed",
        languages: "Language",
        "id-language": "English",
        "css3-item": "Use hardware-accelerated animations",
        "enable-effect": "Enable visual effects (shadows, cards enlarging, buttons)",
        "left-handed": "Left-Handed",
        "advanced-options": "Advanced Options",
        on: "On",
        off: "Off",
        "card-set": "Card Set",
        "card-back": "Card Back",
        backgrounds: "Backgrounds",
        "autoplay-settings": "Autoplay Settings",
        "global-autoplay": "Global",
        "selective-autoplay": "Selective",
        "no-autoplay": "Disabled",
        counters: "Show Counters",
        "show-score": "Score",
        "show-time": "Time",
        "show-moves": "Moves",
        "game-won": "Game Won!",
        congratulations: "Congratulations!",
        "cong-text": "Congratulations! You won the game.",
        won: "won",
        lost: "lost",
        win: "win",
        wins: "wins",
        loss: "loss",
        losses: "losses",
        "longest-winning": "Longest Winning Streak:",
        "longest-losing": "Longest Losing Streak:",
        "current-streak": "Current streak:",
        clear: "Clear",
        "clear-stats": "Clear Statistics",
        "clear-stats-text": "Are you sure you want to clear statistics?",
        "no-more-moves": "No more moves",
        "no-more-moves-text": "There are no more moves available.",
        "back-and-undo": "Go back and undo some moves",
        "select-a-solitaire": "Select a Solitaire",
        spider: "Spider",
        "spider-deal-info": "There must be at least one card in each tableau column <br /> before you can deal a new row of cards.",
        score: "Score",
        time: "Time",
        moves: "Moves",
        "rate-dialog-body": "If you enjoy using this App, would you mind taking a moment to rate it? It won't take more than a minute. Thanks for your support!",
        "rate-it-now": "Rate It Now",
        "rate-later": "Remind Me Later",
        "do-not-rate": "No, Thanks",
        "remove-ads": "Remove Ads",
        "copyright-year": "Copyright (c) 2011-2021 TreeCardGames.",
        "rights-reserved": "All rights reserved.",
        "about-sup-welcome": "We support our apps and your feedback is welcome.",
        "about-sup-faqs": "FAQs and Support page",
        "contact-us": "Contact us",
        "follow-us": "Follow us on",
        "click-here": "click here",
        website: "Website",
        "privacy-policy": "Privacy Policy",
        support: "Support",
        "want-more-solitaire": "Want More Solitaire Games?",
        "try-solsuite": "Try SolSuite Solitaire, the World's Most Complete Solitaire Collection with more than 620 solitaire games, 60 card sets, 300 card backs and 100 backgrounds! Try it now at",
        loading: "Loading",
        ok: "OK",
        close: "Close",
        cancel: "Cancel",
        back: "Back",
        "reload-title": "Reload Needed",
        "reload-content": "The game needs to reload for the changes to take effect.",
        "reload-content-app": "The settings have been updated and will take effect the next time you start this App.",
        "select-game-number": "Select a Game Number",
        "select-game-number-label": "Select a game number from 1 to 9999999",
        play: "Play",
        "game-number": "Game Number",
        "bad-game-number-label": "That is not a valid game number",
        "try-again": "Try again",
        "bookmark-hint": "Do you like me?",
        "bookmark-title": "Bookmark me!",
        "bookmark-message": "Add me to your bookmarks.<br />Press " + (/mac/i.test(navigator.userAgent) ? "Command/Cmd" : "Ctrl") + "+D and I'll be always here for you!"
    },
    e.lang.es = {
        "game-bakers_game": "Carta blanca (Baker)",
        "game-easthaven": "Solitario (Easthaven)",
        "game-eight_off": "Ocho Fuera",
        "game-forty_thieves": "Cuarenta Ladrones",
        "game-freecell": "Carta blanca",
        "game-freecell_two_decks": "Carta blanca con dos mazos",
        "game-golf": "Golf",
        "game-golf_easy": "Golf (FÃ¡cil)",
        "game-klondike": "Solitario",
        "game-klondike_by_threes": "Solitario (3 cartas)",
        "game-klondike_two_decks": "Solitario con dos mazos",
        "game-pyramid": "PirÃ¡mide",
        "game-pyramid_easy": "PirÃ¡mide (FÃ¡cil)",
        "game-scorpion": "EscorpiÃ³n",
        "game-simple_simon": "El TontorrÃ³n",
        "game-spider_four_suits": "Spider (4 palos)",
        "game-spider_one_suit": "Spider (1 palo)",
        "game-spider_two_suits": "Spider (2 palos)",
        blue_felt: "Fieltro Azul",
        dark_wood: "Madera Oscura",
        green_felt: "Fieltro Verde",
        light_wood: "Madera Clara",
        light_wood_tiles: "Azulejos de Madera Clara",
        parquet: "Parquet",
        red_felt: "Fieltro Rojo",
        blue_and_yellow_abstract: "Abstracto Azul y Amarillo",
        blue_web: "Web Azul",
        big_ben: "ClÃ¡sico",
        caricatures: "Caricaturas",
        large_print: "NÃºmeros Grandes",
        large_print_london: "ClÃ¡sico NÃºmeros Grandes",
        large_print_modern: "Moderno NÃºmeros Grandes",
        modern: "Moderno",
        butterflies: "Mariposas",
        cat: "Gato",
        classic_blue: "ClÃ¡sico Azul",
        classic_brown: "ClÃ¡sico MarrÃ³n",
        classic_green: "ClÃ¡sico Verde",
        classic_red: "ClÃ¡sico Rojo",
        cross_blue: "Reja Azul",
        cross_brown: "Reja MarrÃ³n",
        cross_green: "Reja Verde",
        cross_red: "Reja Roja",
        dog: "Perro",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Rombo Azul",
        rhombus_brown: "Rombo MarrÃ³n",
        rhombus_green: "Rombo Verde",
        rhombus_red: "Rombo Rojo",
        rose: "Rosa",
        spider_blue: "AraÃ±a Azul",
        spider_red: "AraÃ±a Rojo",
        pyramids: "PirÃ¡mides",
        ancient_egypt: "Antiguo Egipto",
        sahara: "Sahara",
        "more-games": "MÃ¡s juegos",
        "more-games-freecell-title": "Aficionado de Carta blanca?",
        "more-games-freecell-desc": "Juega Carta blanca, Carta blanca con dos mazos, Carta blanca (Baker) y Ocho Fuera.",
        "more-games-spider-title": "Aficionado de Spider?",
        "more-games-spider-desc": "Juega en tu navegador una colecciÃ³n gratuita de juegos tipo Spider.",
        "more-games-word-search-title": "Word Search",
        "more-games-word-search-desc": "Juega Word Search en lÃ­nea. Â¡Es gratis!",
        "app-spider-name": "Aficionado de Spider?",
        "app-spider-desc": "Juega en tu navegador una colecciÃ³n gratuita de juegos tipo Spider.",
        "app-freecell-name": "Aficionado de FreeCell?",
        "app-freecell-desc": "Juega FreeCell, FreeCell con dos mazos, FreeCell (Baker) y Ocho Fuera.",
        "app-klondike-name": "Solitario",
        "app-klondike-desc": "Juega Solitario, Solitario (3 cartas), Solitario con dos mazos y Solitario (Easthaven).",
        "play-now": "Juega ahora",
        games: "Juegos",
        new: "Nuevo",
        undo: "Deshacer",
        hint: "Pista",
        scores: "EstadÃ­sticas",
        settings: "Ajustes",
        appearance: "Apariencia",
        options: "Opciones de juego",
        rules: "Reglas",
        about: "Acerca de",
        more: "MenÃº",
        "new-game": "Nueva partida",
        "new-game-ask": "Que te gustarÃ­a hacer con la partida en curso?",
        "start-new": "Renuncia e inicia una nueva partida",
        "start-new-won": "Inicia una nueva partida",
        restart: "Reiniciar esta partida",
        keep: "Continua la partida",
        "game-sounds": "Sonidos",
        "apply-swing": "Aplicar efecto de balanceo a las cartas durante el arrastre",
        "apply-expand": "Expandir las cartas al paso del mouse cuando las columnas se encuentran comprimidas.",
        languages: "Idioma",
        "id-language": "EspaÃ±ol",
        "css3-item": "Usa animaciones hardware-acelerado",
        "enable-effect": "Habilitar efectos visuales (sombras, expansiÃ³n de cartas, botones)",
        "left-handed": "Zurdo",
        "advanced-options": "Opciones de juego avanzadas",
        on: "SÃ­",
        off: "No",
        "card-set": "Mazo",
        "card-back": "Dorso",
        backgrounds: "Fondo",
        "autoplay-settings": "Movimiento automÃ¡tico de las cartas hacia las pilas de palos",
        "global-autoplay": "General",
        "selective-autoplay": "Selectivo",
        "no-autoplay": "Apagado",
        counters: "Contadores",
        "show-score": "PuntuaciÃ³n",
        "show-time": "Tiempo",
        "show-moves": "Movimientos",
        "game-won": "Â¡Partida ganada!",
        congratulations: "Â¡Felicidades!",
        "cong-text": "Â¡Felicidades! Has ganado la partida.",
        won: "ganada(s)",
        lost: "perdida(s)",
        win: "ganada",
        wins: "ganadas",
        loss: "perdida",
        losses: "perdidas",
        "longest-winning": "Secuencia mÃ¡s larga de partidas ganadas:",
        "longest-losing": "Secuencia mÃ¡s larga de partidas perdidas:",
        "current-streak": "Secuencia actual:",
        clear: "Reiniciar",
        "clear-stats": "Reiniciar estadÃ­sticas",
        "clear-stats-text": "Â¿EstÃ¡s seguro de querer reiniciar las estadÃ­sticas?",
        "no-more-moves": "No mÃ¡s movimientos",
        "no-more-moves-text": "No es posible realizar mÃ¡s movimientos.",
        "back-and-undo": "Regresa a la partida y deshaz los Ãºltimos movimientos.",
        "select-a-solitaire": "Selecciona un Solitario",
        spider: "Spider",
        "spider-deal-info": "Debe haber al menos una carta en cada columna del tablero <br /> antes de poder repartir una nueva fila de cartas.",
        score: "PuntuaciÃ³n",
        time: "Tiempo",
        moves: "Mov.",
        "rate-dialog-body": "Si disfrutas esta AplicaciÃ³n, podrÃ­as dedicar un minuto de tu tiempo para darle tu voto? Â¡Gracias por tu apoyo!",
        "rate-it-now": "Vota y comenta ahora",
        "rate-later": "RecuÃ©rdame mÃ¡s tarde",
        "do-not-rate": "No, Gracias",
        "remove-ads": "Desactivar Publicidad",
        "copyright-year": "Derechos de autor (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Todos los derechos reservados.",
        "about-sup-welcome": "Damos soporte a nuestras aplicaciones y tus comentarios son bienvenidos.",
        "about-sup-faqs": "Preguntas Frequentes y Soporte",
        "contact-us": "ContÃ¡ctanos",
        "follow-us": "SÃ­guenos",
        "click-here": "Haz clic aquÃ­",
        website: "Sitio web",
        "privacy-policy": "PolÃ­tica de Privacidad",
        support: "soporte",
        "want-more-solitaire": "Â¿MÃ¡s solitarios?",
        "try-solsuite": "Prueba SolSuite Solitaire, la colecciÃ³n de Solitarios mÃ¡s completa del Mundo con mas de 620 solitarios, 60 mazos, 300 dorsos y 100 fondos! PruÃ©balo ahora en",
        loading: "Cargando",
        ok: "OK",
        close: "Cierra",
        cancel: "Cancela",
        back: "AtrÃ¡s",
        "reload-title": "Vuelve a cargar la partida",
        "reload-content": "Es necesario cargar el juego nuevamente para que los cambios sean aplicados.",
        "reload-content-app": "Estas opciones surtirÃ¡n efecto la prÃ³xima vez que abra esta AplicaciÃ³n.",
        "select-game-number": "Selecciona un NÃºmero de Partida",
        "select-game-number-label": "Selecciona un NÃºmero de Partida de 1 a 9999999",
        play: "Juega",
        "game-number": "NÃºmero de Partida",
        "bad-game-number-label": "NÃºmero de Partida no vÃ¡lido",
        "try-again": "Intenta nuevamente"
    },
    e.lang.fr = {
        "game-bakers_game": "FreeCell (Baker)",
        "game-easthaven": "Solitaire (Easthaven)",
        "game-eight_off": "Huit au Loin",
        "game-forty_thieves": "Quarante Voleurs",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell Deux Jeux",
        "game-golf": "Golf",
        "game-golf_easy": "Golf facile",
        "game-klondike": "Solitaire",
        "game-klondike_by_threes": "Solitaire Par Trois",
        "game-klondike_two_decks": "Solitaire Deux Jeux",
        "game-pyramid": "Pyramide",
        "game-pyramid_easy": "Pyramide Facile",
        "game-scorpion": "Scorpion",
        "game-simple_simon": "Simon Simple",
        "game-spider_four_suits": "Spider Quatre Couleurs",
        "game-spider_one_suit": "Spider Une Couleur",
        "game-spider_two_suits": "Spider Deux Couleurs",
        blue_felt: "Feutre bleu",
        dark_wood: "Bois sombre",
        green_felt: "Feutre vert",
        light_wood: "Bois clair",
        light_wood_tiles: "Panneaux de bois clair",
        parquet: "Parquet",
        red_felt: "Feutre rouge",
        blue_and_yellow_abstract: "Abstrait bleu et jaune",
        blue_web: "Toile bleue",
        christmas_aglow: "Arbre de NoÃ«l",
        christmas_bells_and_bows: "Guirlandes et clochettes de NoÃ«l",
        cozy_cabin: "Hutte confortable",
        decorating_the_tree: "DÃ©coration de l'arbre",
        glitter_and_greens: "Paillettes et verdure",
        let_it_snow: "Qu'il neige",
        modern_christmas_green: "Vert NoÃ«l moderne",
        silent_night: "Douce nuit",
        winter_wonderland: "Magie de l'hiver",
        woodland_christmas: "ForÃªt de NoÃ«l",
        big_ben: "Classique",
        caricatures: "Caricatures",
        large_print: "Gros caractÃ¨res",
        large_print_london: "Gros caractÃ¨res classique",
        large_print_modern: "Gros caractÃ¨res moderne",
        modern: "Moderne",
        christmas: "NoÃ«l",
        merry_christmas: "Joyeux NoÃ«l",
        butterflies: "Papillons",
        cat: "Chat",
        classic_blue: "Bleu classique",
        classic_brown: "Brun classique",
        classic_green: "Vert classique",
        classic_red: "Rouge classique",
        cross_blue: "Grille bleue",
        cross_brown: "Grille marron",
        cross_green: "Grille verte",
        cross_red: "Grille rouge",
        dog: "Chien",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Losange bleu",
        rhombus_brown: "Losange marron",
        rhombus_green: "Losange vert",
        rhombus_red: "Losange rouge",
        rose: "Rose",
        spider_blue: "AraignÃ©e bleue",
        spider_red: "AraignÃ©e rouge",
        pyramids: "Pyramides",
        ancient_egypt: "Ã‰gypte antique",
        sahara: "Sahara",
        holidays_and_christmas_tree: "FÃªtes et arbre de NoÃ«l",
        party_present: "Cadeau de fÃªte",
        santa_claus_in_chimney: "PÃ¨re NoÃ«l dans la cheminÃ©e",
        santa_claus_rings_bells: "PÃ¨re NoÃ«l sonne les clochettes",
        santa_with_beautiful_angel: "PÃ¨re NoÃ«l avec un bel ange",
        snow_man: "Bonhomme de neige",
        spring_flower_christmas_tree: "Fleur de printemps arbre de NoÃ«l",
        "more-games": "Autres jeux gratuits",
        "more-games-freecell-title": "Accro Ã  FreeCell?",
        "more-games-freecell-desc": "Jouer Ã  FreeCell, FreeCell Deux Jeux, FreeCell (Baker) et Huit en Moins.",
        "more-games-spider-title": "Accro Ã  Spider?",
        "more-games-spider-desc": "Jouez dans votre navigateur avec une collection de jeux de solitaire Spider beaux et gratuits.",
        "more-games-word-search-title": "Recherche de mots",
        "more-games-word-search-desc": "Jeu gratuit en ligne de recherche de mots.",
        "app-spider-name": "Spider Solitaire en FranÃ§ais",
        "app-spider-desc": "Jouez avec une belle collection gratuite de variations du jeu de solitaire Spider, notamment: Spider Une Couleur, Spider Deux Couleurs, Spider Quatre Couleurs, Scorpion.",
        "app-freecell-name": "FreeCell en FranÃ§ais",
        "app-freecell-desc": "Jouez avec une belle collection gratuite de variations du jeu de solitaire FreeCell, notamment: FreeCell, FreeCell Deux Jeux, Huit en Moins, FreeCell (Baker).",
        "app-klondike-name": "Solitaire en FranÃ§ais",
        "app-klondike-desc": "DÃ©tendez-vous avec cette belle collection de jeux de solitaire, complets avec toutes leurs fonctionnalitÃ©s et options de personnalisation.",
        "play-now": "Jouer maintenant",
        games: "Jeux",
        new: "Nouveau",
        undo: "Annuler",
        hint: "Conseil",
        scores: "Scores",
        settings: "ParamÃ¨tres",
        appearance: "Apparence",
        options: "Options",
        rules: "RÃ¨gles",
        about: "Ã€ propos de",
        more: "Menu",
        "new-game": "Nouvelle partie",
        "new-game-ask": "Que voulez-vous faire de votre partie en cours?",
        "start-new": "Quitter et dÃ©marrer une nouvelle partie",
        "start-new-won": "DÃ©marrer une nouvelle partie",
        restart: "RedÃ©marrer cette partie",
        keep: "Continuer Ã  jouer",
        "game-sounds": "Sons du jeu",
        "apply-swing": "Appliquer l'effet sur les cartes lors des mouvements",
        "apply-expand": "Agrandir les cartes lorsque la souris passe dessus quand les colonnes du tableau sont compressÃ©es",
        languages: "Langue",
        "id-language": "FranÃ§ais",
        "css3-item": "Utiliser les animations d'accÃ©laration matÃ©rielle",
        "enable-effect": "Activer les effets visuels (ombres, agrandissement des cartes, boutons)",
        "left-handed": "Gaucher",
        "advanced-options": "Options avancÃ©es",
        on: "On",
        off: "Off",
        "card-set": "Jeu de cartes",
        "card-back": "Dos de la carte",
        backgrounds: "ArriÃ¨re-plans",
        "autoplay-settings": "ParamÃ¨tres de jeu automatique",
        "global-autoplay": "GÃ©nÃ©ral",
        "selective-autoplay": "SÃ©lectif",
        "no-autoplay": "DÃ©sactivÃ©",
        counters: "Afficher les Compteurs",
        "show-score": "Score",
        "show-time": "Temps",
        "show-moves": "DÃ©placements",
        "game-won": "Partie gagnÃ©e!",
        congratulations: "FÃ©licitations!",
        "cong-text": "FÃ©licitations! Vous avez gagnÃ© la partie.",
        won: "gagnÃ©e",
        lost: "perdue",
        win: "victoire",
        wins: "victoires",
        loss: "dÃ©faite",
        losses: "dÃ©faites",
        "longest-winning": "Plus longue sÃ©rie gagnante:",
        "longest-losing": "Plus longue sÃ©rie perdante:",
        "current-streak": "SÃ©rie en cours:",
        clear: "Effacer",
        "clear-stats": "Effacer les statistiques",
        "clear-stats-text": "ÃŠtes-vous sÃ»r de vouloir effacer les statistiques?",
        "no-more-moves": "Pas d'autres mouvements",
        "no-more-moves-text": "Il n'y a plus de mouvements possibles.",
        "back-and-undo": "Revenir et annuler certains mouvements",
        "select-a-solitaire": "Choisir un solitaire",
        spider: "Spider",
        "spider-deal-info": "Il doit y avoir au moins une carte sur chaque colonne du tableau <br /> avant que vous puissiez distribuer une nouvelle rangÃ©e de cartes.",
        score: "Score",
        time: "Temps",
        moves: "DÃ©plac.",
        "rate-dialog-body": "Si vous aimez utiliser cette app, voudriez-vous prendre un instant pour l'Ã©valuer? Cela ne prendra pas plus d'une minute. Merci de votre soutien!",
        "rate-it-now": "L'Ã©valuer maintenant",
        "rate-later": "Me le rappeler plus tard",
        "do-not-rate": "Non, merci",
        "remove-ads": "Supprimer les pubs",
        "copyright-year": "Copyright Â© 2011-2016 TreeCardGames.",
        "rights-reserved": "Tous droits rÃ©servÃ©s.",
        "about-sup-welcome": "Nous soutenons nos apps et vos commentaires sont les bienvenus.",
        "about-sup-faqs": "Page de FAQ et dâ€™assistance",
        "contact-us": "Contactez-nous",
        "follow-us": "Suivez-nous sur",
        "click-here": "Cliquer ici",
        website: "Site Web",
        "privacy-policy": "Lire la politique de confidentialitÃ©",
        support: "Soutien",
        "want-more-solitaire": "Vous voulez d'autres jeux de solitaire?",
        "try-solsuite": "Essayez SolSuite Solitaire, la collection la plus complÃ¨te de solitaires au monde, avec plus de 620 jeux de solitaire, 60 jeux de cartes, 300 dos de cartes et 100 arriÃ¨re-plans!  Essayez-la maintenant Ã ",
        loading: "Chargement",
        ok: "OK",
        close: "Fermer",
        cancel: "Annuler",
        back: "Retour",
        "reload-title": "Relance nÃ©cessaire",
        "reload-content": "Le jeu doit Ãªtre relancÃ© pour que les modifications prennent effet.",
        "reload-content-app": "Ces options prendront effet lorsque vous ouvrirez une nouvelle session de cette application.",
        "select-game-number": "Choisir un numÃ©ro de jeu",
        "select-game-number-label": "Choisir un numÃ©ro de jeu entre 1 et 9999999",
        play: "Jouer",
        "game-number": "NumÃ©ro de jeu",
        "bad-game-number-label": "Il ne s'agit pas d'un numÃ©ro de jeu valide",
        "try-again": "RÃ©essayer"
    },
    e.lang.it = {
        "game-bakers_game": "FreeCell (Baker)",
        "game-easthaven": "Solitario (Easthaven)",
        "game-eight_off": "Fuori otto",
        "game-forty_thieves": "I quaranta ladroni",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell con due mazzi",
        "game-golf": "Golf",
        "game-golf_easy": "Golf (Facile)",
        "game-klondike": "Solitario",
        "game-klondike_by_threes": "Solitario (3 carte)",
        "game-klondike_two_decks": "Solitario con due mazzi",
        "game-pyramid": "Piramide",
        "game-pyramid_easy": "Piramide (Facile)",
        "game-scorpion": "Scorpion",
        "game-simple_simon": "Sempliciotto",
        "game-spider_four_suits": "Spider (4 semi)",
        "game-spider_one_suit": "Spider (1 seme)",
        "game-spider_two_suits": "Spider (2 semi)",
        blue_felt: "Feltro Blu",
        dark_wood: "Legno Scuro",
        green_felt: "Feltro Verde",
        light_wood: "Legno Chiaro",
        light_wood_tiles: "Legno Chiaro Parquet",
        parquet: "Parquet",
        red_felt: "Feltro Rosso",
        blue_and_yellow_abstract: "Astratto Blu e Giallo",
        blue_web: "Web blu",
        big_ben: "Classico",
        caricatures: "Caricature",
        large_print: "Numeri Grandi",
        large_print_london: "Classico Numeri Grandi",
        large_print_modern: "Moderno Numeri Grandi",
        modern: "Moderno",
        butterflies: "Farfalle",
        cat: "Gatto",
        classic_blue: "Classico Blu",
        classic_brown: "Classico Marrone",
        classic_green: "Classico Verde",
        classic_red: "Classico Rosso",
        cross_blue: "Grata Blu",
        cross_brown: "Grata Marrone",
        cross_green: "Grata Verde",
        cross_red: "Grata Rossa",
        dog: "Cane",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Rombo Blu",
        rhombus_brown: "Rombo Marrone",
        rhombus_green: "Rombo Verde",
        rhombus_red: "Rombo Rosso",
        rose: "Rosa",
        spider_blue: "Ragno Blu",
        spider_red: "Ragno Rosso",
        pyramids: "Piramidi",
        ancient_egypt: "Antico Egitto",
        sahara: "Sahara",
        "more-games": "Altri giochi gratuiti",
        "more-games-freecell-title": "Ti piace FreeCell?",
        "more-games-freecell-desc": "Gioca gratuitamente nel tuo browser FreeCell e una serie di varianti di FreeCell.",
        "more-games-spider-title": "Ti piace Spider?",
        "more-games-spider-desc": "Gioca nel tuo browser una collezione gratuita di solitari basati su Spider.",
        "more-games-word-search-title": "Word Search",
        "more-games-word-search-desc": "Gioca a Word Search gratuitamente online.",
        "app-spider-name": "Spider Solitario",
        "app-spider-desc": "Gioca una collezione gratuita di Spider solitario: Spider (4 semi), Spider (2 Semi), Spider (1 Seme) e Scorpion.",
        "app-freecell-name": "FreeCell",
        "app-freecell-desc": "Gioca una collezione gratuita di FreeCell: FreeCell, FreeCell (2 mazzi), Baker's Game e Eight Off.",
        "app-klondike-name": "Solitario",
        "app-klondike-desc": "Gioca una collezione gratuita di Solitari: Solitario, Solitario (3 carte), Solitario con due mazzi e Solitario (Easthaven).",
        "play-now": "Gioca Ora",
        games: "Giochi",
        new: "Nuova",
        undo: "Annulla",
        hint: "Suggerim.",
        scores: "Statistiche",
        settings: "Settaggi",
        appearance: "Aspetto",
        options: "Opzioni",
        rules: "Regole",
        about: "Informazioni su",
        more: "Menu",
        "new-game": "Nuova Partita",
        "new-game-ask": "Cosa vuoi fare con la partita in corso?",
        "start-new": "Esci ed inizia una nuova partita",
        "start-new-won": "Inizia una nuova partita",
        restart: "Ricomincia questa partita",
        keep: "Continua a giocare",
        "game-sounds": "Suoni",
        "apply-swing": "Applica un effetto oscillante alle carte durante il trascinamento",
        "apply-expand": "Espandi le carte al passaggio del mouse quando le file sono compresse",
        languages: "Lingua",
        "id-language": "Italiano",
        "css3-item": "Usa animazioni hardware-accellerate",
        "enable-effect": "Abilita effetti visuali (ombre, allargamento carte, pulsanti)",
        "left-handed": "Mancino",
        "advanced-options": "Opzioni avanzate",
        on: "Si",
        off: "No",
        "card-set": "Carte",
        "card-back": "Dorso",
        backgrounds: "Sfondo gioco",
        "autoplay-settings": "Metodo di spostamento automatico delle carte sulle Basi",
        "global-autoplay": "Globale",
        "selective-autoplay": "Selettivo",
        "no-autoplay": "Nessuno",
        counters: "Visualizza Contatori",
        "show-score": "Punti",
        "show-time": "Tempo",
        "show-moves": "Mosse",
        "game-won": "Partita Vinta!",
        congratulations: "Congratulazioni!",
        "cong-text": "Hai vinto la partita.",
        won: "vinte",
        lost: "perse",
        win: "vinta",
        wins: "vinte",
        loss: "persa",
        losses: "perse",
        "longest-winning": "Sequenza piÃ¹ lunga di partite vinte:",
        "longest-losing": "Sequenza piÃ¹ lunga di partite perse:",
        "current-streak": "Sequenza corrente:",
        clear: "Azzera",
        "clear-stats": "Statistiche",
        "clear-stats-text": "Sei sicuro di voler azzerare le statistiche?",
        "no-more-moves": "Nessun'altra mossa",
        "no-more-moves-text": "Non ci sono altre mosse disponibili.",
        "back-and-undo": "Torna al gioco ed annulla qualche mossa",
        "select-a-solitaire": "Seleziona un solitario",
        spider: "Spider",
        "spider-deal-info": "Deve esserci almeno una carta in ogni tableau <br /> prima di poter distribuire una nuova riga di carte.",
        score: "Punteggio",
        time: "Tempo",
        moves: "Mosse",
        "rate-dialog-body": "Se ti piace questa App, potresti dedicare un minuto del tuo tempo per darle un bel voto? Grazie per il tuo aiuto!",
        "rate-it-now": "Vota e Commenta",
        "rate-later": "Ricordami piÃ¹ avanti",
        "do-not-rate": "No, Grazie",
        "remove-ads": "Rimuovi PubblicitÃ ",
        "copyright-year": "Copyright (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Tutti i diritti riservati.",
        "about-sup-welcome": "Contattaci per informazioni o chiarimenti sulle ns. Apps.",
        "about-sup-faqs": "FAQs e pagina support",
        "contact-us": "Contattaci",
        "follow-us": "Seguici su",
        "click-here": "clicca qui",
        website: "Sito web",
        "privacy-policy": "Privacy",
        support: "Supporto",
        "want-more-solitaire": "PiÃ¹ solitari?",
        "try-solsuite": "Prova SolSuite Solitaire, la collezione di Solitari piÃ¹ completa al mondo con piÃ¹ di 620 solitari, 60 set di carte, 300 dorsi e 100 sfondi! Provalo ora",
        loading: "Carica...",
        ok: "OK",
        close: "Chiudi",
        cancel: "Annulla",
        back: "Indietro",
        "reload-title": "Ricaricare il gioco",
        "reload-content": "E' necessario ricaricare il gioco affinchÃ© le modifiche siano applicate.",
        "reload-content-app": "L'opzione Ã¨ stata aggiornata e diventerÃ  effettiva al prossimo avvio della App.",
        "select-game-number": "Seleziona un Numero di Partita",
        "select-game-number-label": "Seleziona un Numero di Partita da 1 a 9999999",
        play: "Gioca",
        "game-number": "Partita Numero",
        "bad-game-number-label": "Numero di Partita non valido",
        "try-again": "Riprova"
    },
    e.lang.nl = {
        "game-bakers_game": "Baker's Game",
        "game-easthaven": "Easthaven",
        "game-eight_off": "Eight Off",
        "game-forty_thieves": "Forty Thieves",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell 2 kaartspellen",
        "game-golf": "Golf",
        "game-golf_easy": "Golf Easy",
        "game-klondike": "Patience (Klondike)",
        "game-klondike_by_threes": "Patience 3 kaarten",
        "game-klondike_two_decks": "Patience 2 kaartspellen",
        "game-pyramid": "Pyramid",
        "game-pyramid_easy": "Pyramid Easy",
        "game-scorpion": "Scorpion",
        "game-simple_simon": "Simple Simon",
        "game-spider_four_suits": "Spider 4 kaartsoorten",
        "game-spider_one_suit": "Spider 1 kaartsoort",
        "game-spider_two_suits": "Spider 2 kaartsoorten",
        blue_felt: "Blauw vilt",
        dark_wood: "Donkerhout",
        green_felt: "Groen vilt",
        light_wood: "Lichthout",
        light_wood_tiles: "Lichthouten tegels",
        parquet: "Parket",
        red_felt: "Rood vilt",
        blue_and_yellow_abstract: "Blauw en geel abstract",
        blue_web: "Blauw web",
        christmas_aglow: "Kerstboom",
        christmas_bells_and_bows: "Kerstbellen en strikken",
        cozy_cabin: "Gezellig huisje",
        decorating_the_tree: "Kerstboom versieren",
        glitter_and_greens: "Glitter en groen",
        let_it_snow: "Laat het sneeuwen",
        modern_christmas_green: "Moderne kerst groen",
        silent_night: "Stille Nacht",
        winter_wonderland: "Winter Wonderland",
        woodland_christmas: "Kerst in het bos",
        big_ben: "Klassiek",
        caricatures: "Karikaturen",
        large_print: "Grote letters",
        large_print_london: "Grote letters klassiek",
        large_print_modern: "Grote letters modern",
        modern: "Modern",
        christmas: "Kerstmis",
        merry_christmas: "Prettig Kerstfeest",
        butterflies: "Vlinders",
        cat: "Kat",
        classic_blue: "Klassiek blauw",
        classic_brown: "Klassiek bruin",
        classic_green: "Klassiek groen",
        classic_red: "Klassiek rood",
        cross_blue: "Rooster blauw",
        cross_brown: "Rooster bruin",
        cross_green: "Rooster groen",
        cross_red: "Rooster rood",
        dog: "Hond",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Rhombus blauw",
        rhombus_brown: "Rhombus bruin",
        rhombus_green: "Rhombus groen",
        rhombus_red: "Rhombus rood",
        rose: "Roos",
        spider_blue: "Spin blauw",
        spider_red: "Spin rood",
        pyramids: "Piramiden",
        ancient_egypt: "Oude Egypte",
        sahara: "Sahara",
        holidays_and_christmas_tree: "Feestdagen en kerstboom",
        party_present: "Feestcadeautje",
        santa_claus_in_chimney: "Kerstman in schoorsteen",
        santa_claus_rings_bells: "Kerstman met bellen",
        santa_with_beautiful_angel: "Kerstman met mooie engel",
        snow_man: "Sneeuwpop",
        spring_flower_christmas_tree: "Lentebloem kerstboom",
        "more-games": "Meer gratis spellen",
        "more-games-freecell-title": "Verslaafd aan FreeCell?",
        "more-games-freecell-desc": "Speel FreeCell, FreeCell 2 kaartspellen, Baker's Game en Eight Off.",
        "more-games-spider-title": "Verslaafd aan Spider?",
        "more-games-spider-desc": "Speel in je browser een prachtige gratis Spider Solitaire-spelcollectie.",
        "more-games-word-search-title": "Zoekwoorden",
        "more-games-word-search-desc": "Gratis online zoekwoorden-puzzelspel.",
        "app-spider-name": "Spider Solitaire",
        "app-spider-desc": "Speel gratis verschillende prachtige variaties op het spel Spider Solitaire, zoals: Spider 4 kaartsoorten, Spider 1 kaartsoort, Spider 2 kaartsoorten, Scorpion",
        "app-freecell-name": "FreeCell",
        "app-freecell-desc": "Speel gratis verschillende prachtige variaties op het spel FreeCell Solitaire, zoals: FreeCell, FreeCell 2 kaartspellen, Eight Off, Baker's Game",
        "app-klondike-name": "Patience",
        "app-klondike-desc": "Een prachtige collectie patience-spellen voor urenlang speelplezier, voorzien van alle mogelijke functies en vormgevingsopties.",
        "play-now": "Nu spelen",
        games: "Spellen",
        new: "Nieuw",
        undo: "Ongedaan",
        hint: "Hint",
        scores: "Statistieken",
        settings: "Instellingen",
        appearance: "Uiterlijk",
        options: "Opties",
        rules: "Spelregels",
        about: "Informatie",
        more: "Menu",
        "new-game": "Nieuw spel",
        "new-game-ask": "Wat wil je doen met je huidige spel?",
        "start-new": "Stoppen en een nieuw spel starten",
        "start-new-won": "Nieuw spel starten",
        restart: "Spel herstarten",
        keep: "Verder spelen",
        "game-sounds": "Spelgeluiden",
        "apply-swing": "Schommelende kaart-effect toepassen tijdens het slepen",
        "apply-expand": "Kaarten uitvouwen wanneer de muis erop staat als de tableaukolommen opgevouwen zijn",
        languages: "Taal",
        "css3-item": "Hardware-geaccelereerde animaties gebruiken",
        "enable-effect": "Visuele effecten inschakelen (schaduwen, vergrote kaarten, knoppen)",
        "left-handed": "Linkshandig",
        "advanced-options": "Geavanceerde opties",
        on: "Aan",
        off: "Uit",
        "card-set": "Kaartspel",
        "card-back": "Keerzijde",
        backgrounds: "Achtergronden",
        "autoplay-settings": "Autospel-instellingen",
        "global-autoplay": "Globaal",
        "selective-autoplay": "Selectief",
        "no-autoplay": "Uitgeschakeld",
        counters: "Toon tellers",
        "show-score": "Score",
        "show-time": "Tijd",
        "show-moves": "Zetten",
        "game-won": "Spel gewonnen!",
        congratulations: "Gefeliciteerd!",
        "cong-text": "Gefeliciteerd! Je hebt het spel gewonnen.",
        won: "gewonnen",
        lost: "verloren",
        win: "winst",
        wins: "winsten",
        loss: "verlies",
        losses: "verliezen",
        "longest-winning": "Langste winperiode:",
        "longest-losing": "Langste verliesperiode:",
        "current-streak": "Huidige periode:",
        clear: "Wissen",
        "clear-stats": "Statistieken wissen",
        "clear-stats-text": "Weet je zeker dat je de statistieken wilt wissen?",
        "no-more-moves": "Geen zetten meer",
        "no-more-moves-text": "Er zijn geen zetten meer beschikbaar.",
        "back-and-undo": "Ga terug en maak een aantal zetten ongedaan",
        "select-a-solitaire": "Selecteer een patience-spel",
        spider: "Spider",
        "spider-deal-info": "Er moet ten minste Ã©Ã©n kaart in elk tableau liggen voordat je een nieuwe rij kaarten kunt leggen.",
        score: "Score",
        time: "Tijd",
        moves: "Zetten",
        "rate-dialog-body": "Als je deze app leuk vindt, kun je dan misschien even de tijd nemen om hem een waardering te geven? Het duurt niet lang. Bedankt voor je steun!",
        "rate-it-now": "Nu waarderen",
        "rate-later": "Herinner me eraan",
        "do-not-rate": "Nee bedankt",
        "remove-ads": "Advertenties verwijderen",
        "copyright-year": "Copyright (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Alle rechten voorbehouden.",
        "about-sup-welcome": "Wij bieden ondersteuning voor onze apps en horen graag feedback.",
        "about-sup-faqs": "Veelgestelde vragen en hulppagina",
        "contact-us": "Contact",
        "follow-us": "Volg ons op",
        "click-here": "klik hier",
        website: "Website",
        "privacy-policy": "Privacybeleid",
        support: "Hulppagina",
        "want-more-solitaire": "Wil je meer patience-spellen?",
        "try-solsuite": "Probeer SolSuite Solitaire, de meest complete patience-collectie ter wereld met meer dan 640 patience-spellen, 60 kaartspellen, 300 keerzijdes en 100 achtergronden! Probeer het nu bij",
        loading: "Laden",
        ok: "OK",
        close: "Sluiten",
        cancel: "Annuleren",
        back: "Terug",
        "reload-title": "Opnieuw opstarten vereist",
        "reload-content": "Om de veranderingen door te kunnen voeren, moet het spel opnieuw opgestart worden",
        "reload-content-app": "Deze opties worden de volgende keer dat u deze app opent van kracht.",
        "select-game-number": "Selecteer een spelnummer",
        "select-game-number-label": "Selecteer een spelnummer van 1 t/m 9999999",
        play: "Spelen",
        "game-number": "Spelnummer",
        "bad-game-number-label": "Dat is geen geldig spelnummer",
        "try-again": "Probeer het opnieuw"
    },
    e.lang.sv = {
        "game-bakers_game": "Baker's Game",
        "game-easthaven": "Easthaven",
        "game-eight_off": "Eight Off",
        "game-forty_thieves": "Forty Thieves",
        "game-freecell": "Kungen (FreeCell)",
        "game-freecell_two_decks": "Kungen tvÃ¥ kortlekar",
        "game-golf": "Golf",
        "game-golf_easy": "Golf enkel",
        "game-klondike": "Harpan (Klondike)",
        "game-klondike_by_threes": "Harpan med tre",
        "game-klondike_two_decks": "Harpan tvÃ¥ kortlekar",
        "game-pyramid": "Pyramid",
        "game-pyramid_easy": "Pyramid enkel",
        "game-scorpion": "Skorpion",
        "game-simple_simon": "Simple Simon",
        "game-spider_four_suits": "Spindelharpan fyra fÃ¤rger",
        "game-spider_one_suit": "Spindelharpan en fÃ¤rg",
        "game-spider_two_suits": "Spindelharpan tvÃ¥ fÃ¤rger",
        blue_felt: "BlÃ¥ filt",
        dark_wood: "MÃ¶rkt trÃ¤",
        green_felt: "GrÃ¶n filt",
        light_wood: "Ljust trÃ¤",
        light_wood_tiles: "Ljusa trÃ¤plankor",
        parquet: "Parkett",
        red_felt: "RÃ¶d filt",
        blue_and_yellow_abstract: "BlÃ¥ och gul abstrakt",
        blue_web: "BlÃ¥tt nÃ¤t",
        christmas_aglow: "Julgran",
        christmas_bells_and_bows: "JulbjÃ¤llror och rosetter",
        cozy_cabin: "Mysig stuga",
        decorating_the_tree: "KlÃ¤ granen",
        glitter_and_greens: "Glitter och grÃ¶nt",
        let_it_snow: "SnÃ¶fall",
        modern_christmas_green: "Modernt julgrÃ¶nt",
        silent_night: "Stilla natt",
        winter_wonderland: "Vinterlandskap",
        woodland_christmas: "Julig skog",
        big_ben: "Klassisk",
        caricatures: "Karikatyrer",
        large_print: "Stort tryck",
        large_print_london: "Stort tryck klassisk",
        large_print_modern: "Stort tryck modern",
        modern: "Modern",
        christmas: "Jul",
        merry_christmas: "God jul",
        butterflies: "FjÃ¤rilar",
        cat: "Katt",
        classic_blue: "Klassisk blÃ¥",
        classic_brown: "Klassisk brun",
        classic_green: "Klassisk grÃ¶n",
        classic_red: "Klassisk rÃ¶d",
        cross_blue: "Rutig blÃ¥",
        cross_brown: "Rutig brun",
        cross_green: "Rutig grÃ¶n",
        cross_red: "Rutig rÃ¶d",
        dog: "Hund",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "BlÃ¥ romber",
        rhombus_brown: "Bruna romber",
        rhombus_green: "GrÃ¶na romber",
        rhombus_red: "RÃ¶da romber",
        rose: "Ros",
        spider_blue: "BlÃ¥ spindel",
        spider_red: "RÃ¶d spindel",
        pyramids: "Pyramider",
        ancient_egypt: "Antikens egypten",
        sahara: "Sahara",
        holidays_and_christmas_tree: "HÃ¶gtider och julgran",
        party_present: "Present",
        santa_claus_in_chimney: "Tomten i skorstenen",
        santa_claus_rings_bells: "Tomten ringer i bjÃ¤llra",
        santa_with_beautiful_angel: "Tomten med vacker Ã¤ngel",
        snow_man: "SnÃ¶gubbe",
        spring_flower_christmas_tree: "VÃ¥rblomma julgran",
        "more-games": "Fler gratisspel",
        "more-games-freecell-title": "Beroende av FreeCell?",
        "more-games-freecell-desc": "Spela FreeCell, FreeCell Two Decks, Baker's Game och Eight Off.",
        "more-games-spider-title": "Beroende av Spider?",
        "more-games-spider-desc": "Spela en samling vackra och gratis Spider aspel i din webblÃ¤sare.",
        "more-games-word-search-title": "OrdsÃ¶k",
        "more-games-word-search-desc": "Gratis ordsÃ¶kspel online.",
        "app-spider-name": "Spindelharpan",
        "app-spider-desc": "Spela en vacker och gratis samling av spelvariationer pÃ¥ patiensen Spindelharpan (Spider), inklusive: Spindelharpan fyra fÃ¤rger, Spindelharpan tvÃ¥ fÃ¤rger, Spindelharpan en fÃ¤rg, Skorpion.",
        "app-freecell-name": "Kungen (FreeCell)",
        "app-freecell-desc": "Spela en vacker och gratis samling av spelvariationer pÃ¥ patiensen Kungen (FreeCell), inklusive: Kungen (FreeCell), Kungen tvÃ¥ kortlekar, Eight Off, Baker's Game.",
        "app-klondike-name": "Harpan (Klondike)",
        "app-klondike-desc": "Slappna av med denna vackra samling patienser, kompletta med alla funktioner och anpassningsalternativ.",
        "play-now": "Spela nu",
        games: "Spel",
        new: "Nytt",
        undo: "Ã…ngra",
        hint: "LedtrÃ¥d",
        scores: "Statistik",
        settings: "InstÃ¤llningar",
        appearance: "Utseende",
        options: "Alternativ",
        rules: "Regler",
        about: "Om",
        more: "Meny",
        "new-game": "Nytt spel",
        "new-game-ask": "Vad vill du gÃ¶ra med det pÃ¥gÃ¥ende spelet?",
        "start-new": "Avsluta och starta ett nytt spel",
        "start-new-won": "Starta ett nytt spel",
        restart: "Starta om det hÃ¤r spelet",
        keep: "FortsÃ¤tt spela",
        "game-sounds": "Spelljud",
        "apply-swing": "AnvÃ¤nd gungande speleffekt vid drag",
        "apply-expand": "Visa alla kort i kolumnen pÃ¥ spelplanens nedre del nÃ¤r musen hÃ¥lls Ã¶ver den",
        languages: "SprÃ¥k",
        "id-language": "Svenska",
        "css3-item": "AnvÃ¤nd hÃ¥rdvaruaccelererade animationer",
        "enable-effect": "Aktivera visuella effekter (skuggor, kortfÃ¶rstoring, knappar)",
        "left-handed": "VÃ¤nsterhÃ¤nt",
        "advanced-options": "Avancerade alternativ",
        on: "PÃ¥",
        off: "Av",
        "card-set": "KortuppsÃ¤ttning",
        "card-back": "Kortbaksida",
        backgrounds: "Bakgrunder",
        "autoplay-settings": "InstÃ¤llningar fÃ¶r autospel",
        "global-autoplay": "Globala",
        "selective-autoplay": "Valda",
        "no-autoplay": "Inaktiverade",
        counters: "Visa rÃ¤knare",
        "show-score": "PoÃ¤ng",
        "show-time": "Tid",
        "show-moves": "Drag",
        "game-won": "Du vann spelet!",
        congratulations: "Grattis!",
        "cong-text": "Grattis! Du vann spelet!",
        won: "vunna",
        lost: "fÃ¶rlorade",
        win: "vinst",
        wins: "vinster",
        loss: "fÃ¶rlust",
        losses: "fÃ¶rluster",
        "longest-winning": "Antal vinster i rad:",
        "longest-losing": "Antal fÃ¶rluster i rad:",
        "current-streak": "Aktuellt antal i rad:",
        clear: "Rensa",
        "clear-stats": "Rensa statistik",
        "clear-stats-text": "Ã„r du sÃ¤ker pÃ¥ att du vill rensa statistiken?",
        "no-more-moves": "Inga fler drag",
        "no-more-moves-text": "Det finns inga fler mÃ¶jliga drag.",
        "back-and-undo": "GÃ¥ tillbaka och Ã¥ngra nÃ¥gra drag",
        "select-a-solitaire": "VÃ¤lj en patiens",
        spider: "Spider (Spindelharpan)",
        "spider-deal-info": "Det mÃ¥ste ligga minst ett kort i varje kolumn pÃ¥ spelplanens nedre del <br /> innan du kan lÃ¤gga upp en ny rad kort.",
        score: "PoÃ¤ng",
        time: "Tid",
        moves: "Drag",
        "rate-dialog-body": "Om du gillade den hÃ¤r appen, skulle du vilja ta ett Ã¶gonblick och betygsÃ¤tta den? Det tar bara nÃ¥gon minut. Tack fÃ¶r ditt stÃ¶d!",
        "rate-it-now": "BetygsÃ¤tt nu",
        "rate-later": "PÃ¥minn mig senare",
        "do-not-rate": "Nej tack",
        "remove-ads": "Ta bort reklam",
        "copyright-year": "Copyright (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Med ensamrÃ¤tt.",
        "about-sup-welcome": "Vi underhÃ¥ller vÃ¥ra appar och tar gÃ¤rna emot din feedack.",
        "about-sup-faqs": "Vanliga frÃ¥gor och supportsida",
        "contact-us": "Kontakta oss",
        "follow-us": "FÃ¶lj oss pÃ¥",
        "follow-us-fb": "FÃ¶lj oss pÃ¥ Facebook",
        "follow-us-gp": "FÃ¶lj oss pÃ¥ Google+",
        "click-here": "Klicka hÃ¤r",
        website: "Webbplats",
        "privacy-policy": "Integritetspolicy",
        support: "Support",
        "want-more-solitaire": "Vill du ha fler patienser?",
        "try-solsuite": "Prova pÃ¥ SolSuite Solitaire, vÃ¤rldens mest kompletta patienssamling med fler Ã¤n 640 patienser, 60 kortuppsÃ¤ttningar, 300 kortbaksidor och 100 bakgrunder! Prova nu pÃ¥",
        loading: "Laddar",
        ok: "OK",
        close: "StÃ¤ng",
        cancel: "Avbryt",
        back: "Tillbaka",
        "reload-title": "Omladdning krÃ¤vs",
        "reload-content": "Spelet mÃ¥ste laddas om fÃ¶r att Ã¤ndringarna ska bÃ¶rja gÃ¤lla.",
        "reload-content-app": "InstÃ¤llningarna har uppdaterats och bÃ¶rjar gÃ¤lla nÃ¤sta gÃ¥ng du startar den hÃ¤r appen.",
        "select-game-number": "VÃ¤lj ett spelnummer",
        "select-game-number-label": "VÃ¤lj ett spelnummer frÃ¥n 1 till 9999999",
        play: "Spela",
        "game-number": "Spelnummer",
        "bad-game-number-label": "Det Ã¤r ett ogiltigt spelnummer",
        "try-again": "FÃ¶rsÃ¶k igen",
        "cookies-consent": "Denna webbplats anvÃ¤nder cookies fÃ¶r att se till att du fÃ¥r den bÃ¤sta spelupplevelsen pÃ¥ vÃ¥r webbplats.",
        "cookies-more-info": "Mer info"
    },
    e.lang.zh = {
        "autoplay-settings": "è‡ªåŠ¨å®Œæˆè®¾ç½®",
        "apply-expand": "è‡ªåŠ¨ç§»åŠ¨å¡ç‰‡",
        "game-bakers_game": "Baker's Game",
        "new-game-ask": "æ¸¸æˆæ­£åœ¨è¿›è¡Œä¸­ï¼Œè¯·é—®ä½ æ‰“ç®—ï¼Ÿ",
        cancel: "å–æ¶ˆ",
        close: "å…³é—­",
        "game-easthaven": "Easthaven",
        "game-spider_one_suit": "Spider One Suit",
        "game-klondike_two_decks": "Klondike Two Decks",
        "global-autoplay": "ä»»æ„è‡ªåŠ¨å®Œæˆ",
        "game-sounds": "éŸ³æ•ˆ",
        hint: "æç¤º",
        "new-game": "æ–°æ¸¸æˆ",
        "game-simple_simon": "Simple Simon",
        "start-new": "é‡æ–°å¼€å§‹ä¸€ä¸ªæ–°æ¸¸æˆ",
        new: "æ–°æ¸¸æˆ",
        "game-klondike": "Klondike",
        "game-freecell_two_decks": "FreeCell Two Decks",
        rules: "è§„åˆ™",
        "game-klondike_by_threes": "Klondike by Threes",
        undo: "æ’¤é”€",
        back: "è¿”å›ž",
        "game-golf_easy": "Golf Easy",
        "game-freecell": "FreeCell",
        "game-forty_thieves": "Forty Thieves",
        "game-spider_four_suits": "Spider Four Suits",
        scores: "åˆ†æ•°",
        "apply-swing": "åŠ¨æ€æ‹–åŠ¨æ•ˆæžœ",
        "game-scorpion": "Scorpion",
        restart: "é‡çŽ©è¿™ä¸ªæ¸¸æˆ",
        ok: "å¥½",
        settings: "è®¾ç½®",
        clear: "æ¸…é™¤",
        "start-new-won": "é‡æ–°å¼€å§‹ä¸€ä¸ªæ–°æ¸¸æˆ",
        appearance: "å¤–è§‚",
        keep: "ç»§ç»­",
        "game-eight_off": "Eight Off",
        "game-golf": "Golf",
        "game-pyramid_easy": "Pyramid Easy",
        games: "å…¶ä»–æ¸¸æˆ",
        "game-pyramid": "Pyramid",
        "game-spider_two_suits": "Spider Two Suits",
        options: "é€‰é¡¹"
    },
    e.lang.pt_br = {
        "game-bakers_game": "Jogo do Padeiro",
        "game-easthaven": "Easthaven",
        "game-eight_off": "Oito Fora",
        "game-forty_thieves": "Forty Thieves",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell Dois Baralhos",
        "game-golf": "Golf",
        "game-golf_easy": "Golf FÃ¡cil",
        "game-klondike": "PaciÃªncia (Klondike)",
        "game-klondike_by_threes": "PaciÃªncia trÃªs cartas",
        "game-klondike_two_decks": "PaciÃªncia Dois Baralhos",
        "game-pyramid": "Pyramid",
        "game-pyramid_easy": "Pyramid FÃ¡cil",
        "game-scorpion": "EscorpiÃ£o",
        "game-simple_simon": "Simple Simon",
        "game-spider_four_suits": "Spider Quatro Naipes",
        "game-spider_one_suit": "Spider Um Naipe",
        "game-spider_two_suits": "Spider Dois Naipes",
        blue_felt: "Feltro Azul",
        dark_wood: "Madeira Escura",
        green_felt: "Feltro Verde",
        light_wood: "Madeira Clara",
        light_wood_tiles: "Ladrilhos de Madeira Clara",
        parquet: "Parquete",
        red_felt: "Feltro Vermelho",
        blue_and_yellow_abstract: "Abstrato Azul e Amarelo",
        blue_web: "Teia Azul",
        christmas_aglow: "Ãrvore de Natal",
        christmas_bells_and_bows: "Sinos e LaÃ§os Natalinos",
        cozy_cabin: "Cabana Aconchegante",
        decorating_the_tree: "Decorando a Ãrvore",
        glitter_and_greens: "Verde Brilhante",
        let_it_snow: "Nevasca",
        modern_christmas_green: "Verde Natalino Moderno",
        silent_night: "Noite Silenciosa",
        winter_wonderland: "Inverno no PaÃ­s das Maravilhas",
        woodland_christmas: "Bosque de Natal",
        big_ben: "ClÃ¡ssico",
        caricatures: "Caricaturas",
        large_print: "Caracteres Grandes",
        large_print_london: "Caracteres Grandes ClÃ¡ssicos",
        large_print_modern: "Caracteres Grandes Modernos",
        modern: "Moderno",
        christmas: "Natal",
        merry_christmas: "Feliz Natal",
        butterflies: "Borboletas",
        cat: "Gato",
        classic_blue: "Azul ClÃ¡ssico",
        classic_brown: "Marrom ClÃ¡ssico",
        classic_green: "Verde ClÃ¡ssico",
        classic_red: "Vermelho ClÃ¡ssico",
        cross_blue: "Grade Azul",
        cross_brown: "Grade Marrom",
        cross_green: "Grade Verde",
        cross_red: "Grade Vermelha",
        dog: "CÃ£o",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Losango Azul",
        rhombus_brown: "Losango Marrom",
        rhombus_green: "Losango Verde",
        rhombus_red: "Losango Vermelho",
        rose: "Rosa",
        spider_blue: "Aranha Azul",
        spider_red: "Aranha Vermelha",
        pyramids: "PirÃ¢mides",
        ancient_egypt: "Egito Antigo",
        sahara: "Saara",
        holidays_and_christmas_tree: "Festas e Ãrvore de Natal",
        party_present: "Presente Festivo",
        santa_claus_in_chimney: "Papai Noel na ChaminÃ©",
        santa_claus_rings_bells: "Papai Noel Toca os Sinos",
        santa_with_beautiful_angel: "Papai Noel com o Belo Anjo",
        snow_man: "Boneco de Neve",
        spring_flower_christmas_tree: "Ãrvore de Natal com Flores da Primavera",
        "more-games": "Mais Jogos GrÃ¡tis",
        "more-games-freecell-title": "Viciado no FreeCell?",
        "more-games-freecell-desc": "Jogue FreeCell, FreeCell Dois Baralhos, Baker's Game e Eight Off.",
        "more-games-spider-title": "Viciado no Spider?",
        "more-games-spider-desc": "Jogue no seu navegador uma bela coleÃ§Ã£o de jogos do Spider Solitaire grÃ¡tis.",
        "more-games-word-search-title": "CaÃ§a-palavras",
        "more-games-word-search-desc": "Jogo de CaÃ§a-palavra online grÃ¡tis.",
        "app-spider-name": "PaciÃªncia Spider",
        "app-spider-desc": "Jogue uma bela coleÃ§Ã£o grÃ¡tis das variaÃ§Ãµes do jogo PaciÃªncia Spider com: Spider Quatro Naipes, Spider Dois Naipes, Spider Um Naipe, EscorpiÃ£o.",
        "app-freecell-name": "FreeCell",
        "app-freecell-desc": "Jogue uma bela coleÃ§Ã£o grÃ¡tis das variaÃ§Ãµes do jogo FreeCell com: FreeCell, FreeCell Dois Baralhos, Oito Fora, Jogo do Padeiro.",
        "app-klondike-name": "PaciÃªncia",
        "app-klondike-desc": "Desfrute desta bela coleÃ§Ã£o de jogos do Solitaire com opÃ§Ãµes completes de funcionalidades e personalizaÃ§Ãµes.",
        "play-now": "Jogue agora",
        games: "Jogos",
        new: "Novo",
        undo: "Desfazer",
        hint: "Dica",
        scores: "EstatÃ­sticas",
        settings: "Ajustes",
        appearance: "AparÃªncia",
        options: "OpÃ§Ãµes",
        rules: "Regras",
        about: "Sobre",
        more: "Menu",
        "new-game": "Novo Jogo",
        "new-game-ask": "O que gostarias de fazer com o jogo em progresso?",
        "start-new": "Encerrar e Iniciar um Novo Jogo",
        "start-new-won": "Iniciar um Novo Jogo",
        restart: "Reiniciar Este Jogo",
        keep: "Continuar Jogando",
        "game-sounds": "Sons do Jogo",
        "apply-swing": "Aplique o efeito de carta oscilante ao arrastar",
        "apply-expand": "Amplie as cartas passando o mause sobre ela quando as colunas do tabuleiro estiverem compactadas",
        languages: "Idioma",
        "id-language": "PortuguÃªs",
        "css3-item": "Use animaÃ§Ãµes aceleradas por hardware",
        "enable-effect": "Habilitar efeitos visuais (sombras, alargamento de cartas, botÃµes)",
        "left-handed": "Canhoto",
        "advanced-options": "OpÃ§Ãµes AvanÃ§adas",
        on: "Ativado",
        off: "Desativado",
        "card-set": "Conjunto de Cartas",
        "card-back": "Verso da Carta",
        backgrounds: "Fundos",
        "autoplay-settings": "ConfiguraÃ§Ãµes do Autoplay",
        "global-autoplay": "Global",
        "selective-autoplay": "Seletivo",
        "no-autoplay": "Desativado",
        counters: "Mostrar Contadores",
        "show-score": "PontuaÃ§Ã£o",
        "show-time": "Tempo",
        "show-moves": "Movimentos",
        "game-won": "Jogo Vencido!",
        congratulations: "ParabÃ©ns!",
        "cong-text": "ParabÃ©ns por vencer o jogo!",
        won: "Vencidos",
        lost: "Perdidos",
        win: "vitÃ³ria",
        wins: "vitÃ³rias",
        loss: "Derrota",
        losses: "Derrotas",
        "longest-winning": "Maior SequÃªncia de VitÃ³rias:",
        "longest-losing": "Maior SequÃªncia de Derrotas:",
        "current-streak": "SequÃªncia atual:",
        clear: "Limpar",
        "clear-stats": "Limpar EstatÃ­sticas",
        "clear-stats-text": "Tem certeza de que deseja limpar as estatÃ­sticas?",
        "no-more-moves": "Sem movimentos",
        "no-more-moves-text": "NÃ£o hÃ¡ mais movimentos disponÃ­veis.",
        "back-and-undo": "Voltar e desfazer alguns movimentos",
        "select-a-solitaire": "Selecionar um Solitaire",
        spider: "Spider",
        "spider-deal-info": "Deve haver ao menos uma carta em cada coluna do tabuleiro <br /> antes de distribuir uma nova fileira de cartas.",
        score: "PontuaÃ§Ã£o",
        time: "Tempo",
        moves: "Movimentos",
        "rate-dialog-body": "Se gostas do app, poderias reservar um momento para avaliÃ¡-lo? NÃ£o levarÃ¡ mais que um minuto. Obrigado pelo apoio!",
        "rate-it-now": "Avaliar agora",
        "rate-later": "Lembre-me depois",
        "do-not-rate": "NÃ£o, obrigado",
        "remove-ads": "Remove Ads",
        "copyright-year": "Copyright (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Todos os direitos reservados.",
        "about-sup-welcome": "Damos suporte a nosso apps e sua opiniÃ£o Ã© bem-vinda.",
        "about-sup-faqs": "FAQs e pÃ¡gina de Suporte",
        "contact-us": "Contate-nos",
        "follow-us": "Siga-nos no",
        "follow-us-fb": "Siga-nos no Facebook",
        "follow-us-gp": "Siga-nos no Google+",
        "click-here": "Clique aqui",
        website: "Site",
        "privacy-policy": "PolÃ­tica de Privacidade",
        support: "Suporte",
        "want-more-solitaire": "Quer mais jogos do Solitaire?",
        "try-solsuite": "Experimente o SolSuite Solitaire, a mais complete ColeÃ§Ã£o do Solitaire do Mundo com mais de 640 jogos de solitaire, 60 conjuntos de cartas, 300 versos de cartas e 100 imagens de fundo! Experimente agora em",
        loading: "Carregando",
        ok: "OK",
        close: "Fechar",
        cancel: "Cancelar",
        back: "Voltar",
        "reload-title": "Requer Recarregamento",
        "reload-content": "O jogo precisa ser recarregado para as alteraÃ§Ãµes funcionarem.",
        "reload-content-app": "As configuraÃ§Ãµes foram atualizadas e funcionaram da prÃ³xima vez que o app for iniciado.",
        "select-game-number": "Selecione um NÃºmero do Jogo",
        "select-game-number-label": "Selecione um nÃºmero do jogo de 1 a 9999999",
        play: "Jogar",
        "game-number": "NÃºmero do Jogo",
        "bad-game-number-label": "Esse nÃ£o Ã© um nÃºmero do jogo vÃ¡lido",
        "try-again": "Tente outra vez",
        "cookies-consent": "Este site utiliza cookies para garantir que tenhas a melhor experiÃªncia no nosso site.",
        "cookies-more-info": "Mais informaÃ§Ãµes"
    },
    e.lang.pt_pt = {
        "game-bakers_game": "Jogo do Padeiro",
        "game-easthaven": "Easthaven",
        "game-eight_off": "Oito Fora",
        "game-forty_thieves": "Forty Thieves",
        "game-freecell": "FreeCell",
        "game-freecell_two_decks": "FreeCell Dois Baralhos",
        "game-golf": "Golf",
        "game-golf_easy": "Golf FÃ¡cil",
        "game-klondike": "SolitÃ¡rio (Klondike)",
        "game-klondike_by_threes": "SolitÃ¡rio trÃªs cartas",
        "game-klondike_two_decks": "SolitÃ¡rio Dois Baralhos",
        "game-pyramid": "Pyramid",
        "game-pyramid_easy": "Pyramid FÃ¡cil",
        "game-scorpion": "EscorpiÃ£o",
        "game-simple_simon": "Simple Simon",
        "game-spider_four_suits": "Spider Quatro Naipes",
        "game-spider_one_suit": "Spider Um Naipe",
        "game-spider_two_suits": "Spider Dois Naipes",
        blue_felt: "Feltro Azul",
        dark_wood: "Madeira Escura",
        green_felt: "Feltro Verde",
        light_wood: "Madeira Clara",
        light_wood_tiles: "Ladrilhos de Madeira Clara",
        parquet: "Parquete",
        red_felt: "Feltro Vermelho",
        blue_and_yellow_abstract: "Abstrato Azul e Amarelo",
        blue_web: "Teia Azul",
        christmas_aglow: "Ãrvore de Natal",
        christmas_bells_and_bows: "Sinos e LaÃ§os Natalinos",
        cozy_cabin: "Cabana Aconchegante",
        decorating_the_tree: "Decorando a Ãrvore",
        glitter_and_greens: "Verde Brilhante",
        let_it_snow: "Nevasca",
        modern_christmas_green: "Verde Natalino Moderno",
        silent_night: "Noite Silenciosa",
        winter_wonderland: "Inverno no PaÃ­s das Maravilhas",
        woodland_christmas: "Bosque de Natal",
        big_ben: "ClÃ¡ssico",
        caricatures: "Caricaturas",
        large_print: "Caracteres Grandes",
        large_print_london: "Caracteres Grandes ClÃ¡ssicos",
        large_print_modern: "Caracteres Grandes Modernos",
        modern: "Moderno",
        christmas: "Natal",
        merry_christmas: "Feliz Natal",
        butterflies: "Borboletas",
        cat: "Gato",
        classic_blue: "Azul ClÃ¡ssico",
        classic_brown: "Marrom ClÃ¡ssico",
        classic_green: "Verde ClÃ¡ssico",
        classic_red: "Vermelho ClÃ¡ssico",
        cross_blue: "Grade Azul",
        cross_brown: "Grade Marrom",
        cross_green: "Grade Verde",
        cross_red: "Grade Vermelha",
        dog: "CÃ£o",
        lawrence: "Lawrence",
        monet: "Monet",
        renoir: "Renoir",
        rhombus_blue: "Losango Azul",
        rhombus_brown: "Losango Marrom",
        rhombus_green: "Losango Verde",
        rhombus_red: "Losango Vermelho",
        rose: "Rosa",
        spider_blue: "Aranha Azul",
        spider_red: "Aranha Vermelha",
        pyramids: "PirÃ¢mides",
        ancient_egypt: "Egito Antigo",
        sahara: "Saara",
        holidays_and_christmas_tree: "Festas e Ãrvore de Natal",
        party_present: "Presente Festivo",
        santa_claus_in_chimney: "Pai Natal na ChaminÃ©",
        santa_claus_rings_bells: "Pai Natal Toca os Sinos",
        santa_with_beautiful_angel: "Pai Natal com o Belo Anjo",
        snow_man: "Boneco de Neve",
        spring_flower_christmas_tree: "Ãrvore de Natal com Flores da Primavera",
        "more-games": "Mais Jogos GrÃ¡tis",
        "more-games-freecell-title": "Viciado no FreeCell?",
        "more-games-freecell-desc": "Jogue FreeCell, FreeCell Dois Baralhos, Baker's Game e Eight Off.",
        "more-games-spider-title": "Viciado no Spider?",
        "more-games-spider-desc": "Jogue no seu navegador uma bela coleÃ§Ã£o de jogos do Spider Solitaire grÃ¡tis.",
        "more-games-word-search-title": "CaÃ§a-palavras",
        "more-games-word-search-desc": "Jogo de CaÃ§a-palavra online grÃ¡tis.",
        "app-spider-name": "PaciÃªncia Spider",
        "app-spider-desc": "Jogue uma bela coleÃ§Ã£o grÃ¡tis das variaÃ§Ãµes do jogo PaciÃªncia Spider com: Spider Quatro Naipes, Spider Dois Naipes, Spider Um Naipe, EscorpiÃ£o.",
        "app-freecell-name": "FreeCell",
        "app-freecell-desc": "Jogue uma bela coleÃ§Ã£o grÃ¡tis das variaÃ§Ãµes do jogo FreeCell com: FreeCell, FreeCell Dois Baralhos, Oito Fora, Jogo do Padeiro.",
        "app-klondike-name": "PaciÃªncia",
        "app-klondike-desc": "Desfrute desta bela coleÃ§Ã£o de jogos do Solitaire com opÃ§Ãµes completes de funcionalidades e personalizaÃ§Ãµes.",
        "play-now": "Jogue agora",
        games: "Jogos",
        new: "Novo",
        undo: "Desfazer",
        hint: "Dica",
        scores: "EstatÃ­sticas",
        settings: "Ajustes",
        appearance: "AparÃªncia",
        options: "OpÃ§Ãµes",
        rules: "Regras",
        about: "Sobre",
        more: "Menu",
        "new-game": "Novo Jogo",
        "new-game-ask": "O que gostarias de fazer com o jogo em progresso?",
        "start-new": "Encerrar e Iniciar um Novo Jogo",
        "start-new-won": "Iniciar um Novo Jogo",
        restart: "Reiniciar Este Jogo",
        keep: "Continuar Jogando",
        "game-sounds": "Sons do Jogo",
        "apply-swing": "Aplique o efeito de carta oscilante ao arrastar",
        "apply-expand": "Amplie as cartas passando o mause sobre ela quando as colunas do tabuleiro estiverem compactadas",
        languages: "Idioma",
        "id-language": "PortuguÃªs",
        "css3-item": "Use animaÃ§Ãµes aceleradas por hardware",
        "enable-effect": "Habilitar efeitos visuais (sombras, alargamento de cartas, botÃµes)",
        "left-handed": "Canhoto",
        "advanced-options": "OpÃ§Ãµes AvanÃ§adas",
        on: "Ativado",
        off: "Desativado",
        "card-set": "Conjunto de Cartas",
        "card-back": "Verso da Carta",
        backgrounds: "Fundos",
        "autoplay-settings": "ConfiguraÃ§Ãµes do Autoplay",
        "global-autoplay": "Global",
        "selective-autoplay": "Seletivo",
        "no-autoplay": "Desativado",
        counters: "Mostrar Contadores",
        "show-score": "PontuaÃ§Ã£o",
        "show-time": "Tempo",
        "show-moves": "Movimentos",
        "game-won": "Jogo Vencido!",
        congratulations: "ParabÃ©ns!",
        "cong-text": "ParabÃ©ns por vencer o jogo!",
        won: "Vencidos",
        lost: "Perdidos",
        win: "vitÃ³ria",
        wins: "vitÃ³rias",
        loss: "Derrota",
        losses: "Derrotas",
        "longest-winning": "Maior SequÃªncia de VitÃ³rias:",
        "longest-losing": "Maior SequÃªncia de Derrotas:",
        "current-streak": "SequÃªncia atual:",
        clear: "Limpar",
        "clear-stats": "Limpar EstatÃ­sticas",
        "clear-stats-text": "Tem certeza de que deseja limpar as estatÃ­sticas?",
        "no-more-moves": "Sem movimentos",
        "no-more-moves-text": "NÃ£o hÃ¡ mais movimentos disponÃ­veis.",
        "back-and-undo": "Voltar e desfazer alguns movimentos",
        "select-a-solitaire": "Selecionar um Solitaire",
        spider: "Spider",
        "spider-deal-info": "Deve haver ao menos uma carta em cada coluna do tabuleiro <br /> antes de distribuir uma nova fileira de cartas.",
        score: "PontuaÃ§Ã£o",
        time: "Tempo",
        moves: "Movimentos",
        "rate-dialog-body": "Se gostas do app, poderias reservar um momento para avaliÃ¡-lo? NÃ£o levarÃ¡ mais que um minuto. Obrigado pelo apoio!",
        "rate-it-now": "Avaliar agora",
        "rate-later": "Lembre-me depois",
        "do-not-rate": "NÃ£o, obrigado",
        "remove-ads": "Remove Ads",
        "copyright-year": "Copyright (c) 2011-2016 TreeCardGames.",
        "rights-reserved": "Todos os direitos reservados.",
        "about-sup-welcome": "Damos suporte a nosso apps e sua opiniÃ£o Ã© bem-vinda.",
        "about-sup-faqs": "FAQs e pÃ¡gina de Suporte",
        "contact-us": "Contate-nos",
        "follow-us": "Siga-nos no",
        "follow-us-fb": "Siga-nos no Facebook",
        "follow-us-gp": "Siga-nos no Google+",
        "click-here": "Clique aqui",
        website: "Site",
        "privacy-policy": "PolÃ­tica de Privacidade",
        support: "Suporte",
        "want-more-solitaire": "Quer mais jogos do Solitaire?",
        "try-solsuite": "Experimente o SolSuite Solitaire, a mais complete ColeÃ§Ã£o do Solitaire do Mundo com mais de 640 jogos de solitaire, 60 conjuntos de cartas, 300 versos de cartas e 100 imagens de fundo! Experimente agora em",
        loading: "Carregando",
        ok: "OK",
        close: "Fechar",
        cancel: "Cancelar",
        back: "Voltar",
        "reload-title": "Requer Recarregamento",
        "reload-content": "O jogo precisa ser recarregado para as alteraÃ§Ãµes funcionarem.",
        "reload-content-app": "As configuraÃ§Ãµes foram atualizadas e funcionaram da prÃ³xima vez que o app for iniciado.",
        "select-game-number": "Selecione um NÃºmero do Jogo",
        "select-game-number-label": "Selecione um nÃºmero do jogo de 1 a 9999999",
        play: "Jogar",
        "game-number": "NÃºmero do Jogo",
        "bad-game-number-label": "Esse nÃ£o Ã© um nÃºmero do jogo vÃ¡lido",
        "try-again": "Tente outra vez",
        "cookies-consent": "Este site utiliza cookies para garantir que tenhas a melhor experiÃªncia no nosso site.",
        "cookies-more-info": "Mais informaÃ§Ãµes"
    },
    function() {
        "use strict";
        var t = e.localisation = {}
          , a = t.language = {
            it: "Italiano",
            en: "English",
            es: "EspaÃ±ol",
            fr: "FranÃ§ais",
            de: "German",
            nl: "Nederlands",
            sv: "Svenska",
            pt_br: "PortuguÃªs (Brasil)",
            pt_pt: "PortuguÃªs (Portugal)"
        }
          , i = e.lang.en;
        t.populate = function(e) {
            var t = Object.keys(a);
            t.sort(),
            t.forEach(function(t) {
                var i = document.createElement("option");
                i.value = t,
                i.innerHTML = a[t],
                e.append(i)
            })
        }
        ,
        t.load = function(t) {
            if (!(t in a))
                return console && console.log("Language " + t + " not implemented."),
                void (t = "en");
            if (i = e.lang[t],
            "en" != t)
                for (var o in i)
                    $('*[data-lang-ref="' + o + '"]').text(i[o]);
            $("*[data-role='collapsible']").collapsible("destroy").collapsible();
            var n = $("*[data-role='slider']").slider("destroy");
            $(".ui-slider").remove(),
            n.slider()
        }
        ,
        t.get = function(e) {
            return a[e]
        }
        ,
        t.getL = function(e) {
            return i[e] ? i[e] : (console && console.log(e),
            "place holder")
        }
        ,
        t.getWindowsSystemLang = function() {
            for (var e, t = Windows.System.UserProfile.GlobalizationPreferences.languages.length, i = 0; i < t; i++) {
                "pt_pt" != (e = (e = (e = Windows.System.UserProfile.GlobalizationPreferences.languages[i]).toLowerCase()).replace("-", "_")) && "pt_br" != e && (e = e.substring(0, 2));
                for (var o in a)
                    if (o == e)
                        return e
            }
            return "en"
        }
        ,
        t.getSystemLang = function() {
            var t;
            return "windows" == e.config.isApp ? (t = this.getWindowsSystemLang(),
            "pyramid" != e.data.projectType && "christmas" != e.data.projectType || (t = "en")) : (t = (t = window.navigator.languages ? window.navigator.languages[0] : null) || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage,
            t = "en"),
            "pt_pt" != (t = (t = t.toLowerCase()).replace("-", "_")) && "pt_br" != t && (t = t.substring(0, 2)),
            Object.keys(a).indexOf(t) < 0 && (t = "en"),
            t
        }
    }(),
    function() {
        function t(e) {
            var t = 0
              , a = 0;
            return $.each(e, function(e, i) {
                t += i.total,
                a += i.count
            }),
            (t - a) / t
        }
        e.createCounter = function(e) {
            function t() {
                o.notify({
                    total: a,
                    count: i
                })
            }
            var a = e || 0
              , i = a
              , o = $.Deferred();
            return t(),
            {
                decrement: function() {
                    i--,
                    t(),
                    i <= 0 && o.resolve()
                },
                increment: function() {
                    i++,
                    a++,
                    t()
                },
                total: function() {
                    return a
                },
                resolve: function() {
                    o.resolve()
                },
                promise: function() {
                    return o.promise()
                }
            }
        }
        ,
        e.progressBar = function() {
            var e = [].slice.call(arguments)
              , a = $.Deferred()
              , i = $("#progress").css("width", 0).show();
            return $.when.apply($, e).progress(function() {
                var e = 100 * t(arguments);
                i.css("width", e + "%"),
                e >= 100 && a.resolve()
            }),
            a.promise()
        }
        ;
        var a = {};
        e.deferLoad = function(t) {
            if (a[t])
                return a[t];
            var i = $(t).find("[data-src]")
              , o = e.createCounter(i.length);
            return e.ui.loading.show(),
            o.promise().then(e.ui.loading.hide),
            i.each(function(e, t) {
                var a = new Image;
                a.onload = o.decrement,
                t.appendChild(a),
                a.src = t.getAttribute("data-src")
            }),
            a[t] = o.promise(),
            o.promise()
        }
    }();
    var t = {};
    !function() {
        "use strict";
        window.location.hash = "",
        $.browser = {};
        for (var e = [{
            name: "opera",
            check: /OPR|Opera/
        }, {
            name: "msedge",
            check: /Edge/
        }, {
            name: "chrome",
            check: /Chrome/
        }, {
            name: "safari",
            check: /Safari/
        }, {
            name: "mozilla",
            check: /Firefox/
        }, {
            name: "msie",
            check: /MSIE|Trident/
        }], a = navigator.userAgent, i = 0; i < 6; i++) {
            var o = e[i];
            if (o.check.test(a)) {
                $.browser[o.name] = !0,
                $("html").addClass(o.name);
                break
            }
        }
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1)
        }
        ,
        window.toStaticHTML || (window.toStaticHTML = function(e) {
            return e
        }
        ),
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            if ("function" != typeof this)
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var t = Array.prototype.slice.call(arguments, 1)
              , a = this
              , i = function() {}
              , o = function() {
                return a.apply(this instanceof i && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
            };
            return i.prototype = this.prototype,
            o.prototype = new i,
            o
        }
        ),
        t.dist = function(e, t, a, i) {
            return Math.sqrt((e - a) * (e - a) + (t - i) * (t - i))
        }
        ,
        t.prefix = function() {
            for (var e = document.createElement("div"), t = ["Moz", "Webkit", "O", "ms"], a = 0; a < 4; ++a)
                if (t[a] + "Transform"in e.style)
                    return t[a]
        }(),
        t.dasherizedPrefix = {
            Moz: "-moz-",
            Webkit: "-webkit-",
            O: "-o-",
            ms: "-ms-",
            "": ""
        }[t.prefix],
        t.template = function(e, t) {
            return e.replace(/{{([^}]+)}}/g, function(e, a) {
                return void 0 === t[a] ? "" : t[a]
            })
        }
        ,
        t.isUWP = function() {
            var e = Windows.ApplicationModel.Package.current.id.version;
            return e.major >= "2" && e.minor >= "7"
        }
    }(),
    function() {
        "use strict";
        var t = e.config = {
            version: 1,
            isFreeApp: !0,
            flipScale: 1.2,
            ifFreeApp: !0,
            moveWithAnimate: !1,
            rateReminderLinkiOS: "ioslink",
            rateReminderLinkChrome: "chromelink",
            isChromePackagedApp: !!(window.chrome && window.chrome.app && window.chrome.app.window),
            isDebugging: !1,
            isRetina: window.devicePixelRatio > 1,
            isMobilePhone: function() {
                var e = navigator.userAgent.toLowerCase();
                return e.match(/iphone/) ? "iPhone" : e.match(/android/) && e.match(/mobile/) ? "android" : e.match(/windows/) && e.match(/phone/) ? "windows" : null
            }(),
            useLargeShadow: navigator.userAgent.toLowerCase().match(/safari/) || $.browser.msie,
            isiOS: !!navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/),
            isiOS7: !!navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i),
            isApp: window.cordova ? "phoneGap" : window.WinJS ? "windows" : window.chrome && window.chrome.app && window.chrome.app.window ? "chrome-packaged" : null,
            easingFunc: "easeOutCubic",
            undoSpeed: 3800,
            noEnlarging: !1,
            noDragShadow: !1,
            noDecoration: !1,
            animation_time: 400,
            animationSpeed: 4800,
            autoplaySpeed: 2100,
            revertSpeed: 4800,
            automoveSpeed: 3800,
            flipTime: 150,
            minimum_moving_time: 200,
            offsetStockDiv: 2,
            totalL: 4,
            cL: 3
        };
        window.navigator.msPointerEnabled ? (t.event_touchstart = "MSPointerDown",
        t.event_touchmove = "MSPointerMove",
        t.event_touchend = "MSPointerUp") : (t.event_touchstart = "touchstart",
        t.event_touchmove = "touchmove",
        t.event_touchend = "touchend"),
        t.useFluctuating = !1,
        t.useCardEffects = !1,
        t.noScaling = !t.isiOS,
        t.isiOS && (t.animationSpeed = 3800,
        t.autoplaySpeed = 1800,
        t.revertSpeed = 3800,
        t.automoveSpeed = 1800,
        t.flipTime = 200,
        t.minimum_moving_time = 400,
        t.totalL = 8,
        t.cL = 7),
        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase())
    }(),
    function() {
        "use strict";
        if (window.chrome && window.chrome.storage) {
            var t = chrome.storage.local
              , a = {}
              , i = {}
              , o = function(e, t) {
                this.key = e,
                this.val = t
            };
            o.prototype.set = function(e) {
                if (this.val = e,
                this.updating)
                    this.afterUpdate = function() {
                        this.set(e)
                    }
                    ;
                else {
                    var a = {};
                    a[this.key] = e,
                    this.updating = !0,
                    t.set(a, function() {
                        this.updating = !1,
                        this.afterUpdate && (this.afterUpdate(),
                        this.afterUpdate = null)
                    }
                    .bind(this))
                }
            }
            ,
            o.prototype.get = function() {
                return this.val
            }
            ,
            o.prototype.remove = function() {
                this.val = null,
                this.updating ? this.afterUpdate = this.remove : (this.updating = !0,
                t.remove(this.key, function() {
                    this.updating = !1,
                    this.afterUpdate && (this.afterUpdate(),
                    this.afterUpdate = null)
                }
                .bind(this)))
            }
            ;
            e.cachedChromeStorage = {
                isCached: !0,
                set: function(e, t) {
                    t += "",
                    a[e] || (a[e] = new o(e,i[e] || null)),
                    a[e].set(t)
                },
                get: function(e) {
                    return a[e] || (a[e] = new o(e,i[e] || null)),
                    a[e].get()
                },
                remove: function(e) {
                    a[e] || (a[e] = new o(e,i[e] || null)),
                    a[e].remove()
                },
                loadToCache: function(e) {
                    t.get(null, function(t) {
                        i = t,
                        e()
                    })
                }
            }
        } else
            e.cachedChromeStorage = null
    }(),
    window.uniStore = function() {
        "use strict";
        var t = {}
          , a = !1;
        try {
            localStorage.test;
            localStorage.test = "test"
        } catch (e) {
            window.Windows && Windows.Storage && (a = !0)
        }
        if (a) {
            var i = Windows.Storage.ApplicationData.current.localSettings.values;
            t.get = function(e) {
                return null === i[e] || void 0 === i[e] ? null : "" + i[e]
            }
            ,
            t.set = function(e, t) {
                null === t ? i.remove(e) : i[e] = t + ""
            }
            ,
            t.remove = function(e) {
                i.remove(e)
            }
        } else
            e.config.isChromePackagedApp ? t = e.cachedChromeStorage : (t.set = function(e, t) {
                localStorage.setItem(e, t)
            }
            ,
            t.get = function(e) {
                return localStorage.getItem(e)
            }
            ,
            t.remove = function(e) {
                localStorage.removeItem(e)
            }
            );
        return t.loadToCache || (t.loadToCache = function(e) {
            e()
        }
        ),
        t.allKeys = ["treecardgames.data.version", "treecardgames.solitaire.lastgame"],
        t.getVersion = function() {
            var a = t.get("treecardgames.data.version");
            return a ? parseInt(a, 10) : t.get("treecardgames.solitaire.lastgame") ? 0 : e.config.version
        }
        ,
        t.getInt = function(e) {
            var t = this.get(e);
            return isNaN(t) ? 0 : parseInt(t, 10)
        }
        ,
        t.setVersion = function(e) {
            return t.set("treecardgames.data.version", e)
        }
        ,
        t.useMemStore = function() {
            var e = {};
            t.set = function(t, a) {
                e[t] = a + ""
            }
            ,
            t.get = function(t) {
                return e[t]
            }
            ,
            t.remove = function(t) {
                delete e[t]
            }
        }
        ,
        t
    }(),
    function() {
        "use strict";
        e.gameSettings = {
            allKeys: ["treecardgames.solitaire.language", "treecardgames.solitaire.soundOn", "treecardgames.solitaire.swingCard1", "treecardgames.solitaire.cardEffect", "treecardgames.solitaire.useCSS3", "treecardgames.solitaire.showMoves", "treecardgames.solitaire.showScore", "treecardgames.solitaire.showTime", "treecardgames.solitaire.autoplayMode", "treecardgames.solitaire.background", "treecardgames.solitaire.cardback", "treecardgames.solitaire.cardset", "treecardgames.solitaire.lastgame"],
            load: function() {
                this.updateDefaults(),
                this.soundOn = this.soundOn,
                this.showTime = this.showTime,
                this.showScore = this.showScore,
                this._1$ = this._1$,
                this.autoplayMode = uniStore.get(this.prefix + ".autoplayMode"),
                this._0$ ? this._0$ = this._0$ : this._0$ = e.config.useFluctuating,
                null === this.cardEffect ? this.cardEffect = e.config.useCardEffects : this.cardEffect = this.cardEffect,
                this.useCSS3 = this.useCSS3,
                this.background = this.background,
                this.cardback = this.cardback,
                this.cardset = this.cardset
            },
            ini: function() {
                var t = "n";
                "freecell" == e.data.projectType && (t = "s"),
                this.autoplayMode = t,
                this.showTime = !0,
                this.showScore = !0,
                this._1$ = !1,
                this._0$ = e.config.useFluctuating,
                this.cardEffect = e.config.useCardEffects,
                this.soundOn = !0,
                this.background = e.data.defaultBackground,
                this.cardback = e.data.defaultCardback,
                this.cardset = e.data.defaultCardset,
                this.useCSS3 = !$.browser.msie && "windows" == !e.config.isApp || navigator.cpuClass && "ARM" === navigator.cpuClass.toUpperCase(),
                this.updateDefaults()
            },
            updateDefaults: function() {
                this.newDefaults.forEach(function(e) {
                    uniStore.get(this.prefix + "." + e.updated) || (this[e.key] = e.value,
                    uniStore.set(this.prefix + "." + e.updated, !0))
                }
                .bind(this))
            },
            newDefaults: [{
                updated: "useCSS3Update",
                key: "useCSS3",
                value: !$.browser.msie && "windows" == !e.config.isApp || navigator.cpuClass && "ARM" === navigator.cpuClass.toUpperCase()
            }],
            prefix: "treecardgames.solitaire",
            _autoplayMode: "s"
        },
        Object.defineProperties(e.gameSettings, {
            rateReminderActive: {
                get: function() {
                    return "true" === (uniStore.get(this.prefix + ".rateReminderActive") || "true")
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".rateReminderActive", e)
                }
            },
            rateReminderCounter: {
                get: function() {
                    return parseInt(uniStore.get(this.prefix + ".rateReminderCounter") || 0, 10)
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".rateReminderCounter", e)
                }
            },
            language: {
                get: function() {
                    return e.config.isApp ? e.localisation.getSystemLang() : uniStore.get(this.prefix + ".language") || e.localisation.getSystemLang()
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".language", e)
                }
            },
            soundOn: {
                get: function() {
                    return "true" === uniStore.get(this.prefix + ".soundOn")
                },
                set: function(t) {
                    e.audio.toggle(t),
                    uniStore.set(this.prefix + ".soundOn", t),
                    t ? $("#sound-option").val("on") : $("#sound-option").val("off"),
                    $("#sound-option").slider("refresh")
                }
            },
            _0$: {
                get: function() {
                    return uniStore.get(this.prefix + ".swingCard1")
                },
                set: function(t) {
                    uniStore.set(this.prefix + ".swingCard1", t),
                    !0 === t || "true" == t ? (e.game.setMovingSwinging(!0),
                    $("#swing-option").val("on").slider("refresh")) : (e.game.setMovingSwinging(!1),
                    $("#swing-option").val("off").slider("refresh"))
                }
            },
            cardEffect: {
                get: function() {
                    return uniStore.get(this.prefix + ".cardEffect")
                },
                set: function(t) {
                    uniStore.set(this.prefix + ".cardEffect", t),
                    !0 === t || "true" == t ? (e.game.setCardEffect(!0),
                    $("#effect-option").val("on").slider("refresh")) : (e.game.setCardEffect(!1),
                    $("#effect-option").val("off").slider("refresh"))
                }
            },
            useCSS3: {
                get: function() {
                    return null === uniStore.get(this.prefix + ".useCSS3") ? (uniStore.set(this.prefix + ".useCSS3", !0),
                    !0) : "true" == uniStore.get(this.prefix + ".useCSS3")
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".useCSS3", e),
                    !0 === e || "true" == e ? $("#css3-option").val("on").slider("refresh") : $("#css3-option").val("off").slider("refresh")
                }
            },
            _1$: {
                get: function() {
                    return "true" === uniStore.get(this.prefix + ".showMoves")
                },
                set: function(e) {
                    e ? ($("#moves-toggle").attr("checked", !0),
                    $("#display-moves").show(),
                    uniStore.set(this.prefix + ".showMoves", !0)) : ($("#moves-toggle").attr("checked", !1),
                    uniStore.set(this.prefix + ".showMoves", !1),
                    $("#display-moves").hide()),
                    $("#moves-toggle").checkboxradio("refresh")
                }
            },
            showScore: {
                get: function() {
                    return "true" === uniStore.get(this.prefix + ".showScore")
                },
                set: function(e) {
                    e ? ($("#score-toggle").attr("checked", !0),
                    $("#display-score").show(),
                    uniStore.set(this.prefix + ".showScore", !0)) : ($("#score-toggle").attr("checked", !1),
                    uniStore.set(this.prefix + ".showScore", !1),
                    $("#display-score").hide()),
                    $("#score-toggle").checkboxradio("refresh")
                }
            },
            showTime: {
                get: function() {
                    return "true" === uniStore.get(this.prefix + ".showTime")
                },
                set: function(e) {
                    e ? ($("#time-toggle").attr("checked", !0),
                    $("#display-time").show(),
                    uniStore.set(this.prefix + ".showTime", !0)) : ($("#time-toggle").attr("checked", !1),
                    uniStore.set(this.prefix + ".showTime", !1),
                    $("#display-time").hide()),
                    $("#time-toggle").checkboxradio("refresh")
                }
            },
            autoplayMode: {
                get: function() {
                    return this._autoplayMode
                },
                set: function(e) {
                    "disabled" === e ? (this._autoplayMode = e,
                    $("#autoplay-option").find("input[value='n']").attr("checked", !0),
                    $("#autoplay-option").find("input[type='radio']").checkboxradio("disable").checkboxradio("refresh")) : "enabled" === e ? this.autoplayMode = uniStore.get(this.prefix + ".autoplayMode") : (this._autoplayMode = e,
                    uniStore.set(this.prefix + ".autoplayMode", e),
                    $("#autoplay-option").find("input[value='" + e + "']").attr("checked", !0),
                    $("#autoplay-option").find("input[type='radio']").checkboxradio("enable").checkboxradio("refresh"))
                }
            },
            background: {
                get: function() {
                    var t = uniStore.get(this.prefix + ".background");
                    return t in e.data.gameBackgrounds || (uniStore.set(this.prefix + ".background", e.data.defaultBackground),
                    t = e.data.defaultBackground),
                    t
                },
                set: function(t) {
                    $("#game-ui").css({
                        "background-image": "url(solitaire/images/backgrounds/1920x1200/" + t + ".jpg)",
                        "background-size": e.data.backgroundSize[t] || "100% 100%"
                    }),
                    uniStore.set(this.prefix + ".background", t),
                    $("#backgrounds-list>div>.ui-radio-on").removeClass("ui-btn-active").removeClass("ui-radio-on"),
                    $('#backgrounds-list>div>div[data-backgroundname="' + t + '"]').addClass("ui-btn-active").addClass("ui-radio-on")
                }
            },
            cardback: {
                get: function() {
                    var t = uniStore.get(this.prefix + ".cardback");
                    return t in e.data.cardBacks || (uniStore.set(this.prefix + ".cardback", e.data.defaultCardback),
                    t = e.data.defaultCardback),
                    t
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".cardback", e),
                    $("#cardbacks-list>div>.ui-radio-on").removeClass("ui-btn-active").removeClass("ui-radio-on"),
                    $('#cardbacks-list>div>div[data-cardbackname="' + e + '"]').addClass("ui-btn-active").addClass("ui-radio-on")
                }
            },
            cardset: {
                get: function() {
                    var t = uniStore.get(this.prefix + ".cardset");
                    return t in e.data.cardSets || (uniStore.set(this.prefix + ".cardset", e.data.defaultCardset),
                    t = e.data.defaultCardset),
                    t
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".cardset", e),
                    $("#cardsets-list>div>.ui-radio-on").removeClass("ui-btn-active").removeClass("ui-radio-on"),
                    $('#cardsets-list>div>div[data-cardsetname="' + e + '"]').addClass("ui-btn-active").addClass("ui-radio-on")
                }
            },
            lastGame: {
                get: function() {
                    return uniStore.get(this.prefix + ".lastgame")
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".lastgame", e)
                }
            }
        })
    }(),
    function() {
        "use strict";
        var t = e.localisation.getL
          , a = e.cardData = {
            _time: 0,
            _score: 0,
            _movesCount: 0,
            prefix: "",
            setName: function(e) {
                this.prefix = "treecardgames.solitaire." + e,
                null === uniStore.get(this.prefix + ".firstTime") && this.ini()
            },
            keys: [".firstTime", ".gamePlayCount", ".gameWinCount", ".currentStreak", ".currentStreakIsWinning", ".longestLosingStreak", ".longestWinningStreak", ".lastGame", ".lastGame.time", ".lastGame", ".movesCount"],
            getAllKeys: function() {
                var e = this.prefix;
                return this.keys.map(function(t) {
                    return e + t
                })
            }
        };
        Object.defineProperties(a, {
            time: {
                get: function() {
                    return this._time
                },
                set: function(e) {
                    this._time = e;
                    var t, a, i;
                    this._time > 3600 ? (t = Math.floor(this._time / 3600),
                    a = Math.floor((this._time - 3600 * t) / 60),
                    i = this._time - 3600 * t - 60 * a,
                    t < 10 && (t = "0" + t),
                    t += ":") : (t = "",
                    a = Math.floor(this._time / 60),
                    i = this._time - 60 * a),
                    a < 10 && (a = "0" + a),
                    a += ":",
                    i < 10 && (i = "0" + i),
                    $("#display-time>span.display-content").html("" + t + a + i)
                }
            },
            movesCount: {
                get: function() {
                    return this._movesCount
                },
                set: function(e) {
                    this._movesCount = e,
                    $("#display-moves>span.display-content").html(e)
                }
            },
            gameScore: {
                get: function() {
                    return this._score
                },
                set: function(e) {
                    this._score = e,
                    $("#display-score>span.display-content").html(e)
                }
            },
            gamePlayCount: {
                get: function() {
                    return uniStore.getInt(this.prefix + ".gamePlayCount") || 0
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".gamePlayCount", e)
                }
            },
            gameWinCount: {
                get: function() {
                    return uniStore.getInt(this.prefix + ".gameWinCount") || 0
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".gameWinCount", e)
                }
            },
            currentStreak: {
                get: function() {
                    return uniStore.getInt(this.prefix + ".currentStreak") || 0
                },
                set: function(e) {
                    isNaN(e) && (e = 0),
                    uniStore.set(this.prefix + ".currentStreak", e),
                    this.currentStreakIsWinning ? e > this.longestWinningStreak && (this.longestWinningStreak = e) : e > this.longestLosingStreak && (this.longestLosingStreak = e);
                    var a;
                    a = this.currentStreakIsWinning ? e > 1 ? " " + t("wins") : " " + t("win") : e > 1 ? " " + t("losses") : " " + t("loss"),
                    $("#display-currentStreak").html(e + a)
                }
            },
            currentStreakIsWinning: {
                get: function() {
                    return "true" == uniStore.get(this.prefix + ".currentStreakIsWinning")
                },
                set: function(e) {
                    uniStore.set(this.prefix + ".currentStreakIsWinning", !!e);
                    var a;
                    a = e ? this.currentStreak > 1 ? " " + t("wins") : " " + t("win") : this.currentStreak > 1 ? " " + t("losses") : " " + t("loss"),
                    $("#display-currentStreak").html(this.currentStreak + a)
                }
            },
            longestLosingStreak: {
                get: function() {
                    return uniStore.getInt(this.prefix + ".longestLosingStreak")
                },
                set: function(e) {
                    isNaN(e) && (e = 0),
                    uniStore.set(this.prefix + ".longestLosingStreak", e),
                    $("#display-longestLosingStreak").html(e)
                }
            },
            longestWinningStreak: {
                get: function() {
                    return uniStore.getInt(this.prefix + ".longestWinningStreak")
                },
                set: function(e) {
                    isNaN(e) && (e = 0),
                    uniStore.set(this.prefix + ".longestWinningStreak", e),
                    $("#display-longestWinningStreak").html(e)
                }
            }
        }),
        a.load = function() {
            if (!uniStore.get(this.prefix + ".lastGame"))
                return this.gamePlayCount = this.gamePlayCount,
                this.gameWinCount = this.gameWinCount,
                this.currentStreak = this.currentStreak,
                this.currentStreakIsWinning = this.currentStreakIsWinning,
                this.longestLosingStreak = this.longestLosingStreak,
                this.longestWinningStreak = this.longestWinningStreak,
                !1;
            try {
                return this.time = uniStore.getInt(this.prefix + ".lastGame.time"),
                this.lastGame = JSON.parse(uniStore.get(this.prefix + ".lastGame")),
                this.gamePlayCount = this.gamePlayCount,
                this.gameWinCount = this.gameWinCount,
                this.gameScore = 0,
                this.movesCount = uniStore.getInt(this.prefix + ".movesCount"),
                this.currentStreak = this.currentStreak,
                this.currentStreakIsWinning = this.currentStreakIsWinning,
                this.longestLosingStreak = this.longestLosingStreak,
                this.longestWinningStreak = this.longestWinningStreak,
                !0
            } catch (e) {
                return console && console.log(e),
                this.clearInfo(),
                !1
            }
        }
        ,
        a.reset = function() {
            uniStore.set(this.prefix + ".lastGame", ""),
            this.time = 0,
            this.movesCount = 0,
            this.gameScore = 0
        }
        ,
        a.clearInfo = function() {
            this.gamePlayCount = e.game.playing() ? 1 : 0,
            this.gameWinCount = 0,
            this.currentStreak = 0,
            this.currentStreakIsWinning = !1,
            this.longestLosingStreak = 0,
            this.longestWinningStreak = 0
        }
        ,
        a.ini = function() {
            this.clearInfo(),
            this.gamePlayCount = 0,
            uniStore.set(this.prefix + ".firstTime", "false")
        }
        ,
        a.winUpdate = function() {
            uniStore.set(this.prefix + ".lastGame", ""),
            this.gameWinCount++,
            this.currentStreakIsWinning ? this.currentStreak++ : (this.currentStreakIsWinning = !0,
            this.currentStreak = 1)
        }
        ,
        a.save = function() {
            uniStore.set(this.prefix + ".lastGame", JSON.stringify(this.lastGame)),
            uniStore.set(this.prefix + ".lastGame.time", this.time),
            uniStore.set(this.prefix + ".movesCount", this.movesCount)
        }
    }(),
    e.data = {
        backgroundSize: {
            blue_web: "cover"
        },
        projectType: "spider",
        defaultBackground: "blue_web",
        defaultCardset: "modern",
        cardSets: {
            caricatures: "Caricatures",
            modern: "Modern",
            large_print: "Large Print",
            large_print_modern: "Large Print Modern",
            large_print_london: "Large Print London",
            big_ben: "Big Ben"
        },
        gamesList: {
            spider: {
                1: "Spider One Suit",
                scorpion: "Scorpion",
                2: "Spider Two Suits",
                4: "Spider Four Suits"
            }
        },
        cardBacks: {
            classic_green: "Classic Green",
            rhombus_blue: "Rhombus Blue",
            monet: "Monet",
            cross_blue: "Grate Blue",
            lawrence: "Lawrence",
            rose: "Rose",
            dog: "Dog",
            cat: "Cat",
            classic_brown: "Classic Brown",
            renoir: "Renoir",
            butterflies: "Butterflies",
            rhombus_red: "Rhombus Red",
            spider_blue: "Spider Blue",
            classic_red: "Classic Red",
            rhombus_brown: "Rhombus Brown",
            rhombus_green: "Rhombus Green",
            classic_blue: "Classic Blue",
            spider_red: "Spider Red",
            cross_red: "Grate Red",
            cross_brown: "Grate Brown",
            cross_green: "Grate Green"
        },
        AdSenseForGames: {
            debug: "false",
            adCode: "https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&client=ca-games-pub-5240746718396645&description_url=https%3A%2F%2Fwww.free-spider-solitaire.com%2Fdescription.html&videoad_start_delay=30000&hl=en&max_ad_duration=30000"
        },
        defaultCardback: "spider_red",
        responsiveAds: "true",
        gameBackgrounds: {
            light_wood: "Light Wood",
            green_felt: "Green Felt",
            blue_web: "Blue Web",
            red_felt: "Red Felt",
            blue_felt: "Blue Felt",
            parquet: "Parquet",
            dark_wood: "Dark Wood"
        }
    },
    function() {
        "use strict";
        var t = window.webkitAudioContext || window.mozAudioContext || window.MSAudioContext;
        if (t) {
            var a = e.webAudio = {}
              , i = new t;
            a.unmuteIOS = function() {
                a.loadBuffer(a.getPath("card_drop"), function(e) {
                    e.gain = 0;
                    var t = i.createBufferSource();
                    t.buffer = e,
                    t.connect(i.destination),
                    t.noteOn(0)
                })
            }
            ,
            a.loadBuffer = function(e, t) {
                var a = new XMLHttpRequest;
                a.open("GET", e, !0),
                a.responseType = "arraybuffer",
                a.onload = function() {
                    i.decodeAudioData(a.response, function(e) {
                        t(e)
                    })
                }
                ,
                a.send()
            }
            ;
            var o = a.Sound = function(e) {
                this.on = !1,
                this.loaded = !1,
                this.filename = e,
                this.source = null,
                a.loadBuffer(a.getPath(e), function(e) {
                    this.loaded = !0,
                    this.buffer = e,
                    a.soundReadyHandler && a.soundReadyHandler()
                }
                .bind(this))
            }
            ;
            o.prototype.stop = function() {
                this.on && this.loaded && (this.source.noteOff ? this.source.noteOff(0) : this.source.stop && this.source.stop(0))
            }
            ,
            o.prototype.play = function() {
                if (this.on && this.loaded) {
                    var e = i.createBufferSource();
                    e.buffer = this.buffer,
                    e.connect(i.destination),
                    this.source = e,
                    this.source.noteOn ? this.source.noteOn(0) : this.source.start && this.source.start(0)
                }
            }
        } else
            e.webAudio = null
    }(),
    function() {
        "use strict";
        var t = e.config
          , a = $.browser.msie ? 1 : 7
          , i = null
          , o = !1
          , n = e.createCounter();
        if (n.promise().progress(function() {
            o = !0
        }),
        e.webAudio)
            i = function(t) {
                return n.increment(),
                new e.webAudio.Sound(t)
            }
            ,
            e.webAudio.soundReadyHandler = n.decrement,
            $.browser.opera ? e.webAudio.getPath = function(e) {
                return "solitaire/sounds/ogg/" + e + ".ogg"
            }
            : e.webAudio.getPath = function(e) {
                return "solitaire/sounds/mp3/" + e + ".mp3"
            }
            ;
        else if (t.isApp && t.isiOS)
            (i = function(e) {
                this.on = !1,
                this.filename = e;
                var t = this;
                document.addEventListener("deviceready", function() {
                    LowLatencyAudio.preloadFX(t.filename, "solitaire/sounds/aac/" + t.filename + ".m4a", function() {
                        t.on = !0
                    })
                }, !1)
            }
            ).prototype.stop = function() {
                this.on && LowLatencyAudio.stop(this.filename)
            }
            ,
            i.prototype.play = function() {
                this.on && LowLatencyAudio.play(this.filename)
            }
            ;
        else if (!t.isiOS) {
            var r = !0;
            try {
                new Audio
            } catch (e) {
                r = !1
            }
            r && ((i = function(e, t) {
                t = t || a,
                this.on = !0,
                this.filename = e,
                this.doms = [];
                for (var i = 0; i < t; i++) {
                    var o = new Audio;
                    o.preload = "auto",
                    this.doms.push(o),
                    n.increment(),
                    $(o).on("canplay", function() {
                        n.decrement(),
                        this.pause(),
                        this.volume = 1
                    });
                    var r = document.createElement("source");
                    r.src = "solitaire/sounds/mp3/" + e + ".mp3",
                    r.type = "audio/mpeg",
                    o.appendChild(r),
                    (r = document.createElement("source")).src = "solitaire/sounds/ogg/" + e + ".ogg",
                    r.type = "audio/ogg",
                    o.appendChild(r),
                    o.volume = 0,
                    o.load()
                }
                this.hasPlayed = this.doms.map(function() {
                    return !1
                })
            }
            ).prototype.stop = function() {
                this.doms.forEach(function(e) {
                    e.pause(),
                    e.currentTime = 0
                })
            }
            ,
            i.prototype.play = function() {
                if (this.on) {
                    var e = this.doms.reduce(function(e, t) {
                        return e.currentTime ? t.currentTime && e.currentTime > t.currentTime ? e : t : e
                    })
                      , t = this.doms.indexOf(e);
                    this.hasPlayed[t] ? (e.pause(),
                    e.currentTime && (e.currentTime = 0),
                    e.play()) : (e.play(),
                    this.hasPlayed[t] = !0)
                }
            }
            )
        }
        i || ((i = function() {}
        ).prototype.stop = function() {}
        ,
        i.prototype.play = function() {}
        );
        var s = e.audio = {
            on: !1
        };
        s.loadSounds = function(e) {
            this.dict = e;
            for (var t in e)
                e[t]instanceof Array ? this[t] = new i(e[t][0],e[t][1]) : this[t] = new i(e[t])
        }
        ,
        s.loadSounds({
            drop: "card_drop",
            flip: "card_flip",
            stockflip: "stock_flip",
            redeal: ["redeal", 1],
            autoplay: "autoplay",
            dealanimation: ["deal_animation", 1],
            undo: "undo",
            redo: "redo",
            gamewon: ["game_won", 1]
        }),
        s.toggle = function(e) {
            this.on = e;
            for (var t in this.dict)
                this[t].on = e
        }
        ,
        s.getPromise = function() {
            return n.promise()
        }
        ,
        setTimeout(function() {
            o || n.resolve()
        }, 5e3)
    }(),
    function() {
        "use strict";
        function t(t) {
            return function() {
                o.isApp && e.ui.gameAlert("Error", "Resource file not found: " + t + "<br />Please reinstall the App."),
                console && console.log(t + " fail to download")
            }
        }
        function a() {
            var a, i, o = [];
            if (p && !s["theme-" + c]) {
                for (a = 1; a < 14; a++)
                    for (i = 0; i < 4; i++)
                        o.push("solitaire/images/cards/" + c + "/146x198/" + a + "_" + g[i] + ".png");
                ["foundation", "redeal", "reserve", "stop", "tableau"].forEach(function(e) {
                    o.push("solitaire/images/spots/146x198/" + e + "_spot.png")
                })
            }
            u && !s["back-" + l] && o.push("solitaire/images/backs/146x198/" + l + ".png"),
            h && !s["background-" + d] && o.push("solitaire/images/backgrounds/1920x1200/" + d + ".jpg");
            var n = e.createCounter(o.length)
              , r = $("#game-ui");
            return o.length || n.resolve(),
            n.promise().then(function() {
                s["theme-" + c] = !0,
                s["back-" + l] = !0,
                s["background-" + d] = !0
            }),
            o.forEach(function(e) {
                var a = document.createElement("img");
                a.onerror = t(e),
                a.src = e,
                a.onload = function() {
                    n.decrement()
                }
                ,
                a.style.display = "none",
                r.append(a)
            }),
            n
        }
        var i = e.resources = {}
          , o = e.config
          , n = []
          , r = []
          , s = {}
          , l = ""
          , c = ""
          , d = ""
          , u = !1
          , p = !1
          , h = !1
          , g = ["s", "h", "c", "d"]
          , m = function(e, t) {
            return "solitaire/images/cards/" + c + "/146x198/" + t + "_" + g[e] + ".png"
        };
        i.clear = function() {
            n = [],
            r = []
        }
        ,
        i.changeCardImagesToSuits = function(e) {
            var t = 13 * e;
            n.forEach(function(e, a) {
                e.raw[0] = Math.floor(a % t / 13),
                e.img.src = m(e.raw[0], e.raw[1])
            })
        }
        ,
        i.getCardImage = function(e, t) {
            var a = document.createElement("img");
            return a.src = m(e, t),
            n.push({
                raw: [e, t],
                img: a
            }),
            a
        }
        ,
        i.getCardBackImage = function() {
            var e = document.createElement("img");
            return e.src = "solitaire/images/backs/146x198/" + l + ".png",
            r.push(e),
            e
        }
        ,
        i.getTableauImage = function() {
            var e = document.createElement("img");
            return e.src = "solitaire/images/spots/146x198/tableau_spot.png",
            e
        }
        ,
        i.getFoundationImage = function() {
            var e = document.createElement("img");
            return e.src = "solitaire/images/spots/146x198/foundation_spot.png",
            e
        }
        ,
        i.getReserveImage = function() {
            var e = document.createElement("img");
            return e.src = "solitaire/images/spots/146x198/reserve_spot.png",
            e
        }
        ,
        i.getStopSpotImage = function() {
            var e = document.createElement("img");
            return e.src = "solitaire/images/spots/146x198/stop_spot.png",
            e
        }
        ,
        i.getRedealImage = function() {
            var e = document.createElement("img");
            return e.src = "solitaire/images/spots/146x198/redeal_spot.png",
            e
        }
        ,
        i.setCardset = function(e) {
            e != c && (c = e,
            p = !0)
        }
        ,
        i.setCardback = function(e) {
            e != l && (l = e,
            u = !0)
        }
        ,
        i.setBackground = function(e) {
            e != d && (d = e,
            h = !0)
        }
        ,
        i.updateImages = function(e) {
            p && (n.forEach(function(e) {
                e.img.src = "solitaire/images/cards/" + c + "/146x198/" + e.raw[1] + "_" + g[e.raw[0]] + ".png"
            }),
            p = !1),
            u && (r.forEach(function(e) {
                e.src = "solitaire/images/backs/146x198/" + l + ".png"
            }),
            u = !1),
            h = !1
        }
        ,
        i.download = function(e) {
            var t = a();
            return e instanceof Function && t.promise().done(e),
            t.promise()
        }
        ;
        var f = e.createCounter();
        i.getExtraImage = function(e) {
            var t = document.createElement("img");
            return f.increment(),
            t.onload = t.onerror = function() {
                f.decrement()
            }
            ,
            t.src = e,
            t
        }
        ,
        i.doneExtraImages = function() {
            return 0 === f.total() && f.resolve(),
            f.promise()
        }
    }(),
    function() {
        "use strict";
        function a(e, t) {
            if (this.name = e,
            this.variation = {},
            t) {
                for (var a in t)
                    this.variation[a] = {},
                    this.variation[a].displayName = t[a],
                    this.variation[a].ssPath = this.pathPrefix + this.variation[a].displayName.toLowerCase().replace(/ /gi, "_").replace(/'/gi, "") + this.pathSuffix,
                    this.variation[a].normalizedName = this.variation[a].displayName.toLowerCase().replace(/ /gi, "_").replace(/'/gi, "");
                t[""] && (this.variation[""] = {
                    displayName: t[""],
                    normalizedName: t[""].toLowerCase().replace(/ /gi, "_").replace(/'/gi, "")
                },
                this.variation[""].ssPath = this.pathPrefix + this.variation[""].displayName.toLowerCase().replace(/ /gi, "_").replace(/'/gi, "") + this.pathSuffix)
            } else
                this.variation[""] = {
                    displayName: this.name.capitalize(),
                    ssPath: this.pathPrefix + this.name.toLowerCase() + this.pathSuffix,
                    normalizedName: this.name.toLowerCase().replace(/ /gi, "_").replace(/'/gi, "")
                }
        }
        function i(t) {
            var a = window.location.href
              , i = document.title;
            if (window.sidebar && window.sidebar.addPanel)
                window.sidebar.addPanel(i, a, "");
            else {
                if (window.opera && window.print)
                    return this.title = i,
                    !0;
                window.external && "AddFavorite"in window.external ? window.external.AddFavorite(a, i) : e.ui.gameAlert(c("bookmark-title"), c("bookmark-message"))
            }
            t.preventDefault()
        }
        var o = e.ui = {}
          , n = e.config
          , r = e.data
          , s = e.resources
          , l = o.gamesUI = {}
          , c = e.localisation.getL;
        o.modal = {
            show: function() {
                $("#darkenArea").removeClass("hidden")
            },
            hide: function() {
                $("#darkenArea").addClass("hidden")
            },
            clickOnce: function(e) {
                $("#darkenArea").on("click", function() {
                    $("#darkenArea").off("click"),
                    e()
                })
            },
            click: function() {
                $("#darkenArea").click()
            }
        },
        o.loading = {
            show: function() {
                o.modal.show(),
                $("#loadingBox").show()
            },
            hide: function() {
                $("#loadingBox").hide(),
                o.modal.hide()
            }
        },
        o.updateWithGame = function(a, i) {
            i += "";
            var o = l[a].variation[i].normalizedName
              , r = e.localisation.getL("game-" + o);
            $("#gameName").html(r),
            $('#rules-dialog>div[data-role="header"]>h1').html(r);
            var s = e.gameSettings.language.replace("_", "-") + "/";
            "windows" == n.isApp && t.isUWP() && (s = ""),
            d = "solitaire/help/" + s + "rules/" + o + ".html",
            u = "solitaire/help/en/rules/" + o + ".html"
        }
        ,
        o.raphPie = function(e, t) {
            e.innerHTML = "";
            var a = Raphael(e);
            a.customAttributes.segment = function(e, t, a, i, o) {
                var n = o - i > 180;
                return i = i % 360 * Math.PI / 180,
                o = o % 360 * Math.PI / 180,
                n && 0,
                (i - o) % 360 == 0 ? {} : {
                    path: [["M", e, t], ["l", a * Math.cos(i), a * Math.sin(i)], ["A", a, a, 0, +n, 1, e + a * Math.cos(o), t + a * Math.sin(o)], ["z"]]
                }
            }
            ;
            var i, o, n = a.set(), r = a.circle(140, 110, 0).attr({
                stroke: "#fff",
                "stroke-width": 4
            });
            0 === t[1].data && 0 === t[0].data ? r.attr({
                fill: "grey"
            }) : 0 === t[0].data ? r.attr({
                fill: t[1].color
            }) : 0 === t[1].data && r.attr({
                fill: t[0].color
            });
            i = 0;
            for (var s = 0, l = t.length; s < l; s++)
                i += t[s].data;
            for (o = 0,
            s = 0; s < l; s++) {
                var c = 360 / i * t[s].data;
                !function(e, r) {
                    t[e].name += i > 0 ? " " + t[e].data + " (" + Math.round(t[e].data / i * 1e3) / 10 + "%)" : " 0 (0%)";
                    var s = a.path().attr({
                        segment: [140, 110, 1, o, o + r],
                        stroke: "#fff",
                        fill: t[e].color
                    });
                    n.push(s),
                    a.text(265, 20 + 25 * e, t[e].name).attr({
                        font: '100 15px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif',
                        fill: "#000",
                        "text-anchor": "start"
                    }),
                    a.circle(255, 20 + 25 * e, 4).attr({
                        stroke: "none",
                        fill: t[e].color
                    })
                }(s, c),
                o += c
            }
            r.animate({
                r: 100
            }, 1e3, "bounce"),
            i > 0 && function(e) {
                var a, o = 0;
                for (s = 0; s < l; s++)
                    a = 360 / i * t[s].data,
                    n[s].animate({
                        segment: [140, 110, 99, o, o += a]
                    }, e || 1500, "bounce"),
                    n[s].angle = o - a / 2
            }(1e3)
        }
        ;
        var d, u;
        a.prototype.pathPrefix = "solitaire/images/solitaire_preview/",
        a.prototype.pathSuffix = ".jpg",
        a.prototype.pathPrefix += "large/",
        n.isApp && n.isRetina && (a.prototype.pathSuffix = "@2x.jpg"),
        a.prototype.createElements = function() {
            var t = this.doms = [];
            for (var a in this.variation) {
                var i = document.createElement("span");
                i.className = "game",
                n.isMobilePhone && (i.className += " onphone");
                var r = e.localisation.getL("game-" + this.variation[a].normalizedName);
                $(i).html(r).prepend(e.resources.getExtraImage(this.variation[a].ssPath)).click(function(t, a) {
                    return function() {
                        o.backToGame(),
                        e.startGame(t, a)
                    }
                }(this.name, a)),
                t.push([this.variation[a].displayName, i])
            }
            return t
        }
        ;
        var p = 0;
        if (o.loadGames = function(e) {
            var t = [];
            for (var i in r.gamesList) {
                var o = new a(i,r.gamesList[i]);
                l[i] = o;
                for (var n = o.createElements(), s = 0; s < n.length; s++)
                    t.push(n[s])
            }
            t.sort(function(e, t) {
                return e[0].localeCompare(t[0])
            });
            var c = document.createDocumentFragment();
            t.forEach(function(e) {
                c.appendChild(e[1])
            }),
            e.append(c),
            p = t.length
        }
        ,
        o.loadAppearanceOptions = function(a) {
            function i(t) {
                return function() {
                    var a = $(this).data(t + "name");
                    e.gameSettings[t] = a,
                    o.loading.show(),
                    s["set" + t.capitalize()](a),
                    s.download(function() {
                        o.loading.hide(),
                        s.updateImages()
                    })
                }
            }
            function n(e, a, o, n, r) {
                var s = ["a", "b", "c", "d", "e"]
                  , d = 0
                  , u = Object.keys(e).sort().map(function(e) {
                    var i = s[d];
                    return d = (d + 1) % r,
                    t.template(l, {
                        column: i,
                        src: o + e + "." + n,
                        type: a,
                        name: e,
                        title: c(e)
                    })
                }).join("");
                $("#" + a + "s-list").html(u).on("click", "[data-" + a + "name]", i(a))
            }
            var l = '<div class="columnButtonWrapper ui-block-{{column}}"><div data-theme="c" class="ui-btn ui-corner-all ui-btn-up-c appearance-asset" data-{{type}}name="{{name}}"><a href="#" data-src="{{src}}"></a><span>{{title}}</span></div></div>';
            n(r.gameBackgrounds, "background", "solitaire/images/backgrounds/thumbnails/", "jpg", 3),
            n(r.cardSets, "cardset", "solitaire/images/cards/thumbnails/", "png", 3),
            n(r.cardBacks, "cardback", "solitaire/images/backs/thumbnails/", "png", 5)
        }
        ,
        o.showGameSelector = function() {
            o.adjustGameSelector(),
            o.showPopup("main-ui"),
            e.game.running() ? $("#selectSolitaireBack").show() : $("#selectSolitaireBack").hide()
        }
        ,
        o.adjustGameSelector = function() {
            if (!n.isMobilePhone) {
                var e = 3;
                (p < 9 || window.innerWidth < 1100) && (e = 2),
                window.innerWidth < 900 && (e = 1);
                var t = Math.min(window.innerHeight - 210, 225 * Math.ceil(p / e) + 5);
                $("#games-content").height(t)
            }
            $(".game").outerWidth(!0);
            var a = window.innerWidth;
            a > 900 && (a = 900),
            (p < 9 || window.innerWidth < 1100) && a > 912.5 && (a = 912.5),
            window.innerWidth < 900 && (a = 547.5),
            $("#group-games").width(365 * Math.floor((a - 30) / 365)),
            $("#main-ui-popup").css("left", (window.innerWidth - $("#main-ui-popup").width()) / 2).css("visibility", "visible")
        }
        ,
        o.gameAlert = function(e, t, a) {
            $("#info-title").html(e),
            $("#info-content").html(t),
            o.showPopup("info-dialog"),
            $("#alert-button").off("click"),
            a && $("#alert-button").on("click", a)
        }
        ,
        o.backToGame = function() {
            $.mobile.changePage("#game-ui")
        }
        ,
        n.isMobilePhone)
            o.showPopup = function(e) {
                $("html").addClass("with-phone-popup"),
                $.mobile.changePage("#" + e)
            }
            ,
            $(document).on("pagechange", function(t, a) {
                "game-ui" === a.toPage[0].id && ($("html").removeClass("with-phone-popup"),
                e.game.updateDisplay())
            });
        else {
            var h = $()
              , g = 200;
            o.showPopup = function(t) {
                var a = g;
                g = 0,
                1 == h.length && h.attr("id") !== t && (h.popup("close"),
                a += 100),
                h = $("#" + t),
                setTimeout(function() {
                    var t = parseInt($("#game-ui").css("left"));
                    e.gameSettings.lastGame || (t = 0);
                    var a = (window.innerWidth + t) / 2;
                    h.popup("open", {
                        x: a,
                        tolerance: 1,
                        positionTo: "origin"
                    })
                }, a)
            }
        }
        o.jqmLoader = null,
        o.showRules = function() {
            o.jqmLoader.loader("show"),
            $.get(d).done(function(e) {
                document.querySelector('#rules-dialog>div[data-role="content"]').innerHTML = toStaticHTML(e),
                o.showPopup("rules-dialog"),
                o.jqmLoader.loader("hide"),
                e = null
            }).fail(function() {
                $.get(u).done(function(e) {
                    document.querySelector('#rules-dialog>div[data-role="content"]').innerHTML = toStaticHTML(e),
                    o.showPopup("rules-dialog"),
                    o.jqmLoader.loader("hide"),
                    e = null
                })
            })
        }
        ,
        o.createBookmarkButton = function() {
            var e = $("<a/>").attr({
                title: c("bookmark-hint"),
                href: location.href,
                rel: "sidebar",
                id: "bookmark-button"
            }).on("click", i);
            $("#shareButtonsGroup").prepend(e)
        }
        ,
        n.isDebugging && n.isApp && (window.onerror = function(e, t, a) {
            var i = "Error in file: " + t + "\nline number:" + a + "\nMessage:" + e;
            return alert("Error Found !!!\n--------------\n" + i),
            !0
        }
        ,
        setTimeout(function() {
            alert("This is the debugging version!")
        }, 5e3));
        var m = t.prefix.toLowerCase() + "Hidden";
        document.addEventListener(t.prefix.toLowerCase() + "visibilitychange", function() {
            document[m] ? e.game.timer.pause() : e.game.timer.start()
        }, !1)
    }(),
    function() {
        "use strict";
        var t = e.display = {};
        t.cardSep = 0,
        t.cwidth = 0,
        t.cheight = 0,
        t.cardStaticShadow = "",
        t.highlightShadow = "",
        t.hoverShadow = "",
        t.cardStaticShadow = "",
        t.borderRadius = 0,
        t.playAreaHeight = 0,
        t.playAreaWidth = 0,
        t.scaling = 1.2,
        t.dragShadow = "10px 10px 10px rgba(0,0,0,0.6)",
        t.adjust = function(e) {
            t.cwidth = e.cwidth,
            t.cheight = e.cheight,
            t.cardSep = e.cheight / 4 | 0,
            t.playAreaHeight = e.height,
            t.playAreaWidth = e.width,
            t.cardStaticShadow = "1px " + Math.floor(3 / 198 * t.cheight) + "px 6px " + Math.floor(2 / 198 * t.cheight) + "px rgba(60, 60, 60, 0.5)",
            t.highlightShadow = "0 0 " + Math.floor(7 / 198 * t.cheight) + "px " + Math.floor(9 / 198 * t.cheight) + "px #83e3f7",
            t.hoverShadow = "0 0 " + Math.floor(7 / 198 * t.cheight) + "px " + Math.floor(7 / 198 * t.cheight) + "px #f8f465",
            t.cardStaticShadow = "0 0 " + Math.floor(9 / 198 * t.cheight) + "px rgba(80, 80, 80, 0.5)",
            t.borderRadius = Math.floor(10 * t.cheight / 198)
        }
    }(),
    function() {
        "use strict";
        var t = e.winAnimations = {}
          , a = e.display
          , i = {}
          , o = null
          , n = null
          , r = function() {}
          , s = 0;
        i.throwOut = function() {
            !function e(t) {
                if (!o)
                    return r();
                if (t === o.length)
                    setTimeout(function() {
                        e(t + 1)
                    }, 500);
                else if (t === o.length + 1)
                    r();
                else {
                    for (; o[t].cards.length > 0; )
                        $(o[t].lastCard().dom).stop().css("zIndex", 10 + t).transition({
                            rotate: 720 * Math.random() + "deg",
                            x: .1 * -a.playAreaWidth + Math.random() * (1.2 * a.playAreaWidth) >> 0,
                            y: Math.random() * (a.playAreaHeight - 1.3 * a.cheight) >> 0
                        }, 1e3, "easeOutCirc"),
                        o[t].popCard();
                    s = setTimeout(function() {
                        e(t + 1)
                    }, 700)
                }
            }(0)
        }
        ,
        i.randomShow = function() {
            var e = 2e3 / n.length;
            $(".card").css("opacity", 0);
            for (var t = [], i = [], o = 0; o < n.length; o++)
                i.push(o);
            for (o = 0; o < n.length; o++) {
                var l = Math.floor(Math.random() * i.length);
                t.push(i[l]),
                i[l] = i[i.length - 1],
                i.pop()
            }
            !function i(o) {
                o === t.length ? r() : (n[t[o]].jdom.css({
                    x: Math.floor(Math.random() * (a.playAreaWidth - 1.2 * a.cwidth)),
                    y: Math.floor(Math.random() * (a.playAreaHeight - 1.3 * a.cheight)),
                    zIndex: 100 + o
                }).transition({
                    opacity: 1
                }),
                s = setTimeout(function() {
                    i(o + 1)
                }, e))
            }(0)
        }
        ,
        t.start = function(t, a, s) {
            var l = !1;
            r = function() {
                l || (l = !0,
                setTimeout(function() {
                    $(window).trigger("winAnimation:end")
                }, 100),
                s())
            }
            ,
            o = t,
            n = a,
            "pyramid" == e.data.projectType ? i.randomShow() : i.throwOut()
        }
        ,
        t.stop = function() {
            clearTimeout(s),
            n.forEach(function(e) {
                e.jdom.stop()
            }),
            n = null,
            o = null,
            r()
        }
    }(),
    function() {
        "use strict";
        var a, i = e.game = {}, o = e.config, n = e.display, r = e.ui, s = e.audio, l = e.cardData, c = $(window), d = null, u = null, p = null, h = null, g = null, m = "windows" === o.isApp ? 15 : 0, f = 0, w = function() {
            var e = 0;
            return {
                INIT: e++,
                WAITING: e++,
                DRAGSTART: e++,
                MOVING: e++,
                POSTMOVE: e++,
                AUTOFILLING: e++,
                END: e++
            }
        }(), b = i.timer = {
            _timer: 0,
            start: function(e) {
                clearInterval(this._timer),
                void 0 !== e && (l.time = e),
                this._timer = setInterval(function() {
                    b._increTimer()
                }, 1e3)
            },
            pause: function() {
                clearInterval(this._timer)
            },
            _increTimer: function() {
                l.time++
            }
        };
        i.state = w.INIT,
        i.moveWithAnimate = o.moveWithAnimate,
        i.setGameDom = function(e) {
            (g = e).click(function() {
                i.hideHint()
            })
        }
        ,
        i.onMoveOccurred = null;
        var v = 0
          , y = function() {
            clearTimeout(v),
            i.onMoveOccurred && (v = setTimeout(function() {
                i.onMoveOccurred()
            }, 700))
        }
          , S = 0;
        i.scheduleUpdateDisplay = function(e) {
            clearTimeout(S),
            S = setTimeout(i.updateDisplay, e)
        }
        ,
        i.marginsForDevices = 0,
        i.updateDisplay = function() {
            if (d) {
                var a = g.width()
                  , o = g.height() - m;
                i.marginsForDevices = 0,
                window.innerHeight < window.innerWidth && ((e.config.isMobilePhone || e.config.isTablet) && (d.rows > 5 ? (i.marginsForDevices = 0,
                e.config.totalL = 4,
                e.config.cL = 3) : d.columns >= 10 ? (i.marginsForDevices = parseInt(.05 * a),
                e.config.totalL = 8,
                e.config.cL = 7) : d.columns >= 8 ? (i.marginsForDevices = parseInt(.09 * a),
                e.config.totalL = 4,
                e.config.cL = 3) : (i.marginsForDevices = parseInt(.1 * a),
                e.config.totalL = 4,
                e.config.cL = 3),
                e.config.isTablet && (i.marginsForDevices = parseInt(i.marginsForDevices / 2))),
                "windows" == e.config.isApp && t.isUWP() && !e.config.isMobilePhone && Windows.Graphics.Display.DisplayInformation.getForCurrentView().rawPixelsPerViewPixel > 1 && (d.columns >= 8 ? (i.marginsForDevices = parseInt(.09 * a),
                e.config.totalL = 4,
                e.config.cL = 3) : (i.marginsForDevices = parseInt(.1 * a),
                e.config.totalL = 4,
                e.config.cL = 3))),
                a -= 2 * i.marginsForDevices,
                e.display.adjust(d.adjustLayout(a, o)),
                u.css({
                    height: n.cheight,
                    width: n.cwidth,
                    "border-radius": n.borderRadius
                }),
                d.containers.forEach(function(e) {
                    e.adjustPos()
                }),
                X && X.h.transition({
                    position: "absolute",
                    height: X.end.pos.y - X.start.pos.y + n.cheight,
                    width: n.cwidth,
                    top: 0,
                    left: 0,
                    x: X.start.pos.x,
                    y: X.start.pos.y,
                    zIndex: X.start.pos.z - 1,
                    borderRadius: n.borderRadius
                }, X.start.time)
            }
        }
        ,
        i.empty = function() {
            d && (i.save(),
            i.hints.length = 0,
            i.hideHint(),
            d.clear())
        }
        ,
        i.setCurrentGame = function(e) {
            this._cur = d = e,
            u = $(e.frag.childNodes),
            e.cards.forEach(function(e) {
                e.animating = !0
            }),
            a = e.containers.map(function() {
                return !1
            }),
            u = u.add(u.find(".cardFront, .cardBack")),
            g.append(e.frag),
            i.updateDisplay()
        }
        ,
        i.play = function() {
            l.load() ? l.lastGame.isReset ? i.start(!0) : i.load() : (i.state = w.END,
            i.start())
        }
        ,
        i.start = function(t) {
            if (d) {
                c.trigger("game:start");
                var a = i.state !== w.END;
                i.hints.length = 0,
                i.init(),
                i.hideHint(),
                i.state = w.INIT,
                b.start(0),
                b.pause(),
                l.reset(),
                t || (a && (l.currentStreakIsWinning ? (l.currentStreakIsWinning = !1,
                l.currentStreak = 1) : l.currentStreak++),
                l.gamePlayCount++),
                i.moveWithAnimate = !1,
                d.init(function() {
                    i.state = w.POSTMOVE,
                    se(700),
                    ie.length = 0,
                    oe.length = 0,
                    b.start(),
                    i.moveWithAnimate = o.moveWithAnimate
                }),
                e.ad.checkRefreshAd()
            }
        }
        ,
        i.init = function() {
            $(".card").stop().css({
                opacity: "",
                rotate: "0deg"
            }),
            clearTimeout(f),
            le()
        }
        ,
        i.save = function() {
            d && i.state !== w.END && i.state !== w.INIT && (l.lastGame = {
                undoStack: ie,
                redoStack: oe,
                game: d.gameState()
            },
            l.save())
        }
        ,
        i.load = function() {
            c.trigger("game:resume"),
            i.hints.length = 0,
            i.hideHint(),
            i.init(),
            i.state = w.INIT,
            b.start(),
            b.pause();
            var e = l.lastGame;
            ie.length = 0,
            e.undoStack && e.undoStack.forEach(function(e) {
                ie.push(e)
            }),
            oe.length = 0,
            e.redoStack && e.redoStack.forEach(function(e) {
                oe.push(e)
            }),
            d.loadGameState(e.game, function() {
                i.state = w.POSTMOVE,
                se(700),
                b.start()
            })
        }
        ;
        var k, _ = 0, C = [], A = [], x = 0, T = 0, M = 0, P = 0, E = !1, F = function(e, t) {
            return Math.max(Math.abs(e - x), Math.abs(t - T)) <= n.cheight / 5
        }, G = !1;
        i.initialiseDrag = function(e, t, a) {
            if (!G && e.ownedBy && (G = !0,
            clearTimeout(k),
            k = setTimeout(function() {
                G = !1
            }, 200),
            i.state === w.WAITING && !e.moving && !e.flipping)) {
                le(),
                i.hideHint(!0),
                E = !!a,
                i.state = w.DRAGSTART,
                _ = 0,
                C = [],
                A = [];
                for (var o = e.ind; o < e.ownedBy.cards.length; o++) {
                    var n = e.ownedBy.cards[o];
                    C.push(n),
                    A.push(n.dom)
                }
                x = t.x,
                T = t.y,
                M = 0 | e.domPos.x,
                P = 0 | e.domPos.y,
                (A = $(A)).removeTransition()
            }
        }
        ;
        var j = function(e) {
            e.preventDefault();
            var t, a;
            if (e.originalEvent.changedTouches) {
                var o = e.originalEvent.changedTouches[0];
                t = o.clientX,
                a = o.clientY
            } else
                t = e.originalEvent.clientX,
                a = e.originalEvent.clientY;
            i.state === w.MOVING ? p(t, a) : i.state === w.DRAGSTART && d.movable(C[0]) && (C.forEach(function(e) {
                e.moving = !0
            }),
            U())
        }
          , L = null
          , R = 0
          , I = 0
          , B = function(e, t) {
            A.css({
                x: M + e - x,
                y: function(e) {
                    return P + t - T + e * n.cardSep
                }
            })
        }
          , W = function() {
            var e = C[0].hasShadow ? n.cardStaticShadow : "";
            A.find(".cardFront").stop().transition({
                scaleX: 1,
                scaleY: 1,
                "box-shadow": e
            }, C[0].time)
        }
          , z = t.prefix + "Transition"
          , N = t.prefix + "Transform"
          , D = "-" + t.prefix.charAt(0).toLowerCase() + t.prefix.substr(1) + "-transform "
          , O = 0
          , H = function() {
            _ = 0,
            L.transition({
                x: 0,
                y: 0,
                rotate: 0
            }, 500, "easeInCubic")
        }
          , q = function(e, t) {
            var a = M + e - x
              , i = P + t - T;
            if (a !== R || i !== I) {
                clearTimeout(O);
                var o, r, s = a - R;
                s < 0 ? (s > _ && (s = _),
                _ = s,
                o = 450 / (10 - s) - 45,
                r = -2) : (s < _ && (s = _),
                _ = s,
                o = -450 / (10 + s) + 45,
                r = 2),
                R = a,
                I = i,
                L.each(function(e) {
                    this.style[z] = D + 100 + "ms ease",
                    this.style.transform = this.style[N] = "translate3d(0, -" + n.cardSep * e + "px, 0)rotate(" + (o + r * e) + "deg) translate3d(0, " + n.cardSep * e + "px, 0) scale(1.2)"
                }),
                A.css({
                    x: a,
                    y: function(e) {
                        return n.cardSep * e + i
                    }
                }),
                O = setTimeout(H, 200)
            }
        }
          , V = function(e, t) {
            if (i.state === w.MOVING) {
                clearTimeout(O);
                var a = C[0].hasShadow ? n.cardStaticShadow : "";
                L.each(function(e) {
                    this.style[z] = D + C[0].time + "ms ease",
                    this.style[N] = "",
                    this.style.transform = "",
                    this.style.boxShadow = a
                })
            }
        };
        p = q,
        h = V,
        i.setMovingSwinging = function(e) {
            e ? (p = q,
            h = V) : (p = B,
            h = W)
        }
        ,
        i.setCardEffect = function(e) {
            e ? (delete $.cssHooks.boxShadow,
            delete $.cssHooks.ieBoxShadow,
            n.scaling = 1.2,
            d && d.cards.forEach(function(e) {
                e.setShadow(e.hasShadow),
                e.setHoverEffect(!0)
            }),
            $(".bottomButton").css("box-shadow", "")) : ($(".bottomButton").css("box-shadow", "none"),
            $(".cardBack, .cardFront").css("boxShadow", "none"),
            d && d.cards.forEach(function(e) {
                e.setHoverEffect(!1)
            }),
            $.cssHooks.boxShadow = {
                get: function() {
                    return null
                },
                set: function() {}
            },
            $.cssHooks.ieBoxShadow = {
                get: function(e) {
                    return e.style.boxShadow
                },
                set: function(e, t) {
                    e.style.boxShadow = t
                }
            },
            n.scaling = 1)
        }
        ;
        var U = function() {
            A.stop().each(function(e) {
                this.style.zIndex = 200 + e,
                this.style.boxShadow = "none",
                this.style.webkitTransition = "",
                this.style.MSTransition = ""
            }).find(".cardFront").transition({
                scaleX: n.scaling,
                scaleY: n.scaling,
                "box-shadow": e.display.dragShadow
            }, 100, "linear"),
            L = A.find(".cardFront"),
            R = parseInt(A.css("x"), 10),
            i.state = w.MOVING
        }
          , K = function(e, t) {
            var a, i, o;
            return e.left < t.left ? (a = e,
            i = t) : (a = t,
            i = e),
            a.right < i.left ? 0 : (o = a.right > i.right ? i.right - i.left : a.right - i.left,
            e.top < t.top ? (a = e,
            i = t) : (a = t,
            i = e),
            a.bottom < i.top ? 0 : (a.bottom > i.bottom ? o *= i.bottom - i.top : o *= a.bottom - i.top,
            o))
        }
          , J = function(t, a) {
            var r, l;
            if ((i.state === w.DRAGSTART || i.state === w.MOVING) && F(t, a)) {
                if (r = d.cardClicked(C[0]))
                    return h(),
                    i.state = w.WAITING,
                    f = setTimeout(function() {
                        s.drop.play()
                    }, r),
                    void se(r);
                if (i.requestAutomove(C[0], !0))
                    return h(),
                    void (i.state = w.WAITING)
            }
            if (i.state === w.DRAGSTART)
                i.state = w.WAITING;
            else if (i.state === w.MOVING) {
                if (O && clearTimeout(O),
                h(),
                i.state = w.WAITING,
                !(E && Math.max(Math.abs(t - x), Math.abs(T - a)) <= n.cheight / 5 && i.requestAutomove(C[0]))) {
                    var c = 0
                      , u = -1
                      , p = {
                        left: parseInt($(C[0].dom).css("x"), 10),
                        top: parseInt($(C[0].dom).css("y"), 10)
                    };
                    for (p.right = p.left + n.cwidth * n.scaling,
                    p.bottom = p.top + n.cheight * n.scaling,
                    l = 0; l < d.containers.length; l++) {
                        var g = K(d.containers[l].toRect(), p);
                        g > c && d.testAccept(C, d.containers[l]) && (c = g,
                        u = l)
                    }
                    if (clearTimeout(O),
                    -1 === u) {
                        for (e.containers.Card.speed = o.revertSpeed,
                        C[0].adjustPos(),
                        l = 1; l < C.length; l++)
                            C[l].adjustPos(C[0].time + 70 * l);
                        C[0].ownedBy.adjustZ(C[0].time + 70 * C.length - 70),
                        f = setTimeout(function() {
                            s.drop.play()
                        }, C[0].time),
                        e.containers.Card.speed = o.animationSpeed
                    } else {
                        var m = d.getMoveWhenDrop(C, d.containers[u])
                          , b = {};
                        for (l = 0; l < m.length; l++)
                            l > 0 && (b.chain = !0),
                            i.performMove(m[l].cards, m[l].des, void 0, b, !0);
                        r = Y(),
                        i.state = w.WAITING,
                        f = setTimeout(function() {
                            s.drop.play()
                        }, r),
                        se(r)
                    }
                }
                C = [],
                L = null
            }
        };
        $(document).on("mousemove", j).on(o.event_touchmove, j).on("mouseup", function(e) {
            J(e.clientX, e.clientY)
        }).on(o.event_touchend, function(e) {
            var t = e.originalEvent;
            t.changedTouches ? J(t.changedTouches[0].clientX, t.changedTouches[0].clientY) : J(t.clientX, t.clientY)
        }).on(o.event_touchmove, ".phone-popup, .ui-popup-container", function(e) {
            e.stopPropagation()
        });
        var Z = function(t, a, i, o) {
            var n = t[0].ownedBy
              , r = {
                from: d.containers.indexOf(n),
                to: d.containers.indexOf(a),
                cards: t.map(function(e) {
                    return e.objid
                }),
                chain: o.chain,
                isTakeOver: o.isTakeOver
            };
            o.flipLast && a.lastCard().flip(!0),
            o.flipLastFrom && n.lastCard().flip(!0),
            o.flipCards && (t.forEach(function(e) {
                e.flip(!e.flipped)
            }),
            r.flipCards = !0),
            o.reversed && (t = t.reverse(),
            r.reversed = !0,
            r.cards = t.map(function(e) {
                return e.objid
            }));
            for (var s = t.length; s--; )
                n.popCard();
            t.forEach(function(e) {
                e.jdom.trigger("mouseout")
            }),
            n.popNeedUpdate && Q(n),
            a.takeIn(t, !0),
            Q(a, o.adjustPosOption);
            var c = n.lastCard();
            c && n.shouldFlipLast() && c.flipped && (c.flip(!1),
            n.flipUpdate(),
            r.flipLast = !0),
            (c = a.lastCard()) && a.shouldFlipLast() && c.flipped && (c.flip(!1),
            a.flipUpdate(),
            r.flipLastFrom = !0),
            1 === i ? (oe.push(r),
            l.movesCount += 1) : 2 === i ? ie.push(r) : (ie.push(r),
            oe.length = 0,
            l.movesCount += 1),
            n instanceof e.containers.Tableau && n.adjustPos(),
            d.moveOccurred(n, a, t.length),
            y()
        }
          , Q = function(e, t) {
            t || (t = {}),
            a[d.containers.indexOf(e)] = t
        }
          , Y = function() {
            for (var e = 0, t = 0; t < a.length; t++)
                a[t] && (a[t].delay ? (setTimeout(function(e, t) {
                    return function() {
                        d.containers[e].adjustPos(t)
                    }
                }(t, a[t].time), a[t].delay),
                e = Math.max(a[t].delay + a[t].time, e)) : e = Math.max(d.containers[t].adjustPos(a[t].time), e),
                a[t] = null);
            return e
        };
        i.performMove = function(t, a, n, r, s) {
            i.hideHint(),
            r || (r = {});
            return a instanceof Array ? (i.moveWithAnimate = !1,
            a.forEach(function(a, i) {
                i > 0 && (r.chain = !0),
                e.gameSettings.useCSS3 || (r.adjustPosOption = {
                    delay: 50 * i,
                    time: 200
                }),
                Z(t[i], a, n, r)
            }),
            i.moveWithAnimate = o.moveWithAnimate) : Z(t, a, n, r),
            ee = !0,
            i.computeHints(),
            s ? 0 : Y()
        }
        ,
        i.requestTakeOver = function(e, t, a) {
            if (i.state !== w.WAITING)
                return !1;
            t.cards[0];
            var o = i.performMove(t.cards.slice(0), e, void 0, {
                flipCards: a,
                reversed: !0,
                isTakeOver: !0
            });
            return s.redeal.play(),
            se(o),
            !0
        }
        ;
        var X = null;
        i.requestLongHint = function(e, t) {
            var a = $(document.createElement("div")).addClass("long-highlight").css({
                position: "absolute",
                height: t.pos.y - e.pos.y + n.cheight,
                width: n.cwidth,
                top: 0,
                left: 0,
                x: e.pos.x,
                y: e.pos.y,
                zIndex: e.pos.z - 1,
                borderRadius: n.borderRadius
            }).transition({
                boxShadow: n.highlightShadow,
                ieBoxShadow: n.highlightShadow
            }, 200);
            a[0].ondragstart = function() {
                return !1
            }
            ,
            g.append(a);
            for (var i = e.ind; i <= t.ind; i++)
                e.ownedBy.cards[i].inHint = a[0],
                e.ownedBy.cards[i].jdom.trigger("mouseout");
            X = {
                start: e,
                end: t,
                h: a
            }
        }
        ,
        i.removeLongHint = function(e, t) {
            for (var a = X.start.ind; a <= X.end.ind; a++)
                X.start.ownedBy.cards[a].inHint = null;
            X.h.remove(),
            X = null
        }
        ,
        i.hints = [],
        i.curHint = null,
        i.hintInd = 0;
        var ee = !0
          , te = !1
          , ae = null;
        i.hideHint = function(e) {
            ae = e ? i.curHint : null,
            i.curHint && (i.curHint.from && i.curHint.from.setHighlight(!1),
            i.curHint.to && i.curHint.to.setHighlight(!1),
            i.curHint = null)
        }
        ,
        i.showHint = function() {
            if ((i.state === w.WAITING || i.state === w.POSTMOVE) && !ee) {
                if (0 === i.hints.length) {
                    var e = d.getSpecialHint();
                    e && (i.hideHint(),
                    i.curHint = e,
                    i.hintInd = -1)
                } else {
                    var t = i.hints.indexOf(i.curHint) + 1 || i.hintInd + 1;
                    t %= i.hints.length,
                    i.hintInd = t,
                    i.hideHint(),
                    i.curHint = i.hints[t]
                }
                i.curHint && (i.curHint.from && i.curHint.from.setHighlight(!0, i.curHint.length),
                i.curHint.to && i.curHint.to.setHighlight(!0))
            }
        }
        ,
        i.computeHints = function() {
            te || (this.hints.length = 0,
            d.computeHints(this.hints),
            ee = !1)
        }
        ;
        var ie = []
          , oe = []
          , ne = function(e, t) {
            e.isTakeOver && (d.undoTakeOver(d.containers[e.from], d.containers[e.to]),
            e.cards || (e.cards = d.stocks[0].cards.map(function(e) {
                return e.objid
            }))),
            i.performMove(e.cards.map(function(e) {
                return d.cards[e]
            }), d.containers[e.from], t, {
                flipLast: e.flipLast,
                flipLastFrom: e.flipLastFrom,
                flipCards: e.flipCards,
                reversed: e.reversed,
                chain: e.chain,
                isTakeOver: e.isTakeOver
            })
        };
        i.applyUndo = function() {
            if (i.state === w.WAITING && ie.length) {
                s.undo.play();
                var e, t = !1, a = 0;
                do {
                    t = (e = ie.pop()).chain,
                    a ? a > 0 && (e.chain = !0) : e.chain = !1,
                    a++,
                    ne(e, 1)
                } while (t);
                i.computeHints()
            }
        }
        ,
        i.applyRedo = function() {
            if (i.state === w.WAITING && oe.length) {
                s.redo.play();
                var e, t = !1, a = 0;
                do {
                    t = (e = oe.pop()).chain,
                    a ? a > 0 && (e.chain = !0) : e.chain = !1,
                    a++,
                    ne(e, 2)
                } while (t);
                se(700)
            }
        }
        ,
        i.restart = function() {
            if (i.state == w.WAITING && !d.cards.some(function(e) {
                return !e.ownedBy
            })) {
                for (i.state = w.INIT,
                i.hints.length = 0,
                i.hideHint(),
                te = !0; ie.length; )
                    ne(ie.pop(), 1);
                te = !1,
                i.computeHints(),
                oe.length = 0,
                b.start(0),
                b.pause(),
                f = setTimeout(function() {
                    b.start(),
                    i.state = w.POSTMOVE
                }, 700),
                se(700)
            }
        }
        ,
        i.running = function() {
            return !!d
        }
        ,
        i.playing = function() {
            return i.state !== w.END
        }
        ,
        i.autoFill = function() {
            var t = d.getAutoFillMove();
            if (t) {
                e.containers.Card.speed = o.autoplaySpeed;
                var a = i.performMove(t.cards, t.destination, void 0, {
                    chain: t.chain
                });
                e.containers.Card.speed = o.animationSpeed,
                s.autoplay.play(),
                se(Math.round(.8 * a))
            } else
                i.computeHints(),
                i.testEnd()
        }
        ;
        var re = 0
          , se = function(e) {
            le(),
            re = setTimeout(i.autoFill, e)
        }
          , le = function() {
            clearTimeout(re)
        };
        i.testEnd = function() {
            i.state !== w.END && (d.isWon() ? (c.trigger("game:won", d),
            r.modal.show(),
            r.modal.clickOnce(function() {
                e.winAnimations.stop(),
                e.interstitial ? c.one("interstitial:hidden", function() {
                    i.onGamewon()
                }) : i.onGamewon()
            }),
            e.winAnimations.start(d.foundations, d.cards, function() {
                r.modal.click()
            }),
            i.state = w.END,
            b.pause(),
            s.gamewon.play(),
            l.winUpdate()) : d.isLost(this.hints) ? (c.trigger("game:lose", d),
            i.state = w.WAITING,
            r.showPopup("nomoremove-dialog")) : i.state = w.WAITING)
        }
        ,
        i.getMaxmove = function(e) {
            return d.getMaxmove(e)
        }
        ,
        i.getFlipScale = o.noScaling ? function() {
            return 1
        }
        : function() {
            return d.flipScale
        }
        ,
        i.requestAutomove = function(t, a) {
            if (i.state === w.WAITING && i.movable(t) || a && d.movable(t)) {
                var n = d.requestAutomove(t, i.curHint || ae);
                if (n) {
                    e.containers.Card.speed = o.automoveSpeed;
                    var r = t.ownedBy.getCards(t.ownedBy.cards.length - t.ind)
                      , l = i.performMove(r, n);
                    return d.clickAdjust(r),
                    e.containers.Card.speed = o.animationSpeed,
                    f = setTimeout(function() {
                        s.drop.play()
                    }, l),
                    se(l),
                    !0
                }
            }
            return !1
        }
        ,
        i.hoverable = function(e) {
            return i.state === w.WAITING && d.hoverable(e)
        }
        ,
        i.movable = function(e) {
            return !e.moving && !e.flipping && d.movable(e)
        }
        ,
        i.instaWin = function() {
            d.tableaus.forEach(function(e) {
                for (; e.cards.length; )
                    e.popCard()
            });
            for (var e = 0; e < d.foundations.length; e++)
                for (var t = 0; t < 13; t++)
                    d.foundations[e].takeIn(d.cards[13 * e + t]);
            i.testEnd()
        }
    }(),
    function() {
        "use strict";
        var t = e.config
          , a = e.ad = {};
        if (t.isApp && (t.isiOS && t.isFreeApp && $(document).on("deviceready", function() {
            window.addEventListener("orientationchange", window.plugins.iAdPlugin.orientationChanged, !1),
            document.addEventListener("iAdBannerViewDidLoadAdEvent", function() {
                window.plugins.iAdPlugin.showAd(!0)
            }, !1),
            document.addEventListener("iAdBannerViewDidFailToReceiveAdWithErrorEvent", function(e) {
                window.plugins.iAdPlugin.showAd(!1)
            }, !1),
            window.plugins.iAdPlugin.prepare(!0),
            window.plugins.iAdPlugin.orientationChanged(!0),
            window.plugins.iAdPlugin.showAd(!0)
        }),
        "windows" == t.isApp)) {
            var i, o, n = null, r = null;
            a.positionAd = function(a) {
                t.isFreeApp ? (n || (n = $("#winAdContainer")),
                r && (r = null,
                n.html("")),
                a ? ($(".bottomBar").css("bottom", ""),
                $("#playArea").css("height", ""),
                $("#playArea").css("top", ""),
                $("#playArea").css("left", 160),
                n.removeClass("portrait").addClass("landscape")) : ($(".bottomBar").css("bottom", 98),
                $("#playArea").css("height", "calc(100% - 145px)"),
                $("#playArea").css("top", ""),
                $("#playArea").css("left", 0),
                n.removeClass("landscape").addClass("portrait")),
                "klondike" == e.data.projectType ? (i = "9283322d-2c9a-4cde-8015-f9ac004e3afc",
                o = a ? "10294890" : "10294891") : "spider" == e.data.projectType ? (i = "056c6199-b634-4ca8-b4de-429dbaa32f59",
                o = a ? "10318802" : "10318801") : "pyramid" == e.data.projectType ? (i = "345550cf-8de9-4975-b3c7-0cc63ffd0075",
                o = a ? "10076692" : "10076691") : "collection" == e.data.projectType ? (i = "dd597324-3337-4860-abeb-d06695bc8405",
                o = a ? "10218612" : "10218611") : "christmas" == e.data.projectType ? (i = "9wzdncrdn95f",
                o = a ? "ctrl-9wzdncrdn95f-1" : "ctrl-9wzdncrdn95f-2") : "freecell" == e.data.projectType && (i = "002fb023-ada1-4580-bcb9-0368b062f7e0",
                o = a ? "10048436" : "10045561"),
                (r = new MicrosoftNSJS.Advertising.AdControl(n[0],{
                    applicationId: i,
                    adUnitId: o
                })).isAutoRefreshEnabled = !0,
                $("#winAdContainer").css({
                    background: 'transparent url("solitaire/css/images/transparent.png") repeat center top',
                    position: "absolute"
                }),
                e.game.scheduleUpdateDisplay(100)) : ($("#winAdContainer").remove(),
                $(".bottomBar").css("bottom", ""),
                $("#playArea").css("height", ""),
                $("#playArea").css("left", 0))
            }
        }
        var s = (new Date).getTime();
        a.checkRefreshAd = function() {
            if ("undefined" != typeof googletag) {
                var e = (new Date).getTime();
                Math.abs(Math.round((e - s) / 1e3)) > 120 && (refreshgoogletag(),
                s = (new Date).getTime())
            }
        }
    }(),
    e.winAppify = function() {
        "use strict";
        function a() {
            var e = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
            if (e.isFullScreenMode)
                e.exitFullScreenMode();
            else if (e.tryEnterFullScreenMode()) {
                var t = Windows.UI.ViewManagement
                  , a = t.ApplicationViewWindowingMode;
                t.ApplicationView.preferredLaunchWindowingMode = a.fullScreen
            }
        }
        var i, o = e.config, n = WinJS.Application;
        n.onloaded = function() {
            $(".ui-body-c, .ui-body-c input, .ui-body-c select, .ui-body-c textarea,.ui-body-c button, .ui-bar-a, .ui-bar-a input, .ui-bar-a select, .ui-bar-a textarea, .ui-bar-a button, .ui-btn-up-a, .ui-btn-hover-a, .ui-btn-down-a, .ui-btn-up-c, .ui-btn-hover-c, .ui-btn-down-c").css("font-family", "Segoe UI"),
            $("a").css("text-decoration", "none"),
            $(document.body).addClass("win8"),
            d(),
            $(window).resize(function() {
                s(),
                c(),
                g()
            }),
            $(".bottomButton").addClass("winApp"),
            $(document).ready(function() {
                e.ready();
                var a = t.isUWP() ? "appDisplayName" : "/app_resources/appDisplayName"
                  , i = Windows.ApplicationModel.Package.current
                  , o = WinJS.Resources.getString(a).value
                  , n = i.id.version;
                $("#appNameWin").text(WinJS.Resources.getString(a).value + " " + n.major + "." + n.minor + "." + n.build),
                $("#appNameWin").css("font-weight", "Bold"),
                "en" == e.gameSettings.language && o.toLowerCase().indexOf(e.data.projectType) < 0 && h("Check projectType"),
                $("#privacyPolicyLinkWin").attr("href", "http://www.treecardgames.com/privacy/" + e.gameSettings.language + "/app_win.htm"),
                $(".rateReviewLinkWin").attr("href", "ms-windows-store:REVIEW?PFN=" + Windows.ApplicationModel.Package.current.id.familyName),
                $(".RemoveAdsButton").on("click", p),
                $("#imgLogoAboutWin").attr("src", "solitaire/solitaire.png"),
                $("#moreFreeGamesWin-but").attr("href", "ms-windows-store://publisher/?name=TreeCardGames")
            }),
            g(),
            s(),
            $("#toggle-fullscreen").on("click", a)
        }
        ,
        Windows.UI.WebUI.WebUIApplication.onsuspending = function(t) {
            var a = t.suspendingOperation.getDeferral();
            e.game.save(),
            a.complete()
        }
        ,
        WinJS.Binding.optimizeBindingReferences = !0;
        var r = Windows.ApplicationModel.Activation;
        n.onactivated = function(t) {
            if (t.detail.kind === r.ActivationKind.launch) {
                t.detail.previousExecutionState,
                r.ApplicationExecutionState.terminated,
                t.setPromise(WinJS.UI.processAll());
                var a;
                try {
                    a = e.gameSettings.language
                } catch (e) {}
                e.localisation.load(a),
                e.ui.loadAppearanceOptions(),
                e.ui.loadGames($("#group-games")),
                "en" != a && ($("#new-game-but").css("background-image", "url(/www/solitaire/css/icon_buttons/win_app/icon/new_game.png)"),
                $("#change-solitaire-but").css("background-image", "url(/www/solitaire/css/icon_buttons/win_app/icon/change_solitaire.png)"),
                $("#undo-but").css("background-image", "url(/www/solitaire/css/icon_buttons/win_app/icon/undo.png)"),
                $("#hint-but").css("background-image", "url(/www/solitaire/css/icon_buttons/win_app/icon/hint.png)"),
                $(".bottomButton.more-but").css("background-image", "url(/www/solitaire/css/icon_buttons/win_app/icon/more.png)"),
                $(".bottomButton.winApp").css("width", "84px"),
                $(".bottomButton.winApp").css("font", "Segoe UI"),
                $(".bottomButton.winApp").css("font-size", "15px"),
                $(".bottomButton.winApp").css("color", "rgba(255,255,255,0.9)"),
                $(".bottomButton.winApp").css("font-weight", "600"),
                $(".bottomButton.winApp").css("text-align", "center"),
                $(".bottomButton.winApp").css("padding", "50px 0px 0px 0px")),
                l()
            }
        }
        ,
        Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", function() {
            e.game.timer.start()
        }, !1),
        WinJS.Application.onsettings = function(t) {
            var a, i = e.localisation.getL;
            a = o.isFreeApp ? {
                removeAds: {
                    title: i("remove-ads"),
                    cmd: function() {
                        p()
                    }
                }
            } : {},
            t.detail.applicationcommands = {},
            WinJS.UI.SettingsFlyout.populateSettings(t);
            var n = Windows.UI.ApplicationSettings
              , r = t.detail.e.request.applicationCommands;
            for (var s in a) {
                var l = a[s]
                  , c = new n.SettingsCommand(s,l.title,l.cmd);
                r.append(c)
            }
        }
        ,
        WinJS.UI.Pages.define("/www/solitaire/html/win_app/more_games.html", {
            ready: function(e, t) {
                WinJS.Resources.processAll()
            }
        });
        var s = function() {
            var e = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().isFullScreenMode ? "full-screen-off" : "full-screen-on";
            $("#toggle-fullscreen").css("background-image", "url(/www/solitaire/css/icons/" + e + ".png)")
        }
          , l = function() {
            var e = Windows.UI.ViewManagement
              , t = e.UIViewSettings
              , a = e.UserInteractionMode
              , i = t.getForCurrentView().userInteractionMode == a.mouse ? "block" : "none";
            $("#toggle-fullscreen").css("display", i)
        }
          , c = function() {
            if (!Windows.UI.ViewManagement.ApplicationView.getForCurrentView().isFullScreenMode) {
                var e = Windows.UI.ViewManagement
                  , t = e.ApplicationViewWindowingMode;
                e.ApplicationView.preferredLaunchWindowingMode != t.auto && (e.ApplicationView.preferredLaunchWindowingMode = t.auto)
            }
        }
          , d = function() {
            (i = Windows.ApplicationModel.Store.CurrentApp).licenseInformation.addEventListener("licensechanged", u()),
            u()
        }
          , u = function() {
            i.licenseInformation.productLicenses.lookup("RemoveAds").isActive ? (o.isFreeApp = !1,
            e.ad.positionAd(window.innerHeight < window.innerWidth),
            e.game.scheduleUpdateDisplay(100)) : o.isFreeApp = !0
        }
          , p = function() {
            var e = i.licenseInformation;
            e.productLicenses.lookup("RemoveAds").isActive ? h("You already own Product.") : i.requestProductPurchaseAsync("RemoveAds", !1).done(function() {
                e.productLicenses.lookup("RemoveAds").isActive && (u(),
                h("Thank you for your purchase."))
            }, function() {})
        }
          , h = function(e) {
            new Windows.UI.Popups.MessageDialog(e).showAsync()
        }
          , g = function() {
            var t = ""
              , a = ""
              , i = ""
              , o = ""
              , n = ""
              , r = ""
              , s = ""
              , l = !1;
            document.documentElement.offsetWidth <= 700 ? (t = "none",
            a = "none",
            i = "none",
            o = "0",
            n = "100%") : document.documentElement.offsetWidth <= 750 ? t = "none" : document.documentElement.offsetHeight <= 600 ? (t = "none",
            o = "0",
            n = "100%") : (window.innerHeight < window.innerWidth && window.innerHeight < 780 && (r = "170px",
            s = "170px"),
            l = !0),
            $("#winAdContainer").css("display", t),
            $(".bottomButton").css("display", a),
            $("#topBar").css("display", i),
            $("#playArea").css("left", o).css("height", n),
            $("#gameName").css("margin-left", r),
            $(".bottomBar").css("margin-left", s),
            l && e.ad.positionAd(window.innerHeight < window.innerWidth)
        };
        n.start(),
        window.alert = function(t) {
            e.ui.gameAlert("Alert", t)
        }
        ,
        o.isDebugging && "windows" == o.isApp && (WinJS.Application.onerror = function(e) {
            return !0
        }
        )
    }
    ,
    function() {
        function t() {
            this.gameWonCount = 0,
            this.sessionStartTime = (new Date).getTime(),
            this.lastTimeAdDisplayed = null,
            this.$adContainer = o(),
            this.adRequested = !1,
            this.adsManager = null,
            this.adDisplayContainer = new google.ima.AdDisplayContainer(this.$adContainer[0]),
            this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer),
            s.on("game:won", this.onGameWon.bind(this)),
            s.on("winAnimation:end", this.onAnimationEnd.bind(this)),
            this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, i.bind(this), !1),
            this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, a.bind(this), !1),
            $(document).on("click.adsense", this.onClick.bind(this))
        }
        function a(e) {
            this.adsManager && (this.adsManager.destroy(),
            this.adsManager = null),
            this.adAlreadyShown || this.tryAgainIn(4e3),
            s.trigger("interstitial:hidden")
        }
        function i(e) {
            this.adRequested = !1;
            var t = new google.ima.AdsRenderingSettings;
            t.restoreCustomPlaybackStateOnAdBreakComplete = !0,
            t.enablePreloading = !0,
            this.adsManager = e.getAdsManager(document.body, t),
            this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, a.bind(this)),
            this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, r.bind(this)),
            this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, n.bind(this)),
            this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, function() {
                this.adRequested = !1
            }
            .bind(this))
        }
        function o() {
            return $('<div id="adContainer">').css({
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                display: "none",
                position: "absolute",
                zIndex: 1e5
            }).appendTo("body")
        }
        function n() {
            this.gameWonCount = 0,
            this.lastTimeAdDisplayed = (new Date).getTime(),
            this.adAlreadyShown = !1,
            this.adsManager = null,
            this.adRequested = !1,
            this.$adContainer.hide(),
            s.trigger("interstitial:hidden")
        }
        function r() {
            this.adAlreadyShown = !0
        }
        var s = $(window)
          , l = e.data.AdSenseForGames || {};
        t.prototype = {
            onClick: function() {
                this.adRequested || this.adsManager || this.requestAd()
            },
            tryAgainIn: function(e) {
                setTimeout(function() {
                    this.adRequested = !1
                }
                .bind(this), e)
            },
            onGameWon: function() {
                this.gameWonCount++
            },
            onAnimationEnd: function() {
                this.shouldDisplayAd() ? this.showAd() : s.trigger("interstitial:hidden")
            },
            shouldDisplayAd: function() {
                if (this.adAlreadyShown)
                    return !1;
                var e = 1
                  , t = this.sessionStartTime;
                null !== this.lastTimeAdDisplayed && (t = this.lastTimeAdDisplayed);
                var a = (new Date).getTime();
                return Math.round((a - t) / 1e3) > 1800 && (e = 0),
                !(this.gameWonCount <= e) && (!!l.debug || Math.random() > .5)
            },
            showAd: function() {
                try {
                    this.$adContainer.show();
                    var e = window.innerWidth
                      , t = window.innerHeight;
                    this.adsManager.init(e, t, google.ima.ViewMode.FULLSCREEN),
                    this.adsManager.start()
                } catch (e) {
                    this.$adContainer.hide(),
                    a.call(this, e)
                }
            },
            requestAd: function() {
                if (!this.adRequested) {
                    this.adDisplayContainer.initialize();
                    var e = new google.ima.AdsRequest
                      , t = window.innerWidth
                      , a = window.innerHeight;
                    e.adTagUrl = this.adCode,
                    e.forceNonLinearFullSlot = !0,
                    e.linearAdSlotWidth = t,
                    e.linearAdSlotHeight = a,
                    e.nonLinearAdSlotWidth = t,
                    e.nonLinearAdSlotHeight = a,
                    this.adsLoader.requestAds(e),
                    this.adRequested = !0
                }
            }
        },
        $(function() {
            l.adCode && window.google && (e.interstitial = new t,
            e.interstitial.adCode = l.adCode)
        })
    }(),
    function() {
        "use strict";
        var a = e.config
          , i = e.resources
          , o = e.game
          , n = e.display
          , r = e.containers.Card = function(e) {
            this.objid = e,
            this.flipping = !1,
            this.moving = !1,
            this.movingTimer = 0,
            this.highlighted = !1,
            this.hasShadow = !1,
            this.hovereffect = !1,
            this.ind = -1,
            this.ownedBy = null,
            this.inHint = null,
            this.pos = {},
            this.type = Math.floor(e % 52 / 13),
            this.num = e % 52 - 13 * this.type + 1,
            this.dom = document.createElement("div"),
            this.dom.className = "card",
            this.dom.unselectable = !0,
            this.dom.onselectstart = function() {
                return !1
            }
            ,
            this.dom.style.position = "absolute",
            this.dom.style.top = 0,
            this.dom.style.left = 0,
            this.jdom = $(this.dom),
            this.front = i.getCardImage(this.type, this.num),
            this.front.className = "cardFront",
            this.front.style.position = "absolute",
            this.front.style.display = "block",
            this.front.draggable = !1,
            this.front.ondragstart = function() {
                return !1
            }
            ,
            this.dom.appendChild(this.front),
            this.back = i.getCardBackImage(),
            this.back.className = "cardBack",
            this.back.style.position = "absolute",
            this.back.style.display = "block",
            this.back.draggable = !1,
            this.back.ondragstart = function() {
                return !1
            }
            ,
            this.dom.appendChild(this.back),
            $(this.front).add(this.back).css({
                scaleX: 1,
                scaleY: 1
            }),
            this.flipped = !0;
            var t = this;
            this.jdom.on(a.event_touchstart, function(e) {
                if (!(e = e.originalEvent).changedTouches && !e.isPrimary)
                    return !1;
                if (e.button)
                    return !1;
                var a = e.changedTouches ? e.changedTouches[0] : e;
                return o.initialiseDrag(t, {
                    x: a.clientX,
                    y: a.clientY
                }, !0),
                !1
            }).on("ondblclick", function(e) {
                e.preventDefault(),
                o.requestAutomove(t)
            }).on("mousedown", function(e) {
                3 !== e.which && (e.preventDefault(),
                o.initialiseDrag(t, {
                    x: e.clientX,
                    y: e.clientY
                }))
            }).on("contextmenu", function(e) {
                e.preventDefault(),
                o.requestAutomove(t)
            }),
            this.setHoverEffect(!0),
            this.flipTimer = 0,
            this.hoverred = !1
        }
        ;
        r.speed = a.animationSpeed,
        r.prototype.setHoverred = function(e) {
            this.hovered = e,
            e ? this.moving || this.flipping || !o.hoverable(this) || (this.jdom.css({
                "box-shadow": n.hoverShadow
            }),
            this.inHint && (this.inHint.style.display = "none")) : (this.highlighted ? this.jdom.css({
                "box-shadow": n.highlightShadow,
                ieBoxShadow: n.highlightShadow
            }) : this.jdom.css({
                "box-shadow": ""
            }),
            this.inHint && (this.inHint.style.display = ""))
        }
        ,
        r.prototype.setHoverEffect = function(e) {
            if (this.hovereffect !== e)
                if (this.hovereffect = e,
                e && !a.isiOS) {
                    var t = this;
                    this.jdom.hover(function() {
                        t.setHoverred(!0)
                    }, function() {
                        t.setHoverred(!1)
                    })
                } else
                    this.jdom.off("hover")
        }
        ,
        r.prototype.setShadow = function(e) {
            this.hasShadow = e,
            this.animating || this.updateShadow()
        }
        ,
        r.prototype.updateShadow = function() {
            var e = $(this.back).add(this.front);
            this.hasShadow ? e.css({
                boxShadow: n.cardStaticShadow
            }) : e.css({
                boxShadow: ""
            })
        }
        ,
        r.prototype.setHighlight = function(e) {
            var t = {};
            e ? (t = {
                "box-shadow": n.highlightShadow,
                ieBoxShadow: n.highlightShadow
            },
            this.highlighted = !0) : (this.highlighted = !1,
            t = {
                "box-shadow": "",
                ieBoxShadow: ""
            }),
            $.fn.transition == $.fn.animate ? this.jdom.css(t) : this.jdom.transition(t)
        }
        ,
        r.prototype.flip = function(e, t, i) {
            if (this.flipped !== e || i) {
                this.flipped = e,
                this.ownedBy && this.ownedBy.postFlip(this),
                this.flipping = !0;
                var n = $(".wrap-shadow")[0];
                t = t ? Math.floor(t / 2) : this.animating ? a.animation_time / 4 : a.flipTime / 2;
                var r, s;
                e ? (r = $(this.back),
                s = $(this.front)) : (r = $(this.front),
                s = $(this.back)),
                this.jdom.css("box-shadow", ""),
                s.transition({
                    scaleX: 0,
                    scaleY: o.getFlipScale()
                }, t),
                r.css({
                    scaleX: 0,
                    scaleY: o.getFlipScale()
                }),
                clearTimeout(this.flipTimer),
                this.flipTimer = setTimeout(function() {
                    r.transition({
                        scaleX: 1,
                        scaleY: 1
                    }, t, function() {
                        this.flipping = !1,
                        this.setHoverred(this.hoverred),
                        $.browser.mozilla && (n.style.visibility = "hidden",
                        setTimeout(function() {
                            n.style.visibility = ""
                        }, 50))
                    }
                    .bind(this))
                }
                .bind(this), t + 10)
            }
        }
        ,
        r.prototype.directFlip = function(e) {
            if (this.flipped !== e) {
                this.flipped = e,
                this.ownedBy && this.ownedBy.postFlip(this);
                var t, a;
                clearTimeout(this.flipTimer),
                e ? (t = $(this.back),
                a = $(this.front)) : (t = $(this.front),
                a = $(this.back)),
                t.css({
                    webkitTransition: ""
                }),
                t.css({
                    webkitTransition: ""
                }),
                setTimeout(function() {
                    a.css({
                        display: "block",
                        scaleX: 0,
                        scaleY: o.getFlipScale()
                    }),
                    t.css({
                        display: "block",
                        scaleX: 1,
                        scaleY: 1
                    })
                }, 0)
            }
        }
        ,
        r.prototype.parabol = function() {
            this.front.style[t.prefix + "Transform"] = "",
            setTimeout(function() {
                var e = this.time / 4
                  , a = this.time - e
                  , i = Math.floor(1.3 * this.dy)
                  , o = this.dx < 0 ? -1 : 1;
                this.front.style[t.prefix + "Transition"] = e + "ms cubic-bezier(0.000, 0.300, 0.700, 1.000)",
                this.front.style[t.prefix + "Transform"] = "translateY(-" + i + "px) rotate(" + 180 * o + "deg)",
                setTimeout(function() {
                    this.front.style[t.prefix + "Transition"] = a + "ms cubic-bezier(0.100, 0.000, 0.70, 1.200)",
                    this.front.style[t.prefix + "Transform"] = "translateY(0px) rotate(" + 360 * o + "deg)",
                    setTimeout(function() {
                        this.front.style[t.prefix + "Transition"] = "",
                        this.front.style[t.prefix + "Transform"] = ""
                    }
                    .bind(this), a + 10)
                }
                .bind(this), e)
            }
            .bind(this), 10)
        }
        ,
        r.prototype.adjustPos = function(e, t) {
            if (this.ownedBy) {
                var i = this.pos = this.ownedBy.getPosForChild(this.ind)
                  , o = this.domPos.x
                  , n = this.domPos.y;
                if (o !== i.x >> 0 || n !== i.y >> 0 || this.moving || this.animating) {
                    void 0 !== e || this.animating ? this.animating ? this.time = a.animation_time : this.time = e : this.time = ~~Math.max(a.minimum_moving_time, 1e3 * Math.sqrt(Math.pow(i.y - n, 2) + Math.pow(i.x - o, 2)) / r.speed),
                    this.dy = i.y - n,
                    this.dx = i.x - o,
                    void 0 === t && (t = this.animating ? 0 : 100),
                    clearTimeout(this.movingTimer),
                    this.moving = !0;
                    var s = this;
                    this.movingTimer = setTimeout(function() {
                        s.moving = !1,
                        s.setHoverred(s.hoverred)
                    }, this.time),
                    this.animating,
                    this.move(i.x >> 0, i.y >> 0, i.z + t, this.time, $.cssEase[a.easingFunc], t)
                } else
                    this.jdom.css("zIndex", i.z)
            }
        }
        ,
        r.prototype.move = function(e, i, n, r, s, l) {
            this.domPos = {
                x: e,
                y: i,
                z: n
            },
            o.moveWithAnimate ? (this.dom.style.zIndex = n,
            this.dom.style[t.prefix + "Transition"] = "",
            this.jdom.stop(),
            r ? this.jdom.animate({
                x: e,
                y: i
            }, {
                duration: r,
                queue: !1
            }) : this.jdom.css({
                y: i,
                x: e
            })) : (this.jdom.stop(!0).css("zIndex", n + l),
            r ? this.jdom.transition({
                y: i >> 0,
                x: e >> 0,
                delay: 10
            }, this.time, a.easingFunc) : this.jdom.css({
                y: i >> 0,
                x: e >> 0
            }))
        }
    }(),
    function() {
        "use strict";
        var t = e.display
          , a = e.containers.Container = function(e, t) {
            this.cards = [],
            this.objid = e,
            this.offsetTop = 0,
            this.offsetLeft = 0,
            t ? (this.dom = t,
            this.dom.style.position = "absolute",
            this.dom.ondragstart = function() {
                return !1
            }
            ) : this.dom = null,
            this.highlighted = !1
        }
        ;
        a.prototype.ini = function() {
            this.cards.length = 0
        }
        ,
        a.prototype.maxCardOut = function() {
            return this.cards.length ? 1 : 0
        }
        ,
        a.prototype.shouldFlipLast = function() {
            return !1
        }
        ,
        a.prototype.flipUpdate = function() {}
        ,
        a.prototype.maxCardIn = function() {
            return 1
        }
        ,
        a.prototype.postFlip = function() {}
        ,
        a.prototype.toRect = function() {
            return {
                left: this.offsetLeft,
                right: this.offsetLeft + t.cwidth,
                top: this.offsetTop,
                bottom: this.offsetTop + t.cheight
            }
        }
        ,
        a.prototype.ini = function() {
            this.cards.length = 0
        }
        ,
        a.prototype.accept = function() {
            return !1
        }
        ,
        a.prototype.lastCard = function() {
            return this.cards.length > 0 ? this.cards[this.cards.length - 1] : null
        }
        ,
        a.prototype.getCards = function(e) {
            return this.cards.slice(this.cards.length - e, this.cards.length)
        }
        ,
        a.prototype.popCard = function() {
            this.cards.pop().ownedBy = null
        }
        ,
        a.prototype.getPosForChild = function(e) {
            return {
                x: this.offsetLeft,
                y: this.offsetTop,
                z: e + this.zAdd
            }
        }
        ,
        a.prototype.setPos = function(e, t) {
            this.offsetLeft = e,
            this.offsetTop = t
        }
        ,
        a.prototype.adjustPos = function(e) {
            this.dom && $(this.dom).css({
                y: this.offsetTop,
                x: this.offsetLeft
            });
            var t = 0;
            return this.pauseAnimateCard || (this.cards.forEach(function(a) {
                a.adjustPos(e),
                t = Math.max(t, a.time)
            }),
            this.adjustZ(t + 1)),
            t
        }
        ,
        a.prototype.adjustZ = function(e) {
            setTimeout(function() {
                this.cards.forEach(function(e) {
                    e.moving || e.jdom.stop(!0).css("zIndex", e.pos.z)
                })
            }
            .bind(this), e)
        }
        ,
        a.prototype.setHighlight = function(e) {
            e ? this.cards.length ? this.lastCard().setHighlight(!0) : (this.dom && $(this.dom).transition({
                "box-shadow": t.highlightShadow,
                ieBoxShadow: t.highlightShadow
            }, 200),
            this.highlighted = !0) : this.cards.length ? this.lastCard().setHighlight(!1) : (this.dom && $(this.dom).transition({
                "box-shadow": "",
                ieBoxShadow: ""
            }, 200),
            this.highlighted = !1)
        }
    }(),
    function() {
        "use strict";
        e.display,
        e.game;
        var t = e.containers.Foundation = function(t) {
            var a = e.resources.getFoundationImage();
            a.className = "foundation",
            e.containers.Container.call(this, t, a),
            this.zAdd = 7
        }
          , a = "normal";
        t.setMode = function(e) {
            a = e
        }
        ,
        t.prototype = Object.create(e.containers.Container.prototype),
        t.prototype.accept = function(e) {
            if ("noManual" === a)
                return !1;
            if (e instanceof Array) {
                if (e.length > 1)
                    return !1;
                e = e[0]
            }
            return "onlyKing" === a ? 13 === e.num : this.cards.length ? e.type === this.lastCard().type && e.num - this.lastCard().num == 1 : 1 === e.num
        }
        ,
        t.prototype.takeIn = function(e) {
            e instanceof Array || (e = [e]),
            this.lastCard() && this.lastCard().setShadow(!1),
            e.forEach(function(e) {
                e.ownedBy = this,
                e.setShadow(!1),
                e.ind = this.cards.length,
                this.cards.push(e)
            }
            .bind(this)),
            this.lastCard().setShadow(!0)
        }
        ,
        t.prototype.maxCardOut = function() {
            return "normal" === a ? 1 : 0
        }
        ,
        t.prototype.popCard = function() {
            e.containers.Container.prototype.popCard.call(this),
            this.lastCard() && this.lastCard().setShadow(!0)
        }
    }(),
    function() {
        "use strict";
        var t, a, i, o, n = e.display, r = e.game, s = e.containers.Container.prototype, l = e.containers.Tableau = function(t) {
            var a = e.resources.getTableauImage();
            a.className = "tableau-holder",
            e.containers.Container.call(this, t, a),
            this._maxcard = 0,
            this.cardSep = e.display.cardSep,
            this.fcardcount = 0,
            this.offsetLeft = 0,
            this.offsetTop = 0,
            this.zAdd = 7,
            this.highlightLen = 0
        }
        ;
        l.setMovableCards = function(e) {
            a = e,
            t = {
                single: function() {
                    return !1
                },
                any: function() {
                    return !0
                },
                sequence_any: function(e, t) {
                    return !e.flipped && !t.flipped && e.num - t.num == 1
                },
                sequence_same_suit: function(e, t) {
                    return !e.flipped && !t.flipped && e.num - t.num == 1 && e.type === t.type
                },
                sequence_diff_color: function(e, t) {
                    return !e.flipped && !t.flipped && e.num - t.num == 1 && (e.type - t.type + 4) % 2 == 1
                }
            }[e]
        }
        ,
        l.getMovableCards = function() {
            return a
        }
        ,
        l.setSpaceAccept = function(e) {
            i = e
        }
        ,
        l.setWithCardAccept = function(e) {
            o = e
        }
        ,
        l.prototype = Object.create(s),
        l.prototype.maxCardOut = function() {
            return this._maxcard
        }
        ,
        l.prototype.maxCardIn = function() {
            return 1 / 0
        }
        ,
        l.prototype.ini = function() {
            this.cards.length = 0,
            this.cardSep = n.cardSep,
            this.fcardcount = 0,
            this._maxcard = 0,
            s.ini.call(this)
        }
        ,
        l.prototype.toRect = function() {
            return {
                left: this.offsetLeft,
                top: this.offsetTop,
                right: this.offsetLeft + n.cwidth,
                bottom: 1 / 0
            }
        }
        ,
        l.prototype.takeIn = function(e) {
            e instanceof Array || (e = [e]),
            e.forEach(function(e) {
                e.ownedBy = this,
                e.ind = this.cards.length,
                this.cards.push(e),
                e.setShadow(!0)
            }
            .bind(this)),
            this.computeMaxCardOut()
        }
        ,
        l.prototype.computeMaxCardOut = function() {
            0 === this.cards.length && (this._maxcard = 0);
            for (var e = this.cards.length - 1; e > 0 && t(this.cards[e - 1], this.cards[e]); )
                e--;
            this._maxcard = this.cards.length - e
        }
        ,
        l.prototype.adjustSep = function() {
            var e = 0;
            for (this.fcardcount = 0; e < this.cards.length && this.cards[e].flipped; )
                this.fcardcount++,
                e++;
            var t = this.cardSep;
            return this.cardSep = Math.floor((n.playAreaHeight - this.offsetTop - 1.2 * n.cheight) / (this.cards.length - 1 - this.fcardcount + this.fcardcount / 2)),
            this.cardSep > n.cardSep && (this.cardSep = n.cardSep),
            t !== this.cardSep
        }
        ,
        l.prototype.popCard = function() {
            this.lastCard().flipped && this.fcardcount--,
            this.cards.pop().ownedBy = null,
            this.computeMaxCardOut()
        }
        ,
        l.prototype.shouldFlipLast = function() {
            return !0
        }
        ,
        l.prototype.flipUpdate = function() {
            this.computeMaxCardOut(),
            this.adjustSep() && this.cards.forEach(function(e) {
                e.adjustPos(!1, 0)
            })
        }
        ,
        l.prototype.accept = function(e) {
            return e instanceof Array || (e = [e]),
            0 !== e.length && (this !== e[0].ownedBy && (this.cards.length ? "groupable" === o ? t(this.cards[this.cards.length - 1], e[0]) : "sequence" === o ? this.cards[this.cards.length - 1].num - e[0].num == 1 : "any" === o || "suit" === o && (this.cards[this.cards.length - 1].num - e[0].num == 1 && this.lastCard().type === e[0].type) : !(r.getMaxmove(this) < e.length) && ("king" === i ? 13 === e[0].num : "any" === i)))
        }
        ,
        l.prototype.adjustPos = function(e) {
            return this.cardSep = n.cardSep,
            this.adjustSep(),
            s.adjustPos.call(this, e)
        }
        ,
        l.prototype.getPosForChild = function(e) {
            var t;
            return t = e < this.fcardcount ? e * this.cardSep / 2 : this.fcardcount * this.cardSep / 2 + (e - this.fcardcount) * this.cardSep,
            {
                x: this.offsetLeft,
                y: t + this.offsetTop,
                z: e + this.zAdd
            }
        }
        ,
        l.prototype.setHighlight = function(e, t) {
            e && (1 === t || !t) || 1 === this.highlightLen && !e ? (this.highlightLen = 1,
            s.setHighlight.call(this, e)) : e ? (this.highlightLen = t,
            r.requestLongHint(this.cards[this.cards.length - t], this.lastCard())) : (this.highlightLen = 0,
            r.removeLongHint(this.cards[this.cards.length - t], this.lastCard()))
        }
    }(),
    function() {
        "use strict";
        var t = e.display
          , a = e.game
          , i = e.resources
          , o = e.containers.Container.prototype
          , n = e.containers.Stock = function(a) {
            var o = document.createElement("div");
            o.className = "waste-holder",
            this.stopImage = $(i.getStopSpotImage()),
            this.redealImage = $(i.getRedealImage()),
            this.stopImage.add(this.redealImage).css({
                position: "absolute",
                "z-index": 1,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            });
            var n;
            if (n = e.config.isiOS ? "touchend" : "click",
            $(o).append(this.stopImage).on(n, function() {
                this.redeal()
            }
            .bind(this)),
            e.containers.Container.call(this, a, o),
            this.offsetLeft = 0,
            this.offsetTop = 0,
            this.zAdd = 7,
            this.disabled = !0,
            this._redealCount = 1 / 0,
            !e.config.isiOS) {
                var r = $(o);
                r.hover(function() {
                    this.cards.length || this.disabled || r.css({
                        "box-shadow": t.hoverShadow
                    })
                }
                .bind(this), function() {
                    this.highlighted ? r.css({
                        "box-shadow": t.highlightShadow,
                        ieBoxShadow: t.highlightShadow
                    }) : r.css({
                        "box-shadow": ""
                    })
                }
                .bind(this))
            }
            this.target = null,
            this.ejectCards = 1,
            this.type = "normal",
            this.layoutOptions = {},
            this.lastCardUp = !1
        }
          , r = null;
        n.setEmptyCheck = function(e) {
            r = e
        }
        ,
        n.prototype = Object.create(o),
        n.prototype.setLayout = function(e, t) {
            this.type = e,
            this.layoutOptions = t
        }
        ,
        n.prototype.shouldFlipLast = function() {
            return this.lastCardUp
        }
        ,
        n.prototype.getPosForChild = function(t) {
            return "normal" == this.type ? {
                x: this.offsetLeft - Math.floor(t / e.config.offsetStockDiv),
                y: this.offsetTop - Math.floor(t / e.config.offsetStockDiv),
                z: t + this.zAdd
            } : "piles" == this.type ? {
                x: this.offsetLeft + this.layoutOptions.margin * Math.floor(t / this.layoutOptions.numPerPile),
                y: this.offsetTop,
                z: t + this.zAdd
            } : void 0
        }
        ,
        n.prototype.disable = function() {
            this.disabled || (this.redealImage.remove(),
            $(this.dom).append(this.stopImage),
            this.disabled = !0)
        }
        ,
        n.prototype.redealable = function() {
            return 0 === this.cards.length && !this.disabled && 0 !== this.target.cards.length
        }
        ,
        n.prototype.enable = function() {
            this.disabled && (this.stopImage.remove(),
            $(this.dom).append(this.redealImage),
            this.disabled = !1)
        }
        ,
        n.prototype.redeal = function() {
            return !(this.disabled || this.cards.length > 0 || this.target instanceof Array || 0 === this.target.cards.length) && (!!a.requestTakeOver(this, this.target, !0) && (this.setRedealCount(this._redealCount - 1),
            $(this.dom).trigger("mouseout"),
            !0))
        }
        ,
        n.prototype.takeIn = function(e) {
            e instanceof Array || (e = [e]),
            e.forEach(function(e) {
                e.ownedBy = this,
                e.ind = this.cards.length,
                "normal" == this.type ? e.setShadow(!1) : "piles" == this.type && e.setShadow(e.ind % this.layoutOptions.numPerPile == 0),
                this.cards.push(e)
            }
            .bind(this))
        }
        ,
        n.prototype.setRedealCount = function(e) {
            this._redealCount = e,
            e > 0 ? this.enable() : this.disable()
        }
        ,
        n.prototype.targetChanged = function() {
            this.target instanceof Array || (0 === this.target.cards.length ? this.disable() : this._redealCount > 0 && this.enable())
        }
        ,
        n.prototype.increRedealCount = function() {
            this.setRedealCount(this._redealCount + 1)
        }
        ,
        n.prototype.decreRedealCount = function() {
            this.setRedealCount(this._redealCount - 1)
        }
        ,
        n.prototype.eject = function() {
            if (this.target instanceof Array) {
                if (r && this.target.some(function(e) {
                    return 0 === e.cards.length
                }))
                    return r(),
                    0;
                for (var e = [], t = 0; t < this.target.length && t < this.cards.length; t++)
                    e.push(this.target[t]);
                return a.performMove(this.getCards(e.length).reverse().map(function(e) {
                    return [e]
                }), e, void 0, {
                    flipCards: !this.lastCardUp
                })
            }
            return a.performMove(this.getCards(Math.min(this.cards.length, this.ejectCards)), this.target, void 0, {
                flipCards: !this.lastCardUp,
                reversed: !0
            })
        }
    }(),
    function() {
        "use strict";
        var t = {
            tableaus: [],
            reserves: [],
            foundations: [],
            stocks: [],
            wastes: [],
            cards: [],
            cardHolders: []
        }
          , a = function(e, t, a, i, o) {
            var n;
            if (e) {
                if (o.length < e.length)
                    for (n = o.length; n < e.length; n++)
                        o.push(new t(n));
                for (n = 0; n < e.length; n++)
                    o[n].dom && i.appendChild(o[n].dom),
                    a.push(o[n]);
                return o.slice(0, e.length)
            }
            return null
        }
          , i = function(t, a, i) {
            var o;
            if (i.length < t)
                for (o = i.length; o < t; o++)
                    i.push(new e.containers.Card(o));
            for (o = 0; o < t; o++)
                a.appendChild(i[o].dom),
                i[o].move(-2e3, -2e3, 0, 0, "");
            return i.slice(0, t)
        }
          , o = function(e, t, a, i) {
            t && t.forEach(function(t, o) {
                for (var n = 0; n < t; n++) {
                    var r = Math.floor(Math.random() * e.length);
                    a[o].takeIn(i[e[r]]),
                    r + 1 < e.length ? e[r] = e.pop() : e.pop()
                }
            })
        }
          , n = e.cardData
          , r = 4
          , s = e.GameBase = function() {
            this.containers = [],
            this.frag = document.createDocumentFragment(),
            this.reserves = a(this.config.reserves, e.containers.Reserve, this.containers, this.frag, t.reserves),
            this.foundations = a(this.config.foundations, e.containers.Foundation, this.containers, this.frag, t.foundations),
            this.stocks = a(this.config.stocks, e.containers.Stock, this.containers, this.frag, t.stocks),
            this.wastes = a(this.config.wastes, e.containers.Waste, this.containers, this.frag, t.wastes),
            this.tableaus = a(this.config.tableaus, e.containers.Tableau, this.containers, this.frag, t.tableaus),
            this.cardHolders = a(this.config.cardHolders, e.containers.CardHolder, this.containers, this.frag, t.cardHolders),
            this.cards = i(this.config.cards, this.frag, t.cards),
            this.initx = 0,
            this.inity = 0,
            this.maxMove = 1 / 0,
            this.config.suits ? this.setSuits(this.config.suits) : this.setSuits(4),
            e.gameSettings.autoplayMode = "enabled",
            this.autoMoveFollowHint = !0
        }
        ;
        s.prototype.flipScale = e.config.flipScale,
        s.prototype.setSuits = function(t) {
            if (r !== t) {
                r = t,
                e.resources.changeCardImagesToSuits(t);
                var a = 13 * t;
                this.cards.forEach(function(e) {
                    e.type = Math.floor(e.objid % a / 13)
                })
            }
        }
        ,
        s.prototype.setUpCardData = function(e) {
            n.setName(e)
        }
        ,
        s.prototype.moveOccurred = function(t, a, i) {
            t instanceof e.containers.Foundation && (n.gameScore -= 5 * i),
            a instanceof e.containers.Foundation && (n.gameScore += 5 * i),
            this.updateState()
        }
        ,
        s.prototype.updateState = function() {}
        ,
        s.prototype.undoTakeOver = function(t, a) {
            a instanceof e.containers.Stock && t === a.target ? a.increRedealCount() : t instanceof e.containers.Stock && a === t.target && t.decreRedealCount()
        }
        ,
        s.prototype.hoverable = function(e) {
            return this.movable(e)
        }
        ,
        s.prototype.getMaxmove = function(e) {
            return 1 / 0
        }
        ,
        s.prototype.movable = function(e) {
            return !e.flipped && e.ownedBy && e.ownedBy.cards.length - e.ind <= e.ownedBy.maxCardOut() && e.ownedBy.cards.length - e.ind <= this.maxMove
        }
        ,
        s.prototype.cardClicked = function(t) {
            return e.containers.Stock && t.ownedBy instanceof e.containers.Stock && t == t.ownedBy.lastCard() ? t.ownedBy.eject() : 0
        }
        ,
        s.prototype.requestAutomove = function(e, t) {
            if (this.autoMoveFollowHint && t && t.from && t.to && t.from === e.ownedBy && e.ind === t.from.cards.length - t.length)
                return t.to;
            var a = e.ownedBy.getCards(e.ownedBy.cards.length - e.ind);
            return this.getAutomoveDes(a)
        }
        ,
        s.prototype.getAutomoveDesFor = function(e, t) {
            for (var a = 0; a < t.length; a++)
                if (this.testAccept(e, t[a]))
                    return t[a]
        }
        ,
        s.prototype.getAutomoveDes = function(e) {
            for (var t = 0; t < this.automovePrefs.length; t++) {
                var a = this.getAutomoveDesFor(e, this.automovePrefs[t]);
                if (a)
                    return a
            }
            return null
        }
        ,
        s.prototype.adjustLayout = function(t, a) {
            var i = e.config.totalL
              , o = e.config.cL
              , n = (e.config.isMobilePhone,
            1)
              , r = t / (i * this.columns + 1) * i
              , s = Math.min(146, Math.floor(r / i * o))
              , l = Math.min(198, Math.floor(a / this.rows / n));
            l < s / 146 * 198 ? s = Math.floor(l / 198 * 146) : l = Math.floor(s / 146 * 198),
            r = Math.round(s / o * i);
            var c = Math.round(l / 8 * 10)
              , d = Math.min(s / i, Math.floor((r - s) / 2))
              , u = Math.floor((t - r * this.columns) / 2);
            return window.innerHeight < window.innerWidth && (u += e.game.marginsForDevices),
            {
                cwidth: s,
                cheight: l,
                top: c,
                margin: d,
                left: u,
                height: a,
                width: t
            }
        }
        ,
        s.prototype.performDeal = function(e) {
            if (this.config.flip instanceof Object)
                if ("last" === this.config.flip.type) {
                    var t = this.config.flip.num;
                    this.config.flip.containers.forEach(function(e) {
                        this[e].forEach(function(e) {
                            e.getCards(t).forEach(function(e) {
                                e.directFlip(!1)
                            })
                        })
                    }
                    .bind(this))
                } else if ("all" === this.config.flip.type)
                    this.config.flip.containers.forEach(function(e) {
                        this[e].forEach(function(e) {
                            e.cards.forEach(function(e) {
                                e.directFlip(!1)
                            })
                        })
                    }
                    .bind(this));
                else {
                    var a = this.config.flip.nums;
                    this.tableaus.forEach(function(e, t) {
                        e.getCards(a[t]).forEach(function(e) {
                            e.directFlip(!1)
                        })
                    })
                }
            this.containers.forEach(function(e) {
                e.adjustPos()
            }),
            setTimeout(function() {
                this.cards.forEach(function(e) {
                    e.animating = !1,
                    e.updateShadow()
                }),
                e && e()
            }
            .bind(this), 500)
        }
        ,
        s.prototype.animateDeal = function(t) {
            if (!this.tableaus || !this.tableaus.length)
                return this.performDeal(t);
            var a = {};
            if (this.config.flip instanceof Object)
                if ("last" === this.config.flip.type) {
                    var i = this.config.flip.num;
                    this.config.flip.containers.forEach(function(e) {
                        this[e].forEach(function(e) {
                            e.getCards(i).forEach(function(e) {
                                a[e.objid] = !0
                            })
                        })
                    }
                    .bind(this))
                } else if ("all" === this.config.flip.type)
                    this.config.flip.containers.forEach(function(e) {
                        this[e].forEach(function(e) {
                            e.cards.forEach(function(e) {
                                a[e.objid] = !0
                            })
                        })
                    }
                    .bind(this));
                else {
                    var o = this.config.flip.nums;
                    this.tableaus.forEach(function(e, t) {
                        e.getCards(o[t]).forEach(function(e) {
                            a[e.objid] = !0
                        })
                    })
                }
            else if ("all" === this.config.flip)
                for (var n = 0; n < this.cards.length; n++)
                    a[n] = !0;
            this.containers.forEach(function(t) {
                t instanceof e.containers.Tableau && (t.pauseAnimateCard = !0,
                t.cards.forEach(function(e) {
                    e.flipped = !a[e.objid]
                }),
                t.adjustPos(),
                t.cards.forEach(function(e) {
                    e.flipped = !0
                }))
            });
            var r = 0
              , s = 0
              , l = 0
              , c = !1;
            do {
                c = !1,
                this.tableaus.forEach(function(e) {
                    e.cards.length > l && (setTimeout(function(t) {
                        return function() {
                            var i = e.cards[t];
                            i && (a[i.objid] && i.directFlip(!1),
                            e.cards[t].adjustPos(void 0, 100 + 10 * s),
                            s++,
                            setTimeout(function(e) {
                                return function() {
                                    e.dom.style.zIndex = e.pos.z
                                }
                            }(e.cards[t]), e.cards[t].time))
                        }
                    }(l), r),
                    r += 50,
                    c = !0)
                }),
                l++
            } while (c);
            setTimeout(function() {
                this.containers.forEach(function(t) {
                    t instanceof e.containers.Tableau || (t.cards.forEach(function(e) {
                        a[e.objid] && e.directFlip(!1)
                    }),
                    t.adjustPos())
                }),
                this.tableaus.forEach(function(e) {
                    e.pauseAnimateCard = !1,
                    e.adjustZ(0)
                }),
                this.cards.forEach(function(e) {
                    e.animating = !1,
                    e.updateShadow()
                }),
                t && t()
            }
            .bind(this), r + e.config.animation_time)
        }
        ,
        s.prototype.init = function(t) {
            if (e.gameSettings.useCSS3 ? $(".card").transition({
                x: this.initx,
                y: this.inity,
                boxShadow: "none"
            }).find(".cardFront").css("boxShadow", "none") : $(".card").css({
                x: this.initx,
                y: this.inity,
                boxShadow: "none"
            }).find(".cardFront").css("boxShadow", "none"),
            this.containers.forEach(function(e) {
                e.ini()
            }),
            void 0 !== this.config.stockRedealCount && this.stocks) {
                var a = this.config.stockRedealCount;
                this.stocks.forEach(function(e) {
                    e.setRedealCount(a)
                })
            }
            var i = "all" !== this.config.flip;
            this.cards.forEach(function(e) {
                e.animating = !0,
                e.directFlip(i),
                e.setShadow(!1),
                e.updateShadow()
            });
            n = e.gameSettings.useCSS3 ? 700 : 0;
            if ("pyramid" == e.data.projectType)
                var n = 250;
            setTimeout(function() {
                for (var a = [], i = 0; i < this.config.cards; i++)
                    a.push(i);
                if (["tableaus", "foundations", "reserves", "stocks", "wastes", "cardHolders"].forEach(function(e) {
                    o(a, this.config[e], this[e], this.cards)
                }
                .bind(this)),
                a.length > 0)
                    throw "there are " + a.length + " unused cards!";
                e.gameSettings.useCSS3 ? this.performDeal(t) : this.animateDeal(t)
            }
            .bind(this), n)
        }
        ,
        s.prototype.getSelectiveAutoplayMove = function() {
            var t, a, i, o, n;
            this.foundations.reduce(function(e, t) {
                return Math.max(e, t.cards.length)
            }, 0);
            for (t = 0; t < this.containers.length; t++)
                if (!(this.containers[t]instanceof e.containers.Foundation || !(i = this.containers[t].lastCard()) || i.flipped || this.containers[t].maxCardOut() <= 0))
                    for (o = [],
                    "sequence_diff_color" === e.containers.Tableau.getMovableCards() && i.num > 2 && (o.push((i.objid + 12) % 52),
                    o.push((i.objid + 38) % 52),
                    104 == this.config.cards && (o.push((i.objid + 12) % 52 + 52),
                    o.push((i.objid + 38) % 52 + 52))),
                    this.foundations.forEach(function(e) {
                        e.cards.forEach(function(e) {
                            (n = o.indexOf(e.objid)) >= 0 && o.splice(n, 1)
                        })
                    }),
                    a = 0; a < this.foundations.length; a++)
                        if (this.testAccept(i, this.foundations[a]) && 0 == o.length)
                            return {
                                cards: [i],
                                destination: this.foundations[a]
                            }
        }
        ,
        s.prototype.getAutoFillMove = function() {
            if ("n" === e.gameSettings.autoplayMode || "disabled" === e.gameSettings.autoplayMode)
                return null;
            if ("s" === e.gameSettings.autoplayMode)
                return this.getSelectiveAutoplayMove();
            for (var t = 0; t < this.containers.length; t++)
                if (!(this.containers[t]instanceof e.containers.Foundation))
                    for (var a = 0; a < this.foundations.length; a++) {
                        var i = this.containers[t].lastCard();
                        if (i && !i.flipped && this.containers[t].maxCardOut() > 0 && i.num < 1 / 0 && this.foundations[a].accept(i))
                            return {
                                cards: [i],
                                destination: this.foundations[a]
                            }
                    }
            return null
        }
        ,
        s.prototype.testAccept = function(e, t) {
            return t.accept(e)
        }
        ,
        s.prototype.clear = function() {
            this.containers.forEach(function(e) {
                e.dom && e.dom.parentNode.removeChild(e.dom),
                e.ini()
            }),
            this.cards.forEach(function(e) {
                e.dom.parentNode.removeChild(e.dom)
            })
        }
        ,
        s.prototype.considerHints = function(e, t, a) {
            return !0
        }
        ,
        s.prototype.computeHints = function(e) {
            this.containers.forEach(function(t) {
                this.containers.forEach(function(a) {
                    if (t !== a && 0 !== t.cards.length && this.considerHints(t, a))
                        for (var i = Math.min(Math.min(t.maxCardOut(), a.maxCardIn()), this.getMaxmove(a)), o = 0; o < i; o++) {
                            var n = t.cards[t.cards.length - 1 - o];
                            this.movable(n) && this.testAccept([n], a) && this.considerHints(t, a, o + 1) && e.push({
                                from: t,
                                to: a,
                                length: o + 1
                            })
                        }
                }
                .bind(this))
            }
            .bind(this))
        }
        ,
        s.prototype.isWon = function() {
            return this.foundations.every(function(e) {
                return 13 === e.cards.length
            })
        }
        ,
        s.prototype.isLost = function(e) {
            return 0 === e.length
        }
        ,
        s.prototype.gameState = function() {
            var e = {
                containers: this.containers.map(function(e) {
                    return e.cards.map(function(e) {
                        return e.objid
                    })
                }),
                flipInfo: this.cards.map(function(e) {
                    return e.flipped
                })
            };
            return this.stocks && (e.stockRedeals = this.stocks.map(function(e) {
                return "" + e._redealCount
            })),
            e
        }
        ,
        s.prototype.loadGameState = function(t, a) {
            var i = t.containers
              , o = this.cards;
            this.cards.forEach(function(e, a) {
                e.directFlip(t.flipInfo[a])
            });
            var r = e.gameSettings.useCSS3 ? 100 : 0;
            setTimeout(function() {
                this.containers.forEach(function(t, a) {
                    t.ini(),
                    i[a].forEach(function(e) {
                        t.takeIn(o[e])
                    }),
                    t instanceof e.containers.Foundation && (n.gameScore += 5 * i[a].length),
                    t.pauseAnimateCard = !e.gameSettings.useCSS3,
                    t.adjustPos(),
                    t.pauseAnimateCard = null
                }),
                t.stockRedeals && this.stocks.forEach(function(e, a) {
                    e.setRedealCount(parseFloat(t.stockRedeals[a]))
                }),
                this.cards.forEach(function(t) {
                    t.updateShadow(),
                    t.animating = !1,
                    e.gameSettings.useCSS3 || t.adjustPos(0, 0)
                }),
                a()
            }
            .bind(this), r)
        }
        ,
        s.prototype.getSpecialHint = function() {
            return null
        }
        ,
        s.prototype.clickAdjust = function(e) {}
        ,
        s.prototype.getMoveWhenDrop = function(e, t) {
            return [{
                cards: e,
                des: t
            }]
        }
    }(),
    function() {
        "use strict";
        var t = e.localisation.getL
          , a = e.GameBase.prototype
          , i = e.games.Spider = function(a) {
            this.setUpCardData("spider." + a),
            this.isSpider = !0;
            var i = e.containers.Tableau;
            this.config = {
                cards: 104,
                suits: parseInt(a, 10),
                flip: {
                    type: "last",
                    num: 1,
                    containers: ["tableaus"]
                },
                tableaus: [6, 6, 6, 6, 5, 5, 5, 5, 5, 5],
                foundations: [0, 0, 0, 0, 0, 0, 0, 0],
                stocks: [50],
                stockRedealCount: 0
            },
            i.setWithCardAccept("sequence"),
            i.setMovableCards("sequence_same_suit"),
            i.setSpaceAccept("any"),
            this.onlyMaxLengthHint = !0,
            e.containers.Foundation.setMode("noManual"),
            e.containers.Stock.setEmptyCheck(function() {
                e.ui.gameAlert(t("spider"), t("spider-deal-info"))
            }),
            this.columns = this.config.tableaus.length,
            this.rows = 3,
            "simplesimon" == a ? (this.isSpider = !1,
            this.config = {
                cards: 52,
                suits: 4,
                flip: "all",
                tableaus: [8, 8, 8, 7, 6, 5, 4, 3, 2, 1],
                foundations: [0, 0, 0, 0]
            }) : "scorpion" == a && (this.isSpider = !1,
            this.config = {
                cards: 52,
                suits: 4,
                flip: {
                    type: "tableaus",
                    nums: [4, 4, 4, 4, 7, 7, 7]
                },
                tableaus: [7, 7, 7, 7, 7, 7, 7],
                stocks: [3],
                foundations: [0, 0, 0, 0]
            },
            i.setWithCardAccept("suit"),
            i.setMovableCards("any"),
            i.setSpaceAccept("king"),
            e.containers.Stock.setEmptyCheck(null),
            this.columns = this.config.tableaus.length,
            this.rows = 4,
            this.onlyMaxLengthHint = !1),
            e.GameBase.call(this),
            this.automovePrefs = [this.tableaus],
            this.stocks && (this.stocks[0].setLayout("piles", {
                margin: 10,
                numPerPile: 10
            }),
            this.stocks[0].lastCardUp = !1,
            this.stocks[0].target = this.tableaus,
            this.stocks[0].ejectCards = 1),
            e.gameSettings.autoplayMode = "disabled"
        }
        ;
        i.prototype = Object.create(a),
        i.prototype.hoverable = function(t) {
            return a.hoverable.call(this, t) || t.ownedBy instanceof e.containers.Stock && t === t.ownedBy.lastCard()
        }
        ,
        i.prototype.considerHints = function(t, a, i) {
            if (t instanceof e.containers.Foundation)
                return !1;
            if (a instanceof e.containers.Foundation)
                return !1;
            if (i) {
                if (t instanceof e.containers.Tableau && a instanceof e.containers.Tableau && 0 === a.cards.length && t.cards.length === i)
                    return !1;
                if (t instanceof e.containers.Tableau && i !== t.maxCardOut()) {
                    var o = a.cards.length && t.cards[t.cards.length - i].type === a.cards[a.cards.length - 1].type;
                    if (this.isSpider && o && i + a.maxCardOut() === 13)
                        return !0;
                    if (a.maxCardOut() + i > t.maxCardOut() && o)
                        return !0;
                    if (this.onlyMaxLengthHint)
                        return !1
                }
            }
            return !0
        }
        ,
        i.prototype.isLost = function(e) {
            return 0 === e.length && this.stocks && 0 === this.stocks[0].cards.length
        }
        ,
        i.prototype.getSpecialHint = function() {
            return this.stocks && this.stocks[0].cards.length > 0 ? {
                to: this.stocks[0]
            } : null
        }
        ,
        i.prototype.getAutomoveDes = function(e) {
            return this.tableaus.filter(function(t) {
                return this.testAccept(e, t)
            }
            .bind(this)).reduce(function(t, a) {
                return t ? a.cards.length ? t.cards.length ? a.lastCard().type !== e[0].type ? t : t.lastCard().type !== e[0].type ? a : t.maxCardOut() >= a.maxCardOut() ? t : a : a : t : a
            }, null)
        }
        ,
        i.prototype.adjustLayout = function(e, t) {
            var i = a.adjustLayout.call(this, e, t);
            this.initx = i.left + i.margin,
            this.inity = i.cheight / 8,
            this.tableaus.forEach(function(e, t) {
                e.setPos(i.margin + i.left + (2 * i.margin + i.cwidth) * t, i.top)
            });
            var o = i.left + (2 * i.margin + i.cwidth) * (this.columns - 1);
            return this.foundations.forEach(function(e, t) {
                e.setPos(o - (i.cwidth + 2 * i.margin) * t + i.margin, Math.floor(i.cheight / 8))
            }),
            this.stocks && (this.stocks[0].layoutOptions.margin = i.cwidth / 4,
            this.stocks[0].setPos(i.left + i.margin, i.cheight / 8)),
            i
        }
        ,
        i.prototype.getAutoFillMove = function() {
            for (var e = 0; e < this.tableaus.length; e++) {
                var t = this.tableaus[e];
                if (t.cards.length >= 13) {
                    for (var a = t.cards.length - 1; a > 0 && t.cards[a - 1].num - t.cards[a].num == 1 && t.cards[a - 1].type === t.cards[a].type && !t.cards[a - 1].flipped && !t.cards[a].flipped; )
                        a--;
                    if (t.cards.length - a == 13) {
                        for (var i, o = 0; o < this.foundations.length; o++)
                            if (0 === this.foundations[o].cards.length) {
                                i = this.foundations[o];
                                break
                            }
                        return {
                            cards: t.getCards(13),
                            destination: i,
                            chain: !0
                        }
                    }
                }
            }
            return null
        }
    }(),
    function() {
        "use strict";
        var t = e.localisation.getL;
        $.fn.stop = $.fn.transitionStop,
        $.cssEase.easeOutCubic = "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
        $.cssEase.easeOutCirc = "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
        $.cssEase.easeOutBack = "cubic-bezier(0,1,0.5,1.3)",
        $.cssEase.easeInCubic = $.cssEase.in,
        $.cssEase.linear = "linear";
        var a = e.game
          , i = e.ui
          , o = e.config
          , n = e.resources
          , r = e.gameSettings
          , s = e.cardData
          , l = function() {
            var t = !1;
            return r.rateReminderActive && ("windows" == o.isApp ? t = !0 : "chrome-packaged" === o.isApp ? "solitaire" == e.data.projectType && (o.rateReminderLinkChrome = "https://chrome.google.com/webstore/detail/solitaire/lkbhppfbabandkdmgjmifahoabeodiep",
            t = !0) : !o.isApp && $.browser.chrome && ("spider" == e.data.projectType ? (t = !0,
            o.rateReminderLinkChrome = "https://chrome.google.com/webstore/detail/spider-solitaire/opmmifamlflphgpapoddpfghobgnagek") : "freecell" == e.data.projectType ? (t = !0,
            o.rateReminderLinkChrome = "https://chrome.google.com/webstore/detail/freecell/loaecokofmdgccldeaacoakfninhoboe") : "netsolitaire" == e.data.projectType ? (t = !0,
            o.rateReminderLinkChrome = "https://chrome.google.com/webstore/detail/solitaire-games/bmfmccmloeoabkbgidmhjpdonhbnjfjh") : "christmas" == e.data.projectType && (t = !0,
            o.rateReminderLinkChrome = "https://chrome.google.com/webstore/detail/christmas-time-solitaire/dijbepjhnbemlkankfdenhghjikmhhfk"))),
            t
        }
          , c = function() {
            if ($("#game-ui").css("minHeight", ""),
            "undefined" != typeof googletag) {
                if (t = 180,
                window.innerWidth <= 700) {
                    var t = parseInt($("#adarea").css("width"));
                    t += t > 0 ? 20 : 0
                }
                "windows" == o.isApp ? ($("#winAdContainer").remove(),
                $("#playArea").css("top", ""),
                $("#playArea").css("bottom", 43),
                $(".barLeft").css("left", "10px"),
                $("#game-ui").css("left", "0px"),
                $("#game-ui").css("width", "100%"),
                $("#playArea").css("left", t + "px"),
                $("#playArea").css("width", "calc(100% - " + t + "px)")) : ($("#game-ui").css("left", t + "px"),
                $("#game-ui").css("width", window.innerWidth - parseInt($("#game-ui").css("left")) + "px"))
            } else
                o.isApp ? $(".barLeft").css("left", "10px") : "true" == e.data.responsiveAds ? window.innerWidth - parseInt($("#game-ui").css("left")) != parseInt($("#game-ui").css("width")) && $("#game-ui").css("width", "100%").css("width", "-=" + parseInt($("#game-ui").css("left")) + "px") : ($("#game-ui").css("width", "100%").css("width", "-=180px"),
                $("#playArea").css("left", "40px").css("right", "40px"),
                window.innerWidth <= 1280 && $("#topBar").css("left", "50px"),
                window.innerWidth <= 1024 && $("#playArea").css("right", "20px"))
        }
          , d = function() {
            var t = $.Deferred();
            if (uniStore == e.cachedChromeStorage)
                return t.resolve(),
                t;
            var a = uniStore.getVersion();
            return a !== e.config.version ? 0 === a ? (console && console.log("Migrating"),
            $.ajax({
                type: "GET",
                url: "solitaire/js/app/migrate/migrate-" + a + "-" + e.config.version + ".js",
                dataType: "text",
                async: !0
            }).done(function(e) {
                Function(e)(),
                console && console.log("Done migrating."),
                t.resolve()
            })) : (r.ini(),
            t.resolve()) : t.resolve(),
            t
        };
        e.ready = function() {
            e.ui.jqmLoader = $("#jqm-loader").loader(),
            $("#game-ui").css("minHeight", ""),
            o.isApp && ($("#game-ui").css("left", "0px"),
            $("#game-ui").css("width", "100%")),
            "windows" == o.isApp && ("christmas" == e.data.projectType ? $("#game-ui").css("background-color", "#214F4E") : "collection" == e.data.projectType ? $("#game-ui").css("background-color", "#282828") : "klondike" == e.data.projectType ? $("#game-ui").css("background-color", "#1A9056") : "pyramid" == e.data.projectType ? $("#game-ui").css("background-color", "#1A9056") : "freecell" == e.data.projectType ? $("#game-ui").css("background-color", "#1A9056") : "spider" == e.data.projectType && $("#game-ui").css("background-color", "#1A9056")),
            e.data.projectType || alert("tcgsol.data.projectType == null"),
            o.isMobilePhone && $("body").addClass("mobilePhone"),
            d().done(function() {
                uniStore.loadToCache(function() {
                    uniStore.setVersion(e.config.version),
                    r.lastGame ? r.load() : r.ini(),
                    o.isApp || "klondike" != e.data.projectType ? $("#select-lang-container").remove() : (e.localisation.populate($("#select-lang")),
                    $("#select-lang").val(e.gameSettings.language).selectmenu("refresh").on("change", function() {
                        e.gameSettings.language = this.value,
                        o.isApp ? i.gameAlert(t("reload-title"), t("reload-content-app")) : i.gameAlert(t("reload-title"), t("reload-content"), function() {
                            location.reload()
                        })
                    })),
                    n.setCardset(r.cardset),
                    n.setCardback(r.cardback),
                    n.setBackground(r.background),
                    o.isApp ? e.delayedReady() : setTimeout(e.delayedReady, 1e3);
                    var s = 0;
                    a.onGamewon = function() {
                        l() && r.rateReminderCounter++,
                        s++,
                        i.modal.hide(),
                        l() && r.rateReminderCounter >= 10 ? (r.rateReminderCounter = 0,
                        i.showPopup("rateapp-dialog")) : i.showPopup("win-dialog")
                    }
                })
            })
        }
        ,
        e.delayedReady = function() {
            !o.isApp && o.isiOS7 && window.innerHeight < window.innerWidth && $("html").addClass("ios7"),
            o.isApp && o.isiOS7 && $("html").addClass("ios7-app"),
            window.scrollTo(0, 0),
            a.setGameDom($("#playArea")),
            $(window).resize(function() {
                a.scheduleUpdateDisplay(100)
            }),
            o.isChromePackagedApp || $(window).on("unload", function() {
                a.save()
            }),
            "windows" != o.isApp && (i.loadAppearanceOptions(),
            i.loadGames($("#group-games"))),
            e.progressBar(n.download(), e.audio.getPromise(), n.doneExtraImages()).done(function() {
                i.loading.hide(),
                $(".progress-bar").replaceWith("<br /><img src='solitaire/loading.gif' />"),
                window.cordova && navigator.splashscreen.hide(),
                e.startPlaying()
            }),
            n.updateImages(),
            $.mobile.defaultDialogTransition = "none",
            $.mobile.defaultPageTransition = "none",
            $.mobile.buttonMarkup.hoverDelay = 0,
            $.browser.chrome && $(".only-chrome").css("display", "block"),
            $(window).on("resize", function() {
                !o.isApp && o.isiOS7 && window.innerHeight < window.innerWidth ? $("html").addClass("ios7") : $("html").removeClass("ios7"),
                window.scrollTo(0, 0),
                c(),
                parseInt($("#main-ui-popup").css("left"), 10) > -1e3 && i.adjustGameSelector()
            }),
            c();
            for (var l = ["x", "y", "scaleX", "scaleY"], d = 0; d < 4; d++)
                !function(e) {
                    $.fx.step[e] = function(t) {
                        $.cssHooks[e].set(t.elem, t.now + t.unit)
                    }
                }(l[d]);
            r.useCSS3 ? $.fn.stop = $.fn.transitionStop : ($.fn.transition = $.fn.animate,
            $(".bottomButton").css("box-shadow", "none"),
            e.containers.Card.prototype.flip = e.containers.Card.prototype.directFlip,
            $.fx.step.boxShadow = function() {}
            ,
            $.cssHooks.boxShadow = {
                get: function() {
                    return null
                },
                set: function() {}
            },
            $.fx.step.ieBoxShadow = function(e) {
                e.elem.style.boxShadow = e.end
            }
            ,
            $.cssHooks.ieBoxShadow = {
                get: function(e) {
                    return e.style.boxShadow
                },
                set: function(e, t) {
                    e.style.boxShadow = t
                }
            }),
            ($.browser.msie && "ARM" === (navigator.cpuClass || "").toUpperCase() || !r.useCSS3) && ($("#effect-toggle").remove(),
            $("#swing-item").remove(),
            r.cardEffect = !1,
            r._0$ = !1),
            $.mobile.zoom.disable(),
            $(window).off("orientationchange.iosorientationfix").off("devicemotion.iosorientationfix"),
            o.isiOS ? $("#expand-item").remove() : $("#game-ui").css("overflow", "hidden"),
            $(document).bind("contextmenu", function(e) {
                e.preventDefault()
            }),
            document.onselectstart = function() {
                return !1
            }
            ;
            var u;
            u = o.isiOS ? "touchend" : "click",
            $("#main-nav").find("li").on(u, function() {
                var e = $(this);
                $("#main-groups").children().removeClass("current"),
                $("#group-" + e.html().toLowerCase()).addClass("current"),
                e.parent().children().removeClass("current"),
                e.addClass("current")
            }),
            $("#new-game-but").on(u, function() {
                i.showPopup("new-game-dialog")
            }),
            $("#undo-but").on(u, function() {
                a.applyUndo()
            }),
            $("#redo-but").on(u, function() {
                a.applyRedo()
            }),
            $("#hint-but").on(u, function() {
                a.showHint()
            }),
            $(".scores-but").on(u, function() {
                i.showPopup("stats-dialog")
            }),
            $(".rules-but").on(u, function() {
                i.showRules()
            });
            var p, h, g = $("#settings-dialog").add("#appearance-dialog").add("#options-dialog").add("#main-ui").add("#clear-stats-dialog").add("#about-dialog").add("#win-dialog").add("#new-game-dialog").add("#stats-dialog").add("#rules-dialog").add("#info-dialog").add("#rateapp-dialog").add("#more-games-dialog").add("#more-buttons-dialog");
            o.isMobilePhone ? (g.addClass("onphone").addClass("phone-popup").appendTo("body").page(),
            p = "pagebeforeshow",
            h = "pagehide",
            $("#playArea").on("vclick", function(e) {
                "playArea" === e.target.id && $(".bottomBar").toggleClass("hidden")
            })) : (g.popup({
                history: !1
            }),
            p = "popupafteropen",
            h = "popupafterclose"),
            $("#settings-but").on(u, function() {
                i.showPopup("settings-dialog")
            }),
            $(".more-but").on(u, function() {
                i.showPopup("more-buttons-dialog")
            }),
            $(".appearance-but").on(u, function() {
                $("#more-buttons-dialog").popup("close"),
                e.deferLoad("#appearance-dialog").then(function() {
                    i.showPopup("appearance-dialog")
                })
            }),
            $(".options-but").click(function() {
                i.showPopup("options-dialog")
            }),
            $("#clear-stats-but").click(function() {
                i.showPopup("clear-stats-dialog")
            }),
            $(".about-but").on(u, function() {
                e.cardData.gamePlayCount < 10 && $("#rateReviewAboutWin").css("display", "none"),
                i.showPopup("about-dialog")
            }),
            $(".more-games-but").on(u, function() {
                i.showPopup("more-games-dialog")
            }),
            $(".back-to-game").click(function() {
                setTimeout(function() {
                    $(".back-to-game").removeClass("ui-btn-active ui-focus")
                }, 700),
                i.backToGame()
            }),
            $("#appearance-dialog").on(p, function() {
                $("#cardsets-tab").attr("checked", !0),
                $(this).find(".single-list").hide(),
                $("#cardsets-list").show(),
                $(this).find("input[type=radio]").checkboxradio("refresh")
            }),
            $(".single-tab").click(function() {
                $(this).parentsUntil("fieldset").parent().parent().find(".single-list").hide(),
                $("#" + this.id.split("-")[0] + "-list").show()
            }),
            $(".start-new").click(function() {
                a.start(),
                $.mobile.changePage("#game-ui", {
                    reverse: !0,
                    changeHash: !1
                })
            }),
            $(".select-game").on(u, function() {
                i.showGameSelector()
            }),
            $(".restart").click(function() {
                a.restart(),
                $.mobile.changePage("#game-ui", {
                    reverse: !0,
                    changeHash: !1
                })
            }),
            $("#stats-reset-button").click(function() {
                s.clearInfo(),
                i.showPopup("stats-dialog")
            }),
            $("#options-dialog").on(h, function() {
                a.autoFill()
            }),
            $("#expand-option").on("change", function() {
                r.expandCard = "on" === $(this).val()
            }),
            $("#swing-option").on("change", function() {
                r._0$ = "on" === $(this).val()
            }),
            $("#effect-option").on("change", function() {
                r.cardEffect = "on" === $(this).val()
            }),
            $("#css3-option").on("change", function() {
                r.useCSS3 = "on" == $(this).val(),
                o.isApp ? i.gameAlert(t("reload-title"), t("reload-content-app")) : i.gameAlert(t("reload-title"), t("reload-content"), function() {
                    location.reload()
                })
            }),
            $("#sound-option").on("change", function() {
                r.soundOn = "on" === $(this).val()
            }),
            $("#autoplay-option input[type='radio']").on("change", function() {
                r.autoplayMode = $(this).val()
            }),
            $("#moves-toggle").on("change", function() {
                r._1$ = this.checked
            }),
            $("#score-toggle").on("change", function() {
                r.showScore = this.checked
            }),
            $("#time-toggle").on("change", function() {
                r.showTime = this.checked
            }),
            $("#rules-dialog").on("popupafteropen", function() {
                $("#rules-dialog-popup").css("top", 0)
            }),
            $(".rate-app").on("click", function() {
                "windows" === o.isApp ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri("ms-windows-store:REVIEW?PFN=" + Windows.ApplicationModel.Package.current.id.familyName)) : "phoneGap" === o.isApp && o.isiOS ? window.open(o.rateReminderLinkiOS) : "chrome-packaged" === o.isApp ? window.open(o.rateReminderLinkChrome) : !o.isApp && $.browser.chrome && window.open(o.rateReminderLinkChrome)
            }),
            $(".rate-later").on("click", function() {
                i.showPopup("win-dialog")
            }),
            $(".do-not-rate").on("click", function() {
                r.rateReminderActive = !1,
                i.showPopup("win-dialog")
            });
            var m = document.createElement("div");
            $(m).css({
                margin: "0 auto",
                width: 430,
                height: 220
            }),
            $('#stats-dialog>div[data-role="content"]').prepend(m),
            $("#stats-dialog").on(p, function() {
                var e = [{
                    data: s.gameWinCount,
                    name: t("won").capitalize(),
                    color: "#A2E100"
                }, {
                    data: s.gamePlayCount - s.gameWinCount - 1,
                    name: t("lost").capitalize(),
                    color: "#E12B1E"
                }];
                a.playing() || e[1].data++,
                i.raphPie(m, e)
            }),
            $(".ui-popup-screen:not(#rules-dialog-screen)").off("vclick"),
            $(document).bind("keydown", "ctrl+z", function() {
                a.applyUndo()
            }).bind("keydown", "ctrl+y", function() {
                a.applyRedo()
            }).bind("keypress", "h", function() {
                a.showHint()
            }),
            uniStore.isCached && (a.onMoveOccurred = a.save)
        }
        ,
        "windows" != o.isApp ? $(document).ready(function() {
            var a;
            try {
                a = e.gameSettings.language
            } catch (e) {
                uniStore.useMemStore()
            }
            e.localisation.load(a),
            e.config.isApp || ($("#darkenArea").html("<div id='loadingBox'>" + t("loading") + "<div class='progress-bar'><div id='progress'></div></div></div>"),
            -1 != window.location.href.toLowerCase().indexOf("netsolitaire.com") ? $("#shareButtonsGroup").html('<div class="fb-like" data-href="https://www.facebook.com/NetSolitaire" data-send="false" data-layout="button_count" data-width="50" data-show-faces="false"></div><div class="g-plusone" data-size="medium" data-href="https://www.netsolitaire.com"></div>') : $("#shareButtonsGroup").html('<div class="fb-like" data-href="https://www.facebook.com/TCG.TreeCardGames" data-send="false" data-layout="button" data-width="50" data-show-faces="false"></div><div class="g-plusone" data-size="medium" data-href="https://www.treecardgames.com"></div>'),
            i.createBookmarkButton(),
            function(e, t, a) {
                var i, o = e.getElementsByTagName(t)[0];
                e.getElementById(a) || ((i = e.createElement(t)).id = a,
                i.src = "//connect.facebook.net/en_US/all.js#xfbml=1",
                /** o.parentNode.insertBefore(i, o) **/()=> {})
            }(document, "script", "facebook-jssdk"),
            function() {
                var e = document.createElement("script");
                e.type = "text/javascript",
                e.async = !0,
                e.src = "https://apis.google.com/js/plusone.js";
                var t = document.getElementsByTagName("script")[0];
                // t.parentNode.insertBefore(e, t)
            }()),
            e.ready()
        }) : e.winAppify()
    }()
}();
