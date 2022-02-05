![](https://img.shields.io/github/license/laplacetw/Apps-Script-SubTube)
# Apps-Script-SubTube
Lowering quota usage of YouTube Data API with UrlFetchApp service on GAS.

## Table of Contents
  - [About](#about)
  - [Usage](#usage)
  - [Document](#document)

## About
Due to my side project [HoloDDer](https://github.com/laplacetw/HoloDDer), I notice that the big costs of search with YouTube Data API. Projects that enable the YouTube Data API have a default [quota](https://developers.google.com/youtube/v3/getting-started#quota) allocation of 10,000 units per day. Different types of operations have different quota costs. For example:
  - A read operation that retrieves a list of resources -- channels, videos, playlists -- usually costs 1 unit.
  - A write operation that creates, updates, or deletes a resource usually has costs 50 units.
  - A search request costs 100 units.
  - A video upload costs 1600 units.

There are some requests for searching video info with YouTube link in the side project which will results in exceeding YouTube Data API quota limit. So I spend a little time to implement it with `UrlFetchApp` service.

Search By       |YouTube Data API       |UrlFetchApp
:--------------:|:---------------------:|:-------------------:
 costs / limits |  100 / 10,000 per day |  1 / 20,000 per day

If you have Google Workspace account, the [quota](https://developers.google.com/apps-script/guides/services/quotas) of UrlFetchApp will be 100,000 per day.

## Usage
Script ID: `15wcYYK_3nUaq9UpCzYh_fNSomaSF0MVNXi2bWRqeb6AUenpHk6UWihnR`

Create YouTubeVideo object.
```js
//const video = SubTube.video("https://www.youtube.com/watch?v=NyI6JILCjVA");
const video = SubTube.video("https://youtu.be/NyI6JILCjVA");
```

Value of video.meta will be `false` with fetch failure.
```js
if(video.meta) console.log(video.title());
```

## Document

### Function
  - video(): Create YouTubeVideo object.

### Object
  - YouTubeVideo
    - Properties
      - url: video url
      - meta: JSON object
    - methods
      - title(): @return {String} title of YouTube video
      - views(): @return {String} views count of YouTube video
      - likes(): @return {String} likes count of YouTube video
      - chName(): @return {String} channel name of YouTube video
      - chUrl(): @return {String} channel url of YouTube video
      - chAvatarS(): @return {String} channel avatar(small, 48x48) url of YouTube video
      - chAvatarM(): @return {String} channel avatar(medium, 88x88) url of YouTube video
      - chAvatarL(): @return {String} channel avatar(large, 176x176) url of YouTube video
      - chSubscribers(): @return {String} channel subscribers count of YouTube video