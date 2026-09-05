import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X, Copy, Shuffle } from 'lucide-react';

interface CPFDigits {
  [key: number]: string;
}

function App() {
  const [cpfDigits, setCpfDigits] = useState<CPFDigits>({});
  const [generatedCPF, setGeneratedCPF] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationCPF, setValidationCPF] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Função para calcular os dígitos verificadores
  const calculateCheckDigits = (digits: string[]): [number, number] => {
    // Primeiro dígito verificador
    let sum1 = 0;
    for (let i = 0; i < 9; i++) {
      sum1 += parseInt(digits[i]) * (10 - i);
    }
    const remainder1 = sum1 % 11;
    const digit1 = remainder1 < 2 ? 0 : 11 - remainder1;

    // Segundo dígito verificador
    let sum2 = 0;
    for (let i = 0; i < 9; i++) {
      sum2 += parseInt(digits[i]) * (11 - i);
    }
    sum2 += digit1 * 2;
    const remainder2 = sum2 % 11;
    const digit2 = remainder2 < 2 ? 0 : 11 - remainder2;

    return [digit1, digit2];
  };

  // Função para validar CPF
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // CPF com todos os dígitos iguais

    const digits = cleanCPF.split('');
    const [expectedDigit1, expectedDigit2] = calculateCheckDigits(digits);
    
    return parseInt(digits[9]) === expectedDigit1 && parseInt(digits[10]) === expectedDigit2;
  };

  // Função para gerar CPF baseado nos dígitos preenchidos
  const generateCPF = () => {
    const digits = Array(11).fill('');
    
    // Preencher com os dígitos já inseridos
    Object.keys(cpfDigits).forEach(index => {
      if (cpfDigits[parseInt(index)] !== '') {
        digits[parseInt(index)] = cpfDigits[parseInt(index)];
      }
    });

    // Preencher posições vazias (exceto os dois últimos dígitos verificadores)
    for (let i = 0; i < 9; i++) {
      if (digits[i] === '') {
        digits[i] = Math.floor(Math.random() * 10).toString();
      }
    }

    // Calcular os dígitos verificadores
    const [digit1, digit2] = calculateCheckDigits(digits);
    
    // Se os dígitos verificadores já estão preenchidos, verificar se são válidos
    if (digits[9] !== '' || digits[10] !== '') {
      if (digits[9] !== '' && digits[9] !== digit1.toString()) {
        alert('O 10º dígito informado não é válido para este CPF!');
        return;
      }
      if (digits[10] !== '' && digits[10] !== digit2.toString()) {
        alert('O 11º dígito informado não é válido para este CPF!');
        return;
      }
    }

    digits[9] = digit1.toString();
    digits[10] = digit2.toString();

    const cpf = digits.join('');
    setGeneratedCPF(formatCPF(cpf));
  };

  // Função para gerar CPF completamente aleatório
  const generateRandomCPF = () => {
    setCpfDigits({});
    const digits = Array(9).fill('').map(() => Math.floor(Math.random() * 10).toString());
    const [digit1, digit2] = calculateCheckDigits(digits);
    digits.push(digit1.toString(), digit2.toString());
    setGeneratedCPF(formatCPF(digits.join('')));
  };

  // Função para formatar CPF
  const formatCPF = (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para limpar todos os campos
  const clearAll = () => {
    setCpfDigits({});
    setGeneratedCPF('');
  };

  // Função para copiar CPF
  const copyCPF = () => {
    navigator.clipboard.writeText(generatedCPF);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Atualizar dígito específico
  const updateDigit = (index: number, value: string) => {
    if (value === '' || /^\d$/.test(value)) {
      setCpfDigits(prev => ({
        ...prev,
        [index]: value
      }));
    }
  };

  // Validar CPF em tempo real
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
          {/* Gerador de CPF */}
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
                      type="text"
                      maxLength={1}
                      value={cpfDigits[i] || ''}
                      onChange={(e) => updateDigit(i, e.target.value)}
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
                Posições 10 e 11 são dígitos verificadores (calculados automaticamente)
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

          {/* Validador de CPF */}
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