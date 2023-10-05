import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
{
    countries {
      name
      code
    }
  }
  
`