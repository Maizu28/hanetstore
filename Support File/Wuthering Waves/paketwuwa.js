function orderNow(packageName) {
    const whatsappLink = `https://wa.me/6285150893694?text=Halo%20Atmin,%20saya%20ingin%20memesan%20joki%20${encodeURIComponent(packageName)}%20game%20Wuthering%20Waves.%20Apakah%20masih%20ada?%20Terima%20kasih!`;
    window.open(whatsappLink, '_blank');
  }
