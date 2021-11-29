import { Knex } from "knex";
import {Offices} from "../../types/offices.interface";
import faker from 'faker';

export async function seed(knex: Knex): Promise<void> {
    const rows: Offices[] = [];
    const rowsTotal: number = 200;

    await knex( "offices").truncate();

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            id: i,
            coworking_id: faker.datatype.number({
                min: 1,
                max: 10
            }),
            name: faker.name.findName(),
            type: faker.database.type(),
        });
    }

    // Inserts seed entries
    await knex("offices").insert(rows);
}
