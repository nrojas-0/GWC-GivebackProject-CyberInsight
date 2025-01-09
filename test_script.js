// Call promptUserAge only when the page has fully loaded
window.onload = function() {
    if (document.getElementById("quiz-container-1")) {
        promptUserAge(); // Call the function only on pages where the quiz containers exist
        loadFooter();
    }
};