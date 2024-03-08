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


function checkPythonIndentation() {
    const filePath = 'test.py'; // File path to test.py

    // Read the Python file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Python file:', err);
            return;
        }

        // Split file contents into lines
        const lines = data.split('\n');

        // Track the expected indentation level
        let expectedIndentation = 0;
        let errorFound = false;
        let inBlock = false;

        // Regex for Start and End of Blocks
        const blockStartKWRegex = /^(def|for|while|if|elif|else)\b/;
        const blockEndKWRegex = /^(else|elif|finally)\b/;

        const line = lines[i];
        const nextLine = lines[i + 1];
        
        const indentation = line.search(/\S/); // Find the index of the first non-whitespace character
        const expectedIndentationSpaces = expectedIndentation * 4; 

        if (indentation !== expectedIndentationSpaces) {
            console.error(`Error: Incorrect indentation at line ${i + 1}`);
            // Fix indentation
            lines[i] = ' '.repeat(expectedIndentationSpaces) + line.trimStart(); // Adjust the indentation
            errorFound = true;
        }
    
        // Update expected indentation level based on the line
        if (blockStartKeywordsRegex.test(line)) {
            expectedIndentation++;
            inBlock = true; // We're starting a new block
        } 
        else if (inBlock && blockEndKeywordsRegex.test(line) && nextLine.trim() == '') {
            expectedIndentation=0;
            inBlock = false; // We're no longer within a block
        }
}

        if (!errorFound) {
            console.log('Indentation check passed. No errors found.');
        }
    });
}


// Example usage:
checkPythonIndentation();


// Function to check if all Python function headers are syntactically correct
function checkPythonFunctionHeaders(fileName) {
    return new Promise((resolve, reject) => {
        // Read the Python file
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file: ' + err);
                return;
            }

            // Regular expression to match Python function headers
            const functionHeaderRegex = /^def\s+\w+\(.*\):$/gm;

            // Extract function headers from the Python file
            const functionHeaders = data.match(functionHeaderRegex);

            // Check if all function headers are syntactically correct
            if (functionHeaders && functionHeaders.length > 0) {
                resolve('All function headers are syntactically correct.');
            } else {
                reject('No function headers found or there are syntactical errors.');
            }
        });
    });
}

// Example usage:
checkPythonFunctionHeaders('test.py')
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });
