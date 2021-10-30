import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const rowsTotal = 200;

    await knex("coworkings").truncate();

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: 'Test'
        });
    }

    await knex('coworkings').insert(rows);
}
