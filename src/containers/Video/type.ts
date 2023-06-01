export type Video = {
    id: number,
    title: string,
    url: string,
    like: number,
    dislike: number,
    description: string,
    user_share_video: string,
    user_like: string,
    like_category: number
};

type userLike = {id: number, name: string, category: number}
export interface IVideoState {
    videos: Array<Video>;
    totaPage: number,
    totalObjects: number,
    popupCreate: boolean
}