(() => {
  let playing = true;
  let activeHole = 1;
  let hits = 0;
  let misses = 0;

  const stop = () => playing = false;
  const getHole = index => document.getElementById(`hole${index}`);
  
  const deactivateHole = index => {
    getHole(index).className = 'hole';
  };
  
  const activateHole = index => {
    getHole(index).className = 'hole hole_has-mole';
  };

  const resetGame = () => {
    hits = 0;
    misses = 0;
    deactivateHole(activeHole);
    playing = true;
    next();
  };

  const checkGameEnd = () => {
    if (hits >= 10) {
      stop();
      alert(`Победа! Вы попали ${hits} раз.`);
      resetGame();
    } else if (misses >= 5) {
      stop();
      alert(`Поражение! Промахов: ${misses}. Попаданий: ${hits}.`);
      resetGame();
    }
  };

  const handleHoleClick = index => {
    if (!playing) {
      return;
    }
    
    const hole = getHole(index);
    if (hole.classList.contains('hole_has-mole')) {
      hits++;
    } else {
      misses++;
    }
    
    checkGameEnd();
  };

  for (let i = 1; i <= 9; i++) {
    getHole(i).onclick = () => handleHoleClick(i);
  }

  const next = () => setTimeout(() => {
    if (!playing) {
      return;
    }
    deactivateHole(activeHole);
    activeHole = Math.floor(1 + Math.random() * 9);
    activateHole(activeHole);
    next();
  }, 800);

  next();
})();