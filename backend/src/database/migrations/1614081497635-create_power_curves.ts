import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPowerCurves1614081497635 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'power_curves',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('power_curves');
	}
}
