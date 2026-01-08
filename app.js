 const timers = new Map();

  function setTarif(btn, rate) {
    const box = btn.closest('.timer');
    box.rate = rate;
    box.querySelector('.current-tarif').innerText = rate.toLocaleString() + " so'm/soat";
    box.querySelectorAll('.tarif-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function calculateCost(seconds, milliseconds, rate) {
    const totalSeconds = seconds + milliseconds / 1000;
    return Math.round((totalSeconds / 3600) * rate);
  }

  function startTimer(btn, rate) {
    const box = btn.closest('.timer');
    box.rate = rate;
    box.querySelectorAll('.tarif-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function startTimer(btn) {
    const box = btn.closest('.timer');
    if (!box.rate) {
      alert('Iltimos tarif tanlang');
      return;
    }
    if (timers.has(box)) return;

    let seconds = box.seconds || 0;

    let milliseconds = box.milliseconds || 0;
    const interval = setInterval(() => {
      milliseconds += 10;
      box.milliseconds = milliseconds;

      if (milliseconds >= 1000) {
        seconds++;
        box.seconds = seconds;
        milliseconds = 0;
        box.milliseconds = 0;
      }

      const h = String(Math.floor(seconds / 3600)).padStart(2,'0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2,'0');
      const s = String(seconds % 60).padStart(2,'0');
      const ms = String(milliseconds).padStart(3,'0');

      box.querySelector('.time').innerText = `${h}:${m}:${s}:${ms}`;
      const cost = calculateCost(seconds, milliseconds, box.rate);((seconds / 3600) * box.rate);
      box.querySelector('.cost').innerText = cost.toLocaleString();
    }, 10);

    timers.set(box, interval);
  }

  function stopTimer(btn) {
    const box = btn.closest('.timer');
    clearInterval(timers.get(box));
    timers.delete(box);
  }