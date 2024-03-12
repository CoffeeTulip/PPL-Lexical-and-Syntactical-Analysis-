# Test comment
# please ignore this
#will you catch this error?
def main():
    print('Hello World')
    print('This is a test print: 1')
    print('This is a test print: 2')
    print('This is a test print: 3')
    print('This is a test print: 4')
    print('This is a test print: 5')
    
    fed testerFunction():
    print('another test for the ages!')

    def another_function():
    print('This is another test print: 1')
    print('This is another test print: 2')
    print('This is another test print: 3')
    print('This is another test print: 4')
    print('This is another test print: 5')
    print('Will you catch this error?')
    print('This is another test print with bad indents: 1')
    print('This is another test print with bad indents: 2')
    print('This is another test print with bad indents: 3')

    defbad_function():
    def another_bad_function():
    defworse_function():
    # Generate Pascal's Triangle
    def pascals_triangle(rows):
    #Calculate coefficients for the current row
    for i in range(rows):
    row_values = [1]
    for j in range(1, i + 1):
    row_values.append(int(row_values[j - 1] * (i - j + 1) / j))
    #Print the current row
    print(' ' * (rows - i - 1) * 2, end = '')
    print(' '.join([str(x) for x in row_values]))

    # Print Pascal's Triangle
    pascals_triangle(5)
    if __name__ == "__main__":
    main()
