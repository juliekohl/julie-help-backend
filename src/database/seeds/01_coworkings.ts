import { Knex } from "knex";
import faker from 'faker';

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const rowsTotal = 10;

    await knex.raw('SET foreign_key_checks = 0');
    await knex("coworkings").truncate();
    await knex.raw('SET foreign_key_checks = 1');

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: faker.company.companyName()
        });
    }

    await knex('coworkings').insert(rows);
}
