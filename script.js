function calculateEarnings() {
  const imp = parseFloat(document.getElementById('impressions').value) || 0;
  const eng = parseFloat(document.getElementById('engagements').value) || 0;
  const genre = document.getElementById('genre').value;

  if (imp <= 0) {
    alert('インプレッション数を入力してください');
    return;
  }

  const er = eng / imp;

  const genreSettings = {
    'business': { premiumRatio: 0.25, baseRpm: 12.0 },
    'creative': { premiumRatio: 0.18, baseRpm: 10.0 },
    'entertainment': { premiumRatio: 0.10, baseRpm: 8.0 },
    'general': { premiumRatio: 0.15, baseRpm: 9.0 }
  };

  const setting = genreSettings[genre] || genreSettings['general'];
  
  let erMultiplier = 1.0 + (er - 0.03) * 5.0;
  erMultiplier = Math.max(0.5, Math.min(2.0, erMultiplier));

  const estPremiumImp = imp * setting.premiumRatio;
  const effectiveRpm = setting.baseRpm * erMultiplier;

  const payout14Days = (estPremiumImp / 1000.0) * effectiveRpm;
  const payoutMonthly = payout14Days * (30 / 14);

  document.getElementById('result-2weeks').innerText = `約 ${Math.round(payout14Days).toLocaleString()} 円`;
  document.getElementById('result-monthly').innerText = `約 ${Math.round(payoutMonthly).toLocaleString()} 円`;
  document.getElementById('result').style.display = 'block';
}