Student Data Manager :-
A simple, clean React app to manage student records — add them, edit them, search through them, sort them, and even run built-in tests to make sure everything’s working.

What You Can Do :-
Core Features
Add Students – Fill out a quick form with Roll Number, Name, Department, Year, and CGPA.

Edit Records – Click “Edit” on a student to update their details.

Delete Records – Remove a student in one click.

View All Students – Everything is neatly shown in a table.

Search & Filters
Fuzzy Search – Finds matches even with typos or missing accents.

Department Filter – Show only CSE, ECE, ME, CE, or EE students.

Year Filter – Filter by 1st to 4th year.

Reset Filters – Clear all filters in one go.

Sorting
Sort by CGPA – Toggle between high-to-low and low-to-high.

Sort by Name – Toggle between A→Z and Z→A.

Visual Cues – See which column is sorted and in which direction.

Built-in Testing
Test Search Logic – Check if fuzzy search works as expected.

Test Name Normalization – Make sure names compare correctly regardless of accents or case.

Interactive Runner – Click “Run Tests” and see results instantly.

Nice Touches
Fully responsive design for mobile and desktop.

Accessible labels, ARIA attributes, and keyboard navigation.

Saves data to localStorage so it’s there when you reload.

🛠 Tech Stack
React (Functional Components + Hooks)

CSS3 (Grid + Flexbox)

LocalStorage for saving data

Built with Create React App

Getting Started
Clone the repo

bash
Copy
Edit
git clone
cd student-data-manager
Install dependencies

bash
Copy
Edit
npm install
Start the app

bash
Copy
Edit
npm start
Open http://localhost:3000 in your browser.

How to Use
Add a Student

Fill out the form.

Roll Number must be unique.

CGPA must be between 0 and 10.

Click “Save”.

Edit a Student

Click “Edit” in the table.

Update the details.

Click “Update”.

Search & Filter

Type in the search box — works for name or roll number.

Apply department/year filters if you like.

Use sort buttons to order results.

Click “Reset Filters” to start fresh.

Run Tests

Scroll to the bottom.

Click “Run Tests”.

Check the results right on the page.

Project Structure
pgsql
Copy
Edit
src/
├── components/
│ ├── StudentForm.js
│ ├── StudentTable.js
│ ├── SearchControls.js
│ └── TestRunner.js
├── utils/
│ └── searchUtils.js
├── App.js
├── index.js
└── index.css
How Fuzzy Search Works
Accent-insensitive – “José” matches “jose”.

Case-insensitive – “RAVI” matches “ravi”.

1-character tolerance – Finds matches even with a single missing, extra, or wrong character.

Pure JavaScript – No external search libraries used.

Validation Rules
All fields required.

Roll numbers must be unique.

CGPA between 0 and 10.

Errors shown instantly while typing.
