if(!window.EEA){
  var EEA = {version: '1.0'};
}

EEA.ImagePreview = function(context, options){
  var self = this;
  self.context = context;
  self.settings = {};

  if(options){
    jQuery.extend(self.settings, options);
  }

  self.initialize();
};

EEA.ImagePreview.prototype = {
  initialize: function(context){
    var self = this;

    if(self.context.parents('a').length){
        return;
    }

    if(self.context.attr('src').indexOf('badge/icon')!==-1){
      return;
    }

    self.preview = jQuery('#bootstrap-image-preview');
    if(!self.preview.length){
      self.initPreview();
    }

    self.context.wrap(
      jQuery('<a>')
        .attr('href', self.context.attr('src'))
        .attr('rel', '#bootstrap-image-preview')
    );

    self.context.parent().overlay({
      onBeforeLoad: function() {
        var wrap = this.getOverlay().find("img");
        wrap.attr('src', this.getTrigger().attr("href"));
      }
    });
  },

  initPreview: function(){
    self.preview = jQuery('<div>')
      .attr('id', 'bootstrap-image-preview').append(
      jQuery('<img>')
        .attr('alt', 'Image preview')
      ).appendTo('body');
  }
};

jQuery.fn.EEAImagePreview = function(options){
  return this.each(function(){
    var context = jQuery(this);
    var preview = new EEA.ImagePreview(context, options);
    context.data('EEAImagePreview', preview);
  });
};

EEA.Videos = function(context, options){
  var self = this;
  self.context = context;
  self.settings = {

  };

  if(options){
    jQuery.extend(self.settings, options);
  }

  self.initialize();
};

EEA.Videos.prototype = {
  initialize: function(){
    var self = this;
    var api_key = "AIzaSyAJ8UVYKjhX9AmrTwBAfJIXnbnVlPaDxRQ";
    jQuery.getJSON(
      'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLVPSQz7ahsBwOAgP4DOZOWwwgpMvJifEn&order=date&key=' + api_key + '&maxResults=5',
      function(data){
        self.context.empty();
        jQuery.each(data.items, function(idx, item){
          if(idx >= 5){
            return false;
          }
          snippet = item.snippet;
          link = "http://www.youtube.com/watch?v=" + snippet.resourceId.videoId;
          jQuery([
            '<div class="video-gallery">',
              '<a target="_blank" class="image" href=', link, '">',
                '<img src="', snippet.thumbnails['default'].url, '" />',
              '</a>',
              '<div>',
                '<a target="_blank" class="title" href="', link, '">',
                  '<span class="title">', snippet.title, '</span>',
                '</a>',
                '<p class="description">', snippet.description, '</p>',
              '</div>',
            '</div>'
          ].join('\n')).appendTo(self.context);
        });
      }
    );
  }
};

jQuery.fn.EEAVideos = function(options){
  return this.each(function(){
    var context = jQuery(this);
    var adapter = new EEA.Videos(context, options);
    context.data('EEAVideos', adapter);
  });
};

// Run EEAImagePreview on all images
jQuery(document).ready(function(){
  jQuery('div.section img').EEAImagePreview();
  jQuery('div.youtube-videos').EEAVideos();
});
