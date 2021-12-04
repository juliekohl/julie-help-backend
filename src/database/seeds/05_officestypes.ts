import { Knex } from "knex";
import {Officestypes} from "../../types/officestypes.interface";
import {knexTruncate} from "../../api/shared/knex-truncate";

export async function seed(knex: Knex): Promise<void> {
    const rows: Partial<Officestypes>[] = [
        { type: "shared-space", name: "Shared Space" },
        { type: "meeting-room", name: "Meeting Room" },
        { type: "event-hall", name: "Event Hall" },
        { type: "private-room", name: "Private Room" },
    ];

    await knexTruncate(knex, "officestypes");

    await knex("officestypes").insert(rows);
}
