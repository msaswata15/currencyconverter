import './App.css';
import React, { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('inr');
  const [toCurrency, setToCurrency] = useState('usd');

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const options = Object.keys(currencyInfo || {}); // safe access in case API is not loaded yet

  // calculate converted amount
  const convertedAmount =
    fromCurrency === toCurrency
      ? amount
      : (amount * (currencyInfo?.[toCurrency] || 0)).toFixed(2);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="relative w-full max-w-md flex flex-col items-center">

        <InputBox
          label="From"
          amount={amount}
          onAmountChange={(value) => setAmount(value)}
          onCurrencyChange={(currency) => setFromCurrency(currency)}
          currencyOption={options}
          selectCurrency={fromCurrency}
          amountDisable={false}
          currencyDisable={false}
          className="w-full rounded-b-none border-b-0"
        />

        {/* Floating Swap Button */}
        <button
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg border-4 border-white z-10"
          style={{ top: "50%" }}
          onClick={swap}
          aria-label="Swap currencies"
        >
          ⬇️ Swap ⬆️
        </button>

        <InputBox
          label="To"
          amount={convertedAmount}
          onAmountChange={() => { }}
          onCurrencyChange={(currency) => setToCurrency(currency)}
          currencyOption={options}
          selectCurrency={toCurrency}
          amountDisable={true}
          currencyDisable={false}
          className="w-full rounded-t-none border-t-0"
        />
      </div>
    </div>
  );
}

export default App;
