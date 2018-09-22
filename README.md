# weeb
weeb is a fast, zero-dependency weeb.sh wrapper that stays faithful to the official docs.

## how to use

```javascript
const weeb = require('weeb');
weeb.login('Token', 'BotName/Version');

weeb.tophRandom('awoo', {'nsfw': 'false'}).then(res => {
    console.log(res.url); // will return the url of the image
});
```

## methods

### tophRandom(endpoint, options)
`/images/random`
Returns: Image\<Object>

### tophTypes(options)
`/images/types`
Returns: \<Object>

### tophTags(options)
`/images/tags`
Returns: \<Object>

### tophInfo(imageId)
`/info/:image_id`
Returns: Image\<Object>
