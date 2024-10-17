document
  .getElementById("solarCalculator")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const energyBill = parseFloat(document.getElementById("energyBill").value);
    const customerType = document.getElementById("customerType").value;
    const hsp = parseFloat(document.getElementById("region").value);
    const panelPower = parseFloat(document.getElementById("panelPower").value);
    const efficiency = 0.8;
    const daysInMonth = 30;

    // Taxas de energia (R$/kWh)
    const rates = {
      residential: 0.7,
      business: 0.9,
    };

    // Calcular o consumo mensal em kWh
    const consumption = energyBill / rates[customerType];

    // Potência necessária do sistema
    const systemPower = consumption / (hsp * daysInMonth * efficiency);

    // Número de painéis
    const panelCount = Math.ceil(systemPower / (panelPower / 1000));

    // Estimativa de investimento (R$)
    const investment = systemPower * 7000;

    // Produção anual estimada (kWh)
    const annualProduction = systemPower * hsp * 365 * efficiency;

    // Área necessária (m²)
    const area = panelCount * 2;

    // Economia do cliente em 30 anos (assumindo que o sistema cobre 100% da energia)
    const savings30Years = energyBill * 12 * 30;

    // Economia aplicada em renda fixa com 6% ao ano por 30 anos
    const fixedIncomeRate = 0.06;
    const savingsWithInterest =
      savings30Years * Math.pow(1 + fixedIncomeRate, 30);

    // Exibir o resultado
    document.getElementById("result").innerHTML = `
    <p><strong>Estimativa de investimento:</strong></p>
    <p>R$ ${investment.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</p>

    <p><strong>Tamanho do sistema:</strong></p>
    <p>${systemPower.toFixed(2)} kWp</p>

    <p><strong>Produção anual estimada:</strong></p>
    <p>${annualProduction.toFixed(2)} kWh</p>

    <p><strong>Área necessária:</strong></p>
    <p>${area.toFixed(2)} m²</p>

    <p><strong>Quantidade de painéis:</strong></p>
    <p>${panelCount}</p>

    <p><strong>Economia em 30 anos:</strong></p>
    <p>R$ ${savings30Years.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</p>

    <p><strong>Economia em renda fixa (6% a.a.) por 30 anos:</strong></p>
    <p>R$ ${savingsWithInterest.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</p>
  `;
  });
