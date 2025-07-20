import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "posts_populated_authors" ADD COLUMN "bluesky" varchar;
  ALTER TABLE "posts_populated_authors" ADD COLUMN "instagram" varchar;
  ALTER TABLE "posts" ADD COLUMN "hero_text" varchar;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "bluesky" varchar;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "instagram" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_text" varchar;
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_avatar_idx" ON "posts_populated_authors" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_avatar_idx" ON "_posts_v_version_populated_authors" USING btree ("avatar_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" DROP CONSTRAINT "posts_populated_authors_avatar_id_media_id_fk";
  
  ALTER TABLE "_posts_v_version_populated_authors" DROP CONSTRAINT "_posts_v_version_populated_authors_avatar_id_media_id_fk";
  
  DROP INDEX IF EXISTS "posts_populated_authors_avatar_idx";
  DROP INDEX IF EXISTS "_posts_v_version_populated_authors_avatar_idx";
  ALTER TABLE "posts_populated_authors" DROP COLUMN IF EXISTS "avatar_id";
  ALTER TABLE "posts_populated_authors" DROP COLUMN IF EXISTS "bluesky";
  ALTER TABLE "posts_populated_authors" DROP COLUMN IF EXISTS "instagram";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_text";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN IF EXISTS "avatar_id";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN IF EXISTS "bluesky";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN IF EXISTS "instagram";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_hero_text";`)
}
