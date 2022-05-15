import { Guitar } from '../../types/guitar';

type PropsType = {
  guitar: Guitar;
  width?: number;
  height?: number;
}

function Rating({ guitar, width = 12, height = 11 }: PropsType): JSX.Element {
  return (
    <>
      {
        [1, 2, 3, 4, 5].map((rate) => {
          if (rate <= guitar.rating) {
            return (
              <svg key={rate} width={width} height={height} aria-hidden="true">
                <use xlinkHref="#icon-full-star" />
              </svg>
            );
          }
          return (
            <svg key={rate} width={width} height={height} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
          );
        })
      }
    </>
  );
}

export default Rating;
