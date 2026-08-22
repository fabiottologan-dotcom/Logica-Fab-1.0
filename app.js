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
        text: "Thomas 'Mani Veloci' Vance è stato ucciso. Analizza le posizioni dei 4 sospettati alle 23:45:<br>• Blackwood non si è mosso dal Tavolo da Poker.<br>• La Ballerina è salita al Piano Superiore con un mazzo truccato.<br>• Il Medico era alla Stalla con il veleno.<br>• Kid Colt era al Bancone con la Pistola Calibro 45.<br><br><strong>Chi era al Piano Superiore al momento del delitto?</strong>",
        type: "choice",
        options: ["Blackwood", "Ballerina", "Medico", "Fuorilegge"],
        answer: "Ballerina",
        feedback: "Corretto! Calamity Jane la Ballerina era al piano superiore, ma aveva solo carte da gioco."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 2: La Cassaforte di Vance",
        text: "Per sbloccare la cassaforte servono 3 cifre:<br>1ª Cifra: Ora di chiusura del saloon (ore 02:00 -> 2)<br>2ª Cifra: Numero di Assi serviti nella mano vincente (3 Assi -> 3)<br>3ª Cifra: Il doppio delle monete d'argento trovate nella tasca (4 monete x 2 = 8)",
        type: "input",
        answer: "238",
        feedback: "CLACK! La cassaforte si apre mettendo in luce l'atto di proprietà falsificato dal Sindaco."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 3: Il Telegramma Cifrato",
        text: "Trovi un telegramma inviato a Vance con un codice a scorrimento (Cesare +1). Decifra la parola chiave:<br><strong>'O-V-I-E-O'</strong> (Torna indietro di una lettera nell'alfabeto per ogni carattere).",
        type: "input",
        answer: "NUDNO", // N-U-D-N-O? Wait, O-1=N, V-1=U, I-1=H, E-1=D, O-1=N -> NUHDN? Let's fix text
        // Let's use clean word: 'T-F-R-R-P' (-1) -> 'S-E-Q-Q-O' -> Let's do simple: 'U-S-E-O-P' (-1) -> 'T-R-D-N-O'
        // Let's make explicit word: 'O-B-U-C-A' -> 'N-A-T-B-Z' -> Let's use simple Italian: 'M-J-O-F-B' (-1) -> 'L-I-N-E-A'
        text: "Trovi un telegramma indirizzato al Sindaco. Ogni lettera è spostata avanti di 1 nell'alfabeto.<br>Decifra il testo: <strong>M - J - O - F - B</strong> (Torna indietro di 1 lettera per ciascuna).",
        answer: "LINEA",
        feedback: "Decifrato! Il messaggio fa riferimento alla nuova 'LINEA' ferroviaria."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 4: L'Orario del Treno",
        text: "Dalle note di Vance: Il treno merci parte ogni 90 minuti a partire dalle 06:00 del mattino. Vance doveva scappare con il 4° treno della giornata.<br><strong>A che ora parte il 4° treno? (Formato HH:MM)</strong>",
        type: "input",
        answer: "10:30",
        feedback: "Esatto! 1°=06:00, 2°=07:30, 3°=09:00, 4°=10:30."
    },
    {
        chapter: "Capitolo 1: Il Sangue al Saloon",
        title: "Enigma 5: La Prima Sentenza (Scelta Morale)",
        text: "Hai scoperto che la Ballerina ha rubato l'atto falsificato per riprendersi le terre della sua famiglia, ma l'assassino è il Medico (su mandato del Sindaco).<br><strong>Cosa fai con la Ballerina?</strong>",
        type: "choice",
        options: ["Arrestala per Furto", "Lasciala Fuggire con l'Atto"],
        answer: "Lasciala Fuggire con l'Atto", // Accept any or handle as choice
        isMoral: true
    },

    // --- CAPITOLO 2: LA RAPINA ALLA DILIGENZA ---
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 6: Impronte nel Fango",
        text: "La diligenza per la miniera è stata assalita. Trovi 4 paia di stivali nel fango:<br>• Il driver portava stivali Taglia 42.<br>• I cavalli erano 4.<br>• L'assalitore sinistro aveva uno sperone mancante.<br>• L'assalitore destro usava stivali Taglia 45 con tacco in ferro.<br><br>Se l'uomo del Sindaco usa il tacco in ferro, quale taglia cercate?",
        type: "choice",
        options: ["Taglia 40", "Taglia 42", "Taglia 45", "Taglia 48"],
        answer: "Taglia 45",
        feedback: "Ottima deduzione! Cercate un uomo alto con stivali Taglia 45."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 7: Il Cifrario della Cassetta",
        text: "La cassetta di sicurezza della diligenza ha un lucchetto alfabetico. La combinazione è l'anagramma della parola <strong>'O-R-O'</strong> capovolta in inglese (GOLD -> DLOG)? No, rispondi alla parola d'ordine di 4 lettere usata dai banditi: 'L'opposto di WEST'.",
        type: "input",
        answer: "EAST",
        feedback: "CLICK! La cassetta si sblocca."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 8: Il Calcolo del Peso dell'Oro",
        text: "I rapinatori hanno rubato 3 lingotti grandi (10 kg l'uno) e 4 lingotti piccoli (5 kg l'uno). Il cavallo di fuga può portare massimo 35 kg.<br><strong>Quanti kg di oro hanno dovuto lasciare a terra?</strong>",
        type: "input",
        answer: "15",
        feedback: "Esatto! (30 + 20) - 35 = 15 kg lasciati nella macchia."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 9: Mordoku dei Sospetti di Frontiera",
        text: "Analizza i 4 sospettati per la rapina:<br>• Bille il Rosso non sa cavalcare.<br>• L'Uomo col Tacco in Ferro odia il whisky.<br>• Il Barista era al bancone fino alle 02:00.<br>• L'Uomo col Tacco in Ferro ha ordinato solo Latte al Saloon.<br><br><strong>Chi è l'assalitore con il tacco in ferro se l'unico astemio è lo Stallaio?</strong>",
        type: "choice",
        options: ["Bill il Rosso", "Il Barista", "Lo Stallaio", "Il Vice Sceriffo"],
        answer: "Lo Stallaio",
        feedback: "Incastrato! Lo Stallaio è l'unico astemio e calza la taglia 45."
    },
    {
        chapter: "Capitolo 2: La Diligenza Spezzata",
        title: "Enigma 10: Decisione al Canyon",
        text: "Hai circondato lo Stallaio. Confessa che rubava l'oro per pagare i debiti di gioco del fratello minore sequestrato dai fuorilegge.<br><strong>Come agisci?</strong>",
        type: "choice",
        options: ["Arrestalo subito", "Usalo come esca per la Banda"],
        answer: "Usalo come esca per la Banda",
        isMoral: true
    },

    // --- CAPITOLO 3: IL SEGRETO DELLA MINIERA ---
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 11: Il Codice Morse del Telegrafo",
        text: "In un capanno abbandonato trovi un telegrafo che batte continuamente:<br><strong>. . . / - - - / . . .</strong><br>Qual è il famoso segnale di soccorso inviato?",
        type: "input",
        answer: "SOS",
        feedback: "Riconosci subito il segnale SOS!"
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 12: La Mappa del Riconoscimento",
        text: "La miniera ha 4 gallerie (A, B, C, D).<br>• La Galleria A è franata.<br>• La Galleria B ha riserve di gas.<br>• La Galleria C contiene l'esplosivo.<br>• La Galleria D porta al covo segreto del Sindaco.<br><br><strong>In quale galleria devi guidare i tuoi uomini per la perquisizione?</strong>",
        type: "choice",
        options: ["Galleria A", "Galleria B", "Galleria C", "Galleria D"],
        answer: "Galleria D",
        feedback: "Avanzate con cautela nella Galleria D verso il covo."
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 13: La Combinazione della Cassaforte di Dinamite",
        text: "Per superare una porta sbarrata serve la dinamite. La scatola chiede la soluzione: 'Somma i primi tre numeri primi (2, 3, 5) e moltiplica per 10'.",
        type: "input",
        answer: "100",
        feedback: "Esatto! (2 + 3 + 5) * 10 = 100."
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 14: Mordoku dei Cospiratori",
        text: "Incrocia i documenti trovati nel covo:<br>• Il Giudice firmava i mandati illegali.<br>• Il Sindaco incassava le mazzette della ferrovia.<br>• Il Banchiere riciclava il denaro sporco.<br><br><strong>Chi gestiva direttamente il libro mastro contrassegnato con un dollaro d'oro?</strong>",
        type: "choice",
        options: ["Il Giudice", "Il Sindaco", "Il Banchiere"],
        answer: "Il Banchiere",
        feedback: "Perfetto! Il Banchiere è l'anello finanziario della catena."
    },
    {
        chapter: "Capitolo 3: La Miniera Dimenticata",
        title: "Enigma 15: Il Ricatto",
        text: "Trovi le prove che anche il tuo vecchio mentore (ex Sceriffo) era stato corrotto anni fa per proteggere la città.<br><strong>Cosa fai con il suo nome?</strong>",
        type: "choice",
        options: ["Rivela la verità al popolo", "Cancella il suo nome dalle prove"],
        answer: "Cancella il suo nome dalle prove",
        isMoral: true
    },

    // --- CAPITOLO 4: L'INFILTRAZIONE A OAKHAVEN ---
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 16: Il Lucchetto dell'Ufficio Postale",
        text: "Devi intercettare la corrispondenza del Sindaco. Il lucchetto ha una sequenza numerica: 2 - 4 - 8 - 16 - ?<br><strong>Qual è il numero successivo?</strong>",
        type: "input",
        answer: "32",
        feedback: "Corretto! La sequenza raddoppia ad ogni passaggio (16 x 2 = 32)."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 17: Il Messaggio in Inchiostro Simpatico",
        text: "Scaldando una lettera alla candela appare una frase cifrata: 'IL COLPEVOLE VESTE DI...'.<br>Sapendo che è l'anagramma di <strong>'E-R-N-O'</strong> (Un colore in italiano), di che colore è l'abito?",
        type: "input",
        answer: "NERO",
        feedback: "Esatto! L'abito elegante del Sindaco è proprio di colore NERO."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 18: L'Enigma degli Orologi",
        text: "L'orologio del Saloon segna le 12:00. L'orologio della Banca va avanti di 15 minuti. L'orologio della Stazione va indietro di 10 minuti.<br><strong>Se il delitto è avvenuto quando l'orologio della Banca segnava le 14:15, che ora era davvero? (Formato HH:MM)</strong>",
        type: "input",
        answer: "14:00",
        feedback: "Esatto! 14:15 - 15 minuti = 14:00 reali."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 19: Mordoku Finale delle Accuse",
        text: "Ricomponi il quadro d'accusa:<br>• Il Sindaco ha ordinato l'omicidio.<br>• Il Medico ha fornito il veleno.<br>• Il Banchiere ha pagato il sicario.<br><br><strong>Chi ha fisicamente versato il veleno nel bicchiere di Vance?</strong>",
        type: "choice",
        options: ["Il Sindaco", "Il Medico", "Il Barista Corrotto"],
        answer: "Il Medico",
        feedback: "Tutti i tasselli coincidono! Il Medico è l'esecutore materiale."
    },
    {
        chapter: "Capitolo 4: La Trappola in Città",
        title: "Enigma 20: La Resa dei Conti Finale",
        text: "Sei nell'ufficio del Sindaco con la pistola spianata. Hai tutte le 20 prove per incastrarlo o per farti giustizia da solo.<br><strong>Qual è la tua decisione finale come Sceriffo di Oakhaven?</strong>",
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
    alert(`📜 TACCUINO DELLO SCERIFFO\n• Enigmi Risolti: ${gameState.currentStep - 1}/20\n• Scelte Morali Effettuate: ${gameState.moralChoices.length}`);
}

function resetGame() {
    gameState.currentStep = 1;
    gameState.moralChoices = [];
    renderGame();
}

// Avvio
renderGame();
