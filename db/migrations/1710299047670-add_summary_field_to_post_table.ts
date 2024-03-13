import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSummaryFieldToPostTable1710299047670 implements MigrationInterface {
    name = 'AddSummaryFieldToPostTable1710299047670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}
