/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class MediaFactory {
  constructor(data, type, likeId) {
    if (type === 'image') {
      new CreateImageCard(likeId).createMedia(data)
    } else if (type === 'video') {
      new CreateVideoCard(likeId).createMedia(data)
    } else {
      throw 'Unknown type format'
    }
  }
}
