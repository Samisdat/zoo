var express = require('express');
var router = express.Router();

const Animal = require('../model/animal');

const animals = [
    ['Säugetiere', 'Beuteltiere', 'Kängurus', 'Bennettskänguru'],
    ['Säugetiere', 'Beuteltiere', 'Kängurus', 'Östliches Graues Riesenkänguru'],
    ['Säugetiere', 'Nagetiere', 'Biber', 'Europäischer Biber'],
    ['Säugetiere', 'Nagetiere', 'Hörnchen', 'Streifenbackenhörnchen'],
    ['Säugetiere', 'Nagetiere', 'Langschwanzmäuse', 'Striemen-Grasmaus'],
    ['Säugetiere', 'Nagetiere', 'Meerschweinchen', 'Große Mara'],
    ['Säugetiere', 'Nagetiere', 'Meerschweinchen', 'Hausmeerschweinchen'],
    ['Säugetiere', 'Nagetiere', 'Meerschweinchen', 'Zwergmara'],
    ['Säugetiere', 'Nagetiere', 'Sandgräber', 'Sambischer Kleingraumull'],
    ['Säugetiere', 'Nagetiere', 'Springmäuse', 'Kleine Wüstenspringmaus'],
    ['Säugetiere', 'Nagetiere', 'Wühler', 'Rötelmaus'],
    ['Säugetiere', 'Nebengelenktiere', 'Zweifingerfaultiere', 'Zweifingerfaultier'],
    ['Säugetiere', 'Paarhufer', 'Echte Schweine', 'Hirscheber'],
    ['Säugetiere', 'Paarhufer', 'Echte Schweine', 'Pinselohrschwein'],
    ['Säugetiere', 'Paarhufer', 'Giraffenartige', 'Okapi'],
    ['Säugetiere', 'Paarhufer', 'Hirsche', 'Rentier'],
    ['Säugetiere', 'Paarhufer', 'Hirsche', 'Südlicher Pudu'],
    ['Säugetiere', 'Paarhufer', 'Hornträger', 'Bongo'],
    ['Säugetiere', 'Paarhufer', 'Hornträger', 'Gelbrückenducker'],
    ['Säugetiere', 'Paarhufer', 'Hornträger', 'Kirk-Dikdik'],
    ['Säugetiere', 'Paarhufer', 'Hornträger', 'Sibirischer Steinbock'],
    ['Säugetiere', 'Paarhufer', 'Hornträger', 'Takin'],
    ['Säugetiere', 'Paarhufer', 'Hornträger', 'Wildziege '],
    ['Säugetiere', 'Paarhufer', 'Nabelschweine', 'Halsbandpekari'],
    ['Säugetiere', 'Primaten', 'Gibbons', 'Weißhandgibbon'],
    ['Säugetiere', 'Primaten', 'Kapuzinerartige', 'Schwarzer Klammeraffe'],
    ['Säugetiere', 'Primaten', 'Krallenaffen', 'Goldkopf-Löwenäffchen'],
    ['Säugetiere', 'Primaten', 'Lemuren', 'Roter Vari'],
    ['Säugetiere', 'Primaten', 'Meerkatzenverwandte', 'Drill'],
    ['Säugetiere', 'Primaten', 'Menschenaffen', 'Bonobo'],
    ['Säugetiere', 'Primaten', 'Menschenaffen', 'Orang Utan'],
    ['Säugetiere', 'Primaten', 'Menschenaffen', 'Westlicher Gorilla'],
    ['Säugetiere', 'Raubtiere', 'Bären', 'Braunbär'],
    ['Säugetiere', 'Raubtiere', 'Bären', 'Eisbär'],
    ['Säugetiere', 'Raubtiere', 'Hunde', 'Asiatischer Rothund '],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Gepard'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Leopard'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Löwe'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Nebelparder'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Schneeleopard'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Tiger '],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Asiatische Goldkatze'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Oman-Falbkatze'],
    ['Säugetiere', 'Raubtiere', 'Katzen ', 'Sandkatze'],
    ['Säugetiere', 'Raubtiere', 'Katzenbären', 'Kleiner Panda'],
    ['Säugetiere', 'Raubtiere', 'Mangusten', 'Erdmännchen'],
    ['Säugetiere', 'Raubtiere', 'Ohrenrobben', 'Kalifornischer Seelöwe'],
    ['Säugetiere', 'Rüsselspringer', 'Rüsselspringer', 'Kurzohrige Elefantenspitzmaus'],
    ['Säugetiere', 'Rüsseltiere', 'Elefanten', 'Afrikanischer Elefant'],
    ['Säugetiere', 'Unpaarhufer', 'Pferde', 'Afrikanischer Esel '],
    ['Säugetiere', 'Unpaarhufer', 'Pferde', 'Kiang'],
    ['Säugetiere', 'Unpaarhufer', 'Pferde', 'Steppenzebra '],
    ['Säugetiere', 'Unpaarhufer', 'Tapire', 'Mittelamerikanischer Tapir'],
    ['Vögel', 'Eulen', 'Eigentliche Eulen', 'Schnee-Eule'],
    ['Vögel', 'Flamingos', 'Flamingos', 'Chileflamingo'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Spatelschnabelente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Eiderente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Kappensäger'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Kragenente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Plüschkopfente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Prachteiderente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Schellente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Schuppensäger'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Spatelente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Zwergsäger'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Argentinische Ruderente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Afrikanische Zwergglanzgans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Baikalente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Bernierente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Mähnengans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Mandarinente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Moschusente '],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Stockente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Weißflügelente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Kolbenente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Peposakaente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Tafelente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Hawaiigans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Kaisergans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Rothalsgans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Schwanengans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Streifengans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Schwarzhalsschwan'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Zwergschwan'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Blauflügelgans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Brandgans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Langflügel-Dampfschiffente'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Rotkopfgans'],
    ['Vögel', 'Gänsevögel', 'Entenvögel ', 'Witwenpfeifgans'],
    ['Vögel', 'Gänsevögel', 'Spaltfußgänse', 'Spaltfußgans'],
    ['Vögel', 'Greifvögel', 'Falkenartige', 'Andenkarakara'],
    ['Vögel', 'Greifvögel', 'Habichtartige', 'Gaukler'],
    ['Vögel', 'Greifvögel', 'Habichtartige', 'Mönchsgeier'],
    ['Vögel', 'Hopfartige', 'Wiedehopfe', 'Wiedehopf'],
    ['Vögel', 'Hühnervögel', 'Fasanenartige', 'Bankivahuhn '],
    ['Vögel', 'Hühnervögel', 'Fasanenartige', 'Harlekinwachtel'],
    ['Vögel', 'Hühnervögel', 'Fasanenartige', 'Straußwachtel'],
    ['Vögel', 'Hühnervögel', 'Fasanenartige', 'Zwergwachtel'],
    ['Vögel', 'Kranichvögel', 'Kraniche', 'Mandschurenkranich'],
    ['Vögel', 'Kranichvögel', 'Seriemas', 'Rotfußseriema'],
    ['Vögel', 'Kranichvögel', 'Sonnenrallen', 'Sonnenralle'],
    ['Vögel', 'Kuckucksvögel', 'Kuckucke', 'Blauer Seidenkuckuck'],
    ['Vögel', 'Kuckucksvögel', 'Kuckucke', 'Hauben-Seidenkuckuck'],
    ['Vögel', 'Kuckucksvögel', 'Turakos', 'Weißohrturako'],
    ['Vögel', 'Laufvögel', 'Nandus', 'Darwin-Nandu'],
    ['Vögel', 'Papageien', 'Eigentliche Papageien', 'Gelbbrustara'],
    ['Vögel', 'Papageien', 'Eigentliche Papageien', 'Hornsittich'],
    ['Vögel', 'Papageien', 'Eigentliche Papageien', 'Hyazinthara'],
    ['Vögel', 'Papageien', 'Eigentliche Papageien', 'Rotspiegelamazone'],
    ['Vögel', 'Pinguine', 'Pinguine', 'Brillenpinguin'],
    ['Vögel', 'Pinguine', 'Pinguine', 'Eselspinguin'],
    ['Vögel', 'Pinguine', 'Pinguine', 'Königspinguin'],
    ['Vögel', 'Rackenvögel', 'Eisvögel', 'Eisvogel'],
    ['Vögel', 'Rackenvögel', 'Eisvögel', 'Lachender Hans'],
    ['Vögel', 'Regenpfeiferartige', 'Regenpfeifer', 'Kiebitz'],
    ['Vögel', 'Regenpfeiferartige', 'Säbelschnäbler', 'Säbelschnäbler'],
    ['Vögel', 'Regenpfeiferartige', 'Triele', 'Kaptriel'],
    ['Vögel', 'Ruderfüßer', 'Pelikane', 'Rosapelikan'],
    ['Vögel', 'Schreitvögel', 'Ibisse und Löffler', 'Mähnenibis'],
    ['Vögel', 'Schreitvögel', 'Ibisse und Löffler', 'Roter Sichler'],
    ['Vögel', 'Schreitvögel', 'Ibisse und Löffler', 'Waldrapp'],
    ['Vögel', 'Schreitvögel', 'Reiher', 'Graureiher'],
    ['Vögel', 'Schreitvögel', 'Reiher', 'Seidenreiher'],
    ['Vögel', 'Schreitvögel', 'Störche', 'Weißstorch'],
    ['Vögel', 'Spechtvögel', 'Tukane', 'Riesentukan'],
    ['Vögel', 'Sperlingsvögel', 'Bülbüls', 'Gelbsteißbülbül'],
    ['Vögel', 'Sperlingsvögel', 'Drosseln', 'Sumbawadrossel'],
    ['Vögel', 'Sperlingsvögel', 'Fliegenschnäpper', 'Schamadrossel'],
    ['Vögel', 'Sperlingsvögel', 'Fliegenschnäpper', 'Weißbrauenrötel'],
    ['Vögel', 'Sperlingsvögel', 'Honigfresser', 'Blauohr-Honigfresser'],
    ['Vögel', 'Sperlingsvögel', 'Honigfresser', 'Glattstirn-Lederkopf'],
    ['Vögel', 'Sperlingsvögel', 'Kardinäle', 'Ultramarinbischof'],
    ['Vögel', 'Sperlingsvögel', 'Laubenvögel', 'Braunbauch-Laubenvogel'],
    ['Vögel', 'Sperlingsvögel', 'Nektarvögel', 'Gelbbauchnektarvogel'],
    ['Vögel', 'Sperlingsvögel', 'Pittas', 'Kappenpitta'],
    ['Vögel', 'Sperlingsvögel', 'Prachtfinken', 'Glanzelsterchen '],
    ['Vögel', 'Sperlingsvögel', 'Prachtfinken', 'Gouldamadine'],
    ['Vögel', 'Sperlingsvögel', 'Prachtfinken', 'Zebrafink'],
    ['Vögel', 'Sperlingsvögel', 'Schmuckvögel', 'Anden-Felsenhahn'],
    ['Vögel', 'Sperlingsvögel', 'Schmuckvögel', 'Schild-Schmuckvogel'],
    ['Vögel', 'Sperlingsvögel', 'Schnurrvögel', 'Goldkopfpipra'],
    ['Vögel', 'Sperlingsvögel', 'Schnurrvögel', 'Schwalbenschwanzschnurrvogel'],
    ['Vögel', 'Sperlingsvögel', 'Stare', 'Balistar'],
    ['Vögel', 'Sperlingsvögel', 'Stare', 'Grünschwanz-Glanzstar'],
    ['Vögel', 'Sperlingsvögel', 'Tangaren', 'Dickschnabelorganist'],
    ['Vögel', 'Sperlingsvögel', 'Tangaren', 'Gelbfüßiger Honigsauger'],
    ['Vögel', 'Sperlingsvögel', 'Tangaren', 'Grüntangare'],
    ['Vögel', 'Sperlingsvögel', 'Tangaren', 'Purpurtangare'],
    ['Vögel', 'Sperlingsvögel', 'Tangaren', 'Schwarztangare'],
    ['Vögel', 'Sperlingsvögel', 'Tangaren', 'Siebenfarbentangare'],
    ['Vögel', 'Sperlingsvögel', 'Timalien', 'China-Nachtigall'],
    ['Vögel', 'Sperlingsvögel', 'Töpfervögel', 'Blassfuß-Töpfervogel'],
    ['Vögel', 'Sperlingsvögel', 'Tyrannen', 'Rubintyrann'],
    ['Vögel', 'Sperlingsvögel', 'Tyrannen', 'Schwefeltyrann'],
    ['Vögel', 'Sperlingsvögel', 'Zaunkönige', 'Hauszaunkönig'],
    ['Vögel', 'Steißhuhnartige', 'Steißhühner', 'Schopftinamu'],
    ['Vögel', 'Taubenvögel', 'Tauben', 'Diamanttäubchen'],
    ['Vögel', 'Taubenvögel', 'Tauben', 'Jamaika Erdtaube'],
    ['Vögel', 'Taubenvögel', 'Tauben', 'Rotkappen-Fruchttaube'],
    ['Vögel', 'Taubenvögel', 'Tauben', 'Victoria Krontaube'],
    ['Vögel', 'Trogone', 'Trogone', 'Weißschwanztrogon'],
    ['Reptilien', 'Krokodile', 'Echte Krokodile', 'Stumpfkrokodil'],
    ['Reptilien', 'Schildkröten', 'Landschildkröten', 'Ägyptische Landschildkröte'],
    ['Reptilien', 'Schildkröten', 'Landschildkröten', 'Areolen-Flachschildkröte'],
    ['Reptilien', 'Schildkröten', 'Landschildkröten', 'Griechische Landschildkröte'],
    ['Reptilien', 'Schildkröten', 'Landschildkröten', 'Spornschildkröte'],
    ['Reptilien', 'Schildkröten', 'Neuwelt-Sumpfschildkröten', 'Europäische Sumpfschildkröte'],
    ['Reptilien', 'Schildkröten', 'Neuwelt-Sumpfschildkröten', 'Rotwangen-Schmuckschildkröte'],
    ['Reptilien', 'Schildkröten', 'Schlangenhalsschildkröten', 'Rotbäuchige Spitzkopfschildkröte'],
    ['Reptilien', 'Schuppenkriechtiere', 'Agamen', 'Bartagame'],
    ['Reptilien', 'Schuppenkriechtiere', 'Agamen', 'Hardun'],
    ['Reptilien', 'Schuppenkriechtiere', 'Agamen', 'Marokkanische Dornschwanzagame'],
    ['Reptilien', 'Schuppenkriechtiere', 'Agamen', 'Nordafrikanische Dornschwanzagame'],
    ['Reptilien', 'Schuppenkriechtiere', 'Agamen', 'Zwergbartagame'],
    ['Reptilien', 'Schuppenkriechtiere', 'Chamäleons', 'Pantherchamäleon'],
    ['Reptilien', 'Schuppenkriechtiere', 'Geckos', 'Blaue Bambusphelsume'],
    ['Reptilien', 'Schuppenkriechtiere', 'Geckos', 'Dornwald-Taggecko'],
    ['Reptilien', 'Schuppenkriechtiere', 'Geckos', 'Madagassischer Taggecko'],
    ['Reptilien', 'Schuppenkriechtiere', 'Geckos', 'Pasteurs Taggecko'],
    ['Reptilien', 'Schuppenkriechtiere', 'Gürtelechsen', 'Mosambique Gürtelschweif'],
    ['Reptilien', 'Schuppenkriechtiere', 'Gürtelechsen', 'Panzergürtelschweif'],
    ['Reptilien', 'Schuppenkriechtiere', 'Gürtelechsen', 'Zwerggürtelschweif'],
    ['Reptilien', 'Schuppenkriechtiere', 'Höckerechsen', 'Krokodilhöckerechse'],
    ['Reptilien', 'Schuppenkriechtiere', 'Leguane', 'Gebänderter Fidschi-Leguan'],
    ['Reptilien', 'Schuppenkriechtiere', 'Leguane', 'Rotkehlanolis'],
    ['Reptilien', 'Schuppenkriechtiere', 'Nattern', 'Dreiecksnatter '],
    ['Reptilien', 'Schuppenkriechtiere', 'Nattern', 'Gewöhnliche Strumpfbandnatter '],
    ['Reptilien', 'Schuppenkriechtiere', 'Nattern', 'Kornnatter'],
    ['Reptilien', 'Schuppenkriechtiere', 'Riesenschlangen', 'Grüner Baumpython'],
    ['Reptilien', 'Schuppenkriechtiere', 'Riesenschlangen', 'Königspython'],
    ['Reptilien', 'Schuppenkriechtiere', 'Riesenschlangen', 'Rauhschuppenpython'],
    ['Reptilien', 'Schuppenkriechtiere', 'Riesenschlangen', 'Madagaskar-Hundskopfboa'],
    ['Reptilien', 'Schuppenkriechtiere', 'Skinke', 'Baumskink'],
    ['Reptilien', 'Schuppenkriechtiere', 'Skinke', 'Chinesischer Wasserskink'],
    ['Reptilien', 'Schuppenkriechtiere', 'Skinke', 'Stachelskink'],
    ['Lurche', 'Froschlurche', 'Baumsteigerfrösche', 'Blauer Pfeilgiftfrosch'],
    ['Lurche', 'Froschlurche', 'Baumsteigerfrösche', 'Färberfrosch'],
    ['Lurche', 'Froschlurche', 'Baumsteigerfrösche', 'Gelbgebänderter Baumsteiger'],
    ['Lurche', 'Froschlurche', 'Baumsteigerfrösche', 'Gestreifter Blattsteiger'],
    ['Lurche', 'Froschlurche', 'Echte Frösche', 'Siamesischer Braunfrosch'],
    ['Lurche', 'Froschlurche', 'Laubfrösche im weiteren Sinne', 'Korallenfingerlaubfrosch'],
    ['Strahlenflosser', 'Ährenfischartige', 'Bedotiidae', 'Rotschwanz-Ährenfisch'],
    ['Strahlenflosser', 'Ährenfischartige', 'Blauaugen', 'Gabelschwanz-Regenbogenfisch'],
    ['Strahlenflosser', 'Ährenfischartige', 'Regenbogenfische', 'Boesemans Regenbogenfisch'],
    ['Strahlenflosser', 'Ährenfischartige', 'Regenbogenfische', 'Diamant-Regenbogenfisch'],
    ['Strahlenflosser', 'Ährenfischartige', 'Regenbogenfische', 'Lachsroter Regenbogenfisch'],
    ['Strahlenflosser', 'Ährenfischartige', 'Regenbogenfische', 'Zwergregenbogenfisch'],
    ['Strahlenflosser', 'Barschartige', 'Buntbarsche', 'Blauer Diskusfisch'],
    ['Strahlenflosser', 'Barschartige', 'Buntbarsche', 'Kärpflingsbuntbarsch'],
    ['Strahlenflosser', 'Barschartige', 'Buntbarsche', 'Madagaskar-Buntbarsch'],
    ['Strahlenflosser', 'Barschartige', 'Buntbarsche', 'Schachbrettcichlide'],
    ['Strahlenflosser', 'Barschartige', 'Buntbarsche', 'Schneckenbuntbarsch'],
    ['Strahlenflosser', 'Barschartige', 'Buntbarsche', 'Segelflosser'],
    ['Strahlenflosser', 'Barschartige', 'Doktorfische', 'Arabischer Doktorfisch'],
    ['Strahlenflosser', 'Barschartige', 'Doktorfische', 'Desjardins Seebader'],
    ['Strahlenflosser', 'Barschartige', 'Doktorfische', 'Gelber Segelseebader'],
    ['Strahlenflosser', 'Barschartige', 'Doktorfische', 'Gelbflossen-Doktorfisch'],
    ['Strahlenflosser', 'Barschartige', 'Doktorfische', 'Goldring-Borstenzahn-Doktorfisch'],
    ['Strahlenflosser', 'Barschartige', 'Doktorfische', 'Segelseebader'],
    ['Strahlenflosser', 'Barschartige', 'Fadenfische', 'Großer Kampffisch'],
    ['Strahlenflosser', 'Barschartige', 'Fadenfische', 'Mosaikfadenfisch'],
    ['Strahlenflosser', 'Barschartige', 'Falterfische', 'Gelber Rotmeer-Schmetterlingsfisch'],
    ['Strahlenflosser', 'Barschartige', 'Falterfische', 'Pinzettfisch'],
    ['Strahlenflosser', 'Barschartige', 'Falterfische', 'Wimpelfisch'],
    ['Strahlenflosser', 'Barschartige', 'Grundeln', 'Gelbe Korallengrundel'],
    ['Strahlenflosser', 'Barschartige', 'Kaiserfische', 'Blaugelber Zwergkaiserfisch'],
    ['Strahlenflosser', 'Barschartige', 'Kaiserfische', 'Gelbmasken-Kaiserfisch'],
    ['Strahlenflosser', 'Barschartige', 'Kaiserfische', 'Pfauen-Kaiserfisch'],
    ['Strahlenflosser', 'Barschartige', 'Kaiserfische', 'Traumkaiserfisch'],
    ['Strahlenflosser', 'Barschartige', 'Kaninchenfische', 'Fuchsgesicht'],
    ['Strahlenflosser', 'Barschartige', 'Kaninchenfische', 'Gelber Kaninchenfisch'],
    ['Strahlenflosser', 'Barschartige', 'Kardinalbarsche', 'Banggai-Kardinalbarsch'],
    ['Strahlenflosser', 'Barschartige', 'Kardinalbarsche', 'Pyjama-Kardinalbarsch'],
    ['Strahlenflosser', 'Barschartige', 'Kletterfische', 'Leopard-Buschfisch'],
    ['Strahlenflosser', 'Barschartige', 'Leierfische', 'LSD-Leierfisch'],
    ['Strahlenflosser', 'Barschartige', 'Lippfische', 'Kubanischer Schweinsfisch'],
    ['Strahlenflosser', 'Barschartige', 'Großguramis', 'Schokoladengurami'],
    ['Strahlenflosser', 'Barschartige', 'Riffbarsche', 'Blauer Riffbarsch'],
    ['Strahlenflosser', 'Barschartige', 'Riffbarsche', 'Grünes Schwalbenschwänzchen'],
    ['Strahlenflosser', 'Barschartige', 'Riffbarsche', 'Orangeringelfisch'],
    ['Strahlenflosser', 'Barschartige', 'Riffbarsche', 'Samtkorallenfisch'],
    ['Strahlenflosser', 'Barschartige', 'Riffbarsche', 'Schwalbenschwanz-Riffbarsch'],
    ['Strahlenflosser', 'Flösselhechtartige', 'Flösselhechte', 'Schmuck-Flösselhecht'],
    ['Strahlenflosser', 'Hornhechtartige', 'Zenarchopteridae', 'Sumatra-Halbschnäbler'],
    ['Strahlenflosser', 'Karpfenartige', 'Karpfenfische', 'Fransenlipper'],
    ['Strahlenflosser', 'Karpfenartige', 'Karpfenfische', 'Keilfleckbarbe'],
    ['Strahlenflosser', 'Karpfenartige', 'Schmerlen', 'Prachtschmerle'],
    ['Strahlenflosser', 'Knochenhechtartige', 'Knochenhechte', 'Kaimanfisch'],
    ['Strahlenflosser', 'Knochenzünglerartige', 'Knochenzüngler', 'Gepunkteter Barramundi'],
    ['Strahlenflosser', 'Knochenzünglerartige', 'Knochenzüngler', 'Malaiischer Gabelbart'],
    ['Strahlenflosser', 'Kugelfischverwandte', 'Drückerfische', 'Picasso-Drückerfisch'],
    ['Strahlenflosser', 'Kugelfischverwandte', 'Kugelfische', 'Süßwasserkugelfisch'],
    ['Strahlenflosser', 'Panzerwangen', 'Drachenköpfe', 'Pfauenaugen-Zwergfeuerfisch'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Kaisertetra'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Kirschflecksalmler'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Piranha'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Roter Neon'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Schmucksalmler'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Trauermantelsalmler'],
    ['Strahlenflosser', 'Salmlerartige', 'Echte Salmler', 'Zitronensalmler'],
    ['Strahlenflosser', 'Salmlerartige', 'Engmaulsalmler', 'Prachtkopfsteher'],
    ['Strahlenflosser', 'Salmlerartige', 'Schlanksalmler', 'Purpurziersalmler'],
    ['Strahlenflosser', 'Seenadelartige', 'Seenadeln', 'Langschnäuziges Seepferdchen'],
    ['Strahlenflosser', 'Seenadelartige', 'Seenadeln', 'Zebra-Seenadel'],
    ['Strahlenflosser', 'Welsartige', 'Dornwelse', 'Dornwels'],
    ['Strahlenflosser', 'Welsartige', 'Fiederbartwelse', 'Perlhuhnwels'],
    ['Strahlenflosser', 'Welsartige', 'Harnischwelse', 'Gelbbrauner Antennenwels'],
    ['Strahlenflosser', 'Zahnkärpflinge', 'Aplocheilidae', 'Gardners Prachtkärpfling'],
    ['Strahlenflosser', 'Zahnkärpflinge', 'Aplocheilidae', 'Madagaskarhechtling'],
    ['Strahlenflosser', 'Zahnkärpflinge', 'Aplocheilidae', 'Streifenhechtling'],
    ['Blumentiere', 'Scheibenanemonen', 'Discosomatidae', 'Discosoma sp.'],
    ['Blumentiere', 'Seeanemonen', 'Actiniidae', 'Purpurrose'],
    ['Doppelfüßer', 'Schnurfüßer', 'Spirostreptidae', 'Afrikanischer Riesentausendfüßer'],
    ['Höhere Krebse', 'Zehnfußkrebse', 'Felsen- und Partnergarnelen', 'Ringelhand-Garnele'],
    ['Insekten', 'Fangschrecken', 'Empusidae', 'Wandelnde Geige'],
    ['Insekten', 'Schmetterlinge', 'Edelfalter', 'Bananenfalter sp.'],
    ['Schlangensterne', 'Ophiurida', 'Ophiodermatidae', 'Olivgrüner Schlangenstern'],
    ['Schnecken', 'Architaenioglossa', 'Apfelschnecken', 'Apfelschnecke'],
    ['Seeigel', 'Diadematoida', 'Diademseeigel', 'Diadem-Seeigel'],
    ['Spinnentiere', 'Skorpione', 'Scorpionidae', 'Kaiserskorpion'],
    ['Spinnentiere', 'Webspinnen', 'Vogelspinnen', 'Ornamentvogelspinne Poecilotheria metallica'],
];

/*
router.get('/seed', async (req, res) => {

    res.status(200);

    const json = [];

    for(let i = 0, x = animals.length; i < x; i += 1){

        const animalData = animals[i];

        const animal = new Animal(req.body);

        animal.class = animalData[0].trim();
        animal.order = animalData[1].trim();
        animal.family = animalData[2].trim();
        animal.species = animalData[3].trim();

        await animal.save();

        json.push(animal);

    }

    res.json(json);

});
*/

router.get('/', async (req, res) => {

    try {

        let animals = await Animal.find({});

        animals = animals.sort((a, b) => {

            var speciesA = a.species.toUpperCase();
            var speciesB = b.species.toUpperCase();

            return (speciesA < speciesB) ? -1 : (speciesA > speciesB) ? 1 : 0;
            
        });

        const responseJson =  animals.map((animal)=>{

            return {
                id: animal._id,
                slug: animal.slug,
                species: animal.species,
                class: animal.class,
                order: animal.order,
                family: animal.family,
                wikipediaDeUrl: ''
            };

        })

        res.status(200);
        res.json(responseJson);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});


router.get('/:slug', async (req, res) => {
    const id = req.params.id;

    try {
        const building = await Building.findById(id);

        res.status(200);
        res.json(building);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


module.exports = router;
