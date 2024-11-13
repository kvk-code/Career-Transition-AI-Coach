function getSkillsMapping() {
    const userData = {
        current_role: document.getElementById('currentRole').value,
        target_industry: document.getElementById('targetIndustry').value,
        skills: document.getElementById('skills').value
    };
    fetch('/skills_mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        // ...existing code...
        document.getElementById('mappingResults').innerText = data.mapping;
    });
}

function analyzeResume() {
    const resumeText = document.getElementById('resumeText').value;
    
    fetch('/analyze_resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeText })
    })
    .then(response => response.json())
    .then(data => {
        const skillsDiv = document.getElementById('extractedSkills');
        skillsDiv.innerHTML = data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    });
}

function mapSkills() {
    const data = {
        current_role: document.getElementById('currentRole').value,
        target_role: document.getElementById('targetRole').value,
        current_skills: document.getElementById('extractedSkills').innerText,
        target_skills: document.getElementById('targetSkills').value
    };

    fetch('/skills_mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const analysis = data.analysis.split('\n');
        document.getElementById('matchingSkills').innerHTML += `<ul>${parseSkillsSection(analysis, 'Matching skills')}</ul>`;
        document.getElementById('skillsToAcquire').innerHTML += `<ul>${parseSkillsSection(analysis, 'Skills to acquire')}</ul>`;
        document.getElementById('transferableSkills').innerHTML += `<ul>${parseSkillsSection(analysis, 'Transferable skills')}</ul>`;
    });
}

function getResumeSuggestions() {
    const data = {
        resume: document.getElementById('resumeText').value,
        target_role: document.getElementById('targetRole').value
    };

    fetch('/resume_suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('suggestions').innerHTML = `<div class="suggestions">${data.suggestions.replace(/\n/g, '<br>')}</div>`;
    });
}

function parseSkillsSection(analysis, sectionName) {
    const section = analysis.find(line => line.includes(sectionName));
    if (!section) return '';
    const skills = section.split(':')[1].trim().split(',');
    return skills.map(skill => `<li>${skill.trim()}</li>`).join('');
}