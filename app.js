// real
const steps = document.querySelectorAll(".stp");
const circleSteps = document.querySelectorAll(".step");
const formInputs = document.querySelectorAll(".step1 form input");
const checkboxInputs = document.querySelectorAll(".step3 input[type='checkbox']");
const plans = document.querySelectorAll(".plancard");
const switcher = document.querySelector(".switch");
const addons = document.querySelectorAll(".box");
const total = document.querySelector(".total b");
const planPrice = document.querySelector(".planprice");
let time;
let currentStep = 1;
let currentCircle = 0;
const obj = {
  plan: null,
  kind: null,
  price: null,
};

steps.forEach((step) => {
  const nextBtn = step.querySelector(".nextstp");
  const prevBtn = step.querySelector(".prevstp");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      document.querySelector(`.step${currentStep}`).style.display = "none";
      currentStep--;
      document.querySelector(`.step${currentStep}`).style.display = "flex";
      circleSteps[currentCircle].classList.remove("active");
      currentCircle--;
    });
  }
  nextBtn.addEventListener("click", () => {
    document.querySelector(`.step${currentStep}`).style.display = "none";
    if (currentStep < 5 && validateForm()) {
      currentStep++;
      currentCircle++;
      setTotal();
    }
    document.querySelector(`.step${currentStep}`).style.display = "flex";
    circleSteps[currentCircle].classList.add("active");
    summary(obj);
  });
});
function summary(obj) {
  const planName = document.querySelector(".planname");
  const planPrice = document.querySelector(".planprice");
  planPrice.innerHTML = `${obj.price.innerText}`;
  planName.innerHTML = `${obj.plan.innerText} (${
    obj.kind ? "yearly" : "monthly"
  })`;
}
// this is extra name function starting
const nameInput = document.getElementById('name');
nameInput.addEventListener('keydown',validatename);

function validatename(){
  const keyCode = event.keyCode || event.which; 
    const isNumber = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105); 
    if (isNumber) {
      event.preventDefault();
      return false;
    }
}
// this is extra name function ending

// this is extra number function starting
const phoneInput= document.getElementById('phone');
phoneInput.addEventListener("keypress", function(e) {
  const keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8]; 

  if (!(keyCodes.includes(e.which))) {
    e.preventDefault();
    return false;
  }
});

// this is extra number function ending

const emailInput= document.getElementById('email')
function validateField(inputElement, regex, errorElement) {
  const value = inputElement.value.trim();
  const isValid = regex.test(value);
  if (!isValid) {
    errorElement.style.display = "block";
    inputElement.classList.add("err");
  } else {
    errorElement.style.display = "none";
    inputElement.classList.remove("err");
  }
  return isValid;
}

function validateForm() {
  let valid = true;

  // Reset errors
  emailError.style.display = "none";
  phoneError.style.display = "none";
  usernameError.style.display = "none";

  // Email validation
  valid = validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, emailError) && valid;
  // Phone validation
  valid = validateField(phoneInput, /^\d{10}$/, phoneError) && valid;
  // Username validation
  valid = validateField(nameInput, /^[A-Za-z\s]+$/, usernameError) && valid;
  // Other form inputs validation
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].value) {
      valid = false;
      formInputs[i].classList.add("err");
      findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
    } else {
      formInputs[i].classList.remove("err");
      findLabel(formInputs[i]).nextElementSibling.style.display = "none";
    }
  }
  return valid;
}

document.getElementById('image').addEventListener('change', function() {
  var error1 = document.getElementById('errorone');
  var error2 = document.getElementById('imageError');
  if (this) {
    error1.style.display = 'none';
    error2.style.display = 'none';
    image.classList.remove("err");
  } else {
    error1.style.display = 'block';
    error2.style.display = 'block';
  }
});

// validation ends
function findLabel(el) {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
}

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    plan.classList.add("selected");
    const planName = plan.querySelector("b");
    const planPrice = plan.querySelector(".planpriced");
    obj.plan = planName;
    obj.price = planPrice;
  });
});

switcher.addEventListener("click", () => {
  const val = switcher.querySelector("input").checked;
  if (val) {
    document.querySelector(".monthly").classList.remove("sw-active");
    document.querySelector(".yearly").classList.add("sw-active");
  } else {
    document.querySelector(".monthly").classList.add("sw-active");
    document.querySelector(".yearly").classList.remove("sw-active");
  }
  switchPrice(val);
  obj.kind = val;
});
addons.forEach((addon) => {
  addon.addEventListener("click", (e) => {
    const addonSelect = addon.querySelector("input");
    const ID = addon.getAttribute("dataid");
    if (addonSelect.checked) {
      addonSelect.checked = false;
      addon.classList.remove("adselected");
      showAddon(ID, false);
    } else {
      addonSelect.checked = true;
      addon.classList.add("adselected");
      showAddon(addon, true);
      e.preventDefault();
    }
  });
});

function switchPrice(checked) {
  const yearlyPrice = [90, 120, 150];
  const monthlyPrice = [9, 12, 15];
  const prices = document.querySelectorAll(".planpriced");
  if (checked) {
    prices[0].innerHTML = `$${yearlyPrice[0]}/yr`;
    prices[1].innerHTML = `$${yearlyPrice[1]}/yr`;
    prices[2].innerHTML = `$${yearlyPrice[2]}/yr`;
    setTime(true)
  } else {
    prices[0].innerHTML = `$${monthlyPrice[0]}/mo`;
    prices[1].innerHTML = `$${monthlyPrice[1]}/mo`;
    prices[2].innerHTML = `$${monthlyPrice[2]}/mo`;
    setTime(false)
  }
}
function showAddon(ad, val) {
  const temp = document.getElementsByTagName("template")[0];
  const clone = temp.content.cloneNode(true);
  const serviceName = clone.querySelector(".servicename");
  const servicePrice = clone.querySelector(".servicprice");
  const serviceID = clone.querySelector(".selectedaddon");
  if (ad && val) {
    serviceName.innerText = ad.querySelector("label").innerText;
    servicePrice.innerText = ad.querySelector(".price").innerText;
    serviceID.setAttribute("dataid", ad.dataset.id);
    document.querySelector(".addons").appendChild(clone);
  } else {
    const addons = document.querySelectorAll(".selectedaddon");
    addons.forEach((addon) => {
      const attr = addon.getAttribute("dataid");
      if (attr == ad) {
        addon.remove();
      }
    });
  }
}

function setTotal() {
  const str = planPrice.innerHTML;
  const res = str.replace(/\D/g, "");
  const addonPrices = document.querySelectorAll(
    ".selectedaddon .servicprice"
  );

  let val = 0;
  for (let i = 0; i < addonPrices.length; i++) {
    const str = addonPrices[i].innerHTML;
    const res = str.replace(/\D/g, "");

    val += Number(res);
  }
  total.innerHTML = `$${val + Number(res)}/${time?"yr":"mo"}`;
}
function setTime(t) {
  return time = t;
}


function saveFormData() {
  const formData = {};
  formInputs.forEach(input => {
    formData[input.id] = input.value; // Store input values
  });
  localStorage.setItem('formData', JSON.stringify(formData));
}

const checkbox1 = document.getElementById('online');
const checkbox2 = document.getElementById('larger');
const checkbox3  = document.getElementById('profile');

function yo(){
  console.log("hi")
}


//  event listeners to checkboxes for saving data

// Save checkbox state to local storage
function saveCheckboxState() {
  console.log("save fn running ")

  const checkbox1State = document.getElementById('online').checked;
  const checkbox2State = document.getElementById('larger').checked;
  const checkbox3State = document.getElementById('profile').checked;

  localStorage.setItem('checkbox1State',checkbox1State );
  localStorage.setItem('checkbox2State',checkbox2State );
  localStorage.setItem('checkbox3State',checkbox3State );
}
//  event listener to the form element containing checkboxes for saving data
document.getElementById('checkboxForm').addEventListener('click', (event) => {
  console.log("Checkbox state changed");
  event.preventDefault(); 
  saveCheckboxState();
});


// Load form input data from local storage
function loadFormData() {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    formInputs.forEach(input => {
      if (input.type !== 'file' && formData[input.id] !== undefined) {
        input.value = formData[input.id]; 
      }
    });
  }
}

// Load checkbox state from local storage
function loadCheckboxState() {
  console.log("yes working ")
  const checkbox1State = localStorage.getItem('checkbox1State');
  const checkbox2State = localStorage.getItem('checkbox2State');
  const checkbox3State = localStorage.getItem('checkbox3State');

  if (checkbox1State !== null) {

    document.getElementById('online').checked = JSON.parse(checkbox1State);
  }

  if (checkbox2State !== null) {
    document.getElementById('larger').checked = JSON.parse(checkbox2State);
  }
  if (checkbox3State !== null) {
    document.getElementById('profile').checked = JSON.parse(checkbox3State);
  }

}
function displayFormData() {
  const formData = JSON.parse(localStorage.getItem('formData'));
  if (formData) {
    console.log("jjjjj")
    document.getElementById('displayName').innerHTML = formData['name'];
    document.getElementById('displayEmail').innerText = formData['email'];
    document.getElementById('displayPhone').innerText = formData['phone'];
  }
}

//  load function when the page loads
window.addEventListener('load', () => {
  loadFormData();
  loadCheckboxState();
  displayFormData();
});

// added event listeners to inputs for saving data
formInputs.forEach(input => {
  input.addEventListener('input', saveFormData);
});



