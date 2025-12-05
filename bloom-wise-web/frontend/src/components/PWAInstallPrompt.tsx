import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler as any);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as any);
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <p className="mb-2">Установить приложение "Подоконник"?</p>
      <div className="flex gap-2">
        <Button onClick={installPWA} className="text-sm">
          Установить
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowInstallPrompt(false)}
          className="text-sm"
        >
          Позже
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;