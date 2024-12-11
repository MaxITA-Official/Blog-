// Bottone del menu hamburger
const blogButton = document.getElementById("blog-btn");
const blogContent = document.getElementById("blog-content");
const blogArticles = document.getElementById("blog-articles");

// File di esempio per il blog
const blogFiles = [
    "Ciao! Questo è il mio primo post.",
    "Ecco un secondo articolo interessante.",
    "Ultime novità: il futuro del web design!"
];

// Passcode corretto
const correctPasscode = "RehanAhmed";

blogButton.addEventListener("click", () => {
    const passcode = prompt("Inserisci il passcode per accedere ai blog:");
    if (passcode === correctPasscode) {
        blogContent.classList.remove("hidden");
        loadBlogs();
    } else {
        alert("Passcode errato!");
    }
});

// Carica i blog
function loadBlogs() {
    blogArticles.innerHTML = ""; // Pulisce eventuali articoli già caricati
    blogFiles.forEach((blog, index) => {
        const article = document.createElement("article");
        article.innerHTML = `<h2>Articolo ${index + 1}</h2><p>${blog}</p>`;
        blogArticles.appendChild(article);
    });
}
