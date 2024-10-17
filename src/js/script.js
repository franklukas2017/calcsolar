document.getElementById("solarForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Pegando valores dos inputs
  const tipoCliente = document.getElementById("residencialEmpresarial").value;
  const cidade = document.getElementById("cidade").value;
  const valorConta = parseFloat(document.getElementById("valorConta").value);

  // Taxas e parâmetros baseados no tipo de cliente e cidade
  const hsp = cidade === "brasilia" ? 5.5 : 5.0; // Horas de Sol Pleno para cada cidade
  const taxaConsumo = tipoCliente === "residencial" ? 0.5 : 0.8; // Taxas de conversão residencial/empresarial

  // Cálculos com base nos valores fornecidos
  const consumoAnual = (valorConta / taxaConsumo) * 12; // Estimativa de consumo anual
  const potenciaSistema = consumoAnual / (hsp * 365); // Tamanho do sistema
  const quantidadePaineis = Math.ceil(potenciaSistema / 0.33); // Número de painéis (0.33kWp por painel)
  const areaNecessaria = quantidadePaineis * 2; // Área necessária em metros quadrados
  const investimentoMin = (potenciaSistema * 6000).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const investimentoMax = (potenciaSistema * 8000).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const economia30Anos = (valorConta * 12 * 30).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const economiaRendaFixa = (valorConta * 12 * 30 * 3).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }); // Simulação de 3x de retorno

  // Atualizar os resultados no card
  document.getElementById(
    "investimento"
  ).innerText = `${investimentoMin} - ${investimentoMax}`;
  document.getElementById("potencia").innerText = `${potenciaSistema.toFixed(
    2
  )} kWp`;
  document.getElementById("producaoAnual").innerText = `${consumoAnual.toFixed(
    2
  )} kWh/ano`;
  document.getElementById("areaNecessaria").innerText = `${areaNecessaria} m²`;
  document.getElementById("paineis").innerText = `${quantidadePaineis} painéis`;
  document.getElementById("economia30Anos").innerText = economia30Anos;
  document.getElementById("economiaRendaFixa").innerText = economiaRendaFixa;

  // Mostrar o card com os resultados
  document.getElementById("resultCard").style.display = "block";

  // Gerar a mensagem para WhatsApp
  const mensagem =
    `Estimativa%20de%20investimento:%20${investimentoMin}%20-%20${investimentoMax}%0A` +
    `Tamanho%20do%20sistema:%20${potenciaSistema.toFixed(2)}%20kWp%0A` +
    `Produção%20anual%20estimada:%20${consumoAnual.toFixed(2)}%20kWh/ano%0A` +
    `Área%20necessária:%20${areaNecessaria}%20m²%0A` +
    `Quantidade%20de%20painéis:%20${quantidadePaineis}%20painéis%0A` +
    `Economia%20em%2030%20anos:%20${economia30Anos}%0A` +
    `Economia%20aplicada%20em%20renda%20fixa:%20${economiaRendaFixa}%0A`;

  // Atualizar o link do WhatsApp com a mensagem dinâmica
  const numeroWhatsApp = "5561982281303"; // Substitua pelo número correto
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  document.getElementById("whatsappLink").href = urlWhatsApp;
});
