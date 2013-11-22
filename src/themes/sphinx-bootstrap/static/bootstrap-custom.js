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

// Run EEAImagePreview on all images
jQuery(document).ready(function(){
  jQuery('div.section img').EEAImagePreview();
});
