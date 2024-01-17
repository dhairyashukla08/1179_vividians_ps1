const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory array to store feedback data
const feedbackData = [];

app.use(bodyParser.json());
app.use(express.static('public')); // Assuming your HTML, CSS, and JS files are in a 'public' folder

app.post('/submit-feedback', (req, res) => {
  const { state, district, incidentType, feedbackText } = req.body;

  // Validation (you might want to add more validation)
  if (!state || !district || !incidentType || !feedbackText) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Store feedback data
  const feedback = {
    state,
    district,
    incidentType,
    feedbackText,
    timestamp: new Date().toISOString(),
  };

  feedbackData.push(feedback);

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
