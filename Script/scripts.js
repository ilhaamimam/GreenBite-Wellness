// ================== NAVBAR TOGGLE ==================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ================== HERO SLOGANS ==================
const slogans = [
  "Eat Well, Live Well.",
  "Healthy Mind, Healthy Body.",
  "Small Steps, Big Changes.",
  "Nourish to Flourish.",
  "Fuel Your Day the GreenBite Way."
];

let sloganIndex = 0;
const sloganElement = document.getElementById("slogan");

if (sloganElement) {
  setInterval(() => {
    sloganIndex = (sloganIndex + 1) % slogans.length;
    sloganElement.textContent = slogans[sloganIndex];
  }, 3000); // every 3 seconds changes
}

// ================== DAILY TIP ==================
const tips = [
  "Drink at least 8 glasses of water today.",
  "Take a 10-minute walk after meals.",
  "Eat more fiber-rich foods like vegetables and whole grains.",
  "Practice mindful breathing for 5 minutes.",
  "Avoid sugary drinks — choose water or herbal tea instead."
];

const tipElement = document.getElementById("dailyTip");
if (tipElement) {
  const today = new Date();
  const tipIndex = today.getDate() % tips.length; // rotate tips by date
  tipElement.textContent = tips[tipIndex];
}

// ================== NEWSLETTER STORAGE ==================
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value;

    if (email && email.includes("@")) {
  // Get existing emails from localStorage, or create an empty array
  let emails = JSON.parse(localStorage.getItem("newsletter.JSON")) || [];

  // Add the new email
  emails.push(email);

  // Save back to localStorage
  localStorage.setItem("newsletter.JSON", JSON.stringify(emails));

  newsletterMsg.textContent = "🎉 Thank you for subscribing!";
  newsletterMsg.style.color = "green";
  newsletterForm.reset();
} else {
  newsletterMsg.textContent = "⚠️ Please enter a valid email.";
  newsletterMsg.style.color = "red";
}
  });
}





// ================== End of the index part from here ================================



// ================== RECIPES PAGE ============================


const recipeCards = document.getElementById("recipeCards");
const recipeSearch = document.getElementById("recipeSearch");
const categoryButtons = document.querySelectorAll(".recipe-categories button");

let recipes = [];
let selectedCategory = "all";

// ✅ Load recipes from JSON
async function loadRecipes() {
  try {
    const response = await fetch("./JSON/recipe.JSON"); // adjust path if needed
    recipes = await response.json();
    displayRecipes(); // show recipes once loaded
  } catch (error) {
    console.error("Error loading recipes:", error);
  }
}

// ✅ Display recipes with search + category filter
function displayRecipes(filter = "") {
  recipeCards.innerHTML = "";
  recipes
    .filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = selectedCategory === "all" || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .forEach((r, i) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${r.img}" alt="${r.title}">
        <h3>${r.title}</h3>
        <p>${r.description}</p>
      `;
      card.addEventListener("click", () => openModal(i)); // assuming you have openModal()
      recipeCards.appendChild(card);
    });
}



// ✅ Search filter
if (recipeSearch) {
  recipeSearch.addEventListener("input", e => displayRecipes(e.target.value));
}

// ✅ Category buttons
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
    displayRecipes(recipeSearch.value);
  });
});

// ✅ Run loader only if recipeCards exist
if (recipeCards) {
  loadRecipes();
}

// Modal Elements
const modal = document.getElementById("recipeModal");
const closeModalBtn = document.getElementById("closeModal");

// ✅ Function to open modal
function openModal(index) {
  const r = recipes[index];

  // Fill modal details
  document.getElementById("modalTitle").innerText = r.title;
  document.getElementById("modalImg").src = r.img;
  document.getElementById("modalImg").alt = r.title;
  document.getElementById("modalDesc").innerText = r.description;

  // Ingredients
  const ingList = document.getElementById("modalIngredients");
  ingList.innerHTML = "";
  r.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingList.appendChild(li);
  });

  // Steps
  const stepList = document.getElementById("modalSteps");
  stepList.innerHTML = "";
  r.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepList.appendChild(li);
  });

  // Nutrition (table rows)
  const nutri = document.getElementById("modalNutrition");
  nutri.innerHTML = `
    <tr><th>Calories</th><td>${r.nutrition.Calories}</td></tr>
    <tr><th>Carbs</th><td>${r.nutrition.Carbs}</td></tr>
    <tr><th>Protein</th><td>${r.nutrition.Protein}</td></tr>
    <tr><th>Fat</th><td>${r.nutrition.Fat}</td></tr>
  `;

  // Show modal
  modal.style.display = "flex";
}

// ✅ Close modal function
function closeModal() {
  modal.style.display = "none";
}

// ✅ Event listeners (added only once)
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (modal) {
  window.addEventListener("click", e => {
    // Close modal only when clicking outside modal content
    if (e.target === modal) closeModal();
  });
}








// ================== End of the Recipes part from here ================================

//=======================================Calculator part========================================
// ================== CALCULATOR PAGE ==================
const calcForm = document.getElementById("calcForm");
if (calcForm) {
  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = +document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const height = +document.getElementById("height").value;
    const weight = +document.getElementById("weight").value;
    const activity = +document.getElementById("activity").value;

    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activity;
    const carbs = (tdee * 0.5) / 4;
    const protein = (tdee * 0.2) / 4;
    const fat = (tdee * 0.3) / 9;

    document.getElementById("results").innerHTML = `
      <h2>Results</h2>
      <p><strong>BMR:</strong> ${bmr.toFixed(2)} kcal/day</p>
      <p><strong>TDEE:</strong> ${tdee.toFixed(2)} kcal/day</p>
      <p><strong>Macronutrient Breakdown:</strong></p>
      <ul>
        <li>Carbs: ${carbs.toFixed(1)} g</li>
        <li>Protein: ${protein.toFixed(1)} g</li>
        <li>Fat: ${fat.toFixed(1)} g</li>
      </ul>
    `;
  });
}

//=======================================Workout========================================
const workoutForm = document.getElementById("workoutForm");
const workoutPlanDiv = document.getElementById("workoutPlan");
const timerSection = document.getElementById("timerSection");
const countdownEl = document.getElementById("countdown");
const startTimerBtn = document.getElementById("startTimer");

const workouts = {
  "full body": ["Burpees", "Jumping Jacks", "Mountain Climbers", "Push-ups", "Squats"],
  "arms": ["Bicep Curls", "Push-ups", "Tricep Dips", "Shoulder Press"],
  "legs": ["Squats", "Lunges", "Calf Raises", "Jump Squats"],
  "core": ["Sit-ups", "Plank", "Russian Twists", "Leg Raises"]
};

workoutForm?.addEventListener("submit", e => {
  e.preventDefault();
  const bodyPart = document.getElementById("bodyPart").value;
  const equipment = document.getElementById("equipment").value;

  let selected = workouts[bodyPart];
  let plan = selected
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(ex => `• ${ex} (${equipment})`)
    .join("<br>");

  workoutPlanDiv.innerHTML = `<h3>Your Workout Plan:</h3><p>${plan}</p>`;
  timerSection.style.display = "block";
});

// Countdown Timer
let timer;
startTimerBtn?.addEventListener("click", () => {
  let time = 30;
  countdownEl.textContent = time;
  clearInterval(timer);

  timer = setInterval(() => {
    time--;
    countdownEl.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      alert("Time’s up! Move to the next exercise.");
    }
  }, 1000);
});


//=================================================mindfullness part=============================



// Breathing Animation
const breathText = document.getElementById("breathText");
const circle = document.querySelector(".circle");

function startBreathing() {
  let cycle = 0;
  setInterval(() => {
    if (cycle % 2 === 0) {
      breathText.textContent = "Breathe In";
      circle.style.transform = "scale(1.2)";
    } else {
      breathText.textContent = "Breathe Out";
      circle.style.transform = "scale(0.8)";
    }
    cycle++;
  }, 4000);
}
if (breathText && circle) startBreathing();

// Meditation Timer
const startMeditationBtn = document.getElementById("startMeditation");
const meditationCountdown = document.getElementById("meditationCountdown");

startMeditationBtn?.addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("meditationMinutes").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Enter valid minutes!");
    return;
  }

  let time = minutes * 60;
  meditationCountdown.textContent = `${minutes}:00`;

  let timer = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    meditationCountdown.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      meditationCountdown.textContent = "Session Completed 🍃";
      localStorage.setItem("lastMeditation", new Date().toLocaleString());
    }
  }, 1000);
});

// Ambient Sounds
const playNatureBtn = document.getElementById("playNature");
const stopNatureBtn = document.getElementById("stopNature");
const natureSound = document.getElementById("natureSound");

playNatureBtn?.addEventListener("click", () => natureSound.play());
stopNatureBtn?.addEventListener("click", () => natureSound.pause());


//=================================================Contact part=============================
// Contact Form
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

contactForm?.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    contactMsg.textContent = "⚠️ Please fill all fields!";
    contactMsg.style.color = "red";
    return;
  }

  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push({ name, email, message, date: new Date().toLocaleString() });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  contactMsg.textContent = "✅ Thank you! Your feedback has been recorded.";
  contactMsg.style.color = "green";
  contactForm.reset();
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});