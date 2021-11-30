async function loadKoders() {
    const url = 'http://localhost:8080/koders';

    const response = await fetch(url)
    const koders = await response.json();

    console.log(koders);
    const p = document.getElementById('koders');
    p.textContent = JSON.stringify(koders);
}

