"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Timer = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 16,
    seconds: 34,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) =>
    num.toString().padStart(2, "0");

  const dayTracker = [
    { day: "01", points: 50 },
    { day: "02", points: 100 },
    { day: "03", points: 150 },
    { day: "04", points: 200 },
    { day: "05", points: 250 },
    { day: "06", points: 300 },
  ];

  const progressSteps = [
    { points: "50 pontos" },
    { points: "100 pontos" },
    { points: "150 pontos" },
    { points: "225 pontos" },
  ];

  const searchSteps = [
    { points: "16 pesquisas" },
    { points: "36 pesquisas" },
    { points: "60 pesquisas" },
  ];

  return (
    <main className="min-h-screen pb-8">
      <header className="text-center py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          TikTok Bônus
        </h1>
      </header>

      <section className="max-w-md mx-auto px-4 space-y-4">
        {/* SALDO */}
        <div className="card-section flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">
              Seu saldo
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                R$ 4.596,72
              </span>
              <Image
                src="https://ext.same-assets.com/815575447/326258435.svg"
                alt="coin"
                width={20}
                height={20}
              />
            </div>
          </div>
          <button className="btn-sacar">Sacar</button>
        </div>

        {/* PARABÉNS */}
        <div className="card-section relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-gray-800">
              Parabéns!
            </h2>
            <p className="text-sm text-gray-600">
              Você concluiu todas as tarefas
            </p>
            <p className="text-xl font-bold gold-text mt-1">
              R$ 4.596,72
            </p>
          </div>

          <div className="absolute right-0 top-0">
            <Image
              src="https://ext.same-assets.com/815575447/206487432.png"
              alt="celebration"
              width={180}
              height={120}
            />
          </div>
        </div>

        {/* CHECK-IN */}
        <div className="card-section">
          <p className="text-sm text-gray-700">
            Entre por 14 dias para ganhar
          </p>
          <p className="gold-text text-sm">
            8.414 pontos
          </p>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {dayTracker.map((day) => (
              <div
                key={day.day}
                className="flex flex-col items-center"
              >
                <div className="day-box completed">✓</div>
                <span className="text-xs text-gray-500 mt-1">
                  Dia {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-bold">
              Gol de Prêmios
            </h2>

            <p className="text-4xl font-bold my-4">
              R$ 4.596,72
            </p>

            <div className="flex justify-center gap-1 mb-6">
              <div className="timer-box">
                {formatNumber(timer.hours)}
              </div>
              :
              <div className="timer-box">
                {formatNumber(timer.minutes)}
              </div>
              :
              <div className="timer-box">
                {formatNumber(timer.seconds)}
              </div>
            </div>

            <button
              className="btn-obrigado"
              onClick={() => setShowModal(false)}
            >
              Obrigado
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
