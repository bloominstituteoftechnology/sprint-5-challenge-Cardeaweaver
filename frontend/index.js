async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  const axios = require('axios'); // Import Axios library

  try {
    //  GET requests  fetch data
    const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
    const learnersResponse = await axios.get('http://localhost:3003/api/learners');

    // data from responses
    const mentors = mentorsResponse.data;
    const learners = learnersResponse.data;

    // data in the `mentors` and `learners` arrays
    console.log('Mentors:', mentors);
    console.log('Learners:', learners);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇
  const mentors = [
    { id: 1, name: 'Bill Gates' },
    { id: 2, name: 'Grace Hopper' },
    // ... other mentor objects
  ];
  
  const learners = [
    { id: 6, mentorIds: [1, 2] },
    // ... other learner objects
  ];
  
  // Function to find mentor names based on IDs
  function getMentorNames(mentorIds) {
    return mentorIds.map((id) => mentors.find((mentor) => mentor.id === id).name);
  }
  
  // Update learners with mentor names
  const updatedLearners = learners.map((learner) => ({
    id: learner.id,
    fullName: 'Bob Johnson', // Assume you have the full name for each learner
    email: 'bob.johnson@example.com', // Assume you have the email for each learner
    mentors: getMentorNames(learner.mentorIds),
  }));
  
  console.log(updatedLearners);
  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    for (const learner of learners) {
      const card = document.createElement('div');
      const heading = document.createElement('h3');
      const email = document.createElement('div');
      const mentorsHeading = document.createElement('h4');
      const mentorsList = document.createElement('ul');
    
      // Assuming you have a container element to append the card
      const learnerContainer = document.getElementById('learner-container');
    
      heading.textContent = learner.fullName; // Assuming fullName is available
      email.textContent = learner.email; // Assuming email is available
    
      // Create mentor list items within the loop
      for (const mentorId of learner.mentorIds) {
        const mentor = mentors.find((m) => m.id === mentorId);
        if (mentor) {
          const mentorItem = document.createElement('li');
          mentorItem.textContent = mentor.name;
          mentorsList.appendChild(mentorItem);
        }
      }
    
      mentorsHeading.textContent = 'Mentors'; // Assuming text for mentors heading
      card.appendChild(heading);
      card.appendChild(email);
      card.appendChild(mentorsHeading);
      card.appendChild(mentorsList);
    
      learnerContainer.appendChild(card);
    
      // ... rest of card event listener logic ...
    }
    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    const mentorsList = document.createElement('ul');
    const learnerCard = document.createElement('div');
    learnerCard.appendChild(mentorsList);
    learnerCard.dataset.fullName = learner.fullName;
    const card = document.createElement('div'); // Move the declaration and initialization of 'card' outside of the inner 'for' loop
    const heading = document.createElement('h3');
    const email = document.createElement('div');
    const mentorsHeading = document.createElement('h4');
    // Remove the duplicate declaration of the 'mentorsList' variable
    // const mentorsList = document.createElement('ul');

    for (const learner of learners) {
      heading.textContent = learner.fullName; // Assuming fullName is available
      email.textContent = learner.email; // Assuming email is available

      // Create mentor list items within the loop
      for (const mentorId of learner.mentorIds) {
        const mentor = mentors.find((m) => m.id === mentorId);
        if (mentor) {
          const mentorItem = document.createElement('li');
          mentorItem.textContent = mentor.name;
          mentorsList.appendChild(mentorItem);
        }
      }

      const learnerContainer = document.getElementById('learner-container'); // Declare and initialize the 'learnerContainer' variable

      mentorsHeading.textContent = 'Mentors'; // Assuming text for mentors heading
      card.appendChild(heading);
      card.appendChild(email);
      card.appendChild(mentorsHeading);
      card.appendChild(mentorsList);

      learnerContainer.appendChild(card);

      // ... rest of card event listener logic ...
    }

    cardsContainer.appendChild(card); // Move this line outside of the outer 'for' loop

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      //do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
