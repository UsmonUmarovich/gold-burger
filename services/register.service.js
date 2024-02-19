import Datastore from "nedb";

const users = new Datastore({ filename: "./data/users.json" });
users.loadDatabase((err) => console.log(err));

export function registerUser(
  password,
  name,
  surname,
  middlename,
  phone,
  role,
  callback
) {
  users.findOne({ phone }, (err, phon) => {
    if (err) {
      return callback(err);
    }

    if (phon) {
      return callback("Username already exists");
    }

    users.insert(
      {
        _id: `${Date.now()}`,
        password,
        name,
        surname,
        middlename,
        role,
        phone,
      },
      (err, newUser) => {
        if (err) {
          return callback(err);
        }
        callback(newUser);
      }
    );
  });
}

export default users;
