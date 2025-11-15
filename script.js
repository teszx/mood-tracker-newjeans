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
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: linear-gradient(135deg, #f3faff, #eef7ff, #f8fcff);
    font-family: "Poppins", sans-serif;
    color: #77a4c7;
    text-align: center;
  }

  .card {
    width: min(92%, 460px);
    background: rgba(255,255,255,0.36);
    border-radius: 22px;
    padding: 36px 32px;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.35);
    box-shadow: 0 12px 30px rgba(120,150,180,0.15);
    animation: pop .25s ease;
  }

  @keyframes pop {
    from { opacity: 0; transform: scale(.96); }
    to { opacity: 1; transform: scale(1); }
  }

  .loader {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 6px solid rgba(170,200,230,0.35);
    border-top-color: #6d93b5;
    animation: spin 1.05s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  h2 {
    margin: 6px 0;
    font-size: 22px;
    font-weight: 600;
    color: #6d93b5;
  }

  .frase {
    font-size: 15px;
    color: #7ea9c8;
    line-height: 1.45;
    max-width: 340px;
    margin-top: 8px;
  }
</style>
</head>

<body>
  <div class="card">
    <div class="loader"></div>
    <h2>Preparando sua música....</h2>
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