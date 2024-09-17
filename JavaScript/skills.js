// Sample initial data
const skillsData = [
    {
        category: 'Programming Languages',
        skills: [
            { name: 'C++', level: 85 },
            { name: 'JavaScript', level: 80 },
            { name: 'HTML', level: 90 },
            { name: 'CSS', level: 85 },
            { name: 'SQL', level: 85 }
        ]
    },
  {
      category: 'JavaScript Libraries',
      skills: [
          { name: 'React.Js', level: 85 },
          { name: 'Node.Js', level: 80 }
      ]
  },
{
    category: 'Development Tools',
    skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'Git', level: 85 },
        { name: 'Github', level: 90 },
        { name: 'Canvas', level: 90 },
        { name: 'Vite', level: 60 },
    ]
},
  {
      category: 'Language',
      skills: [
          { name: 'Hindi', level: 90 },
          { name: 'English', level: 85 },
      ]
  }
];

function renderSkills() {
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = ''; 

  skillsData.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';

      const categoryHeading = document.createElement('h2');
      categoryHeading.textContent = category.category;
      categoryDiv.appendChild(categoryHeading);

      const skillsList = document.createElement('div');
      skillsList.className = 'skill-list';
      
      category.skills.forEach(skill => {
          const skillInfo = document.createElement('div');
          skillInfo.className = 'skill-info';

          const skillItem = document.createElement('p');
          skillItem.textContent = skill.name;

          const skillPercentage = document.createElement('p');
          skillPercentage.textContent = skill.level + "%";

          skillInfo.appendChild(skillItem);
          skillInfo.appendChild(skillPercentage);

          const progressBar = document.createElement('div');
          progressBar.className = 'progress-bar';

          const progressFill = document.createElement('div');
          progressFill.className = 'progress-fill';
          progressFill.style.width = `${skill.level}%`;
          progressBar.appendChild(progressFill);

          skillsList.appendChild(skillInfo);
          skillsList.appendChild(progressBar);
      });

      categoryDiv.appendChild(skillsList);
      skillsContainer.appendChild(categoryDiv);
  });
}

renderSkills();

document.getElementById('addSkillBtn').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'flex';
});

// Cancel Button Event
document.getElementById('cancel').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});

// Form Submission Event
document.getElementById('skillForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting the traditional way

  const domain = document.getElementById('domain-input').value.trim();
  const newSkills = [];
  var skillAccuracyCheck = false;
  for (let i = 1; i <= 5; i++) {
      const skillName = document.getElementById(`skill${i}`).value.trim();
      const skillLevel = document.getElementById(`accuracy${i}`).value.trim();

      if (skillName && skillLevel) {
          newSkills.push({ name: skillName, level: parseInt(skillLevel) });
      }
      else if((skillName && !skillLevel) || (!skillName && skillLevel)){
       skillAccuracyCheck = true;
      }
  }
  if(skillAccuracyCheck){
    alert("Either Skill Name or Skill Percentage Missing");
  }
  else{
    if (domain && newSkills.length > 0) {
      const existingCategory = skillsData.find(category => category.category.toLowerCase() === domain.toLowerCase());
      if (existingCategory) {
          existingCategory.skills = existingCategory.skills.concat(newSkills);
      } else {
          // Add new category with skills
          skillsData.push({ category: domain, skills: newSkills });
      }

      renderSkills();
      document.getElementById('popup').style.display = 'none'; // Close popup
      document.getElementById('skillForm').reset(); // Reset the form
  } else {
      alert('Please fill in all required fields');
  }

  }


});

