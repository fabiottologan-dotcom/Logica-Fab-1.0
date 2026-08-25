// Stato di gioco locale
let gameState = {
    currentStep: 1,
    cluesFound: [],
    moralChoices: []
};

const puzzles = [
    // --- CAPITOLO 1: OAKHAVEN E IL SALOON ---
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 1: Il Mordoku del Poker",
        text: "Thomas 'Mani Veloci' Vance è stato trovato morto nella stanza al piano di sopra del Saloon. Prima di accusare qualcuno, devi ricostruire la griglia degli indizi usando il tuo taccuino.",
        notebook: `<b>ELEMENTI DEL CASELLO (Griglia 4x4):</b><br>
• <b>Sospettati:</b> Blackwood, Calamity Jane (Ballerina), Doc Holliday (Medico), Kid Colt (Fuorilegge)<br>
• <b>Luoghi:</b> Piano Superiore, Tavolo da Poker, Stalla, Bancone<br>
• <b>Oggetti/Armi:</b> Mazzo Truccato, Orologio d'Oro, Boccetta di Veleno, Pistola Calibro 45<br><br>
<b>INDIZI RACCOLTI:</b><br>
1. Blackwood non si è mai alzato dal Tavolo da Poker e non possedeva il Mazzo Truccato.<br>
2. Chi aveva la Boccetta di Veleno si trovava alla Stalla prima di mezzanotte.<br>
3. La Ballerina ha visto il Medico vicino alla Stalla prima di salire le scale al Piano Superiore.<br>
4. La persona al Piano Superiore non aveva con sé la Pistola Calibro 45.<br><br>
<i>Quesito: Chi si trovava al Piano Superiore al momento del delitto?</i>`,
        type: "choice",
        options: ["Blackwood", "Ballerina", "Medico", "Fuorilegge"],
        answer: "Ballerina",
        feedback: "Corretto! Incrociando gli indizi, Calamity Jane la Ballerina era al piano superiore con il Mazzo Truccato (senza armi da fuoco o veleno)."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 2: La Cassaforte di Vance",
        text: "Hai confermato che la Ballerina non aveva armi. Ora devi aprire la cassaforte in ghisa nella stanza della vittima.",
        notebook: `<b>APPUNTI SULLA CASSAFORTE:</b><br>
Un messaggio inciso sul legno recita:<br>
• <b>1ª Cifra:</b> L'ora di chiusura del saloon (Il cartello indica chiusura alle ore 02:00 -> <b>2</b>).<br>
• <b>2ª Cifra:</b> Numero di Carte Vincenti (Assi) nella mano da poker sul tavolo (Ci sono 3 Assi -> <b>3</b>).<br>
• <b>3ª Cifra:</b> Il doppio delle monete d'argento trovate nelle tasche di Vance (Ha 4 monete, 4 x 2 = <b>8</b>).<br><br>
<i>Inserisci il codice di sblocco a 3 cifre.</i>`,
        type: "input",
        answer: "238",
        feedback: "CLACK! La cassaforte si apre rivelando l'atto di proprietà della miniera falsificato dal Sindaco."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 3: Il Telegramma Cifrato",
        text: "Nella cassaforte trovi un messaggio cifrato indirizzato al Sindaco relativo all'esproprio delle terre.",
        notebook: `<b>DECIFRAZIONE TELEGRAMMA:</b><br>
Il testo è cifrato con scorrimento alfabetico semplice (+1). Per ogni lettera del messaggio cifrato, torna indietro di 1 posizione nell'alfabeto:<br><br>
• <b>M</b> -> L<br>
• <b>J</b> -> I<br>
• <b>O</b> -> N<br>
• <b>F</b> -> E<br>
• <b>B</b> -> A<br><br>
<i>Scrivi la parola decifrata di 5 lettere.</i>`,
        type: "input",
        answer: "LINEA",
        feedback: "Decifrato! Il messaggio fa riferimento alla nuova 'LINEA' ferroviaria pianificata."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 4: L'Orario del Treno",
        text: "Vance voleva fuggire da Oakhaven prendendo il treno merci prima di essere avvelenato.",
        notebook: `<b>ORARI DELLA STAZIONE:</b><br>
• Il primo treno merci parte alle ore <b>06:00</b> del mattino.<br>
• I treni successivi partono esattamente ogni <b>90 minuti</b> (1 ora e 30 minuti).<br>
• Vance aveva acquistato il biglietto per il <b>4° treno</b> della giornata.<br><br>
• 1° Treno: 06:00<br>
• 2° Treno: 07:30<br>
• 3° Treno: 09:00<br>
• 4° Treno: ?<br><br>
<i>Qual è l'orario di partenza del 4° treno? (Formato HH:MM)</i>`,
        type: "input",
        answer: "10:30",
        feedback: "Esatto! Il 4° treno partiva alle 10:30."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 5: La Prima Sentenza",
        text: "Hai scoperto che la Ballerina ha rubato l'atto per proteggere la sua famiglia, mentre l'esecutore materiale dell'avvelenamento è il Medico su ordine del Sindaco.",
        notebook: `<b>SOMMARIO DEL CASO 1:</b><br>
• <b>Calamity Jane (Ballerina):</b> Colpevole di furto dell'atto falsificato, ma innocente per l'omicidio.<br>
• <b>Doc Holliday (Medico):</b> Ha preparato la boccetta di veleno.<br><br>
<b>LA TUA DECISIONE:</b><br>
Puoi applicare la legge alla lettera o fare una scelta di giustizia personale.`,
        type: "choice",
        options: ["Arrestala per Furto", "Lasciala Fuggire con l'Atto"],
        answer: "Lasciala Fuggire con l'Atto",
        isMoral: true
    },

    // --- CAPITOLO 2: LA RAPINA ALLA DILIGENZA ---
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 6: Impronte nel Fango",
        text: "La diligenza d'argento diretta alla miniera è stata assalita lungo la gola.",
        notebook: `<b>SCENA DEL CRIMINE - IMPRONTE:</b><br>
• Il conducente calza stivali taglia 42.<br>
• Sono presenti impronte di 4 cavalli.<br>
• L'assalitore di sinistra ha uno sperone spezzato.<br>
• L'assalitore di destra (scagnozzo del Sindaco) lascia un'impronta profonda con un tacco rinforzato in ferro taglia 45.<br><br>
<i>Quale taglia di stivali devi cercare nel registro dello stallaio?</i>`,
        type: "choice",
        options: ["Taglia 40", "Taglia 42", "Taglia 45", "Taglia 48"],
        answer: "Taglia 45",
        feedback: "Ottimo occhio! Il sospettato calza la Taglia 45."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 7: Il Cifrario della Cassetta",
        text: "Hai recuperato la cassetta blindata della diligenza ma ha una serratura a lettere.",
        notebook: `<b>SERRATURA A LETTERE (4 Cifre):</b><br>
Sul retro della cassetta è incisa la bussola dei fuorilegge:<br>
• "Se il sole tramonta a WEST, la soluzione si trova nel punto cardinale opposto".<br><br>
<i>Inserisci la parola d'ordine di 4 lettere in inglese (Opposto di WEST).</i>`,
        type: "input",
        answer: "EAST",
        feedback: "CLICK! La cassetta si apre rivelando le ricevute di pagamento dei sicari."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 8: Il Calcolo del Peso dell'Oro",
        text: "I banditi hanno dovuto abbandonare parte del bottino durante la fuga a cavallo.",
        notebook: `<b>DATI DI CARICO:</b><br>
• Bottino totale: 3 Lingotti Grandi (10 kg l'uno = 30 kg) + 4 Lingotti Piccoli (5 kg l'uno = 20 kg). Totale = 50 kg.<br>
• Il cavallo di fuga poteva trasportare al massimo 35 kg di carico utile.<br><br>
<i>Quanti kg di oro hanno dovuto abbandonare sul sentiero?</i>`,
        type: "input",
        answer: "15",
        feedback: "Esatto! (30 + 20) - 35 = 15 kg di oro ritrovati nel fango."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 9: Mordoku dei Sospetti di Frontiera",
        text: "Incrocia i sospettati trovati al saloon della stazione.",
        notebook: `<b>ELEMENTI MORDOKU:</b><br>
• <b>Sospettati:</b> Bill il Rosso, Barista, Stallaio, Vice Sceriffo.<br>
• <b>Abitudini:</b> Beve Whisky, Beve Latte, Non Beve Alcol, Beve Birra.<br>
• <b>Calzature:</b> Tacco in Ferro (Tg 45), Stivali Normali, Sperone Spezzato, Scarpe Basse.<br><br>
<b>INDIZI:</b><br>
1. Bill il Rosso non sa cavalcare e beve solo Whisky.<br>
2. Il Barista era al bancone e indossa Scarpe Basse.<br>
3. L'Uomo con il Tacco in Ferro beve esclusivamente Latte al bar.<br>
4. Lo Stallaio è l'unico astemio del villaggio e non tocca mai alcolici.<br><br>
<i>Chi è l'assalitore con il Tacco in Ferro?</i>`,
        type: "choice",
        options: ["Bill il Rosso", "Il Barista", "Lo Stallaio", "Il Vice Sceriffo"],
        answer: "Lo Stallaio",
        feedback: "Incastrato! Lo Stallaio calza la taglia 45 e beve solo latte."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 10: Decisione al Canyon",
        text: "Lo Stallaio confessa di essere stato ricattato: rubava per saldare i debiti di suo fratello preso in ostaggio dalla banda del Sindaco.",
        notebook: `<b>SOMMARIO DEL CASO 2:</b><br>
Lo Stallaio ha eseguito l'assalto ma è pronto a collaborare per salvare il fratello.<br><br>
<b>LA TUA DECISIONE:</b><br>
Arrestarlo subito o usarlo come infiltrazione segreta?`,
        type: "choice",
        options: ["Arrestalo subito", "Usalo come esca per la Banda"],
        answer: "Usalo come esca per la Banda",
        isMoral: true
    },

    // --- CAPITOLO 3: IL SEGRETO DELLA MINIERA ---
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 11: Il Codice Morse del Telegrafo",
        text: "Raggiungi l'ingresso della miniera abbandonata e trovi un telegrafo clandestino in funzione.",
        notebook: `<b>TABELLA CODICE MORSE:</b><br>
. . . = S<br>
- - - = O<br><br>
Il segnale intercettato ascoltato dall'altoparlante è:<br>
<b>. . . / - - - / . . .</b><br><br>
<i>Qual è la sigla di soccorso inviata?</i>`,
        type: "input",
        answer: "SOS",
        feedback: "Riconosci subito il segnale di emergenza SOS!"
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 12: La Mappa del Riconoscimento",
        text: "Devi scegliere quale galleria ispezionare per non cadere in una trappola.",
        notebook: `<b>MAPPA DEI TUNNEL:</b><br>
• <b>Galleria A:</b> Segnalata come instabile e franata.<br>
• <b>Galleria B:</b> Presenza di sacche di gas tossico.<br>
• <b>Galleria C:</b> Deposito di esplosivi inutilizzato.<br>
• <b>Galleria D:</b> Conduce al quartier generale sotterraneo del Sindaco.<br><br>
<i>In quale galleria devi far avanzare i tuoi uomini?</i>`,
        type: "choice",
        options: ["Galleria A", "Galleria B", "Galleria C", "Galleria D"],
        answer: "Galleria D",
        feedback: "Avanzate con cautela nella Galleria D senza rischi di crollo."
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 13: La Cassaforte di Dinamite",
        text: "Per sfondare il cancello del covo serve la dinamite chiusa in una cassa di sicurezza.",
        notebook: `<b>ENIGMA MATEMATICO SULLA CASSA:</b><br>
"La chiave è la somma dei primi tre numeri primi moltiplicata per 10".<br><br>
• Primi 3 numeri primi: <b>2, 3, 5</b><br>
• Somma: 2 + 3 + 5 = <b>10</b><br>
• Calcolo: 10 x 10 = <b>?</b><br><br>
<i>Inserisci il numero finale per sbloccare la dinamite.</i>`,
        type: "input",
        answer: "100",
        feedback: "Esatto! La cassa si apre e ottieni i candelotti di dinamite."
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 14: Mordoku dei Cospiratori",
        text: "Analizza i ruoli nella rete di corruzione di Oakhaven.",
        notebook: `<b>DOCUMENTI RETE CLANDESTINA:</b><br>
• <b>Membri:</b> Giudice, Sindaco, Banchiere.<br>
• <b>Incarichi:</b> Firma Mandati Falsi, Incasso Mazzette, Riciclaggio Denaro.<br>
• <b>Simboli Segreti:</b> Bilancia, Stella, Dollaro d'Oro.<br><br>
<b>INDIZI:</b><br>
1. Il Giudice usava il simbolo della Bilancia per autorizzare i sequestri.<br>
2. Il Sindaco incassava mazzette direttamente dalla compagnia ferroviaria.<br>
3. Il titolare del registro contrassegnato dal Dollaro d'Oro gestiva il riciclaggio dei fondi della miniera.<br><br>
<i>Chi gestiva il libro mastro con il Dollaro d'Oro?</i>`,
        type: "choice",
        options: ["Il Giudice", "Il Sindaco", "Il Banchiere"],
        answer: "Il Banchiere",
        feedback: "Perfetto! Il Banchiere è l'anello contabile dell'organizzazione."
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 15: Il Ricatto",
        text: "Nel covo trovi dei documenti compromettenti sul tuo vecchio mentore, l'ex Sceriffo.",
        notebook: `<b>DOCUMENTI COMPROMETTI:</b><br>
L'ex Sceriffo aveva chiuso un occhio anni fa per proteggere la città da una guerra tra bande.<br><br>
<b>LA TUA DECISIONE:</b><br>
Distruggere le prove per proteggere la sua memoria o pubblicare tutto?`,
        type: "choice",
        options: ["Rivela la verità al popolo", "Cancella il suo nome dalle prove"],
        answer: "Cancella il suo nome dalle prove",
        isMoral: true
    },

    // --- CAPITOLO 4: L'INFILTRAZIONE A OAKHAVEN ---
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 16: Il Lucchetto dell'Ufficio Postale",
        text: "Devi entrare nell'ufficio postale di notte per requisire i registri mastro.",
        notebook: `<b>SEQUENZA NUMERICA LUCCHETTO:</b><br>
Osserva la serie di numeri incisi sui rulli:<br>
<b>2  -  4  -  8  -  16  -  [ ? ]</b><br><br>
<i>Ogni numero è il doppio del precedente. Qual è il numero finale?</i>`,
        type: "input",
        answer: "32",
        feedback: "CLICK! Il lucchetto si apre (16 x 2 = 32)."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 17: Il Messaggio in Inchiostro Simpatico",
        text: "Passi una candela su una lettera bianca trovata sulla scrivania del Sindaco.",
        notebook: `<b>ANAGRAMMA INCHIOSTRO SIMPATICO:</b><br>
La lettera rivela l'identità del mandante tramite un anagramma sulle vesti:<br>
• Lettere svelate: <b>E - R - N - O</b><br><br>
<i>Riorganizza le lettere per formare il colore dell'abito in italiano.</i>`,
        type: "input",
        answer: "NERO",
        feedback: "Esatto! L'abito elegante del Sindaco è di colore NERO."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 18: L'Enigma degli Orologi",
        text: "Devi verificare la testimonianza del Sindaco per l'ora del delitto di Vance.",
        notebook: `<b>SINCRONIZZAZIONE OROLOGI:</b><br>
• Orologio del Saloon (Ora esatta): 12:00.<br>
• Orologio della Banca: Va <b>AVANTI di 15 minuti</b>.<br>
• L'alibi del Sindaco sostiene che si trovasse in Banca alle 14:15 (secondo l'orologio della banca).<br><br>
<i>Che ora era realmente quando l'orologio della banca segnava le 14:15? (Formato HH:MM)</i>`,
        type: "input",
        answer: "14:00",
        feedback: "Incastrato! Erano le 14:00 reali, proprio quando Vance è stato visto l'ultima volta."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 19: Mordoku Finale delle Accuse",
        text: "Ricostruisci l'intero organigramma dell'omicidio prima dell'arresto finale.",
        notebook: `<b>SINTESI DELL'INDAGINE:</b><br>
• <b>Mandante:</b> Il Sindaco (ha firmato l'accordo sulla miniera).<br>
• <b>Finanziatore:</b> Il Banchiere (ha pagato la tangente).<br>
• <b>Esecutore materiale:</b> Chi possedeva la boccetta di veleno ed è stato visto nella stalla prima del delitto.<br><br>
<i>Chi è l'esecutore materiale dell'avvelenamento?</i>`,
        type: "choice",
        options: ["Il Sindaco", "Il Medico", "Il Barista Corrotto"],
        answer: "Il Medico",
        feedback: "Esatto! Tutti gli indizi portano al Medico (Doc Holliday)."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 20: La Resa dei Conti Finale",
        text: "Sei nello studio del Sindaco. Hai raccolto tutte le 20 prove necessarie per chiudere l'indagine.",
        notebook: `<b>DICE LO SCERIFFO:</b><br>
"Il destino di Oakhaven è nelle tue mani. Puoi trascinare il Sindaco davanti al giudice federale o chiudere i conti qui stasera."<br><br>
<b>FESTEGGIA LA TUA DECISIONE FINALE.</b>`,
        type: "choice",
        options: ["Arresta il Sindaco e portalo a Processo", "Fai Giustizia Sommaria per Oakhaven"],
        answer: "Arresta il Sindaco e portalo a Processo",
        isMoral: true
    }
];

function renderGame() {
    const storyBox = document.getElementById('narrative-box');
    const interactiveArea = document.getElementById('interactive-area');
    const actionArea = document.getElementById('action-area');

    if (gameState.currentStep > puzzles.length) {
        storyBox.innerHTML = `
            <h3>FINE DELLA CAMPAGNA</h3>
            <p>Congratulazioni Sceriffo! Hai risolto tutti i 20 enigmi e portato a termine l'indagine di Oakhaven.</p>
            <p>Le tue scelte morali hanno plasmato il destino della città e il tuo nome passerà alla storia del Far West.</p>
        `;
        interactiveArea.innerHTML = '';
        actionArea.innerHTML = `<button onclick="resetGame()">Ricomincia dall'Inizio</button>`;
        return;
    }

    const currentPuzzle = puzzles[gameState.currentStep - 1];

    storyBox.innerHTML = `
        <small style="color: #8c5832; font-weight: bold;">[${gameState.currentStep}/20] ${currentPuzzle.chapter}</small>
        <h3>${currentPuzzle.title}</h3>
        <p>${currentPuzzle.text}</p>
        <div style="background: #e0cca9; padding: 10px; border-left: 4px solid #8c5832; margin-top: 10px; border-radius: 4px;">
            ${currentPuzzle.notebook}
        </div>
    `;

    if (currentPuzzle.type === "choice") {
        interactiveArea.innerHTML = '';
        actionArea.innerHTML = currentPuzzle.options.map(opt => 
            `<button onclick="checkAnswer('${opt.replace(/'/g, "\'")}')">${opt}</button>`
        ).join('');
    } else if (currentPuzzle.type === "input") {
        interactiveArea.innerHTML = `
            <input type="text" id="user-input" class="puzzle-input" placeholder="Inserisci la risposta...">
        `;
        actionArea.innerHTML = `
            <button onclick="checkInputAnswer()">Conferma Risposta</button>
        `;
    }
}

function checkAnswer(selectedOption) {
    const currentPuzzle = puzzles[gameState.currentStep - 1];

    if (currentPuzzle.isMoral) {
        gameState.moralChoices.push(selectedOption);
        alert(`Scelta registrata: "${selectedOption}". Il cammino dello Sceriffo prosegue.`);
        gameState.currentStep++;
        renderGame();
        return;
    }

    if (selectedOption.toLowerCase() === currentPuzzle.answer.toLowerCase()) {
        alert(currentPuzzle.feedback || "Corretto!");
        gameState.currentStep++;
        renderGame();
    } else {
        alert("Sbagliato! Riesamina gli indizi nel taccuino.");
    }
}

function checkInputAnswer() {
    const inputVal = document.getElementById('user-input').value.trim();
    const currentPuzzle = puzzles[gameState.currentStep - 1];

    if (inputVal.toLowerCase() === currentPuzzle.answer.toLowerCase()) {
        alert(currentPuzzle.feedback || "Corretto!");
        gameState.currentStep++;
        renderGame();
    } else {
        alert("Risposta non corretta. Riprova!");
    }
}

function toggleNotes() {
    const currentPuzzle = puzzles[gameState.currentStep - 1];
    if (currentPuzzle) {
        alert(`📜 TACCUINO DELLO SCERIFFO\n• Enigmi Risolti: ${gameState.currentStep - 1}/20\n• Scelte Morali Effettuate: ${gameState.moralChoices.length}\n\nConsultare il box beige a schermo per gli indizi completi del livello corrente!`);
    } else {
        alert("Campagna completata!");
    }
}

function resetGame() {
    gameState.currentStep = 1;
    gameState.moralChoices = [];
    renderGame();
}

// Avvio
renderGame();
