
const localQuotes = [
    {
        content: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        content: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston S. Churchill"
    },
    {
        content: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
    },
    {
        content: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    },
    {
        content: "Leave simply so that others may simply live.",
        author: "Mahatma Gandhi"
    },
    {
        content: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        content: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    }
];

async function getQuote(){
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    
    quoteText.textContent = "Loading..."
    quoteAuthor.textContent = "";

    
    try{
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        quoteText.textContent = `${data.content}`;
        quoteAuthor.textContent =`-${data.author}`;
    } catch (err) {
        console.error("API failed, using local quote:", err);
        // Pick a random quote from localQuotes
        const { content, author } = localQuotes[
            Math.floor(Math.random() * localQuotes.length)
        ];

        quoteText.textContent = `${content}`;
        quoteAuthor.textContent = `-${author}`;
    }               
}
window.onload = getQuote;