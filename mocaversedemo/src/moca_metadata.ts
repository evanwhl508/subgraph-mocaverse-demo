import { json, JSONValueKind, BigInt, JSONValue, Result } from '@graphprotocol/graph-ts'
import { dataStr } from './mocaTokenUri'


export function getIpfsHashFromTokenId(tokenId: BigInt): string {
    const mapForIpfsHash: Result<JSONValue, boolean> = json.try_fromString(dataStr);
    if (mapForIpfsHash.isOk) {
        return  mapForIpfsHash.value.toObject().get(tokenId.toString())!.toString() as string;
    }
    return "";
}

