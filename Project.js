const fs = require('fs');
const readline = require('readline');


// File selection
function selectFile(callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the file name (or type "quit" to exit): ', (fileName) => {
        rl.close();
        // Check if the user wants to exit
        if (fileName.toLowerCase() === 'quit') {
            console.log('Exiting...');
            process.exit(0);
        }
        // Check if the file exists
        if (fs.existsSync(fileName)) {
            console.log(`File "${fileName}" selected.`);
            callback(fileName);
        } else {
            console.log(`File "${fileName}" not found. Please try again.`);
            selectFile(callback);
        }
    });
}
function startAnalysis() {
    selectFile(function(fileName) {
        console.log(`File to be analyzed: ${fileName}`);

        // Start all asynchronous operations
        const operations = [
            readAndPrintFile(fileName),
            countPrintStatements(fileName),
            resolveBadHeaderName(fileName),
            checkPythonFunctionHeaders(fileName)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
             console.error(error);
            }),
            checkAndFixPythonIndentation(fileName)
        ];

        // Wait for all operations to complete
        Promise.all(operations)
            .then(() => {
                console.log('Analysis complete.');
                // Return to File Selection
                process.nextTick(startAnalysis);
            })
            .catch((error) => {
                console.error('Error during analysis:', error);
            });
    });
}

startAnalysis();

// Read Python file
function readAndPrintFile(fileName){
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading Python file: ' + err);
                return;
            }

            // Print Python file contents
            console.log('Python file contents:');
            console.log(data);

            // Write Python file contents to a text file
            fs.writeFile('output.txt', data, 'utf8', (err) => {
               if (err) {
                    reject('Error writing to text file: ' + err);
                    return;
                }
                console.log('Python file contents successfully written to output.txt');
                resolve();
            });
        });
    });
}
    
// Read Python file for "print" statements
function countPrintStatements(fileName){
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading Python file: ' + err);
                return;
            }

            // Regular expression to match Python "print" statements
            let regex = /print\(.*\)/g;
            console.log('Number of Python "print" statements:', (data.match(regex) || []).length);
            resolve();
        });
    });
}

function checkAndFixPythonIndentation(fileName) {
    // Read the Python file
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading Python file: ' + err);
                return;
            }

            // Split file contents into lines
            const lines = data.split('\n');
            let expectedIndentation = 0;
            let errorFound = false;
            let inBlock = false; 
            
            // Regex for blocks 
            const blockStartKeywordsRegex = /^(def|for|while|if|elif|else|main())\b/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nextLine = lines[i + 1];
            
        // Skip empty lines or lines containing only whitespace
        if (!line.trim() || line.trim().startsWith('#')) {
            continue;
        }

        const indentation = line.search(/\S/); 
        const expectedIndentationSpaces = expectedIndentation * 4; 
        if (indentation !== expectedIndentationSpaces) {
            console.error(`Error: Incorrect indentation at line ${i + 1}`);
            // Fix indentation
            lines[i] = ' '.repeat(expectedIndentationSpaces) + line.trim(); 
            errorFound = true;
        }   
        // Update expected indentation level based on the line
        if (blockStartKeywordsRegex.test(line)) {
            expectedIndentation += 1;
        } 
        else if (!inBlock && nextLine && blockStartKeywordsRegex.test(nextLine)) {
            // If the next line starts a block and we're not currently in a block
            expectedIndentation += 1;
        } 
        else if (inBlock) {
            // Adjust the indentation level within blocks
            expectedIndentation = expectedIndentationSpaces / 4 + 1;
        }
        // Block decreases indentation level if next line is blank
        else if  (inBlock && nextLine && nextLine.trim() === ''){
            expectedIndentation -= 1;
        }
        }

            if (!errorFound) {
                console.log('Indentation check passed. No errors found.');
            } else {
                // Write the fixed content back to the file
                const fixedContent = lines.join('\n');
                fs.writeFile(fileName, fixedContent, 'utf8', (err) => {
                    if (err) {
                        reject('Error writing fixed content to file: ' + err);
                        return;
                    }
                    console.log('Indentation errors fixed. File updated successfully.');
                    resolve();
                });
            }
        });
    });
}

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

// fucntion that attempts to replace the incorrect spelled function declerations 
function resolveBadHeaderName(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file: ' + err);
                return;
            }
            
            // regex to check for misspelled function headers
            const functionRegex = /\b(d(e)f|d(f)e|e(d)f|e(f)d|f(e)d|f(d)e)\b/gi;

            let match;
            while((match = functionRegex.exec(data)) != null) {
                const incorrectFunctionName =match[0];
                const index = match.index;

                const correctedHeader = data.substring(0, index) + 'def' + data.substring(index + incorrectFunctionName.length);

                console.log(`Misspelled 'def' found at position ${index}: "${incorrectFunctionName}"`);
                console.log(`Corrected Line: ${correctedHeader}`);
            };
        });
    });
}
