#This file generates a test file containing syntactically correct Python code that contain 
# function headers, print statements, and indentation.

#############################################
# PYTHON TEST FILE GENERATOR                #
# v.1.0                                     #
# Author: 	Fin Martinez                    #
# Contributors: Fin Martinez, Chat GPT3.5   #
# Date: 	2024-03-02                      #
#############################################

def main():
    good_test_generator()
    bad_test_generator()

def good_test_generator():
    try:
        with open("good_test.py", "w") as good_test:
            # Writes some test comments
            try:
                good_test.write("# Test comment\n")
                good_test.write("# please ignore this\n")
                good_test.write("# if you don't papa will be very sad\n")
                # Writes the main function header with a couple of print statements
                good_test.write("def main():\n")
                good_test.write("    print('Hello World')\n")
                for i in range(5):
                    good_test.write(f"    print('This is a test print: {i+1}')\n")
                good_test.write("\n")
                # Writes the function header for another function
                good_test.write("def another_function():\n")
                for i in range(5):
                    good_test.write(f"    print('This is another test print: {i+1}')\n")
                good_test.write("\n")
                # Writes a function header and function that generates Pascal's Triangle
                good_test.write("# Generate Pascal's Triangle\n")
                good_test.write("def pascals_triangle(rows):\n")
                good_test.write("    #Calculate coefficients for the current row\n")
                good_test.write("    for i in range(rows):\n")
                good_test.write("        row_values = [1]\n")
                good_test.write("        for j in range(1, i + 1):\n")
                good_test.write("            row_values.append(int(row_values[j - 1] * (i - j + 1) / j))\n")
                good_test.write("        #Print the current row\n")
                good_test.write(f"        print(' ' * (rows - i - 1) * 2, end = '')\n")
                good_test.write(f"        print(' '.join([str(x) for x in row_values]))\n")
                good_test.write("\n")
                good_test.write("# Print Pascal's Triangle\n")
                good_test.write(f"pascals_triangle({5})\n")
                good_test.write("if __name__ == \"__main__\":\n")
                good_test.write("    main()\n")
            except Exception as e:
                print("Error writing to file: ", e)
    except Exception as e:
        print("Error opening file: ", e)

def bad_test_generator():
    try:
        with open("bad_test.py", "w") as bad_test:
            # Writes some test comments
            try:
                bad_test.write("# Test comment\n")
                bad_test.write("# please ignore this\n")
                bad_test.write(" #will you catch this error?\n")
                # Writes the main function header with a couple of print statements
                bad_test.write(" def main():\n")
                bad_test.write("    print('Hello World')\n")
                for i in range(5):
                    bad_test.write(f"    print('This is a test print: {i+1}')\n")
                bad_test.write("\n")
                # Writes the function header for another function
                bad_test.write("    def another_function():\n")
                # Writes a function with bad syntax
                bad_test.write('')
                for i in range(5):
                    bad_test.write(f"    print('This is another test print: {i+1}')\n")
                bad_test.write(f" print('Will you catch this error?')\n")
                for i in range(3):
                    bad_test.write(f"{' ' * (4 ** (i+1))}print('This is another test print with bad indents: {i+1}')\n")          
                bad_test.write("\n")
                # Writes a function with bad syntax
                bad_test.write('defbad_function():\n')
                bad_test.write('  def another_bad_function():\n')
                bad_test.write('   defworse_function():\n')
                # Writes a function header and function that generates Pascal's Triangle
                # However, the indentation is incorrect
                bad_test.write("# Generate Pascal's Triangle\n")
                bad_test.write("def pascals_triangle(rows):\n")
                bad_test.write("    #Calculate coefficients for the current row\n")
                bad_test.write("for i in range(rows):\n")
                bad_test.write("    row_values = [1]\n")
                bad_test.write("    for j in range(1, i + 1):\n")
                bad_test.write("         row_values.append(int(row_values[j - 1] * (i - j + 1) / j))\n")
                bad_test.write("        #Print the current row\n")
                bad_test.write(f"        print(' ' * (rows - i - 1) * 2, end = '')\n")
                bad_test.write(f"        print(' '.join([str(x) for x in row_values]))\n")
                bad_test.write("\n")
                bad_test.write("# Print Pascal's Triangle\n")
                bad_test.write(f"pascals_triangle({5})\n")
                bad_test.write("if __name__ == \"__main__\":\n")
                bad_test.write("    main()\n")
            except Exception as e:
                print("Error writing to file: ", e)
    except Exception as e:
        print("Error opening file: ", e)
if __name__ == "__main__":
    main()