import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("Artwork burn tests", () => {
  it("Should not allow burning of token", async () => {
    const { Alice, ArtworkContract } = await loadFixture(deployFixture);

    const testURI = "ipfs://testHash";

    await expect(await ArtworkContract.mint(testURI)).not.be.reverted;

    await expect(ArtworkContract.connect(Alice).burn(0)).be.reverted;
  });

  it("Should burn token", async () => {
    const { Deployer, ArtworkContract } = await loadFixture(deployFixture);

    const testURI = "ipfs://testHash";

    await expect(await ArtworkContract.mint(testURI)).not.be.reverted;

    await expect(ArtworkContract.connect(Deployer).burn(0)).not.be.reverted;
  });
});
