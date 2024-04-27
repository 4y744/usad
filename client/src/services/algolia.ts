import algoliasearch from "algoliasearch"

const client = algoliasearch('EGUJYITPTE', '97f14563ebea1ed3448f568fa03987ac')

export const algorithmsIndex = client.initIndex("algorithms");