export default class UserDto {
    _id;
    email;
    name;
    surname;
    role;
    createdAt;

    constructor(model) {
        this._id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.surname = model.surname;
        this.role = model.role;
        this.createdAt = model.createdAt;
    }
}