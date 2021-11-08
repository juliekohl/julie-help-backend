import retrieveAll from "./retrieve-all";
import retrieve from "./retrieve";
import create from "./create";
import update from "./update";
import del from "./delete";

const coworkers = (app, database) => {
    retrieveAll(app, database);
    retrieve(app, database);
    create(app, database);
    update(app, database);
    del(app, database);
}

export default coworkers