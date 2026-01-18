export default function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const accessCode = req.headers['x-access-code'];
    
    if (accessCode !== process.env.ACCESS_CODE) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    
    const { id } = req.query;
    
    let scripts = getScripts();
    scripts = scripts.filter(s => s.id !== parseInt(id));
    saveScripts(scripts);
    
    res.status(200).json({ success: true });
}

function getScripts() {
    try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join('/tmp', 'userscripts.json');
        
        if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading scripts:', error);
    }
    return [];
}

function saveScripts(scripts) {
    try {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join('/tmp', 'userscripts.json');
        fs.writeFileSync(dataPath, JSON.stringify(scripts, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving scripts:', error);
    }
}
