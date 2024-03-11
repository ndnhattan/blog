import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForRefreshTokenInUserTable1710149527247 implements MigrationInterface {
    name = 'SetDefaultValueForRefreshTokenInUserTable1710149527247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
