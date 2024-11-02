interface Status {
  value: "published" | "draft" | "archived";
}

export enum Team {
  ADMINISTRATION = "ADMINISTRATION",
  IT = "IT",
  FINANCE = "FINANCE",
  MARKETING = "MARKETING",
  LEGAL = "LEGAL",
}

export interface MemberEntity {
  id: number;
  team: Team;
  photo: string;
}

export interface ActualitiesCategoriesEntity {
  actualities_id: ActualitiesEntity;
  categories_id: CategoriesEntity;
}

export interface ActualitiesTargetsEntity {
  actualities_id: ActualitiesEntity;
  targets_id: TargetsEntity;
}

export interface CategoriesEntity {
  id: string;
  name: string;
  status: Status;
}

export interface TargetsEntity {
  id: number;
  name: string;
  status: Status;
}

export interface ActualitiesEntity {
  categories?: CategoriesEntity[];
  targets?: TargetsEntity[];
  content: string;
  cover: string | FilesInterface;
  date_created: string;
  date_updated?: string;
  description: string;
  end_validity_date?: string;
  id: number;
  publication_date: string;
  sort?: any;
  sources?: string;
  resources?: string;
  status: Status["value"];
  title: string;
  user_created: string;
  user_updated?: string;
}

export interface FilesInterface {
  charset?: any;
  created_on: string;
  description?: string;
  duration?: string;
  embed?: any;
  filename_disk: string;
  filename_download: string;
  filesize: string;
  focal_point_x?: any;
  focal_point_y?: any;
  folder: FolderInterface;
  height: number;
  id: string;
  location?: any;
  metadata?: any;
  modified_on: string;
  storage: string;
  tags?: any;
  title: string;
  tus_data?: any;
  tus_id?: any;
  type: string;
  uploaded_on: string;
  width: number;
}

export interface FolderInterface {
  id: string;
  name: string;
  parent?: any;
}
