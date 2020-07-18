/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateById = /* GraphQL */ `
  subscription OnUpdateById($id: ID!) {
    onUpdateByID(id: $id) {
      id
      clientId
    }
  }
`;
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll {
    onCreatePoll {
      id
      name
      type
      itemType
      candidates {
        items {
          id
          pollCandidatesId
          image
          name
          upvotes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll {
    onUpdatePoll {
      id
      name
      type
      itemType
      candidates {
        items {
          id
          pollCandidatesId
          image
          name
          upvotes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll {
    onDeletePoll {
      id
      name
      type
      itemType
      candidates {
        items {
          id
          pollCandidatesId
          image
          name
          upvotes
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCandidate = /* GraphQL */ `
  subscription OnCreateCandidate {
    onCreateCandidate {
      id
      pollCandidatesId
      image
      name
      upvotes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCandidate = /* GraphQL */ `
  subscription OnUpdateCandidate {
    onUpdateCandidate {
      id
      pollCandidatesId
      image
      name
      upvotes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCandidate = /* GraphQL */ `
  subscription OnDeleteCandidate {
    onDeleteCandidate {
      id
      pollCandidatesId
      image
      name
      upvotes
      createdAt
      updatedAt
    }
  }
`;
