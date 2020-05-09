// 'use strict'

let fs = require('fs');


function storage() {
  let library = [];
  let id = 0;

  return {

    get: () => {
      return getJson();
    },

    save: (book) => {
      book.id = id++;
      library.push(book);
      saveJson(library);
      return book;
    },

    find: (id) => {
      return library.find((book) => book.id === Number(id));
    },

    update: (id, body) => {
      let book = library.find((book) => book.id === Number(id));
      book.title = body.title;
      book.author = body.author;
      saveJson(library);
      return book;
    },

    delete: (id) => {
      let book = library.indexOf(library.find((book) => book.id === Number(id)));
      library.splice(book, 1);
      saveJson(library);
      return library;
    },
  }
}


function saveJson(obj) {
  let json = JSON.stringify(obj);

  fs.writeFile('./express/storage.json', json.toString(), (error, data) => {
    if (error) throw error;
    console.log("data", data);
  });
}


function getJson() {
  let file = JSON.parse(fs.readFileSync('./express/storage.json', "utf8"));
  return file;
}

module.exports = storage;
