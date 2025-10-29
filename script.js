// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.
//
// Drop-in replacement for script.js

(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ===================== CONFIG =====================
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  const BASE_THRESH = { 1:200, 2:180, 3:160, 4:140, 5:120, 6:100, 7:80, 8:60, 9:40 };

  // Global Spanish-read tokens (cap 7, commit-on-finish)
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // ===================== DATA (present-based for all tenses) =====================
  // GAME 5 — Technology & Social Media (Present Continuous + Connector: además)
// Direction: English -> Spanish
// Rules applied:
// - Only final ? is used in answers (no inverted ¿)
// - Accents required
// - Capitals NOT required (script will handle)
// - Pronouns not required EXCEPT "usted" must appear when marked (formal)
// - Connector: además

const PRESENT = {
  1: [
    { en: "I use my phone", es: "Uso mi móvil" },
    { en: "I have a computer", es: "Tengo un ordenador" },
    { en: "The internet is useful", es: "Internet es útil" },
    { en: "I send messages", es: "Envio mensajes" },
    { en: "I watch videos", es: "Veo vídeos" },
    { en: "I play video games", es: "Juego a los videojuegos" },
    { en: "My password is secure", es: "Mi contraseña es segura" },
    { en: "I like technology", es: "Me gusta la tecnología" },
    { en: "My phone is new", es: "Mi móvil es nuevo" },
    { en: "My screen is big", es: "Mi pantalla es grande" }
  ],
  2: [
    { en: "I do not share my password", es: "No comparto mi contraseña" },
    { en: "I use email", es: "Uso el correo electrónico" },
    { en: "I download music", es: "Descargo música" },
    { en: "I read the news online", es: "Leo las noticias en línea" },
    { en: "Do you use email?", es: "Usas el correo electrónico?" },
    { en: "Do you have Wi-Fi at home?", es: "Tienes wifi en casa?" },
    { en: "Do you like technology? (formal)", es: "Le gusta a usted la tecnología?" },
    { en: "My parents are strict with screens", es: "Mis padres son estrictos con las pantallas" },
    { en: "Ana uses a tablet", es: "Ana usa una tableta" },
    { en: "Juan prefers a laptop", es: "Juan prefiere un portátil" }
  ],
  3: [
    { en: "I am studying online", es: "Estoy estudiando en línea" },
    { en: "I am sending an email", es: "Estoy enviando un correo" },
    { en: "I am watching a documentary", es: "Estoy viendo un documental" },
    { en: "I do not open unknown links", es: "No abro enlaces desconocidos" },
    { en: "Do you use social media?", es: "Usas las redes sociales?" },
    { en: "Are you doing your homework? (formal)", es: "Está usted haciendo los deberes?" },
    { en: "The website is safe", es: "La página web es segura" },
    { en: "The app is free", es: "La aplicación es gratuita" },
    { en: "I study online and also revise vocabulary", es: "Estudio en línea y además repaso vocabulario" },
    { en: "We are learning quickly", es: "Estamos aprendiendo rápido" }
  ],
  4: [
    { en: "I am chatting with friends", es: "Estoy chateando con amigos" },
    { en: "I am downloading a file", es: "Estoy descargando un archivo" },
    { en: "I am listening to a podcast", es: "Estoy escuchando un pódcast" },
    { en: "I do not post personal data", es: "No publico datos personales" },
    { en: "Do you follow school accounts?", es: "Sigues cuentas del colegio?" },
    { en: "Are you using a strong password? (formal)", es: "Está usted usando una contraseña fuerte?" },
    { en: "The camera is good and also fast", es: "La cámara es buena y además rápida" },
    { en: "María is creating a presentation", es: "María está creando una presentación" },
    { en: "Pablo is fixing the computer", es: "Pablo está arreglando el ordenador" },
    { en: "We are sharing notes", es: "Estamos compartiendo apuntes" }
  ],
  5: [
    { en: "I am backing up my files", es: "Estoy haciendo una copia de seguridad de mis archivos" },
    { en: "I am updating the app", es: "Estoy actualizando la aplicación" },
    { en: "I am writing a report", es: "Estoy escribiendo un informe" },
    { en: "I am not wasting time online", es: "No estoy perdiendo el tiempo en línea" },
    { en: "Do you report cyberbullying?", es: "Denuncias el ciberacoso?" },
    { en: "Are you protecting your privacy? (formal)", es: "Está usted protegiendo su privacidad?" },
    { en: "The internet helps me and also distracts me", es: "Internet me ayuda y además me distrae" },
    { en: "We are preparing a slideshow", es: "Estamos preparando una presentación" },
    { en: "I am organising my folders", es: "Estoy organizando mis carpetas" },
    { en: "I am learning new skills", es: "Estoy aprendiendo habilidades nuevas" }
  ],
  6: [
    { en: "I am researching a topic", es: "Estoy investigando un tema" },
    { en: "I am editing a video", es: "Estoy editando un vídeo" },
    { en: "I am creating a secure password", es: "Estoy creando una contraseña segura" },
    { en: "I am not sharing my location", es: "No estoy compartiendo mi ubicación" },
    { en: "Are you reading reliable sources?", es: "Lees fuentes fiables?" },
    { en: "Are you using two-factor authentication? (formal)", es: "Está usted usando la verificación en dos pasos?" },
    { en: "The platform is simple and also accessible", es: "La plataforma es sencilla y además accesible" },
    { en: "Ana is designing a poster", es: "Ana está diseñando un cartel" },
    { en: "We are testing the microphone", es: "Estamos probando el micrófono" },
    { en: "I am saving my work often", es: "Estoy guardando mi trabajo a menudo" }
  ],
  7: [
    { en: "I am managing my screen time", es: "Estoy gestionando mi tiempo de pantalla" },
    { en: "I am cleaning the storage", es: "Estoy limpiando el almacenamiento" },
    { en: "I am connecting to the school network", es: "Estoy conectándome a la red del colegio" },
    { en: "I am not accepting requests from strangers", es: "No estoy aceptando solicitudes de desconocidos" },
    { en: "Do you update your apps regularly?", es: "Actualizas tus aplicaciones regularmente?" },
    { en: "Are you checking the settings? (formal)", es: "Está usted revisando la configuración?" },
    { en: "The device is new and also fast", es: "El dispositivo es nuevo y además rápido" },
    { en: "Juan is installing software", es: "Juan está instalando software" },
    { en: "We are changing the password", es: "Estamos cambiando la contraseña" },
    { en: "I am learning to code", es: "Estoy aprendiendo a programar" }
  ],
  8: [
    { en: "I am preparing a digital portfolio", es: "Estoy preparando un portafolio digital" },
    { en: "I am collaborating in a shared document", es: "Estoy colaborando en un documento compartido" },
    { en: "I am checking my notifications", es: "Estoy revisando mis notificaciones" },
    { en: "I am not clicking suspicious ads", es: "No estoy haciendo clic en anuncios sospechosos" },
    { en: "Do you compare information on different sites?", es: "Comparas información en sitios diferentes?" },
    { en: "Are you downloading legally? (formal)", es: "Está usted descargando de forma legal?" },
    { en: "The class is online and also interactive", es: "La clase es en línea y además interactiva" },
    { en: "María is presenting her project", es: "María está presentando su proyecto" },
    { en: "We are practising a live stream", es: "Estamos practicando una retransmisión en directo" },
    { en: "I am organising my digital life", es: "Estoy organizando mi vida digital" }
  ],
  9: [
    { en: "I am using AI to study", es: "Estoy usando IA para estudiar" },
    { en: "I am checking sources for bias", es: "Estoy comprobando sesgos en las fuentes" },
    { en: "I am improving my digital wellbeing", es: "Estoy mejorando mi bienestar digital" },
    { en: "I am not sharing photos without permission", es: "No estoy compartiendo fotos sin permiso" },
    { en: "Do you verify facts before posting?", es: "Verificas los hechos antes de publicar?" },
    { en: "Are you respecting copyright? (formal)", es: "Está usted respetando los derechos de autor?" },
    { en: "The tool is powerful and also easy", es: "La herramienta es potente y además fácil" },
    { en: "Pablo is modelling a 3D object", es: "Pablo está modelando un objeto 3D" },
    { en: "We are preparing a podcast episode", es: "Estamos preparando un episodio de pódcast" },
    { en: "I am protecting my digital identity", es: "Estoy protegiendo mi identidad digital" }
  ],
  10: [
    { en: "I am balancing study and screen time", es: "Estoy equilibrando estudio y tiempo de pantalla" },
    { en: "I am presenting a project online", es: "Estoy presentando un proyecto en línea" },
    { en: "I am collaborating with my class", es: "Estoy colaborando con mi clase" },
    { en: "I am not ignoring safety rules", es: "No estoy ignorando las normas de seguridad" },
    { en: "Do you manage your data well?", es: "Gestionas bien tus datos?" },
    { en: "Are you using technology responsibly? (formal)", es: "Está usted usando la tecnología de forma responsable?" },
    { en: "The platform is safe and also reliable", es: "La plataforma es segura y además fiable" },
    { en: "Ana is sharing her findings", es: "Ana está compartiendo sus conclusiones" },
    { en: "We are creating quality content", es: "Estamos creando contenido de calidad" },
    { en: "I am learning and progressing every day", es: "Estoy aprendiendo y progresando cada día" }
  ]
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const DATASETS = { Present: PRESENT, Past: deepCopy(PRESENT), Future: deepCopy(PRESENT) };

  // ===================== Global cheats =====================
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v == null) { localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX)); return GLOBAL_CHEATS_MAX; }
    const n = parseInt(v,10);
    return Number.isFinite(n) ? clampCheats(n) : GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){ localStorage.setItem(GLOBAL_CHEATS_KEY, String(clampCheats(n))); }

 // ===================== Compare =====================
const norm = s => (s || "").trim();
const endsWithQM = s => norm(s).endsWith("?");

// Accents REQUIRED; ñ ≡ n; CAPITALS IGNORED; ignore leading '¿' and a final '.' or '?'
function coreKeepAccents(s) {
  let t = norm(s);
  if (t.startsWith("¿")) t = t.slice(1);            // ignore opening ¿ if typed
  if (t.endsWith("?") || t.endsWith(".")) t = t.slice(0, -1); // ignore trailing ? or .
  t = t.replace(/ñ/gi, "n");                        // treat ñ as n
  t = t.toLowerCase();                              // ignore capitals
  return t.replace(/\s+/g, " ");                    // collapse spaces
}

// Require '?' ONLY if the EXPECTED Spanish is a question
function cmpAnswer(user, expected) {
  const expIsQ = endsWithQM(expected);
  if (expIsQ && !endsWithQM(user)) return false;    // enforce ? only for questions
  return coreKeepAccents(user) === coreKeepAccents(expected);
}


  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev = getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){ if (lvl===1) return true; const need = BASE_THRESH[lvl-1]; const prev = getBest(tense,lvl-1); return prev!=null && (need==null || prev<=need); }

  // ===================== Helpers =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function speak(text, lang="es-ES"){ try{ if(!("speechSynthesis" in window)) return; const u=new SpeechSynthesisUtterance(text); u.lang=lang; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
  let rec=null, recActive=false;
  function ensureRecognizer(){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return null; if(!rec){ rec=new SR(); rec.lang="es-ES"; rec.interimResults=false; rec.maxAlternatives=1; } return rec; }
  function startDictationFor(input,onStatus){
    const r=ensureRecognizer(); if(!r){onStatus&&onStatus(false);return;}
    if(recActive){try{r.stop();}catch{} recActive=false; onStatus&&onStatus(false);}
    try{
      r.onresult=e=>{ const txt=(e.results[0]&&e.results[0][0]&&e.results[0][0].transcript)||""; const v=txt.trim(); input.value = v.endsWith("?")?v:(v+"?"); input.dispatchEvent(new Event("input",{bubbles:true})); };
      r.onend=()=>{recActive=false; onStatus&&onStatus(false);};
      recActive=true; onStatus&&onStatus(true); r.start();
    }catch{ onStatus&&onStatus(false); }
  }
  function miniBtn(text,title){ const b=document.createElement("button"); b.type="button"; b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",marginLeft:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ===================== Celebration Styles & Helpers =====================
  function injectCelebrationCSS(){
    if (document.getElementById("tqplus-anim-style")) return;
    const css = `
    @keyframes tq-burst { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg); opacity:0} }
    @keyframes tq-pop { 0%{transform:scale(0.6); opacity:0} 25%{transform:scale(1.05); opacity:1} 60%{transform:scale(1)} 100%{opacity:0} }
    @keyframes tq-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    .tq-celebrate-overlay{ position:fixed; inset:0; z-index:9999; pointer-events:none; }
    .tq-confetti{ position:absolute; width:8px; height:14px; border-radius:2px; opacity:0.95; will-change:transform,opacity; animation:tq-burst 1600ms ease-out forwards; }
    .tq-perfect-banner{ position:fixed; left:50%; top:16%; transform:translateX(-50%); padding:10px 18px; border-radius:12px; font-weight:900; font-size:28px; letter-spacing:1px;
      color:#fff; background:linear-gradient(90deg,#ff2d55,#ff9f0a); box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:tq-pop 1800ms ease-out forwards; text-shadow:0 1px 2px rgba(0,0,0,0.35); }
    .tq-shake{ animation:tq-shake 650ms ease-in-out; }
    `;
    const s=document.createElement("style"); s.id="tqplus-anim-style"; s.textContent=css; document.head.appendChild(s);
  }

  function showPerfectCelebration(){
    injectCelebrationCSS();
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "tq-celebrate-overlay";
    document.body.appendChild(overlay);

    // make 120 confetti bits across width
    const COLORS = ["#ff2d55","#ff9f0a","#ffd60a","#34c759","#0a84ff","#bf5af2","#ff375f"];
    const W = window.innerWidth;
    for (let i=0; i<120; i++){
      const c = document.createElement("div");
      c.className = "tq-confetti";
      const size = 6 + Math.random()*8;
      c.style.width  = `${size}px`;
      c.style.height = `${size*1.4}px`;
      c.style.left   = `${Math.random()*W}px`;
      c.style.top    = `${-20 - Math.random()*120}px`;
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDelay = `${Math.random()*200}ms`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      overlay.appendChild(c);
    }

    // banner
    const banner = document.createElement("div");
    banner.className = "tq-perfect-banner";
    banner.textContent = "PERFECT!";
    document.body.appendChild(banner);

    // cleanup after 2.2s
    setTimeout(()=>{ overlay.remove(); banner.remove(); }, 2200);
  }

  // ===================== UI flow =====================
  let CURRENT_TENSE = "Present";
  let quiz = [], currentLevel = null, t0=0, timerId=null, submitted=false;

  // attempt-local token tracking (commit on finish)
  let cheatsUsedThisRound = 0;
  let globalSnapshotAtStart = 0;
  const attemptRemaining = () => Math.max(0, globalSnapshotAtStart - cheatsUsedThisRound);

  function updateESButtonsState(container){
    const left = attemptRemaining();
    const esBtns = Array.from(container.querySelectorAll('button[data-role="es-tts"]'));
    esBtns.forEach(btn=>{
      const active = left>0;
      btn.disabled = !active;
      btn.style.opacity = active ? "1" : "0.5";
      btn.style.cursor  = active ? "pointer" : "not-allowed";
      btn.title = active ? `Read Spanish target (uses 1; attempt left: ${left})` : "No Spanish reads left for this attempt";
    });
  }

  function startTimer(){
    t0 = Date.now();
    clearInterval(timerId);
    timerId = setInterval(()=>{ const t=Math.floor((Date.now()-t0)/1000); const el=$("#timer"); if(el) el.textContent=`Time: ${t}s`; },200);
  }
  function stopTimer(){ clearInterval(timerId); timerId=null; return Math.floor((Date.now()-t0)/1000); }

  function renderLevels(){
    const host = $("#level-list"); if(!host) return;
    host.innerHTML = "";
    const ds = DATASETS[CURRENT_TENSE] || {};
    const available = Object.keys(ds).map(n=>parseInt(n,10)).filter(Number.isFinite).sort((a,b)=>a-b);
    available.forEach(i=>{
      const unlocked = isUnlocked(CURRENT_TENSE,i);
      const best = getBest(CURRENT_TENSE,i);
      const btn = document.createElement("button");
      btn.className="level-btn"; btn.disabled=!unlocked;
      btn.textContent = unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if (unlocked && best!=null){
        const span=document.createElement("span"); span.className="best"; span.textContent=` (Best Score: ${best}s)`; btn.appendChild(span);
      }
      if (unlocked) btn.onclick=()=>startLevel(i);
      host.appendChild(btn);
    });
    host.style.display="flex"; const gm=$("#game"); if(gm) gm.style.display="none";
  }

  function startLevel(level){
    currentLevel = level; submitted=false; cheatsUsedThisRound=0; globalSnapshotAtStart=getGlobalCheats();
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

  function renderQuiz(){
    const qwrap=$("#questions"); if(!qwrap) return; qwrap.innerHTML="";
    quiz.forEach((q,i)=>{
      const row=document.createElement("div"); row.className="q";

      const p=document.createElement("div"); p.className="prompt"; p.textContent=`${i+1}. ${q.prompt}`;
      const controls=document.createElement("span");
      Object.assign(controls.style,{display:"inline-block",marginLeft:"6px",verticalAlign:"middle"});

      const enBtn=miniBtn("🔈 EN","Read English prompt"); enBtn.onclick=()=>speak(q.prompt,"en-GB");
      const esBtn=miniBtn("🔊 ES","Read Spanish target (uses 1 this attempt)"); esBtn.setAttribute("data-role","es-tts");
      esBtn.onclick=()=>{ if (attemptRemaining()<=0){ updateESButtonsState(qwrap); return; } speak(q.answer,"es-ES"); cheatsUsedThisRound+=1; updateESButtonsState(qwrap); };
      const micBtn=miniBtn("🎤","Dictate into this answer"); micBtn.onclick=()=>{ startDictationFor(input,(on)=>{ micBtn.style.borderColor=on?"#f39c12":"#ddd"; micBtn.style.boxShadow=on?"0 0 0 2px rgba(243,156,18,0.25)":"none"; }); };

      controls.appendChild(enBtn); controls.appendChild(esBtn); controls.appendChild(micBtn); p.appendChild(controls);

      const input=document.createElement("input"); input.type="text"; input.placeholder="Type the Spanish here (must end with ?)";
      input.oninput=e=>{ quiz[i].user=e.target.value; };
      input.addEventListener("keydown",(e)=>{ if(e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ if(e.code==="KeyR"){e.preventDefault();enBtn.click();} else if(e.code==="KeyS"){e.preventDefault();esBtn.click();} else if(e.code==="KeyM"){e.preventDefault();micBtn.click();} }});

      row.appendChild(p); row.appendChild(input); qwrap.appendChild(row);
    });
    updateESButtonsState(qwrap);

    const submit=$("#submit"); if(submit){ submit.disabled=false; submit.textContent="Finish & Check"; submit.onclick=finishAndCheck; }
    const back=$("#back-button"); if(back){ back.style.display="inline-block"; back.onclick=backToLevels; }
  }

  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; inputs[i].classList.remove("good","bad"); inputs[i].classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

    const penalties = wrong*PENALTY_PER_WRONG;
    const finalScore = elapsed + penalties;

    const submit=$("#submit"); if(submit){ submit.disabled=true; submit.textContent="Checked"; }

    // Unlock message
    let unlockMsg="";
    if (currentLevel<10){
      const need=BASE_THRESH[currentLevel];
      if (typeof need==="number"){
        if (finalScore<=need) unlockMsg=`🎉 Next level unlocked! (Needed ≤ ${need}s)`;
        else unlockMsg=`🔓 Need ${finalScore-need}s less to unlock Level ${currentLevel+1} (Target ≤ ${need}s).`;
      }
    } else unlockMsg="🏁 Final level — great work!";

    // ===== Commit global tokens now =====
    const before = getGlobalCheats();
    let after = clampCheats(globalSnapshotAtStart - cheatsUsedThisRound);
    const perfect = (correct===quiz.length);
    if (perfect && after<GLOBAL_CHEATS_MAX) after = clampCheats(after+1);
    setGlobalCheats(after);

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.35rem; font-weight:800;">🏁 FINAL SCORE: ${finalScore}s</div>
       <div class="line">⏱️ Time: <strong>${elapsed}s</strong></div>
       <div class="line">➕ Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">✅ Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>
       <div class="line" style="margin-top:8px;">🎧 Spanish reads used this round: <strong>${cheatsUsedThisRound}</strong> &nbsp;|&nbsp; Global after commit: <strong>${after}/${GLOBAL_CHEATS_MAX}</strong></div>`;

    // Celebrate on perfect
    if (perfect){
      showPerfectCelebration();
      // subtle shake on the summary box so it "feels" like a win
      summary.classList.add("tq-shake");
      const bonusNote = document.createElement("div");
      bonusNote.className = "line";
      bonusNote.style.marginTop = "6px";
      bonusNote.innerHTML = (after>before)
        ? `⭐ Perfect round! Spanish-read tokens: ${before} → ${after} (max ${GLOBAL_CHEATS_MAX}).`
        : `⭐ Perfect round! (Spanish-read tokens already at max ${GLOBAL_CHEATS_MAX}).`;
      summary.appendChild(bonusNote);
    }

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      li.innerHTML = `${q.prompt} — <strong>${q.answer}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${q.user||""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init global cheats
    setGlobalCheats(getGlobalCheats());

    // tense switching (present-based datasets across all)
    $$("#tense-buttons .tense-button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        e.preventDefault();
        const t = btn.dataset.tense || btn.textContent.trim();
        if (!DATASETS[t]) return;
        $$("#tense-buttons .tense-button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_TENSE = t;
        backToLevels();
      });
    });

    // default active
    const presentBtn = $(`#tense-buttons .tense-button[data-tense="Present"]`) || $$("#tense-buttons .tense-button")[0];
    if (presentBtn) presentBtn.classList.add("active");

    renderLevels();
  });
})();
