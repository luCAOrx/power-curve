import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class createPowerCurves1680332461399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'power-curves',
      columns: [
        {
          name: 'id',
          type: 'text',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '250',
          isUnique: true,
        },
        {
          name: 'file',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'created_at',
          type: 'date',
          default: 'now()'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('power-curves')
  }

}
