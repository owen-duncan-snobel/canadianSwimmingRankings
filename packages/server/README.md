

# Running Migrations

From the server root run, `npx prisma migrate dev --name init --schema ./mount/prisma/schema.prisma`


### Problems with auth + public schemas in supabase
Follow the guides in the following steps

#### Recreate the prisma folder and set up the schema.prisma with multiSchema
https://supabase.com/docs/guides/integrations/prisma#resources

#### Create baseline schema
https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-postgres

Pull in supabase schemas (do not have any of your models in the schema.prisma to start)
```npx prisma db pull --schema ./mount/prisma/schema.prisma```

Update 2 lines in the migration.sql file, https://github.com/prisma/prisma/issues/17734#issuecomment-1452011006


Follow guide for creating migration baseline
```npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql```
```npx prisma migrate resolve --applied 0_init```

Finally run
```npx prisma migrate dev --schema ./prisma/schema.prisma```


Now you can add back the models
