import { Knex } from "knex";
import faker from 'faker';

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const rowsTotal = 200;

    await knex("coworkings").truncate();

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: faker.company.companyName()
        });
    }

    await knex('coworkings').insert(rows);
}
