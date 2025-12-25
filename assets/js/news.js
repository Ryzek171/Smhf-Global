// Replace YOUR_GNEWS_API_KEY with your real key
const apiKey = "08f712ec6affe0f0323d4e7fda780aac";
const categories = ["business", "entertainment", "sports", "technology", "general"];

// Stable CORS proxy for GitHub Pages
const proxy = "https://api.allorigins.win/raw?url=";

async function fetchNews(category) {
    const url = `https://gnews.io/api/v4/top-headlines?country=pk&category=${category}&apikey=${apiKey}`;

    try {
        const response = await fetch(`${proxy}${encodeURIComponent(url)}`);
        const data = await response.json();
        const container = document.getElementById(`${category}-news`);
        container.innerHTML = "";

        data.articles.forEach(article => {
            const item = document.createElement("div");
            item.classList.add("news-item");
            item.innerHTML = `
                <img src="${article.image || 'https://via.placeholder.com/150'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
        document.getElementById(`${category}-news`).innerHTML = "<p>Unable to load news at the moment.</p>";
    }
}

categories.forEach(fetchNews);
