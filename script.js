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
        popup = window.open("", "playerPopup", "width=420,height=280");
    } catch (e) {
        popup = null;
    }

    if (!popup) {
        window.open(url, "_blank");
        return;
    }

    popup.document.open();
 // substitua sua chamada popup.document.write(`...`) por ESTE bloco abaixo:
popup.document.write(`
<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Carregando...</title>
<style>
  /* reset e box sizing */
  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100%;
  }

  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f3faff 0%, #eef7ff 50%, #f8fcff 100%);
    font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
    color: #77a4c7;
    text-align: center;
    padding: 24px;
    -webkit-font-smoothing: antialiased;
    backdrop-filter: blur(10px);
  }

  .card {
    width: min(92%, 420px);        /* responsivo: ocupa até 92% da viewport ou 420px */
    max-width: 420px;
    background: rgba(255,255,255,0.36);
    padding: 30px 32px;
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(120,150,180,0.12);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.35);
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    animation: pop 220ms cubic-bezier(.2,.9,.3,1);
  }

  @keyframes pop {
    from { transform: translateY(-6px) scale(.98); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
  }

  .loader {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 5px solid rgba(170,200,230,0.38);
    border-top-color: #6d93b5;
    animation: spin 1.05s linear infinite;
    box-shadow: 0 4px 14px rgba(100,140,180,0.06) inset;
  }
  @keyframes spin { to { transform: rotate(360deg) } }

  h2 {
    margin: 4px 0;
    font-size: 20px;
    font-weight: 600;
    color: #6d93b5;
  }

  .frase {
    font-size: 14px;
    color: #7ea9c8;
    line-height: 1.45;
    max-width: 320px;
    margin-top: 6px;
  }

  /* pequenas adaptações para telas maiores */
  @media (min-width: 600px) {
    .card { padding: 36px; }
    .loader { width: 72px; height: 72px; border-width: 6px; }
    h2 { font-size: 22px; }
    .frase { font-size: 15px; }
  }
</style>
</head>
<body>
  <div class="card" role="status" aria-live="polite">
    <div class="loader" aria-hidden="true"></div>
    <h2>Preparando sua música...</h2>
    <div class="frase">${frase}</div>
  </div>

  <script>
    // foco e acessibilidade
    try { window.focus(); } catch(e) {}
    // opcional: fechar automaticamente após X segundos (se quiser)
    // setTimeout(()=> window.close(), 15000);
  </script>
</body>
</html>
`);

popup.document.close();

    setTimeout(() => {
        popup.location.href = url.includes("?") ? url + "&autoplay=1" : url + "?autoplay=1";
    }, 700);
}