
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock,
  CheckCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

interface RestTimerProps {
  defaultRestTime?: string;
  exerciseName?: string;
  onTimerComplete?: () => void;
  isVisible?: boolean;
}

export function RestTimer({ 
  defaultRestTime = "60-90s", 
  exerciseName = "Exercício",
  onTimerComplete,
  isVisible = true 
}: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Converter string de tempo para segundos
  const parseRestTime = (restTimeString: string): number => {
    const match = restTimeString.match(/(\d+)(?:-(\d+))?[sm]?/);
    if (match) {
      const minTime = parseInt(match[1]);
      const maxTime = match[2] ? parseInt(match[2]) : minTime;
      return Math.floor((minTime + maxTime) / 2); // Usar tempo médio
    }
    return 60; // Default 60 segundos
  };

  // Predefinições de tempo comuns
  const quickTimes = [30, 60, 90, 120, 180];

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInitialTime(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            
            // Notificação sonora (se habilitada)
            if (soundEnabled) {
              // Criar beep simples usando Web Audio API
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.value = 800;
              oscillator.type = 'sine';
              
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.5);
            }

            // Callback quando completar
            if (onTimerComplete) {
              onTimerComplete();
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, soundEnabled, onTimerComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    if (initialTime === 0) return 0;
    return ((initialTime - timeLeft) / initialTime) * 100;
  };

  const getTimerColor = (): string => {
    if (timeLeft === 0 && initialTime > 0) return 'text-green-500';
    if (timeLeft <= 10) return 'text-red-500';
    if (timeLeft <= 30) return 'text-yellow-500';
    return 'text-corpoideal-purple';
  };

  if (!isVisible) return null;

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-modern">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-corpoideal-purple" />
              <span className="font-medium text-gray-700 dark:text-gray-300">Cronômetro</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="h-8 w-8 p-0"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Exercício atual */}
          {exerciseName && (
            <Badge variant="outline" className="text-sm">
              {exerciseName}
            </Badge>
          )}

          {/* Timer Display */}
          <div className="relative">
            <div className={`text-6xl font-bold transition-colors ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Barra de progresso circular */}
            {initialTime > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                    className="text-corpoideal-purple transition-all duration-1000 ease-linear"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Status */}
          {timeLeft === 0 && initialTime > 0 && (
            <div className="flex items-center justify-center space-x-2 text-green-500">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Descanso concluído!</span>
            </div>
          )}

          {/* Tempos rápidos */}
          <div className="space-y-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Tempos rápidos:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickTimes.map((seconds) => (
                <Button
                  key={seconds}
                  variant="outline"
                  size="sm"
                  onClick={() => startTimer(seconds)}
                  disabled={isRunning}
                  className="text-xs"
                >
                  {seconds < 60 ? `${seconds}s` : `${Math.floor(seconds/60)}min`}
                </Button>
              ))}
            </div>
          </div>

          {/* Tempo sugerido baseado no exercício */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tempo sugerido: {defaultRestTime}
            </div>
            <Button
              variant="outline"
              onClick={() => startTimer(parseRestTime(defaultRestTime))}
              disabled={isRunning}
              className="w-full"
            >
              Usar tempo sugerido
            </Button>
          </div>

          {/* Controles */}
          <div className="flex gap-2 justify-center">
            {!isRunning ? (
              <Button
                onClick={() => timeLeft > 0 ? setIsRunning(true) : startTimer(parseRestTime(defaultRestTime))}
                disabled={timeLeft === 0 && initialTime === 0}
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                {timeLeft > 0 ? 'Continuar' : 'Iniciar'}
              </Button>
            ) : (
              <Button
                onClick={pauseTimer}
                variant="outline"
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pausar
              </Button>
            )}
            
            <Button
              onClick={resetTimer}
              variant="outline"
              disabled={initialTime === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Botão parar */}
          {(isRunning || timeLeft > 0) && (
            <Button
              onClick={stopTimer}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              Parar Timer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
