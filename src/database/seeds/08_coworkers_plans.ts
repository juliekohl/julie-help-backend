import { Knex } from "knex";
import {CoworkersPlans} from "../../types/coworkers-plans.interface";

export async function seed(knex: Knex): Promise<void> {
    const rows: Partial<CoworkersPlans>[] = [];
    const rowsTotal: number = 50;

    await knex("coworkers_plans").truncate();

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            coworker_id: i,
            plan_id: i,
        });
    }

    await knex("coworkers_plans").insert(rows);
}
