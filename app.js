
// Main application JavaScript

// Icon SVGs
const iconSVGs = {
  heart: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
  briefcase: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2zm-8 0H8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2z"></path></svg>',
  image: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg>',
  calculator: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>',
  target: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
  scissors: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>',
  palette: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"></path><path d="m2 9 3-3 3 3"></path><path d="m13 18 3-3 3 3"></path></svg>'
};

// Module data
const modules = [
  {
    id: 'health',
    name: 'Health Tools',
    description: 'BMI, calorie tracking, diet analysis & health calculators',
    icon: 'heart',
    color: 'from-red-500 to-pink-500',
    available: true
  },
  {
    id: 'business',
    name: 'Business Tools',
    description: 'Invoice generation, profit calculators & business utilities',
    icon: 'briefcase',
    color: 'from-blue-500 to-indigo-500',
    available: true
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, convert & manipulate images',
    icon: 'image',
    color: 'from-purple-500 to-violet-500',
    available: true
  }
];

// Tools data for each category
const toolsData = {
  health: [
    { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index', icon: 'calculator' },
    { id: 'calorie-tracker', name: 'Calorie Tracker', description: 'Track your daily calorie intake', icon: 'target' }
  ],
  business: [
    { id: 'break-even', name: 'Break-even Calculator', description: 'Calculate break-even point', icon: 'calculator' }
  ],
  image: [
    { id: 'background-remover', name: 'Background Remover', description: 'Remove backgrounds from images', icon: 'scissors' },
    { id: 'color-extractor', name: 'Image Color Extractor', description: 'Extract colors from images', icon: 'palette' }
  ]
};

const categoryNames = {
  health: 'Health Tools',
  business: 'Business Tools',
  image: 'Image Tools'
};

// Current state
let currentView = 'home';
let currentCategory = null;
let currentTool = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  renderHomePage();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Navigation
  document.addEventListener('click', function(e) {
    if (e.target.closest('#back-to-home')) {
      e.preventDefault();
      showHomePage();
    }
    
    if (e.target.closest('#back-to-category')) {
      e.preventDefault();
      showCategoryPage(currentCategory);
    }
  });
}

// Handle search
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    const name = card.querySelector('.category-name').textContent.toLowerCase();
    const description = card.querySelector('.category-description').textContent.toLowerCase();
    
    if (name.includes(query) || description.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Render home page
function renderHomePage() {
  console.log('Rendering home page...');
  const grid = document.getElementById('categories-grid');
  if (!grid) {
    console.error('Categories grid not found!');
    return;
  }
  
  grid.innerHTML = '';
  
  modules.forEach((module, index) => {
    console.log(`Creating card for module: ${module.name}`);
    const card = document.createElement('div');
    card.className = 'category-card group relative animate-fade-in';
    card.style.animationDelay = `${index * 100}ms`;
    
    card.innerHTML = `
      <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden cursor-pointer">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          ${iconSVGs[module.icon] || iconSVGs.calculator}
        </div>
        
        <h3 class="category-name text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          ${module.name}
        </h3>
        
        <p class="category-description text-gray-600 text-sm leading-relaxed">
          ${module.description}
        </p>
        
        <div class="mt-4 flex items-center text-blue-600 text-sm font-medium">
          <span class="group-hover:translate-x-1 transition-transform duration-300">
            Explore Tools
          </span>
          <div class="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            →
          </div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => showCategoryPage(module.id));
    grid.appendChild(card);
  });
  
  console.log(`Added ${modules.length} module cards to the grid`);
}

// Show home page
function showHomePage() {
  currentView = 'home';
  currentCategory = null;
  currentTool = null;
  
  document.getElementById('main-content').style.display = 'block';
  document.getElementById('category-page-template').style.display = 'none';
  document.getElementById('tool-page-template').style.display = 'none';
  
  renderHomePage();
}

// Show category page
function showCategoryPage(categoryId) {
  console.log(`Showing category page for: ${categoryId}`);
  currentView = 'category';
  currentCategory = categoryId;
  currentTool = null;
  
  const tools = toolsData[categoryId] || [];
  const categoryName = categoryNames[categoryId] || 'Tools';
  
  document.getElementById('main-content').style.display = 'none';
  document.getElementById('category-page-template').style.display = 'block';
  document.getElementById('tool-page-template').style.display = 'none';
  
  // Update category page content
  document.getElementById('category-title').textContent = categoryName;
  document.getElementById('category-description').textContent = getCategoryDescription(categoryId);
  
  const toolsGrid = document.getElementById('tools-grid');
  toolsGrid.innerHTML = '';
  
  tools.forEach((tool, index) => {
    const toolCard = document.createElement('div');
    toolCard.className = 'group relative animate-fade-in cursor-pointer';
    toolCard.style.animationDelay = `${index * 100}ms`;
    
    const colorClass = getCategoryColor(categoryId);
    
    toolCard.innerHTML = `
      <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          ${iconSVGs[tool.icon] || iconSVGs.calculator}
        </div>
        
        <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          ${tool.name}
        </h3>
        
        <p class="text-gray-600 text-sm leading-relaxed mb-4">
          ${tool.description}
        </p>
        
        <div class="flex items-center text-blue-600 text-sm font-medium">
          <span class="group-hover:translate-x-1 transition-transform duration-300">
            Open Tool
          </span>
          <div class="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            →
          </div>
        </div>
      </div>
    `;
    
    toolCard.addEventListener('click', () => showToolPage(categoryId, tool.id));
    toolsGrid.appendChild(toolCard);
  });
}

// Show tool page
function showToolPage(categoryId, toolId) {
  console.log(`Showing tool page for: ${categoryId}/${toolId}`);
  currentView = 'tool';
  currentTool = toolId;
  
  document.getElementById('main-content').style.display = 'none';
  document.getElementById('category-page-template').style.display = 'none';
  document.getElementById('tool-page-template').style.display = 'block';
  
  const toolContent = document.getElementById('tool-content');
  
  // Load tool-specific content
  switch(toolId) {
    case 'bmi-calculator':
      toolContent.innerHTML = createBMICalculator();
      break;
    case 'calorie-tracker':
      toolContent.innerHTML = createCalorieTracker();
      break;
    case 'background-remover':
      toolContent.innerHTML = createBackgroundRemover();
      break;
    case 'color-extractor':
      toolContent.innerHTML = createColorExtractor();
      break;
    default:
      toolContent.innerHTML = '<div class="text-center py-8"><h2 class="text-2xl font-bold mb-4">Tool Coming Soon</h2><p class="text-gray-600">This tool is currently under development.</p></div>';
  }
}

// Helper functions
function getCategoryDescription(categoryId) {
  const descriptions = {
    health: 'Professional tools to maintain your health and wellness',
    business: 'Professional tools to manage your business efficiently',
    image: 'Powerful image editing and processing tools'
  };
  return descriptions[categoryId] || 'Powerful tools coming soon';
}

function getCategoryColor(categoryId) {
  const colors = {
    health: 'from-red-500 to-pink-500',
    business: 'from-blue-500 to-indigo-500',
    image: 'from-purple-500 to-pink-500'
  };
  return colors[categoryId] || 'from-gray-400 to-gray-500';
}

// Tool creators
function createBMICalculator() {
  return `
    <div class="tool-container">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          ${iconSVGs.calculator}
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
        <p class="text-gray-600">Calculate your Body Mass Index and understand your weight status</p>
      </div>

      <div class="card mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input type="number" id="height" placeholder="e.g., 175" class="input">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input type="number" id="weight" placeholder="e.g., 70" class="input">
          </div>
        </div>

        <button onclick="calculateBMI()" class="btn btn-primary w-full">
          Calculate BMI
        </button>
      </div>

      <div id="bmi-result" class="hidden result-card">
        <h3 class="text-xl font-semibold mb-4 text-center">Your Results</h3>
        <div class="text-center">
          <div id="bmi-value" class="text-4xl font-bold text-gray-900 mb-2"></div>
          <div id="bmi-category" class="text-lg font-semibold mb-4"></div>
          
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-semibold mb-2">BMI Categories:</h4>
            <div class="text-sm space-y-1">
              <div class="flex justify-between">
                <span>Underweight:</span>
                <span class="text-blue-600">Below 18.5</span>
              </div>
              <div class="flex justify-between">
                <span>Normal weight:</span>
                <span class="text-green-600">18.5 - 24.9</span>
              </div>
              <div class="flex justify-between">
                <span>Overweight:</span>
                <span class="text-orange-600">25 - 29.9</span>
              </div>
              <div class="flex justify-between">
                <span>Obese:</span>
                <span class="text-red-600">30 and above</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createCalorieTracker() {
  return `
    <div class="tool-container">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-4">
          ${iconSVGs.target}
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Calorie Tracker</h1>
        <p class="text-gray-600">Track your daily calorie intake and stay on target</p>
      </div>

      <div class="card mb-6">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Daily Calorie Target</label>
          <input type="number" id="calorie-target" value="2000" class="input">
        </div>

        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span><span id="consumed-calories">0</span> / <span id="target-calories">2000</span> calories</span>
          </div>
          <div class="progress">
            <div id="calorie-progress" class="progress-bar" style="width: 0%"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="stat-card bg-green-50">
            <div id="total-consumed" class="stat-value text-green-600">0</div>
            <div class="stat-label">Consumed</div>
          </div>
          <div class="stat-card bg-blue-50">
            <div id="remaining-calories" class="stat-value text-blue-600">2000</div>
            <div class="stat-label">Remaining</div>
          </div>
          <div class="stat-card bg-purple-50">
            <div id="food-items-count" class="stat-value text-purple-600">0</div>
            <div class="stat-label">Items</div>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4">Add Food Item</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" id="food-name" placeholder="Food name" class="input">
          <input type="number" id="food-calories" placeholder="Calories" class="input">
          <button onclick="addFood()" class="btn btn-primary">
            Add Food
          </button>
        </div>
      </div>

      <div id="foods-list" class="card hidden">
        <h3 class="text-lg font-semibold mb-4">Today's Foods</h3>
        <div id="foods-container" class="space-y-3">
          <!-- Foods will be added here -->
        </div>
      </div>
    </div>
  `;
}

function createBackgroundRemover() {
  return `
    <div class="tool-container-wide">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
          ${iconSVGs.scissors}
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Background Remover</h1>
        <p class="text-gray-600">Remove backgrounds from your images with AI technology</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Upload Image</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
              <input type="file" id="bg-image-input" accept="image/*" class="input">
            </div>

            <div id="original-image-container" class="hidden space-y-4">
              <div>
                <h4 class="font-medium mb-2">Original Image</h4>
                <img id="original-image" class="max-w-full h-auto border border-gray-200 rounded" style="max-height: 300px;">
              </div>

              <div class="flex space-x-2">
                <button onclick="removeBackground()" id="process-btn" class="btn btn-primary flex-1">
                  Remove Background
                </button>
                <button onclick="resetBackgroundRemover()" class="btn btn-outline">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Result</h3>
          
          <div class="space-y-4">
            <div id="processing-indicator" class="hidden text-center py-8">
              <div class="spinner mb-4"></div>
              <p class="text-gray-600">Removing background...</p>
            </div>

            <div id="processed-image-container" class="hidden">
              <h4 class="font-medium mb-2">Background Removed</h4>
              <img id="processed-image" class="max-w-full h-auto border border-gray-200 rounded" style="max-height: 300px;">
              <button onclick="downloadProcessedImage()" class="btn btn-primary w-full mt-4">
                Download Image
              </button>
            </div>

            <div id="upload-prompt" class="text-center py-8 text-gray-500">
              Upload an image to get started
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createColorExtractor() {
  return `
    <div class="tool-container-wide">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
          ${iconSVGs.palette}
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Color Extractor</h1>
        <p class="text-gray-600">Extract dominant colors from your images</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Upload Image</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
              <input type="file" id="color-image-input" accept="image/*" class="input">
            </div>

            <div id="color-original-container" class="hidden space-y-4">
              <div>
                <h4 class="font-medium mb-2">Image Preview</h4>
                <img id="color-original-image" class="max-w-full h-auto border border-gray-200 rounded" style="max-height: 300px;">
              </div>

              <div class="flex space-x-2">
                <button onclick="extractColors()" id="extract-btn" class="btn btn-primary flex-1">
                  Extract Colors
                </button>
                <button onclick="resetColorExtractor()" class="btn btn-outline">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Extracted Colors</h3>
          
          <div class="space-y-4">
            <div id="color-processing" class="hidden text-center py-8">
              <div class="spinner mb-4"></div>
              <p class="text-gray-600">Extracting colors...</p>
            </div>

            <div id="colors-container" class="hidden space-y-3">
              <!-- Colors will be displayed here -->
            </div>

            <div id="color-upload-prompt" class="text-center py-8 text-gray-500">
              Upload an image to extract colors
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Tool functionality

// BMI Calculator
function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
  const weight = parseFloat(document.getElementById('weight').value);
  
  if (!height || !weight || height <= 0 || weight <= 0) {
    alert('Please enter valid height and weight values.');
    return;
  }
  
  const bmi = weight / (height * height);
  let category = '';
  let color = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-blue-600';
  } else if (bmi < 25) {
    category = 'Normal weight';
    color = 'text-green-600';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = 'text-orange-600';
  } else {
    category = 'Obese';
    color = 'text-red-600';
  }
  
  document.getElementById('bmi-value').textContent = bmi.toFixed(1);
  document.getElementById('bmi-category').textContent = category;
  document.getElementById('bmi-category').className = `text-lg font-semibold ${color} mb-4`;
  document.getElementById('bmi-result').classList.remove('hidden');
}

// Calorie Tracker
let foods = [];
let targetCalories = 2000;

function addFood() {
  const name = document.getElementById('food-name').value.trim();
  const calories = parseInt(document.getElementById('food-calories').value);
  
  if (!name || !calories || calories <= 0) {
    alert('Please enter valid food name and calories.');
    return;
  }
  
  foods.push({ name, calories });
  
  // Clear inputs
  document.getElementById('food-name').value = '';
  document.getElementById('food-calories').value = '';
  
  updateCalorieDisplay();
  renderFoodsList();
}

function removeFood(index) {
  foods.splice(index, 1);
  updateCalorieDisplay();
  renderFoodsList();
}

function updateCalorieDisplay() {
  const target = parseInt(document.getElementById('calorie-target').value) || 2000;
  targetCalories = target;
  
  const totalConsumed = foods.reduce((sum, food) => sum + food.calories, 0);
  const remaining = target - totalConsumed;
  const progressPercentage = Math.min((totalConsumed / target) * 100, 100);
  
  document.getElementById('consumed-calories').textContent = totalConsumed;
  document.getElementById('target-calories').textContent = target;
  document.getElementById('total-consumed').textContent = totalConsumed;
  document.getElementById('remaining-calories').textContent = remaining;
  document.getElementById('food-items-count').textContent = foods.length;
  document.getElementById('calorie-progress').style.width = `${progressPercentage}%`;
}

function renderFoodsList() {
  const container = document.getElementById('foods-container');
  const listElement = document.getElementById('foods-list');
  
  if (foods.length === 0) {
    listElement.classList.add('hidden');
    return;
  }
  
  listElement.classList.remove('hidden');
  container.innerHTML = '';
  
  foods.forEach((food, index) => {
    const foodElement = document.createElement('div');
    foodElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
    foodElement.innerHTML = `
      <div>
        <div class="font-medium">${food.name}</div>
        <div class="text-sm text-gray-600">${food.calories} calories</div>
      </div>
      <button onclick="removeFood(${index})" class="btn btn-outline btn-sm">
        Remove
      </button>
    `;
    container.appendChild(foodElement);
  });
}

// Background Remover
let originalImageSrc = '';

document.addEventListener('change', function(e) {
  if (e.target.id === 'bg-image-input') {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        originalImageSrc = e.target.result;
        document.getElementById('original-image').src = originalImageSrc;
        document.getElementById('original-image-container').classList.remove('hidden');
        document.getElementById('processed-image-container').classList.add('hidden');
        document.getElementById('upload-prompt').style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }
  
  if (e.target.id === 'color-image-input') {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('color-original-image').src = e.target.result;
        document.getElementById('color-original-container').classList.remove('hidden');
        document.getElementById('colors-container').classList.add('hidden');
        document.getElementById('color-upload-prompt').style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }
});

function removeBackground() {
  if (!originalImageSrc) return;
  
  document.getElementById('processing-indicator').classList.remove('hidden');
  document.getElementById('process-btn').disabled = true;
  document.getElementById('process-btn').textContent = 'Processing...';
  
  // Simulate processing
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Create checkerboard pattern to simulate transparency
      const checkSize = 20;
      for (let x = 0; x < canvas.width; x += checkSize) {
        for (let y = 0; y < canvas.height; y += checkSize) {
          const isEven = (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0;
          ctx.fillStyle = isEven ? '#f0f0f0' : '#e0e0e0';
          ctx.fillRect(x, y, checkSize, checkSize);
        }
      }
      
      // Draw the original image with some transparency
      ctx.globalAlpha = 0.8;
      ctx.drawImage(img, 0, 0);
      
      document.getElementById('processed-image').src = canvas.toDataURL('image/png');
      document.getElementById('processing-indicator').classList.add('hidden');
      document.getElementById('processed-image-container').classList.remove('hidden');
      document.getElementById('process-btn').disabled = false;
      document.getElementById('process-btn').textContent = 'Remove Background';
    };
    img.src = originalImageSrc;
  }, 2000);
}

function downloadProcessedImage() {
  const img = document.getElementById('processed-image');
  const link = document.createElement('a');
  link.download = 'background-removed.png';
  link.href = img.src;
  link.click();
}

function resetBackgroundRemover() {
  originalImageSrc = '';
  document.getElementById('bg-image-input').value = '';
  document.getElementById('original-image-container').classList.add('hidden');
  document.getElementById('processed-image-container').classList.add('hidden');
  document.getElementById('processing-indicator').classList.add('hidden');
  document.getElementById('upload-prompt').style.display = 'block';
}

// Color Extractor
function extractColors() {
  const img = document.getElementById('color-original-image');
  if (!img.src) return;
  
  document.getElementById('color-processing').classList.remove('hidden');
  document.getElementById('extract-btn').disabled = true;
  document.getElementById('extract-btn').textContent = 'Extracting...';
  
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Resize image for faster processing
    const maxSize = 100;
    const ratio = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight);
    canvas.width = img.naturalWidth * ratio;
    canvas.height = img.naturalHeight * ratio;
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const colorMap = new Map();
    
    // Sample every 4th pixel for performance
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      if (a > 128) { // Only count non-transparent pixels
        const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
    }
    
    // Convert to array and sort by frequency
    const sortedColors = Array.from(colorMap.entries())
      .map(([hex, count]) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return {
          hex,
          rgb: `rgb(${r}, ${g}, ${b})`,
          count
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 colors
    
    renderColors(sortedColors);
    
    document.getElementById('color-processing').classList.add('hidden');
    document.getElementById('colors-container').classList.remove('hidden');
    document.getElementById('extract-btn').disabled = false;
    document.getElementById('extract-btn').textContent = 'Extract Colors';
  }, 1000);
}

function renderColors(colors) {
  const container = document.getElementById('colors-container');
  container.innerHTML = '';
  
  colors.forEach((color, index) => {
    const colorElement = document.createElement('div');
    colorElement.className = 'flex items-center space-x-3 p-3 border border-gray-200 rounded-lg';
    colorElement.innerHTML = `
      <div 
        class="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
        style="background-color: ${color.hex}"
        onclick="copyColor('${color.hex}')"
      ></div>
      <div class="flex-1">
        <div class="font-medium">${color.hex}</div>
        <div class="text-sm text-gray-600">${color.rgb}</div>
      </div>
      <button onclick="copyColor('${color.hex}')" class="btn btn-outline btn-sm">
        Copy
      </button>
    `;
    container.appendChild(colorElement);
  });
}

function copyColor(color) {
  navigator.clipboard.writeText(color).then(() => {
    alert(`Copied ${color} to clipboard!`);
  });
}

function resetColorExtractor() {
  document.getElementById('color-image-input').value = '';
  document.getElementById('color-original-container').classList.add('hidden');
  document.getElementById('colors-container').classList.add('hidden');
  document.getElementById('color-processing').classList.add('hidden');
  document.getElementById('color-upload-prompt').style.display = 'block';
}

// Initialize calorie tracker when loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up calorie target change listener
  document.addEventListener('input', function(e) {
    if (e.target.id === 'calorie-target') {
      updateCalorieDisplay();
    }
  });
});

console.log('App.js loaded successfully');
