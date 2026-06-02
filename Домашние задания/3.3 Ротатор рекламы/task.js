const rotators = document.querySelectorAll('.rotator');

for (const rotator of rotators) {
  const cases = rotator.querySelectorAll('.rotator__case');
  let currentIndex = 0;

  for (let i = 0; i < cases.length; i++) {
    if (cases[i].classList.contains('rotator__case_active')) {
      currentIndex = i;
      break;
    }
  }

  const rotate = () => {
    const currentCase = cases[currentIndex];
    currentCase.classList.remove('rotator__case_active');

    currentIndex = (currentIndex + 1) % cases.length;
    const nextCase = cases[currentIndex];
    nextCase.classList.add('rotator__case_active');

    if (nextCase.dataset.color) {
      nextCase.style.color = nextCase.dataset.color;
    }

    const speed = parseInt(nextCase.dataset.speed) || 1000;
    setTimeout(rotate, speed);
  };

  const initialCase = cases[currentIndex];
  if (initialCase.dataset.color) {
    initialCase.style.color = initialCase.dataset.color;
  }

  const initialSpeed = parseInt(initialCase.dataset.speed) || 1000;
  setTimeout(rotate, initialSpeed);
}