import * as z from 'zod';

const songSchema = z.object({
    text: z.string(),
    tracks: z.string()
        .max(1000)
        .nonempty()
        .transform(data => data
            .split('\r\n')
            .filter(track => track !== '')
        )
        .pipe(z.array(z.string()).length(1))
        .transform(data => {
            const [artist, title] = data[0].split(' - ');
            return {artist, title};
        })
        .pipe(z.object({artist: z.string().nonempty(), title: z.string().nonempty()})),
})
   .transform(({tracks, ...rest}) => ({type: 'song', ...tracks, ...rest}))

const playlistSchema = z.object({
    text: z.string(),
    tracks: z.string()
        .max(1000)
        .nonempty()
        .transform(data => data
            .split('\r\n')
            .filter(track => track !== '')
        )
        .transform(data => data.map(track => {
            const [artist, title] = track.split(' - ');
            return {artist, title};
        }))
        .pipe(z.array(z.object({artist: z.string().nonempty(), title: z.string().nonempty()})).min(1).max(20)),
})
    .transform(data => ({type: 'playlist', ...data}));

const textSchema = z.object({
    text: z.string()
        .nonempty(),
    tracks: z.string()
        .length(0)
        .optional(),
})
    .transform(({tracks, ...rest}) => ({type: 'text', ...rest}));

export const schema = z.object({
    text: z.string()
        .trim()
        .max(1000)
        .transform(data => data.replaceAll('\r\n', '\n')),
    tracks: z.string()
        .trim()
        .optional(),
})
    .pipe(z.union([songSchema, playlistSchema, textSchema]));

export function handler(data) {
    return data;
}
