// import {appSchema,tableSchema} from '@nozbe/watermelondb'

// export const mySchema=appSchema({
//     version:1,
//     tables:[
//         tableSchema({
//             name:'profile',
//             columns:[
//                 {name:'uuid',type:'string'},
//                 {name:'first_name',type:'string'},
//                 {name:'last_name',type:'string'},
//                 {name:'email',type:'string'},
//                 {name:'phone',type:'string'},
//                 {name:'reference_code',type:'string'},
//                 {name:'currency',type:'number'},
//                 {name:'img',type:'string'}
//             ]
//         }),
//         // tableSchema({
//         //     name:'contacts'
//         // }),
//         // tableSchema({
//         //     name:'contacts'
//         // })
//     ]
// })
// schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb";
 
export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "movies",
      columns: [
        { name: "title", type: "string" },
        { name: "poster_image", type: "string" },
        { name: "genre", type: "string" },
        { name: "description", type: "string" },
        { name: "release_date_at", type: "number" }
      ]
    }),
    tableSchema({
      name: "reviews",
      columns: [
        { name: "body", type: "string" },
        { name: "movie_id", type: "string", isIndexed: true }
      ]
    })
  ]
});
