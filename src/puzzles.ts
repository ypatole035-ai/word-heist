import { Puzzle, PuzzleType } from './types';


function caesarEncode(text: string, shift: number): string {
  return text.toUpperCase().split('').map(c => {
    if (c >= 'A' && c <= 'Z') {
      return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
    }
    return c;
  }).join('');
}

// intel = the atmospheric quote shown as a live terminal feed WHILE the player is solving the puzzle
// It's NOT the word definition — it's a heist operative's fragment: a clue, a threat, a war story.

export const ALL_PUZZLES: Puzzle[] = [

  // ══════════════════════════════════════════════════════════════
  //  EASY  (difficulty: 1) — Stages 1–2
  // ══════════════════════════════════════════════════════════════

  // — Anagrams easy —
  {
    id: 'a_e1', type: 'anagram', difficulty: 1,
    prompt: 'UNSCRAMBLE: V A U L T',
    answer: 'VAULT',
    hint: 'Where the money sleeps',
    intel: '"Objective confirmed. The vault is three floors down. Reinforced steel, biometric lock. You have ninety seconds. Don\'t waste them."',
  },
  {
    id: 'a_e2', type: 'anagram', difficulty: 1,
    prompt: 'UNSCRAMBLE: H E I S T',
    answer: 'HEIST',
    hint: 'The job itself',
    intel: '"They\'ll call it a robbery in the morning papers. We call it precision. There\'s a difference."',
  },
  {
    id: 'a_e3', type: 'anagram', difficulty: 1,
    prompt: 'UNSCRAMBLE: S H A D O W',
    answer: 'SHADOW',
    hint: 'What follows you in the light',
    intel: '"Move in the shadow. Every camera has a blind spot. Find it before the guard does."',
  },
  {
    id: 'a_e4', type: 'anagram', difficulty: 1,
    prompt: 'UNSCRAMBLE: A L A R M S',
    answer: 'ALARMS',
    hint: 'The vault\'s first defence',
    intel: '"The alarms are motion-triggered. Forty milliseconds. You\'ll need to be faster than that."',
  },
  {
    id: 'a_e5', type: 'anagram', difficulty: 1,
    prompt: 'UNSCRAMBLE: G H O S T',
    answer: 'GHOST',
    hint: 'An operative who doesn\'t exist',
    intel: '"Ghost Protocol active. Your identity has been scrubbed from every database. You are no one. Do not let them remember your face."',
  },
  {
    id: 'a_e6', type: 'anagram', difficulty: 1,
    prompt: 'UNSCRAMBLE: T A R G E T',
    answer: 'TARGET',
    hint: 'What you aim at',
    intel: '"Target acquired. Central vault, sub-level three. He never changes the route. Creatures of habit are gifts to operatives like us."',
  },

  // — Caesar easy —
  {
    id: 'c_e1', type: 'caesar', difficulty: 1,
    prompt: `DECODE (shift -3): ${caesarEncode('KEY', 3)}`,
    answer: 'KEY',
    hint: 'Shift each letter back by 3',
    intel: '"The key to the secondary lock is taped beneath the security desk. Classic mistake. People hide things where they\'re comfortable, not where they\'re safe."',
  },
  {
    id: 'c_e2', type: 'caesar', difficulty: 1,
    prompt: `DECODE (shift -2): ${caesarEncode('CODE', 2)}`,
    answer: 'CODE',
    hint: 'Shift each letter back by 2',
    intel: '"Every code they write, I\'ve cracked before breakfast. The real puzzle isn\'t the cipher — it\'s staying calm while the clock runs."',
  },
  {
    id: 'c_e3', type: 'caesar', difficulty: 1,
    prompt: `DECODE (shift -4): ${caesarEncode('MASK', 4)}`,
    answer: 'MASK',
    hint: 'Shift each letter back by 4',
    intel: '"Put the mask on before the elevator opens. By the time the camera cycles back, you\'re already someone else."',
  },

  // — Hidden word easy —
  {
    id: 'h_e1', type: 'hidden_word', difficulty: 1,
    prompt: 'FIND THE HIDDEN WORD:\n"She kept the KEY Evidence in a safe deposit box."',
    answer: 'KEY',
    hint: 'Look for a 3-letter capitalised block',
    intel: '"Look for what shouldn\'t be capitalised. Language is sloppy. Mistakes are breadcrumbs."',
  },
  {
    id: 'h_e2', type: 'hidden_word', difficulty: 1,
    prompt: 'FIND THE HIDDEN WORD:\n"He wore a MASKed expression all through the interrogation."',
    answer: 'MASK',
    hint: 'Look for a 4-letter capitalised block',
    intel: '"A good mask isn\'t about the face — it\'s about the story behind it. What are they hiding? Read the sentence again."',
  },
  {
    id: 'h_e3', type: 'hidden_word', difficulty: 1,
    prompt: 'FIND THE HIDDEN WORD:\n"The CODEd transmission was intercepted at 03:17."',
    answer: 'CODE',
    hint: 'Look for a 4-letter capitalised block',
    intel: '"Transmission intercepted. We\'re reading their comms in real time. Every word they encrypt, we decrypt. Find the word inside the word."',
  },

  // — Definition easy —
  {
    id: 'd_e1', type: 'definition', difficulty: 1,
    prompt: 'CRACK THE DEFINITION:\n"I have hands but cannot clap. I have a face\nbut no eyes. I tell you something vital every second."',
    answer: 'CLOCK',
    hint: 'It keeps time',
    intel: '"Sixty seconds on the clock. Every tick is a second you\'ll never get back. The vault doesn\'t care how smart you are — only how fast."',
  },
  {
    id: 'd_e2', type: 'definition', difficulty: 1,
    prompt: 'CRACK THE DEFINITION:\n"I am passed through walls but never touched.\nI carry voices across cities. Cut me and everyone goes silent."',
    answer: 'SIGNAL',
    hint: 'Wireless transmission',
    intel: '"Signal strength at 40%. If you lose comms in the vault, you\'re on your own. No one comes in after you."',
  },
  {
    id: 'd_e3', type: 'definition', difficulty: 1,
    prompt: 'CRACK THE DEFINITION:\n"I guard the room but have no mouth.\nI see everything but blink every 8 seconds.\nFind my blind spot."',
    answer: 'CAMERA',
    hint: 'Surveillance device',
    intel: '"Camera sweep: eight seconds east-to-west, three second pause. You have eleven seconds of darkness. Use every one of them."',
  },

  // — Missing vowels easy —
  {
    id: 'v_e1', type: 'missing_vowels', difficulty: 1,
    prompt: 'FILL THE VOWELS:\nH _ CK _ R',
    answer: 'HACKER',
    hint: 'Elite digital infiltrator',
    intel: '"The hacker on our team cracked the firewall in forty seconds. She doesn\'t call herself a criminal. She calls herself an architect of access."',
  },
  {
    id: 'v_e2', type: 'missing_vowels', difficulty: 1,
    prompt: 'FILL THE VOWELS:\nV _ _ LT',
    answer: 'VAULT',
    hint: 'The armoured chamber',
    intel: '"Vault specs received. Dual-layered titanium, magnetic seal, pressure sensors in the floor. Beautiful engineering. Beautiful target."',
  },
  {
    id: 'v_e3', type: 'missing_vowels', difficulty: 1,
    prompt: 'FILL THE VOWELS:\nG _ _ RD',
    answer: 'GUARD',
    hint: 'The person watching the doors',
    intel: '"Guard rotation: twelve minutes. He stops at the east corridor for a cigarette at 02:00. That\'s your window. Don\'t be early. Don\'t be late."',
  },

  // ══════════════════════════════════════════════════════════════
  //  MEDIUM  (difficulty: 2) — Stages 3–4
  // ══════════════════════════════════════════════════════════════

  // — Anagrams medium —
  {
    id: 'a_m1', type: 'anagram', difficulty: 2,
    prompt: 'UNSCRAMBLE: C I P H E R',
    answer: 'CIPHER',
    hint: 'Encryption method',
    intel: '"The cipher on this lock is a Vigenère variant. Whoever designed this vault was meticulous. Or paranoid. With the wealthy, it\'s usually both."',
  },
  {
    id: 'a_m2', type: 'anagram', difficulty: 2,
    prompt: 'UNSCRAMBLE: S T L E A H T',
    answer: 'STEALTH',
    hint: 'Moving without detection',
    intel: '"Stealth isn\'t silence. It\'s the ability to become part of the background. The best operatives don\'t disappear — they become ordinary."',
  },
  {
    id: 'a_m3', type: 'anagram', difficulty: 2,
    prompt: 'UNSCRAMBLE: B R E A C H',
    answer: 'BREACH',
    hint: 'Forced entry',
    intel: '"Breach team standing by at the service entrance. On your signal. If the alarms trip before you\'re in, we abort. No second chances."',
  },
  {
    id: 'a_m4', type: 'anagram', difficulty: 2,
    prompt: 'UNSCRAMBLE: E S C A P E',
    answer: 'ESCAPE',
    hint: 'The endgame',
    intel: '"Escape route: northeast stairwell, service tunnel, black car, two minutes on the 12th. The driver doesn\'t wait. Make sure you do."',
  },
  {
    id: 'a_m5', type: 'anagram', difficulty: 2,
    prompt: 'UNSCRAMBLE: G A N T E A',
    answer: 'AGENT',
    hint: 'A covert operative',
    intel: '"The agent inside fed us the floor plans three weeks ago. We still don\'t know her real name. In this business, that\'s trust."',
  },
  {
    id: 'a_m6', type: 'anagram', difficulty: 2,
    prompt: 'UNSCRAMBLE: F R A U D',
    answer: 'FRAUD',
    hint: 'Deception for gain',
    intel: '"The entire security system is running on a fraudulent maintenance contract. Someone on the inside is very well paid. And very nervous."',
  },

  // — Caesar medium —
  {
    id: 'c_m1', type: 'caesar', difficulty: 2,
    prompt: `DECODE (shift -5): ${caesarEncode('BREACH', 5)}`,
    answer: 'BREACH',
    hint: 'Shift each letter back by 5',
    intel: '"Breach confirmed at the east wing. Counter-response time is four minutes. That\'s four minutes for everything."',
  },
  {
    id: 'c_m2', type: 'caesar', difficulty: 2,
    prompt: `DECODE (shift -6): ${caesarEncode('UNLOCK', 6)}`,
    answer: 'UNLOCK',
    hint: 'Shift each letter back by 6',
    intel: '"The unlock sequence for the inner vault takes 22 seconds to cycle. Don\'t rush it. A forced cycle wipes the mechanism. Then you\'re done."',
  },
  {
    id: 'c_m3', type: 'caesar', difficulty: 2,
    prompt: `DECODE (shift -4): ${caesarEncode('ESCAPE', 4)}`,
    answer: 'ESCAPE',
    hint: 'Shift each letter back by 4',
    intel: '"Three escape routes. Two of them are already compromised. You\'ll know which one is clear when you get there. That\'s the job."',
  },
  {
    id: 'c_m4', type: 'caesar', difficulty: 2,
    prompt: `DECODE (shift -7): ${caesarEncode('SIGNAL', 7)}`,
    answer: 'SIGNAL',
    hint: 'Shift each letter back by 7',
    intel: '"No signal below sub-level two. You\'re in a Faraday cage the moment you pass the vault doors. Whatever you need to know — know it before you go in."',
  },
  {
    id: 'c_m5', type: 'caesar', difficulty: 2,
    prompt: `DECODE (shift -3): ${caesarEncode('SHADOW', 3)}`,
    answer: 'SHADOW',
    hint: 'Shift each letter back by 3',
    intel: '"There\'s a shadow on the third floor camera feed. Thirty-seven pixels wide, consistent. Someone has been watching this vault for months. It\'s not one of ours."',
  },

  // — Hidden word medium —
  {
    id: 'h_m1', type: 'hidden_word', difficulty: 2,
    prompt: 'FIND THE HIDDEN WORD:\n"The agent carefully CRACKed the safe at midnight."',
    answer: 'CRACK',
    hint: 'Look for a 5-letter capitalised block',
    intel: '"The crack in the security grid runs from 02:14 to 02:31 every night. Seventeen minutes. That\'s how long you have to be a ghost."',
  },
  {
    id: 'h_m2', type: 'hidden_word', difficulty: 2,
    prompt: 'FIND THE HIDDEN WORD:\n"He used a WIREd connection to bypass the firewall."',
    answer: 'WIRE',
    hint: 'Look for a 4-letter capitalised block',
    intel: '"The wire transfer was set up under a shell company. Forty million. By morning it\'ll be in six different accounts in four different countries. Clean."',
  },
  {
    id: 'h_m3', type: 'hidden_word', difficulty: 2,
    prompt: 'FIND THE HIDDEN WORD:\n"She crossed the SAFE zone boundary without triggering sensors."',
    answer: 'SAFE',
    hint: 'Look for a 4-letter capitalised block',
    intel: '"Nothing inside the vault is safe. That includes you. Move fast, touch nothing you don\'t need, and leave no trace that you were ever there."',
  },
  {
    id: 'h_m4', type: 'hidden_word', difficulty: 2,
    prompt: 'FIND THE HIDDEN WORD:\n"The THIEFt of the data drives went undetected for six weeks."',
    answer: 'THIEF',
    hint: 'Look for a 5-letter capitalised block',
    intel: '"The best thief in the world is the one whose name never appears in the police report. Be that person. Be better than that person."',
  },

  // — Definition medium —
  {
    id: 'd_m1', type: 'definition', difficulty: 2,
    prompt: 'CRACK THE DEFINITION:\n"I speak every language, carry all secrets,\nbut have no mouth. Delete me and lose everything.\nI am the currency of the modern age."',
    answer: 'DATA',
    hint: 'Digital information',
    intel: '"The data vault holds twelve terabytes of client financial records. Names, accounts, leverage. Whoever owns this data owns this city."',
  },
  {
    id: 'd_m2', type: 'definition', difficulty: 2,
    prompt: 'CRACK THE DEFINITION:\n"I am invisible but lock every door.\nKnow me and you own the building.\nI am forgotten the moment I matter most."',
    answer: 'PASSWORD',
    hint: 'Authentication secret',
    intel: '"The password was written on a sticky note under the keyboard. Seventeen characters, two numbers, one symbol. The most secure lock in the building — defeated by human laziness."',
  },
  {
    id: 'd_m3', type: 'definition', difficulty: 2,
    prompt: 'CRACK THE DEFINITION:\n"I am always running but never walk.\nI have a bed but never sleep.\nI carry what drowns some and saves others."',
    answer: 'RIVER',
    hint: 'Found in nature, flows downhill',
    intel: '"Extraction point: the river behind the industrial district. Boat will be waiting. Current runs fast after 02:00. Do not miss the boat."',
  },
  {
    id: 'd_m4', type: 'definition', difficulty: 2,
    prompt: 'CRACK THE DEFINITION:\n"I carry your face without your body.\nYour name without your soul.\nUse me and become anyone."',
    answer: 'IDENTITY',
    hint: 'Who you are — or pretend to be',
    intel: '"New identity packets are ready for all team members. Passports, credit histories, employment records. You\'re whoever you need to be. Just don\'t forget who you actually are."',
  },

  // — Missing vowels medium —
  {
    id: 'v_m1', type: 'missing_vowels', difficulty: 2,
    prompt: 'FILL THE VOWELS:\nF _ R _ W _ L L',
    answer: 'FIREWALL',
    hint: 'Network security barrier',
    intel: '"The firewall protecting the vault\'s digital systems is military-grade. But the technician who installed it used the same password for his personal email. People are the weakness."',
  },
  {
    id: 'v_m2', type: 'missing_vowels', difficulty: 2,
    prompt: 'FILL THE VOWELS:\nM _ SS _ _ N',
    answer: 'MISSION',
    hint: 'The objective',
    intel: '"Mission parameters have changed. The target moved the bonds to a secondary location. We adapt. We always adapt. That\'s what separates professionals from amateurs."',
  },
  {
    id: 'v_m3', type: 'missing_vowels', difficulty: 2,
    prompt: 'FILL THE VOWELS:\nT _ RM _ N _ L',
    answer: 'TERMINAL',
    hint: 'Command line interface',
    intel: '"Access the maintenance terminal on sublevel two. It has a hardwired connection that bypasses the wireless encryption entirely. Old tech. Still works."',
  },
  {
    id: 'v_m4', type: 'missing_vowels', difficulty: 2,
    prompt: 'FILL THE VOWELS:\nS _ B _ T _ G _',
    answer: 'SABOTAGE',
    hint: 'Deliberate interference',
    intel: '"Before entry, we sabotage the backup generator. Thirty seconds of darkness. Long enough to reset the biometric scanner to factory defaults. In the dark, we move."',
  },
  {
    id: 'v_m5', type: 'missing_vowels', difficulty: 2,
    prompt: 'FILL THE VOWELS:\nN _ TW _ RK',
    answer: 'NETWORK',
    hint: 'Connected system of devices',
    intel: '"The security network runs on a closed-loop fibre system. To tap it, you need physical access to the server room. Which is, naturally, inside the vault."',
  },

  // ══════════════════════════════════════════════════════════════
  //  HARD  (difficulty: 3) — Stages 5–6
  // ══════════════════════════════════════════════════════════════

  // — Anagrams hard —
  {
    id: 'a_h1', type: 'anagram', difficulty: 3,
    prompt: 'UNSCRAMBLE: C O V E R T',
    answer: 'COVERT',
    hint: 'Secret, hidden operations',
    intel: '"Covert insertion at 01:45. No communication after entry. No names used over comms. If you are compromised, you do not exist. This conversation never happened."',
  },
  {
    id: 'a_h2', type: 'anagram', difficulty: 3,
    prompt: 'UNSCRAMBLE: I N F I L R T A E',
    answer: 'INFILTRATE',
    hint: 'To enter secretly',
    intel: '"To infiltrate is to become. Not to sneak — to belong. By the time they realise you shouldn\'t be there, you\'re already gone."',
  },
  {
    id: 'a_h3', type: 'anagram', difficulty: 3,
    prompt: 'UNSCRAMBLE: L V A S R U E I L N C E',
    answer: 'SURVEILLANCE',
    hint: 'Watching without being seen',
    intel: '"Surveillance logs show thirty-eight camera blind spots across the facility. We mapped every one. Knowledge is the only lock that matters."',
  },
  {
    id: 'a_h4', type: 'anagram', difficulty: 3,
    prompt: 'UNSCRAMBLE: P R O T O C O L',
    answer: 'PROTOCOL',
    hint: 'A set of rules or procedures',
    intel: '"Protocol dictates that a failed breach triggers a thirty-second lockdown followed by armed response. You have thirty-one seconds. Do not fail."',
  },
  {
    id: 'a_h5', type: 'anagram', difficulty: 3,
    prompt: 'UNSCRAMBLE: E X T R A C T',
    answer: 'EXTRACT',
    hint: 'To remove or pull out',
    intel: '"Extraction is not the end of the mission. It\'s the most dangerous part. Every trap is set for the operative who thinks they\'ve already won."',
  },
  {
    id: 'a_h6', type: 'anagram', difficulty: 3,
    prompt: 'UNSCRAMBLE: D E C O Y',
    answer: 'DECOY',
    hint: 'A distraction or lure',
    intel: '"The decoy van will hit the north entrance at exactly 02:12. Every guard in the building will be looking north. You will not be going north."',
  },

  // — Caesar hard —
  {
    id: 'c_h1', type: 'caesar', difficulty: 3,
    prompt: `DECODE (shift -9): ${caesarEncode('OPERATIVE', 9)}`,
    answer: 'OPERATIVE',
    hint: 'Shift each letter back by 9',
    intel: '"You are now the operative. No handler, no backup, no abort code. Whatever happens in that vault — you solve it. That\'s what they pay you for."',
  },
  {
    id: 'c_h2', type: 'caesar', difficulty: 3,
    prompt: `DECODE (shift -11): ${caesarEncode('CLASSIFIED', 11)}`,
    answer: 'CLASSIFIED',
    hint: 'Shift each letter back by 11',
    intel: '"This file is classified above the Director level. The three people who know its contents have each had accidents in the last two years. Tread carefully."',
  },
  {
    id: 'c_h3', type: 'caesar', difficulty: 3,
    prompt: `DECODE (shift -8): ${caesarEncode('INTERCEPT', 8)}`,
    answer: 'INTERCEPT',
    hint: 'Shift each letter back by 8',
    intel: '"Intercept all outgoing communications from 02:00 to 02:30. Anyone who sends a message in that window knows we\'re coming. Find them."',
  },
  {
    id: 'c_h4', type: 'caesar', difficulty: 3,
    prompt: `DECODE (shift -13): ${caesarEncode('DECRYPT', 13)}`,
    answer: 'DECRYPT',
    intel: '"To decrypt is to see the truth beneath the noise. The vault\'s final lock sequence is encoded in a message that\'s been hiding in plain sight for six months."',
    hint: 'Shift each letter back by 13',
  },
  {
    id: 'c_h5', type: 'caesar', difficulty: 3,
    prompt: `DECODE (shift -10): ${caesarEncode('BLACKOUT', 10)}`,
    answer: 'BLACKOUT',
    hint: 'Shift each letter back by 10',
    intel: '"Blackout conditions at 02:00. Power grid goes down for forty seconds. In that darkness, the vault door is the only thing with independent power. And we have the override."',
  },

  // — Hidden word hard —
  {
    id: 'h_h1', type: 'hidden_word', difficulty: 3,
    prompt: 'FIND THE HIDDEN WORD:\n"The intelligence SUBVERTed the entire security architecture."',
    answer: 'SUBVERT',
    hint: 'Look for a 7-letter capitalised block',
    intel: '"Subvert the system from within. Don\'t fight the security — become it. The best attacks look like routine maintenance."',
  },
  {
    id: 'h_h2', type: 'hidden_word', difficulty: 3,
    prompt: 'FIND THE HIDDEN WORD:\n"Access was granted through a BACKDOORed server endpoint."',
    answer: 'BACKDOOR',
    hint: 'Look for an 8-letter capitalised block',
    intel: '"There\'s a backdoor in the vault\'s firmware — installed during a 2019 upgrade by a contractor who no longer exists. We found it. They didn\'t."',
  },
  {
    id: 'h_h3', type: 'hidden_word', difficulty: 3,
    prompt: 'FIND THE HIDDEN WORD:\n"The plan required them to IMPERSONATEd the building\'s own security."',
    answer: 'IMPERSONATE',
    hint: 'Look for an 11-letter capitalised block',
    intel: '"To impersonate security is the highest form of infiltration. You don\'t bypass their trust — you become worthy of it. Then you betray it."',
  },
  {
    id: 'h_h4', type: 'hidden_word', difficulty: 3,
    prompt: 'FIND THE HIDDEN WORD:\n"A PARANOIDly secured vault still has one weakness: its builder."',
    answer: 'PARANOID',
    hint: 'Look for an 8-letter capitalised block',
    intel: '"Paranoid security design has a flaw: the paranoid designer always leaves themselves a way in. Find the architect\'s ego. That\'s your entrance."',
  },

  // — Definition hard —
  {
    id: 'd_h1', type: 'definition', difficulty: 3,
    prompt: 'CRACK THE DEFINITION:\n"I am the art of lying with the truth.\nI show you exactly what you expect to see.\nI am the reason you trust the wrong people."',
    answer: 'DECEPTION',
    hint: 'The highest operative skill',
    intel: '"Deception isn\'t lying. It\'s architecture. You build a reality that fits what they already believe. They do the rest themselves."',
  },
  {
    id: 'd_h2', type: 'definition', difficulty: 3,
    prompt: 'CRACK THE DEFINITION:\n"I can be digital or physical.\nI hold everything and am held by nothing.\nBreak me open and the game is over."',
    answer: 'ENCRYPTION',
    hint: 'Mathematical protection of information',
    intel: '"The encryption on the primary drive uses a 4096-bit key. Unbreakable by brute force. Entirely breakable by finding the human who holds the passphrase."',
  },
  {
    id: 'd_h3', type: 'definition', difficulty: 3,
    prompt: 'CRACK THE DEFINITION:\n"I am the moment between detection and response.\nUse me correctly and you escape.\nIgnore me and you don\'t."',
    answer: 'WINDOW',
    hint: 'An opportunity or gap in security',
    intel: '"The window is closing. You have twenty-two seconds before the patrol loops back. Every second you spend thinking is a second you\'re not moving."',
  },
  {
    id: 'd_h4', type: 'definition', difficulty: 3,
    prompt: 'CRACK THE DEFINITION:\n"I am written in fire and stored in silence.\nThe only currency that cannot be traced.\nEvery operative carries one and trusts no one else\'s."',
    answer: 'SECRET',
    hint: 'Hidden knowledge',
    intel: '"There are three secrets in this vault. The bonds are the least valuable of them. The other two are what we\'re really here for."',
  },

  // — Missing vowels hard —
  {
    id: 'v_h1', type: 'missing_vowels', difficulty: 3,
    prompt: 'FILL THE VOWELS:\nC _ D _ BR _ _ K',
    answer: 'CODEBREAK',
    hint: 'What happens when encryption fails',
    intel: '"The codebreak took eleven hours of distributed processing. When it finally opened, what we found inside changed everything we thought we knew about the operation."',
  },
  {
    id: 'v_h2', type: 'missing_vowels', difficulty: 3,
    prompt: 'FILL THE VOWELS:\nC _ PH _ RT _ XT',
    answer: 'CIPHERTEXT',
    hint: 'Encrypted message output',
    intel: '"The ciphertext was hiding in the building\'s own maintenance logs. Seventeen months of innocuous repair records — each one a fragment of the vault combination."',
  },
  {
    id: 'v_h3', type: 'missing_vowels', difficulty: 3,
    prompt: 'FILL THE VOWELS:\nB _ _ M _ TR _ C',
    answer: 'BIOMETRIC',
    hint: 'Using physical characteristics for security',
    intel: '"Biometric scan requires a live fingerprint. We have a solution. You don\'t want to know what it is. Just have the container ready when I come out."',
  },
  {
    id: 'v_h4', type: 'missing_vowels', difficulty: 3,
    prompt: 'FILL THE VOWELS:\nC _ _ NT _ RM _ _ S _ R _',
    answer: 'COUNTERMEASURE',
    hint: 'Action taken against a security threat',
    intel: '"Every countermeasure they deploy tells us something about what they\'re protecting. The more elaborate the defence, the more valuable what\'s inside."',
  },
  {
    id: 'v_h5', type: 'missing_vowels', difficulty: 3,
    prompt: 'FILL THE VOWELS:\n_ XT _ LF _ LTR _ T _ _N',
    answer: 'EXFILTRATION',
    hint: 'Secret extraction of assets or personnel',
    intel: '"Exfiltration window: four minutes. The helicopter doesn\'t land — it hovers. You have a rope and exactly the upper body strength you were born with. Good luck."',
  },

  // ══════════════════════════════════════════════════════════════
  //  ODD ONE OUT  (difficulty: 1 easy, 2 medium, 3 hard)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'o_e1', type: 'odd_one_out', difficulty: 1,
    prompt: 'WHICH WORD DOES NOT BELONG?\nVAULT · SAFE · LOCK · RIVER',
    answer: 'RIVER',
    choices: ['VAULT', 'SAFE', 'LOCK', 'RIVER'],
    hint: 'Three are places that store things',
    intel: '"Spot the anomaly. In a vault, every detail has a purpose. One sensor out of place — that\'s your entry point. What doesn\'t belong?"',
  },
  {
    id: 'o_e2', type: 'odd_one_out', difficulty: 1,
    prompt: 'WHICH WORD DOES NOT BELONG?\nHACKER · AGENT · CIPHER · GUARD',
    answer: 'CIPHER',
    choices: ['HACKER', 'AGENT', 'CIPHER', 'GUARD'],
    hint: 'Three are people, one is a method',
    intel: '"Know what you\'re dealing with. Confuse an asset for a threat and the whole operation falls apart."',
  },
  {
    id: 'o_m1', type: 'odd_one_out', difficulty: 2,
    prompt: 'WHICH WORD DOES NOT BELONG?\nFIREWALL · DECRYPT · ENCODE · BREACH',
    answer: 'BREACH',
    choices: ['FIREWALL', 'DECRYPT', 'ENCODE', 'BREACH'],
    hint: 'Three are digital processes, one is physical entry',
    intel: '"Digital and physical — two sides of every modern heist. Know which weapons you\'re carrying before you reach the door."',
  },
  {
    id: 'o_m2', type: 'odd_one_out', difficulty: 2,
    prompt: 'WHICH WORD DOES NOT BELONG?\nSHADOW · GHOST · PHANTOM · SIGNAL',
    answer: 'SIGNAL',
    choices: ['SHADOW', 'GHOST', 'PHANTOM', 'SIGNAL'],
    hint: 'Three mean invisible presence, one is a transmission',
    intel: '"You\'re a ghost in this building. No signal, no trace, no memory. When you leave, the building should wonder if you were ever there."',
  },
  {
    id: 'o_h1', type: 'odd_one_out', difficulty: 3,
    prompt: 'WHICH WORD DOES NOT BELONG?\nINFILTRATE · EXFILTRATE · PENETRATE · CALIBRATE',
    answer: 'CALIBRATE',
    choices: ['INFILTRATE', 'EXFILTRATE', 'PENETRATE', 'CALIBRATE'],
    hint: 'Three are covert entry/exit actions',
    intel: '"Precision matters. An operation that\'s ninety percent right is a hundred percent failed. The odd element is always the vulnerability."',
  },
  {
    id: 'o_h2', type: 'odd_one_out', difficulty: 3,
    prompt: 'WHICH WORD DOES NOT BELONG?\nBLACKOUT · LOCKDOWN · COUNTDOWN · STANDDOWN',
    answer: 'STANDDOWN',
    choices: ['BLACKOUT', 'LOCKDOWN', 'COUNTDOWN', 'STANDDOWN'],
    hint: 'Three escalate tension, one ends it',
    intel: '"There is no stand-down. Not for us. Every mission ends in extraction or compromise. There is no third option."',
  },

  // ══════════════════════════════════════════════════════════════
  //  ACRONYM  (difficulty: 1 easy, 2 medium, 3 hard)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ac_e1', type: 'acronym', difficulty: 1,
    prompt: 'DECODE THE ACRONYM:\nS.A.F.E = Secure Asset _____ Encryption',
    answer: 'FIELD',
    hint: 'Where operatives work',
    intel: '"Every acronym is a small cipher. Operatives who use acronyms are either careful or paranoid. In our world those words mean the same thing."',
  },
  {
    id: 'ac_e2', type: 'acronym', difficulty: 1,
    prompt: 'DECODE THE ACRONYM:\nK.E.Y = Knowledge ___ Yield',
    answer: 'ENABLES',
    hint: 'What knowledge does to doors',
    intel: '"A key is just crystallised knowledge. Know the right thing and every door opens. That is what we do."',
  },
  {
    id: 'ac_m1', type: 'acronym', difficulty: 2,
    prompt: 'DECODE THE ACRONYM:\nS.H.A.D.O.W = Silent High-Asset ___ Operations Worldwide',
    answer: 'DENIAL',
    hint: 'What operatives maintain about their existence',
    intel: '"SHADOW division: officially dissolved in 2009. Unofficially? You\'re standing in their headquarters."',
  },
  {
    id: 'ac_m2', type: 'acronym', difficulty: 2,
    prompt: 'DECODE THE ACRONYM:\nG.H.O.S.T = Globally Hidden ___ Strike Team',
    answer: 'OPERATIVE',
    hint: 'What every member of GHOST is',
    intel: '"GHOST protocol means no names, no faces, no records. If you\'re reading this briefing, you\'ve already been briefed. Destroy after reading."',
  },
  {
    id: 'ac_h1', type: 'acronym', difficulty: 3,
    prompt: 'DECODE THE ACRONYM:\nE.X.I.L.E = ___ Extraction in Lethal Environments',
    answer: 'COVERT',
    hint: 'The type of extraction that keeps you alive',
    intel: '"EXILE protocol is last resort. If activated, the team disbands. No rendezvous. No extraction. You find your own way out. Good luck."',
  },
  {
    id: 'ac_h2', type: 'acronym', difficulty: 3,
    prompt: 'DECODE THE ACRONYM:\nZ.E.R.O = Zero ___ Reconnaissance Operation',
    answer: 'EVIDENCE',
    hint: 'What you must leave behind — nothing',
    intel: '"ZERO protocol. No fingerprints, no footage, no bodies. When morning comes, the vault is sealed, the records are clean, and you were never born."',
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Seeded PRNG (mulberry32)
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}



// Build a balanced 6-puzzle run:
// Stages 1-2 → easy (difficulty 1)
// Stages 3-4 → medium (difficulty 2)
// Stages 5-6 → hard (difficulty 3)
function buildBalancedRun(pickFn: (pool: Puzzle[]) => Puzzle): Puzzle[] {
  const easy = ALL_PUZZLES.filter(p => p.difficulty === 1);
  const medium = ALL_PUZZLES.filter(p => p.difficulty === 2);
  const hard = ALL_PUZZLES.filter(p => p.difficulty === 3);

  const types: PuzzleType[] = ['anagram', 'caesar', 'hidden_word', 'definition', 'missing_vowels', 'odd_one_out', 'acronym'];
  const used = new Set<string>();
  const result: Puzzle[] = [];

  // Pick 2 easy — try to get different types
  const easyTypes = shuffleArray(types);
  for (const t of easyTypes) {
    if (result.filter(p => p.difficulty === 1).length >= 2) break;
    const pool = easy.filter(p => p.type === t && !used.has(p.id));
    if (pool.length > 0) {
      const pick = pickFn(pool);
      result.push(pick);
      used.add(pick.id);
    }
  }
  // If we didn't get 2 easy, top up
  while (result.filter(p => p.difficulty === 1).length < 2) {
    const pool = easy.filter(p => !used.has(p.id));
    if (pool.length === 0) break;
    const pick = pickFn(pool);
    result.push(pick);
    used.add(pick.id);
  }

  // Pick 2 medium — try different types from what we have
  const medTypes = shuffleArray(types);
  for (const t of medTypes) {
    if (result.filter(p => p.difficulty === 2).length >= 2) break;
    const pool = medium.filter(p => p.type === t && !used.has(p.id));
    if (pool.length > 0) {
      const pick = pickFn(pool);
      result.push(pick);
      used.add(pick.id);
    }
  }
  while (result.filter(p => p.difficulty === 2).length < 2) {
    const pool = medium.filter(p => !used.has(p.id));
    if (pool.length === 0) break;
    const pick = pickFn(pool);
    result.push(pick);
    used.add(pick.id);
  }

  // Pick 2 hard
  const hardTypes = shuffleArray(types);
  for (const t of hardTypes) {
    if (result.filter(p => p.difficulty === 3).length >= 2) break;
    const pool = hard.filter(p => p.type === t && !used.has(p.id));
    if (pool.length > 0) {
      const pick = pickFn(pool);
      result.push(pick);
      used.add(pick.id);
    }
  }
  while (result.filter(p => p.difficulty === 3).length < 2) {
    const pool = hard.filter(p => !used.has(p.id));
    if (pool.length === 0) break;
    const pick = pickFn(pool);
    result.push(pick);
    used.add(pick.id);
  }

  // Sort: easy first, then medium, then hard (stage order)
  return [
    ...result.filter(p => p.difficulty === 1),
    ...result.filter(p => p.difficulty === 2),
    ...result.filter(p => p.difficulty === 3),
  ];
}

export function getClassicPuzzles(): Puzzle[] {
  return buildBalancedRun(pool => pool[Math.floor(Math.random() * pool.length)]);
}

export function getDailyPuzzles(dateStr: string): Puzzle[] {
  // Stable seed from date string
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
    seed |= 0;
  }
  const rand = seededRandom(Math.abs(seed));
  return buildBalancedRun(pool => {
    const idx = Math.floor(rand() * pool.length);
    return pool[idx];
  });
}

/** Returns all puzzles of a given type, shuffled, for practice mode */
export function getPracticeSet(type: PuzzleType): Puzzle[] {
  const pool = ALL_PUZZLES.filter(p => p.type === type);
  // simple shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/** Returns ALL puzzles shuffled — for free-play practice */
export function getAllShuffled(): Puzzle[] {
  const pool = [...ALL_PUZZLES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}
