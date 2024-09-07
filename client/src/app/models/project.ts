export interface Project {
    id:number,
    pictureUrl:string;
    name:string;
    description:string;
    link:string;
    technologies:string[]
}

export interface Technology {
    id:number;
    name:string;
}

export interface ProjectParams{
    orderBy:string;
    searchTerm?:string;
    pageNumber: number;
    pageSize:number;
}