
Thumbnails = {}

/**
 * Thumbnails.pdf(imageTag,url,options)
 *
 * @imageTag {Element} - A html image element
 * @url {String} - The url to the pdf resource (must support CORS)
 * @options {Object} - Any of the options below:
 *    cache {Boolean} - Whether to retrieve the image from localStorage
 *    height {Number} - The height of the image in pixels (defaults to 50% of original height)
 *    width {Number} - The width of the image in pixels (defaults to 50% of original width);
 *    page {Number} - The pdf page to extract for thumbnail
 *
 * @returns {Null}  
 */
Thumbnails.pdf = function(imageTag,url,options){
  var self = this;
  var cache = amplify.store;
  var defaults = {
    'page':1,
    'cache':true
  }
  options = _.extend({},defaults,options)

  // Warn users about pdf.js
  if (typeof PDFJS !== 'undefined') {
    console.log("Thumbnails requires a working version of pdf.js to be available on the client");
    console.log("We explicitly included pdf.js in the dependencies, because you may have already included it");
    console.log("Run `Meteor install pascoual:pdfjs` to fix this error");
    throw new Error("A working version of PDF.js must be available on the client")
  }

  function _getThumbnailViewport(page){
    // Get a correctly scaled pdfjs viewport for thumbnail creation
    var scale;
    if (options && options.width){
      scale = options.width / page.getViewport(1.0).width;
    } else if (options && options.height){
      scale = options.height / page.getViewport(1.0).height;
    } else {
      scale = 0.5;
    }
    return page.getViewport(scale);
  }


  function _getThumbnailSrc(url,callback){
    // Pass a base64 encoded thumbnail to callback
    console.log('Making thumbnail for: ',url)
    PDFJS.getDocument(url).then(function(pdf){

      pdf.getPage(options.page).then(function(page) {
        var viewport = _getThumbnailViewport(page,options);
        var canvas = $('<canvas id="box">').get(0);
        var ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };

        page.render(renderContext).then(function(){
          //set to draw behind current content
          ctx.globalCompositeOperation = "destination-over";

          //set background color
          ctx.fillStyle = "#ffffff";

          //draw background / rect on entire canvas
          ctx.fillRect(0,0,canvas.width,canvas.height);
          callback(canvas.toDataURL());
        });
      });
    });
  }


  function _getCachedThumbnail(url,callback){
    // Pass a base64 encoded thumbnail to the callback
    // The img will be fetched from the cache if it is available
    var hash = SHA256(url);
    var data = cache(hash);
    if (data && options.cache){
      callback(data);
    } else {
      _getThumbnailSrc(url,function(data){
        cache(hash,data);
        callback(data);
      });
    }
  }

  // Replace the element source with data string
  // The element can either be a jQuery object or a html element
  // The data string will be fetched from the cache if it is available
  _getCachedThumbnail(url,function(data){
    if (jQuery && imageTag instanceof jQuery){
      imageTag = imageTag.get(0);
    }
    imageTag.src = data;
  });
}


