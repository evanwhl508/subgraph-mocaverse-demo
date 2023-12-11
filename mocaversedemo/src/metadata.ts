import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'
import { TokenMetadata } from '../generated/schema'

export function handleMetadata(content: Bytes): void {
  let tokenMetadata = new TokenMetadata(dataSource.stringParam())
  const value = json.fromBytes(content).toObject()
  if (value) {
    /* using the metatadata from IPFS, update the token object with the values  */
    const image = value.get('image')
    const name = value.get('name')
    // const description = value.get('description')
    const attributes = value.get('attributes')

    if (name) {
      tokenMetadata.name = name.toString()
    } else {
        // if the metadata is not valid, set the token to invalid
        tokenMetadata.name = "invalid"
    }
    if (image) {
      tokenMetadata.image = image.toString()
    } else {
        // if the metadata is not valid, set the token to invalid
        tokenMetadata.image = "invalid"
    }

    let tribe = ""
    if (attributes) {
      const attributesArray = attributes.toArray()
      for (let i = 0; i < attributesArray.length; i++) {
        const attribute = attributesArray[i].toObject()
        if (attribute) {
          const traitType = attribute.get('trait_type')
          if (traitType && traitType.toString() == 'Tribe') {
            tribe = attribute.get('value')!.toString()
          }
        }
      }
    }
    tokenMetadata.tribe = tribe
    tokenMetadata.save()
  }
}