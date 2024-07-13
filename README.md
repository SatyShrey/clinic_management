# clinic_management
This is a web application project made by using HTML, CSS and JavaScript, that interacts with Firebase to create a web application for managing a medical facility's appointment system. Here is a summary of what each part of the code does:

1. The code imports necessary Firebase SDKs for authentication and database operations.
2. It initializes the Firebase app with configuration settings.
3. It declares variables for various elements on the web page.
4. It handles the functionality for switching between signup and login forms.
5. It contains functions for user signup and login using Firebase authentication.
6. It includes a function to generate tokens for patients and store their information in the database.
7. It defines a function to display the dashboard with the list of patient tokens.
8. It implements interactive features like viewing patient details and marking appointments as completed.
9. It includes logout functionality for both doctors and receptionists.

Overall, the script creates a user-friendly interface for managing patient appointments, handling user authentication, displaying patient information, and allowing staff members to update appointment statuses.

 It includes forms for user login and signup, sections for receptionist and doctor information, and scripts to handle interactions. The structure consists of header, main content with forms for login and signup, sections for receptionist and doctor details, and a script tag linking to a JavaScript file for functionality. The design is clean and organized, enhancing user experience by segregating different functionalities into distinct sections.

 functions
 ==========
 1. It has a login screen for both doctors and receptionists.
 2. User can switch to signup page by clicking the link named "Not an user? Signup".
 3. At the time of user creation the database record a object that contain if the new user is a doctor or receptionalist, so for both doctor and receptionalist there are one login and one signup page.
 4. After login if the user is a doctor he/she can view the appointment list and patient's data and can mark as completed for particular appointment.
 5.  After login if the user is a doctor he/she can view name and appointment status list of the patients and can add new appointments list to the list.
 6.  After the doctor mark an appointment as completed it will be shown completed to both doctor and receptionalist.

*******************************************************************************************************
