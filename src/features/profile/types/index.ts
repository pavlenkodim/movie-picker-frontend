export interface Profile {
  id: number;
  userId: number;
  nickname: string;
  thumbnail: string;
}

export interface GenreWeight {
  id: number;
  profileId: number;
  genreId: number;
  weight: number;
}
