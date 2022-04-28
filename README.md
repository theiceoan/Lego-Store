

<!-- point out that using id's of incrementing numbers at the beginning was weak however from that point on, you were going to use uuid -->

# Ice's Lego Store

## Configuration (from root folder)

1. run 'npm install' to download the dependencies
2. run 'npm start' to launch the application
3. for development: run 'npm run dev' to use nodemon

## Key Features

### Core Requirements

* The user is able to add multiples of bricks to the cart by pressing the input box, typing the number of bricks wanted, and then pressing 'Add to Cart'.
  * The user is able to add different bricks, of different quantities to the cart, and the quantity will update accordingly.
  * All bricks in cart are stored in local storage until they are purchased or removed by the user.

* The user is able to view the shopping cart by pressing the Cart icon
  * The cart icon has a counter for number of bricks in the cart
  * The user is able to add more bricks while they view their cart (just before checking out).
  * The user is also able to remove bricks from the cart.

* There is a simulated checkout implemented
  * After the user presses the 'checkout' button on the shopping cart page, they see a confirmation message to show that the payment was successful.
  * The stock levels for the brick/s purchased will then update.

* An inventory of items for sale, and stock levels is maintained in a SQLite database

### Additional Features

* The user is able to press the image of the brick to view the details of the brick
  * The user is redirected to that specific brick's own webpage, with a unique URL

* Admin user is able to add bricks to the website/database
  * it is assumed that any user that logs in is admin because creating an admin only view would require getting your email addresses etc.

* The user is able to login
* The user is alerted of which bricks are almost finished (when stock reaches less than 10);
* User is given an error message if they attempt buy more of a brick than in stock

* User is able to use both desktop and mobile versions

## Unfinished Work

* The UI design is very basic

## Future Work

* Setting up of testing
* Creation of a good UI
* Setting up a fully functional admin side of the website
* Adding more bricks, sets etc.
* Perks and functionality for a user logging in/signing up
* Use of ads to start monetizing
* Admin should be able to delete bricks

## Critical Examination

### Programming Paradigms

* Functional Programming was the main programming style used - I wrote very little code outside of functions to improve maintainability (clean code) and efficiency.
  * Tends to handle asynchronous code better (which was a significant part of my web app).
  * Each function executes a particular task (and only its part).
  * I was able to invoke and reuse the functions anywhere else in my program (even within other functions to allow them to communicate).
  * This is seen to have worked because my functions run in parallel with no side-effects or errors.
* Object Oriented Programming was a considered alternative however it was disregarded because of difficulties reusing functions with another class, it is also often less efficient, and it is more complex.

* Modular Programming was only used to improve the maintainability of code. I grouped similar functions together and put them in the same file.

* Event-driven Programming was also used because it is very suitable for projects that have Graphical Interfaces. It is also pivotal in making Interactive Programs such as this web app.

### Architectural Style

Representational State Transfer (REST)

* Use of a Client-Server style successfully improved:
  * Portability (client can be created for different platforms)
  * Scalability (simplified server)
  * Modifiability (client and server can evolve independently)

* Use of a Stateless Server Style successfully improved:
  * Visibility (full nature of request can be easily understood)
  * Reliability (easy recovery from partial failures)
  * Scalability (no resources management between requests)
* Decreased performance was a design tradeoff however, improvements
outweighed tradeoffs so i believe it worked successfully.

* Considered the use of a Layered Architecture
  * There would've been difficulty of distinct layer separation and communication between high-level layers (UI) and lower level layers (System Support).
  * Performance might've been a problem

### Design Decisions

* Use of a multi-page web application instead of using templates
  * I did this because I would still be able to access the data I needed from local storage or window functions.
  * I was still able to have modular JS files communicate.
  * It worked however, not as efficiently and also decreased maintainability. Use of templates and shadow DOM would've allowed me to use all data and elements directly instead of having to create them again for another page.

* Having my shopping cart on a separate page
  * Better usability.
  * This was done because mobile web traffic is seen to be more than 50% of all web traffic. Viewing a drop down cart on a mobile would not be as usable.
  * This worked and I believe this decision was still the best option.

* Within my local storage, i store all of the JSON data of the objects added to the cart
  * This is not an efficient way to do this
  * The better way of doing this would've been simply storing the id's (and maybe quantities) and using that to access all other data about each brick.

* Use of an input of bricks wanted rather than counter buttons.
  * I believed this was the best approach for a page with individual bricks because the user would likely buy multiple ones and would not enjoy pressing the button numerous times.
  * The limitation of this method is it is slightly harder to decrease the quantity of bricks.

* Use of a SQLite database instead of a PostgreSQL database.
  * It is a serverless DBMS that can run in my application
  * More portable because it stores the database in a single disk file within the directory
  * Faster because it is more lightweight.
  * All operations i need to do are simple and also run on a single system.
  * For the current size of the project, this is what i believe to have been the best approach.

* Use of a database storage system instead of a file storage system
  * Efficient storage and retrieval of data
  * Less consumption of space.
  * Data Independence.

* API Design
  * GET Method: used to list bricks and retrieve a specific brick
  * POST Method: used to let the admin upload/create a new brick
  * PUT Method: used to update brick quantities in the database

* It was poor design to initally give my bricks incrementing id's
  * This decreases maintainability of the database.
  * An improvement would be making use of the uuid npm package as i did for bricks that can be added by admin.


 <!-- documentation communicates any concepts necessary to understand the architecture and configuration of the system. -->
 <!-- show feedback when a user has logged in  -->
