import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldAvatarToUserTable1710151700830 implements MigrationInterface {
    name = 'AddFieldAvatarToUserTable1710151700830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
    }

}
