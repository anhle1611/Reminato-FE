export function Iframe({ url }: { url: string }) {
    return (<div dangerouslySetInnerHTML={ {__html: `<iframe src="${url}" width="100%" height="100%"></iframe>`}} />);
}