import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesFieldToUserTable1710303997801 implements MigrationInterface {
    name = 'AddRolesFieldToUserTable1710303997801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
