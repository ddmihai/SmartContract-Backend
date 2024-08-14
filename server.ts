import http from 'http';
import app from './app';
import { connectDB } from './src/database/databaseConnection';
import handleCreateAdminAutomatically from './src/auto/createAdmin';
import { checkNodemailerConnection } from './src/lib/checkNodemailerConnection';



// port and create server
const port = process.env.PORT || 3000;
const server = http.createServer(app);






// function that will start the server and will start other relevant function
async function startServer() {
    await checkNodemailerConnection();
    await connectDB();
    await handleCreateAdminAutomatically();
    server.listen(port, () => console.log(`Server is running on port ${port}`));
};


startServer();