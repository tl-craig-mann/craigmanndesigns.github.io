import React, { useEffect, useState, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import InstaGrid from "./insta_grid";

const InstaFeed = ({ blok }) => {
  const [instaItems, setInstaItems] = useState([]);

  const userId = "6348432841911010";
  const accessToken =
    "IGQWRQWHEwdHJsN04zaTgtU2xOVjhJTGt1aGxPRWhBM3JwVlJxX0VxbW15NHVYTWttdWF5N2xaWENqSDJRQ3FlcWFweXNVcTZA3TEFhSUlXNkc3VjBUcEZAkLWdPR0o2VE9aa1I5VFp3SmxrMkxGTzFVemJGYUpvWncZD";
  const instaUrl = `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`;

  useEffect(() => {
    const fetchMedia = async (id) => {
      const mediaUrl = `https://graph.instagram.com/${id}?access_token=${accessToken}&fields=media_url,permalink`;

      const res = await fetch(mediaUrl);
      const json = await res.json();

      const instaItem = {
        permalink: json.permalink,
        mediaUrl: json.media_url,
      };
      return instaItem;
    };
    const doFetch = async () => {
      if (!userId || !accessToken) {
        console.log("userId or accessToken is undefined: ", {
          userId,
          accessToken,
        });
        return;
      }
      const res = await fetch(instaUrl);
      const json = (await res.json()).data;

      const fetchedItems = [];

      if (json != undefined) {
        for (let i = 0; i < json.length && i < 9; i++) {
          const item = json[i];
          const itemId = item.id;

          const instaItem = await fetchMedia(itemId);
          fetchedItems.push(instaItem);
        }
      }
      setInstaItems(fetchedItems);
    };
    doFetch();
  }, [userId, accessToken, instaUrl]);

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} className={clsx()}>
      <InstaGrid items={instaItems} />
    </div>
  );
};

export default InstaFeed;
