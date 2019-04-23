# Eat-Da-Burger! -- A Full Stack restaurant app

![EatDaBurger_2](https://user-images.githubusercontent.com/18557337/56597438-4d293200-65a7-11e9-8615-c76d5e803478.png)

## A restaurant app that lets users input the names of burgers they'd like to eat

_Technologies used:_

- Node.js

- Express

- Handlebars

- MySQL & Sequelize

Whenever a user submits a burger's name, the app will display the burger on the left side of the page -- waiting to be devoured.

Each burger in the waiting area also has a `Devour it!` button. When the user clicks it, the burger will move to the right side of the page.

The app will store every burger in a database, whether devoured or not.

The app utilizes an MVC structure with handlebars.

The user must create customers who are attached to the burgers. Each customer can have multiple burgers -- there is a one to many relationship. SQL inner joins are used in the app.  The corresponding customers are displayed inside the ready to be devoured burgers list and the devoured burgers list.  

This app utilized Sequelize as the ORM layer into the MySQL database.  This app uses Create, Read and Update from the CRUD database operations.

[Link to this app on Heroku](https://still-beyond-23927.herokuapp.com/)