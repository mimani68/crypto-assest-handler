export const config = {
    Debug: process.env.DEBUG == 'true',
    Envirnoment: process.env.ENVIRONMENT || 'development',
    Database: '/home/dev/project/propine/source/sample/sample.csv'
    // Database: '/home/dev/project/propine/transactions.csv'
}