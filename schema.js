export const typeDefs = `#graphql
type MonsterGeneral {
    name: String
    cr: Float
    environments: [String]
    monstersSpecific: [MonsterSpecific]
}
type MonsterSpecific {
    name: String
    strength: String
    monstersGeneral: [MonsterGeneral]
}

type Query {
    monstersGeneral: [MonsterGeneral]
    monstersSpecific: [MonsterSpecific]
}
`;
