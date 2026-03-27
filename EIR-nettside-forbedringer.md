# EIR Trening — Konkrete forbedringer til utkastet

**Kontekst**: Dette dokumentet sammenligner det nåværende utkastet (eirtrening-nettside.vercel.app) med den opprinnelige siden (eirtrening.no) og gir spesifikke instruksjoner til Claude Code for hva som skal fikses, legges til, og endres.

**Sidestruktur i utkastet (bra — behold dette):**
- index.html (forside med #om, #timeplan som ankere)
- tilbud.html (medlemskap & priser)
- trenere.html (alle trenere i grid)
- kontakt.html (kontaktskjema)
- EIRbot chatbot (allerede implementert)

---

## 1. BUGS SOM MÅ FIKSES NÅ

### 1a. Timeplan-seksjonen er tom
`#timeplan`-ankeret på forsiden peker til en tom/blank seksjon med masse whitespace. Her skal det enten:
- Embeddes en timeplan fra FITR-bookingsystemet (iframe)
- ELLER bygges en statisk ukeoversikt over gruppetimer med dag/tid/type

Foreløpig løsning: Lag en enkel statisk ukeplan-tabell med de viktigste timene (FuncFit, HYROX, boksing, yoga, spinning, tai chi, mobilitet, powerwalk, seniortrening). Legg til tekst: "Se full timeplan og book din plass i FITR-appen" med lenke.

### 1b. Om oss-seksjonen (#om) mangler benefits-grid under første kort
Ved scroll vises kun det første benefit-kortet ("40+ gruppetimer per uke"), de 5 andre (Jacuzzi, Frokost, Bemannet, Klesvask, Terapi) rendres ikke synlig. Sjekk CSS — sannsynligvis en grid/flex-bug eller visibility/overflow-problem.

### 1c. Forsiden viser priser på 1 049,-/mnd for Basis
Det stemmer, men tilbudssiden viser også "Uten gruppetimer: 949,-/mnd". Pass på at prisene er konsistente overalt. Sjekk at alle priser matcher:
- Basis uten gruppe: 949,-
- EIR Basis: 1 049,-
- EIR PT1: 1 790,-
- EIR PT2: 2 490,-
- PT4 Total: 4 490,-
- All Inclusive VIP: fra 7 490,-

---

## 2. INNHOLD SOM MANGLER (og som finnes på originalen)

Kjerneproblemet med originalsiden er at alt innhold er spredt over 28+ sider i kaotiske dropdown-menyer. Utkastet ditt løser navigasjonen, men har kastet vekk for mye av selve innholdet. Her er hva som må inn og HVOR det skal plasseres:

### 2a. Treningsformer — legg til seksjon på tilbud.html
Under prissammenligningen og FAQ, legg til en ny seksjon: **"Vårt treningstilbud"**

Vis alle treningsformer som et responsivt grid med kort (bilde + tittel + 2-3 linjer). INGEN separate sider — alt på én side:

**Kort som skal lages:**
- **FuncFit®** — Functional Fitness. CrossFit-elementer, vektløfting, spensttrening, kettlebell, calisthenics. Alle nivåer. Trenere: Marius, Joacim, Tina.
- **HYROX** — Offisiell HYROX partner gym. Løping + funksjonelle stasjoner. Offisiell programmering. Introkurs tilgjengelig.
- **Boksing** — Boksetimer for alle nivåer.
- **Yoga** — Ulike yogaformer tilpasset alle.
- **Spinning** — Innendørs sykling i dedikert spinningsal.
- **Tai Chi** — Rolig treningsform for balanse og mindfulness.
- **Mobilitetstrening** — Fokus på bevegelighet og smertefri bevegelse.
- **Powerwalk & løping** — Utendørs og innendørs.
- **Seniortrening / Hverdagssterk** — Tilpasset eldre som vil fungere bedre i hverdagen.

**FuncFit og HYROX** er EIRs viktigste differensiatorer. Disse to kortene bør være større/mer fremtredende enn de andre, og ha en "Les mer"-knapp som ekspanderer mer tekst (accordion), IKKE en egen side.

FuncFit utvidet innhold:
- Eget varemerke utviklet av EIR
- Basert på CrossFit-elementer, vektløfting, spensttrening, kettlebell, calisthenics, strongman
- Timer: FuncFit® Partner WOD (60 min partrening), FuncFit® WOD (Workout of the Day)
- Passer alle nivåer — alle øvelser tilpasses
- Trenere: Marius Olsen (CrossFit Games-erfaring), Joacim Junhov-Rindberg, Tina Wingereid (prof. turner)

HYROX utvidet innhold:
- Verdensomspennende fitnesskonkurranse: løping + 8 funksjonelle stasjoner
- EIR følger offisiell HYROX-programmering
- Medlemsfordeler: 48 timers fortrinnsrett på konkurransepåmelding, 10% rabattkode
- Konkurransekategorier: Singles, Relay, Doubles, Adaptive
- Introkurs for nybegynnere
- Kommunikasjon via FITR-portalen

### 2b. Bedriftstrening — legg til seksjon på tilbud.html
Etter treningsformene, en egen seksjon:

**"Bedriftstrening"**
- Kort intro: reduser sykefravær, øk trivsel
- 1:1 eller gruppe — skreddersydde opplegg
- Skjermet PT-område
- Tverrfaglig team: PT + fysioterapeut + kiropraktor + akupunktør
- CTA: "Book uforpliktende møte" (lenke til kontaktskjemaet)

### 2c. Kapabel Helse — legg til seksjon på tilbud.html
**"Trening + terapi under ett tak"**
- Kapabel Helse holder til i EIRs lokaler
- Kiropraktor: behandling av muskler/ledd, diagnostikk, rehabilitering
- Akupunktør: smertetilstander (hodepine, rygg, nakke, skulder, kne), MAF-medlem
- Terapeutisk massasje: inkludert i All Inclusive-medlemskap
- Alle medlemmer: rabatt på førstegangskonsultasjon
- Lenke: kapabelhelse.no

### 2d. Kickstart-program — nevn i treningsform-grid
Legg til et kort: **"Kickstart"** — Nybegynnerprogram for deg som vil komme i gang med trening. Strukturert opplegg med personlig oppfølging.

### 2e. Trenere-siden — legg til mer bio-innhold
Trenere-siden har riktig layout (grid med kort), men bio-tekstene er veldig korte (1-2 linjer). Legg til en "Les mer"-accordion per trener med:
- Utdanning/sertifiseringer
- Idrettsbakgrunn
- Spesialisering i mer detalj

Eksempel for Darren:
- Tidligere profesjonell hockeyspiller fra Toronto, Canada
- PT siden 2004
- Sportssjef for Stjernen Hockey Elite
- NHL training camp-erfaring (St. Louis Blues, Toronto Maple Leafs)

Alle 9 trenere: Darren, Hans Henry, Joacim, Marius, Nadin, Roger, Rolf, Sander, Sigurd

### 2f. Om oss — utvid seksjonen
#om-seksjonen på forsiden har kun benefits-grid. Legg til under griden:
- 2-3 avsnitt om EIRs filosofi/visjon (hent fra eirtrening.no/om/)
- Bildegalleri av fasiliteter (finnes allerede delvis)

---

## 3. FORBEDRINGER TIL EKSISTERENDE INNHOLD

### 3a. Forsiden — legg til treningsform-teaser
Mellom benefits-griden og medlemskap-kortene, legg til en seksjon:
**"40+ gruppetimer per uke"** med et horisontalt scrollbart bånd av ikoner/labels for treningsformene (FuncFit, HYROX, Boksing, Yoga, Spinning, etc.) som lenker til tilbud.html#treningsformer

### 3b. Tilbud-siden — rekkefølge
Reorganiser tilbud.html i denne rekkefølgen:
1. Hero (beholdes)
2. Prissammenligningstabell (beholdes)
3. Treningsformer-grid (NYTT)
4. Bedriftstrening (NYTT)
5. Kapabel Helse (NYTT)
6. FAQ (beholdes — legg til flere spørsmål)
7. CTA: Book prøvetime

### 3c. FAQ — legg til flere spørsmål
Nåværende FAQ har 5 spørsmål. Legg til:
- "Hvilke gruppetimer tilbyr dere?" → Kort oversikt + lenke til timeplan
- "Har dere behandlere (fysio, kiro)?" → Kapabel Helse-info
- "Tilbyr dere bedriftstrening?" → Ja + lenke til seksjon
- "Hva er FuncFit?" → Kort forklaring
- "Hvordan fungerer HYROX-treningen?" → Kort forklaring

### 3d. Kontakt-siden — legg til kart og mer info
- Google Maps embed (Tomteveien 31A, 1618 Fredrikstad)
- Legg til seksjon for "Jobbmuligheter" (kort tekst: "Vi ser alltid etter dyktige trenere. Send CV til post@eirtrening.no")

### 3e. Chatbot — utvid kunnskapsbasen
EIRbot er implementert, men sjekk at den har kunnskap om:
- Alle 9 treneres spesialiseringer
- FuncFit-detaljer (Partner WOD, WOD, trenere)
- HYROX-fordeler (48t fortrinnsrett, 10% rabatt, introkurs)
- Kapabel Helse-tjenester
- Bedriftstrening
- Kickstart-programmet
- Alle priser (alle 6 nivåer)

---

## 4. NAV-STRUKTUR (behold som den er)

Nåværende nav er riktig:
```
[EIR logo]  OM OSS | TILBUD | TRENERE | TIMEPLAN | KONTAKT  [PRØV GRATIS →]
```

INGEN dropdowns. Flat struktur. Det er hele poenget.

- OM OSS → anker #om på forsiden
- TILBUD → tilbud.html (alt om priser, treningsformer, bedrift, Kapabel)
- TRENERE → trenere.html (alle trenere i grid)
- TIMEPLAN → anker #timeplan på forsiden (eller egen timeplan.html hvis FITR-embed krever det)
- KONTAKT → kontakt.html
- PRØV GRATIS → kontakt.html med skjema i fokus

Legg til "MIN SIDE" i footer (lenke til FITR-innlogging for eksisterende medlemmer).

---

## 5. DESIGN-NOTATER

Utkastet ser bra ut visuelt. Beholdt:
- Fargepalett: #D4772C (oransje), #2C2C2C, #F5F0EB (beige)
- Typografi: clean og moderne
- Scroll-animasjoner (fade-up)
- Sticky header med transparent → solid

Forbedringer:
- Bildene på trenere-siden er placeholder-stockbilder — bytt med faktiske bilder av EIR-trenerne
- Facility-galleriet trenger faktiske bilder fra EIR (sal, FuncFit-rom, garderobe, jacuzzi, PT-rom, spinningsal)

---

## 6. PRIORITERT REKKEFØLGE FOR IMPLEMENTERING

1. **Fiks bugs** (timeplan tom, benefits-grid rendring)
2. **Legg til treningsformer-grid** på tilbud.html
3. **Legg til Bedriftstrening + Kapabel Helse** på tilbud.html
4. **Utvid trenere-bios** med accordion
5. **Utvid FAQ** med flere spørsmål
6. **Google Maps** på kontakt
7. **Oppdater chatbot** kunnskapsbase
8. **Bytt stockbilder** med faktiske EIR-bilder
