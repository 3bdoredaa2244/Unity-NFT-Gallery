import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";
import { BytesLike } from "ethers";
import { PromiseOrValue } from "../../typechain-types/common";

// Ids used by EIP165 to confirm if contract follows interface
// https://stackoverflow.com/questions/69706835/how-to-check-if-the-token-on-opensea-is-erc721-or-erc1155-using-node-js#:~:text=Therefore%2C%20we%20can%20use%20the,the%20interface%20id%20was%20calculated.
const ERC721InterfaceId = 0x80ac58cd;
const ERC1155InterfaceId = 0xd9b67a26;

describe("Artwork supportsInterface tests", () => {
  it("Should identify that this contract doesn't support the ERC1155 interface", async () => {
    const { ArtworkContract } = await loadFixture(deployFixture);

    expect(
      await ArtworkContract.supportsInterface(
        ERC1155InterfaceId as unknown as PromiseOrValue<BytesLike>
      )
    ).be.eq(false);
  });

  it("Should identify that this contract does support the ERC721 interface", async () => {
    const { ArtworkContract } = await loadFixture(deployFixture);

    expect(
      await ArtworkContract.supportsInterface(
        ERC721InterfaceId as unknown as PromiseOrValue<BytesLike>
      )
    ).be.eq(true);
  });
});
