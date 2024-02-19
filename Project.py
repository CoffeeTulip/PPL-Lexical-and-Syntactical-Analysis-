const fs = require('fs');

function checkIndentationFromFile(filePath) {
    const script = fs.readFileSync(filePath, 'utf8');
    return checkIndentation(script);
}

// Example usage
const filePath = 'example.py';
const result = checkIndentationFromFile(filePath);
console.log(result);
