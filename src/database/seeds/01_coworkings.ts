import { Knex } from "knex";
import faker from 'faker';
import { knexTruncate } from "../../api/shared/knex-truncate";
import { Coworking } from "../../types/coworking.interface";

export async function seed(knex: Knex): Promise<void> {
    const rows: Partial<Coworking>[] = [];
    const rowsTotal: number = 10;

    await knexTruncate(knex, "coworkings");

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: faker.company.companyName()
        });
    }

    await knex('coworkings').insert(rows);
}
