import { useMutation } from "react-query";
import { gql, GraphQLClient } from "graphql-request";

const endpoint = "https://api.baseql.com/airtable/graphql/appZ3kbTzSCmS2Cya";

export enum inquiryType {
  WEDDING = "Wedding",
  PORTRAIT = "Portrait",
  PRODUCT = "Product",
  DRONE = "Drone services",
  OTHER = "Other",
  GENERAL = "General Question",
}

export type sendInquiryProps = {
  type: inquiryType | null;
  location?: string;
  weddingSize?: string;
  brandName?: string;
  shootDate: string;
  phone: number | string;
  lastName: string;
  internalNotes: string;
  firstName: string;
  email: string;
};

export function useSendInquiry() {
  const client = new GraphQLClient(endpoint);

  const requestHeaders = {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_BASEQL}`,
  };

  return useMutation((inquiry: sendInquiryProps) => {
    const query = gql`
      mutation {
        insert_inquiries(
          type: "${inquiry.type}"
          phone: "${inquiry.phone}"
          lastName: "${inquiry.lastName}"
          firstName: "${inquiry.firstName}"
          email: "${inquiry.email}"
          status: "New"
          ${inquiry.location ? `location: "${inquiry.location}"` : ""}
          ${inquiry.brandName ? `brandName: "${inquiry.brandName}"` : ""}
          ${inquiry.weddingSize ? `weddingSize: "${inquiry.weddingSize}"` : ""}
          ${inquiry.shootDate ? `shootDate: "${inquiry.shootDate}"` : ""}
          ${
            inquiry.internalNotes ? 'shootDate: "${inquiry.internalNotes}"' : ""
          }
        ) {
          type
          phone
          shootDate
          lastName
          brandName
          location
          weddingSize
          internalNotes
          firstName
          email
          status
        }
      }
    `;

    return client.request(query, {}, requestHeaders);
  });
}
