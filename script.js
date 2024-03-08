const stepsList = document.querySelectorAll("[data-step-section]");
const stepSectionList = document.querySelectorAll(".section-item");
const backButton = document.querySelector(".back-button");
const nextButton = document.querySelector(".next-button");
const periodPlan = document.querySelector(".period-plan");
const textPlanOffer = document.querySelectorAll(".yearly-plan-offer");
const checkboxPeriodPlan = periodPlan.querySelector('input[type="checkbox"]');
const textPlanOption = document.querySelectorAll(".plan-option");
const textPlanPrice = document.querySelectorAll(".plan-price");
const confirmButton = document.querySelector(".confirm-button");
const numberOfItems = stepsList.length - 1;
const inputRequiredList = document.querySelectorAll("input[required");
const selectPlansList = document.querySelectorAll("[data-selected-plan]");
const selectPlanError = document.querySelector(".err-select-plan p");
const addOnsList = document.querySelectorAll("[data-selected-addon]");
const addOnsSelectedList = document.querySelectorAll(
  "input[type='checkbox'][name='add-ons']"
);

const addonPrice = document.querySelectorAll(".addon-price");
const summaryBody = document.querySelector(".summary-body");

let currentPage = 0;

const summary = {
  planName: "",
  planPrice: "",
  planOption: "",
  addonName: [],
  addonPrice: [],
};

stepsList.forEach((stepItem, i) => {
  stepItem.addEventListener("click", function (e) {
    formValidation(currentPage);
    if (formValidation(currentPage)) {
      currentPage = i;
      toggleButtons(currentPage);
      selectStepPlan(currentPage);
    }
  });
});

nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (formValidation(currentPage)) {
    currentPage++;
    toggleButtons(currentPage);
    selectStepPlan(currentPage);
  }
});

backButton.addEventListener("click", function (e) {
  e.preventDefault();
  currentPage--;
  toggleButtons(currentPage);
  selectStepPlan(currentPage);
});

confirmButton.addEventListener("click", function (e) {
  e.preventDefault();
  currentPage++;
  selectStepPlan(currentPage);
  toggleButtons(currentPage);
});

checkboxPeriodPlan.addEventListener("change", function () {
  if (checkboxPeriodPlan.checked) {
    summary.planOption = "yr";
    if (summary.planPrice) summary.planPrice = summary.planPrice + "0";
    if (summary.addonPrice) {
      summary.addonPrice.forEach((price, i) => {
        summary.addonPrice[i] = price + "0";
      });
    }
    textPlanOffer.forEach((element, i) => {
      element.classList.add("active");
    });
    textPlanPrice.forEach((element, i) => {
      element.textContent = element.textContent + "0";
    });
    textPlanOption.forEach((element, i) => {
      element.textContent = "yr";
    });
    addonPrice.forEach((element, i) => {
      element.textContent = element.textContent + "0";
    });
  } else {
    summary.planOption = "mo";
    if (summary.planPrice) summary.planPrice = summary.planPrice.slice(0, -1);
    if (summary.addonPrice) {
      summary.addonPrice.forEach((price, i) => {
        summary.addonPrice[i] = price.slice(0, -1);
      });
    }

    textPlanOffer.forEach((element, i) => {
      element.classList.remove("active");
    });
    textPlanPrice.forEach((element, i) => {
      element.textContent = textPlanPrice[i].textContent.slice(0, -1);
    });
    textPlanOption.forEach((element, i) => {
      element.textContent = "mo";
    });
    addonPrice.forEach((element, i) => {
      element.textContent = addonPrice[i].textContent.slice(0, -1);
    });
  }

  updateSummary();
});

selectPlansList.forEach((plan) => {
  plan.addEventListener("click", function (e) {
    selectPlansList.forEach((s, i) => {
      s?.classList.remove("plan-selected");
      if (plan.contains(e.target)) {
        plan.classList.add("plan-selected");
        plan.dataset.selectedPlan = "on";
        selectPlanError.textContent = "";
        summary.planName = plan.querySelector(".plan-name").textContent;
        summary.planPrice = plan.querySelector(".plan-price").textContent;
        summary.planOption = plan.querySelector(".plan-option").textContent;
      }
    });
    updateSummary();
  });
});

addOnsSelectedList.forEach((addOnCheckbox) => {
  addOnCheckbox.addEventListener("change", function (e) {
    addOnsList.forEach((addon, i) => {
      if (addon.contains(e.target)) {
        const addonName = addon.querySelector(".addon-name").textContent;
        const addonPrice = parseInt(
          addon.querySelector(".addon-price").textContent
        );
        if (addOnCheckbox.checked) {
          summary.addonName.splice(i, 0, addonName);
          summary.addonPrice.splice(i, 0, addonPrice);
        } else {
          const index = summary.addonName.indexOf(addonName);
          if (index !== -1) {
            summary.addonName.splice(index, 1);
            summary.addonPrice.splice(index, 1);
          }
        }
        updateSummary();
      }
    });
  });
});

//Hida or display pagination buttons
const toggleButtons = (curPage) => {
  backButton.classList.toggle("active", curPage > 0);
  nextButton.classList.toggle("active", curPage < numberOfItems);
  confirmButton.classList.toggle("active", curPage === numberOfItems);
  if (curPage > numberOfItems) {
    backButton.classList.toggle("active");
    confirmButton.classList.remove("active");
  }
};

//Highlight selected step and display correspondent form
const selectStepPlan = (curPage) => {
  stepsList.forEach((step, index) => {
    const stepNumber = step.querySelector(".step-number");
    stepNumber.classList.toggle(
      "step-active",
      index === curPage || (index === numberOfItems && curPage > numberOfItems)
    );
  });

  stepSectionList.forEach((section, index) => {
    section?.classList.toggle("active", index === curPage);
  });
};

//Form Validation
const formValidation = (curPage) => {
  if (curPage === 0) {
    let isValid = true;
    inputRequiredList.forEach((input) => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      const errMsg = label.querySelector(".input-err-msg");

      if (!input.value) {
        errMsg.textContent = "This field is required";
        isValid = false;
      } else {
        errMsg.textContent = "";
        isValid = true;
      }
    });

    return isValid;
  }

  if (curPage === 1) {
    const isValid = Array.from(selectPlansList).some(
      (plan) => plan.dataset.selectedPlan === "on"
    );

    selectPlanError.textContent = isValid ? "" : "Please select a plan!";

    return isValid;
  }

  return true;
};

const updateSummary = function () {
  const summaryPlan = document.querySelector("[data-summary-plan]");
  const summaryPrice = document.querySelector("[data-summary-price]");
  const summaryPlanOption = summaryBody.querySelector(".plan-option");
  const summaryAddOns = document.querySelector(".summary-add-ons");
  const summaryTotal = document.querySelector("[data-summary-total]");

  summaryPlan.textContent = summary.planName;
  summaryPrice.textContent = `$${summary.planPrice}`;
  summaryPlanOption.textContent = `/${summary.planOption}`;
  let totalPrice = parseInt(summary.planPrice);

  summaryAddOns.innerHTML = "";
  summaryTotal.textContent = "";

  summary?.addonName.forEach((addon, i) => {
    totalPrice = parseInt(totalPrice) + parseInt(summary.addonPrice[i]);
    const html = ` 
                        <span class="text-wrapper">
                            <p>${addon}</p>
                            <p>  <span class="plan-price">+$${summary.addonPrice[i]}/</span><span
                            class="plan-option"
                            >${summary.planOption}</span
                            ></p>
                        </span>
                    `;
    summaryAddOns.insertAdjacentHTML("beforeend", html);
  });

  summaryTotal.textContent = `+$${totalPrice}/${summary.planOption}`;
};

const clearErrorMessage = (inputId) => {
  const inputErrorMsg = document.querySelector(
    `label[for="${inputId}"] .input-err-msg`
  );
  inputErrorMsg.textContent = "";
};

inputRequiredList.forEach((input) => {
  input.addEventListener("keyup", function (e) {
    if (e.target.value !== "") {
      clearErrorMessage(e.target.id);
    }
  });
});
