
import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://suleiman:code2022@cluster0.pgmmcce.mongodb.net/?retryWrites=true&w=majority", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		})

		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(`Error: ${error}`)
		process.exit(1)
	}
}

export default connectDB