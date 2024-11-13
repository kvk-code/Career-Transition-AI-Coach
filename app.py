from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)
openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/analyze_resume', methods=['POST'])
def analyze_resume():
    data = request.json
    resume_text = data.get('resume')
    
    prompt = f"Extract professional skills from this resume: {resume_text}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=200
    )
    skills = response.choices[0].text.strip().split('\n')
    return jsonify({'skills': skills})

@app.route('/skills_mapping', methods=['POST'])
def skills_mapping():
    data = request.json
    current_role = data.get('current_role')
    target_role = data.get('target_role')
    current_skills = data.get('current_skills')
    target_skills = data.get('target_skills')
    
    prompt = f"""Analyze these skills for a transition from {current_role} to {target_role}:
    Current skills: {current_skills}
    Target skills needed: {target_skills}
    Provide three categories:
    1. Matching skills
    2. Skills to acquire
    3. Transferable skills"""
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=300
    )
    return jsonify({'analysis': response.choices[0].text.strip()})

@app.route('/resume_suggestions', methods=['POST'])
def resume_suggestions():
    data = request.json
    resume_text = data.get('resume')
    target_role = data.get('target_role')
    
    prompt = f"""Review this resume for a {target_role} position and provide suggestions:
    Resume: {resume_text}
    Provide specific improvements for:
    1. Content relevance
    2. Keywords optimization
    3. Format and structure"""
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=300
    )
    return jsonify({'suggestions': response.choices[0].text.strip()})

if __name__ == '__main__':
    app.run(debug=True)