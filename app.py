from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feedback.db'
db = SQLAlchemy(app)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    district = db.Column(db.String(50), nullable=False)
    incident_type = db.Column(db.String(50), nullable=False)
    feedback_text = db.Column(db.Text, nullable=False)

# Move the create_all() call into a separate function
def create_tables():
    with app.app_context():
        db.create_all()

# Call the function to create tables
create_tables()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    try:
        data = request.get_json()

        district = data['district']
        incident_type = data['incidentType']
        feedback_text = data['feedbackText']

        new_feedback = Feedback(district=district, incident_type=incident_type, feedback_text=feedback_text)
        db.session.add(new_feedback)
        db.session.commit()

        return jsonify({'success': True}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
