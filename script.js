function calculate() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value);
  var weightUnit = document.getElementById("weightUnit").value;
  var heightUnit = document.getElementById("heightUnit").value;
  var age = parseInt(document.getElementById("age").value);
  var gender = document.getElementById("gender").value;
  var activity = parseFloat(document.getElementById("activity").value);

  if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
      document.getElementById("result").innerHTML = "Weight, height, and age must be valid inputs and greater than zero.";
      document.getElementById("explanation").style.display = "none";
      return;
  }

  if (weightUnit === "lbs") {
      weight *= 0.453592;
  }
  if (heightUnit === "in") {
      height *= 0.0254;
  } else if (heightUnit === "cm") {
      height *= 0.01;
  }

  var bmi = weight / Math.pow(height, 2);
  var bmiCategory;
  if (bmi < 18.5) {
      bmiCategory = "Underweight";
  } else if (bmi < 24.9) {
      bmiCategory = "Normal weight";
  } else if (bmi < 29.9) {
      bmiCategory = "Overweight";
  } else if (bmi >= 30) {
      bmiCategory = "Obese";
  } else {
      bmiCategory = "Invalid BMI";
  }

  var bmr;
  if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * (height * 100)) - (5.677 * age);
  } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * (height * 100)) - (4.330 * age);
  }

  var tdee = bmr * activity;
  var idealWeightMin = 18.5 * Math.pow(height, 2);
  var idealWeightMax = 24.9 * Math.pow(height, 2);

  document.getElementById("result").innerHTML = `Your BMI is: ${bmi.toFixed(2)} (${bmiCategory}).<br>`;
  document.getElementById("result").innerHTML += "Ideal weight range: " + idealWeightMin.toFixed(2) + " - " + idealWeightMax.toFixed(2) + " kg.<br>";
  document.getElementById("result").innerHTML += `Your estimated daily calorie intake to maintain your weight is: ${tdee.toFixed(2)} calories.`;

  document.getElementById("explanation").innerHTML = `
      <h3>Calculation Details:</h3>
      <p>
          <strong>BMI(Body Mass Index) Calculation:</strong><br>
          BMI = weight (kg) / (height (m))<sup>2</sup><br>
          BMI = ${weight.toFixed(2)} kg / (${height.toFixed(2)} m)<sup>2</sup><br>
          BMI = ${bmi.toFixed(2)}
      </p>

      <p>
        <strong>Ideal Weight Range Calculation:</strong><br>
        Minimum Ideal Weight = 18.5 * (height (m))<sup>2</sup><br>
        Minimum Ideal Weight = 18.5 * (${height.toFixed(2)} m)<sup>2</sup><br>
        Minimum Ideal Weight = ${idealWeightMin.toFixed(2)} kg<br><br>
        Maximum Ideal Weight = 24.9 * (height (m))<sup>2</sup><br>
        Maximum Ideal Weight = 24.9 * (${height.toFixed(2)} m)<sup>2</sup><br>
        Maximum Ideal Weight = ${idealWeightMax.toFixed(2)} kg
      </p>

      <p>
          <strong>BMR(Basal Metabolic Rate) Calculation:</strong><br>
          ${gender === "male" ? 
              `BMR = 88.362 + (13.397 * weight (kg)) + (4.799 * height (cm)) - (5.677 * age)` :
              `BMR = 447.593 + (9.247 * weight (kg)) + (3.098 * height (cm)) - (4.330 * age)`
          }<br>
          BMR = ${bmr.toFixed(2)} calories/day
      </p>
      <p>
          <strong>TDEE(Total Daily Energy Expenditure) Calculation:</strong><br>
          TDEE = BMR * Activity Level<br>
          TDEE = ${bmr.toFixed(2)} * ${activity}<br>
          TDEE = ${tdee.toFixed(2)} calories/day
      </p>
  `;

  document.getElementById("explanation").style.display = "block";
}

// Theme toggle script
document.getElementById('themeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  var themeIcon = document.getElementById('themeIcon');
  themeIcon.src = 'img/theme.gif'; 
});
