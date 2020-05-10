// 'use strict'

let fs = require('fs');


function storage() {
  let library = getJson();
  let id = library[library.length-1].id + 1;

  return {

    get: () => {
      return library;
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

      for (let key in body) {
        book[key] = body[key];
      }
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
  });
}


function getJson() {
  let file = JSON.parse(fs.readFileSync('./express/storage.json', "utf8"));
  return file;
}

module.exports = storage;
