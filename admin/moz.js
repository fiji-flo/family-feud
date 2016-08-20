"use strict";

const GAME1 = `#round1
Nennen Sie das Fach, das Pia am liebsten unterrichtet:
Deutsch;28
Sachkunde;17
Musik;12
Kunst;11
Mathe;8
Sport;5
Englisch;5
#round2
Nennen Sie etwas typisch Deutsches:
Wurst;22
Bier;17
Sauerkraut;14
Pünktlichkeit;11
Kartoffeln;8
Kuckucksuhr;2
Panzer;2
Brezel;2
Schnitzel;2
Schwarzbrot;2
Tennissocken;2
Weltmeister werden;2
Autobahn;2
#round3
Nennen Sie etwas, das man schlägt:
Sahne;28
Ball;20
Boxsack;11
Kinder;8
den Freund;2
ein Rad;2
Federball;2
Frauen;2
Gegner;2
Gong;2
Hefeteig;2
Pferde;2
Pinata;2
Trommel;2
#round4
Nennen Sie einen Präsidenten:
Obama;45
Gauck;20
Erdogan;11
Heuss;2
Bush;2
J.F.Kennedy;2
Holland;2
Roosevelt;2
Weizsäcker;2
Spinner;2
#final
#fin1
Nennen Sie eine Einheit:
Meter;28
Gramm;11
Ampere;8
Ohm;5
Deutsche Einheit;5
Liter;5
Decibel;2
Fuß;2
GSG9;2
Kompanie;2
Lumen;2
Mol;2
Retard Units;2
Sekunde;2
Tesla;2
Watt;2
#fin2
Nennen Sie die genaue, offizielle Berufsbezeichnung von Matthias:
Keine Ahnung;17
IT-...;14
Informatiker;14
Iwas mit Alkohol;14
Computer-...;11
Business Intelligence-...;8
Big Boss;2
Geheimagent;2
Reinigungskraft für Sanitäranlagen;2
Specialist Marketing/Kommunikation;2
#fin3
Nennen Sie ein Symbol für Glück:
Kleeblatt;40
Hufeisen;11
Schweinchen;11
Schornsteinfeger;8
Alkohol;8
Herz;5
Grüne Ampel;2
#fin4
Nennen Sie etwas, das man an seinem letzten Arbeitstag macht:
Feiern;25
Aufräumen;20
Weinen;5
Verabschieden;5
Nichts;5
Blumen gießen;2
Urlaub;2
Abschnitt beenden;2
Arbeiten;2
Kollegen neidisch;2
Kuchen essen;2
Ausstempeln;2
#fin5
Nennen Sie einen altdeutschen weiblichen Vornamen.
Gertrude;14
Isolde;5
Hildegard;5
Eva;5
Giesela;2
Annerose;2
Siglinde;2
Rosi;2
Lina;2
Brunhilde;2
Eugenie;2
Hortensia;2
Adelhaid;2
Amalie;2
Edda;2
Berta;2
Else;2
Maria;2
Katharina;2
Lisbeth;2
Ursula;2
Marianne;2
Wilhelmine;2
Hans;2
Mathilde;2
Walburga;2
Klara;2`;

const GAME2 = `#round1
Nennen Sie etwas, das man mit Wasser macht.
Waschen;22
Trinken;20
Kochen;11
Schwimmen;7
Putzen;6
Kaffee;5
#round2
Nennen Sie einen berühmten Seefahrer.
Columbus;37
Captain Jack Sparrow;11
Marco Polo;9
Kapitän Ahab;8
Vasco da Gama;5
Captain Morgan;2
Edward Teach;2
Ferdinand Magellan;2
Kapitän Nemo;2
Kaptain Blaubär;2
Käptn Iglo;2
Noah;2
Sindbad;2
Störtebecker;2
#round3
Nennen Sie etwas, das die Braut in Vorbereitung des Hochzeitstages tut.
Schminken;31
Brautkleid kaufen;22
Jammern/verzweifeln;8
Sport;8
#round4
Nennen Sie etwas, mit dem man Spiele spielen kann.
Würfel;37
Karten;20
Konsole;17
#final
#fin1
Nennen Sie etwas, das man immer bei sich trägt.
Handy;28
Geldbeute;14
Uhr;11
Herz;8
Ehering;5
Hose;5
Haare;2
Bier;2
Kondom;2
Nase;2
Den Partner im Herzen;2
Schlüssel;2
Lippenstift;2
Taschentuch;2
#fin2
Nennen Sie einen Kosenamen für den Partner/die Partnerin.
Schatz;25
Hasi;14
Schnucki;11
Schnecke;5
Pupsi;5
Mausi;5
Lebensabschnittsgefährte;2
Liebste/r;2
Schnui;2
Süße;2
Hasenzahn;2
Äffchen;2
Weib;2
Hummelchen;2
Spatz;2
Bärle;2
#fin3
Nennen Sie ein besonders farbenprächtiges Tier.
Papagei;40
Pfau;34
Zebra;8
Chamäleon;5
Kakadu;5
Paradiesvogel;2
#fin4
Nennen Sie etwas, das der Bräutigam in Vorbereitung des Hochzeitstages tut.
Anzug kaufen;22
Ruhig sein;11
Alkohol trinken;8
Angst haben;8
Rasieren;5
Ringe besorgen;5
Sparen;5
Tanzen lernen;2
Fliege binden;2
Duschen;2
Toilette gehen;2
Geld ausgeben;2
Schuhe putzen;2
Junggesellenabschied;2
Luftkekse backen;2
Einladungen verteilen;2
Bauch einziehen;2
#fin5
Nennen Sie ein Tier mit weichem Fell.
Katze;28
Hase;17
Kaninchen;8
Hund;8
Alpaka;5
Eichhörnchen;5
Hamster;2
Albatros;2
Maulwurf;2
Igel;2
Pferd;2
Schaf;2
Bär;2`;
