## **Getting Started with Testing**

This guide will provide you with all the necessary information to get
started with testing both the backend and frontend of the application.
Here, we will introduce the technologies and libraries used, explain how
to set them up, and provide some basic usage examples to help you get
started quickly.

#### **Frontend**

-   **React Testing Library**: React Testing Library is a very
    light-weight solution for testing React components. It provides
    utility functions on top of the existing testing framework to work
    with React components in a way that resembles how users interact
    with them. This library encourages writing tests that maintain your
    application\'s accessibility and usability standards. This is ideal
    for testing UI components and ensuring they render and behave
    correctly under various conditions.

-   **Jest**: As with the backend, Jest is also used here to run our
    tests. In the frontend context, Jest is used to test the behavior
    and interactions of React components. It helps in creating both unit
    tests, which focus on individual components or functions, and
    integration tests, which ensure that different parts of the UI work
    together as expected.

-   **Babel**: Babel is a JavaScript compiler that allows us to use the
    latest JavaScript syntax. For testing, it ensures compatibility
    across different environments by transforming modern JavaScript code
    into a version that can run in different testing environments. This
    ensures that you can use the latest features of JavaScript without
    worrying about compatibility issues.

###

### **Frontend Setup**

**Install React Testing Library, Jest, and Babel**

```
npm install \--save-dev \@testing-library/react
\@testing-library/jest-dom jest babel-jest \@babel/preset-env
\@babel/preset-react
```

**Configure Babel**\
**Create a file named babel.config.js in your root directory:**

```
    module.exports = {
        presets: [
            '@babel/preset-env',
            '@babel/preset-react'
        ]
    };

```

**Configure Jest**\
**In your package.json, add the following configuration:**

```
    "jest": {
    "collectCoverage": false,
    "coverageProvider": "v8",
    "collectCoverageFrom": [
      "**/*.{js,jsx,ts,tsx}",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "!<rootDir>/out/**",
      "!<rootDir>/.next/**",
      "!<rootDir>/*.config.js",
      "!<rootDir>/coverage/**"
    ],
    "moduleNameMapper": {
      "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": "<rootDir>/__mocks__/fileMock.js",
      "@globals/fonts": "<rootDir>/__mocks__/nextFontMock.js",
      "next/font/(.*)": "<rootDir>/__mocks__/nextFontMock.js",
      "^@globals/metadata$": "<rootDir>/__mocks__/metadata.js",
      "^@data/navLinks.json$": "<rootDir>/__mocks__/navLinks.json",
      "^@components/(.*)$": "<rootDir>/app/(pages)/_components/$1",
      "@hooks/(.*)": "<rootDir>/__mocks__/useToggle.js",
      "^next/image$": "<rootDir>/__mocks__/image.js",
      "server-only": "<rootDir>/__mocks__/empty.js"
    },
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/.next/"
    ],
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": [
        "babel-jest",
        {
          "presets": [
            "next/babel"
          ]
        }
      ]
    },
    "transformIgnorePatterns": [
      "/node_modules/",
      "^.+\\.module\\.(css|sass|scss)$"
    ]
  }
```

**Create a Test File**\
**Create a file named App.test.js in your src folder:**

```
    import React from 'react';
    import { render, screen, fireEvent, waitFor } from '@testing-library/react';
    import '@testing-library/jest-dom';
    import App from './App';
    test('renders learn react link', () => {
        render(<App />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    })

```

**Run Tests**

```
npm run test
```

#### **Frontend Tests with React Testing Library and Jest**

**Import Statements**: Import necessary libraries and components.

**Render**: The render function from React Testing Library renders the
component we want to test.

**Screen**: The screen object provides methods to query the rendered
component.

**FireEvent**: Allows simulating user interactions with the rendered
component.

**WaitFor**: Utility for waiting for asynchronous actions to complete in
the component.

**Expect**: Jest\'s expect function asserts that the component behaves
as expected.

### **Detailed Configuration Breakdown**

#### **Jest Configuration in package.json**

**collectCoverage**: If set to true, Jest will collect test coverage
information.

**coverageProvider**: Specifies the provider for code coverage; \'v8\'
is used for better performance.

**collectCoverageFrom**: Defines the files from which coverage
information should be collected.

**moduleNameMapper**: Allows mapping module paths to mocks, useful for
mocking static assets like stylesheets and images.

**testPathIgnorePatterns**: Paths that Jest should ignore while running
tests.

**testEnvironment**: Specifies the environment in which the tests will
run. \'jsdom\' is used for frontend tests.

**transform**: A map from regular expressions to paths to transformers.
Using babel-jest to transform JavaScript and JSX files.

**transformIgnorePatterns**: Patterns for files to be ignored by Jest\'s
transformer.

#### **Babel Configuration in babel.config.js**

**\@babel/preset-react**: Transforms JSX syntax into JavaScript.

**\@babel/preset-env**: Automatically determines the Babel plugins and
polyfills needed based on the target environments.

### **Writing Mocks**

Mocks are essential for isolating the code you are testing by replacing
dependencies with controlled replacements. This is particularly useful
for testing modules that interact with external resources.

#### **Mocking Files and Styles**

Create a folder named \_\_mocks\_\_ in your root directory and add the
following mock files:

**styleMock.js**

```
module.exports = 'test-file-stub';
```

**fileMock.js**

```
module.exports = 'test-file-stub';
```

#### **Mocking Global Objects**

For example, to mock the fetch API, you can add the following to your
test setup file or directly in your test file:

```
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            json: () => Promise.resolve({}), 
        }) 
    );
```

### **Writing Tests with React Testing Library**

**Render**: Renders the React component you want to test.
```
render(<Component />);
```
**Screen**: Access the rendered output for querying.
```
const element = screen.getByText(/text/i);
```
**FireEvent**: Simulates user interactions.
```
fireEvent.click(button);
```
**WaitFor**: Waits for asynchronous updates.
```
await waitFor(() => expect(element).toBeInTheDocument());
```
### **Tips for Writing Tests**

-   **Keep Tests Simple**: Each test should focus on one piece of
    functionality.

-   **Use Descriptive Names**: Name your test cases and test blocks
    clearly to describe what they are testing.

-   **Mock External Dependencies**: Use Jest\'s mocking capabilities to
    mock external services or modules.

-   **Run Tests Frequently**: Run your tests often to catch issues early
    in the development process.

# **Test Cases and Results with Jest and React Testing Library**

## **Overview**

The provided test files cover various components and functionalities of
a web application built with React. These tests are written using Jest
as the testing framework and React Testing Library for rendering and
interacting with the React components. The tests cover different aspects
of the application, including:

-   Alumni Routes: Testing the API endpoints related to alumni data
    management.

-   Comparison of Alumni Data: Testing the functionality to compare the
    current alumni data with the previous data and identify changes.

-   Previous Alumni Routes: Testing the API endpoints related to
    managing previous alumni data.

-   Directory Components: Testing various components used in the alumni
    directory, such as the header, search form, alumni list, and
    pagination.

-   Export Components: Testing components related to exporting alumni
    data as a CSV file.

-   Dashboard Components: Testing components that display various
    statistics and visualizations related to alumni data.

-   Layout and Navigation: Testing the layout and navigation components
    of the application.

-   Recommendations Components: Testing components that suggest
    companies based on alumni data.

-   Settings Components: Testing components related to user settings and
    subscription management.

## **Known Issues and Limitations**

While the provided tests cover a wide range of scenarios, there are some
known issues and limitations to consider:

1.  **Mocking External Dependencies**: Some tests rely on mocking
    external dependencies, such as the fetch function for making API
    calls. While this approach allows for testing without relying on
    actual API responses, it may not accurately reflect the behavior of
    the real API or handle edge cases that could occur in production.

2.  **Snapshot Testing**: The tests do not include snapshot testing,
    which can be useful for ensuring that components render correctly
    and catching unintended changes in their structure or output.

3.  **Test Coverage**: While the tests cover many components and
    functionalities, there may be areas of the application that are not
    thoroughly tested or have missing test cases.

4.  **Integration Testing**: The tests focus primarily on unit testing
    individual components or functions. While this is valuable, it may
    not catch issues that arise from the integration of multiple
    components or modules working together.

5.  **End-to-End Testing**: The tests do not include end-to-end testing,
    which simulates user interactions with the application from start to
    finish and can catch issues that may not be apparent in isolated
    unit tests.

## **How It Works**

The tests in these files are written using Jest and React Testing
Library. Jest is a JavaScript testing framework developed by Facebook,
while React Testing Library is a library that provides utilities for
testing React components in a way that resembles how users interact with
the application.

Here\'s a high-level overview of how the tests work:

1.  **Setup**: Before running the tests, Jest sets up the testing
    environment by mocking any external dependencies or APIs that the
    components rely on. This is done using Jest\'s mocking capabilities
    and the global.fetch mock.

2.  **Rendering Components**: The tests use React Testing Library\'s
    render function to render the components being tested. This function
    returns an object containing utility methods for querying and
    interacting with the rendered components.

3.  **Querying and Asserting**: The tests use various utility methods
    provided by React Testing Library to query the rendered components
    and assert that they render correctly or behave as expected. These
    methods include getByText, getByPlaceholderText, getByTestId,
    queryByText, and others.

4.  **Simulating User Interactions**: For components that involve user
    interactions, such as clicking buttons or submitting forms, the
    tests use React Testing Library\'s fireEvent function to simulate
    these interactions and assert that the components respond correctly.

5.  **Asynchronous Testing**: Some tests involve asynchronous
    operations, such as fetching data from an API or waiting for
    component updates. In these cases, the tests use Jest\'s waitFor
    function or the findBy methods provided by React Testing Library to
    wait for the asynchronous operations to complete before making
    assertions.

6.  **Cleanup**: After each test case, Jest cleans up the testing
    environment by removing any rendered components or mocked data to
    ensure a clean slate for the next test case.

## **What to Expect and Make Test Cases**

When writing test cases with Jest and React Testing Library, you should
expect the following:

1.  **Isolated Component Testing**: Test cases should focus on testing
    individual components in isolation, ensuring they render correctly
    and behave as expected based on various inputs and user
    interactions.

2.  **Accessibility Testing**: React Testing Library encourages writing
    tests that resemble how users interact with the application, which
    can help catch accessibility issues early in the development
    process.

3.  **Asynchronous Testing**: If your components involve asynchronous
    operations, such as API calls or side effects, ensure that your test
    cases account for these scenarios and wait for the asynchronous
    operations to complete before making assertions.

4.  **Mocking Dependencies**: If your components rely on external
    dependencies or APIs, consider mocking these dependencies in your
    tests to ensure consistent and controlled testing environments.

5.  **Data-driven Testing**: For components that display or manipulate
    data, consider writing test cases that cover different scenarios and
    edge cases for the data being handled.

Here are some examples of test cases you could write using Jest and
React Testing Library:

-   Test that a component renders correctly with different props or
    state.

-   Test that user interactions (e.g., clicking a button, submitting a
    form) trigger the expected behavior or state changes.

-   Test that asynchronous operations (e.g., API calls, data fetching)
    are handled correctly and that components update as expected when
    data is loaded.

-   Test that error states or edge cases are handled gracefully by the
    components.

-   Test that accessibility requirements are met (e.g., proper labeling,
    keyboard navigation).

-   Test that components are correctly unmounted and any side effects
    are cleaned up.

# **Frontend Components**

### **AlumniUpdates**

#### **renders mock updates**

This test case verifies that the AlumniUpdates component renders mock
updates correctly.

**Test Scenario:**

-   It mocks the fetch function using jest.fn().

-   It sets up a mock response with an array of two updates (\"Update
    1\", \"Update 2\") using mockResolvedValueOnceand
    jest.fn().mockResolvedValueOnce.

-   It renders the AlumniUpdates component using React Testing
    Library\'s render function.

-   It expects the rendered component to contain the text \"Alumni
    Updates\" using screen.getByText.

**Expected Behavior:**

-   The AlumniUpdates component should render the \"Alumni Updates\"
    heading.

#### **renders updates data when fetched successfully**

This test case verifies that the AlumniUpdates component renders the
fetched updates data correctly.

**Test Scenario:**

-   It mocks the fetch function using jest.fn().

-   It sets up a mock response with an array of five updates using
    mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniUpdates component using React Testing
    Library\'s render function.

-   It uses a for loop to check if each update is rendered using
    screen.findByText.

**Expected Behavior:**

-   The AlumniUpdates component should render all the fetched updates.

### **Header (Data Comparison)**

#### **renders header**

This test case verifies that the Header component renders the header
text correctly.

**Test Scenario:**

-   It renders the Header component using React Testing Library\'s
    render function.

-   It expects the rendered component to contain the text \"Data
    Comparison\" using screen.getByText.

**Expected Behavior:**

-   The Header component should render the \"Data Comparison\" text.

### **SearchForm**

#### **renders the search form correctly**

This test case verifies that the SearchForm component renders the search
form elements correctly.

**Test Scenario:**

-   It renders the SearchForm component using React Testing Library\'s
    render function, passing in a mock handleSearchSubmit function as a
    prop.

-   It expects the rendered component to contain a search input field
    with the placeholder text \"Search alumni by title, keyword, or
    company\" using screen.getByPlaceholderText.

-   It expects the rendered component to contain a submit button with
    the text \"Submit Search\" using screen.getByText.

**Expected Behavior:**

-   The SearchForm component should render with the correct search input
    field and submit button.

#### **calls the handleSearchSubmit function when the form is submitted**

This test case verifies that the SearchForm component calls the
handleSearchSubmit function when the form is submitted.

**Test Scenario:**

-   It renders the SearchForm component using React Testing Library\'s
    render function, passing in a mock handleSearchSubmit function as a
    prop.

-   It finds the submit button using screen.getByText.

-   It simulates a click event on the submit button using
    fireEvent.click.

-   It expects the handleSearchSubmit function to have been called using
    expect(handleSearchSubmit).toHaveBeenCalled().

**Expected Behavior:**

-   When the submit button is clicked, the handleSearchSubmit function
    should be called.

### **SelectedTags**

#### **renders selected tags correctly**

This test case verifies that the SelectedTags component renders the
selected tags correctly.

**Test Scenario:**

-   It sets up mock selectedTags (\"Tag 1\", \"Tag 2\"),
    handleTagDelete, and handleClearAllTags functions.

-   It renders the SelectedTags component using React Testing Library\'s
    render function, passing in the mock data as props.

-   It expects the rendered component to contain the text \"Tag 1\" and
    \"Tag 2\" using screen.getByText.

-   It expects the rendered component to contain the \"Clear All\"
    button using screen.getByText.

**Expected Behavior:**

-   The SelectedTags component should render the selected tags and the
    \"Clear All\" button correctly.

#### **calls the handleTagDelete function when the delete icon is clicked**

This test case verifies that the SelectedTags component calls the
handleTagDelete function when the delete icon is clicked.

**Test Scenario:**

-   It sets up mock selectedTags (\"Tag 1\", \"Tag 2\"),
    handleTagDelete, and handleClearAllTags functions.

-   It renders the SelectedTags component using React Testing Library\'s
    render function, passing in the mock data as props.

-   It finds the first delete icon using screen.getAllByAltText and
    fireEvent.click.

-   It expects the handleTagDelete function to have been called with
    \"Tag 1\" using expect(handleTagDelete).toHaveBeenCalledWith(\'Tag
    1\').

**Expected Behavior:**

-   When the delete icon is clicked, the handleTagDelete function should
    be called with the corresponding tag.

#### **calls the handleClearAllTags function when the \"Clear All\" button is clicked**

This test case verifies that the SelectedTags component calls the
handleClearAllTags function when the \"Clear All\" button is clicked.

**Test Scenario:**

-   It sets up mock selectedTags (\"Tag 1\", \"Tag 2\"),
    handleTagDelete, and handleClearAllTags functions.

-   It renders the SelectedTags component using React Testing Library\'s
    render function, passing in the mock data as props.

-   It finds the \"Clear All\" button using screen.getByText.

-   It simulates a click event on the \"Clear All\" button using
    fireEvent.click.

-   It expects the handleClearAllTags function to have been called using
    expect(handleClearAllTags).toHaveBeenCalled().

**Expected Behavior:**

-   When the \"Clear All\" button is clicked, the handleClearAllTags
    function should be called.

### **GraduationYearForm**

#### **renders the graduation year form correctly**

This test case verifies that the GraduationYearForm component renders
the graduation year form elements correctly.

**Test Scenario:**

-   It renders the GraduationYearForm component using React Testing
    Library\'s render function, passing in a mock handleYearSubmit
    function as a prop.

-   It expects the rendered component to contain a year input field with
    the placeholder text \"2024\" using screen.getByPlaceholderText.

-   It expects the rendered component to contain a submit button with
    the text \"Submit Year\" using screen.getByText.

**Expected Behavior:**

-   The GraduationYearForm component should render with the correct year
    input field and submit button.

#### **calls the handleYearSubmit function when the form is submitted**

This test case verifies that the GraduationYearForm component calls the
handleYearSubmit function when the form is submitted.

**Test Scenario:**

-   It renders the GraduationYearForm component using React Testing
    Library\'s render function, passing in a mock handleYearSubmit
    function as a prop.

-   It finds the submit button using screen.getByText.

-   It simulates a click event on the submit button using
    fireEvent.click.

-   It expects the handleYearSubmit function to have been called using
    expect(handleYearSubmit).toHaveBeenCalled().

**Expected Behavior:**

-   When the submit button is clicked, the handleYearSubmit function
    should be called.

### **AlumniList**

#### **renders the alumni data correctly**

This test case verifies that the AlumniList component renders the alumni
data correctly.

**Test Scenario:**

-   It sets up mock alumniData with a single alumni object containing
    various properties (name, url, job, company, otherEducation,
    location, graduationYear, major).

-   It renders the AlumniList component using React Testing Library\'s
    render function, passing in the mock alumniData as a prop.

-   It expects the rendered component to contain the text for each
    property of the alumni object using screen.getByText.

**Expected Behavior:**

-   The AlumniList component should render the alumni data correctly,
    displaying all the properties of the alumni object.

### **Pagination**

#### **renders the pagination correctly**

This test case verifies that the Pagination component renders the
pagination elements correctly.

**Test Scenario:**

-   It renders the Pagination component using React Testing Library\'s
    render function, passing in mock currentPage (3), totalPages (10),
    and handlePageChange props.

-   It expects the rendered component to contain the \"Prev\" button,
    page numbers (1, 2, 3, 4, 10), dots (\...), and \"Next\" button
    using screen.getByText.

**Expected Behavior:**

-   The Pagination component should render with the correct buttons,
    page numbers, and dots for the given currentPage and totalPages.

#### **calls the handlePageChange function when a page number is clicked**

This test case verifies that the Pagination component calls the
handlePageChange function when a page number is clicked.

**Test Scenario:**

-   It renders the Pagination component using React Testing Library\'s
    render function, passing in mock currentPage (3), totalPages (10),
    and handlePageChange props.

-   It finds the page number \"4\" button using screen.getByText.

-   It simulates a click event on the page number button using
    fireEvent.click.

-   It expects the handlePageChange function to have been called with
    the page number (4) using
    expect(handlePageChange).toHaveBeenCalledWith(4).

**Expected Behavior:**

-   When a page number button is clicked, the handlePageChange function
    should be called with the corresponding page number.

### **ExportCard**

#### **renders CSV button**

This test case verifies that the ExportCard component renders the CSV
button correctly.

**Test Scenario:**

-   It mocks the fetch function and returns a rejected Promise with a mock error.

-   It renders the ExportCard component using React Testing Library's render function.

-   It mocks the console.error function to capture the error log.

-   It waits for the fetch error to be logged and checks if the error message matches 
    the expected error using waitFor and console.error.

-   It expects neither the "Loading..." text nor the "Download CSV" button to be present after the fetch error.

**Expected Behavior:**

-   The ExportCard component should render with the "Export Data Into A CSV File Here:" text.

-   The "Download CSV" button should appear after the alumni data is fetched successfully.

#### **shows loading state while fetching data**

This test case verifies that the ExportCard component shows the loading state while fetching the alumni data.

**Test Scenario:**

-   It mocks the fetch function and returns a resolved Promise with mock alumni data, 
    simulating an asynchronous fetch operation.

-   It renders the ExportCard component using React Testing Library's render function.

-   It expects the rendered component to contain the "Loading..." text initially.

-   It waits for the "Loading..." text to disappear and the "Download CSV" button to appear using waitFor.

**Expected Behavior:**

-   The ExportCard component should show the "Loading..." text while fetching the alumni data.

-   After the data is fetched successfully, the "Loading..." text should disappear, 
    and the "Download CSV" button should appear.

#### **handles fetch error**

This test case verifies that the ExportCard component handles fetch errors correctly.

**Test Scenario:**

-   It mocks the fetch function and returns a rejected Promise with a mock error.

-   It renders the ExportCard component using React Testing Library's render function.

-   It mocks the console.error function to capture the error log.

-   It waits for the fetch error to be logged and checks if the error message matches the 
    expected error using waitFor and console.error.

-   It expects neither the "Loading..." text nor the "Download CSV" button to be present after the fetch error.

**Expected Behavior:**

-   When a fetch error occurs, the ExportCard component should log the error to the console.

-   After the fetch error, neither the "Loading..." text nor the "Download CSV" 
    button should be present on the component.


### **Header (Export Page)**

#### **renders header**

This test case verifies that the Header component renders the header
text correctly.

**Test Scenario:**

-   It renders the Header component using React Testing Library\'s
    render function.

-   It expects the rendered component to contain the text \"Data
    Export\" using screen.getByText.

**Expected Behavior:**

-   The Header component should render the \"Data Export\" text.

### **Header (Dashboard Page)**

#### **renders with correct text and styling**

This test case verifies that the Header component on the Dashboard page
renders with the correct text and styling.

**Test Scenario:**

-   It renders the Header component using React Testing Library\'s
    render function.

-   It expects the rendered component to contain a container element
    with the test ID \"header-container\" using getByTestId.

-   It expects the rendered component to contain the text \"Dashboard\"
    using getByText.

**Expected Behavior:**

-   The Header component should render with the \"Dashboard\" text and
    the correct container styling.

### **AlumniJobs**

#### **renders mock job data**

This test case verifies that the AlumniJobs component renders mock job
data correctly.

**Test Scenario:**

-   It mocks the fetch function using jest.fn().

-   It sets up a mock response with an array of job data using
    mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniJobs component using React Testing Library\'s
    render function.

-   It expects the rendered component to contain an element with the
    test ID \"alumni-jobs\" using screen.getByTestId.

**Expected Behavior:**

-   The AlumniJobs component should render with the mock job data.

#### **renders a link to export page**

This test case verifies that the AlumniJobs component renders a link to
the export page.

**Test Scenario:**

-   It mocks the fetch function using jest.fn().

-   It sets up a mock response with an array of job data using
    mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniJobs component using React Testing Library\'s
    render function.

-   It uses waitFor to wait for the link to be rendered.

-   It expects the rendered component to contain a link with the text
    \"View Report\" using screen.getByText.

**Expected Behavior:**

-   The AlumniJobs component should render a link with the text \"View
    Report\" to navigate to the export page.

#### **renders job data when fetched successfully**

This test case verifies that the AlumniJobs component renders the
fetched job data correctly.

**Test Scenario:**

-   It mocks the fetch function using jest.fn().

-   It sets up a mock response with an array of job data using
    mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniJobs component using React Testing Library\'s
    render function.

-   It uses screen.findByText to wait for and find each job element in
    the rendered component.

-   It expects each job element to be rendered using
    expect(jobElement).toBeInTheDocument().

**Expected Behavior:**

-   The AlumniJobs component should render all the fetched job data
    correctly.

#### **calls the export link when clicked**

This test case verifies that the AlumniJobs component calls the export
link when clicked.

**Test Scenario:**

-   It mocks the fetch function using jest.fn().

-   It sets up a mock response with an array of job data using
    mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniJobs component using React Testing Library\'s
    render function.

-   It uses waitFor to wait for the link to be rendered.

-   It finds the \"View Report\" link using screen.getByText.

-   It simulates a click event on the link using fireEvent.click.

**Expected Behavior:**

-   When the \"View Report\" link is clicked, it should navigate to the
    export page or perform the expected action.

### **AlumniLocations**

#### **renders mock location data**

This test case verifies that the AlumniLocations component renders
correctly with mock location data.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock location data array with two locations, Location1
    and Location2.

-   It mocks the fetch function to resolve with the mock location data
    using fetch.mockResolvedValueOnce and
    jest.fn().mockResolvedValueOnce.

-   It renders the AlumniLocations component using
    render(\<AlumniLocations /\>).

-   It waits for the component to render using waitFor.

-   It asserts that the rendered component contains the text \"Top
    Alumni Locations\" using screen.getByText(\'Top Alumni Locations\').

**Expected Behavior:**

-   The AlumniLocations component should render correctly with the \"Top
    Alumni Locations\" text displayed.

#### **renders top locations data when fetched successfully**

This test case verifies that the AlumniLocations component renders the
correct location data when fetched successfully.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock location data array with two locations, Location1
    and Location2.

-   It mocks the fetch function to resolve with the mock location data
    using fetch.mockResolvedValueOnce and
    jest.fn().mockResolvedValueOnce.

-   It renders the AlumniLocations component using
    render(\<AlumniLocations /\>).

-   It finds the elements containing the text \"Location1\" and
    \"Location2\" using screen.findByText.

-   It asserts that the elements containing \"Location1\" and
    \"Location2\" are present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The AlumniLocations component should render correctly with the
    location data, displaying \"Location1\" and \"Location2\".

#### **renders the chart correctly**

This test case verifies that the AlumniLocations component renders the
location chart correctly.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock location data array with two locations, Location1
    and Location2.

-   It mocks the fetch function to resolve with the mock location data
    using fetch.mockResolvedValueOnce and
    jest.fn().mockResolvedValueOnce.

-   It renders the AlumniLocations component using
    render(\<AlumniLocations /\>).

-   It waits for the component to render using waitFor.

-   It finds the chart element by its test ID using
    screen.getByTestId(\'locationChart\').

-   It asserts that the chart element is present in the rendered
    component using toBeInTheDocument().

**Expected Behavior:**

-   The AlumniLocations component should render correctly with the
    location chart displayed.

### **TopCompanies**

#### **renders mock company data**

This test case verifies that the TopCompanies component renders
correctly with mock company data.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock company data array with two companies, Company1
    and Company2.

-   It mocks the fetch function to resolve with the mock company data
    using fetch.mockResolvedValueOnce and
    jest.fn().mockResolvedValueOnce.

-   It renders the TopCompanies component using render(\<TopCompanies
    /\>).

-   It waits for the component to render using waitFor.

-   It asserts that the rendered component contains the text \"Top
    Companies\" using screen.getByText(\'Top Companies\').

**Expected Behavior:**

-   The TopCompanies component should render correctly with the \"Top
    Companies\" text displayed.

#### **renders company data when fetched successfully**

This test case verifies that the TopCompanies component renders the
correct company data when fetched successfully.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock company data array with two companies, Company1
    and Company2.

-   It mocks the fetch function to resolve with the mock company data
    using fetch.mockResolvedValueOnce and
    jest.fn().mockResolvedValueOnce.

-   It renders the TopCompanies component using render(\<TopCompanies
    /\>).

-   It finds the elements containing the text \"Company1\" and
    \"Company2\" using screen.findByText.

-   It asserts that the elements containing \"Company1\" and
    \"Company2\" are present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The TopCompanies component should render correctly with the company
    data, displaying \"Company1\" and \"Company2\".

#### **renders the chart correctly**

This test case verifies that the TopCompanies component renders the
company chart correctly.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock company data array with two companies, Company1
    and Company2.

-   It mocks the fetch function to resolve with the mock company data
    using fetch.mockResolvedValueOnce and
    jest.fn().mockResolvedValueOnce.

-   It renders the TopCompanies component using render(\<TopCompanies
    /\>).

-   It waits for the component to render using waitFor.

-   It finds the chart element by its test ID using
    screen.getByTestId(\'companyChart\').

-   It asserts that the chart element is present in the rendered
    component using toBeInTheDocument().

**Expected Behavior:**

-   The TopCompanies component should render correctly with the company
    chart displayed.

### **AlumniUpdates**

#### **renders mock updates**

This test case verifies that the AlumniUpdates component renders
correctly with mock updates.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock updates array with two updates, \"Update 1\" and
    \"Update 2\".

-   It mocks the fetch function to resolve with the mock updates using
    fetch.mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniUpdates component using render(\<AlumniUpdates
    /\>).

-   It waits for the component to render using waitFor.

-   It asserts that the rendered component contains the text \"Alumni
    Updates\" using screen.getByText(\'Alumni Updates\').

**Expected Behavior:**

-   The AlumniUpdates component should render correctly with the
    \"Alumni Updates\" text displayed.

#### **renders updates data when fetched successfully**

This test case verifies that the AlumniUpdates component renders the
correct updates data when fetched successfully.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock updates array with five updates, \"Update 1\",
    \"Update 2\", \"Update 3\", \"Update 4\", and \"Update 5\".

-   It mocks the fetch function to resolve with the mock updates using
    fetch.mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the AlumniUpdates component using render(\<AlumniUpdates
    /\>).

-   For each update in the mock updates array:

    -   It finds the element containing the update text using
        screen.findByText.

    -   It asserts that the element containing the update text is
        present in the rendered component using toBeInTheDocument().

**Expected Behavior:**

-   The AlumniUpdates component should render correctly with all the
    updates displayed.

### **CurrentCount**

#### **renders mock current count**

This test case verifies that the CurrentCount component renders
correctly with a mock current count.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock count object with a count of 1234, { count: 1234
    }.

-   It mocks the fetch function to resolve with the mock count using
    fetch.mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the CurrentCount component using render(\<CurrentCount
    /\>).

-   It waits for the component to render using waitFor.

-   It asserts that the rendered component contains the text \"Current
    Alumni Count\" using screen.getByText(\'Current Alumni Count\').

**Expected Behavior:**

-   The CurrentCount component should render correctly with the
    \"Current Alumni Count\" text displayed.

#### **renders alumni count when fetched successfully**

This test case verifies that the CurrentCount component renders the
correct alumni count when fetched successfully.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock count object with a count of 1234, { count: 1234
    }.

-   It mocks the fetch function to resolve with the mock count using
    fetch.mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the CurrentCount component using render(\<CurrentCount
    /\>).

-   It finds the element containing the text \"1234\" using
    screen.findByText.

-   It asserts that the element containing \"1234\" is present in the
    rendered component using toBeInTheDocument().

**Expected Behavior:**

-   The CurrentCount component should render correctly with the alumni
    count \"1234\" displayed.

### **YearAlumni**

#### **renders mock current year count**

This test case verifies that the YearAlumni component renders correctly
with a mock current year count.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock count object with a count of 567, { count: 567 }.

-   It mocks the fetch function to resolve with the mock count using
    fetch.mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the YearAlumni component using render(\<YearAlumni /\>).

-   It waits for the component to render using waitFor.

-   It asserts that the rendered component contains the text \"This Year
    Alumni Count\" using screen.getByText(\'This Year Alumni Count\').

**Expected Behavior:**

-   The YearAlumni component should render correctly with the \"This
    Year Alumni Count\" text displayed.

#### **renders alumni count when fetched successfully**

This test case verifies that the YearAlumni component renders the
correct alumni count when fetched successfully.

**Test Scenario:**

-   It clears any previously mocked fetch calls using fetch.mockClear().

-   It creates a mock count object with a count of 567, { count: 567 }.

-   It mocks the fetch function to resolve with the mock count using
    fetch.mockResolvedValueOnce and jest.fn().mockResolvedValueOnce.

-   It renders the YearAlumni component using render(\<YearAlumni /\>).

-   It finds the element containing the text \"567\" using
    screen.findByText.

-   It asserts that the element containing \"567\" is present in the
    rendered component

### **RootLayout**

#### **renders Navbar and children**

This test case verifies that the RootLayout component renders the Navbar
and the child component correctly.

**Test Scenario:**

-   It renders the RootLayout component with the navLinks prop and a
    child component.

-   It uses the getByTestId and getByText utilities from React Testing
    Library to get the rendered elements.

-   It asserts that the Navbar element with the test ID \"navbar\" is
    present in the rendered component using toBeInTheDocument().

-   It asserts that the child component element with the text \"Child
    Component\" is present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The RootLayout component should render correctly with the Navbar and
    the child component displayed.

#### **toggles the active state when menu button is clicked**

This test case verifies that the RootLayout component toggles the active
state of the menu button when clicked.

**Test Scenario:**

-   It renders the RootLayout component with the navLinks prop.

-   It uses the getByTestId utility from React Testing Library to get
    the menu button element.

-   It asserts that the menu button does not have the \"active\" class
    initially using classList.contains(\"active\").

-   It simulates a click event on the menu button using
    fireEvent.click(menuButton).

-   It asserts that the menu button does not have the \"active\" class
    after clicking using classList.contains(\"active\").

**Expected Behavior:**

-   The menu button should not have the \"active\" class initially.

-   After clicking the menu button, it should still not have the
    \"active\" class.

### **Header (Recommendations)**

#### **renders the header text correctly**

This test case verifies that the Header component in the Recommendations
section renders the correct header text.

**Test Scenario:**

-   It renders the Header component using render(\<Header /\>).

-   It uses the getByText utility from React Testing Library to get the
    header text element.

-   It asserts that the header text element with the text
    \"Recommendations\" is present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The Header component should render correctly with the header text
    \"Recommendations\" displayed.

### **SuggestedCard**

#### **renders the loading state initially**

This test case verifies that the SuggestedCard component renders the
loading state initially.

**Test Scenario:**

-   It mocks the global fetch function using jest.fn() before each test
    case.

-   It renders the SuggestedCard component using render(\<SuggestedCard
    /\>).

-   It uses the getByText utility from React Testing Library to get the
    loading text element.

-   It asserts that the loading text element with the text
    \"Loading\...\" is present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The SuggestedCard component should render correctly with the loading
    text \"Loading\...\" displayed initially.

#### **fetches and renders company data**

This test case verifies that the SuggestedCard component fetches and
renders the company data correctly.

**Test Scenario:**

-   It mocks the global fetch function using jest.fn() before each test
    case.

-   It creates a mock company data object with sample data.

-   It mocks the fetch function to resolve with the mock company data
    using mockResolvedValueOnce.

-   It renders the SuggestedCard component using render(\<SuggestedCard
    /\>).

-   It waits for the component to render using waitFor.

-   It uses the getByText utility from React Testing Library to get the
    company name element.

-   It asserts that the company name element with the text \"Sample
    Company\" is present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The SuggestedCard component should fetch and render the company data
    correctly, displaying the company name \"Sample Company\".

### **Header (Settings)**

#### **renders header**

This test case verifies that the Header component in the Settings
section renders the correct header text.

**Test Scenario:**

-   It renders the Header component using render(\<Header /\>).

-   It uses the getByText utility from React Testing Library to get the
    header text element.

-   It asserts that the header text element with the text \"Settings\"
    is present in the rendered component using toBeInTheDocument().

**Expected Behavior:**

-   The Header component should render correctly with the header text
    \"Settings\" displayed.

### **Subscription**

#### **renders the loading state initially**

This test case verifies that the Subscription component renders the
loading state initially.

**Test Scenario:**

-   It mocks the global fetch function using jest.fn() before each test
    case.

-   It renders the Subscription component using render(\<Subscription
    /\>).

-   It uses the getByText utility from React Testing Library to get the
    loading text element.

-   It asserts that the loading text element with the text
    \"Loading\...\" is present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The Subscription component should render correctly with the loading
    text \"Loading\...\" displayed initially.

#### **fetches and displays the subscription status**

This test case verifies that the Subscription component fetches and
displays the subscription status correctly.

**Test Scenario:**

-   It mocks the global fetch function using jest.fn() before each test
    case.

-   It creates a mock subscription status mockSubscribed as true.

-   It mocks the fetch function to resolve with the mock subscription
    status using mockResolvedValueOnce.

-   It renders the Subscription component using render(\<Subscription
    /\>).

-   It waits for the component to render using waitFor.

-   It uses the getByText utility from React Testing Library to get the
    subscription status text element based on the mock subscription
    status.

-   It asserts that the subscription status text element with the text
    \"Subscribed\" is present in the rendered component using
    toBeInTheDocument().

**Expected Behavior:**

-   The Subscription component should fetch and display the subscription
    status correctly, showing the text \"Subscribed\" when the
    subscription status is true.
