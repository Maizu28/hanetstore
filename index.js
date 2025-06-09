let progress = 0;
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');
const completedButton = document.getElementById('completedButton');

function updateProgress() {
    if (progress < 100) {
        progress += 1;
        loadingBar.style.width = progress + '%';
        loadingText.textContent = progress + '%';
        setTimeout(updateProgress, 50);
    } else {
        loadingText.style.display = 'none';  // Sembunyikan teks progress
        completedButton.style.display = 'block';  // Tampilkan tombol "Masuk"
    }
}

completedButton.addEventListener('click', () => {
    window.location.href = 'Support-File/hanetstore.html';
});

updateProgress();
