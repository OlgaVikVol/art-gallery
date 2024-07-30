'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getArtworkById } from '@/lib/actions/artwork.actions';
import Image from 'next/image';
import { Artwork } from '@/types';

const ArtworkDetails = ({ params: { id } }: { params: { id: string } }) => {
  const [artwork, setArtwork] = useState<Artwork>();

  useEffect(() => {
    const fetchArtwork = async () => {
      const data = await getArtworkById(id);
      setArtwork(data?.data);
    };

    fetchArtwork();
  }, [id]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <section className='flex h-full justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
        <Image
          src={artwork?.thumbnail?.lqip || '/assets/img/no_photo_image.png'}
          alt={artwork?.thumbnail?.alt_text || 'Artwork Thumbnail'}
          width={artwork?.thumbnail?.width || 1000}
          height={artwork?.thumbnail?.height || 1000}
          className='h-full min-h-[300px] object-cover object-center'
          priority={false}
        />

        <div className='flex w-full flex-col gap-8 p-5 md:py-10'>
          <div className='flex flex-col gap-6'>
            <h2 className='h2-bold'>{artwork?.title}</h2>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='flex gap-3'>
                <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                  {artwork?.date_display}
                </p>
              </div>

              <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                by{' '}
                <span className="text-primary-500">{artwork?.artist_display}</span>
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='p-bold-20 text-gray-600'>Dimensions:</p>
            <p className='p-medium-16 lg:p-regular-18'>{artwork?.dimensions}</p>
          </div>

          <div className='p-regular-20 flex items-center gap-3'>
            <p className='p-bold-20 text-gray-600'>Main Reference Number:</p>
            <p className='p-medium-16 lg:p-regular-20'>{artwork?.main_reference_number}</p>
          </div>

          <BackButton />
        </div>
      </div>
    </section>
  );
};

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='mt-4 rounded-full bg-primary-500 px-6 py-2 text-white hover:bg-primary-600'
    >
      Back to List
    </button>
  );
};

export default ArtworkDetails;
