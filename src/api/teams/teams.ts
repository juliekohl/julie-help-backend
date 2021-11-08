import retrieveAll from "./retrieve-all";
import retrieve from "./retrieve";
import create from "./create";
import update from "./update";
import del from "./delete";

const teams = (app, db) => {
    retrieveAll(app, db)
    retrieve(app, db)
    create(app, db)
    update(app, db)
    del(app, db)
}

export default teams;
