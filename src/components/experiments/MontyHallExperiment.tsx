import React, { useState } from 'react';
import { Sparkles, Trophy, RefreshCw, HelpCircle, Check, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface MontyHallProps {
  onComplete?: () => void;
}

export const MontyHallExperiment: React.FC<MontyHallProps> = ({ onComplete }) => {
  const [carDoor, setCarDoor] = useState<number>(() => Math.floor(Math.random() * 3));
  const [userInitialPick, setUserInitialPick] = useState<number | null>(null);
  const [revealedGoatDoor, setRevealedGoatDoor] = useState<number | null>(null);
  const [finalPick, setFinalPick] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'pick' | 'host_reveal' | 'result'>('pick');

  // Lifetime Stats
  const [stayStats, setStayStats] = useState({ plays: 0, wins: 0 });
  const [switchStats, setSwitchStats] = useState({ plays: 0, wins: 0 });

  const handleInitialPick = (doorIdx: number) => {
    sound.playHapticClick(800);
    setUserInitialPick(doorIdx);

    // Host must open a door that is neither the user pick nor the car
    const possibleDoors = [0, 1, 2].filter((d) => d !== doorIdx && d !== carDoor);
    const hostChoice = possibleDoors[Math.floor(Math.random() * possibleDoors.length)];
    setRevealedGoatDoor(hostChoice);
    setGameState('host_reveal');
  };

  const handleDecision = (didSwitch: boolean) => {
    if (userInitialPick === null || revealedGoatDoor === null) return;

    let chosenDoor = userInitialPick;
    if (didSwitch) {
      const remainingDoor = [0, 1, 2].find((d) => d !== userInitialPick && d !== revealedGoatDoor)!;
      chosenDoor = remainingDoor;
    }

    setFinalPick(chosenDoor);
    const won = chosenDoor === carDoor;

    if (won) {
      sound.playRevealChime();
    } else {
      sound.playWTFTone();
    }

    if (didSwitch) {
      setSwitchStats((prev) => ({ plays: prev.plays + 1, wins: prev.wins + (won ? 1 : 0) }));
    } else {
      setStayStats((prev) => ({ plays: prev.plays + 1, wins: prev.wins + (won ? 1 : 0) }));
    }

    setGameState('result');
    if (onComplete) onComplete();
  };

  const resetRound = () => {
    sound.playHapticClick();
    setCarDoor(Math.floor(Math.random() * 3));
    setUserInitialPick(null);
    setRevealedGoatDoor(null);
    setFinalPick(null);
    setGameState('pick');
  };

  const switchWinRate = switchStats.plays > 0 ? Math.round((switchStats.wins / switchStats.plays) * 100) : 67;
  const stayWinRate = stayStats.plays > 0 ? Math.round((stayStats.wins / stayStats.plays) * 100) : 33;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl backdrop-blur-xl relative">
        {/* Title */}
        <div className="text-center mb-6">
          <span className="text-xs font-mono text-apple-blue uppercase tracking-widest block mb-1">
            Bayesian Probability Paradox
          </span>
          <h4 className="text-xl font-semibold text-white">
            The Monty Hall 3-Door Game Show
          </h4>
        </div>

        {/* The 3 Doors Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mb-8">
          {[0, 1, 2].map((doorIdx) => {
            const isSelected = userInitialPick === doorIdx;
            const isRevealedGoat = revealedGoatDoor === doorIdx;
            const isCar = carDoor === doorIdx;
            const showContent = gameState === 'result' || isRevealedGoat;

            return (
              <button
                key={doorIdx}
                disabled={gameState !== 'pick'}
                onClick={() => handleInitialPick(doorIdx)}
                className={`relative h-44 sm:h-52 rounded-2xl border flex flex-col items-center justify-between p-3 transition-all duration-300 ${
                  isSelected && gameState !== 'result'
                    ? 'border-apple-blue bg-apple-blue/15 shadow-[0_0_20px_rgba(10,132,255,0.3)]'
                    : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
                } ${gameState === 'pick' ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : ''}`}
              >
                {/* Top Door Number */}
                <span className="font-mono text-xs font-bold text-white/50">DOOR {doorIdx + 1}</span>

                {/* Door Content or Closed Door Graphic */}
                <div className="flex flex-col items-center justify-center flex-1">
                  {showContent ? (
                    isCar ? (
                      <div className="text-center">
                        <span className="text-4xl sm:text-5xl block animate-bounce">🚗</span>
                        <span className="text-[11px] font-mono text-apple-green font-bold uppercase mt-1 block">
                          Sports Car!
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl sm:text-5xl block">🐐</span>
                        <span className="text-[11px] font-mono text-white/50 uppercase mt-1 block">
                          Goat
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="w-12 h-20 rounded-lg border-2 border-white/20 bg-white/5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/40 ml-6" />
                    </div>
                  )}
                </div>

                {/* Selection Tag */}
                <div className="h-5">
                  {isSelected && (
                    <span className="bg-apple-blue text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase">
                      {gameState === 'result' ? (doorIdx === finalPick ? 'Your Pick' : 'Initial') : 'Your Pick'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* State Prompts & Decision Buttons */}
        {gameState === 'pick' && (
          <p className="text-xs sm:text-sm text-white/70 font-mono">
            CLICK ON A DOOR TO MAKE YOUR INITIAL SELECTION
          </p>
        )}

        {gameState === 'host_reveal' && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <p className="text-sm sm:text-base text-white font-medium mb-4">
              The host opened <strong className="text-apple-orange">Door {(revealedGoatDoor ?? 0) + 1}</strong> revealing a goat 🐐!
              <br />
              <span className="text-xs text-white/70">
                Do you want to STAY with Door {(userInitialPick ?? 0) + 1} or SWITCH to the remaining door?
              </span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleDecision(false)}
                className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all active:scale-95"
              >
                STAY with Door {(userInitialPick ?? 0) + 1}
              </button>
              <button
                onClick={() => handleDecision(true)}
                className="px-6 py-2.5 rounded-full bg-apple-green hover:bg-apple-green/90 text-black font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-lg"
              >
                SWITCH Doors!
              </button>
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <h4 className="text-xl font-bold text-white mb-2">
              {finalPick === carDoor ? '🎉 YOU WON THE SPORTS CAR!' : '🐐 YOU GOT A GOAT!'}
            </h4>
            <p className="text-xs font-mono text-white/60 mb-6">
              {finalPick === userInitialPick ? 'YOU CHOSE TO STAY' : 'YOU CHOSE TO SWITCH'}
            </p>

            {/* Lifetime Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-mono text-white/50 block mb-1">STAY STRATEGY</span>
                <span className="text-base font-mono font-bold text-white">
                  {stayStats.wins}/{stayStats.plays} Wins ({stayWinRate}%)
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-apple-green/10 border border-apple-green/30 text-center shadow-lg">
                <span className="text-[10px] font-mono text-apple-green block mb-1">SWITCH STRATEGY</span>
                <span className="text-base font-mono font-bold text-apple-green">
                  {switchStats.wins}/{switchStats.plays} Wins ({switchWinRate}%)
                </span>
              </div>
            </div>

            <button
              onClick={resetRound}
              className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Play Next Round</span>
            </button>
          </div>
        )}
      </div>

      {gameState === 'result' && (
        <div className="w-full max-w-2xl mt-6 p-6 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center gap-2 text-apple-blue font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Conditional Probability Revealed</span>
          </div>
          <h4 className="text-xl font-medium text-white mb-2">
            Why switching always doubles your mathematical odds
          </h4>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            When you first picked a door, there was a <strong className="text-white">1/3 chance</strong> you were right and a <strong className="text-apple-orange">2/3 chance</strong> you were wrong.
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 leading-relaxed">
            <span className="font-semibold text-white block mb-1">The Host’s Filter:</span>
            The host does not open a random door—he is constrained to only open a goat door. Therefore, whenever your initial pick was wrong (which happens 66.7% of the time), the host is forced to reveal the other goat, leaving the sports car behind the remaining door. Switching transfers that full 2/3 probability directly to you!
          </div>
        </div>
      )}
    </div>
  );
};
