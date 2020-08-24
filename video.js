class HeroVideo {
    constructor() {
        var video_tag = document.getElementById("video-youtube");
        var yt_id = video_tag
            ? video_tag.getAttribute("data-youtube-id")
            : "";

        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.tv = "";

        var playerDefaults = { autoplay: 0, autohide: 0, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 1, iv_load_policy: 3 };

        var vid = [
            { 'videoId': yt_id, 'startSeconds': 0, 'endSeconds': 105, 'suggestedQuality': 'hd720' }
        ];

        var self = this;

        window.onYouTubePlayerAPIReady = function () {
            self.tv = new YT.Player('video-youtube', { events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }, playerVars: playerDefaults });
        }

        window.onPlayerStateChange = function (e) {
            if (e.data === 1) {
                self.vidRescale();

               setTimeout(function() {
                    $('.video-hero .cover').removeAttr('style');
                    $('#video-youtube').addClass('active');
                    $(".control-buttons").show();
                }, 1000);
            } else if (e.data === 0) {
                tv.seekTo(vid[0].startSeconds)
            }
        }

        window.onPlayerReady = function () {
            self.tv.loadVideoById(vid[0]);
            //self.tv.mute();
        }

        $(window).on('resize', function(){
            self.vidRescale();
        });
        
        this.bindEvents();
    }

    playPause() {
        var mediaPlayer = this.tv;
        //YT.PlayerState.PLAYING
        if (mediaPlayer.getPlayerState() != 1) {
            mediaPlayer.playVideo();
            document.getElementById("play-button").classList.add("active");
        } else {
            mediaPlayer.pauseVideo();
            document.getElementById("play-button").classList.remove("active");
        }
    }

    bindEvents() {
        var mediaPlayer = this.tv;

        var playButton = document.getElementById("play-button");
        playButton.classList.add("active");

        var self = this;

        playButton.addEventListener("click", function () {
            self.playPause();
        });
        
        $(".control-buttons").hover(function () {
            $(".control-buttons").show();
          }, function () {
            $(".control-buttons").hide();
        });
    }

    vidRescale() {
        var self = this;

        console.log("tv: "+this.tv);

        var w = $(window).width()+200,
        h = $(window).height()+200;

        if (w/h > 16/9){
            self.tv.setSize(w, w/16*9);
            $('#video-youtube').css({'left': '0px'});
        } else {
            self.tv.setSize(h/9*16, h);
            $('#video-youtube').css({'left': -($('#video-youtube').outerWidth()-w)/2});
        }
    }

    init() {
        var self = this;

        $(window).on('load resize', function () {
            self.vidRescale();
        });

        $('.hi span').on('click', function () {
            $('#video-youtube').toggleClass('mute');
            if ($('#video-youtube').hasClass('mute')) {
                //this.tv.mute();
                $(this).siblings('i').html('unmute');
            } else {
                //this.tv.unMute();
                $(this).siblings('i').html('mute');
            }
        });
    }
}


window.addEventListener('load', (event) => {
    var video = new HeroVideo();
});
