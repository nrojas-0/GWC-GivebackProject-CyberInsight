// Function to prompt user for age and show the appropriate quiz
function promptUserAge() {
    let userAge;
    do {
        userAge = prompt("Please enter your age:");
        userAge = parseInt(userAge);
    } while (isNaN(userAge) || userAge <= 0); // Prompt until valid age is entered

    // Show the appropriate quiz based on age
    if (userAge < 18) {
        document.getElementById("quiz-container-1").style.display = "block";
    } else if (userAge >= 18 && userAge < 65) {
        document.getElementById("quiz-container-2").style.display = "block";
    } else if (userAge >= 65) {
        document.getElementById("quiz-container-3").style.display = "block";
    }
    document.getElementById("submit-button").style.display = "inline-block";
    document.getElementById("reset-button").style.display = "inline-block";
}

// Additional shared functions (resetQuiz, checkPreAnswers)

function checkPreAnswers() {
    const answers = {
        q1: "a",
        q2: "b",
        q3: "b",
        q4: "c",
        q5: "c",
    };

    let score = 0;
    let totalQuestions = Object.keys(answers).length;
    let feedback = "";

    // Loop through each question and check the answer
    for (let key in answers) {
        let selectedAnswer = document.querySelector(`input[name="${key}"]:checked`);
        if (selectedAnswer) {
            if (selectedAnswer.value === answers[key]) {
                score++;
                feedback += `<p class="correct">Question ${key.slice(1)}: Correct</p>`;
            } else {
                feedback += `<p class="incorrect">Question ${key.slice(1)}: Incorrect</p>`;
            }
        } else {
            feedback += `<p class="not-selected">Question ${key.slice(1)}: Not selected</p>`;
        }
    }

    // Display result
    let result = document.getElementById("result");
    let finalMessage = score === totalQuestions
        ? `<p>Ready for the real test? Click <a href="Quiz.html">here</a></p>`
        : `<p>Want to learn more? Visit the <a href="CyberInfo.html">Cyber Info</a> page.</p>`;

    result.innerHTML = `
        <p>You got ${score} out of ${totalQuestions} correct!</p>
        ${feedback}
        ${finalMessage}
    `;
}




function checkQuizAnswers() {
    const answers = {
        young: {
            q1: "a",
            q2: "d",
            q3: "b",
            q4: "a",
            q5: "c"
        },
        adult: {
            q1: "b",
            q2: "b",
            q3: "b",
            q4: "b",
            q5: "a"
        },
        senior: {
            q1: "d",
            q2: "b",
            q3: "a",
            q4: "c",
            q5: "c"
        }
    };

    let score = 0;
    let totalQuestions = 5; // Each quiz has 5 questions
    let feedback = '';
    let displayedQuiz = '';

    // Determine which quiz is displayed
    if (document.getElementById("quiz-container-1").style.display === "block") {
        displayedQuiz = "young";
    } else if (document.getElementById("quiz-container-2").style.display === "block") {
        displayedQuiz = "adult";
    } else if (document.getElementById("quiz-container-3").style.display === "block") {
        displayedQuiz = "senior";
    }

    // Ensure a quiz is displayed before proceeding
    if (!displayedQuiz) {
        alert("No quiz is currently displayed.");
        return;
    }

    // Loop through each question and check the answer
    for (let key in answers[displayedQuiz]) {
        let selectedAnswer = document.querySelector(`input[name="${key}"]:checked`);
        if (selectedAnswer) {
            if (selectedAnswer.value === answers[displayedQuiz][key]) {
                score++;
                feedback += `<p>Question ${key.slice(1)}: You answered correctly!</p>`;
            } else {
                feedback += `<p>Question ${key.slice(1)}: You answered incorrectly.</p>`;
            }
        } else {
            feedback += `<p>Question ${key.slice(1)}: No answer selected.</p>`;
        }
    }

    // Display result and feedback
    let result = document.getElementById("result");
    result.innerHTML = `You got ${score} out of ${totalQuestions} correct!<br>`;
    result.innerHTML += `<div>${feedback}</div>`;

    // Add review link only if there are incorrect answers
    if (score < totalQuestions) {
        result.innerHTML += `<p>Want to review the content? Visit the <a href="CyberInfo.html">Cyber Info</a> page.</p>`;
    }
}


function resetQuiz() {
  // Clear selected radio buttons
  let inputs = document.querySelectorAll('input[type="radio"]:checked');
  inputs.forEach(input => input.checked = false);

  // Clear result display
  let result = document.getElementById("result");
  result.innerHTML = '';
}

// Popup and footer loading functionality in the general `window.onload`
window.onload = function() {
  // General page setup - check if footer placeholder exists and load footer
  if (document.getElementById('footer-placeholder')) {
      loadFooter();
  }

  // Check if on the index page and set up popup if required
  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
      setupPopup();
  }

  // Quiz page setup - call promptUserAge only if quiz containers exist
  if (document.getElementById("quiz-container-1")) {
      promptUserAge();
  }
};

// Popup setup function
function setupPopup() {
  let popup = document.getElementById("popupBox");
  if (!popup) return; // Exit if popupBox element doesn't exist

  let closeButton = document.querySelector(".close-button");
  popup.style.display = "block";

  closeButton.onclick = function() {
      popup.style.display = "none";
  };

  window.onclick = function(event) {
      if (event.target == popup) {
          popup.style.display = "none";
      }
  };
}

// Function to load footer content dynamically from footer.html
function loadFooter() {
  fetch('footer.html')
      .then(response => response.text())
      .then(data => {
          const footerPlaceholder = document.getElementById('footer-placeholder');
          if (footerPlaceholder) {
              footerPlaceholder.innerHTML = data;
          }
      })
      .catch(error => console.error('Error loading footer:', error));
}
