//course
/*
import "dotenv/config"
import type { Config } from 'drizzle-kit'

export default {
	dialect: "postgresql", 
	schema: "./src/db/schema.ts",
	out: "./src/drizzle",
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
} satisfies Config
*/
//documentation
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});