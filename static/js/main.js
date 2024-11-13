
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

function getResumeSuggestions() {
    const resumeData = {
        resume: document.getElementById('resumeText').value,