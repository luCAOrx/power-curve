import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPowerCurvesFiles1614140686126 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'power_curves_files',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'path',
					type: 'varchar'
				},
				{
					name: 'size',
					type: 'decimal'
				},
				{
					name: 'power_curve_id',
					type: 'integer'
				}
			],
			foreignKeys: [
				{
					name: 'PoweCurve',
					columnNames: ['power_curve_id'],
					referencedTableName: 'power_curves',
					referencedColumnNames: ['id'],
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('power_curves_files');
	}

}
