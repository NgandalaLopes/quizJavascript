const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const topScores = JSON.parse(localStorage.getItem('topScores')) || []

const MAX_TOP_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveTopScore = e => {
    e.preventDefault()
    
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    topScores.push(score)

    topScores.sort((a,b) => {
        return b.score - a.score
    })

    topScores.splice(5)

    localStorage.setItem('topScores', JSON.stringify(topScores))
    window.location.assign('/')
}