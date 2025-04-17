const AWS = require('aws-sdk');
const tableName = 'test-table-1';

// Configure AWS DynamoDB
AWS.config.update({
    region: 'us-west-2', // Change region as needed
});

const docClient = new AWS.DynamoDB.DocumentClient();

// Function to add a user
async function addUser(userId, name, email) {
    const params = {
        TableName: tableName,
        Item: {
            user_id: userId,
            Name: name,
            Email: email
        }
    };

    try {
        await docClient.put(params).promise();
        console.log(`User ${name} added successfully.`);
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Function to get a user by UserId
async function getUser(userId) {
    const params = {
        TableName: tableName,
        Key: { user_id: userId }
    };

    try {
        const result = await docClient.get(params).promise();
        console.log('User retrieved:', result.Item);
    } catch (error) {
        console.error('Error retrieving user:', error);
    }
}

// Function to scan all users
async function scanUsers() {
    const params = {
        TableName: tableName
    };

    try {
        const result = await docClient.scan(params).promise();
        console.log('All Users:', result.Items);
    } catch (error) {
        console.error('Error scanning users:', error);
    }
}

// Main execution
(async () => {
    await addUser('1', 'Alice', 'alice@example.com');
    await addUser('2', 'Bob');
    await getUser('1');
    await scanUsers();
})();
