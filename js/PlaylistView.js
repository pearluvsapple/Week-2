define(['jquery', 'Playlist'], function ($, Playlist){
  var PlaylistView = function(){
    // initialize
    this.playlist = JSON.parse(sessionStorage.getItem('playlist')) || [];
    this.listenAddSong();
    this.updatePlaylist();

  };
  PlaylistView.prototype.listenAddSong = function(){
    var that = this;
    $('#addSongForm').on('submit', function(event){
      that.addSong($('#song').val());
      $('#song').val('');

      return false;
    });
  };

  PlaylistView.prototype.updatePlaylist = function() {
    sessionStorage.setItem('playlist', JSON.stringify(this.playlist));
    this.updatePlaylistDom();
  };

  PlaylistView.prototype.updatePlaylistDom = function(){
    var that = this;
    var playlistDom = this.playlist.map(function(song, index){
      var removeButton = document.createElement("button");
      removeButton.appendChild(document.createTextNode("remove"));
      $(removeButton).click(function(){
        that.removeSong(index);
      });
      $(removeButton).addClass("btn");

      var li = document.createElement('li');
      li.appendChild(document.createTextNode(song));
      li.appendChild(removeButton);
      return li;
    });

    $('#currentPlaylist').html(playlistDom);

  };
  return PlaylistView;
});
