import { useState } from 'react';
import BootSequence from './components/BootSequence';
import Desktop from './components/Desktop';

function App() {
  const hasBooted = sessionStorage.getItem('xp_booted') === 'true';
  const [screen, setScreen] = useState(hasBooted ? 'desktop' : 'boot');

  const handleBootComplete = () => {
    sessionStorage.setItem('xp_booted', 'true');
    setScreen('desktop');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {screen === 'boot' && <BootSequence onComplete={handleBootComplete} />}
      {screen === 'desktop' && <Desktop />}
    </div>
  );
}

export default App;
