const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../util/helpers.cjs');

const p = path.join(rootDir, 'data', 'pictures.json');

const getPicturesFromFile = async() => {
  const result = await fs.readFile(p);
  const pictures = JSON.parse(result);
  return pictures;
}

module.exports = class Picture{

  constructor(title, url, author){
    this.title = title;
    this.url = url;
    this.author = author;
    this.comments = [];
    this.pictureId = Date.now();
  }

  async save(){
    console.log('save() in Picture was called');
    if(await Picture.findBy('title', this.title))
      throw 'Uploading failed. A picture with the same title is already being used. Try a different title.';

    const pictures = await getPicturesFromFile();
    const updatedPictures = [...pictures];
    updatedPictures.push(this);
    await fs.writeFile(p, JSON.stringify(updatedPictures));
  }

  static async addComment(pictureTitle, comment){
    console.log('addComment() was called...');
    const pictures = await getPicturesFromFile();
    const picture = pictures.find( pic => pic.title === pictureTitle);
    //picture.comments.push(comment)
    picture.comments = [comment, ...picture.comments];
    await fs.writeFile(p, JSON.stringify(pictures));
  }

  static async fetchAllPictures(){
    return await getPicturesFromFile();
  }

    // Generically search by any keys or values
    static async findBy(key, value){
      console.log('findBy() in Picture was called');
      const pictures = await getPicturesFromFile();
      const picture = pictures.find( picture => picture[key] === value);
      return picture;
    }
}