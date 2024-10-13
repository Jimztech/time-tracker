// Load the JSON data
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Add event listeners for the daily, weekly, and monthly links
    const daily = document.getElementById('daily');
    const weekly = document.getElementById('weekly');
    const monthly = document.getElementById('monthly');

    // Function to update the UI based on timeframe selection
    function updateData(timeframe) {
      data.forEach(item => {
        // Find the corresponding section by title (lowercase and replace spaces with hyphens)
        const sectionId = item.title.toLowerCase().replace(' ', '-');
        const section = document.getElementById(sectionId);

        if (section) {
          // Update current and previous hours
          const currentHours = section.querySelector('.project-heading');
          const previousHours = section.querySelector('.previous');

          currentHours.textContent = `${item.timeframes[timeframe].current}hrs`;
          previousHours.textContent = `Last ${timeframe === 'daily' ? 'Day' : timeframe === 'weekly' ? 'Week' : 'Month'} - ${item.timeframes[timeframe].previous}hrs`;
        }
      });
    }

    // Event listeners for clicking daily, weekly, or monthly
    daily.addEventListener('click', () => updateData('daily'));
    weekly.addEventListener('click', () => updateData('weekly'));
    monthly.addEventListener('click', () => updateData('monthly'));
})
.catch(error => console.error('Error fetching data:', error));
