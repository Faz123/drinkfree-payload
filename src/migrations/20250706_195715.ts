import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "bluesky" varchar;
  ALTER TABLE "users" ADD COLUMN "instagram" varchar;
  ALTER TABLE "users" ADD COLUMN "author_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_author_image_idx" ON "users" USING btree ("author_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP CONSTRAINT "users_author_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "users_author_image_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "bluesky";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "instagram";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "author_image_id";`)
}
