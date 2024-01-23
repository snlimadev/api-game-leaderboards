const secret = process.env.JWT_SECRET;
const username = process.env.ENV_USERNAME;
const password = process.env.ENV_PASSWORD;
const database = process.env.DATABASE_NAME;
const collection = process.env.COLLECTION_NAME;
const swaggerCss = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css';

const getConnectionString = () => {
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const clusterUrl = process.env.CLUSTER_URL;

  return `mongodb+srv://${dbUsername}:${dbPassword}@${clusterUrl}?retryWrites=true&w=majority`;
};

module.exports = {
  secret,
  username,
  password,
  database,
  collection,
  swaggerCss,
  getConnectionString
};