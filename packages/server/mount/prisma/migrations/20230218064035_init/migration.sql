-- AlterTable
CREATE SEQUENCE athletes_id_seq;
ALTER TABLE "Athletes" ALTER COLUMN "id" SET DEFAULT nextval('athletes_id_seq');
ALTER SEQUENCE athletes_id_seq OWNED BY "Athletes"."id";
