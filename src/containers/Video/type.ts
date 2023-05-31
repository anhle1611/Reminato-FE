export type Video = {
    id: number,
    title: string,
    url: string,
    like: string,
    dislike: string,
    description: string,
    user_share: { name: string },
    likes: Array<object>
};

export interface IVideoState {
    videos: Array<Video>;
    totaPage: number,
    totalObjects: number
}