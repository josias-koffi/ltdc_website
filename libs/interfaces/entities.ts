interface Status {
  value: "published" | "draft" | "archived";
}

export enum Team {
  DIRECTION = "DIRECTION",
  IT = "IT",
  FINANCE = "FINANCE",
  MARKETING = "MARKETING",
  LEGAL = "LEGAL",
}

export enum Role {
  ASSISTANTE_TRESORERIE = "ASSISTANTE TRESORERIE",
  TRESORIERE_ET_RESPONSABLE_FINANCE = "TRESORIERE ET RESPONSABLE FINANCE",
  COMMUNITY_MANAGER = "COMMUNITY MANAGER",
  CHEF_DE_PROJET_IT = "CHEF DE PROJET IT",
  DEVELOPPEUR_FULLSTACK = "DEVELOPPEUR FULLSTACK",
  UX_UI_DESIGNER = "UX/UI DESIGNER",
  PRESIDENTE_RESPONSABLE_JURIDIQUE = "PRESIDENTE & RESPONSABLE JURIDIQUE",
  VICE_PRESIDENTE_RESPONSABLE_IT_MARKETING = "VICE PRESIDENTE, RESPONSABLE IT &MARKETING",
  RESPONSABLE_TRESORERIE = "RESPONSABLE TRESORERIE",
  JURISTE = "JURISTE",
}

export interface OfferEntity {
  id: number;
  name: string;
  status: string;
  date_created: string;
  date_updated: string;
  description: string;
  responsabilities: string;
  profile: string;
}

export interface MemberEntity {
  id: number;
  team: Team;
  photo: string;
  name: string;
  roles: Role[];
  main_role: string;
}

export interface ActualitiesCategoriesEntity {
  actualities_id: ActualitiesEntity;
  categories_id: CategoriesEntity;
}

export interface ActualitiesTargetsEntity {
  actualities_id: ActualitiesEntity;
  targets_id: TargetsEntity;
}
export interface ProjectsTargetsEntity {
  actualities_id: ProjectEntity;
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
export interface ProjectEntity {
  targets?: TargetsEntity[];
  details: string;
  cover: string | FilesInterface;
  date_created: string;
  date_updated?: string;
  description: string;
  end_date?: string;
  id: number;
  start_date: string;
  sort?: any;
  sources?: string;
  resources?: string;
  status: Status["value"];
  title: string;
  user_created: string;
  user_updated?: string;
  cout?: number;
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

export interface EventInterface {
  address?: string;
  capacity: number;
  cover: string | FilesInterface;
  description: string;
  end_date?: string;
  id: number;
  link: string;
  name: string;
  price: number;
  recap?: string;
  sort?: any;
  start_date: string;
  state: string;
  status: string;
  type: string;
  sponsor?: string;
  instagram?: string;
  linkedin?: string;
}
