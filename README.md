<!-- # To Do List -->
<!--  -->
<!-- 1. set a limit so not all are loaded onto page at the same time -->
<!--  -->
<!-- 2. create a server folder -->
<!--  -->
<!-- 3. grouping of event listeners -->
<!--  -->
<!-- 4. top nav bar of mobile version is buggy -->
<!--  -->
<!-- 5. add css for cart-brick-container -->
<!--  -->
<!-- 6. references of where i got the bricks from -->
<!--  -->
<!-- 7. only one media query -->
<!--  -->
<!-- 8. multiple folders within client folder -->
<!--  -->
<!-- 9.  testing -->
<!--  -->
<!-- ## questions -->

<!-- edit an api and add a parameter that specifies how many can be added -->
<!-- return all the bricks to client, and specify how many you want -->

<!-- be able to handle it if it's empty -->

<!-- point out that using id's of incrementing numbers at the beginning was weak however from that point on, you were going to use uuid -->

# Ice's Lego Store

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

* User is able to use both desktop and mobile versions

### Unfinished Work
