export type Artwork = {
  id: string
  title: string
  artist_display: string
  date_display: string
  main_reference_number: number
  thumbnail: {
      lqip: string
      width: number
      height: number
      alt_text: string    
  }
  dimensions: string
  department_title: string
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}


