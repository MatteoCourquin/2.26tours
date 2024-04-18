import Typography from '@/components/Atoms/Typography';
import CardArtist from '@/components/CardArtist';
import DetailsArtist from '@/components/DetailsArtist';
import { TypeArtist } from '@/data/types';
import { client } from '@/sanity/lib/client';
import clsx from 'clsx';
import { useState } from 'react';

export default function Artists({ artists }: { artists: TypeArtist[] }) {
  const [activeArtist, setActiveArtist] = useState<TypeArtist>(artists[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (artist: TypeArtist) => {
    if (activeArtist === artist && isOpen) {
      setIsOpen(false);
    } else {
      setActiveArtist(artist);
      setIsOpen(true);
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-2 gap-4 overflow-x-hidden px-x-large pt-header sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <Typography
        className="fixed left-[50vw] top-[50vh] z-10 -translate-x-1/2 -translate-y-1/2"
        type="heading1"
        as="heading2"
        colored={true}
      >
        Artists
      </Typography>

      {artists.map((artist, index) => (
        <CardArtist
          key={index}
          index={index}
          name={artist.name}
          className={clsx(index % 2 ? 'pb-80' : 'pt-80')}
          portrait={artist.portrait}
          genres={artist.genres}
          onClick={() => handleClick(artist)}
        />
      ))}

      {activeArtist && (
        <DetailsArtist artist={activeArtist} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const query = `
    *[_type == "artists"]{
      name,
      description,
      "portrait": portrait.asset->url,
      "genres": genres[]->{
        name
      },
      "lastMixs": lastMixs[]{
        "illustration": illustration.asset->url,
        name,
        date,
        location
      },
      "gallery": gallery[].asset->url
    }
  `;
  const artists = await client.fetch(query);
  return {
    props: {
      artists,
    },
  };
}
