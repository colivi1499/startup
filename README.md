# startup
## Elevator Pitch

Have you ever been to a really good Taco Bell and wished you could share your experience with similar bell fanatics? Many of us are too shy to post our Taco Bell experiences to popular social media platforms. With **Bell Share**, you can show pictures of your most recent Taco Bell order, with a 5-star rating system and a brief description for why you gave the order its rating. Join groups with your friends to see everyone’s posts in one, concise place.

![Design page 1](/images/Bell%20Share%20rough%20draft%20(Page%201).png)
![Design page 2](/images/Bell%20Share%20rough%20draft%20(Page%202).png)

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
