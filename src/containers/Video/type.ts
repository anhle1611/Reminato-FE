export type Video = {
    id: number,
    title: string,
    url: string,
    like: number,
    dislike: number,
    description: string,
    user_share: { name: string },
    likes: userLike[]
};

type userLike = {id: number, name: string, category: number}
export interface IVideoState {
    videos: Array<Video>;
    totaPage: number,
    totalObjects: number,
    popupCreate: boolean
}