type PropsType = {
  rating: number;
  width?: number;
  height?: number;
}

function Rating({ rating, width = 12, height = 11 }: PropsType): JSX.Element {
  return (
    <>
      {
        [1, 2, 3, 4, 5].map((rate) => {
          if (rate <= rating) {
            return (
              <svg key={rate} width={width} height={height} aria-hidden="true" data-testid="rating-full-star">
                <use xlinkHref="#icon-full-star" />
              </svg>
            );
          }
          return (
            <svg key={rate} width={width} height={height} aria-hidden="true" data-testid="rating-empty-star">
              <use xlinkHref="#icon-star" />
            </svg>
          );
        })
      }
    </>
  );
}

export default Rating;
