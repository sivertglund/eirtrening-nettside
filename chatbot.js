// EIR Trening Chatbot — regelbasert med fuzzy matching
(function() {
  const knowledge = [
    {
      keywords: ['pris', 'kost', 'medlemskap', 'hvor mye', 'hva koster', 'billig', 'dyr'],
      answer: 'Vi har flere medlemskap:\n\n• <b>Basis uten gruppe</b>: 949,-/mnd — egentrening + alle fasiliteter\n• <b>EIR Basis</b>: 1 049,-/mnd — + 40+ gruppetimer/uke\n• <b>EIR PT1</b>: 1 790,-/mnd — + 1 PT-time/mnd\n• <b>EIR PT2</b>: 2 490,-/mnd — + 2 PT-timer/mnd\n• <b>PT4 Total</b>: 4 490,-/mnd — 1 PT-time/uke + online coaching ⭐\n• <b>All Inclusive VIP</b>: fra 7 490,-/mnd — alt inkludert\n\nAlle priser: fri innmelding, ingen bindingstid! Vil du booke en gratis prøvetime?'
    },
    {
      keywords: ['basis', '949', '1049', '1 049'],
      answer: '<b>EIR Basis</b> koster 1 049,-/mnd og inkluderer egentrening, 40+ gruppetimer per uke, frokost, kaffe/te, frukt, vafler, håndklær, Rituals-produkter, jacuzzi, badstue og kuldekulper.\n\nBasis uten gruppetimer koster 949,-/mnd. Skal jeg hjelpe deg med å booke en gratis prøvetime?'
    },
    {
      keywords: ['pt1', '1790', '1 790', 'pt 1'],
      answer: '<b>EIR PT1</b> koster 1 790,-/mnd (inkl. medlemsavgift 990,-). Du får 1 PT-time per måned med en av våre erfarne personlige trenere, pluss alt som er inkludert i Basis-medlemskapet. Vil du vite mer?'
    },
    {
      keywords: ['pt2', '2490', '2 490', 'pt 2'],
      answer: '<b>EIR PT2</b> koster 2 490,-/mnd (inkl. medlemsavgift 990,-). Du får 2 PT-timer per måned — perfekt for deg som ønsker jevnlig oppfølging. Også tilgjengelig som PT Duo (2 personer med 1 PT).'
    },
    {
      keywords: ['pt4', '4490', '4 490', 'total', 'populær'],
      answer: '<b>PT4 Total</b> er vårt mest populære tilbud til 4 490,-/mnd (inkl. medlemsavgift 990,-). Du får 1 PT-time per uke, online coaching ved reise/ferie, og alt fra Basis. Også tilgjengelig som PT Duo!'
    },
    {
      keywords: ['all inclusive', 'vip', '7490', '7 490'],
      answer: '<b>All Inclusive PT8 VIP</b> fra 7 490,-/mnd er vår ultimate pakke:\n\n• 2-3 PT-timer/uke\n• Månedlig behandling hos Kapabel Helse\n• Vi vasker treningstøyet ditt\n• Kostholdsplan\n• Personlig garderobeskap\n• Online coaching\n\nDen ultimate treningsopplevelsen! Vil du booke en omvisning?'
    },
    {
      keywords: ['duo', 'to personer', 'sammen', 'trene sammen'],
      answer: '<b>PT Duo</b> lar 2 personer trene med 1 PT til en gunstigere pris per person. Tilgjengelig for PT2 og PT4-medlemskap. Kontakt oss for eksakt pris!'
    },
    {
      keywords: ['inkludert', 'alle får', 'fasiliteter', 'hva inkluderer', 'hva inngår'],
      answer: 'Alle våre medlemmer får:\n\n• Alltid bemannet senter\n• Gratis frokost (hverdager 06:30-08:30)\n• Kaffe, te, frukt og vafler\n• Rene håndklær og Rituals-toalettartikler\n• Jacuzzi, badstue og kuldekulper\n• Rabatt på kiropraktor/akupunktør hos Kapabel Helse\n\nSkal jeg hjelpe deg med noe mer?'
    },
    {
      keywords: ['åpningstid', 'åpent', 'stengt', 'lukket', 'åpner', 'stenger', 'når'],
      answer: '🕐 Våre åpningstider:\n\n• Mandag–Torsdag: 06:00–22:00\n• Fredag: 06:00–21:00\n• Lørdag: 09:00–17:00\n• Søndag: 10:00–18:00\n\nVi er alltid bemannet i åpningstiden!'
    },
    {
      keywords: ['hvor', 'adresse', 'lokasjon', 'beliggenhet', 'kart', 'finne dere', 'veibeskrivelse'],
      answer: '📍 Du finner oss i <b>Tomteveien 31A, 1618 Fredrikstad</b>.\n\n<a href="https://www.google.com/maps/search/?api=1&query=EIR%20Trening%2C%20Tomteveien%2031A%2C%201618%20Fredrikstad%2C%20Norway" target="_blank" style="color:#D4772C">Åpne i Google Maps →</a>\n\nVelkommen innom!'
    },
    {
      keywords: ['kontakt', 'telefon', 'ring', 'epost', 'e-post', 'mail'],
      answer: 'Du kan nå oss på:\n\n📞 <a href="tel:99257000" style="color:#D4772C">99 25 70 00</a>\n✉️ <a href="mailto:post@eirtrening.no" style="color:#D4772C">post@eirtrening.no</a>\n\nEller følg oss på Facebook og Instagram: @eirtrening'
    },
    {
      keywords: ['gruppetime', 'gruppe', 'timer', 'timeplan', 'klasser'],
      answer: 'Vi har over <b>40+ gruppetimer per uke</b>! Blant annet:\n\n• FuncFit® (vår egen Functional Fitness)\n• HYROX Training Club\n• Boksing\n• Yoga\n• Tai Chi\n• Spinning/Sykling\n• Mobilitetstrening\n• Seniortrening\n• Powerwalk & løping\n\nTimeplanen finner du på nettsiden vår. Vil du prøve en time gratis?'
    },
    {
      keywords: ['hyrox', 'konkurranse'],
      answer: '🏆 EIR Trening er <b>offisiell HYROX Training Club</b>! Vi tilbyr dedikerte HYROX-treningsøkter for deg som vil konkurrere eller bare utfordre deg selv. Perfekt forberedelse til HYROX-løp!'
    },
    {
      keywords: ['funcfit', 'functional', 'funksjonell'],
      answer: '<b>FuncFit®</b> er vårt eget varemerke for Functional Fitness gruppetimer. Varierte, intense og effektive økter som bygger styrke, utholdenhet og mobilitet. Prøv det gratis!'
    },
    {
      keywords: ['pt', 'personlig trener', 'trener', 'personal'],
      answer: 'Vi har erfarne personlige trenere som lager skreddersydde trenings- og kostholdsplaner for deg. PT er tilgjengelig som tillegg til alle medlemskap, fra 1 time/mnd til 2-3 timer/uke. Vi har også eget lukket PT-rom for privathet.'
    },
    {
      keywords: ['jacuzzi', 'badstue', 'sauna', 'kulde', 'spa', 'wellness', 'avslapning'],
      answer: '🧖 Alle medlemmer har tilgang til:\n\n• Jacuzzi\n• Badstue\n• Kuldekulper\n\nPerfekt for restitusjon etter trening! Dette er inkludert i alle medlemskap.'
    },
    {
      keywords: ['frokost', 'mat', 'kaffe', 'te', 'frukt', 'vaffel', 'spise'],
      answer: '🍳 Gratis frokost serveres hver hverdag fra 06:30 til 08:30! I tillegg har vi alltid gratis kaffe, te, frukt og vafler tilgjengelig for alle medlemmer. Matvarene er fra Fifty3020 — rene råvarer uten tilsetningsstoffer.'
    },
    {
      keywords: ['kiropraktor', 'akupunktør', 'fysioterapeut', 'kapabel', 'behandling', 'terapi', 'helse'],
      answer: 'Vi samarbeider med <b>Kapabel Helse</b> som holder til i våre lokaler:\n\n• Kiropraktor\n• Akupunktør\n• Fysioterapeut\n\nAlle medlemmer får rabatt på førstegangskonsultasjon. All Inclusive-medlemmer får månedlig behandling inkludert!'
    },
    {
      keywords: ['fifty3020', 'fifty', '3020', 'matvare', 'tilsetning'],
      answer: '<b>Fifty3020</b> er matvarekonseptet vi bruker — rene råvarer uten tilsetningsstoffer. Kvalitetsmat for deg som tar trening og helse på alvor!'
    },
    {
      keywords: ['bindingstid', 'binde', 'oppsigelse', 'si opp', 'avtal'],
      answer: 'Nei, vi har <b>ingen bindingstid</b> og <b>fri innmelding</b> på alle medlemskap! Du kan si opp når du vil.'
    },
    {
      keywords: ['fryse', 'frys', 'pause', 'stoppe'],
      answer: 'Ja, det er mulig å fryse medlemskapet. Kontakt oss på telefon 99 25 70 00 eller e-post post@eirtrening.no for detaljer om hvordan dette fungerer.'
    },
    {
      keywords: ['prøv', 'gratis', 'test', 'omvisning', 'besøk', 'prøvetime'],
      answer: '🎉 Selvfølgelig! Vi tilbyr <b>gratis prøvetime og omvisning</b> for alle som er interessert. Kontakt oss for å avtale tid:\n\n📞 99 25 70 00\n✉️ post@eirtrening.no\n\nVi gleder oss til å vise deg senteret!'
    },
    {
      keywords: ['eir', 'hva betyr', 'navn', 'historie', 'om dere', 'norrøn'],
      answer: '<b>EIR</b> er oppkalt etter den norrøne guddinnen for helse. Vi er et premium treningssenter i Fredrikstad med begrenset antall medlemmer, bygget på konseptet "det lille ekstra" — hverdagsluksus i et personlig miljø.'
    },
    {
      keywords: ['hei', 'hallo', 'heisann', 'heihei', 'god dag', 'morn', 'yo', 'heia'],
      answer: 'Hei! 👋 Velkommen! Hva kan jeg hjelpe deg med? Jeg kan svare på spørsmål om medlemskap, priser, gruppetimer, åpningstider og alt annet om EIR Trening.'
    },
    {
      keywords: ['takk', 'tusen takk', 'flott', 'fint', 'supert'],
      answer: 'Bare hyggelig! 😊 Er det noe annet jeg kan hjelpe deg med? Du er alltid velkommen til å kontakte oss på 99 25 70 00 eller booke en gratis prøvetime!'
    },
    {
      keywords: ['klesvask', 'vask', 'treningstøy', 'vaske'],
      answer: 'Med vårt <b>All Inclusive VIP</b>-medlemskap (fra 7 490,-/mnd) vasker vi treningstøyet ditt! Du leverer det inn, og det er rent og klart neste gang du kommer. Hverdagsluksus!'
    },
    {
      keywords: ['garderobe', 'skap', 'oppbevaring'],
      answer: 'Alle medlemmer har tilgang til garderober med rene håndklær og Rituals-toalettartikler. Med <b>All Inclusive VIP</b> får du ditt eget personlige garderobeskap!'
    },
    {
      keywords: ['darren', 'hockey', 'canada'],
      answer: '<b>Darren</b> er tidligere profesjonell hockeyspiller fra Toronto, Canada. Han har vært PT siden 2004, er sportssjef for Stjernen Hockey Elite, og har NHL training camp-erfaring med St. Louis Blues og Toronto Maple Leafs. Spesialisering: styrke, funksjonell trening og idrettsprestasjoner.'
    },
    {
      keywords: ['marius', 'crossfit games'],
      answer: '<b>Marius</b> har CrossFit Games-erfaring og er instruktør og utvikler av FuncFit-konseptet hos EIR. Han spesialiserer seg på vektløfting og funksjonell trening.'
    },
    {
      keywords: ['joacim'],
      answer: '<b>Joacim</b> er HYROX-spesialist og FuncFit-instruktør med erfaring innen konkurranseforberedelse. Fokus på utholdenhet og funksjonell kapasitet.'
    },
    {
      keywords: ['nadin'],
      answer: '<b>Nadin</b> kombinerer trening og ernæring. Sertifisert innen ernæring med spesialisering på vektnedgang og livsstilsendring.'
    },
    {
      keywords: ['partner wod', 'wod', 'funcfit timer'],
      answer: 'FuncFit® har flere timetyper:\n\n• <b>FuncFit® WOD</b> — Workout of the Day\n• <b>FuncFit® Partner WOD</b> — 60 min partrening\n\nAlle øvelser tilpasses ditt nivå. Trenere: Marius (CrossFit Games-erfaring), Joacim, og Tina Wingereid (prof. turner).'
    },
    {
      keywords: ['hyrox fordel', 'hyrox rabatt', 'hyrox påmelding', 'fortrinnsrett'],
      answer: 'Som HYROX-medlem hos EIR får du:\n\n• 48 timers fortrinnsrett på konkurransepåmelding\n• 10% rabattkode\n• Offisiell HYROX-programmering\n• Introkurs for nybegynnere\n• Kategorier: Singles, Relay, Doubles, Adaptive\n\nKommunikasjon skjer via FITR-portalen.'
    },
    {
      keywords: ['bedrift', 'firma', 'sykefravær', 'ansatte', 'corporate'],
      answer: 'Vi tilbyr <b>bedriftstrening</b> — skreddersydde opplegg for å redusere sykefravær og øke trivsel:\n\n• 1:1 eller gruppetrening\n• Skjermet PT-område for privathet\n• Tverrfaglig team: PT + fysioterapeut + kiropraktor + akupunktør\n\nKontakt oss for et uforpliktende møte!'
    },
    {
      keywords: ['kickstart', 'nybegynner', 'komme i gang', 'starte'],
      answer: '<b>Kickstart</b> er vårt nybegynnerprogram for deg som vil komme i gang med trening. Et strukturert opplegg med personlig oppfølging som gir deg en trygg og effektiv start. Perfekt om du er ny på trening eller har hatt en lang pause.'
    },
    {
      keywords: ['trenere', 'hvem trener', 'hvor mange trenere'],
      answer: 'Vi har 9 erfarne personlige trenere:\n\n• <b>Darren</b> — Styrke, funksjonell (tidl. NHL)\n• <b>Hans Henry</b> — Rehabilitering\n• <b>Joacim</b> — HYROX, utholdenhet\n• <b>Marius</b> — FuncFit, CrossFit Games\n• <b>Nadin</b> — Kosthold, vektnedgang\n• <b>Roger</b> — Seniortrening, mobilitet\n• <b>Rolf</b> — Styrke, hypertrofi\n• <b>Sander</b> — HYROX, FuncFit\n• <b>Sigurd</b> — Idrettsprestasjoner\n\nSe alle på trenere-siden!'
    },
    {
      keywords: ['rituals', 'håndkle', 'toalett'],
      answer: 'Alle medlemmer får rene håndklær og toalettartikler fra <b>Rituals</b> — inkludert i alle medlemskap. Premium hverdagsluksus!'
    },
    {
      keywords: ['jobb', 'jobbe', 'stilling', 'ledig', 'cv'],
      answer: 'Vi ser alltid etter dyktige og engasjerte trenere! Send din CV til <a href="mailto:post@eirtrening.no" style="color:#D4772C">post@eirtrening.no</a> så tar vi kontakt.'
    }
  ];

  function findAnswer(input) {
    const q = input.toLowerCase().replace(/[?!.,]/g, '');
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of knowledge) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (q.includes(keyword)) {
          score += keyword.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.answer;
    }

    return 'Det har jeg dessverre ikke svar på akkurat nå. Kontakt oss gjerne på telefon <a href="tel:99257000" style="color:#D4772C">99 25 70 00</a> eller e-post <a href="mailto:post@eirtrening.no" style="color:#D4772C">post@eirtrening.no</a>, så hjelper vi deg! 😊';
  }

  // Inject HTML
  const chatHTML = `
    <div class="chatbot-hint" id="chatbotHint">
      <span>Lurer du på noe? Spør <b>EIRbot</b></span>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
      </svg>
    </div>
    <button class="chatbot-toggle" id="chatbotToggle" aria-label="Åpne chat">
      <svg viewBox="0 0 40 40" fill="none">
        <!-- Diamond head (EIR-style) -->
        <path d="M20 6 L32 18 Q33 19 32 20 L22 30 Q21 31 20 30 L10 20 Q9 19 10 18 L20 8 Q20 7 20 6 Z" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="1.5"/>
        <!-- Eyes -->
        <circle cx="16" cy="18" r="1.8" fill="white"/>
        <circle cx="24" cy="18" r="1.8" fill="white"/>
        <!-- Smile -->
        <path d="M16 22.5 Q20 26 24 22.5" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <!-- Antenna -->
        <line x1="20" y1="6" x2="20" y2="2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="20" cy="1.5" r="1.5" fill="white"/>
      </svg>
    </button>
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <div class="chatbot-header-avatar">
          <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
            <path d="M20 8 L30 18 Q31 19 30 20 L22 28 Q21 29 20 28 L12 20 Q11 19 12 18 L20 10 Q20 9 20 8 Z" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="1.5"/>
            <circle cx="17" cy="18.5" r="1.5" fill="white"/><circle cx="23" cy="18.5" r="1.5" fill="white"/>
            <path d="M17 22 Q20 25 23 22" stroke="white" stroke-width="1.3" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <div class="chatbot-header-info">
          <h4>EIR-assistenten</h4>
          <span>Alltid klar til å hjelpe</span>
        </div>
      </div>
      <div class="chatbot-messages" id="chatMessages">
        <div class="chat-message chat-bot">Hei! 👋 Jeg er EIR-assistenten. Jeg kan hjelpe deg med spørsmål om medlemskap, priser, gruppetimer, åpningstider og alt annet om EIR Trening. Hva lurer du på?</div>
      </div>
      <div class="chatbot-input">
        <input type="text" id="chatInput" placeholder="Skriv en melding..." autocomplete="off">
        <button id="chatSend">Send</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const toggle = document.getElementById('chatbotToggle');
  const window_ = document.getElementById('chatbotWindow');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const hint = document.getElementById('chatbotHint');

  // Show hint after loader with delay
  setTimeout(() => hint.classList.add('visible'), 2800);

  // Hide hint on scroll
  let hintHidden = false;
  window.addEventListener('scroll', () => {
    if (!hintHidden && window.scrollY > 200) {
      hint.classList.remove('visible');
      hint.classList.add('hidden');
      hintHidden = true;
    } else if (hintHidden && window.scrollY <= 100) {
      hint.classList.remove('hidden');
      hint.classList.add('visible');
      hintHidden = false;
    }
  }, { passive: true });

  // Hint click opens chat
  hint.addEventListener('click', () => {
    window_.classList.add('open');
    hint.classList.remove('visible');
    hint.classList.add('hidden');
    hintHidden = true;
    input.focus();
  });

  toggle.addEventListener('click', () => {
    window_.classList.toggle('open');
    if (window_.classList.contains('open')) {
      hint.classList.remove('visible');
      hint.classList.add('hidden');
      hintHidden = true;
      input.focus();
    }
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    messages.insertAdjacentHTML('beforeend',
      `<div class="chat-message chat-user">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`
    );
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(text);
      messages.insertAdjacentHTML('beforeend',
        `<div class="chat-message chat-bot">${answer}</div>`
      );
      messages.scrollTop = messages.scrollHeight;
    }, 400 + Math.random() * 400);
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
