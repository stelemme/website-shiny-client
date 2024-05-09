# Shiny Website Documentation

## Changelogs

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
