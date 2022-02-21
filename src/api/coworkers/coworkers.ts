import { showAll} from "./show-all";
import { show } from "./show";
import { create } from "./create";
import { update } from "./update";
import { del } from "./delete";
import { chart } from "./chart";

export const coworkers = (app, db) => {
    showAll(app, db);
    show(app, db);
    create(app, db);
    update(app, db);
    del(app, db);
    chart(app, db);
}
