import { showAll} from "./show-all";
import { show } from "./show";
import { create } from "./create";
import { update } from "./update";
import { del } from "./delete";

export const coworkings = (app, db) => {
    showAll(app, db);
    show(app, db);
    create(app, db);
    update(app, db);
    del(app, db);
}
