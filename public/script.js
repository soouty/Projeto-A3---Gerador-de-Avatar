function generateIcon() {
    const key = document.getElementById('key').value;
    const icon = document.getElementById('icon');
    if (key.trim() === "") {
        alert("Por favor digite um Identifador.");
        return;
    }
    icon.src = '/icon?key=' + encodeURIComponent(key);
}
