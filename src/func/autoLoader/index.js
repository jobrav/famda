// import fetch from "../fetch";
// import buildCalendar from "../buildCalendar";
// import React, { useState } from "react";
// import chunk from "../chunk";

// //create infinit wall
// // start and end zipcode of the chunks in array
// export let chunkBorder = [];
// // all the render objects saved by start_end zipcode of the chunk
// export let chunks = {};

// // how many docs are there around the startingpoint
// let topBuffer = 0;
// let bottomBuffer = 0;
// const autoLoader = (sourceGroup, startRequest, __bottom) => {
//   return new Promise(resolve => {
//     // let chunkSize = 3;
//     // let bottomRange = 0;
//     // let topRange = 0;
//     // let bottom = __bottom;
//     // let startingPoint = startRequest ? new Date(startRequest) : new Date();

//     // const create = () => {
//     //   let border = createBorders(
//     //     startingPoint,
//     //     bottomRange,
//     //     topRange,
//     //     chunkSize,
//     //     bottom
//     //   );

//     //   createChunk(
//     //     sourceGroup,
//     //     border.min,
//     //     border.max,
//     //     startingPoint,
//     //     bottom
//     //   ).then(() => {
//     //     if (bottomBuffer >= 15 && topBuffer >= 15) {
//     //       resolve({ chunks, chunkBorder });
//     //     } else {
//     //       bottom ? (bottomRange += chunkSize) : (topRange += chunkSize);
//     //       bottom = bottomBuffer < 15;
//     //       // console.log(bottom);
//     //       create();
//     //     }
//     //   });
//     // };
//     // //firt hook
//     // create();
//   });
// };

// const createChunk = (sourceGroup, minView, maxView, startingPoint, bottom) => {
//   return new Promise(resolve => {

//     let newChunk = chunk(minView, maxView, sourceGroup)
//     newChunk.create().then(_ => {

//       if (!chunks[`${minView}_${maxView}`]) {
//         bottom
//           ? chunkBorder.push({ minView, maxView })
//           : chunkBorder.unshift({ minView, maxView });
//       }

//       chunks[`${minView}_${maxView}`] = newChunk;
//       let chunkSize = newChunk.length();

//       if (minView < startingPoint && startingPoint < maxView) {
//         filter(startingPoint.valueOf(), `${minView}_${maxView}`).then(
//           buffer => {
//             topBuffer = buffer;
//             bottomBuffer = chunkSize - buffer;
//             resolve(null);
//           }
//         );
//       } else {
//         bottom ? (bottomBuffer += chunkSize) : (topBuffer += chunkSize);
//         resolve(null);
//       }
//     });
//   })
// };

// export const updateChunk = (sourceGroup, minView, maxView) => {
//   return new Promise(resolve => {
//     // createAgenda(sourceGroup, minView, maxView).then(val => {
//     //   chunks[`${minView}_${maxView}`] = val;
//     resolve(null);
//     // });
//   });
// };

// const createBorders = (
//   startingPoint,
//   bottomRange,
//   topRange,
//   chunkSize,
//   bottom
// ) => {
//   let startMonth = new Date(startingPoint).getMonth();
//   let startDate = new Date(startingPoint).getDate();

//   // console.log(startMonth, startDate , topRange, bottomRange);
//   let topMinBorder = new Date(startingPoint).setMonth(startMonth - topRange - chunkSize, startDate + 1)

//   let topMaxBorder = new Date(startingPoint).setMonth(startMonth - topRange)

//   let bottomMinBorder = new Date(startingPoint).setMonth(startMonth + bottomRange, startDate + 1)

//   let bottomMaxBorder = new Date(startingPoint).setMonth(startMonth + bottomRange + chunkSize)



//   // console.log(topMinBorder, topMaxBorder, bottomMinBorder, bottomMaxBorder);

//   let minView = bottom ? bottomMinBorder : topMinBorder;
//   let maxView = bottom ? bottomMaxBorder : topMaxBorder;
//   let min = new Date(minView).setHours(0, 0, 0, 0)
//   let max = new Date(maxView).setHours(23, 59, 59, 99)
//   return { min, max };
// };

// const filter = (zipcode, code) => {
//   return new Promise(resolve => {
//     chunks[code].getRender().forEach((doc, index) => {
//       if (
//         new Date(doc.zipcode).setHours(0, 0, 0) >
//         new Date(zipcode).setHours(0, 0, 0)
//       ) {
//         resolve(index);
//       }
//     });
//   });
// };
// const createAgenda = (sourceGroup, minView, maxView) => {
//   return new Promise(resolve => {
//     // console.log("request");
//     let createObj = chunk(minView, maxView, sourceGroup)
//     createObj.create().then(val => resolve(val))
//     // fetch(sourceGroup, minView, maxView)
//     //   .then(cacheDocs => buildCalendar(cacheDocs.essdoc, minView, maxView))
//     //   .then(val => resolve(val));
//   });
// };
// export default autoLoader;
