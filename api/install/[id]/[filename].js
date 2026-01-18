export default function handler(req, res) {
    const { id, filename } = req.query;
    
    const scripts = getScripts();
    const script = scripts.find(s => s.id === parseInt(id));
    
    if (!script) {
        res.status(404).send('Script not found');
        return;
    }
    
    res.setHeader('Content-Type', 'application/x-userscript; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${script.filename}"`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(script.content);
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
