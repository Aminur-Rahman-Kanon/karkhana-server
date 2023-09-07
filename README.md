# Karkhana
Karkhana is a lightweight e-commerce web app built on MERN stack.

## Demo link
Access this site at [Go to Karkhana](https://karkhana.onrender.com)

## Technologies
I used React library, CSS, Node, Express, MongoDB, Firebase Storage, React-Query, React-Stripe in this project.

## About this Project
The client side of this app is pretty simple. Whent this app starts, its loaded with a bunch of different types of products. Then the user can browse all different types of products and information. User can select one or multiple products and add them in the cart, then they can view the cart, add more or remove any of the item and finally purchase them by making a payment by credit or debit card.

When the payment has been successfull, the purchased item will be added to the "Orders section" of the user profile page where user can see the order details such as: order id, order placing date, estimated delivery date, total item, users delivery address etc.

To be able to select any products users are prompted to login. After logged in to the system, user can select any products and if users dont have any address entries to their profile then they can't make a purchase since address is important for delivery.

The server side is also pretty simple. Its got a bunch of APIS where client app make a request and get the desired results. All the products are saved in the firebase storage where the user and other information are saved in mongoDB database system.

## Approach
### App initialization
The client side begins with the index.js file where it render the App component wrapped up with QueryClientProvider, ErrorBoundary and the BrowserRouter. The QueryClientProvider connect and provides the query client to its nested children. Query Client holds the query cache where the results of the api are stored and doesn't cleared out until the cacheTime props timed-out. I wrapped the QueryClientProvider with the App component so I can pass the QueryClient to it and can call the useQuery hook to actually call the fetch method and store the results in the QueryClient.

The ErrorBoundary is responsible for detecting any errors occurs in any level of its children and render an UI so the app doesn't break and user can continue using the app from the previous or any other route of this app.

The BrowserRouter are the main component of the react-router. It uses HTML5 history API and provides them to its nested component. I Wrapped up the App component with BrowserRouter so the App and all its nedted component get access to the history APIS that the BrowserRouter provides and I can declare some other component in the App component which will render on every routes regardless of whatever the routes are.

The App component render a bunch of different routes and some other components like Sidedrawer, TopBar and Backdrop which will render on every routes. The App component wrapped all its Route with a ContextProvider and Elements. The ContextProvider pass some global state which will be used by any of the nested Elements.

Elements is a Stripe's prebuilt UI component that allow us to use feature of Stripe.js with which user can make a secure online banking transactions. The Elements component takes a stripe object which is a promise that is returned by calling the loadStripe api from stripe.js. After that we can render the CardElement component in any part of the nested components. With the help of a method from stripe called createPaymentMethod we can create a payment card object and sent it to our server app where the payment process will be carry out with the payment card object.

After storing the data in the cache by calling the useQuery hook, I distrubuted the data throughout the app with the help of ContextProvider and any components that need the data can access it by calling useContext hook. Most of the components are subscribed with this context to get all the products and display them conditionally to the browser.

### Components and their roles
Homepage component is responsible to display some different types of products and category and a banner to display some information about the company in a nutshell.

Whereas the ProductsListMain component display all the products of an individual category, ProductsDetailsMain display an individual products and its related information. Additionally, ProductsDetailsMain also display some related and other products so the user xan choose any different products they want.

DisplayCartMain display all the products that user has added to the cart. In this page user can add or remove any products they want.

CheckoutMain also display all the products that user added to the but user can make a payment and place the order so that the products can be delivered to the door of the user.

Profile components display all information about the user including a photo and order status where user can see their orders they made before. Additionally user can update some information such as: names, address, password and photo.

Blog component display some iconic and trending products news.

DefaultRoute This component render to inform the user when the requested url wasn't found.

### Registration and Login system
Registration process of this app is also quite simple. User enter their information and from that information I validate the email address to check if its a valid email address by using some simple string operation and useEffect hook. I also check the password and confirm password if they are the same. If both validation passed and all other fields are filled then the information can be sent to the server app to process the registration. The server app then retreive all the data that been sent and initially it checks the user if its exist or not. If exist then it abort the registration process with status of 'user exist' and if its a new user then it hash the password using bcrypt 128 bit salt and transform it to a 192 bit magic value and then finally create a user by making a new entry in the mongoDB collection and return a status of 'success' to the client app where the user then notified that the user has been created and then navigate to the login page.

As for login system, user enter their email and password and request to the server where the server first check if the user exist in the database or not. If the user doesn't exist then abort the login process by returning a status of 'user not found' and if the user exist then the server create a hash password with the password provided in the same way as the registration process did. After that, the server compare both hashed password with the one that was stored in the database. If that matches, then the server return the user information to the client app where the client app will store the information in the sessionStorage and then conditionally display the user information and navigate to the homepage where user will notified that they are logged in and continue using the app. If the hashed passwords doesn't match. then the server return with a status of 'passowrd doesn't match'.

I also implemented a "forgot password" system where user can reset their password. First the user will provide their email address to begin. If the email is available in the database then the server will send a password-reset-link to their email addresses which will basically navigate the user to a page including a password reset form served by the server using server-side-rendering technique. When the user enter their new password in both input fields the password will be validated to check if they are the same. When the validation passes, the new password will be sent to the server. The server then check if the user are the same user who requested the password reset request by comparing the user information that was saved in the json token. If that check passed, then the server forward with the request and update the password and return a status of 'success' where users are notified that the password has been changed and redirected to the login page where the user can login with new password.

## Status
This is a MERN stack app and I can happily say that it is complete.

## Credit
This app was developed by me and myself
[Aminur Rahman](https://www.linkedin.com/in/aminur-rahman-kanon)

## Final Words
This full project are available in github in two separate repositories since I deployed it in Render and the server and client app are hosted individually.
[Client App](https://github.com/Aminur-Rahman-Kanon/karkhana-client)
,
[Server App](https://github.com/Aminur-Rahman-Kanon/karkhana-server)

Thank you for staying with me up to this point. Suggestions and feedbacks are always welcomed.😃