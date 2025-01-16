//initialize variables
const aiTechContainer = document.getElementById("aitechContainer");
const detailsContainer = document.getElementById("detailsContainer");
const spinner = document.getElementById("loadingSpinner");
const secondSpinner = document.getElementById("loadingSecondSpinner");
const seeMoreBtn = document.getElementById("seeMoreBtn");

// main functions

const loadAll = async () => {
  toggleSpinner(true, "allData");
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
  toggleSpinner(false, "allData");
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
              <button onclick='detailsModal.showModal(); detailsHandler("${aiTech.id}")' class="btn rounded-full bg-pink-100 text-pink-400">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
    `;
  }
};

const handleClose = () => {
  detailsContainer.textContent = "";
};

const detailsHandler = async (id) => {
  toggleSpinner(true, "singleData");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const rawData = await response.json();
  const data = rawData.data;

  const integrationList = data.integrations
    .map((item) => `<li class="text-sm text-gray-400">${item}</li>`)
    .join("");

  const example = data.input_output_examples
    .map(
      (item) =>
        `<p class="font-bold">${item.input}</p><p class="text-gray-400">${item.output}</p>`
    )
    .join("");

  detailsContainer.innerHTML = `
  <div class="grid grid-cols-2 gap-5 rounded-lg pt-14">
              <div
                class="border-red-400 border bg-red-50 rounded-lg space-y-3 p-5"
              >
                <p class="font-bold">
                  ${data?.description}
                </p>
                <div class="grid grid-cols-3 gap-3">
                  <p class="rounded-lg bg-white text-green-400 p-3">
                  ${data?.pricing[0].price} ${data?.pricing[0].plan}
                  </p>
                  <p class="rounded-lg bg-white text-orange-400 p-3">
                  ${data?.pricing[1].price} ${data?.pricing[1].plan}
                  </p>
                  <p class="rounded-lg bg-white text-red-400 p-3">
                  ${data?.pricing[2].price} ${data?.pricing[2].plan}
                  </p>
                </div>
                <div class="flex justify-between">
                  <ul class="list-disc ml-5">
                    <p class="font-bold text-lg">Features</p>
                    <li class="text-sm text-gray-400">${
                      data.features["1"].feature_name
                    }</li>
                    <li class="text-sm text-gray-400">${
                      data.features["2"].feature_name
                    }</li>
                    <li class="text-sm text-gray-400">${
                      data.features["3"].feature_name
                    }</li>
                    
                  </ul>
                  <ul class="list-disc ml-5">
                    <p class="font-bold text-lg">Integrations</p>
                    ${integrationList}
                  </ul>
                </div>
              </div>
              <div class="border rounded-lg space-y-3 p-5 relative">
                <img
                  src="${data?.image_link[0]}"
                  alt=""
                  class="w-full rounded-lg"
                />
                <p
                  class="absolute bg-red-400 text-white rounded-lg p-3 top-5 right-8"
                >
                    ${data.accuracy.score * 100}% Accuracy
                </p>
                ${example}
              </div>
            </div>
  `;

  toggleSpinner(false, "singleData");
};

// utilities
const toggleSpinner = (isLoading, specifier) => {
  if (!isLoading && specifier === "allData") {
    spinner.classList.add("hidden");
    seeMoreBtn.classList.remove("hidden");
  } else if (isLoading && specifier === "allData") {
    spinner.classList.remove("hidden");
    seeMoreBtn.classList.add("hidden");
  } else if (!isLoading && specifier === "singleData") {
    secondSpinner.classList.add("hidden");
  } else if (isLoading && specifier === "singleData") {
    secondSpinner.classList.remove("hidden");
  }
};

loadAll();
