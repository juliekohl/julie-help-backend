export async function knexTruncate(knex, table) {
    await knex.raw('SET foreign_key_checks = 0');
    await knex(table).truncate();
    await knex.raw('SET foreign_key_checks = 1');
}
