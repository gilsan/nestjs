export interface ICOURSE {
  _id?: number | string;
  id: number;
  description: string;
  iconUrl: string;
  courseListIcon?: string;
  longDescription: string;
  category: string;
  lessonsCount?: number;
}


export interface ILESSON {
  _id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}

export interface IUSER {
  _id: number;
  email: string;
  password: string;
  passwordHash?: string;
  roles: [];
}
