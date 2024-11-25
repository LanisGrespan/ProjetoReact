import React, { useState } from 'react';

const MedidorIMC: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [peso, setPeso] = useState<number | string>('');
  const [altura, setAltura] = useState<number | string>('');
  const [resultado, setResultado] = useState<string>('');
  const [errorPeso, setErrorPeso] = useState<string | null>(null);
  const [errorAltura, setErrorAltura] = useState<string | null>(null);

  const calcularIMC = () => {
    // Validar o peso e altura
    if (isNaN(Number(peso)) || Number(peso) <= 0) {
      setErrorPeso('Peso deve ser um número positivo.');
      return;
    } else {
      setErrorPeso(null);
    }

    if (isNaN(Number(altura)) || Number(altura) <= 0) {
      setErrorAltura('Altura deve ser um número positivo.');
      return;
    } else {
      setErrorAltura(null);
    }

    // Calcular IMC
    const imc = Number(peso) / (Number(altura) * Number(altura));
    let classificacao = '';

    if (imc < 17) {
      classificacao = 'Muito abaixo do peso';
    } else if (imc >= 17 && imc < 18) {
      classificacao = 'Abaixo do peso';
    } else if (imc >= 18 && imc < 25) {
      classificacao = 'Peso ideal';
    } else if (imc >= 25 && imc < 30) {
      classificacao = 'Acima do peso';
    } else if (imc >= 30 && imc < 35) {
      classificacao = 'Obesidade grau I. Procure um médico';
    } else if (imc >= 35 && imc < 40) {
      classificacao = 'Obesidade grau II. Procure um médico';
    } else {
      classificacao = 'Obesidade grau III. Procure um médico';
    }

    setResultado(`Seu IMC é: ${imc.toFixed(2)}. ${classificacao}`);
  };

  return (
    <div>
      <h1>Medidor de IMC</h1>
      <div>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Peso (kg):
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Peso em kg"
          />
        </label>
        {errorPeso && <p style={{ color: 'red' }}>{errorPeso}</p>}
      </div>
      <div>
        <label>
          Altura (m):
          <input
            type="number"
            step="0.01"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Altura em metros"
          />
        </label>
        {errorAltura && <p style={{ color: 'red' }}>{errorAltura}</p>}
      </div>
      <button onClick={calcularIMC}>Calcular IMC</button>

      {resultado && <p>{resultado}</p>}
    </div>
  );
};

export default MedidorIMC;
