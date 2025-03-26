import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const main = async () => {

	try {
		await migrate(db, { migrationsFolder: "./src/drizzle" })
		console.log("Migration completed")
	} catch (error) {
		console.error("Error during migration:"), error
		process.exit(1)
	}

}

main()