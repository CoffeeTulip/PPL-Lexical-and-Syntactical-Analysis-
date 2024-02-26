const fs = require('fs');

// Read Python file
fs.readFile('test.py', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading Python file:', err);
        return;
    }

    // Print Python file contents
    console.log('Python file contents:');
    console.log(data);

    // Write Python file contents to a text file
    fs.writeFile('output.txt', data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to text file:', err);
            return;
        }
        console.log('Python file contents successfully written to output.txt');
    });

    // Read Python file for "print" statements
    let regex = /print\(.*\)/g;
    console.log('Number of Python "print" statements:', (data.match(regex) || []).length);
});