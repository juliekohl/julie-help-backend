import { Knex } from "knex";
import faker from 'faker';
import {knexTruncate} from "../../shared/knex-truncate";

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const rowsTotal = 10;

    await knexTruncate(knex, "coworkings");

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: faker.company.companyName()
        });
    }

    await knex('coworkings').insert(rows);
}
