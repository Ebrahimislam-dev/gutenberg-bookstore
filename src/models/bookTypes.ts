export interface Author {
    name: string;
    birth_year: number | null;
    death_year: number | null;
  }
  
  export interface Book {
    id: number;
    title: string;
    authors: Author[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: {
      "text/html"?: string;
      "application/epub+zip"?: string;
      "application/x-mobipocket-ebook"?: string;
      "application/rdf+xml"?: string;
      "image/jpeg"?: string;
      "text/plain; charset=us-ascii"?: string;
      "application/octet-stream"?: string;
      [key: string]: string | undefined;
    };
    download_count: number;
  }
  
  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Book[];
  }
  