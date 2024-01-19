// Your JavaScript code goes here
function submitFeedback() {
    const district = document.getElementById('district').value;
    const incidentType = document.getElementById('incidentType').value;
    const feedbackText = document.getElementById('feedback').value;
  
    const data = {
      district: district,
      incidentType: incidentType,
      feedbackText: feedbackText
    };
  
    fetch('/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        displayConfirmation();
      } else {
        alert('Error submitting feedback. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error submitting feedback. Please try again.');
    });
  }
  
  function displayConfirmation() {
    const feedbackForm = document.getElementById('feedbackForm');
    const confirmationDiv = document.getElementById('confirmation');
  
    feedbackForm.style.display = 'none';
    confirmationDiv.style.display = 'block';
  }
  