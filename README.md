**Scholar+** is a website that allows students to apply for scholarships from different universities all across the globe. The website is responsive and works on all types of devices.

### The APIs are secured using JWT tokens and interceptors.

### LIVE LINK: https://m12-a12-scholarplus.web.app/
### Server Side: https://github.com/barta3235/SCHOLARPLUS-SERVER-a12



### Users Side:

1. **Authentication:**
   - Users can log in with email/password or Google authentication.  
2. **Browsing Scholarships:**
   - Users can browse various scholarships, view details, and apply for them.
3. **Application Process:**
   - Users can pay through a payment gateway using their card information.
   - After payment, users can fill in further information to confirm their scholarship application.
4. **Dashboard:**
   - Users can view and update their profile.
   - Users can see the scholarships they have applied for.
   - Users can update or delete their information.
   - Users can add reviews which will be displayed as cards in a carousel on the scholarship details page for other students to see.
   - If a moderator or admin rejects an application, the user cannot update or cancel the scholarship.
5. **Reviews:**
   - Users can see, edit, and remove their reviews.





### Moderator Side: 

1. ***Scholarship Management:***
- Moderators can add scholarships to the database
- They can manage scholarships by viewing details, updating information, and discontinuing or deleting the scholarships.

2. **Review Management:**
- Moderators can see reviews and their respective ratings.
- They can delete user reviews.

3. **Application Management:**
- All applied scholarships are visible to the moderator in the dashboard.
- Moderators can update the status of applications using a dropdown menu (Pending, Processing, and Completed).
- They can reject scholarship applications, which will also update the status in the user dashboard.
- Moderators can provide feedback on the status of the applied scholarship or explain why it was rejected.
4. **User Communication:**
- Moderators can read "Get in Touch" messages from users who tried to contact the team.





### Admin Side:
1.***All Moderator Capabilities:***
- Admins can do everything that moderators can do, including managing scholarships, reviews, and applications, and communicating with users.

2. ***Analytics:***
- Admins have access to a "My Profile" panel with analytics.
- This includes visualizations such as:
- Most applied scholarships in a pie chart.
- Bar chart visualization of tuition fees vs. universities.
- Admins can see the count of users on the website, the number of scholarships, applied scholarships, and the total fees generated to date.

3. ***User Management:***
- Admins can see all website users in the panel.
- They can change user roles from user to moderator or admin.
- Admins can remove users from the database.

***More***
- In the Admin Dashboard under the "Users" section, administrators can filter users by selecting options from the filter button located in the top right corner. The available filter options are: All Users, Moderators, and Admins.

- Additionally, on the All Scholarships page, search functionality and pagination have been implemented to enhance user convenience and navigation.


### Some of the many Libaries Used:
- https://react-hook-form.com/
- https://tanstack.com/query/latest
- https://swiperjs.com/
- https://michalsnik.github.io/aos/

### Middleware: JWT Interceptors
### Services: Stripe Payment Gateway




### Usage Information
- ***Admin Info***
     - bartamitdaiyan@gmail.com Password: Admin1234#
- ***Moderator Info***
     - charizardworking@gamil.com Password: Admin1234#


# REACTJS #MONGODB #EXPRESSJS #JWT #PAYMENT GATEWAY


