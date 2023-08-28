// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  integer,
  checkbox,
  select,
  image,
} from "@keystone-6/core/fields";

// the document field is a more complicated field, so it has it's own package
import { document } from "@keystone-6/fields-document";
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from ".keystone/types";

export const lists: Lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed GobbID
      name: text({ validation: { isRequired: true }, isIndexed: "unique" }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique",
      }),

      password: password({ validation: { isRequired: true } }),

      // Role based user access.
      role: select({
        type: "enum",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
        defaultValue: "user",
        // db: { map: "my_select" },
        validation: { isRequired: true },
        ui: { displayMode: "select" },
      }),

      // User account status
      status: select({
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Suspended", value: "suspended" },
        ],
        defaultValue: "active",
      }),

      // https://keystonejs.com/docs/config/config#storage-images-and-files
      // a User has a profile image
      //avatar: image({ storage: "" }),

      // give the user the ability to edit - yes/no
      isPrivileged: checkbox({ defaultValue: false }),

      // Green threshold allows the user to see what kinds of scores movies end up with once their preferences are set
      // and choose a lowest score for the movie to receive the green tag on the movie details
      slopRating: integer({ defaultValue: 0, db: { map: "my_integer" } }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      posts: relationship({ ref: "Post.author", many: true }),

      // a User can add many movies to a wishlist
      //wishlist: relationship({ ref: "Movie.title", many: true }),

      // a User can watch many movies
      //watched: relationship({ ref: "Movie.title", many: true }),

      // UserPreference to personalize a Slop experience
      // preference: relationship({ ref: "Preference.id", many: true}),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" },
      }),
      lastLoginDate: timestamp({
        // this sets the timestamp to Date.now() when the user was last active
        defaultValue: { kind: "now" },
      }),
    },
  }),

  Post: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our Post list
    fields: {
      title: text({ validation: { isRequired: true } }),

      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),

      // with this field, you can set a User as the author for a Post
      author: relationship({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: "User.posts",

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true,
        },

        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false,
      }),

      // with this field, you can add some Tags to Posts
      tags: relationship({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: "Tag.posts",

        // a Post can have many Tags, not just one
        many: true,

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] },
        },
      }),
    },
  }),

  // this last list is our Tag list, it only has a name field for now
  Tag: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true,
    },

    // this is the fields for our Tag list
    fields: {
      name: text(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: relationship({ ref: "Post.tags", many: true }),
    },
  }),

  Movie: list({
    access: allowAll,

    fields: {
      // author: relationship({ ref: "User.movies", many: false }), //should this be false or true?
      title: text({ validation: { isRequired: true } }),
      sortTitle: text({ validation: { isRequired: true } }), //is this needed? Can we sort by title?
      tomatoScore: integer({
        defaultValue: 0,
        db: { map: "my_tomatoScore" },
        validation: {
          isRequired: true,
        },
        isIndexed: "unique",
      }), //are all these fields needed?
      runtime: integer({ defaultValue: 0, db: { map: "my_runtime" } }),
      releaseYear: integer({ defaultValue: 0, db: { map: "my_releaseYear" } }),
      handicap: integer({ defaultValue: 0, db: { map: "my_handicap" } }),
      description: text({ validation: { isRequired: true } }),
      decade: integer({ defaultValue: 0, db: { map: "my_decade" } }),
      // images: image({ storage: 'local' }), //question about this, how will this work?
      //need keywords to hold an array of strings 
      //could have used keyword but then the relationship would only be 1-way
      // keywords: relationship({ ref: "Keyword.keywords", many: true }),
    howToWatch: text({ validation: { isRequired: true } }),
    },
  }),
};
