/*
 * MIT License
 *
 * Copyright (c) 2020 twlite
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { SearchOptions } from "./mod";
import { Playlist, Video, Channel, Music } from "./Structures/exports";
import Util from "./Util";

export class Formatter {
    constructor() {
        return Formatter;
    }

    public static formatSearchResultMusic(
        details: any[],
        options: { limit?: number; type?: SearchOptions['type'] } = {
            limit: 100
        }
    ) {
        const results: Array<Music> = [];

        for (let data of details) {
            if (typeof options.limit === "number" && options.limit > 0 && results.length >= options.limit) break;
            const res = Util.parseMusic(data);

            if (res)
                results.push(res);
        }

        return results;
    }

    public static formatSearchResult(
        details: any[],
        options: { limit?: number; type?: SearchOptions['type'] } = {
            limit: 100,
            type: "all"
        }
    ) {
        const results: Array<Video | Channel | Playlist> = [];

        for (let data of details) {
            if (typeof options.limit === "number" && options.limit > 0 && results.length >= options.limit) break;
            let res: Video | Channel | Playlist;
            if (options.type === "all") {
                if (!!data.videoRenderer) options.type = "video";
                else if (!!data.channelRenderer) options.type = "channel";
                else if (!!data.playlistRenderer) options.type = "playlist";
                else continue;
            }

            switch (options.type) {
                case "video":
                case "film":
                    res = Util.parseVideo(data);
                    break;
                case "channel":
                    res = Util.parseChannel(data);
                    break;
                case "playlist":
                    res = Util.parsePlaylist(data);
                    break;
            }

            if (res)
                results.push(res);
        }

        return results;
    }
}
