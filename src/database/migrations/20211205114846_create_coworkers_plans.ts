import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE coworkers_plans (
            id int(11) NOT NULL AUTO_INCREMENT,
            coworker_id int(11) NOT NULL,
            plan_id int(11) NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp NULL DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY coworkers_plans_id_uindex (id),
            KEY coworkers_plans_coworkers_id_fk (coworker_id),
            KEY coworkers_plans_plans_id_fk (plan_id),
            CONSTRAINT coworkers_plans_coworkers_id_fk FOREIGN KEY (coworker_id) REFERENCES coworkers (id),
            CONSTRAINT coworkers_plans_plans_id_fk FOREIGN KEY (plan_id) REFERENCES plans (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `)
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE IF EXISTS coworkers_plans;
    `)
}
