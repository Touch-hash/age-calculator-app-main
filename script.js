let btnCalculate = document.getElementById("btn-calculate");
let yearResult = document.getElementById("year-spans");
let monthResult = document.getElementById("month-spans");
let dayResult = document.getElementById("day-spans");
let yearInput = document.getElementById("year");
let monthInput = document.getElementById("month");
let dayInput = document.getElementById("day");
let inputs = document.querySelectorAll(".inputs input");
let labels = document.querySelectorAll(".inputs label");
let inputspans = document.querySelectorAll(".inputs #span-input");

let yourYear;
let yourMonth;
let yourDay;
let days;
let isValid = true;

// this func focus on ui for validation of inputs
function requiers() {
  inputs.forEach((item, i) => {
    if (item.value == "" || null) {
      inputspans[i].textContent = "this field is requiered";
      labels[i].style = ` color: red !important;`;
      inputs[i].style = `  border-color: red !important;`;
      isValid = false;
    } else {
      inputspans[i].textContent = "";
      labels[i].style = ` color: #717171 !important;`;
      inputs[i].style = `  border-color: #8b8b8b !important;`;
      isValid = true;
    }
  });
}
// this func focus on the validation logic of the input number
function validationOfInput() {
  inputs.forEach((item, i) => {
    if (i == 0) {
      item.value <= 31 ? isValid == true : (isValid = false);
    } else if (i === 1) {
      item.value <= 12 ? isValid == true : (isValid = false);
    } else if (i === 2) {
      item.value <= new Date().getFullYear()
        ? isValid == true
        : (isValid = false);
    }
  });
}
// this func calculate and set the age and modifiy some errors
function yourAge() {
  let dayInputValue = Number(dayInput.value);
  let monthInputValue = Number(monthInput.value);
  let yearInputValue = Number(yearInput.value);
  let date = new Date();
  let birth = new Date(`${monthInputValue} ${dayInputValue} ${yearInputValue}`);
  let year = Number(birth.getFullYear());
  let month = Number(birth.getMonth());
  let day = Number(birth.getDate());
  let isyourYear = Number(date.getFullYear()) - year;
  let isyourMonth = Number(date.getMonth() + 1) - Number(month + 1);
  let isyourDay = Number(date.getDate()) - day;
  validationOfInput();
  if (month == date.getMonth()) {
    yourMonth = 0;
    if (day == date.getDate()) {
      yourYear = isyourYear;
      yourDay = 0;
    } else if (day > date.getDate()) {
      yourYear = isyourYear - 1;

      days = daysInMonth(date.getFullYear(), date.getDate() + 1);
      yourDay = days - (day - date.getDate());
    } else {
      yourYear = isyourYear;
      yourDay = isyourDay;
    }
  } else if (month > date.getMonth()) {
    yourMonth = 12 - birth.getMonth();
    yourYear = isyourYear - 1;
  } else if (month < date.getMonth()) {
    yourMonth = isyourMonth;

    yourYear = isyourYear;
  }

  if (isValid) {
    yearResult.innerHTML = `
 <span class=" resultspan font-bold text-7xl text-[#844dff]">${yourYear}</span>
  `;
    monthResult.innerHTML = `
 <span class=" resultspan font-bold text-7xl text-[#844dff]">${yourMonth}</span>
  `;
    dayResult.innerHTML = `
 <span class="resultspan  font-bold text-7xl text-[#844dff]">${yourDay}</span>
  `;
  } else {
    return alert("there are field empty or invalid ");
  }
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

btnCalculate.addEventListener("click", () => {
  requiers();
  yourAge();
});
