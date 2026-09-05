import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Check, X, Copy, Shuffle } from 'lucide-react';
import { calculateCheckDigits, isRepeatedDigits, validateCPF, formatCPF } from './lib/cpf';

interface CPFDigits {
  [key: number]: string;
}

function App() {
  const [cpfDigits, setCpfDigits] = useState<CPFDigits>({});
  const [generatedCPF, setGeneratedCPF] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationCPF, setValidationCPF] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const digitInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const generateCPF = () => {
    const digits = Array(9).fill('');

    for (let i = 0; i < 9; i++) {
      digits[i] = cpfDigits[i] || Math.floor(Math.random() * 10).toString();
    }

    const [digit1, digit2] = calculateCheckDigits(digits);
    const fullDigits = [...digits, digit1.toString(), digit2.toString()];

    if (isRepeatedDigits(fullDigits)) {
      alert('Essa combinação de dígitos gera um CPF com todos os números iguais, que não é válido. Mude pelo menos um dígito fixado.');
      return;
    }

    setCpfDigits(Object.fromEntries(fullDigits.map((d, i) => [i, d])));
    setGeneratedCPF(formatCPF(fullDigits.join('')));
  };

  const generateRandomCPF = () => {
    let digits: string[];
    do {
      const base = Array(9).fill('').map(() => Math.floor(Math.random() * 10).toString());
      const [digit1, digit2] = calculateCheckDigits(base);
      digits = [...base, digit1.toString(), digit2.toString()];
    } while (isRepeatedDigits(digits));
    setCpfDigits(Object.fromEntries(digits.map((d, i) => [i, d])));
    setGeneratedCPF(formatCPF(digits.join('')));
  };

  const clearAll = () => {
    setCpfDigits({});
    setGeneratedCPF('');
  };

  const copyCPF = () => {
    navigator.clipboard.writeText(generatedCPF);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const updateDigit = (index: number, value: string) => {
    if (value === '' || /^\d$/.test(value)) {
      setCpfDigits(prev => ({
        ...prev,
        [index]: value
      }));
      if (value !== '' && index < 10) {
        digitInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !cpfDigits[index] && index > 0) {
      digitInputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    const cleanCPF = validationCPF.replace(/\D/g, '');
    if (cleanCPF.length === 11) {
      setIsValid(validateCPF(cleanCPF));
    } else {
      setIsValid(null);
    }
  }, [validationCPF]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Gerador de CPF Personalizado
          </h1>
          <p className="text-gray-600">
            Gere CPFs válidos com controle total sobre cada dígito
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shuffle className="mr-2 text-blue-600" />
              Gerador de CPF
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preencha apenas os dígitos desejados (deixe em branco para gerar aleatório):
              </label>
              <div className="grid grid-cols-11 gap-2 mb-4">
                {Array.from({ length: 11 }, (_, i) => (
                  <div key={i} className="text-center">
                    <input
                      ref={(el) => { digitInputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={cpfDigits[i] || ''}
                      onChange={(e) => updateDigit(i, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(i, e)}
                      aria-label={i >= 9 ? `Dígito verificador ${i + 1} do CPF` : `Dígito ${i + 1} do CPF`}
                      className="w-full h-12 text-center text-lg font-mono border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="•"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                Posições 10 e 11 são dígitos verificadores: o que estiver neles é ignorado ao gerar, o valor certo é calculado a partir dos 9 primeiros dígitos.
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={generateCPF}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Gerar CPF
              </button>
              <button
                onClick={generateRandomCPF}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Aleatório
              </button>
              <button
                onClick={clearAll}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Limpar
              </button>
            </div>

            {generatedCPF && (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CPF Gerado:</p>
                    <p className="text-2xl font-mono font-bold text-gray-800">
                      {generatedCPF}
                    </p>
                  </div>
                  <button
                    onClick={copyCPF}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors"
                    title="Copiar CPF"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-green-600 text-sm mt-2">CPF copiado!</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Check className="mr-2 text-green-600" />
              Validador de CPF
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Digite um CPF para validar:
              </label>
              <input
                type="text"
                value={validationCPF}
                onChange={(e) => setValidationCPF(e.target.value)}
                placeholder="000.000.000-00"
                maxLength={14}
                className="w-full px-4 py-3 text-lg font-mono border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {isValid !== null && (
              <div className={`p-4 rounded-lg flex items-center ${
                isValid
                  ? 'bg-green-100 border border-green-200 text-green-800'
                  : 'bg-red-100 border border-red-200 text-red-800'
              }`}>
                {isValid ? (
                  <Check className="mr-2 h-5 w-5" />
                ) : (
                  <X className="mr-2 h-5 w-5" />
                )}
                <span className="font-medium">
                  {isValid ? 'CPF válido!' : 'CPF inválido!'}
                </span>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Como funciona:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• No gerador, preencha apenas os dígitos que deseja fixar</li>
                <li>• Os dígitos verificadores são calculados automaticamente</li>
                <li>• Deixe campos em branco para gerar aleatoriamente</li>
                <li>• Todos os CPFs gerados são matematicamente válidos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>⚠️ Este gerador é apenas para fins educacionais e testes de sistema.</p>
          <p>Não use CPFs gerados para fins fraudulentos ou ilegais.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
