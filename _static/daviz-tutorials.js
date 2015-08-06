jQuery(document).ready(function(){
  jQuery("img[src='http://eea.github.io/_images/eea.daviz.cover.png']").parent().remove()
  jQuery("<div>")
    .attr("id", "daviz-tutorials")
    .insertBefore(jQuery("#eea-daviz").find("#contents"));
  jQuery("<div>")
    .css("clear", "both")
    .insertBefore(jQuery("#eea-daviz").find("#contents"));
  jQuery("#daviz-tutorials").DavizTutorials();
});

if(window.DavizEdit === undefined){
  var DavizEdit = {'version': '4.0'};
}

DavizEdit.DavizTutorials = function(context, options){
    var self = this;
    self.context = context;
    self.initialize(options);
};

DavizEdit.DavizTutorials.prototype = {
    initialize: function(options){
        var self = this;
        this.context.addClass("daviz-tutorials");

        jQuery("<iframe>")
            .attr("width", 700)
            .attr("height", 380)
            .attr("frameborder", 0)
            .attr("allowfullscreen", true)
            .attr("src", "")
            .appendTo(this.context);

        jQuery("<div>")
            .addClass("daviz-tutorials-search")
            .appendTo(this.context);

        jQuery("<div>")
            .addClass("daviz-tutorials-main-playlist-title")
            .css("height", 20)
            .appendTo(".daviz-tutorials-search");

        jQuery("<div>")
            .addClass("daviz-tutorials-main-playlist")
            .css("height", "200px")
            .appendTo(".daviz-tutorials-search");

        jQuery("<div>")
            .addClass("daviz-tutorials-tagcloud")
            .data("tags", {})
            .appendTo(".daviz-tutorials-search");

        var playlists = {"Basic tutorials":"PLVPSQz7ahsByeq8nVKC7TT9apArEXBrV0", "Advanced tutorials": "PLVPSQz7ahsBxbe8pwzFWLQuvDSP9JFn8I"};
        var api_key = "AIzaSyAJ8UVYKjhX9AmrTwBAfJIXnbnVlPaDxRQ";
        jQuery.each(playlists, function(playlist_key, playlist){
            jQuery.getJSON("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlist + "&key=" + api_key + "&maxResults=50", function(data){
                var main_playlist = self.context.find(".daviz-tutorials-main-playlist");
                var div = jQuery("<div>")
                    .addClass("daviz-tutorials-playlist")
                    .attr("playlistid", playlist)
                    .appendTo(main_playlist);
                jQuery("<div>")
                    .addClass("daviz-tutorials-videos")
                    .appendTo(".daviz-tutorials-playlist[playlistid='" + playlist + "']");
                jQuery.each(data.items, function(item_idx, item){
                    var fulldescription = item.snippet.description;
                    var tags_from_description;
                    try{
                        tags_from_description = fulldescription.split("EEA Tags:")[1].split(".")[0];
                    }
                    catch (err){
                        tags_from_description = "others";
                    }
                    if (tags_from_description === undefined){
                        tags_from_description = "others";
                    }
                    var tmp_tags = tags_from_description.split(",");
                    tmp_tags.push("All tutorials");
                    tmp_tags.push(playlist_key);
                    var tags = [];
                    for (i = 0; i < tmp_tags.length; i++) {
                        var tag = tmp_tags[i].trim();
                        if (tag !== "") {
                            tags.push(tag);
                        }
                    }
                    self.updateTagCloud(tags);
                    var img = jQuery("<img>")
                        .attr("src", item.snippet.thumbnails['default'].url);
                    var iframe = self.context.find("iframe");
                    var item_obj = jQuery("<div>")
                        .addClass("daviz-tutorials-videoitem")
                        .addClass("hidden-item")
                        .data("tags", tags)
                        .attr("videoid", item.snippet.resourceId.videoId)
                        .appendTo(".daviz-tutorials-playlist[playlistid='" + item.snippet.playlistId + "'] .daviz-tutorials-videos")
                        .click(function(){
                            jQuery(iframe)
                                .attr("src", "http://www.youtube.com/embed/"+jQuery(this).attr("videoid")+"?autoplay=1");
                            jQuery(".nowplaying")
                                .removeClass("nowplaying");
                            jQuery(this)
                                .addClass("nowplaying");
                        })
                        .prepend(img);
                    jQuery("<div>")
                        .text(item.snippet.title)
                        .appendTo(item_obj);
                });
                self.updateTutorials();
            });
        });
    },

    updateTutorials: function(tag){
        self = this;
        self.context.find(".daviz-tutorials-main-playlist").scrollTop(0);
        if ((tag === "") || (tag === undefined)){
            tag = "All tutorials";
        }

        jQuery(".daviz-tutorials-main-playlist-title")
            .text(tag);
        jQuery(".daviz-tutorials-tagcloud a")
            .removeClass("selected");
        jQuery(".daviz-tutorials-tagcloud a[tag='" + tag + "']")
            .addClass("selected");
        jQuery(".daviz-tutorials-videoitem")
            .addClass("hidden-item")
            .removeClass("nowplaying");
        self.context.find("iframe")
            .attr("src", "");
        jQuery.each(jQuery(".daviz-tutorials-videoitem"), function(idx, item){
            item = jQuery(item);
            if (jQuery.inArray(tag, item.data("tags")) !== -1) {
                if (self.context.find("iframe").attr("src") === ""){
                    item.addClass("nowplaying");
                    self.context.find("iframe")
                        .attr("src", "http://www.youtube.com/embed/"+item.attr("videoid"));
                }
                item.removeClass("hidden-item");
            }
        });
    },

    updateTagCloud: function(tags){
        self = this;
        tag_data = jQuery(".daviz-tutorials-tagcloud").data("tags");
        for (i = 0; i < tags.length; i++) {
            var tag = tags[i].trim();
            if (tag !== "") {
                if (tag_data[tag] === undefined) {
                    tag_data[tag] = 0;
                }
                tag_data[tag] ++;
            }
        }
        jQuery(".daviz-tutorials-tagcloud").data("tags", tag_data);
        var sorted_tags = [];
        jQuery.each(tag_data, function(key, value){
            sorted_tags.push({tag:key, count:value});
        });
        sorted_tags.sort(function (a,b){
            if (a.tag === 'All tutorials') {
                return -1;
            }
            if ((a.tag === 'Basic tutorials') && (b.tag !== 'All tutorials')){
                return -1;
            }
            if ((a.tag === 'Advanced tutorials') && (b.tag !== 'All tutorials') && (b.tag !== 'Basic tutorials')) {
                return -1;
            }

            if (b.tag === 'All tutorials') {
                return 1;
            }
            if ((b.tag === 'Basic tutorials') && (a.tag !== 'All tutorials')){
                return 1;
            }
            if ((b.tag === 'Advanced tutorials') && (a.tag !== 'All tutorials') && (a.tag !== 'Basic tutorials')) {
                return 1;
            }

            if (a.tag === 'intro'){
                return -1;
            }
            if (b.tag === 'intro'){
                return 1;
            }

            if (a.count > b.count) {
                return -1;
            }
            else if (a.count < b.count) {
                return 1;
            }
            else {
                if (a.tag < b.tag) {
                    return -1;
                }
                else if (a.tag > b.tag) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });
        jQuery(".daviz-tutorials-tagcloud")
            .empty();
        jQuery("<div>")
            .addClass("by-difficulty")
            .appendTo(".daviz-tutorials-tagcloud");
        jQuery("<label>")
            .text("Filter by difficulty:")
            .appendTo(".by-difficulty");
        jQuery("<ul>")
            .appendTo(".by-difficulty");

        jQuery("<div>")
            .addClass("by-topic")
            .appendTo(".daviz-tutorials-tagcloud");
        jQuery("<label>")
            .text("Filter by topic:")
            .appendTo(".by-topic");
        jQuery("<ul>")
            .appendTo(".by-topic");
        for (i=0; i<sorted_tags.length; i++){
            var container = ".daviz-tutorials-tagcloud .by-difficulty ul";
            if (i > 2){
                container = ".daviz-tutorials-tagcloud .by-topic ul";
            }
            var li = jQuery("<li>").appendTo(container);
            jQuery("<a>")
                .css("text-decoration", "none")
                .attr("tag", sorted_tags[i].tag)
                .text(sorted_tags[i].tag + "(" + sorted_tags[i].count+ ") ")
                .click(function(event){
                    self.updateTutorials(jQuery(this).attr("tag"));
                    event.preventDefault();
                })
                .appendTo(li);
        }
    }
};

jQuery.fn.DavizTutorials = function(options){
    return this.each(function(){
        var tutorials = new DavizEdit.DavizTutorials(jQuery(this), options);
    });
};
