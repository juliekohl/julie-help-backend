import {showAll} from "./show-all";
import {show} from "./show";
import {create} from "./create";
import {update} from "./update";
import {del} from "./delete";
import {showCoworkers} from "./show-coworkers";

export const plans = (app, db) => {
    showAll(app, db);
    show(app, db);
    showCoworkers(app, db);
    create(app, db);
    update(app, db);
    del(app, db);
}
