import { Knex } from "knex";
import faker from 'faker';

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const firstUserId = 101;
    const lastUserId = 200;

    await knex("coworkers").truncate();

    for (let i = firstUserId; i <= lastUserId; i++) {
        rows.push({
            coworking_id: faker.datatype.number({
                min: 1,
                max: 10
            }),
            user_id: i,
        });
    }

    await knex('coworkers').insert(rows);
}
