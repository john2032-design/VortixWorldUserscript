export default function handler(req, res) {
    const accessCode = req.headers['x-access-code'];
    
    if (accessCode !== process.env.ACCESS_CODE) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    
    const scripts = getScripts();
    res.status(200).json(scripts);
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
