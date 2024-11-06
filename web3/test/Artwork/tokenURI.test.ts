import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("Artwork tokenURI tests", () => {
  it("Should return correct URI", async () => {
    const { ArtworkContract } = await loadFixture(deployFixture);

    const testURI = "ipfs://testHash";

    await expect(await ArtworkContract.mint(testURI)).not.be.reverted;

    expect(await ArtworkContract.tokenURI(0)).eq(testURI);
  });
});
