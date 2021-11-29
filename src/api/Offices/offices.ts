import {retrieveAll} from "./retrieve-all";
import {retrieve} from "./retrieve";
import {create} from "./create";

export const offices = (app, db) => {
    retrieveAll(app, db);
    retrieve(app, db);
    create(app, db);
}
