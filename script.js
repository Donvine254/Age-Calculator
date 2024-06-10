
document.addEventListener("DOMContentLoaded", function () {
  const firstForm = document.getElementsByClassName("current_date_form")[0];
  const secondForm = document.getElementsByClassName("given_date_form")[0];
  const today = new Date();
  const dateInput = document.getElementById("date");
  const selectedDateInput = document.getElementById("selected-date");
  const secondDateInput = document.getElementById("birth-date");
  const results = document.getElementById("results");
  const secondResults = document.getElementById("results-2");

  function handleSubmit(
    e,
    birthDateInput,
    comparisonDateInput,
    resultsElement,
    comparisonToToday
  ) {
    e.preventDefault();

    if (
      !birthDateInput.value ||
      (comparisonDateInput && !comparisonDateInput.value)
    ) {
      Toastify({
        text: "Kindly select a date to continue!",
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
    }

    const birthDate = new Date(birthDateInput.value);
    const comparisonDate = comparisonDateInput
      ? new Date(comparisonDateInput.value)
      : today;

    if (comparisonToToday && birthDate >= today) {
      Toastify({
        text: "Your birthday cannot be a future date!",
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
    }
    if (comparisonDate <= birthDate) {
      Toastify({
        text: "Your selected date cannot be in the past!",
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
    }

    const isBirthday = comparisonToToday && showConfetti(birthDate, today);

    const age = calculateAge(birthDate, comparisonDate);
    resultsElement.innerText = `You are ${age.years ?? 0} years ${
      age.months ?? 0
    } months ${age.days ?? 0} days old ${
      comparisonToToday ? "today" : "on the selected date"
    }.`;

    if (isBirthday) {
      resultsElement.innerText += " Happy Birthday!";
    }

    resultsElement.classList.remove("results-hidden");
    resultsElement.classList.add("results-shown");

    birthDateInput.value = "";
    if (comparisonDateInput) comparisonDateInput.value = "";
  }

  firstForm.addEventListener("submit", function (e) {
    handleSubmit(e, dateInput, null, results, true);
  });

  secondForm.addEventListener("submit", function (e) {
    handleSubmit(e, secondDateInput, selectedDateInput, secondResults, false);
  });

  function calculateAge(birthDate, comparisonDate) {
    let years = comparisonDate.getFullYear() - birthDate.getFullYear();
    let months = comparisonDate.getMonth() - birthDate.getMonth();
    let days = comparisonDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(
        comparisonDate.getFullYear(),
        comparisonDate.getMonth(),
        0
      ).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  function showConfetti(birthDate, today) {
    if (
      birthDate.getMonth() === today.getMonth() &&
      birthDate.getDate() === today.getDate()
    ) {
      confetti({
        particleCount: 1000,
        spread: 80,
        origin: { y: 0.3 },
      });
      return true;
    }
    return false;
  }
});
