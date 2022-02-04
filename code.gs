/**
 * Create YouTubeVideo object.
 * @param {String} YouTube video link
 * @return {Object} YouTubeVideo
 */
function video(url) {
  // url format check
  if (url.search(/youtube.com|youtu.be/) > -1) return new YouTubeVideo(url);
  else throw new Error('InvalidURL');
}

class YouTubeVideo {
  constructor(url) {
    this.url = url;
    this.meta = this.init_();

    if(this.meta) {
      this.info = this.meta[0].slimVideoInformationRenderer;
      this.btn = this.meta[1].slimVideoActionBarRenderer.buttons[0].slimMetadataToggleButtonRenderer;
      this.owner = this.meta[2].slimOwnerRenderer;
    }
  }

  /**
   * fetch data and preprocessing
   * @return {Object} meta data
   */
  init_() {
    const rawData = UrlFetchApp.fetch(this.url).getContentText('UTF-8');

    // keep JSON data needed only
    let json = rawData.match(/\\x7b\\x22slimVideoMetadataSectionRenderer[\W\w]*?\\x22itemSectionRenderer\\x22/)[0];

    // prevent parsing fail of JSON strings
    json = json.replace(/\\x7b/g, '{').replace(/\\x7d/g, '}')
          .replace(/%25/g, '%').replace(/\\x5b/g, '[').replace(/\\x5d/g, ']')
          .replace(/\\x22/g, '"').replace(/\\x3d|%3D/g, '=').replace(/%23/g, '#')
          .replace(/%26|\\\\u0026/g, '&').replace(/%3A/g, ':').replace(/%2F/g, '/')
          .replace(/%3F/g, '_').replace(',{"itemSectionRenderer"', '');

    json = JSON.stringify(json).replace(/\\/g, '');
    // remove double quote at the start & end
    json = json.slice(1, json.length - 1);
    
    try {
      json = JSON.parse(json);
      json = json.slimVideoMetadataSectionRenderer.contents;
    }
    catch(error) {
      // do nothing
    }

    return json;
  }

  /**
   * @return {String} title of YouTube video
   */
  title() { return this.info.title.runs[0].text; }

  /**
   * @return {String} views count of YouTube video
   */
  views() { return this.info.collapsedSubtitle.runs[0].text; }

  /**
   * @return {String} likes count of YouTube video
   */
  likes() { return this.btn.button.toggleButtonRenderer.defaultText.runs[0].text; }

  /**
   * @return {String} channel name of YouTube video
   */
  chName() { return this.owner.channelName; }

  /**
   * @return {String} channel url of YouTube video
   */
  chUrl() { return this.owner.channelUrl; }

  /**
   * @return {String} channel avatar(small, 48x48) url of YouTube video
   */
  chAvatarS() { return this.owner.thumbnail.thumbnails[0].url; }

  /**
   * @return {String} channel avatar(medium, 88x88) url of YouTube video
   */
  chAvatarM() { return this.owner.thumbnail.thumbnails[1].url; }

  /**
   * @return {String} channel avatar(large, 176x176) url of YouTube video
   */
  chAvatarL() { return this.owner.thumbnail.thumbnails[2].url; }

  /**
   * @return {String} channel subscribers count of YouTube video
   */
  chSubscribers() { return this.owner.collapsedSubtitle.runs[0].text; }
}