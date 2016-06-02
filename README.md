# <img src="https://avatars3.githubusercontent.com/u/19716078?s=100" width="100" align="absmiddle" /> @vztube/vztube-api

**Verizon**'s internal video site, called **VZTube**, is accessible from several intranet and internet domains - this library abstracts determining what domain the user can access, and makes it easier to pull a `JSON` response.

**Note**: This library assumes the user has already authenticated with Verizon's SSO application.

## Installation

```bash
$ npm install --save @vztube/vztube-api
```

(or)

```html
<script src="https://cdn.rawgit.com/raw/vztube/vztube-api/master/releases/vztube-api-latest.js"></script>
```

## Usage

### vztube.api(id, callback)

Pull a `JSON-P` response using a video's `ID` number.

```javascript
import { api } from 'vztube-api';

api('9297', (err, data) => {
  console.log(data);
});
```

The `JSON` response looks like the following:

```json
{
  "id": "9297",
  "title": "Uploading to VZTube",
  "url": "https://vztube.verizonwireless.com/9297/uploading-to-vztube",
  "source": "https://vztube.verizonwireless.com/uploads/HnUjSd4JD1sqPTIePZzB.mp4",
  "poster": "https://vztube.verizonwireless.com/uploads/thumbs/HnUjSd4JD1sqPTIePZzB.jpg",
  "captions": ["...", "...", "..."]
}
```

`vztube.api` will automatically fix the `source` attribute in the response above.

### vztube.access(domain, callback)

Determine if the user has access to the specified `domain`. Returns a `Boolean`.

```javascript
import { access } from 'vztube-api';

access('vztube.vzwcorp.com', (err, access) => {
  console.log(access);
});

```

### vztube.detect(callback)

Detect the first available VZTube domain. Responds with "vztube.vzwcorp.com", "vztube.verizonwireless.com" or "vztube.verizon.com".

```javascript
import { detect } from 'vztube-api';

detect((err, domain) => {
  console.log(domain);
});
```

### vztube.rewrite(url, callback)

Rewrite the specified `url`'s `domain` with the value returned from `vztube.detect`, leaving it otherwise intact.

```javascript
import { rewrite } from 'vztube';

rewrite('https://vztube.vzwcorp.com/videos/12345/test', (err, url) => {
  console.log(url);
});
```