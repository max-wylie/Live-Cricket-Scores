// My API_KEY is in config.js file , const API_KEY = "";
const API_URL = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;

async function fetchCricketScores() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayScores(data.data);
    } catch (error) {
        console.error('Error fetching cricket scores:', error);
    }
}

function displayScores(matches) {
    const scoresContainer = document.getElementById('scores-container');
    scoresContainer.innerHTML = '';

    matches.forEach(match => {
        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score-card');

        const dateTime = new Date(match.dateTimeGMT);
        const formattedDate = dateTime.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        const formattedTime = dateTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });

        scoreElement.innerHTML = `
            <div class="match-header">
                <h2>${match.name}</h2>
                <p class="match-status">${match.status}</p>
            </div>
            <div class="team-scores">
                <div class="team">
                    <span class="team-name">${match.teams[0]}</span>
                    <span class="team-score">${match.score[0] ? `${match.score[0].r}/${match.score[0].w} (${match.score[0].o})` : ''}</span>
                </div>
                <div class="team">
                    <span class="team-name">${match.teams[1]}</span>
                    <span class="team-score">${match.score[1] ? `${match.score[1].r}/${match.score[1].w} (${match.score[1].o})` : ''}</span>
                </div>
                <div class="date-time">${formattedDate}, ${formattedTime} GMT</div>
            </div>
        `;
        scoresContainer.appendChild(scoreElement);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', toggleDarkMode);

    fetchCricketScores();
    setInterval(fetchCricketScores, 60000); // Update every minute
});
