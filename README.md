# startup
## Elevator Pitch

Have you ever been to a really good Taco Bell and wished you could share your experience with similar bell fanatics? Many of us are too shy to post our Taco Bell experiences to popular social media platforms. With **Bell Share**, you can show pictures of your most recent Taco Bell order, with a 5-star rating system and a brief description for why you gave the order its rating. Join groups with your friends to see everyone’s posts in one, concise place.

<img src="images/Bell Share rough draft (Page 1).png" alt="Alt Text" width="425" height="550" style="transform: rotate(180deg);">
<img src="images/Bell Share rough draft (Page 2).png" alt="Alt Text" width="425" height="550" style="transform: rotate(180deg);">

### Key Features:
- Message System 
- Ability to Join Groups
- Ability to Rate Food 
- Write Descriptions of Food
- List Location of Restaurant 
- Post Pictures of Food

### Technologies

- **HTML**: Three pages – one for browsing groups, one for a group's posts, and one for creating a post.
- **CSS**: Taco Bell color scheme, ensuring good formatting and proper text display.
- **React/JavaScript**: Login and rating system, user interaction.
- **Authentication**: Passwords should be hashed and verified with the database at login. Each login session should create a new authentication token that is required for user data access and manipulation.
- **Database Data**: Usernames and hashed passwords should be stored in a database.
- **WebSocket Data**: When messages are sent between active groups, they should be notified without having to manually refresh.


### HTML Deliverable
- **Main Page**
    - added search bar
    - added add friend and login button
    - added Taco Bell logo
    - added buttons for groups in list
    - added create group holder, weather, and message friends placeholder button
    - added link to shared github and to login page
- **Group Page**
    - created placeholder for group information in database
- **Login Page**
    - added in simple login page


### CSS Deliverable
- **Main Page**
    - utilized bootstrap to do the folowing
    - modified colors to Taco Bell theme
    - added a header and footer
    - added functionality to navigation buttons
    - button elements to group page placeholder
    - button placeholders for create group, local weather, and message friends
    - modified elements to resize with screen
- **Group Page**
    - color scheme updated
    - kept placeholders from last time
- **Login Page**
    - added the color scheme
    - kept the placeholder for simple login page


### React Deliverable
- **React Frontend**
    - React added to front end
    - vite bundled
    - App.jsx utilized, with different React components for each webpage
    - Login react components utilized to set up saving username and password
    - Buttons reconfigured to actually link to different pages
    - Implemented hooks in app.jsx