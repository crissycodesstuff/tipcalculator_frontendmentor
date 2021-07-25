"use strict";

const tipButtons = document.querySelectorAll(".btn-tip");
const customTip = document.getElementById("custom-tip");
const resetButton = document.querySelector(".btn-reset");

const inputPeople = document.getElementById("people");
const inputBill = document.getElementById("bill");

let tipValue = 0.001;
let billValue = 0;
let peopleValue = 1;

let totalPerPerson = document.querySelector(".total__amount-per-person");
let tipPerPerson = document.querySelector(".tip-amount__amount-per-person");

function inputValidation(input) {
  let inputWarning = input.previousElementSibling;
  if (input.value <= 0) {
    inputWarning.classList.add("input__warning--active");
    input.style.borderColor = "#c91e1e;";
  } else if (
    input.value > 0 &&
    inputWarning.classList.contains("input__warning--active")
  )
    inputWarning.classList.remove("input__warning--active");

  if (input.value.length > input.maxLength)
    input.value = input.value.slice(0, input.maxLength);

  return Number(input.value);
}

function calcTotal() {
  const tipAmount = ((billValue * tipValue) / 100 / peopleValue).toFixed(2);
  const totalAmount = (billValue / peopleValue + Number(tipAmount)).toFixed(2);

  tipPerPerson.textContent = `$${tipAmount}`;
  totalPerPerson.textContent = `$${totalAmount}`;
}

function resetValues() {
  tipButtons.forEach((button) => {
    if (button.classList.contains("btn-tip--active"))
      button.classList.remove("btn-tip--active");
  });
  customTip.value = "";
  inputBill.value = "";
  inputPeople.value = "";
  tipPerPerson.textContent = `$0.00`;
  totalPerPerson.textContent = `$0.00`;
  resetButton.disabled = true;
}

// get bill value
inputBill.addEventListener("input", () => {
  billValue = inputValidation(inputBill);
  calcTotal();
  if (!billValue == 0) {
    resetButton.disabled = false;
    resetButton.addEventListener("click", resetValues);
  }
});

// get tip value
tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    if (!tipButton.classList.contains("btn-tip--active")) {
      tipButtons.forEach((button) => {
        button.classList.remove("btn-tip--active");
      });
      tipButton.classList.add("btn-tip--active");
      tipValue = tipButton.getAttribute("data-value");
      if (
        customTip.previousElementSibling.classList.contains(
          "input__warning--active"
        )
      )
        inputWarning.classList.remove("input__warning--active");
    } else {
      tipButton.classList.remove("btn-tip--active");
      tipValue = 1;
    }
    calcTotal();
  });
});

// get custom tip value
customTip.addEventListener("click", () => {
  tipButtons.forEach((tipButton) => {
    if (tipButton.classList.contains("btn-tip--active")) {
      tipButton.classList.remove("btn-tip--active");
      tipValue = 1;
    }
  });
});
customTip.addEventListener("input", () => {
  tipValue = inputValidation(customTip);
  calcTotal();
});

// get people value
inputPeople.addEventListener("input", () => {
  peopleValue = inputValidation(inputPeople);
  calcTotal();
});
