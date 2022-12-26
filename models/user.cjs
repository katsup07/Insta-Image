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
  constructor(username, password, id = ''){
    this.username = username;
    this.password = password;
    this.userId = id || Date.now().toString();
  }

  // TODO - Add a findByUsername() function that returns a user or null. This can be used in an auth function elsewhere when users login or signup.
  // TODO - Add a toggle that switches between signup and login so that users have both options when accessing the site.
  async save(){
    console.log('save() was called...')
    if(await User.findById(this.userId))
      return console.warn('save() failed -- a user with the same id is already registered');
    
    const users = await getUsersFromFile();
    const updatedUsers = [...users];
    updatedUsers.push(this);
    const result = await fs.writeFile(p, JSON.stringify(updatedUsers));
  }

  static async fetchAllUsers(){
    return await getUsersFromFile();
  }

  static addUser(){}


  static async findByUsername(){}

  static async findById(id){
    console.log('findById() was called');
    const users = await getUsersFromFile();
    const user = users.find( user => user.userId === id);
    return user;
  }
}