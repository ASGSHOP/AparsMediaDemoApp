# Teachstack

## Integrate Live Class Infrastructure in Minutes

Teachmint’s signature product - TeachStack empowers live classroom learning by adding real-time audio/visual communications to your app or website, making your classroom learning into a seamless experience

This repository provides a demonstration application to use teachstack api and create a basic app that connects the backend (server) and the frontend (client or app)

## Requirements

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- `client_id` and `auth_key` for making any api calls (Please write us at contact@teachmint.com if you are intrested in using our api's)

## Installation

- Navigate to the directory where you would like to setup the repository and clone using:
```http
git clone https://github.com/Teachmint/demo-app.git
```
- ### Run Server
    ```sh
    cd /server
    npm install --force
    PORT=4000 TM_API_URL="https://api.teachmint.com" CLIENT_ID="`your_client_id`"" AUTH_KEY="`your_auth_key`" npm run dev
    ```
    (Or create a .env file in server folver with the above parameters and just enter "npm run dev")

    **(Expected result: 🚀 App listening on the port 4000)**
    
- ### Run App
    ```sh
    cd /app
    npm install --force
    npm run start
    ```
    **(Expected result: Runs app on localhost:3000)**
    
## Documentation

To know more about our api endpoints, please have a look at our documentation:

**[CLICK HERE TO SEE TEACHSTACK DOCUMENTATION](https://docs.teachmint.com/)**

## License

MIT
