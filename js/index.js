//initialize variables
const aiTechContainer = document.getElementById("aitechContainer");
const spinner = document.getElementById("loadingSpinner");
const seeMoreBtn = document.getElementById("seeMoreBtn");

// main functions

const loadAll = async () => {
  toggleSpinner(true);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tools`
  );
  const rawData = await response.json();
  const data = rawData.data.tools;
  showData(data.slice(0, 6));
  seeMoreBtn.addEventListener("click", () => {
    showData(data);
    seeMoreBtn.classList.add("hidden");
  });
  toggleSpinner(false);
};

const showData = (data) => {
  aiTechContainer.textContent = "";
  for (const aiTech of data) {
    const featureList = aiTech.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
    aiTechContainer.innerHTML += `
    <div class="p-5 rounded-xl border shadow-md">
          <img
            src="${aiTech?.image}"
            alt="${aiTech?.name}"
            class="w-full rounded-xl"
          />
          <p class="font-bold my-3">Features</p>
          <ol class="mb-3 text-gray-400 list-decimal ml-5">
            ${featureList}
          </ol>
          <hr class="border-1 my-3" />
          <div class="flex justify-between">
            <div>
              <p class="text-lg font-semibold">${aiTech?.name}</p>
              <p class="text-sm text-gray-400">
                <i class="fa-solid fa-calendar-days"></i> ${aiTech?.published_in}
              </p>
            </div>
            <div>
              <button onclick= class="btn rounded-full bg-pink-100 text-pink-400">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
    `;
    console.log(aiTech);
  }
};

// utilities
const toggleSpinner = (isLoading) => {
  if (!isLoading) {
    spinner.classList.add("hidden");
  } else {
    spinner.classList.remove("hidden");
  }
};

loadAll();
