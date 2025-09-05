import mongoose from 'mongoose'

// Set mongoose options to avoid deprecation warnings
mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`✅ DB Connected successfully to: ${conn.connection.host}`)
        return conn
    } catch (err) {
        console.error(`❌ DB Connection failed: ${err.message}`)
        process.exit(1)
    }
}


export default connectDB;