import { Knex } from "knex";
import {Offices} from "../../types/offices.interface";
import faker from 'faker';
import {knexTruncate} from "../../api/shared/knex-truncate";

export async function seed(knex: Knex): Promise<void> {
    const rows: Offices[] = [];
    const rowsTotal: number = 200;

    await knexTruncate(knex, "offices");

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            id: i,
            coworking_id: faker.datatype.number({
                min: 1,
                max: 10
            }),
            officestype_id: faker.datatype.number({
                min: 1,
                max: 4
            }),
            name: faker.name.findName(),
        });
    }

    // Inserts seed entries
    await knex("offices").insert(rows);
}
