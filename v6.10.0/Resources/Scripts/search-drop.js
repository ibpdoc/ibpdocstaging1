// Debounce function
function debounce(func, delay) {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Function to handle search
function handleSearch() {
    const searchQuery = document.querySelector('._Skins_Home_Searchbar > input:nth-child(1)').value;
    if (searchQuery.length > 0) {
        MadCap.SearchHelper.SearchPane.Search(searchQuery, { searchContent: true }).then(displayResults);
    } else {
        clearResults();
    }
}

// Function to display results in a dropdown
function displayResults(results) {
    const dropdown = document.getElementById('searchResultsDropdown');
    dropdown.innerHTML = '';
    dropdown.style.backgroundColor = 'white';
    dropdown.style.border = '1px solid #ddd';
    dropdown.style.listStyleType = 'none';
    dropdown.style.padding = '0';
    dropdown.style.margin = '0';
    dropdown.style.width = '100%';
    dropdown.style.boxSizing = 'border-box';


    // Limiting results to first 5 items
    results.content.slice(0, 5).forEach(item => {
        const resultItem = document.createElement('li');
        resultItem.style.padding = '10px';
        resultItem.style.cursor = 'pointer';
        resultItem.style.borderBottom = '1px solid #eee';

        // Title of the result
        const title = document.createElement('div');
        title.textContent = item.Title;
        title.style.color = 'blue'; // Making title text blue
        title.style.fontSize = '1em'; // Adjust the font size as needed
        resultItem.appendChild(title);

        // Adding the abstract text as a preview
        const preview = document.createElement('div');
        preview.textContent = item.AbstractText;
        preview.style.color = 'grey';
        preview.style.fontSize = '0.8em'; // Smaller font size for abstract
        resultItem.appendChild(preview);

        // Making the item clickable and opening the link
        resultItem.addEventListener('click', () => {
            window.location.href = item.Link;
        });

        dropdown.appendChild(resultItem);
    });

}

// Function to clear results from the dropdown
function clearResults() {
    const dropdown = document.getElementById('searchResultsDropdown');
    dropdown.innerHTML = '';
}

$(document).ready(function () {
    
    // Add event listener to the textbox
    document.querySelector('._Skins_Home_Searchbar > input:nth-child(1)').addEventListener('input', debounce(handleSearch, 300));
    
    // Add HTML for the dropdown
    const dropdown = document.createElement('ul');
    dropdown.id = 'searchResultsDropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.zIndex = '1000';
    // Additional styling for dropdown
    document.querySelector('._Skins_Home_Searchbar').appendChild(dropdown);
});


