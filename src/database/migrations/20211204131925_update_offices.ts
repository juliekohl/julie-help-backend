import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('offices', function(table) {
        table.dropColumn('type');
        table.integer('officestype_id').notNullable().after('coworking_id');
        table.foreign('officestype_id').references('id').inTable('officestypes');
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('offices', function(table) {
        table.string('type', 100).notNullable().after('name');
        table.dropForeign('officestype_id');
        table.dropColumn('officestype_id');
    })
}
