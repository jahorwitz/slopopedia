"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed GobbID
      name: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      // Role based user access.
      role: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" }
        ],
        defaultValue: "user",
        // db: { map: "my_select" },
        validation: { isRequired: true },
        ui: { displayMode: "select" }
      }),
      // User account status
      status: (0, import_fields.select)({
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Suspended", value: "suspended" }
        ],
        defaultValue: "active"
      }),
      // https://keystonejs.com/docs/config/config#storage-images-and-files
      // a User has a profile image
      //avatar: image({ storage: "" }),
      // give the user the ability to edit - yes/no
      isPrivileged: (0, import_fields.checkbox)({ defaultValue: false }),
      // Green threshold allows the user to see what kinds of scores movies end up with once their preferences are set
      // and choose a lowest score for the movie to receive the green tag on the movie details
      slopRating: (0, import_fields.integer)({ defaultValue: 0, db: { map: "my_integer" } }),
      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      // a User can add many movies to a wishlist
      //wishlist: relationship({ ref: "Movie.title", many: true }),
      // a User can watch many movies
      //watched: relationship({ ref: "Movie.title", many: true }),
      // UserPreference to personalize a Slop experience
      // preference: relationship({ ref: "Preference.id", many: true}),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      }),
      lastLoginDate: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user was last active
        defaultValue: { kind: "now" }
      })
    }
  }),
  Post: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our Post list
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      // a user can post image(s) on their blog
      //photo: image({ storage: "my_S3_images" }),
      // with this field, you can set a User as the author for a Post
      author: (0, import_fields.relationship)({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: "User.posts",
        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" }
        ]
      }),
      // with this field, you can add some Keywords to Posts
      keywords: (0, import_fields.relationship)({
        // we could have used 'Keyword', but then the relationship would only be 1-way
        ref: "Keyword.posts",
        // a Post can have many Keywords, not just one
        many: true,
        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      }),
      // with this field, you can add some Slops to Posts
      slops: (0, import_fields.relationship)({
        // we could have used 'Slop', but then the relationship would only be 1-way
        ref: "Slop.posts",
        // a Post can have many Slops, not just one
        many: true,
        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  // this last list is our Keyword list, it only has a name field for now
  Keyword: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true
    },
    // this is the fields for our Tag list
    fields: {
      name: (0, import_fields.text)(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: (0, import_fields.relationship)({ ref: "Post.keywords", many: true })
    }
  }),
  // this last list is our Slop list, it only has a name field for now
  Slop: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true
    },
    // this is the fields for our Slop list
    fields: {
      name: (0, import_fields.text)(),
      // this can be helpful to find out all the Posts associated with a Slop
      posts: (0, import_fields.relationship)({ ref: "Post.slops", many: true })
    }
  }),
  Movie: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      // author: relationship({ ref: "User.movies", many: false }), //should this be false or true?
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      sortTitle: (0, import_fields.text)({ validation: { isRequired: true } }),
      //is this needed? Can we sort by title?
      tomatoScore: (0, import_fields.integer)({
        defaultValue: 0,
        db: { map: "my_tomatoScore" },
        validation: {
          isRequired: true
        },
        isIndexed: "unique"
      }),
      //are all these fields needed?
      runtime: (0, import_fields.integer)({ defaultValue: 0, db: { map: "my_runtime" } }),
      releaseYear: (0, import_fields.integer)({ defaultValue: 0, db: { map: "my_releaseYear" } }),
      handicap: (0, import_fields.integer)({ defaultValue: 0, db: { map: "my_handicap" } }),
      description: (0, import_fields.text)({ validation: { isRequired: true } }),
      decade: (0, import_fields.integer)({ defaultValue: 0, db: { map: "my_decade" } }),
      // images: image({ storage: 'local' }), //question about this, how will this work?
      //need keywords to hold an array of strings 
      //could have used keyword but then the relationship would only be 1-way
      // keywords: relationship({ ref: "Keyword.keywords", many: true }),
      howToWatch: (0, import_fields.text)({ validation: { isRequired: true } })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
import_dotenv.default.config();
var keystone_default = withAuth(
  (0, import_core2.config)({
    server: {
      port: 8080,
      cors: { origin: ["http://localhost:3000"] }
    },
    db: {
      provider: "mysql",
      url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`,
      onConnect: async (context) => {
      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    // https://keystonejs.com/docs/config/config#storage-images-and-files
    // amazone s3 or digital ocean as an option
    storage: {
      // my_S3_images: {
      //   kind: "s3",
      //   type: "image",
      //   bucketName,
      //   region,
      //   accessKeyId,
      //   secretAccessKey,
      //   signed: { expiry: 5000 },
      //   endpoint: "http://localhost:3000",
      // },
    },
    lists,
    session
  })
);
