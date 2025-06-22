# Shiny Website Documentation

## Changelogs

### Version 1.34.0 (22.06.2025)

**Pokedex:**
- Previous en Next knoppen zijn ook toegevoegd voor de pokedex.

**Bug Fixes:**
- Aramaldo toegevoegd aan fossil collection
- Hisuian forms toegevoegd aan starter collection
- Cumulatieve counter graph gefixt (tijd & kleur)
- Search werkt terug voor pokedex
- Pokedex pagina van bv alolans geeft nu enkel de relevante shinies
- Switchen tussen shinies werkt nu wel zonder bugs

---

### Version 1.33.0 (14.06.2025)

**Collections:**
- Starters & fossils zijn toegevoegd.

**Counter graph:**
- Cumulatieve grafiek is nu een line graph ipv een bar chart

**Methods:**
- Odd Egg toegevoegd

---

### Version 1.32.0 (09.06.2025)

**Shiny Map:**
- Op de poppup ziet ge nu ook de sprite van elke shiny en door er op te klikken navigeert ge naar de shiny pagina.

**Shiny Page:**
- Er kan nu naar de volgende en vorige shiny worden genavigeerd met een "previous" en "next" knop. Dit is op basis van u op dat moment gefilterde en gesorteerde shinies. (Alternatief op Korneel zijn "swipen", swipen is onmogelijk omdat die funtionaliteit al door de browser wordt gebruikt om vooruit en terug te gaan en ge kunt hier dus geen custom functies aan hangen)

**Counter Ranking:**
- Ranking kan nu bekeken worden voor enkel dezelfde soort hunt

---

### Version 1.31.0 (07.06.2025)

**Counter Graph:**
- Grafiek kan nu op cumulatief worden gezet.

**Search:**
- Zoeken op Alola enal werkt

**Bug Fixes:**
- Tijdens avondsessie 06/06

---

### Version 1.30.0 (09.04.2025)

**Counter:**
- Encounter table kan nu worden toegevoegd aan een counter. Dubbel klik op een cel om te editten.

**Map:**
- Joaquin zijn geliefde vliegtuigknop is toegevoegd

**Bug Fixes:**
- LGPE sprites zijn niet meer uitgerokken

---

### Version 1.29.0 (06.03.2025)

**Filter:**
- Er kan nu gefilterd worden op method

**Sprites:**
- Chorneefke heeft goe gewerkt aan de gold en silver sprites

**Counter:**
- Time to reach odds toegevoegd aan counter

**Bug Fixes:**
- Tijd shit is eindelijk keer gefixt

---

### Version 1.28.0 (23.02.2025)

**Filter:**
- Shinies kunnen nu gefilterd worden op "shinies die nog kunnen evolven" (laad wel traag omda hij al die data moet checken)

**Trainer Sprite:**
- Toch iets cleaner gemaakt al

**Pokedex:**
- Unowns worden alfabetisch gestorteerd

**Bug Fixes:**
- Game stats totaal is nu ook gefixt
- Als er geen data is gaat game stats niemeer fuckt

---

### Version 1.27.0 (09.02.2025)

**Map:**
- Scale bar toegevoegd

**Trainer Sprite:**
- Big trainer sprites van Korneel zijn toegevoegd en ge kunt nu ook u favorite pokemon kiezen die erbij staat. Heeft wel nog wat verfijnwerk nodig maar het werkt voorlopig. (terug te vinden bij settings)

**Logo:**
- Sterrekes zijn van plaats veranderd

**Bugfixes:**
- Snel na elkaar klikken op counter werkt terug deftig
- Counter knop komt ook bij shinies die geen gemiddelde encounters hebben
- Average encounters bij gamestats zijn gefixt
- "-" wordt gefilterd bij nature stats
- Probleem met percentages bij SOS is gefixt

---

### Version 1.26.0 (26.01.2025)

**Collection:**
- Opsplitsing tussen obtainable en unobtainable collection items

---

### Version 1.25.0 (21.12.2024)

**Counter:**
- Gemiddelde encounter tijd kan manueel worden ingevuld op counter pagina (op zelfde plek als waar thresholds worden aangepast)
- Als ge nu op de pagina van een gecomplete counter zit is er een knop om naar de shiny pagina te gaan (sparkles knop, zelfde knop die ge moet klikken alsde een shiny hebt)

**Shiny Page:**
- Pokéradar shinies worden gesorteerd op datum

**Filter:**

- Filter is ook toegevoegd aan counter pagina

**Aanpassingen:**

- Counter ranking onthoudt of ge op encounters of percentage staat

---

### Version 1.24.0 (01.12.2024)

**Filter:**

- Nieuwe filter is toegevoegd, voorlopig werkt hij nog enkel op shiny pagina om te test

---

### Version 1.23.1 (21.11.2024)

**Bug Fixes:**

- Shellos en gastrodon sprites gefixt
- Castform sprites gefixt
- Simi's sprites gefixt
- Joaquin zijn latias is nu een legendary
- Counter ranking bugs gefixt
- 00:00:00 bij counterstats ipv NaN waardes

---

### Version 1.23.0 (04.11.2024)

**Counters:**

- Counter ranking is toegevoegd, kan bekeken worden op basis van encounters of percentage

---

### Version 1.22.1 (03.11.2024)

**Bug Fixes:**

- Croconaw sprite is Silver is aangepast
- Blanco land wordt er nu uitgefilterd
- Form sprites worden onder elkaar weergegeven
- Op "Search page" worden evolutions sprites nu correct weergegeven
- Radar grouping werkt nu ook op verjaardagen
- Time zones zijn terug gefixt denk ik, tijdens winteruur zijn we UTC+1 en tijdens zomer uur UTC+2 dus kheb da dynamisch moeten aanpassen (alles stond op +2)
- Verjaardagen worden pas weergegeven vanaf shinies 1 jaar oud zijn

---

### Version 1.22.0 (13.10.2024)

**Stats:**

- Gender stats zijn toegevoegd
- Op home screen "on this day" toegevoegd waarop ge kunt zien welke shinies op deze dat zijn gevangen x aantal jaar geleden.

**Topbar:**

- "Home" icoontje is vervangen door symbool waarmee radar grouping gemakkelijker kan worden aan en uit gezet. Handig voor bvb snel te switchen alsde naar de map aant kijken zijt

**Bugfixes:**

- Bugs in create forms zijn opgelost
- Sorteren op total time werkt terug in de table
- Game Stats Average geeft nu 0 weer als er geen waarde is

---

### Version 1.21.1 (09.10.2024)

**Bugfixes:**

- Data caching werk terug
- Map records passen nu aan bij uitschakelen voertuigen
- Landen zijn altijd in het engels bij Country graph en de landen blijven nu ook op kleine schermen staan
- Bij het refreshen op een "stats" tab blijft hij hier nu op staan ipv terug te keren naar "data" tab
- Laatste counters filteren nu enkel op gecounte shinies

---

### Version 1.21.0 (08.10.2024)

**Sprites:**

- Backsprites kunnen nu worden aan en uitgezet bij shiny pokemon en in pokedex

---

### Version 1.20.0 (25.09.2024)

**Map:**

- Vult terug volledige pagina.
- Grafiek met buitenlandse shinies toegevoegd aan mapstats
- Map records zijn toegevoegd aan de mapstats

**Counter Stats:**

- Online stat toegevoegd met tijd sinds laatste keer gehunt
- Basic tooltips toegevoegd voor tijd stats

---

### Version 1.19.0 (20.09.2024)

**Counter Stats:**

- Counter stats tonen nu ook tijd, naast het aantal encounters nu dus ook tijd voor een bepaalde periode.

**Collections:**

- Er kan nu geswitched worden tussen een tabblad met data en met statistieken

**Map:**

- Er kan nu geswitched worden tussen een tabblad met data en met statistieken

**Search:**

- Site onthoud nu op welk type ge aant zoeken zijt waar er gerefreshed wordt of terug wordt gekeerd naar de search pagina.

---

### Version 1.18.0 (05.09.2024)

**Ribbons:**

- Ribbons hebben nu altijd hun sprite die overeenkomt met de game

**Shinies Form:**

- Error message als geo locatie fout in ingevuld

**Shiny Map:**

- In instelling kan nu worden gekozen of de map opent in Gent of op Europa
- Op de kaart zijn twee zoom knoppen toegevoegd waarmee snel naar Gent of Europa kan gezoomd worden

**Shiny Stats:**

- Totale average #encounters wordt nu effectief berekend en niet meer gemiddelde van de 4.

**Counter Stats:**

- Bij encounter stats worden voor "All Time" nu gewoon al u encounters opgeteld en niet meer alleen diegene waarvoor ge een timestamp hebt (aka Simon is niemeer de loser).

**Bug Fixes:**

- Deoxys toegevoegd aan gen 3 games
- "-" als level nie bestaat bij dode shinies

---

### Version 1.17.2 (01.09.2024)

**Bug Fixes:**

- Zie google docs
- Dead shinies kunnen terug worden bekeken.

---

### Version 1.17.1 (26.08.2024)

**Bug Fixes:**

- Zie google docs

---

### Version 1.17.0 (11.08.2024)

**Pokedex:**

- Individuele pokedex entry pagina's zijn toegevoegd. Hier kan worden bekeken welke shinies/counters er van die species in de database zitten. Ook kunnen hier alle evolutions/forms/gamesprites die in de database zitten bekeken worden.
- Op de Search pagina kan er nu ook op pokedex entry worden gezocht.

**Counter:**

- Animated sprites worden getoont bij info.

**Shiny Page:**

- Radar pokemon hebben nu een unieke nummer naast hun naam, totaal nummer vanboven is verwijderd.

**Bug Fixes:**

- Thundurus form toegevoegd
- Wurmple genderdifference gefixt

**Database:**

- SV sprites grotendeels toegevoegd

---

### Version 1.16.0 (07.08.2024)

**Bug Fixes:**

- Megas tonen terug shiny en niet-shiny sprites.

### Version 1.15.0 (06.08.2024)

**Pokémon Images:**

- Animated sprites zijn toegevoegd, zie onderdeel "settings" voor meer info.
- Gender differences zijn toegevoegd

**Settings:**

- Settings zijn opnieuw geordend om het overzichtelijker te maken. Animated sprites kunnen hier worden aan en uit gezet. Animated sprites vanaf gen 8 zijn zwaar om te laden, daarom staan deze default uit. Als er dingen fuckt gaan, best keer cookies verwijderen.

**Radar Shinies:**

- Aantal shinies in de groep wordt nu vanboven weergegeven.

**Aanpassingen:**

- Alle percentages zijn nu op twee cijfers na de komma.

---

### Version 1.14.0 (21.07.2024)

**Collections:**

- Aantal collected op totale aantal is nu te zien in de titel van de collection. Het percentage is ook toegevoegd.

**Aanpassingen:**

- Ingeven van in game locatie is niet meer nodig bij het aanmaken van een counter.
- Naam van geo locatie is nu zichtbaar boven de kleine map snippet ipv op de marker te moeten klikken.

**Bug Fixes:**

- Shiny groepering per maand wordt nu gedaan in GMT+2 ipv GMT (Abra Stef nu bij juli ipv juni)
- Als nieuwe legends, mythicals ... worden toegevoegd komen ze nu ook bij de juiste collection.

**Backend:**

- Volledige herstructurering van backend data ophaling. Hierdoor kunnen er nieuwe bugs zijn ontstaan.

---

### Version 1.13.0 (30.06.2024)

**Sidebar:**

- Herverdeling van pagina's naar een volgens mij logischere opdeling.

**Shiny Map:**

- Er is een knop toegevoegd om shinies te filteren die tijdens het reizen zijn gevangen. Volgende woorden worden gefilterd: "Auto", "Bus", "Fiets", "Tram", "Trein", "Vliegtuig"
- Markers worden pas getoont als alles geladen is, zodat er geen rare flikkering meer is de eerste seconde.

**Counter Graph:**

- Aantal uur per dag gehunt kan nu bekeken worden in de graph.

**Specs/Ribbons/Marks:**

- Naam is nu zichtbaar bij het aanklikken van marks ribbons specs.

**Pokedex:**

- Aangevuld tot SV DLC.

**Collections:**

- Volgende collections zijn toegevoegd:
  - Legends
  - Mythicals
  - Ultra Beasts
  - Past Paradox Pokémon
  - Future Paradox Pokémon
  - Ribbons
  - Marks

**Bug Fix:**

- Dubbele method category input field bug, is nu veranderd door method en method catergory.
- DexNav kan nu worden ingegeven zonder eerst een counter aan te maken.
- Counter percentages zijn nu wel correct, ervoor zat hier nog een bug in da hij ook nog encounters van 2u voor de laatste shiny meetelde.

---

### Version 1.12.1 (25.06.2024)

**Bug Fix:**

- Search filtert nu geen meerdere null waardes.

---

### Version 1.12.0 (24.06.2024)

**Sidebar:**

- Herordering van sidebar.

**Topbar:**

- User information kan nu vanaf hier worden aangeklikt ipv in de sidebar.

**Cookies:**

- Worden nu in real time aangepast dus refresh na het veranderen van bv. shiny group cookie is niet meer nodig.

**Search:**

- Bij het zoeken naar shinies wordt er maar 1 shiny meer getoont per groep.

**Bug Fix:**

- Threshold kan nu ook worden aangepast bij completed counters.

---

### Version 1.11.4 (16.06.2024)

**Bug Fix:**

- Laoding error in backend gefixt.

---

### Version 1.11.3 (15.06.2024)

**Bug Fix:**

- Error komt niet meer bij het openen van een completed counter.
- Witte loading background bij het openen van app is nu zelfde achtergrondkleur als de site.

---

### Version 1.11.2 (02.06.2024)

**Error handling:**

- Bij elke interactie met de back-end wordt er een alert weergegeven (succes of error) om beter te kunnen debuggen.

---

### Version 1.11.1 (28.05.2024)

**Dead Shiny Display:**

- Gebruikt nu dezelfde componenten als de gewone shiny display.
- Shiny's is vervangen door Shinies.

---

### Version 1.11.0 (25.05.2024)

**Individual Shiny Page:**

- Trainer staat nu vermeld bij informatie
- Train sprites van chorneef zijn ook toegevoegd (geen voor gen 2/7/8/9, deze gebruiken de laatst voorkomende gen)

**Individual Counter Page:**

- Increment kan worden aangepast door erop te klikken
- Thresholds kunnen worden aangepast door op de edit button naast de "Mean encounter time" te klikken.

**Dialogs & Forms:**

- Alle dialogs en forms zijn (onzichtbaar) aangepast (om mijn code leesbaar te houden). Zou kunnen dat er hierdoor nieuwe bugs zijn ingeslopen, laat die zo snel mogelijk weten.

---

### Version 1.10.0 (19.05.2024)

**Geolocation List:**

- "Vliegtuig" wordt nu uit de lijst gefilterd.

**Shiny Map:**

- Map start nu uitgezoomd op heel europa om zo alle shinies direct te zien zonder te moeten uitzoomen. Middelpunt van de kaart blijft Gent.

**Sprites:**

- Shiny Shellos & Gastrodon hebben nu de juiste sprite.

**Individual Shiny Page:**

- Link naar counter door ook counter icon te klikken
- Evolution/form button is aangepast
- Marks zijn vervangen door onderstaande. Ze kunnen nu ook verwijderd worden door op het kruisje te klikken bij het hoveren met muis (of klikker op gsm).
  - Specs
  - Ribbons
  - Marks
- Alle attributen die volgens mij aanspasbaar zijn, kunnen nu worden aangepast door op de edit button te klikken naast shiny information.

---

### Version 1.9.0 (09.05.2024)

**Counter Stats:**

- Percentage wordt nu berekend vanaf laatste shiny.

**Shiny Page:**

- Shiny Cards worden compacter weergegeven op gsm zodat alles beter zichtbaar is.

**Collections:**

- Select value blijft behouden bij het switchen tussen collections.

---

### Version 1.8.0 (06.05.2024)

**Dead Shiny's:**

- Dode Shiny's kunnen nu toegevoegd worden (al dan niet via een counter).

**Bug Fixes:**

- Lazy Loading

**Authentication:**

- Between back end and front end

**Hosting:**

- Auto Hosting

---

### Version 1.7.0 (01.04.2024)

**Collections:**

- Volgende collections zijn toegevoegd:
  - Mega Evolutions
  - Gigantamax Pokémon
  - Galarian Forms
  - Hisuian Forms
  - Pladean Forms
  - Eeveelutions
  - Unowns
  - Flabébés
  - Vivillons

**Create Shiny Form:**

- Shinies kunnen niet meer worden toegevoegd zonder eerst gender aan te klikken, om gender fouten te vermijden.
- Grouped shinies blijven nu in de form staan na submitten. Zo kunnen er meerdere radar pokemon snel na elkaar worden toegevoegd.

**Error Handeling:**

- Voor sommige errors is er nu een error pagina toegevoegd.

**Bug Fixes:**

- Bij het toevoegen van Shinies worden nu enkel de u eigen groups getoond, niemeer die van andere trainers.
- Leaflet logo is nu achter de topbar.
- Evolutions card bug gefixt waarbij altijd alle radar evolutions werden getoont bij bv Eevee en Tyrogue.

---

### Version 1.6.0 (11.03.2024)

**Collections:**

- Als waarde nul is, afbeelding wordt zwart
- Alolan collection toegevoegd

---

### Version 1.5.0 (03.03.2024)

**Counter:**

- Dag waarop het meeste gehunt is kan bekeken worden onder de encounter graph.

**Shiny Page (Bug Fix):**

- Als de shiny display cards een variabele hoogte hebben, werkt bij het wisselen van pagina's de scrollmemory niet meer. De evolutions shiny cards zijn nu allemaal dezelfde hoogte en wanneer de afbeeldingen niet op het scherm passen kan er gescrolld worden.

---

### Version 1.4.0 (28.02.2024)

**Odds Graph**

- Reference lijn op odds.
- Alle graphs zijn nu gelijk gescaled.

**Encounter Graph**

- Worden nu weergegeven in trainer kleuren.

**Bug Fixes:**

- Encounter graph toont nu ook de encounters als er maar 1 of twee dagen zijn gehunt.
- Als er meer dan 1000 encounters zijn worden die volledig op het scherm weergegeven op de encounter graph y-as.
- Performance verbetering shiny page met evolutions.

---

### Version 1.3.0 (25.02.2024)

**Shiny Page:**

- Evolutions en Forms kunnen nu op de homepage worden getoont, dit kan worden aangevinkt in de user info.
- Gegroepeerde shinies kunnen nu samen worden bekeken op de individuele shiny pagina.

**Collections:**

- Collections page is aangemaakt.
- Natures Collection kan nu worden bekeken, kan worden weergegeven voor iedereen of per trainer specifiek.
- Balls Collection kan nu worden bekeken, kan worden weergegeven voor iedereen of per trainer specifiek.

**Info:**

- Changelogs kunnen bekeken worden op de changelog page.

**Sidebar:**

- Herindeling Pokedex en information.

**Bugs:**

- Radar Shinies worden niet meer gegrouped in de checklist zodat evoluties wel zichtbaar zijn.
- Marks kunnen nu maar 1x toegevoegd worden.

---

### Version 1.2.0 (21.02.2024)

**Counters:**

- Counters kunnen alfabetisch gesorteerd worden.

**Search:**

- Counters kunnen ook gesearched worden via de search pagina.

---

### Version 1.1.0 (18.02.2024)

**Counter:**

- Omgerekende encounters (naar 1/8192) toegevoegd aan counter scherm (enkel bij counters waar de odds != 8192).
- Herindeling van extra informatie.
- Aantal keer de odds (odds / count) toegevoegd aan de extra informatie.

**Counter Stats:**

- Leaderboard met #Encounters kan nu het aantal encounters van gisteren weergeven.
- Leaderboard toegevoegd met totaal openstaande encounters omgerekend naar 8192.

**Shiny Page:**

- Homesprites kunnen nu vervangen worden door Gamesprites, dit kan worden aangepast op de userpage.
- Shinies kunnen alfabetisch gesorteerd worden.

**Map:**

- Markers voor 1 shiny zijn veranderd naar bolletjes met gekleurde rand en cijfer 1 in het midden.
- Op de marker popup kan nu de trainer en pokémon worden afgelezen ipv enkel de trainer.

**Shiny create form:**

- Verduidelijking toegevoegd bij random SOS Chain over welke chain length moet ingevuld worden.

---

### Version 1.0.0 (17.02.2024)

**Shiny Map:**

- Een Open Street Map is toegevoegd met markers waarop te zien is hoeveel shinies op welke locatie zijn gevangen.
- Op de individuele Shiny pagina is een kleine kaart toegevoegd met geo locatie. Op deze pagina kan de locatie ook worden aangepast.
- De create forms zijn aangepast zodat ook hier de geo locatie kan worden ingevuld.

**Counter:**

- Encounters per uur stat is toegevoegd aan informatie.

---

### Version 0.1.0 (15.02.2024)

De website voor het bijhouden van changelogs.
