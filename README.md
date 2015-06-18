# Thumbnails
Generate thumbnails for web resources from the Meteor Client.  Storing thumbnails on the webserver is inconvenient and in some cases costly. Thumbnails generates thumbnails on the client and caches them in the browser localStorage. Currently, this package only supports the generation of pdf thumbnails.

## Usage
Thumbnails can be installed from Atmosphere
```js
Meteor add maxkferg:thumbnails
```
### Thumbnails.pdf(imageTag,url,options)
Replace the contents of an image tag with a thumbnail<br>
@imageTag - A html image element<br>
@url - The url to the pdf resource (must support CORS)<br>
@options - Any of the options below:<br>
* cache (Boolean) - Whether to retrieve the image from localStorage
* height - The height of the image in pixels (defaults to 50% of original height)
* width - The width of the image in pixels (defaults to 50% of original width);
* page - The pdf page to extract for thumbnail

Note: the scale of the thumbnail is always preserved, so you can only specify one of height/width

### Thumbnails.image(imageTags,url,options)
Pull requests welcome

### Thumbnails.webpage(imageTags,url,options)
Pull requests welcome

## License
MIT
