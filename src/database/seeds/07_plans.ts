import { Knex } from "knex";
import { Plans } from "../../types/plans.interface";
import faker from 'faker';
import {knexTruncate} from "../../api/shared/knex-truncate";

export async function seed(knex: Knex): Promise<void> {
    const rows: Plans[] = [];
    const rowsTotal: number = 50;

    await knexTruncate(knex, "plans");

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            id: i,
            office_id: faker.datatype.number({
                min: 1,
                max: 200
            }),
            name: faker.name.findName(),
            value: faker.datatype.number(),
        });
    }

    // Inserts seed entries
    await knex('plans').insert(rows);
}
