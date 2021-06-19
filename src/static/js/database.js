function databaseStart() {
    const favorites = db.prepare('CREATE TABLE "Favorites" ( "id"	INTEGER NOT NULL UNIQUE, "name"	TEXT NOT NULL, "content"	TEXT, "image"	TEXT NOT NULL, "href"	TEXT NOT NULL, "genres"	TEXT, "updated"	INTEGER, "lastread"	TEXT, "lastchapter"	TEXT, PRIMARY KEY("id" AUTOINCREMENT) )');
    const info = favorites.run();
    console.log(info);
    const options = db.prepare('CREATE TABLE "Options" ( "id"	INTEGER NOT NULL UNIQUE, "Option"	TEXT NOT NULL UNIQUE, "Value"	TEXT NOT NULL, PRIMARY KEY("id" AUTOINCREMENT) )');
    const info2 = options.run();
    console.log(info2);
};