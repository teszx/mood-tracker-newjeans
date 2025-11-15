const musicas = {
    feliz: [
        "https://youtu.be/2u_kncwzJ5Y?si=uY54rn7L0oxZRwuK",
        "https://youtu.be/6OMfjwK3X44?si=MVWipntuXY8nWa7_",
        "https://youtu.be/n7ePZLn9_lQ?si=APSU6ayHKVPo6X49"
    ],
    triste: [
        "https://youtu.be/SXM1q0CTfew?si=DW4t9p67XEgEbXZh",
        "https://youtu.be/iR2Uq2LINyU?si=xEQMTvtDtivEpcVg",
        "https://youtu.be/uNN2lN7M7cA?si=g7GzOMsV03UMp0R"
    ],
    cansada: [
        "https://youtu.be/QnB4_D636WE?si=MKqhxsovnghnawXQ",
        "https://youtu.be/iR2Uq2LINyU?si=Yf_HubPeZUL5HyXD",
        "https://youtu.be/mMRddwYFW8A?si=_pG0gVvSWD84Ca8"
    ],
    estressada: [
        "https://youtu.be/5emU4TSPxc8?si=MTq1XS-YztnJCpfj",
        "https://youtu.be/Zqdbsz4M3-M?si=Zr44wgQ6L4KMd8ao",
        "https://youtu.be/Nzg48Ak_jEc?si=TeN_G7JpH-xFESve"
    ],
    saudade: [
        "https://youtu.be/cT9wIINtBwA?si=2oZP9mMNiNTYIxGr",
        "https://youtu.be/OWOa8wXjSYw?si=Ji9MZ33w2N-vrOj7",
        "https://youtu.be/o8RkbHv2_a0?si=2PJhi9099BPtRxae"
    ]
};

let indiceAtual = {
    feliz: 0,
    triste: 0,
    cansada: 0,
    estressada: 0,
    saudade: 0
};

const frasesPorHumor = {
    feliz: ["Vejo que alguém está radiante, hein? Consigo até imaginar seus olhinhos brilhando."],
    triste: ["Tá tudo bem sentir assim. Eu tô aqui com você."],
    cansada: ["Você não falhou: só precisa descansar. Você é humana, meu amor."],
    estressada: ["Respira… você é maior que qualquer problema."],
    saudade: ["Eu também sinto uma saudade imensa de você."]
};

function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function tocarMusica(humor) {
    const lista = musicas[humor];
    const index = indiceAtual[humor];

    const frase = frasesPorHumor[humor][0];
    const url = lista[index];

    indiceAtual[humor] = (index + 1) % lista.length;

    let popup = null;
try {
    popup = window.open("", "playerPopup"); // ⬅ TELA CHEIA NO SAFARI
} catch (e) {
    popup = null;
}

if (!popup) {
    window.open(url, "_blank");
    return;
}

popup.document.open();

popup.document.write(`
<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Carregando...</title>

<style>
  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;

    background: linear-gradient(135deg, #eaf4ff, #f5f9ff, #eef6ff);
    font-family: "Poppins", sans-serif;
    color: #77a4c7;
    text-align: center;
    overflow: hidden;
  }

 
  .bunny {
    position: absolute;
    opacity: 0.22;
    animation: bunfloat 6s ease-in-out infinite;
    filter: drop-shadow(0 0 6px #dce8ff);
  }

  
  .b1 { top: 12%; left: 10%; transform: scale(1.0); }
  .b2 { top: 40%; right: 12%; transform: scale(0.8); animation-delay: .8s; }
  .b3 { bottom: 10%; left: 44%; transform: scale(1.1); animation-delay: 1.5s; }

 
  .bunny::before, .bunny::after {
    content: "";
    position: absolute;
    background: #cfe3ff;
    border-radius: 50%;
  }

  
  .bunny {
    width: 60px;
    height: 45px;
    background: #dbeaff;
    border-radius: 50%;
  }

 
  .bunny::before {
    width: 18px;
    height: 32px;
    left: 8px;
    top: -20px;
  }

  .bunny::after {
    width: 18px;
    height: 32px;
    right: 8px;
    top: -20px;
  }

  @keyframes bunfloat {
    0% { transform: translateY(0); }
    50% { transform: translateY(-14px); }
    100% { transform: translateY(0); }
  }


  .card {
    width: min(92%, 460px);
    background: rgba(255, 255, 255, 0.35);
    border-radius: 22px;
    padding: 36px 32px;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.45);
    box-shadow: 0 12px 30px rgba(140,160,180,0.18);
    animation: pop .25s ease;
    position: relative;
    z-index: 2;
  }

  @keyframes pop {
    from { opacity: 0; transform: scale(.94); }
    to { opacity: 1; transform: scale(1); }
  }

  
  .loader {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 6px solid rgba(140,170,210,0.35);
    border-top-color: #6d93b5;
    animation: spin 1s linear infinite;
    margin: 0 auto 18px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  h2 {
    margin: 8px 0 6px;
    font-size: 22px;
    font-weight: 600;
    color: #6d8fc7;
  }

  .frase {
    font-size: 15px;
    color: #7ea9c8;
    line-height: 1.45;
    max-width: 340px;
    margin: 8px auto 0;
  }
</style>
</head>

<body>

  <div class="bunny b1"></div>
  <div class="bunny b2"></div>
  <div class="bunny b3"></div>


  <div class="card">
    <div class="loader"></div>
    <h2>Preparando sua música...</h2>
    <div class="frase">${frase}</div>
  </div>
</body>
</html>
`);

popup.document.close();

    setTimeout(() => {
        popup.location.href = url.includes("?") ? url + "&autoplay=1" : url + "?autoplay=1";
    }, 700);
}