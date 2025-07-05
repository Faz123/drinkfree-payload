import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "is_card" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "is_card" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "card_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_card_image_idx" ON "pages_blocks_content_columns" USING btree ("card_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_card_image_idx" ON "_pages_v_blocks_content_columns" USING btree ("card_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_card_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_card_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_content_columns_card_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_content_columns_card_image_idx";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "is_card";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "card_image_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "is_card";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "card_image_id";`)
}
