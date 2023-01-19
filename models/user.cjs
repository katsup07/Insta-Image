const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../util/helpers.cjs');

const p = path.join(rootDir, 'data', 'users.json');

const getUsersFromFile = async() => {
  const result = await fs.readFile(p);
  const users = JSON.parse(result);
  return users;
}


module.exports = class User{
  constructor(username, email, password, isLoggedIn = false){
    this.username = username;
    this.email = email;
    this.password = password;
    this.isLoggedIn = isLoggedIn;
    this.userId = Date.now().toString();
  }

  // TODO - Add a findByUsername() function that returns a user or null. This can be used in an auth function elsewhere when users login or signup.
  // TODO - Add a toggle/link that switches between signup and login so that users have both options when accessing the site.
  async save(){
    console.log('save() in User was called...')
    if(await User.findByUsername(this.username))
      throw 'That username is already taken. Try a different username or add some additional characters on the end.';
    
    const users = await getUsersFromFile();
    const updatedUsers = [...users];
    updatedUsers.push(this);
    await fs.writeFile(p, JSON.stringify(updatedUsers));
  }

  static async logout(username){
    console.log('logout() in User was called. username: ', username);
    const users = await getUsersFromFile();
    const user = users.find(u => u.username === username);
    if(!user)
      return console.log("There is no current user to logout");

    console.log(user);
    user.isLoggedIn = false;
    const updatedUsers = [user, ...users];
    await fs.writeFile(p, JSON.stringify(updatedUsers));
  }
  static async fetchAllUsers(){
    return await getUsersFromFile();
  }

  static addUser(){}


  // Generically search by any keys or values
  static async findBy(key, value){
    console.log('findBy() in User was called');
    const users = await getUsersFromFile();
    const user = users.find( user => user[key] === value);
    return user;
  }
  
  static async findByUsername(username){
    console.log('findByUsername() was called');
    const users = await getUsersFromFile();
    const user = users.find( user => user.username === username);
    return user;
  }

}