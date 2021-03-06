const buildCalendar = (essdoc, minView, maxView) => {
  return new Promise((resolve, reject) => {
    let promiseBucket = [];
    let placeholder = []; //return array
    minView &&
      essdoc.forEach((doc, index, arr) => {
        let diff = new Date(maxView) - new Date(minView);
        let oneDay = 1000 * 60 * 60 * 24;
        let offset = Math.floor(diff / oneDay);
        if (!doc.repeat && doc.zipcode) {
          placeholder = [...placeholder, doc];
        } else {
          if (doc.date.daily) promiseBucket.push(daily(doc, minView, offset))
          else if (doc.date.ww != undefined) promiseBucket.push(weekly(doc, minView, offset, maxView))
          else if (doc.date.dd && !doc.date.mm) promiseBucket.push(monthly(doc, minView, maxView))
          else if (doc.date.dd && doc.date.mm) promiseBucket.push(yearly(doc, minView, maxView))
          else reject("Geen doc.date gevonden");
        }
      });
    Promise.all(promiseBucket).then(all => {
      all.forEach(ghosts => ghosts.forEach(obj => placeholder.push(obj)))
      resolve(placeholder);
    })
  });
};

// daily
const daily = (doc, min, offset) => {
  return new Promise((resolve, reject) => {
    if (!doc) reject("Doc niet gevonden");
    let bucket = [];
    for (let i = 1; i <= offset; i++) {
      const zipghost = new Date(min).setDate(new Date(min).getDate() + i);
      const zipcode = createZipcode(zipghost, doc);
      const zipcodeEnd = createZipcodeEnd(zipghost, doc);
      const newDoc = { ...doc, zipcode, zipcodeEnd, id: doc.id };
      bucket = [...bucket, newDoc];
    }
    resolve(bucket);
  });
};

// weekly
const weekly = (doc, min, offset, max) => {
  return new Promise((resolve, reject) => {
    if (!doc) reject("Doc niet gevonden");
    let bucket = [];
    let dayOffset = doc.date.ww - new Date(min).getDay() + 1;
    let minOffset = new Date(min).setDate(new Date(min).getDate() + dayOffset);
    for (let i = 0; i < offset / 7; i++) {
      const zipghost = new Date(minOffset).setDate(
        new Date(minOffset).getDate() + 7 * i
      );
      const zipcode = createZipcode(zipghost, doc);
      const zipcodeEnd = createZipcodeEnd(zipghost, doc);
      const newDoc = { ...doc, zipcode, zipcodeEnd, id: doc.id };
      if (zipghost < max && min < zipghost) bucket = [...bucket, newDoc];
    }
    resolve(bucket);
  });
};

// monthly
const monthly = (doc, min, max) => {
  return new Promise((resolve, reject) => {
    if (!doc) reject("Doc niet gevonden");

    let bucket = [];
    let offset =
      (new Date(max).getMonth() - new Date(min).getMonth()) *
      (new Date(max).getFullYear() - new Date(min).getFullYear() + 1);
    for (let i = 0; i < offset; i++) {
      const zipghost = new Date(min).setDate(doc.dd);
      const zipcode = createZipcode(zipghost, doc);
      const zipcodeEnd = createZipcodeEnd(zipghost, doc);
      const newDoc = { ...doc, zipcode, zipcodeEnd, id: doc.id };
      bucket = [...bucket, newDoc];
    }
    resolve(bucket);
  });
};

// yearly
const yearly = (doc, min, max) => {
  return new Promise((resolve, reject) => {
    if (!doc) reject("Doc niet gevonden");
    let bucket = [];
    let check = dateInRange(min, max, doc.date);
    let calOffset = new Date(max).getFullYear() - new Date(min).getFullYear();
    let offset = check ? calOffset >= 1 || 1 : 0;

    for (let i = 0; i < offset; i++) {
      const zipghost = new Date(max).setMonth(doc.date.mm - 1, doc.date.dd);
      const zipcode = createZipcode(zipghost, doc);
      const zipcodeEnd = createZipcodeEnd(zipghost, doc);
      const newDoc = { ...doc, zipcode, zipcodeEnd, id: doc.id };
      bucket = [...bucket, newDoc];
    }
    resolve(bucket);
  });
};

const createZipcode = (zipghost, doc) => {
  return new Date(zipghost).setHours(
    doc.time ? doc.time.start[0] : 0,
    doc.time ? doc.time.start[1] : 0
  );
};

const createZipcodeEnd = (zipghost, doc) => {
  return new Date(zipghost).setHours(
    doc.time ? doc.time.end[0] : 0,
    doc.time ? doc.time.end[1] : 0
  );
};

const dateInRange = (min, max, date) =>
  new Date(min) <= new Date(new Date(max).getFullYear(), date.mm - 1, date.dd, 0, 0, 0) &&
  new Date(new Date(max).getFullYear(), date.mm - 1, date.dd, 0, 0, 0) <= new Date(max);

export default buildCalendar;
