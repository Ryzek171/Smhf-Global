// news.js

const apiKey = "08f712ec6affe0f0323d4e7fda780aac";

// API URLs for each category
const apiUrls = {
    business: `https://api.allorigins.win/raw?url=https://gnews.io/api/v4/top-headlines?country=pk&category=business&apikey=${apiKey}`,
    entertainment: `https://api.allorigins.win/raw?url=https://gnews.io/api/v4/top-headlines?country=pk&category=entertainment&apikey=${apiKey}`,
    sports: `https://api.allorigins.win/raw?url=https://gnews.io/api/v4/top-headlines?country=pk&category=sports&apikey=${apiKey}`,
    technology: `https://api.allorigins.win/raw?url=https://gnews.io/api/v4/top-headlines?country=pk&category=technology&apikey=${apiKey}`,
    world: `https://api.allorigins.win/raw?url=https://gnews.io/api/v4/top-headlines?country=pk&category=general&apikey=${apiKey}`
};

// Function to fetch news
async function fetchNews(category) {
    try {
        const response = await fetch(apiUrls[category]);
        const data = await response.json();
        const newsContainer = document.getElementById(`${category}-news`);
        newsContainer.innerHTML = '';

        data.articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <img src="${article.image || 'https://via.placeholder.com/150'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
    }
}

// Fetch news for all categories
['business', 'entertainment', 'sports', 'technology', 'world'].forEach(fetchNews);

