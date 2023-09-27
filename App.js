
const mealApi ='https://content.newtonschool.co/v1/pr/64995a40e889f331d43f70ae/categories';
const recipeApi ='https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes';

const weight = document.querySelector(".weight");
const height = document.querySelector(".hight");
const Age = document.querySelector(".age");
const Gender = document.getElementById("gender");
const Activity =document.querySelector(".activity");
let bmr;
let finalBmr;
let breakfast;
let lunch;
let dinner;


function cagender(){
if(Gender.value ==='Male'){
   bmr = menBmr();
}else if(Gender.value ==='Female'){
   bmr= womenBmr();
}
if(bmr){
    activityBmr();
}

getMealAPIResponse();
document.querySelector(".meal-Container").style.display="block";
}
function womenBmr() {
    
    const weightValue = parseFloat(weight.value);
    const heightValue = parseFloat(height.value);
    const ageValue = parseFloat(Age.value);

    if (!isNaN(weightValue) && !isNaN(heightValue) && !isNaN(ageValue)) {
        return 655.1 + (9.563 * weightValue) + (1.850 * heightValue) - (4.676 * ageValue);
       
    } else {
        console.log("Invalid input. Please enter valid numbers.");
    }
    
}
function menBmr() {
    
    const weightValue = parseFloat(weight.value);
    const heightValue = parseFloat(height.value);
    const ageValue = parseFloat(Age.value);

    if (!isNaN(weightValue) && !isNaN(heightValue) && !isNaN(ageValue)) {
        return 66.47 + (13.75 * weightValue) + (5.003 * heightValue) - (6.755 *ageValue);
    } else {
        console.log("Invalid input. Please enter valid numbers.");
    }
}

function activityBmr() {
    if (activity.value === 'Light') {
        finalBmr = bmr * 1.375;
    } else if (activity.value === 'Moderate') {
        finalBmr = bmr * 1.55;
    } else if (activity.value === 'Active') {
        finalBmr = bmr * 1.725;
    }
    console.log(finalBmr);
}

function getMealAPIResponse() {
  fetch(mealApi)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
    mealData = data; 
    console.log("mealapi=" + mealData);

    mealData.forEach(item => {
      console.log(item); 
      var min = item['min'];
      var max = item['max'];
      console.log("min = " + min);
      console.log("max = " + max);
      if (finalBmr < max && finalBmr > min) {
        breakfast = item['breakfast'];
        lunch = item['lunch'];
        dinner = item['dinner'];
        console.log(lunch);
        console.log(dinner);
        console.log(breakfast);
        processBreakfast();
        processLunch();
        processDinner();
        return;
      }
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}
let lunchname;
let lunchphoto;
function processLunch() {
    lunchname = lunch.title;
    lunchphoto = lunch.image;
    document.querySelector('.lunchName').innerHTML = lunchname;
  document.querySelector('.lunchImg').src =lunchphoto;
  document.querySelector('.lhCalories').innerHTML = "Calories - " + finalBmr/3;

}
let breakfastname;
let breakfastphoto;
function processBreakfast() {
  breakfastname = breakfast.title;
  breakfastphoto = breakfast.image;
  document.querySelector('.breakFastName').innerHTML =breakfastname;
  document.querySelector('.breakFastfImg').src =breakfastphoto;
  document.querySelector('.bfCalories').innerHTML = "Calories - " + finalBmr/3;
}
let dinnerName;
let dinnerphoto;
function processDinner() {
  dinnerName = dinner.title;
  dinnerphoto = dinner.image;
  document.querySelector('.dinnerName').innerHTML =dinnerName;
  document.querySelector('.dinnerImg').src =dinnerphoto;
  document.querySelector('.dCalories').innerHTML = "Calories - " +finalBmr/3;
}


let lunchIngredient;
    let lunchStep;
    let breakfastIngredient;
    let breakfastStep;
    let dinnerIngredient;
    let dinnerStep;
    let recipeData = null;

async function getRecipe(){
await fetch(recipeApi)
.then(response2=> response2.json())
.then(data2=> {
  recipeData = data2;
});
}

function clearPrevData(){
  const recipeList =document.getElementById("recipeList");
  const recipeStep =document.getElementById("recipeStep");
  recipeList.innerHTML="";
  recipeStep.innerHTML="";

}

async function getBreakFastRecipe() {
  clearPrevData();
  if(recipeData == null) { await getRecipe();}
  recipeData.forEach(recipeItem => {
    console.log("breakfastname "+breakfastname);
    if (breakfastname == recipeItem.title){
      console.log("item name"+recipeItem.title);
      document.querySelector(".dishName").innerHTML="Name Of The Meal: "+ breakfastname;
      breakfastIngredient= recipeItem.ingredients;
      breakfastStep  = recipeItem.steps;

      const bfulList =document.getElementById("recipeList");
      const bflistItem = document.createElement("li");
      bflistItem.textContent = breakfastIngredient;
      bfulList.appendChild(bflistItem);

      const bfulStep =document.getElementById("recipeStep");
      const bflistStep = document.createElement("li");
      bflistStep.textContent = breakfastStep;
      bfulStep.appendChild(bflistStep);

      document.querySelector(".mid").style.display="block";
    }
  });
}

function getLunchRecipe() {
  clearPrevData();
  if(recipeData == null) { getRecipe();}
  
  recipeData.forEach(recipeItem => {
    
    if (lunchname == recipeItem.title){
      document.querySelector(".dishName").innerHTML="Name Of The Meal: "+ lunchname;
      lunchIngredient= recipeItem.ingredients;
      lunchStep  = recipeItem.steps;
      
      const lhulList =document.getElementById("recipeList");
      const lhlistItem = document.createElement("li");
      lhlistItem.textContent = lunchIngredient;
      lhulList.appendChild(lhlistItem);

      const lhulStep =document.getElementById("recipeStep");
      const lhlistStep = document.createElement("li");
      lhlistStep.textContent = lunchStep;
      lhulStep.appendChild(lhlistStep);
      document.querySelector(".mid").style.display="block";
      return;
      
      }
  });

}

async function getDinnerRecipe() {
  clearPrevData();
  if(recipeData == null) {await getRecipe();}
  
  recipeData.forEach(recipeItem => {
    console.log("lunchname "+dinnerName);
    if (dinnerName == recipeItem.title){
      document.querySelector(".dishName").innerHTML="Name Of The Meal: "+ dinnerName;
      dinnerIngredient= recipeItem.ingredients;
      dinnerStep  = recipeItem.steps;

      const diulList =document.getElementById("recipeList");
      const dilistItem = document.createElement("li");
      dilistItem.textContent = dinnerIngredient;
      diulList.appendChild(dilistItem);

      const diulStep =document.getElementById("recipeStep");
      const dilistStep = document.createElement("li");
      dilistStep.textContent = dinnerStep;
      diulStep.appendChild(dilistStep);
      document.querySelector(".mid").style.display="block";
      return;
      }
  });

}
//Code By Suyash
