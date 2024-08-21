# Project Setup and Deployment Instructions
Follow the steps below to set up and deploy the project:
1. Install Hardhat ```bash
`npm install hardhat`
2. Compile the smart contracts
`npx hardhat compile`
3. Start a local Hardhat node 
`npx hardhat node`
4. Open a new terminal
5. Deploy the smart contracts to the local network 
`npx hardhat run scripts/deploy.js --network localhost`
6. Navigate to the frontend directory 
`cd frontend`
7. Start the frontend application 
`npm run start`
