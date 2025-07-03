const countries = [
  { 
   name: "China", 
   population: 1439323776, 
   region: "asia", 
   color:"red"},
  
  { 
   name: "India", 
   population: 1380004385, 
   region: "india", 
   color:"orange"
  },
  
  { 
   name: "Europe", 
   population: 752330720, 
   region: "europe", 
   color:"blueviolet"
  },
  
  { 
   name: "United States", 
   population: 331002651, 
   region: "america", 
   color:"blue"
  },
];

const countryFilter = $("#country-filter");
const barChartContainer = $("#bar-chart-container");
countryFilter.change(function() {
  const selectedRegion = $(this).val();
  updateBarChart(selectedRegion);
});

function updateBarChart(selectedRegion) {
  barChartContainer.html("");
  const filteredCountries = countries.filter(
    
    country => selectedRegion === "all" || country.region === selectedRegion);

  filteredCountries.forEach(country => {
    const barHeight = country.population / 3600000;
    const bar = $(`<div class="bar" 
    style="background:${country.color}; 
    box-shadow:0px 0px 16px ${country.color}; 
    height:${barHeight}px">
    <span>${country.name}</span>
    <br>
    <span class="population">${country.population}</span>
    </div>`);  
    
    barChartContainer.append(bar);
    
    animation =  anime({
      targets: bar[0],
      height: [0, barHeight],
      duration: 500,
      opacity:[0,1],
      easing: 'easeInOutBack',
      delay: function(el, i) {
        return i * 100; 
      },
    });
    
    var roundLogEl = document.querySelector('.population');
    var value_population = country.population;
    anime({
      targets: roundLogEl,
      innerHTML: [0, value_population],
      easing: 'linear',
      delay: function(el, i) { return i * 100; },
      round: 10,
    });
  });
}

$(document).ready(function() {
  updateBarChart(countryFilter.val());
});