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
            const blockEndKeywordsRegex = /^(else|elif|finally)\b/;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const nextLine = lines[i + 1];
            
            // Skip empty lines or lines containing only whitespace
            if (!line.trim()){
                continue;
            }
        
        const indentation = line.search(/\S/); 
        const expectedIndentationSpaces = expectedIndentation * 4; 
        if (indentation !== expectedIndentationSpaces) {
            console.error(`Error: Incorrect indentation at line ${i + 1}`);
            // Fix indentation
            lines[i] = ' '.repeat(expectedIndentationSpaces) + line.trimStart(); 
            errorFound = true;
        }
        
        // Update expected indentation level based on the line
        if (blockStartKeywordsRegex.test(line)) {
            expectedIndentation = expectedIndentation + 4;
            inBlock = true; 
        } 
        else if (inBlock && nextLine.trim() == '') {
            expectedIndentation=0;
            inBlock = false; 
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
