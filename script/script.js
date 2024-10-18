// Suggestion Menu ---------------------------------------------------------------------
const searchBox = document.getElementById('search-box');
const searchBoxMenu = document.getElementById('search-box-suggestion-menu');

function dimensionsOfSuggestionBox() {
    if (searchBox.offsetWidth === 0) {
        setTimeout(dimensionsOfSuggestionBox, 10);
        return;
    }

    const width = searchBox.offsetWidth;
    const searchBoxRect = searchBox.getBoundingClientRect();
    const left = searchBoxRect.left;

    searchBoxMenu.style.width = `${width}px`;
    searchBoxMenu.style.left = `${left}px`;
}

document.addEventListener('DOMContentLoaded', dimensionsOfSuggestionBox);
window.addEventListener('resize', dimensionsOfSuggestionBox);

// List element entering in input box
searchBoxMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        searchBox.value = e.target.textContent;
        searchBoxMenu.style.display = 'none';
    }
});

// When user tries to scroll the list input box focus will be removed
searchBoxMenu.addEventListener('touchstart', function () {
    searchBox.blur();
});

// Toggle Visibility of menu
searchBox.addEventListener('click', function (e) {
    e.stopPropagation();
    searchBoxMenu.style.display = searchBoxMenu.style.display === 'block' ? 'none' : 'block';
});

// Close if click outside
document.addEventListener('click', function (e) {
    if (!searchBox.contains(e.target) && !searchBoxMenu.contains(e.target)) {
        searchBoxMenu.style.display = 'none';
    }
});

// Suggestion algorithm for input box ----------------------------------------------------------------------

// Your suggestions list
const suggestions = [
    'age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude',
    'beauty', 'best', 'birthday', 'business', 'car', 'change',
    'communication', 'computers', 'cool', 'courage', 'dad', 'dating',
    'death', 'design', 'dreams', 'education', 'environmental',
    'equality', 'experience', 'failure', 'faith', 'family', 'famous',
    'fear', 'fitness', 'food', 'forgiveness', 'freedom',
    'friendship', 'funny', 'future', 'god', 'good', 'government',
    'graduation', 'great', 'happiness', 'health', 'history',
    'home', 'hope', 'humor', 'imagination', 'inspirational',
    'intelligence', 'jealousy', 'knowledge', 'leadership', 'learning',
    'legal', 'life', 'love', 'marriage', 'medical', 'men',
    'mom', 'money', 'morning', 'movies', 'success'
];

// Function to filter suggestions based on user input
function filterSuggestions() {
    const input = searchBox.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(input)
    );

    searchBoxMenu.innerHTML = '';

    filteredSuggestions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        searchBoxMenu.appendChild(li);
    });

    searchBoxMenu.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
}

searchBox.addEventListener('input', filterSuggestions);
filterSuggestions();


// Landing Page Discover Quotes Button ---------------------------------------------------------------------
const discoverQuotesBtn = document.getElementById('main-btn');
const sectionLanding = document.getElementById('main-landing');
const sectionWorking = document.getElementById('main-working');

discoverQuotesBtn.addEventListener('click', () => {
    sectionLanding.style.display = 'none';
    sectionWorking.style.display = 'flex';
})

// Language Button State Switcher ---------------------------------------------------------------------
const englishBtn = document.getElementById('btn-english');
const hindiBtn = document.getElementById('btn-hindi');
const englishQuoteBox = document.getElementById('quote-box-english');
const hindiQuoteBox = document.getElementById('quote-box-hindi');

// Hindi Switch
englishBtn.classList.add('active');
hindiBtn.addEventListener('click', () => {
    hindiBtn.classList.add('active');
    englishBtn.classList.remove('active');

    hindiQuoteBox.style.display = 'flex';
    englishQuoteBox.style.display = 'none';
});

// English Switch
englishBtn.addEventListener('click', () => {
    englishBtn.classList.add('active');
    hindiBtn.classList.remove('active');

    englishQuoteBox.style.display = 'flex';
    hindiQuoteBox.style.display = 'none';
});

// CUSTOM DROPDOWN -> Theme Selector ---------------------------------------------------------------------
const dropdown = document.getElementById('theme-switch-box');
const selectedOption = document.getElementById('selected-option');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const dropdownArrow = document.getElementById('theme-switch-box-arrow-icon');

let previousSelectedItem = null;

// Function to apply theme and update menu
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update the selected theme text
    const selectedItem = [...dropdownItems].find(item => item.getAttribute('data-value') === theme);
    if (selectedItem) {
        selectedOption.textContent = selectedItem.textContent;
    }

    // Reset background for all items
    dropdownItems.forEach(item => {
        item.style.backgroundColor = '';
        item.style.color = '';
    });

    if (selectedItem) {
        selectedItem.style.backgroundColor = 'var(--primary)';
        selectedItem.style.color = 'var(--base-100)';
    }

    previousSelectedItem = selectedItem;
}

// Set default theme when the page loads
window.addEventListener('DOMContentLoaded', function () {
    const defaultTheme = 'quotify';
    applyTheme(defaultTheme);
});

// Toggle dropdown menu visibility
dropdown.addEventListener('click', function () {
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';

    if (dropdownMenu.style.display === 'flex') {
        dropdownArrow.style.transform = "rotate(180deg)";
    }
    else {
        dropdownArrow.style.transform = "rotate(0deg)";
    }
});

// Handle option selection
dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        const selectedValue = item.getAttribute('data-value');
        applyTheme(selectedValue);

        dropdownMenu.style.display = 'none';
        console.log('Selected theme:', selectedValue);
    });
});

// Close dropdown if clicked outside
document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
        dropdownMenu.style.display = 'none';
        dropdownArrow.style.transform = "rotate(0deg)"
    }
});

// Send request to backend --------------------------------------------------------------
const quoteEnglish = document.getElementById('quote-english');
const writerNameEnglish = document.getElementById('writer-name-english');

const quoteHindi = document.getElementById('quote-hindi');
const writerNameHindi = document.getElementById('writer-name-hindi');

const generateButton = document.getElementById('generate-btn');

const btnEnglish = document.getElementById('btn-english');
const btnHindi = document.getElementById('btn-hindi');

quoteEnglish.textContent = `"Welcome to Quotify – where words of wisdom and inspiration are just a click away. Explore different categories to find quotes that enlighten your mind and brighten your day!"`;
writerNameEnglish.textContent = `- Adarsh Singh (Creator of Quotify)`;

quoteHindi.textContent = `"Quotify में आपका स्वागत है - जहां ज्ञान और प्रेरणा के शब्द बस एक क्लिक दूर हैं। ऐसे उद्धरण ढूंढने के लिए विभिन्न श्रेणियों का अन्वेषण करें जो आपके दिमाग को प्रबुद्ध करते हैं और आपके दिन को उज्ज्वल बनाते हैं!"`
writerNameHindi.textContent = `- आदर्श सिंह (Quotify के निर्माता)`

let currentLanguage = 'en'; // Default language is English

function generateQuote() {
    const category = searchBox.value || ''; // Use empty string if no category is entered

    // Fetch the quote from the backend
    fetch(`https://quotify-backend-w26w.onrender.com/api/quotes/${category}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Received non-JSON response');
            }
        })
        .then(data => {
            if (data && data.quote) {
                // Display the English quote and author without extra double quotes
                quoteEnglish.textContent = data.quote;
                writerNameEnglish.textContent = `- ${data.author}`;

                // If current language is Hindi, also fetch the translation
                if (currentLanguage === 'hi') {
                    translateToHindi(data.quote);
                }
            } else {
                quoteEnglish.textContent = 'No quotes found.';
                writerNameEnglish.textContent = '';
            }
        })
        .catch(error => console.error('Error fetching quotes:', error));
}

// Function to translate English quote to Hindi
function translateToHindi(quote, author) {
    const fromLang = 'en-GB';
    const toLang = 'hi-IN';

    if (!quote) return;

    // Send the translation request to the backend
    fetch('https://quotify-backend-w26w.onrender.com/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, fromLang, toLang })
    })
    .then(response => response.json())
    .then(data => {
        // Show translated quote in Hindi and keep author in English
        quoteHindi.textContent = data.hindi.quote;
        writerNameHindi.textContent = writerNameEnglish.textContent; // Keep author name in English
    })
    .catch(error => console.error('Error during translation:', error));
}

// Event listener for the generate button
generateButton.addEventListener('click', generateQuote);

// Event listener for the English button
btnEnglish.addEventListener('click', function () {
    currentLanguage = 'en'; // Switch to English mode
    // Clear Hindi content when switching to English mode
    quoteHindi.textContent = '';
    writerNameHindi.textContent = '';
});

// Event listener for the Hindi button
btnHindi.addEventListener('click', function () {
    currentLanguage = 'hi'; // Switch to Hindi mode
    const englishQuote = quoteEnglish.textContent.replace(/"/g, ''); // Get the English quote
    if (englishQuote) {
        translateToHindi(englishQuote); // Translate existing English quote to Hindi
    }
});
