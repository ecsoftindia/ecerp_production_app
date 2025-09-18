import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor() { }
  encode(val: any) {
    return new Promise((resolve) => {
      const obj = {
        data: val,
      };

      let response = encodeURIComponent(btoa(JSON.stringify(obj)));
      // console.log(response);
      resolve(response);
    });
  }

  decode(val: any) {
    return new Promise((resolve) => {
      const urlJson = atob(decodeURIComponent(val));
      const urlValue = JSON.parse(urlJson);
      resolve(urlValue.data);
    });
  }
}

// export class UrlService {
//   constructor() {}

//   // Encode any value safely
//   encode(val: any) {
//     return new Promise<string>((resolve) => {
//       const obj = { data: val };
//       const jsonStr = JSON.stringify(obj);

//       // Convert UTF-8 string to base64 safely
//       const base64 = btoa(unescape(encodeURIComponent(jsonStr)));

//       // URI encode to make it safe for URLs
//       const response = encodeURIComponent(base64);
//       resolve(response);
//     });
//   }

//   // Decode any value safely
//   decode(val: any) {
//     return new Promise<any>((resolve) => {
//       try {
//         // URI decode, then base64 decode, then parse JSON
//         const base64 = decodeURIComponent(val);
//         const jsonStr = decodeURIComponent(escape(atob(base64)));
//         const obj = JSON.parse(jsonStr);
//         resolve(obj.data);
//       } catch (err) {
//         console.error('Decode error:', err);
//         resolve(null); // fallback
//       }
//     });
//   }
// }
