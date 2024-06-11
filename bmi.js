const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const bmiForm = document.querySelector(".bmi-form");
const resultsElement = document.querySelector("#results");
let weight;
let height;
bmiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!heightInput.value || !weightInput.value) {
    Toastify({
      text: "Kindly enter your height and weight",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      avatar:
        "https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png",
      style: {
        background: "#fefefe",
        border: "1px solid",
        color: "red",
      },
    }).showToast();
    return;
  } else {
    height = heightInput.value;
    weight = weightInput.value;
    let BMI = (weight / ((height * height) / 10000)).toFixed(2);
    resultsElement.innerText = `Your BMI is ${BMI} indicating that you are ${checkBMIStatus(
      BMI
    )}`;
    resultsElement.classList.remove("results-hidden");
    resultsElement.classList.add("results-shown");
  }
});
function checkBMIStatus(BMI) {
  let status;
  switch (true) {
    case BMI < 18.5:
      status = "Underweight";
      break;
    case BMI >= 18.5 && BMI < 25:
      status = "Normal";
      break;
    case BMI >= 25 && BMI < 30:
      status = "Overweight";
      break;
    default:
      status = "Obese";
  }
  return status;
}
