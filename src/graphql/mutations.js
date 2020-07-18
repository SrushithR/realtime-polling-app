/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const upVote = /* GraphQL */ `
  mutation UpVote($id: ID, $clientId: ID) {
    upVote(id: $id, clientId: $clientId) {
      id
      clientId
    }
  }
`;
export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $input: CreatePollInput!
    $condition: ModelPollConditionInput
  ) {
    createPoll(input: $input, condition: $condition) {
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
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
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
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
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
export const createCandidate = /* GraphQL */ `
  mutation CreateCandidate(
    $input: CreateCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    createCandidate(input: $input, condition: $condition) {
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
export const updateCandidate = /* GraphQL */ `
  mutation UpdateCandidate(
    $input: UpdateCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    updateCandidate(input: $input, condition: $condition) {
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
export const deleteCandidate = /* GraphQL */ `
  mutation DeleteCandidate(
    $input: DeleteCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    deleteCandidate(input: $input, condition: $condition) {
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
