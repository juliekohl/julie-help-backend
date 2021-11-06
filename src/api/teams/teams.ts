import retrieveAll from "./retrieve-all";
import retrieve from "./retrieve";
import create from "./create";
import update from "./update";
import del from "./delete";

const teams = (app, database, crypto) => {
    retrieveAll(teams, app, database)
    retrieve( teams, app, database)
    create(teams, app, database, crypto)
    update(teams, app, database, crypto)
    del(teams, app, database)
}

export default teams